import {
  parse, parseTitle, fullTitle, nsName, pageUrl, esc, escAttr, extract,
  getSection, replaceSection, expandSignatures,
} from './wikitext.js';
import * as db from './db.js';
import * as sp from './special.js';
import { html, layout, logoSvg, ts, userLink } from './skin.js';
import {
  hashPassword, verifyPassword, createSession, loadSession, destroySession, sessionCookie,
  clearCookie, readCookie, normalizeUsername, USERNAME_RE, can, canEditPage, effectiveGroups,
  isBlocked, clientIp,
} from './auth.js';
import {
  articleView, missingPageView, editView, historyView, diffView, loginView, createAccountView,
  searchView, ratingBox, uploadView, fileView,
} from './views.js';
import { storeUpload, LICENSES, normalizeFileName, ALLOWED, sniffType } from './upload.js';
import { getObject, hasStorage } from './storage.js';

const MAX_LEN = 1_000_000;

function redirect(to, status = 302, headers = {}) {
  return new Response(null, { status, headers: { Location: to, ...headers } });
}
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

/** Logged-in users get a token; anonymous posts are checked by origin. */
function csrfOk(request, ctx, supplied) {
  if (ctx.user) return supplied && supplied === ctx.csrf;
  const origin = request.headers.get('Origin') || request.headers.get('Referer') || '';
  if (!origin) return false;
  try { return new URL(origin).host === new URL(request.url).host; } catch { return false; }
}

async function buildCtx(request, env, url) {
  const token = readCookie(request, 'wp_session');
  const user = token ? await loadSession(env.DB, token) : null;
  return {
    env, request, url, user,
    csrf: user?.csrf || '',
    ip: clientIp(request),
    voterKey: user ? `u:${user.id}` : `ip:${clientIp(request)}`,
    licenses: LICENSES.map(([id, label]) => [id, label]),
    site: {
      name: env.SITE_NAME || 'Witipedia',
      tagline: env.SITE_TAGLINE || "It's funny because it's true.",
      project: env.SITE_NAME || 'Witipedia',
    },
  };
}

// --------------------------------------------------------------- page rendering

async function renderArticle(ctx, t, url) {
  const { env, site } = ctx;
  let page = await db.getPageByKey(env.DB, t.key);
  const oldid = Number(url.searchParams.get('oldid')) || 0;

  // Redirect following, with the "(Redirected from X)" note MediaWiki shows.
  if (page && page.is_redirect && url.searchParams.get('redirect') !== 'no' && !oldid) {
    const target = parseTitle(page.redirect_target || '', site.project);
    const dest = await db.getPageByKey(env.DB, target.key);
    if (dest && dest.id !== page.id) {
      ctx.redirectedFrom = { ns: page.namespace, title: page.title };
      page = dest;
      t = { ns: dest.namespace, title: dest.title, key: dest.page_key };
    }
  }

  const talk = await db.getPageByKey(env.DB, `${t.ns % 2 === 1 ? t.ns : t.ns + 1}:${t.title.replace(/ /g, '_')}`);
  const base = {
    ...ctx, title: t.title, ns: t.ns, page, action: 'view',
    talkExists: !!talk, pageTitle: fullTitle(t.ns, t.title, site.project),
    canEdit: canEditPage(ctx.user, page, ctx.env).ok,
  };

  if (!page) {
    if (t.ns === 6) {
      const file = await db.getFile(env.DB, t.title);
      if (file) return html(base, fileView(base, { file, page: null, rev: null }));
    }
    return html(base, missingPageView(base, t.ns, t.title, base.canEdit), 404);
  }

  const rev = oldid ? await db.getRevision(env.DB, oldid) : await db.currentRevision(env.DB, page);
  if (!rev || rev.page_id !== page.id) return html(base, missingPageView(base, t.ns, t.title, base.canEdit), 404);

  const mine = t.ns === 0 ? await db.myRatings(env.DB, page.id, ctx.voterKey) : {};
  const watched = await db.isWatched(env.DB, ctx.user?.id, page.id);

  // One probe pass tells us which page titles and which files the text needs.
  const probe = parse(rev.content, { exists: () => true, siteName: site.name, projectName: site.project, title: t.title });
  const [existsSet, fileMap] = await Promise.all([
    db.existingKeys(env.DB, probe.links),
    db.filesByName(env.DB, probe.links.filter((k) => k.startsWith('6:')).map((k) => k.slice(2))),
  ]);

  const ctx2 = { ...base, isWatched: watched, description: extract(rev.content, 200), fileMap };

  if (t.ns === 6) {
    const file = await db.getFile(env.DB, t.title);
    return html(ctx2, fileView(ctx2, { file, page, rev, existsSet }));
  }

  let body = articleView(ctx2, page, rev, {
    mine, existsSet, fileMap, oldRev: oldid && oldid !== page.current_rev_id ? rev : null,
  });

  if (t.ns === 0 && t.title === 'Main Page') body += await mainPageExtras(ctx2);
  return html(ctx2, body);
}

