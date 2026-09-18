import { parseTitle, fullTitle, extract } from './wikitext.js';

export const now = () => Math.floor(Date.now() / 1000);

export async function getPageByKey(db, key) {
  return db.prepare('SELECT * FROM pages WHERE page_key = ?').bind(key).first();
}

export async function getPage(db, ns, title) {
  return getPageByKey(db, `${ns}:${title.replace(/ /g, '_')}`);
}

export async function getRevision(db, id) {
  return db.prepare('SELECT * FROM revisions WHERE id = ?').bind(id).first();
}

export async function currentRevision(db, page) {
  if (!page?.current_rev_id) return null;
  return getRevision(db, page.current_rev_id);
}

/** Which of these page keys exist? Used for red links. */
export async function existingKeys(db, keys) {
  const list = [...new Set(keys)].filter(Boolean).slice(0, 400);
  if (!list.length) return new Set();
  const marks = list.map(() => '?').join(',');
  const { results } = await db.prepare(`SELECT page_key FROM pages WHERE page_key IN (${marks})`).bind(...list).all();
  return new Set(results.map((r) => r.page_key));
}

/**
 * One edit = one new immutable revision + a pointer move on the page row,
 * exactly like MediaWiki. Anonymous edits store the IP in user_text.
 */
export async function saveEdit(db, {
  ns, title, content, comment = '', user = null, userText, isMinor = false, tags = '', projectName = 'Project',
}) {
  const t = now();
  const key = `${ns}:${title.replace(/ /g, '_')}`;
  let page = await getPageByKey(db, key);
  const redirect = /^\s*#REDIRECT\s*:?\s*\[\[([^[\]|]+)/i.exec(content);
  const redirTarget = redirect ? fullTitle(...Object.values(parseTitle(redirect[1], projectName)).slice(0, 2), projectName) : null;

  if (!page) {
    const ins = await db.prepare(
      `INSERT INTO pages (namespace,title,page_key,created_at,touched_at,len,is_redirect,redirect_target)
       VALUES (?,?,?,?,?,?,?,?)`)
      .bind(ns, title, key, t, t, content.length, redirect ? 1 : 0, redirTarget).run();
    page = await getPageByKey(db, key);
    tags = tags ? `${tags},new` : 'new';
  }

  const rev = await db.prepare(
    `INSERT INTO revisions (page_id,parent_id,user_id,user_text,comment,content,len,is_minor,tags,created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?)`)
    .bind(page.id, page.current_rev_id || null, user?.id ?? null, userText, comment, content,
      content.length, isMinor ? 1 : 0, tags, t).run();
  const revId = rev.meta.last_row_id;

  await db.prepare(
    `UPDATE pages SET current_rev_id=?, touched_at=?, len=?, is_redirect=?, redirect_target=? WHERE id=?`)
    .bind(revId, t, content.length, redirect ? 1 : 0, redirTarget, page.id).run();

  if (user) {
    await db.prepare('UPDATE users SET edit_count = edit_count + 1 WHERE id = ?').bind(user.id).run();
  }
  return { page: await getPageByKey(db, key), revId };
}

export async function pageHistory(db, pageId, limit = 50, offset = 0) {
  const { results } = await db.prepare(
    `SELECT r.*, (SELECT len FROM revisions p WHERE p.id = r.parent_id) AS parent_len
     FROM revisions r WHERE r.page_id = ? ORDER BY r.created_at DESC, r.id DESC LIMIT ? OFFSET ?`)
    .bind(pageId, limit, offset).all();
  return results;
}

export async function recentChanges(db, { limit = 50, namespace = null, userText = null, onlyNew = false, watchedBy = null } = {}) {
  const where = ['1=1'];
  const binds = [];
  if (namespace !== null && namespace !== undefined && namespace !== '') { where.push('p.namespace = ?'); binds.push(Number(namespace)); }
  if (userText) { where.push('r.user_text = ?'); binds.push(userText); }
  if (onlyNew) where.push(`(','||r.tags||',' LIKE '%,new,%')`);
  if (watchedBy) { where.push('p.id IN (SELECT page_id FROM watchlist WHERE user_id = ?)'); binds.push(watchedBy); }
  const { results } = await db.prepare(
    `SELECT r.*, p.namespace, p.title, p.page_key,
            (SELECT len FROM revisions q WHERE q.id = r.parent_id) AS parent_len
     FROM revisions r JOIN pages p ON p.id = r.page_id
     WHERE ${where.join(' AND ')} ORDER BY r.created_at DESC, r.id DESC LIMIT ?`)
    .bind(...binds, limit).all();
  return results;
}

