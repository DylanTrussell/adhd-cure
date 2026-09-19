import { esc, escAttr, pageUrl, fullTitle, nsName, parseTitle } from './wikitext.js';
import { ts, userLink, byteDelta } from './skin.js';
import * as db from './db.js';
import { effectiveGroups, isBlocked } from './auth.js';

function changeList(ctx, rows, { showPage = true } = {}) {
  const { site } = ctx;
  if (!rows.length) return '<p class="helptext">Nothing here yet.</p>';
  let lastDay = '';
  const out = [];
  for (const r of rows) {
    const day = new Date(r.created_at * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
    if (day !== lastDay) { out.push(`</ul><h3>${esc(day)}</h3><ul class="changelist">`); lastDay = day; }
    const isNew = String(r.tags || '').includes('new');
    out.push(`<li>
      ${isNew ? '<b title="Page creation">N</b> ' : ''}${r.is_minor ? '<span class="minor">m</span> ' : ''}
      <span class="ts">${ts(r.created_at).split(',')[0]}</span>
      ${showPage ? `<a href="${pageUrl(r.namespace, r.title, site.project)}"><b>${esc(fullTitle(r.namespace, r.title, site.project))}</b></a>` : ''}
      (<a href="/wiki/Special:Diff/${r.id}">diff</a> | <a href="${pageUrl(r.namespace, r.title, site.project, '?action=history')}">hist</a>)
      ${byteDelta(r.len, r.parent_len)}
      . . ${userLink(r.user_text)}
      ${r.comment ? `<span class="cmt">(${esc(r.comment)})</span>` : ''}
      ${String(r.tags || '').split(',').filter((t) => t && t !== 'new').map((t) => `<span class="tag">${esc(t)}</span>`).join(' ')}
    </li>`);
  }
  return `<ul class="changelist">${out.join('')}</ul>`.replace('<ul class="changelist"></ul>', '');
}

export async function recentChanges(ctx, url) {
  const ns = url.searchParams.get('ns') ?? '';
  const limit = Math.min(500, Number(url.searchParams.get('limit')) || 50);
  const rows = await db.recentChanges(ctx.env.DB, { limit, namespace: ns === '' ? null : ns, onlyNew: url.searchParams.get('new') === '1' });
  return `<div class="mw-body wide">
    <h1 id="firstHeading">Recent changes</h1>
    <p class="helptext">Every edit to every page, newest first. This is where the encyclopedia is actually policed: read the diffs, revert the vandalism, source the jokes.</p>
    <form method="get" style="margin:10px 0;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <label>Namespace
        <select name="ns" class="btn" style="padding:5px">
          <option value=""${ns === '' ? ' selected' : ''}>all</option>
          ${[0, 1, 2, 3, 4, 10, 14].map((n) => `<option value="${n}"${ns === String(n) ? ' selected' : ''}>${esc(nsName(n, ctx.site.project) || '(Articles)')}</option>`).join('')}
        </select></label>
      <label>Show <select name="limit" class="btn" style="padding:5px">
        ${[50, 100, 250, 500].map((n) => `<option value="${n}"${limit === n ? ' selected' : ''}>${n}</option>`).join('')}
      </select> changes</label>
      <label><input type="checkbox" name="new" value="1"${url.searchParams.get('new') === '1' ? ' checked' : ''}> new pages only</label>
      <button class="btn btn-primary" type="submit">Go</button>
    </form>
    ${changeList(ctx, rows)}
  </div>`;
}

export async function newPages(ctx) {
  const rows = await db.recentChanges(ctx.env.DB, { limit: 100, onlyNew: true });
  return `<div class="mw-body wide">
    <h1 id="firstHeading">New pages</h1>
    <p class="helptext">Articles created most recently. New pages are where the unsourced jokes usually arrive; patrolling them is the most useful thing a new editor can do.</p>
    ${changeList(ctx, rows)}
  </div>`;
}

export async function watchlist(ctx) {
  if (!ctx.user) return `<div class="mw-body"><h1 id="firstHeading">Watchlist</h1>
    <p>You need to <a href="/wiki/Special:UserLogin?returnto=Special:Watchlist">log in</a> to keep a watchlist.</p></div>`;
  const rows = await db.recentChanges(ctx.env.DB, { limit: 200, watchedBy: ctx.user.id });
  const { results: watched } = await ctx.env.DB.prepare(
    `SELECT p.namespace,p.title FROM watchlist w JOIN pages p ON p.id=w.page_id WHERE w.user_id=? ORDER BY p.namespace,p.title`)
    .bind(ctx.user.id).all();
  return `<div class="mw-body wide">
    <h1 id="firstHeading">Watchlist</h1>
    <p class="helptext">${watched.length} page${watched.length === 1 ? '' : 's'} watched. Changes to them appear below.</p>
    ${changeList(ctx, rows)}
    <h2>Pages you are watching</h2>
    <ul>${watched.map((p) => `<li><a href="${pageUrl(p.namespace, p.title, ctx.site.project)}">${esc(fullTitle(p.namespace, p.title, ctx.site.project))}</a></li>`).join('') || '<li>none yet</li>'}</ul>
  </div>`;
}

export async function contributions(ctx, who) {
  const rows = await db.recentChanges(ctx.env.DB, { limit: 200, userText: who });
  const u = await ctx.env.DB.prepare('SELECT * FROM users WHERE username_lc = ?').bind(who.toLowerCase()).first();
  const groups = u ? effectiveGroups({ ...u, groups: String(u.groups || '').split(',').filter(Boolean) }).filter((g) => g !== '*') : [];
  return `<div class="mw-body wide">
    <h1 id="firstHeading">Contributions: ${esc(who)}</h1>
    <p class="helptext">
      ${u ? `Account registered ${ts(u.created_at)}. ${u.edit_count.toLocaleString('en-US')} edits. Groups: ${groups.map((g) => `<b>${esc(g)}</b>`).join(', ')}.
        ${isBlocked(u) ? `<span class="minus">This user is currently blocked${u.block_reason ? `: ${esc(u.block_reason)}` : ''}.</span>` : ''}`
        : 'This is an anonymous editor, identified only by IP address, exactly as on Wikipedia.'}
      &nbsp;<a href="/wiki/User:${encodeURIComponent(who)}">user page</a> &middot; <a href="/wiki/User_talk:${encodeURIComponent(who)}">talk</a>
    </p>
    ${changeList(ctx, rows)}
  </div>`;
}

export async function allPages(ctx, url) {
  const ns = Number(url.searchParams.get('ns') ?? 0);
  const { results } = await ctx.env.DB.prepare(
    `SELECT namespace,title,is_redirect,len FROM pages WHERE namespace=? ORDER BY title LIMIT 1000`).bind(ns).all();
  return `<div class="mw-body wide">
    <h1 id="firstHeading">All pages</h1>
    <form method="get" style="margin:10px 0">
      <label>Namespace <select name="ns" class="btn" style="padding:5px">
        ${[0, 1, 2, 3, 4, 10, 12, 14].map((n) => `<option value="${n}"${ns === n ? ' selected' : ''}>${esc(nsName(n, ctx.site.project) || '(Articles)')}</option>`).join('')}
      </select></label>
      <button class="btn btn-primary" type="submit">Go</button>
    </form>
    <p class="helptext">${results.length} page${results.length === 1 ? '' : 's'}.</p>
    <ul style="columns:3;column-gap:28px">
      ${results.map((p) => `<li><a href="${pageUrl(p.namespace, p.title, ctx.site.project)}"${p.is_redirect ? ' class="mw-redirect" style="font-style:italic"' : ''}>${esc(p.title)}</a></li>`).join('')}
    </ul>
  </div>`;
}

export async function topRated(ctx, url) {
  const axis = url.searchParams.get('axis') === 'helpful' ? 'helpful' : 'funny';
  const rows = await db.topRated(ctx.env.DB, axis, 50);
  const other = axis === 'funny' ? 'helpful' : 'funny';
  return `<div class="mw-body">
    <h1 id="firstHeading">Top rated articles</h1>
    <p class="helptext">Ranked by the Wilson lower bound rather than raw thumbs, so one perfect vote does not outrank forty-nine out of fifty. Sorted by <b>${esc(axis)}</b> &mdash; <a href="?axis=${other}">sort by ${esc(other)}</a> instead.</p>
    <ol class="leaderboard">
      ${rows.map((r) => `<li><a href="${pageUrl(r.namespace, r.title, ctx.site.project)}">${esc(r.title)}</a>
        <span class="score">&#128077; ${r.up} &nbsp; &#128078; ${r.down} &nbsp; ${Math.round(r.score * 100)}%</span></li>`).join('')
        || '<li class="helptext">No ratings yet. Go and press some thumbs.</li>'}
    </ol>
  </div>`;
}

export async function statistics(ctx) {
  const s = await db.stats(ctx.env.DB);
  const rows = [
    ['Content pages (articles)', s.articles], ['Pages in all namespaces', s.pages],
    ['Edits since the site began', s.edits], ['Registered users', s.users],
    ['Administrators', s.admins], ['Thumbs cast', s.ratings],
    ['Edits per page', s.pages ? (s.edits / s.pages).toFixed(2) : '0'],
  ];
  return `<div class="mw-body">
    <h1 id="firstHeading">Statistics</h1>
    <table class="wikitable">${rows.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td style="text-align:right">${Number(v || 0).toLocaleString('en-US')}</td></tr>`).join('')}</table>
  </div>`;
}

export async function listUsers(ctx) {
  const { results } = await ctx.env.DB.prepare(
    'SELECT username,created_at,edit_count,groups,blocked_until FROM users ORDER BY edit_count DESC, created_at LIMIT 200').all();
  return `<div class="mw-body wide">
    <h1 id="firstHeading">User list</h1>
    <table class="wikitable">
      <tr><th>User</th><th>Registered</th><th>Edits</th><th>Groups</th></tr>
      ${results.map((u) => `<tr>
        <td>${userLink(u.username, false)}${isBlocked(u) ? ' <span class="minus">(blocked)</span>' : ''}</td>
        <td>${ts(u.created_at)}</td><td style="text-align:right">${u.edit_count.toLocaleString('en-US')}</td>
        <td>${esc(String(u.groups || '').split(',').filter(Boolean).join(', ') || '&mdash;').replace('&amp;mdash;', '&mdash;')}</td></tr>`).join('')}
    </table>
  </div>`;
}

export async function logsView(ctx) {
  const { results } = await ctx.env.DB.prepare('SELECT * FROM logs ORDER BY created_at DESC LIMIT 200').all();
  return `<div class="mw-body wide">
    <h1 id="firstHeading">Logs</h1>
    <p class="helptext">Account creations, blocks, page protections, deletions and moves.</p>
    <ul class="changelist">
      ${results.map((l) => `<li><span class="ts">${ts(l.created_at)}</span> ${userLink(l.user_text, false)}
        <b>${esc(l.action)}</b> ${l.target ? `<a href="/wiki/${encodeURIComponent(l.target.replace(/ /g, '_'))}">${esc(l.target)}</a>` : ''}
        ${l.comment ? `<span class="cmt">(${esc(l.comment)})</span>` : ''} <span class="tag">${esc(l.type)}</span></li>`).join('')
        || '<li class="helptext">Empty.</li>'}
    </ul>
  </div>`;
}

export async function whatLinksHere(ctx, target) {
  const t = parseTitle(target, ctx.site.project);
  const needle = `%[[${t.title}%`;
  const { results } = await ctx.env.DB.prepare(
    `SELECT p.namespace,p.title FROM pages p JOIN revisions r ON r.id=p.current_rev_id
     WHERE r.content LIKE ? AND p.page_key != ? ORDER BY p.namespace,p.title LIMIT 500`)
    .bind(needle, t.key).all();
  return `<div class="mw-body">
    <h1 id="firstHeading">Pages that link to "${esc(fullTitle(t.ns, t.title, ctx.site.project))}"</h1>
    <ul>${results.map((p) => `<li><a href="${pageUrl(p.namespace, p.title, ctx.site.project)}">${esc(fullTitle(p.namespace, p.title, ctx.site.project))}</a></li>`).join('')
      || '<li class="helptext">No pages link here yet.</li>'}</ul>
  </div>`;
}

export async function pageInfo(ctx, target) {
  const t = parseTitle(target, ctx.site.project);
  const page = await db.getPageByKey(ctx.env.DB, t.key);
  if (!page) return `<div class="mw-body"><h1 id="firstHeading">Page information</h1><p>No such page.</p></div>`;
  const first = await ctx.env.DB.prepare('SELECT * FROM revisions WHERE page_id=? ORDER BY created_at ASC LIMIT 1').bind(page.id).first();
  const count = await ctx.env.DB.prepare('SELECT COUNT(*) AS n, COUNT(DISTINCT user_text) AS authors FROM revisions WHERE page_id=?').bind(page.id).first();
  const rows = [
    ['Page title', esc(fullTitle(page.namespace, page.title, ctx.site.project))],
    ['Namespace', esc(nsName(page.namespace, ctx.site.project) || '(Main)')],
    ['Page length (bytes)', page.len.toLocaleString('en-US')],
    ['Page ID', page.id],
    ['Total edits', count.n],
    ['Distinct authors', count.authors],
    ['Page created', first ? `${ts(first.created_at)} by ${userLink(first.user_text, false)}` : '&mdash;'],
    ['Latest edit', ts(page.touched_at)],
    ['Edit protection', esc(page.protect_edit || 'none (all users)')],
    ['Helpful rating', `&#128077; ${page.rating_helpful_up} / &#128078; ${page.rating_helpful_down}`],
    ['Funny rating', `&#128077; ${page.rating_funny_up} / &#128078; ${page.rating_funny_down}`],
  ];
  return `<div class="mw-body">
    <h1 id="firstHeading">Information for "${esc(fullTitle(page.namespace, page.title, ctx.site.project))}"</h1>
    <table class="wikitable">${rows.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${v}</td></tr>`).join('')}</table>
  </div>`;
}

export function specialPages(ctx) {
  const groups = {
    'Lists of pages': [['AllPages', 'All pages'], ['NewPages', 'New pages'], ['TopRated', 'Top rated articles'], ['Random', 'Random article'], ['ShortPages', 'Short pages'], ['WantedPages', 'Wanted pages'], ['ListFiles', 'File list']],
    'Recent activity': [['RecentChanges', 'Recent changes'], ['Log', 'Logs'], ['Watchlist', 'Your watchlist']],
    Media: [['Upload', 'Upload a file'], ['ListFiles', 'File list']],
    Users: [['ListUsers', 'User list'], ['CreateAccount', 'Create account'], ['UserLogin', 'Log in']],
    'Site data': [['Statistics', 'Statistics'], ['Search', 'Search']],
  };
  return `<div class="mw-body">
    <h1 id="firstHeading">Special pages</h1>
    ${Object.entries(groups).map(([h, items]) => `<h2>${esc(h)}</h2><ul>
      ${items.map(([slug, label]) => `<li><a href="/wiki/Special:${slug}">${esc(label)}</a></li>`).join('')}</ul>`).join('')}
  </div>`;
}

export async function shortPages(ctx) {
  const { results } = await ctx.env.DB.prepare(
    'SELECT namespace,title,len FROM pages WHERE namespace=0 AND is_redirect=0 ORDER BY len ASC LIMIT 100').all();
  return `<div class="mw-body">
    <h1 id="firstHeading">Short pages</h1>
    <p class="helptext">The thinnest articles on the site. A one-liner is a joke, not an encyclopedia entry; these need expanding.</p>
    <ol>${results.map((p) => `<li><a href="${pageUrl(p.namespace, p.title, ctx.site.project)}">${esc(p.title)}</a> <span class="ts">(${p.len.toLocaleString('en-US')} bytes)</span></li>`).join('')}</ol>
  </div>`;
}

/** Red links, counted across current revisions. */
export async function wantedPages(ctx) {
  const { results } = await ctx.env.DB.prepare(
    'SELECT r.content FROM pages p JOIN revisions r ON r.id=p.current_rev_id LIMIT 2000').all();
  const existing = await ctx.env.DB.prepare('SELECT page_key FROM pages').all();
  const have = new Set(existing.results.map((r) => r.page_key));
  const counts = new Map();
  for (const row of results) {
    for (const m of String(row.content).matchAll(/\[\[([^[\]|#]+)(?:[|#][^[\]]*)?\]\]/g)) {
      const t = parseTitle(m[1], ctx.site.project);
      if (t.ns === 14 || t.ns === 6 || !t.title) continue;
      if (have.has(t.key)) continue;
      counts.set(t.key, (counts.get(t.key) || 0) + 1);
    }
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 100);
  return `<div class="mw-body">
    <h1 id="firstHeading">Wanted pages</h1>
    <p class="helptext">Articles other articles already link to, that nobody has written yet. The most-wanted ones are at the top.</p>
    <ol>${sorted.map(([key, n]) => {
      const [ns, title] = [Number(key.split(':')[0]), key.split(':').slice(1).join(':').replace(/_/g, ' ')];
      return `<li><a class="new" href="${pageUrl(ns, title, ctx.site.project, '?action=edit&redlink=1')}">${esc(fullTitle(ns, title, ctx.site.project))}</a> <span class="ts">(${n} link${n === 1 ? '' : 's'})</span></li>`;
    }).join('') || '<li class="helptext">No red links. Suspicious.</li>'}</ol>
  </div>`;
}

export async function listFilesView(ctx) {
  const files = await db.listFiles(ctx.env.DB, 200);
  if (!files.length) {
    return `<div class="mw-body"><h1 id="firstHeading">File list</h1>
      <p>Nothing has been uploaded yet. <a href="/wiki/Special:Upload">Upload the first file</a>.</p></div>`;
  }
  return `<div class="mw-body wide"><h1 id="firstHeading">File list</h1>
    <p class="helptext">${files.length} file${files.length === 1 ? '' : 's'}. Every one carries an author and a licence, because reuse rights are part of the record.</p>
    <div class="filegrid">
      ${files.map((f) => `<figure class="filecard">
        <a href="/wiki/File:${encodeURIComponent(f.name)}"><img src="/images/${encodeURIComponent(f.name)}" alt="${escAttr(f.name.replace(/_/g, ' '))}" loading="lazy"></a>
        <figcaption>
          <a href="/wiki/File:${encodeURIComponent(f.name)}"><b>${esc(f.name.replace(/_/g, ' '))}</b></a><br>
          <span class="ts">${f.width}&times;${f.height} &middot; ${(f.size / 1024).toFixed(0)} KB &middot; ${esc(f.license || '')}</span><br>
          <span class="ts">${esc(f.author || '')}</span>
        </figcaption>
      </figure>`).join('')}
    </div>
  </div>`;
}