async function mainPageExtras(ctx) {
  const [changes, funny, helpful] = await Promise.all([
    db.recentChanges(ctx.env.DB, { limit: 8, namespace: 0 }),
    db.topRated(ctx.env.DB, 'funny', 5),
    db.topRated(ctx.env.DB, 'helpful', 5),
  ]);
  const lb = (rows, icon) => `<ol class="leaderboard">${rows.map((r) =>
    `<li><a href="${pageUrl(r.namespace, r.title, ctx.site.project)}">${esc(r.title)}</a>
      <span class="score">${icon} ${r.up} &nbsp; ${Math.round(r.score * 100)}%</span></li>`).join('')
    || '<li class="helptext">No ratings yet.</li>'}</ol>`;
  return `<div class="mw-body wide" style="padding-top:0">
    <div class="mw-mainpage-grid">
      <div class="mp-box"><h2>Highest rated: funny</h2>${lb(funny, '&#128077;')}
        <p class="helptext"><a href="/wiki/Special:TopRated?axis=funny">Full list</a></p></div>
      <div class="mp-box"><h2>Highest rated: helpful</h2>${lb(helpful, '&#128077;')}
        <p class="helptext"><a href="/wiki/Special:TopRated?axis=helpful">Full list</a></p></div>
    </div>
    <div class="mp-box" style="margin-top:18px"><h2>Recent changes</h2>
      <ul class="changelist">${changes.map((r) => `<li>
        <span class="ts">${ts(r.created_at).split(',')[0]}</span>
        <a href="${pageUrl(r.namespace, r.title, ctx.site.project)}"><b>${esc(r.title)}</b></a>
        (<a href="/wiki/Special:Diff/${r.id}">diff</a>) . . ${userLink(r.user_text, false)}
        ${r.comment ? `<span class="cmt">(${esc(r.comment)})</span>` : ''}</li>`).join('')
        || '<li class="helptext">No edits yet.</li>'}</ul>
      <p class="helptext"><a href="/wiki/Special:RecentChanges">All recent changes</a></p></div>
  </div>`;
}

async function renderEdit(ctx, t, url) {
  const { env, site } = ctx;
  const page = await db.getPageByKey(env.DB, t.key);
  const rev = page ? await db.currentRevision(env.DB, page) : null;
  const perm = canEditPage(ctx.user, page, env);
  const section = url.searchParams.get('section');
  let content = rev?.content || '';
  if (section && rev) content = getSection(content, section) ?? content;
  if (!page && t.ns === 0) {
    content = `'''${t.title}''' is .<ref>Source goes here.</ref>\n\n== History ==\n\n== References ==\n{{reflist}}\n\n[[Category:]]\n`;
  }
  const readOnly = perm.ok ? null
    : perm.reason === 'protected' ? 'This page is fully protected; only administrators can edit it.'
    : perm.reason === 'semi' ? 'This page is semi-protected. You need an autoconfirmed account (4 days old, 10 edits) to edit it.'
    : perm.reason === 'extended' ? 'This page is extended-confirmed protected (30 days, 500 edits).'
    : perm.reason === 'blocked' ? `Your account is blocked${ctx.user?.block_reason ? `: ${esc(ctx.user.block_reason)}` : ''}.`
    : 'Anonymous editing is currently disabled on this site.';
  const base = {
    ...ctx, title: t.title, ns: t.ns, page, action: 'edit', canEdit: perm.ok,
    pageTitle: `Editing ${fullTitle(t.ns, t.title, site.project)}`,
    talkExists: !!(await db.getPageByKey(env.DB, `${t.ns % 2 === 1 ? t.ns : t.ns + 1}:${t.title.replace(/ /g, '_')}`)),
  };
  return html(base, editView(base, { ns: t.ns, title: t.title, content, page, section, readOnly }));
}