export async function search(db, q, { limit = 20, namespace = null } = {}) {
  const term = `%${q.replace(/[%_]/g, (m) => `\\${m}`)}%`;
  const nsClause = namespace === null ? '' : 'AND p.namespace = ?';
  const binds = [q.replace(/ /g, '_'), `${q}%`, term, term];
  if (namespace !== null) binds.push(Number(namespace));
  const { results } = await db.prepare(
    `SELECT p.id,p.namespace,p.title,p.page_key,p.len,p.touched_at,
            p.rating_helpful_up,p.rating_funny_up,r.content,
            CASE WHEN p.title = ? THEN 0 WHEN p.title LIKE ? THEN 1 ELSE 2 END AS rank
     FROM pages p JOIN revisions r ON r.id = p.current_rev_id
     WHERE (p.title LIKE ? ESCAPE '\\' OR r.content LIKE ? ESCAPE '\\') ${nsClause}
     ORDER BY rank, p.namespace, length(p.title), p.touched_at DESC LIMIT ?`)
    .bind(...binds, limit).all();
  return results.map((r) => ({ ...r, snippet: extract(r.content, 220) }));
}

export async function myRatings(db, pageId, voterKey) {
  const { results } = await db.prepare(
    'SELECT axis, value FROM ratings WHERE page_id = ? AND voter_key = ?').bind(pageId, voterKey).all();
  const out = {};
  for (const r of results) out[r.axis] = r.value;
  return out;
}

/** Toggle semantics: clicking the same thumb again clears your vote. */
export async function rate(db, pageId, voterKey, axis, value) {
  const existing = await db.prepare(
    'SELECT value FROM ratings WHERE page_id=? AND voter_key=? AND axis=?').bind(pageId, voterKey, axis).first();
  if (existing && existing.value === value) {
    await db.prepare('DELETE FROM ratings WHERE page_id=? AND voter_key=? AND axis=?').bind(pageId, voterKey, axis).run();
  } else {
    await db.prepare(
      `INSERT INTO ratings (page_id,voter_key,axis,value,created_at) VALUES (?,?,?,?,?)
       ON CONFLICT(page_id,voter_key,axis) DO UPDATE SET value=excluded.value, created_at=excluded.created_at`)
      .bind(pageId, voterKey, axis, value, now()).run();
  }
  return recountRatings(db, pageId, axis);
}

export async function recountRatings(db, pageId, axis) {
  const row = await db.prepare(
    `SELECT SUM(CASE WHEN value=1 THEN 1 ELSE 0 END) AS up,
            SUM(CASE WHEN value=-1 THEN 1 ELSE 0 END) AS down
     FROM ratings WHERE page_id=? AND axis=?`).bind(pageId, axis).first();
  const up = row?.up || 0, down = row?.down || 0;
  const cols = axis === 'funny'
    ? ['rating_funny_up', 'rating_funny_down'] : ['rating_helpful_up', 'rating_helpful_down'];
  await db.prepare(`UPDATE pages SET ${cols[0]}=?, ${cols[1]}=? WHERE id=?`).bind(up, down, pageId).run();
  return { up, down };
}

export async function log(db, { type, action, userText, target = '', comment = '' }) {
  await db.prepare(
    'INSERT INTO logs (type,action,user_text,target,comment,created_at) VALUES (?,?,?,?,?,?)')
    .bind(type, action, userText, target, comment, now()).run();
}

export async function isWatched(db, userId, pageId) {
  if (!userId || !pageId) return false;
  const r = await db.prepare('SELECT 1 AS x FROM watchlist WHERE user_id=? AND page_id=?').bind(userId, pageId).first();
  return !!r;
}

export async function stats(db) {
  const a = await db.prepare(
    `SELECT (SELECT COUNT(*) FROM pages WHERE namespace=0 AND is_redirect=0) AS articles,
            (SELECT COUNT(*) FROM pages) AS pages,
            (SELECT COUNT(*) FROM revisions) AS edits,
            (SELECT COUNT(*) FROM users) AS users,
            (SELECT COUNT(*) FROM ratings) AS ratings,
            (SELECT COUNT(*) FROM users WHERE ',' || groups || ',' LIKE '%,sysop,%') AS admins`).first();
  return a;
}

/**
 * The leaderboard. Wilson lower bound so that 9/10 outranks 1/1, which is the
 * same reason Wikipedia does not rank by raw counts.
 */
export function wilson(up, down) {
  const n = up + down;
  if (!n) return 0;
  const z = 1.96, p = up / n;
  return (p + (z * z) / (2 * n) - z * Math.sqrt((p * (1 - p) + (z * z) / (4 * n)) / n)) / (1 + (z * z) / n);
}

export async function topRated(db, axis = 'funny', limit = 25) {
  const up = axis === 'funny' ? 'rating_funny_up' : 'rating_helpful_up';
  const down = axis === 'funny' ? 'rating_funny_down' : 'rating_helpful_down';
  const { results } = await db.prepare(
    `SELECT id,namespace,title,${up} AS up,${down} AS down FROM pages
     WHERE namespace=0 AND is_redirect=0 AND (${up}+${down}) > 0 LIMIT 500`).all();
  return results
    .map((r) => ({ ...r, score: wilson(r.up, r.down) }))
    .sort((a, b) => b.score - a.score || b.up - a.up)
    .slice(0, limit);
}