async function handleSubmit(ctx, t, request) {
  const { env, site } = ctx;
  const form = await request.formData();
  if (!csrfOk(request, ctx, form.get('csrf'))) return new Response('Bad CSRF token', { status: 403 });

  const page = await db.getPageByKey(env.DB, t.key);
  const perm = canEditPage(ctx.user, page, env);
  const section = form.get('section');
  let text = String(form.get('text') ?? '').replace(/\r\n/g, '\n');
  const summary = String(form.get('summary') ?? '').slice(0, 255);
  const isMinor = !!form.get('minor') && !!ctx.user;
  const watch = !!form.get('watch');

  const base = {
    ...ctx, title: t.title, ns: t.ns, page, action: 'edit', canEdit: perm.ok,
    pageTitle: `Editing ${fullTitle(t.ns, t.title, site.project)}`, talkExists: true,
  };

  if (!perm.ok) {
    return html(base, editView(base, {
      ns: t.ns, title: t.title, content: text, page, section, summary,
      error: 'You do not have permission to edit this page.', readOnly: 'Permission denied.',
    }), 403);
  }
  if (text.length > MAX_LEN) {
    return html(base, editView(base, { ns: t.ns, title: t.title, content: text.slice(0, MAX_LEN), page, section, summary, error: 'That page is too long (1 MB limit).' }), 413);
  }

  const wantPreview = form.get('preview') || !form.get('save');
  const rev = page ? await db.currentRevision(env.DB, page) : null;
  const fullText = section && rev ? replaceSection(rev.content, section, text) : text;

  if (wantPreview) {
    const probe = parse(section ? text : fullText, { exists: () => true, siteName: site.name, projectName: site.project, title: t.title });
    const existsSet = await db.existingKeys(env.DB, probe.links);
    const fileMap = await db.filesByName(env.DB, probe.links.filter((k) => k.startsWith('6:')).map((k) => k.slice(2)));
    const previewParsed = parse(section ? text : fullText, {
      exists: (k) => existsSet.has(k), files: fileMap, siteName: site.name, projectName: site.project,
      title: t.title, sectionEdit: false,
    });
    return html(base, editView(base, {
      ns: t.ns, title: t.title, content: text, page, section, summary,
      preview: true, previewParsed,
    }));
  }

  if (!fullText.trim()) {
    return html(base, editView(base, {
      ns: t.ns, title: t.title, content: text, page, section, summary,
      error: 'Blank pages are not saved. If the article should go, tag it for deletion instead.',
    }), 400);
  }

  const userText = ctx.user ? ctx.user.username : ctx.ip;
  const saved = await db.saveEdit(env.DB, {
    ns: t.ns, title: t.title, projectName: site.project,
    content: expandSignatures(fullText, userText, db.now(), site.project),
    comment: summary || (section ? `/* section edit */` : ''),
    user: ctx.user, userText, isMinor,
  });
  if (ctx.user && watch) {
    await env.DB.prepare('INSERT OR IGNORE INTO watchlist (user_id,page_id) VALUES (?,?)').bind(ctx.user.id, saved.page.id).run();
  }
  return redirect(pageUrl(t.ns, t.title, site.project));
}

async function renderHistory(ctx, t, url) {
  const { env, site } = ctx;
  const page = await db.getPageByKey(env.DB, t.key);
  const base = {
    ...ctx, title: t.title, ns: t.ns, page, action: 'history',
    pageTitle: `Revision history of ${fullTitle(t.ns, t.title, site.project)}`,
    talkExists: true, canEdit: canEditPage(ctx.user, page, env).ok,
  };
  if (!page) return html(base, missingPageView(base, t.ns, t.title, base.canEdit), 404);
  const offset = Number(url.searchParams.get('offset')) || 0;
  const revs = await db.pageHistory(env.DB, page.id, 50, offset);
  return html(base, historyView(base, page, revs, { offset }));
}

async function renderDiffPage(ctx, newId, oldId) {
  const { env, site } = ctx;
  const newRev = await db.getRevision(env.DB, Number(newId));
  if (!newRev) return html({ ...ctx, site }, '<div class="mw-body"><h1 id="firstHeading">No such revision</h1></div>', 404);
  const oldRev = oldId ? await db.getRevision(env.DB, Number(oldId))
    : newRev.parent_id ? await db.getRevision(env.DB, newRev.parent_id) : null;
  const page = await env.DB.prepare('SELECT * FROM pages WHERE id=?').bind(newRev.page_id).first();
  const base = {
    ...ctx, title: page.title, ns: page.namespace, page, action: 'history',
    pageTitle: `Diff of ${fullTitle(page.namespace, page.title, site.project)}`, talkExists: true,
    canEdit: canEditPage(ctx.user, page, env).ok,
  };
  return html(base, diffView(base, page, oldRev, newRev));
}

// ------------------------------------------------------------------ admin forms

async function adminAction(ctx, t, url, request, action) {
  const { env, site } = ctx;
  const groups = effectiveGroups(ctx.user);
  const page = await db.getPageByKey(env.DB, t.key);
  const base = {
    ...ctx, title: t.title, ns: t.ns, page, action: 'view', talkExists: true,
    canEdit: canEditPage(ctx.user, page, env).ok, pageTitle: `${action} ${t.title}`,
  };
  const deny = (msg) => html(base, `<div class="mw-body"><h1 id="firstHeading">Permission denied</h1><div class="errorbox">${esc(msg)}</div></div>`, 403);

  if (action === 'move') {
    if (!ctx.user) return deny('Only logged-in users can move pages.');
    if (!page) return deny('No such page.');
    if (request.method === 'POST') {
      const form = await request.formData();
      if (!csrfOk(request, ctx, form.get('csrf'))) return new Response('Bad CSRF token', { status: 403 });
      const dest = parseTitle(String(form.get('newtitle') || ''), site.project);
      if (!dest.title) return deny('Give a new title.');
      if (await db.getPageByKey(env.DB, dest.key)) return deny('A page already exists at that title.');
      const reason = String(form.get('reason') || '');
      await env.DB.prepare('UPDATE pages SET namespace=?, title=?, page_key=? WHERE id=?')
        .bind(dest.ns, dest.title, dest.key, page.id).run();
      await db.saveEdit(env.DB, {
        ns: t.ns, title: t.title, projectName: site.project,
        content: `#REDIRECT [[${fullTitle(dest.ns, dest.title, site.project)}]]`,
        comment: `${fullTitle(t.ns, t.title, site.project)} moved to ${fullTitle(dest.ns, dest.title, site.project)}${reason ? `: ${reason}` : ''}`,
        user: ctx.user, userText: ctx.user.username, tags: 'move',
      });
      await db.log(env.DB, { type: 'move', action: `moved ${fullTitle(t.ns, t.title, site.project)} to`, userText: ctx.user.username, target: fullTitle(dest.ns, dest.title, site.project), comment: reason });
      return redirect(pageUrl(dest.ns, dest.title, site.project));
    }
    return html(base, `<div class="mw-body"><h1 id="firstHeading">Move ${esc(fullTitle(t.ns, t.title, site.project))}</h1>
      <p class="helptext">Moving a page renames it and leaves a redirect behind, so old links keep working.</p>
      <form class="form-narrow" method="post">
        <input type="hidden" name="csrf" value="${escAttr(ctx.csrf)}">
        <div class="row"><label>New title</label><input name="newtitle" value="${escAttr(fullTitle(t.ns, t.title, site.project))}" required></div>
        <div class="row"><label>Reason</label><input name="reason"></div>
        <button class="btn btn-primary" type="submit">Move page</button>
      </form></div>`);
  }

  if (!groups.includes('sysop')) return deny('Only administrators can do that.');
  if (!page) return deny('No such page.');

  if (action === 'protect') {
    if (request.method === 'POST') {
      const form = await request.formData();
      if (!csrfOk(request, ctx, form.get('csrf'))) return new Response('Bad CSRF token', { status: 403 });
      const level = ['', 'autoconfirmed', 'extendedconfirmed', 'sysop'].includes(String(form.get('level'))) ? String(form.get('level')) : '';
      await env.DB.prepare('UPDATE pages SET protect_edit=? WHERE id=?').bind(level, page.id).run();
      await db.log(env.DB, { type: 'protect', action: level ? `protected (${level})` : 'unprotected', userText: ctx.user.username, target: fullTitle(t.ns, t.title, site.project), comment: String(form.get('reason') || '') });
      return redirect(pageUrl(t.ns, t.title, site.project));
    }
    return html(base, `<div class="mw-body"><h1 id="firstHeading">Protect ${esc(fullTitle(t.ns, t.title, site.project))}</h1>
      <form class="form-narrow" method="post">
        <input type="hidden" name="csrf" value="${escAttr(ctx.csrf)}">
        <div class="row"><label>Edit protection</label>
          <select name="level" class="btn" style="padding:7px;width:100%">
            ${[['', 'Allow all users'], ['autoconfirmed', 'Autoconfirmed users only (semi)'], ['extendedconfirmed', 'Extended confirmed only'], ['sysop', 'Administrators only (full)']]
              .map(([v, l]) => `<option value="${v}"${page.protect_edit === v ? ' selected' : ''}>${esc(l)}</option>`).join('')}
          </select></div>
        <div class="row"><label>Reason</label><input name="reason" placeholder="persistent unsourced jokes"></div>
        <button class="btn btn-primary" type="submit">Apply</button>
      </form></div>`);
  }

  if (action === 'delete') {
    if (request.method === 'POST') {
      const form = await request.formData();
      if (!csrfOk(request, ctx, form.get('csrf'))) return new Response('Bad CSRF token', { status: 403 });
      if (page.namespace === 6) await db.deleteFile(env.DB, env, page.title);
      await env.DB.batch([
        env.DB.prepare('DELETE FROM ratings WHERE page_id=?').bind(page.id),
        env.DB.prepare('DELETE FROM watchlist WHERE page_id=?').bind(page.id),
        env.DB.prepare('DELETE FROM revisions WHERE page_id=?').bind(page.id),
        env.DB.prepare('DELETE FROM pages WHERE id=?').bind(page.id),
      ]);
      await db.log(env.DB, { type: 'delete', action: 'deleted', userText: ctx.user.username, target: fullTitle(t.ns, t.title, site.project), comment: String(form.get('reason') || '') });
      return redirect('/wiki/Special:Log');
    }
    return html(base, `<div class="mw-body"><h1 id="firstHeading">Delete ${esc(fullTitle(t.ns, t.title, site.project))}</h1>
      <div class="errorbox">This removes the page and its entire revision history. There is no undelete yet.</div>
      <form class="form-narrow" method="post">
        <input type="hidden" name="csrf" value="${escAttr(ctx.csrf)}">
        <div class="row"><label>Reason</label><input name="reason" value="not true, just funny" required></div>
        <button class="btn btn-primary" type="submit">Delete page</button>
      </form></div>`);
  }
  return deny('Unknown action.');
}

// ---------------------------------------------------------------- special pages

async function handleSpecial(ctx, rest, request, url) {
  const { env, site } = ctx;
  const [nameRaw, ...args] = rest.split('/');
  const name = nameRaw.toLowerCase();
  const arg = args.join('/').replace(/_/g, ' ');
  const base = { ...ctx, ns: -1, title: nameRaw, pageTitle: `Special:${nameRaw}`, action: 'view' };
  const wrap = (body, status = 200) => html(base, body, status);

  switch (name) {
    case 'random': {
      const r = await env.DB.prepare(
        'SELECT namespace,title FROM pages WHERE namespace=0 AND is_redirect=0 ORDER BY RANDOM() LIMIT 1').first();
      return redirect(r ? pageUrl(r.namespace, r.title, site.project) : '/wiki/Main_Page');
    }
    case 'recentchanges': return wrap(await sp.recentChanges(base, url));
    case 'newpages': return wrap(await sp.newPages(base));
    case 'watchlist': return wrap(await sp.watchlist(base));
    case 'allpages': return wrap(await sp.allPages(base, url));
    case 'toprated': return wrap(await sp.topRated(base, url));
    case 'statistics': return wrap(await sp.statistics(base));
    case 'listusers': case 'users': return wrap(await sp.listUsers(base));
    case 'log': case 'logs': return wrap(await sp.logsView(base));
    case 'shortpages': return wrap(await sp.shortPages(base));
    case 'wantedpages': return wrap(await sp.wantedPages(base));
    case 'specialpages': return wrap(sp.specialPages(base));
    case 'whatlinkshere': return wrap(await sp.whatLinksHere(base, arg || url.searchParams.get('target') || ''));
    case 'pageinfo': return wrap(await sp.pageInfo(base, arg || url.searchParams.get('target') || ''));
    case 'contributions': return wrap(await sp.contributions(base, arg || url.searchParams.get('target') || ''));

    case 'search': {
      const q = (url.searchParams.get('q') || url.searchParams.get('search') || '').trim();
      const nsFilter = url.searchParams.get('ns') ?? '';
      if (q) {
        const exact = await db.getPageByKey(env.DB, parseTitle(q, site.project).key);
        if (exact && url.searchParams.get('fulltext') !== '1') {
          return redirect(pageUrl(exact.namespace, exact.title, site.project));
        }
      }
      const results = q ? await db.search(env.DB, q, { limit: 40, namespace: nsFilter === '' ? null : Number(nsFilter) }) : [];
      return wrap(searchView(base, q, results, { nsFilter }));
    }

    case 'diff': {
      const [a, b] = args;
      return renderDiffPage(ctx, a, b);
    }

    case 'userlogin': {
      if (request.method === 'POST') {
        const form = await request.formData();
        const username = normalizeUsername(form.get('username'));
        const password = String(form.get('password') || '');
        const row = await env.DB.prepare('SELECT * FROM users WHERE username_lc=?').bind(username.toLowerCase()).first();
        const ok = row && await verifyPassword(password, row.password_hash);
        if (!ok) return wrap(loginView(base, { error: 'Incorrect username or password.', name: username }), 401);
        const { token } = await createSession(env.DB, row.id);
        const to = String(form.get('returnto') || '') || '/wiki/Main_Page';
        return redirect(to.startsWith('/') ? to : `/wiki/${encodeURIComponent(to)}`, 302,
          { 'Set-Cookie': sessionCookie(token, url.protocol === 'https:') });
      }
      return wrap(loginView(base, { returnTo: url.searchParams.get('returnto') || '' }));
    }

    case 'createaccount': {
      if (request.method === 'POST') {
        const form = await request.formData();
        const username = normalizeUsername(form.get('username'));
        const password = String(form.get('password') || '');
        const password2 = String(form.get('password2') || '');
        const email = String(form.get('email') || '').slice(0, 200) || null;
        const fail = (msg) => wrap(createAccountView(base, { error: msg, name: username }), 400);
        if (!USERNAME_RE.test(username)) return fail('Usernames must be 2 to 49 characters and start with a letter or number.');
        if (/^(special|user|talk|template|category|help|project)$/i.test(username)) return fail('That username is reserved.');
        if (password.length < 8) return fail('Passwords must be at least 8 characters.');
        if (password !== password2) return fail('The two passwords do not match.');
        const clash = await env.DB.prepare('SELECT 1 AS x FROM users WHERE username_lc=?').bind(username.toLowerCase()).first();
        if (clash) return fail('That username is taken.');
        const hash = await hashPassword(password);
        const ins = await env.DB.prepare(
          'INSERT INTO users (username,username_lc,password_hash,email,created_at) VALUES (?,?,?,?,?)')
          .bind(username, username.toLowerCase(), hash, email, db.now()).run();
        await db.log(env.DB, { type: 'newusers', action: 'created an account', userText: username });
        const { token } = await createSession(env.DB, ins.meta.last_row_id);
        return redirect(`/wiki/User:${encodeURIComponent(username.replace(/ /g, '_'))}`, 302,
          { 'Set-Cookie': sessionCookie(token, url.protocol === 'https:') });
      }
      return wrap(createAccountView(base));
    }

    case 'upload': {
      if (request.method === 'POST') {
        if (!ctx.user) return wrap(uploadView(base), 403);
        const form = await request.formData();
        if (!csrfOk(request, ctx, form.get('csrf'))) return new Response('Bad CSRF token', { status: 403 });
        const fields = {
          name: String(form.get('name') || ''), author: String(form.get('author') || ''),
          source: String(form.get('source') || ''), description: String(form.get('description') || ''),
          license: String(form.get('license') || ''),
        };
        const result = await storeUpload(env, {
          file: form.get('file'), name: fields.name || undefined,
          uploader: ctx.user.username, license: fields.license,
          source: fields.source, author: fields.author,
        });
        if (result.error) return wrap(uploadView(base, { ...fields, error: result.error }), 400);

        const saved = await db.recordFile(env.DB, result.row);
        const display = saved.name.replace(/_/g, ' ');
        const desc = `${fields.description ? `${fields.description}\n\n` : ''}`
          + `{{Infobox\n| title = ${display}\n| author = ${fields.author}\n`
          + `| licence = ${result.row.license_name}\n| source = ${fields.source || 'not stated'}\n}}\n\n`
          + (result.row.license === 'fair-use'
            ? `This file is '''not''' freely licensed. It is used here under a fair-use rationale, set out above. `
              + `If you hold the rights and want it removed, say so on the talk page and it goes, same day. `
              + `See [[${site.project}:Non-free content]].\n\n`
            : `This file is available under the [${result.row.license_url} ${result.row.license_name}] licence.\n\n`)
          + `[[Category:Files]]\n`
          + (result.row.license === 'fair-use' ? `[[Category:Non-free files]]\n` : '');
        await db.saveEdit(env.DB, {
          ns: 6, title: display, projectName: site.project, content: desc,
          comment: `uploaded "${display}"`, user: ctx.user, userText: ctx.user.username, tags: 'upload',
        });
        await db.log(env.DB, {
          type: 'upload', action: 'uploaded', userText: ctx.user.username,
          target: `File:${display}`, comment: `${result.row.width}x${result.row.height}, ${result.row.license_name}`,
        });
        return redirect(`/wiki/File:${encodeURIComponent(saved.name)}`);
      }
      return wrap(uploadView(base));
    }

    case 'listfiles': case 'newfiles': return wrap(await sp.listFilesView(base));

    case 'block': {
      if (!effectiveGroups(ctx.user).includes('sysop')) {
        return wrap('<div class="mw-body"><h1 id="firstHeading">Block user</h1><div class="errorbox">Administrators only.</div></div>', 403);
      }
      if (request.method === 'POST') {
        const form = await request.formData();
        if (!csrfOk(request, ctx, form.get('csrf'))) return new Response('Bad CSRF token', { status: 403 });
        const target = normalizeUsername(form.get('target'));
        const days = Number(form.get('days'));
        const until = days > 0 ? db.now() + days * 86400 : 0;
        const reason = String(form.get('reason') || '');
        const unblock = !!form.get('unblock');
        await env.DB.prepare('UPDATE users SET blocked_until=?, block_reason=?, blocked_by=? WHERE username_lc=?')
          .bind(unblock ? null : until, unblock ? null : reason, unblock ? null : ctx.user.username, target.toLowerCase()).run();
        await db.log(env.DB, {
          type: 'block', action: unblock ? 'unblocked' : `blocked (${days > 0 ? `${days} days` : 'indefinite'})`,
          userText: ctx.user.username, target: `User:${target}`, comment: reason,
        });
        return redirect('/wiki/Special:Log');
      }
      return wrap(`<div class="mw-body"><h1 id="firstHeading">Block user</h1>
        <form class="form-narrow" method="post">
          <input type="hidden" name="csrf" value="${escAttr(ctx.csrf)}">
          <div class="row"><label>Username</label><input name="target" value="${escAttr(arg)}" required></div>
          <div class="row"><label>Duration in days (0 = indefinite)</label><input name="days" type="number" value="3" min="0"></div>
          <div class="row"><label>Reason</label><input name="reason" placeholder="inventing facts to save a punchline"></div>
          <div class="row"><label><input type="checkbox" name="unblock" value="1"> Unblock instead</label></div>
          <button class="btn btn-primary" type="submit">Apply</button>
        </form></div>`);
    }

    case 'userrights': {
      if (!effectiveGroups(ctx.user).includes('bureaucrat')) {
        return wrap('<div class="mw-body"><h1 id="firstHeading">User rights</h1><div class="errorbox">Bureaucrats only.</div></div>', 403);
      }
      if (request.method === 'POST') {
        const form = await request.formData();
        if (!csrfOk(request, ctx, form.get('csrf'))) return new Response('Bad CSRF token', { status: 403 });
        const target = normalizeUsername(form.get('target'));
        const groups = ['sysop', 'bureaucrat', 'editor', 'bot'].filter((g) => form.get(g));
        await env.DB.prepare('UPDATE users SET groups=? WHERE username_lc=?').bind(groups.join(','), target.toLowerCase()).run();
        await db.log(env.DB, { type: 'rights', action: `changed group membership to [${groups.join(', ') || 'none'}] for`, userText: ctx.user.username, target: `User:${target}`, comment: String(form.get('reason') || '') });
        return redirect('/wiki/Special:Log');
      }
      const target = arg ? await env.DB.prepare('SELECT * FROM users WHERE username_lc=?').bind(arg.toLowerCase()).first() : null;
      const has = new Set(String(target?.groups || '').split(',').filter(Boolean));
      return wrap(`<div class="mw-body"><h1 id="firstHeading">User rights management</h1>
        <form class="form-narrow" method="post">
          <input type="hidden" name="csrf" value="${escAttr(ctx.csrf)}">
          <div class="row"><label>Username</label><input name="target" value="${escAttr(arg)}" required></div>
          ${['sysop', 'bureaucrat', 'editor', 'bot'].map((g) => `<div class="row"><label><input type="checkbox" name="${g}" value="1"${has.has(g) ? ' checked' : ''}> ${g}</label></div>`).join('')}
          <div class="row"><label>Reason</label><input name="reason"></div>
          <button class="btn btn-primary" type="submit">Save user groups</button>
        </form></div>`);
    }

    default:
      return wrap(`<div class="mw-body"><h1 id="firstHeading">Special:${esc(nameRaw)}</h1>
        <div class="errorbox">There is no special page with this name.</div>
        <p><a href="/wiki/Special:SpecialPages">List of all special pages</a></p></div>`, 404);
  }
}

// -------------------------------------------------------------------- api + main

async function handleApi(ctx, path, request, url) {
  const { env, site } = ctx;

  if (path === '/api/search') {
    const q = (url.searchParams.get('q') || '').trim();
    if (q.length < 2) return json({ results: [] });
    const rows = await db.search(env.DB, q, { limit: 7 });
    return json({
      results: rows.map((r) => ({
        title: esc(fullTitle(r.namespace, r.title, site.project)),
        snippet: esc(r.snippet.slice(0, 110)),
        url: pageUrl(r.namespace, r.title, site.project),
      })),
    });
  }

  if (path === '/api/rate' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    if (!csrfOk(request, ctx, body.csrf)) return json({ error: 'Session expired. Reload the page.' }, 403);
    const t = parseTitle(String(body.page || ''), site.project);
    const page = await db.getPageByKey(env.DB, t.key);
    if (!page) return json({ error: 'No such page.' }, 404);
    const axis = body.axis === 'helpful' ? 'helpful' : 'funny';
    const value = Number(body.value) === -1 ? -1 : 1;
    const counts = await db.rate(env.DB, page.id, ctx.voterKey, axis, value);
    const mine = await db.myRatings(env.DB, page.id, ctx.voterKey);
    return json({ ...counts, mine: mine[axis] ?? 0 });
  }

  if (path === '/api/watch' && request.method === 'POST') {
    const form = await request.formData();
    if (!ctx.user) return redirect('/wiki/Special:UserLogin');
    if (!csrfOk(request, ctx, form.get('csrf'))) return new Response('Bad CSRF token', { status: 403 });
    const t = parseTitle(String(form.get('page') || ''), site.project);
    const page = await db.getPageByKey(env.DB, t.key);
    if (page) {
      const watched = await db.isWatched(env.DB, ctx.user.id, page.id);
      if (watched) await env.DB.prepare('DELETE FROM watchlist WHERE user_id=? AND page_id=?').bind(ctx.user.id, page.id).run();
      else await env.DB.prepare('INSERT OR IGNORE INTO watchlist (user_id,page_id) VALUES (?,?)').bind(ctx.user.id, page.id).run();
    }
    return redirect(pageUrl(t.ns, t.title, site.project));
  }

  if ((path === '/api/rollback' || path === '/api/undo') && request.method === 'POST') {
    const form = await request.formData();
    if (!csrfOk(request, ctx, form.get('csrf'))) return new Response('Bad CSRF token', { status: 403 });
    const t = parseTitle(String(form.get('page') || ''), site.project);
    const page = await db.getPageByKey(env.DB, t.key);
    if (!page) return new Response('No such page', { status: 404 });
    const isRollback = path === '/api/rollback';
    if (isRollback && !effectiveGroups(ctx.user).some((g) => ['autoconfirmed', 'sysop', 'editor'].includes(g))) {
      return new Response('Rollback needs an autoconfirmed account.', { status: 403 });
    }
    const perm = canEditPage(ctx.user, page, env);
    if (!perm.ok) return new Response('You cannot edit this page.', { status: 403 });
    const targetId = Number(form.get(isRollback ? 'to' : 'oldid'));
    const target = await db.getRevision(env.DB, targetId);
    if (!target || target.page_id !== page.id) return new Response('No such revision', { status: 404 });
    const current = await db.currentRevision(env.DB, page);
    const userText = ctx.user ? ctx.user.username : ctx.ip;
    await db.saveEdit(env.DB, {
      ns: page.namespace, title: page.title, projectName: site.project, content: target.content,
      comment: isRollback
        ? `Reverted edits by [[Special:Contributions/${current.user_text}|${current.user_text}]] to last revision by ${target.user_text}`
        : `Restored revision ${target.id} by ${target.user_text}`,
      user: ctx.user, userText, tags: isRollback ? 'rollback' : 'undo',
    });
    return redirect(pageUrl(page.namespace, page.title, site.project, '?action=history'));
  }

  return new Response('Not found', { status: 404 });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = decodeURIComponent(url.pathname);

    if (path === '/favicon.svg') {
      return new Response(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44" height="44">
        <rect width="44" height="44" fill="#fff"/><g color="#202122">${logoSvg(44).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</g></svg>`,
        { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' } });
    }
    if (path.startsWith('/images/')) {
      const name = decodeURIComponent(path.slice('/images/'.length)).replace(/ /g, '_');
      const file = await env.DB.prepare('SELECT * FROM files WHERE name = ?').bind(name).first();
      if (!file) return new Response('No such file', { status: 404 });
      if (!hasStorage(env)) return new Response('File storage is not configured', { status: 503 });
      const etag = `"${file.sha1}"`;
      if (request.headers.get('If-None-Match') === etag) return new Response(null, { status: 304 });
      const object = await getObject(env, file.r2_key);
      if (!object) return new Response('The stored copy of this file is missing', { status: 404 });
      return new Response(object.body, {
        headers: {
          'Content-Type': file.mime,
          'Cache-Control': 'public, max-age=86400',
          'Content-Disposition': `inline; filename="${file.name.replace(/[^\w.-]/g, '_')}"`,
          'X-Content-Type-Options': 'nosniff',
          ETag: etag,
        },
      });
    }

    if (path === '/robots.txt') {
      return new Response('User-agent: *\nDisallow: /w/\nAllow: /\n', { headers: { 'Content-Type': 'text/plain' } });
    }

    const ctx = await buildCtx(request, env, url);
    const { site } = ctx;

    try {
      if (path === '/' ) return redirect('/wiki/Main_Page');
      if (path === '/logout' && request.method === 'POST') {
        const form = await request.formData();
        if (!csrfOk(request, ctx, form.get('csrf'))) return new Response('Bad CSRF token', { status: 403 });
        await destroySession(env.DB, readCookie(request, 'wp_session'));
        return redirect('/wiki/Main_Page', 302, { 'Set-Cookie': clearCookie(url.protocol === 'https:') });
      }
      if (path.startsWith('/api/')) return handleApi(ctx, path, request, url);

      // /w/index.php?title=X&action=Y, kept because Wikipedia URLs look like this
      if (path === '/w/index.php') {
        const titleParam = url.searchParams.get('title');
        if (!titleParam) return redirect('/wiki/Main_Page');
        const qs = new URLSearchParams(url.searchParams);
        qs.delete('title');
        const t = parseTitle(titleParam, site.project);
        return redirect(pageUrl(t.ns, t.title, site.project, qs.toString() ? `?${qs}` : ''));
      }

      if (!path.startsWith('/wiki/')) {
        // Bare /Some_Title also works.
        if (path.length > 1 && !path.includes('.')) return redirect(`/wiki${path}${url.search}`);
        return html({ ...ctx, ns: -1, title: '', pageTitle: 'Not found' },
          '<div class="mw-body"><h1 id="firstHeading">Not found</h1><p>No such URL. <a href="/wiki/Main_Page">Main page</a>.</p></div>', 404);
      }

      const rest = path.slice('/wiki/'.length);
      if (!rest) return redirect('/wiki/Main_Page');

      if (/^special:/i.test(rest)) return handleSpecial(ctx, rest.slice(rest.indexOf(':') + 1), request, url);

      const t = parseTitle(rest, site.project);
      if (!t.title) return redirect('/wiki/Main_Page');

      const action = (url.searchParams.get('action') || 'view').toLowerCase();

      if (action === 'raw') {
        const page = await db.getPageByKey(env.DB, t.key);
        const rev = page ? await db.currentRevision(env.DB, page) : null;
        return new Response(rev?.content ?? '', {
          status: rev ? 200 : 404,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      }
      if (action === 'submit' && request.method === 'POST') return handleSubmit(ctx, t, request);
      if (action === 'edit') return renderEdit(ctx, t, url);
      if (action === 'history') return renderHistory(ctx, t, url);
      if (['protect', 'delete', 'move'].includes(action)) return adminAction(ctx, t, url, request, action);
      if (url.searchParams.get('diff')) {
        return renderDiffPage(ctx, url.searchParams.get('diff'), url.searchParams.get('oldid'));
      }
      return renderArticle(ctx, t, url);
    } catch (err) {
      return html({ ...ctx, ns: -1, title: '', pageTitle: 'Error' },
        `<div class="mw-body"><h1 id="firstHeading">Something broke</h1>
         <div class="errorbox">${esc(String(err && err.message || err))}</div>
         <p class="helptext">If this keeps happening, it is a bug in the site rather than in your edit.</p></div>`, 500);
    }
  },
};
