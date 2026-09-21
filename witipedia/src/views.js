import { parse, esc, escAttr, pageUrl, fullTitle, nsName } from './wikitext.js';
import { ts, userLink, byteDelta } from './skin.js';
import { renderDiff } from './diff.js';
import { effectiveGroups } from './auth.js';

const pct = (up, down) => {
  const total = up + down;
  return total ? `${Math.round((up / total) * 100)}% of ${total} ${total === 1 ? 'reader' : 'readers'} said yes` : 'No ratings yet';
};

export function ratingBox(ctx, page, mine = {}) {
  const key = escAttr(fullTitle(page.namespace, page.title, ctx.site.project));
  const row = (axis, label, sub, up, down) => {
    const total = up + down;
    const width = total ? Math.round((up / total) * 100) : 0;
    const btn = (value, icon, n) => `<button class="vote${mine[axis] === value ? ' on' : ''}" type="button"
        data-page="${key}" data-axis="${axis}" data-value="${value}" data-csrf="${escAttr(ctx.csrf || '')}"
        aria-label="${value === 1 ? 'Yes' : 'No'} for ${escAttr(label)}">
        <span class="ico">${icon}</span><span class="n">${n}</span></button>`;
    return `<div class="rating-row">
      <span class="rating-label"><b>${esc(label)}</b><span>${esc(sub)}</span></span>
      ${btn(1, '&#128077;', up)}${btn(-1, '&#128078;', down)}
      <span class="bar${axis === 'funny' ? ' f' : ''}"><i style="width:${width}%"></i></span>
      <span class="rating-pct">${esc(pct(up, down))}</span>
    </div>`;
  };
  return `<section class="rating-box" aria-label="Rate this article">
    <h2>Rate this article</h2>
    <p class="rb-sub">Two questions, two separate answers. An article can be useless and hilarious, or accurate and dull; the ratings are kept apart so editors can tell which problem they have.${ctx.user ? '' : ' Anonymous ratings are counted per IP address.'}</p>
    <div class="rating-rows">
      ${row('helpful', 'Was this helpful?', 'Did you actually learn the thing?', page.rating_helpful_up, page.rating_helpful_down)}
      ${row('funny', 'Was this funny?', 'Did the joke land, and was it true?', page.rating_funny_up, page.rating_funny_down)}
    </div>
  </section>`;
}

export function articleView(ctx, page, rev, { mine = {}, oldRev = null, existsSet = new Set(), fileMap = {} } = {}) {
  const { site } = ctx;
  const title = fullTitle(page.namespace, page.title, site.project);
  const parsed = parse(rev.content, {
    exists: (k) => existsSet.has(k), files: fileMap,
    siteName: site.name, projectName: site.project, title: page.title,
    editUrl: pageUrl(page.namespace, page.title, site.project, '?action=edit'),
  });
  const cats = parsed.categories.length
    ? `<div class="catlinks"><b>Categories</b>: <ul>${parsed.categories.map((c) =>
        `<li><a class="${existsSet.has(`14:${c.replace(/ /g, '_')}`) ? '' : 'new'}" href="/wiki/Category:${encodeURIComponent(c.replace(/ /g, '_'))}">${esc(c)}</a></li>`).join('')}</ul></div>`
    : '';
  const oldNotice = oldRev ? `<div class="mw-revision">
      This is an <b>old revision</b> of this page, as edited by ${userLink(oldRev.user_text, false)} at ${ts(oldRev.created_at)}.
      It may differ significantly from the <a href="${pageUrl(page.namespace, page.title, site.project)}">current revision</a>.
      ${oldRev.parent_id ? `<a href="/wiki/Special:Diff/${oldRev.id}">(diff from previous)</a>` : ''}
    </div>` : '';
  const redirNote = ctx.redirectedFrom
    ? `<div class="tagline">(Redirected from <a href="${pageUrl(ctx.redirectedFrom.ns, ctx.redirectedFrom.title, site.project, '?redirect=no')}">${esc(fullTitle(ctx.redirectedFrom.ns, ctx.redirectedFrom.title, site.project))}</a>)</div>`
    : '';
  const protectNote = page.protect_edit && page.title !== 'Main Page'
    ? `<div class="editnotice">This page is ${page.protect_edit === 'sysop' ? 'fully protected' : `semi-protected (${esc(page.protect_edit)})`}. Discuss changes on the <a href="${pageUrl((page.namespace % 2 ? page.namespace : page.namespace + 1), page.title, site.project)}">talk page</a>.</div>`
    : '';
  return `<div class="mw-body">
    <h1 id="firstHeading">${esc(title)}</h1>
    <div class="tagline">From ${esc(site.name)}, the funny encyclopedia</div>
    ${redirNote}${oldNotice}${protectNote}
    <div class="mw-parser-output">
      ${parsed.toc}
      ${parsed.html}
    </div>
  </div>
  ${cats}
  ${page.namespace === 0 && !oldRev && page.title !== 'Main Page' ? ratingBox(ctx, page, mine) : ''}`;
}

export function missingPageView(ctx, ns, title, canEdit) {
  const { site } = ctx;
  const full = fullTitle(ns, title, site.project);
  return `<div class="mw-body">
    <h1 id="firstHeading">${esc(full)}</h1>
    <div class="tagline">From ${esc(site.name)}, the funny encyclopedia</div>
    <div class="mw-parser-output">
      <p><b>${esc(site.name)} does not have an article with this exact name.</b></p>
      <ul>
        <li>Search for <a href="/wiki/Special:Search?q=${encodeURIComponent(title)}"><i>${esc(title)}</i></a> in other pages.</li>
        ${canEdit
          ? `<li><a href="${pageUrl(ns, title, site.project, '?action=edit')}"><b>Start the article <i>${esc(title)}</i></b></a>. It has to be true. It should also be funny.</li>`
          : `<li><a href="/wiki/Special:UserLogin">Log in</a> to create it.</li>`}
        <li>Read <a href="/wiki/${encodeURIComponent(site.project)}:Be_funny">how the humour rules work</a> before you start.</li>
      </ul>
    </div>
  </div>`;
}

const TOOLBAR = `<div class="edit-toolbar" role="toolbar" aria-label="Editing tools">
  <button type="button" data-wrap="'''" title="Bold"><b>B</b></button>
  <button type="button" data-wrap="''" title="Italic"><i>I</i></button>
  <button type="button" data-wrap="[[|]]" title="Internal link">[[Link]]</button>
  <button type="button" data-wrap="&lt;ref&gt;|&lt;/ref&gt;" title="Reference (you will need one)">&lt;ref&gt;</button>
  <button type="button" data-insert="&#10;== Section ==&#10;" title="Heading">== H ==</button>
  <button type="button" data-insert="{{reflist}}" title="Reference list">{{reflist}}</button>
  <button type="button" data-insert="{{cn}}" title="Citation needed">{{cn}}</button>
  <button type="button" data-insert="{{jn}}" title="Joke needed">{{jn}}</button>
  <button type="button" data-insert="{{true and funny|source=}}" title="Fact-checked joke">{{true and funny}}</button>
  <button type="button" data-insert="~~~~" title="Sign your post">~~~~</button>
</div>`;

export function editView(ctx, { ns, title, content, page, section, preview, previewParsed, error, readOnly, summary = '' }) {
  const { site, user } = ctx;
  const full = fullTitle(ns, title, site.project);
  const isTalk = ns % 2 === 1;
  const notice = readOnly
    ? `<div class="editnotice"><b>You are viewing the source of this page.</b> ${readOnly}</div>`
    : `<div class="editnotice">
        ${page ? 'You are editing an existing page.' : `You are creating <b>${esc(full)}</b>.`}
        ${user ? '' : `You are not logged in. Your <b>IP address (${esc(ctx.ip)})</b> will be recorded in this page's edit history, exactly as on Wikipedia. <a href="/wiki/Special:CreateAccount">Create an account</a> to keep your edits under a name.`}
        ${isTalk ? ' Sign talk-page comments with <code>~~~~</code>.' : ''}
      </div>`;
  return `<div class="mw-body wide">
    <h1 id="firstHeading">${readOnly ? 'View source for' : (page ? 'Editing' : 'Creating')} ${esc(full)}${section ? ` (section)` : ''}</h1>
    ${error ? `<div class="errorbox">${error}</div>` : ''}
    ${notice}
    ${preview ? `<h2>Preview</h2>
      <div class="editnotice">Remember: this is a preview. Nothing is saved yet.</div>
      <div class="mw-parser-output">${previewParsed.toc}${previewParsed.html}</div><hr>` : ''}
    <form class="editform" method="post" action="${pageUrl(ns, title, site.project, '?action=submit')}">
      <input type="hidden" name="csrf" value="${escAttr(ctx.csrf || '')}">
      ${section ? `<input type="hidden" name="section" value="${escAttr(section)}">` : ''}
      ${TOOLBAR}
      <textarea name="text" id="wpTextbox1" spellcheck="false" ${readOnly ? 'readonly' : ''}>${esc(content)}</textarea>
      ${readOnly ? '' : `
      <div class="row">
        <label for="wpSummary"><b>Edit summary</b> (briefly describe your changes)</label><br>
        <input class="summary" type="text" id="wpSummary" name="summary" maxlength="255" value="${escAttr(summary)}" placeholder="e.g. added source for the badger claim">
      </div>
      <div class="row">
        ${user ? `<label><input type="checkbox" name="minor" value="1"> This is a minor edit</label>
        &nbsp;&nbsp;<label><input type="checkbox" name="watch" value="1" checked> Watch this page</label>` : ''}
      </div>
      <div class="buttons">
        <button class="btn btn-primary" type="submit" name="save" value="1">Save changes</button>
        <button class="btn" type="submit" name="preview" value="1">Show preview</button>
        <button class="btn" type="submit" name="diff" value="1">Show changes</button>
        <a class="btn" href="${pageUrl(ns, title, site.project)}">Cancel</a>
      </div>
      <p class="copywarn">By saving, you agree to release your contribution under the <a class="external" target="_blank" rel="noopener nofollow" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> licence. You also agree that anything you write here is <b>true</b>: jokes that require the facts to bend belong on a different website. Unsourced claims get reverted, however good the punchline is.</p>`}
    </form>
  </div>
  <script>
  (function(){
    var ta=document.getElementById('wpTextbox1');
    document.querySelectorAll('.edit-toolbar button').forEach(function(b){
      b.addEventListener('click',function(){
        var s=ta.selectionStart,e=ta.selectionEnd,v=ta.value,sel=v.slice(s,e);
        var wrap=b.dataset.wrap, ins=b.dataset.insert, out, caret;
        if(wrap){var parts=wrap.indexOf('|')>=0?wrap.split('|'):[wrap,wrap];
          out=v.slice(0,s)+parts[0]+sel+parts[1]+v.slice(e); caret=s+parts[0].length+sel.length;}
        else {out=v.slice(0,s)+ins+v.slice(e); caret=s+ins.length;}
        ta.value=out; ta.focus(); ta.setSelectionRange(caret,caret);
      });
    });
  })();
  </script>`;
}

export function historyView(ctx, page, revs, { offset = 0, limit = 50 } = {}) {
  const { site, user } = ctx;
  const full = fullTitle(page.namespace, page.title, site.project);
  const canRollback = effectiveGroups(user).some((g) => ['autoconfirmed', 'sysop', 'editor'].includes(g));
  const items = revs.map((r, i) => {
    const isCurrent = r.id === page.current_rev_id;
    const prev = revs[i + 1];
    return `<li>
      <span class="ts"><a href="${pageUrl(page.namespace, page.title, site.project, `?oldid=${r.id}`)}">${ts(r.created_at)}</a></span>
      ${prev ? ` (<a href="/wiki/Special:Diff/${r.id}">prev</a>)` : ' (prev)'}
      ${isCurrent ? ' (cur)' : ` (<a href="/wiki/Special:Diff/${page.current_rev_id}/${r.id}">cur</a>)`}
      . . ${userLink(r.user_text)}
      . . <span class="ts">(${r.len.toLocaleString('en-US')} bytes)</span> ${byteDelta(r.len, r.parent_len)}
      ${r.is_minor ? '<span class="minor" title="Minor edit">m</span>' : ''}
      ${String(r.tags || '').split(',').filter(Boolean).map((t) => `<span class="tag">${esc(t)}</span>`).join(' ')}
      ${r.comment ? `<span class="cmt">(${esc(r.comment)})</span>` : '<span class="cmt">(no edit summary)</span>'}
      ${isCurrent && canRollback && revs[1] ? `
        <form method="post" action="/api/rollback" style="display:inline">
          <input type="hidden" name="csrf" value="${escAttr(ctx.csrf || '')}">
          <input type="hidden" name="page" value="${escAttr(full)}">
          <input type="hidden" name="to" value="${revs[1].id}">
          <button class="btn" style="padding:0 5px;font-size:12px" title="Revert to the previous revision">rollback</button>
        </form>` : ''}
      ${!isCurrent ? `
        <form method="post" action="/api/undo" style="display:inline">
          <input type="hidden" name="csrf" value="${escAttr(ctx.csrf || '')}">
          <input type="hidden" name="page" value="${escAttr(full)}">
          <input type="hidden" name="oldid" value="${r.id}">
          <button class="btn" style="padding:0 5px;font-size:12px" title="Restore this revision">restore</button>
        </form>` : ''}
    </li>`;
  }).join('');
  return `<div class="mw-body wide">
    <h1 id="firstHeading">${esc(full)}: Revision history</h1>
    <p class="helptext">Every version ever saved, oldest changes at the bottom. Nothing is ever really deleted, which is why edit wars here are fought with sources rather than with the delete key.</p>
    <ul class="changelist">${items || '<li>No revisions.</li>'}</ul>
    <div class="pager">
      ${offset > 0 ? `<a href="${pageUrl(page.namespace, page.title, site.project, `?action=history&offset=${Math.max(0, offset - limit)}`)}">&larr; newer ${limit}</a>` : ''}
      ${revs.length === limit ? `<a href="${pageUrl(page.namespace, page.title, site.project, `?action=history&offset=${offset + limit}`)}">older ${limit} &rarr;</a>` : ''}
    </div>
  </div>`;
}

export function diffView(ctx, page, oldRev, newRev) {
  const { site } = ctx;
  const full = fullTitle(page.namespace, page.title, site.project);
  const head = (r, label) => r
    ? `<td colspan="2" class="diff-title"><a href="${pageUrl(page.namespace, page.title, site.project, `?oldid=${r.id}`)}">${label} (${ts(r.created_at)})</a>
        &nbsp;${userLink(r.user_text, false)} <span class="cmt">${r.comment ? `(${esc(r.comment)})` : '(no edit summary)'}</span></td>`
    : '<td colspan="2" class="diff-title">(page creation)</td>';
  const table = renderDiff(oldRev?.content || '', newRev.content);
  return `<div class="mw-body wide">
    <h1 id="firstHeading">${esc(full)}: Difference between revisions</h1>
    <table class="diff" style="margin-bottom:0"><tbody><tr>${head(oldRev, 'Older revision')}${head(newRev, 'Newer revision')}</tr></tbody></table>
    ${table}
    <p><a href="${pageUrl(page.namespace, page.title, site.project)}">&larr; Back to ${esc(full)}</a>
      &nbsp;|&nbsp; <a href="${pageUrl(page.namespace, page.title, site.project, '?action=history')}">Full history</a></p>
  </div>`;
}

export function loginView(ctx, { error, name = '', returnTo = '' } = {}) {
  return `<div class="mw-body">
    <h1 id="firstHeading">Log in</h1>
    ${error ? `<div class="errorbox">${esc(error)}</div>` : ''}
    <form class="form-narrow" method="post" action="/wiki/Special:UserLogin">
      <input type="hidden" name="csrf" value="${escAttr(ctx.csrf || '')}">
      <input type="hidden" name="returnto" value="${escAttr(returnTo)}">
      <div class="row"><label for="u">Username</label><input id="u" name="username" value="${escAttr(name)}" autocomplete="username" required></div>
      <div class="row"><label for="p">Password</label><input id="p" name="password" type="password" autocomplete="current-password" required></div>
      <div class="row"><button class="btn btn-primary" type="submit">Log in</button></div>
      <p class="helptext">No account? <a href="/wiki/Special:CreateAccount">Create one</a>. You do not need one to edit, but an account gets you a watchlist, a signature, and a route to <a href="/wiki/${encodeURIComponent(ctx.site.project)}:Administrators">adminship</a> if you stick around.</p>
    </form>
  </div>`;
}

export function createAccountView(ctx, { error, name = '' } = {}) {
  return `<div class="mw-body">
    <h1 id="firstHeading">Create account</h1>
    ${error ? `<div class="errorbox">${esc(error)}</div>` : ''}
    <form class="form-narrow" method="post" action="/wiki/Special:CreateAccount">
      <input type="hidden" name="csrf" value="${escAttr(ctx.csrf || '')}">
      <div class="row"><label for="u">Username</label><input id="u" name="username" value="${escAttr(name)}" autocomplete="username" required>
        <span class="helptext">Shown on every edit you make. Pick something you can live with.</span></div>
      <div class="row"><label for="p">Password</label><input id="p" name="password" type="password" autocomplete="new-password" minlength="8" required>
        <span class="helptext">At least 8 characters.</span></div>
      <div class="row"><label for="p2">Confirm password</label><input id="p2" name="password2" type="password" autocomplete="new-password" required></div>
      <div class="row"><label for="e">Email (optional)</label><input id="e" name="email" type="email" autocomplete="email">
        <span class="helptext">Only used for password recovery. Never shown.</span></div>
      <div class="row"><button class="btn btn-primary" type="submit">Create account</button></div>
      <p class="helptext">New accounts start with no special rights. After <b>4 days and 10 edits</b> you become <i>autoconfirmed</i> and can edit semi-protected pages and use rollback. After <b>30 days and 500 edits</b> you are <i>extended confirmed</i>. Administrators are elected by the community at <a href="/wiki/${encodeURIComponent(ctx.site.project)}:Requests_for_adminship">requests for adminship</a>. Identical to Wikipedia, on purpose.</p>
    </form>
  </div>`;
}

export function searchView(ctx, q, results, { nsFilter = '' } = {}) {
  const { site } = ctx;
  const rows = results.map((r) => `<div class="searchresult">
      <div class="sr-title"><a href="${pageUrl(r.namespace, r.title, site.project)}">${esc(fullTitle(r.namespace, r.title, site.project))}</a></div>
      <div class="sr-snip">${esc(r.snippet)}</div>
      <div class="sr-meta">${r.len.toLocaleString('en-US')} bytes &middot; ${ts(r.touched_at)}
        ${r.rating_funny_up ? `&middot; &#128077; ${r.rating_funny_up} funny` : ''}
        ${r.rating_helpful_up ? `&middot; &#128077; ${r.rating_helpful_up} helpful` : ''}</div>
    </div>`).join('');
  return `<div class="mw-body">
    <h1 id="firstHeading">Search results</h1>
    <form method="get" action="/wiki/Special:Search" style="margin:10px 0">
      <input class="summary" type="search" name="q" value="${escAttr(q)}" style="max-width:420px">
      <select name="ns" class="btn" style="padding:6px">
        <option value=""${nsFilter === '' ? ' selected' : ''}>All namespaces</option>
        <option value="0"${nsFilter === '0' ? ' selected' : ''}>(Articles)</option>
        <option value="1"${nsFilter === '1' ? ' selected' : ''}>Talk</option>
        <option value="2"${nsFilter === '2' ? ' selected' : ''}>User</option>
        <option value="4"${nsFilter === '4' ? ' selected' : ''}>${esc(site.project)}</option>
        <option value="10"${nsFilter === '10' ? ' selected' : ''}>Template</option>
      </select>
      <button class="btn btn-primary" type="submit">Search</button>
    </form>
    ${q ? `<p class="helptext">${results.length} result${results.length === 1 ? '' : 's'} for <b>${esc(q)}</b>.
      ${results.length ? '' : `There is no page with this title yet. <a href="/wiki/${encodeURIComponent(q.replace(/ /g, '_'))}?action=edit">Create it</a>.`}</p>` : ''}
    ${rows}
  </div>`;
}

// ----------------------------------------------------------------------- files

export function uploadView(ctx, { error, ok, name = '', author = '', source = '', description = '', license = '' } = {}) {
  const { site, user, licenses } = ctx;
  if (!user) {
    return `<div class="mw-body"><h1 id="firstHeading">Upload a file</h1>
      <p>You need an account to upload. <a href="/wiki/Special:UserLogin?returnto=Special:Upload">Log in</a> or
      <a href="/wiki/Special:CreateAccount">create one</a>. Anonymous editing stays open; uploads are named because
      somebody has to be answerable for the copyright.</p></div>`;
  }
  return `<div class="mw-body">
    <h1 id="firstHeading">Upload a file</h1>
    ${error ? `<div class="errorbox">${esc(error)}</div>` : ''}
    ${ok ? `<div class="successbox">${ok}</div>` : ''}
    <div class="editnotice">
      <b>Only upload pictures you are allowed to upload.</b> Anything free to reuse works: your own photographs,
      <a class="external" target="_blank" rel="noopener nofollow" href="https://commons.wikimedia.org/">Wikimedia Commons</a>,
      public domain material. A picture you found on a search engine is somebody's property and gets deleted.
      JPEG, PNG, GIF or WebP, up to 10 MB.
    </div>
    <form class="form-narrow" method="post" action="/wiki/Special:Upload" enctype="multipart/form-data" style="max-width:560px">
      <input type="hidden" name="csrf" value="${escAttr(ctx.csrf || '')}">
      <div class="row"><label for="f">Source file</label><input id="f" type="file" name="file" accept="image/jpeg,image/png,image/gif,image/webp" required></div>
      <div class="row"><label for="n">Destination filename</label><input id="n" name="name" value="${escAttr(name)}" placeholder="Emu at Campion.jpg">
        <span class="helptext">Descriptive, not IMG_4021. The extension is added for you.</span></div>
      <div class="row"><label for="d">Description</label><input id="d" name="description" value="${escAttr(description)}" placeholder="An emu, mid-outrun, Western Australia">
      </div>
      <div class="row"><label for="a">Author</label><input id="a" name="author" value="${escAttr(author)}" placeholder="Jane Photographer, or: Own work" required></div>
      <div class="row"><label for="s">Source</label><input id="s" name="source" value="${escAttr(source)}" placeholder="https://commons.wikimedia.org/wiki/File:..."></div>
      <div class="row"><label for="l">Licence</label>
        <select id="l" name="license" class="btn" style="width:100%;padding:8px" required>
          <option value="">Choose one</option>
          ${licenses.map(([id, label]) => `<option value="${escAttr(id)}"${license === id ? ' selected' : ''}>${esc(label)}</option>`).join('')}
        </select></div>
      <div class="row"><button class="btn btn-primary" type="submit">Upload file</button>
        &nbsp;<a class="btn" href="/wiki/Special:ListFiles">All files</a></div>
    </form>
  </div>`;
}

export function fileView(ctx, { file, page, rev, existsSet = new Set(), mine = {} }) {
  const { site } = ctx;
  const display = file ? file.name.replace(/_/g, ' ') : ctx.title;
  const parsed = rev ? parse(rev.content, {
    exists: (k) => existsSet.has(k), siteName: site.name, projectName: site.project,
    title: display, files: ctx.fileMap || {},
    editUrl: pageUrl(6, ctx.title, site.project, '?action=edit'),
  }) : null;

  if (!file) {
    return `<div class="mw-body">
      <h1 id="firstHeading">File:${esc(display)}</h1>
      <div class="errorbox">No file with this name has been uploaded.</div>
      ${parsed ? `<div class="mw-parser-output">${parsed.html}</div>` : ''}
      <p><a href="/wiki/Special:Upload">Upload one</a>.</p>
    </div>`;
  }

  const w = Math.min(file.width || 640, 800);
  const h = file.width && file.height ? Math.round(w * (file.height / file.width)) : 0;
  const nonFree = file.license === 'fair-use';
  const rows = [
    ['Uploaded by', userLink(file.uploader, false)],
    ['Date', ts(file.uploaded_at)],
    ['Size', `${(file.size / 1024).toFixed(0)} KB${file.width ? ` &middot; ${file.width} &times; ${file.height} pixels` : ''}`],
    ['Type', esc(file.mime)],
    ['Author', esc(file.author || 'unknown')],
    ['Licence', file.license_url
      ? `<a class="external" target="_blank" rel="noopener nofollow" href="${escAttr(file.license_url)}">${esc(file.license || '')}</a>`
      : esc(file.license || 'unspecified')],
    ['Source', file.source
      ? (/^https?:/.test(file.source)
        ? `<a class="external" target="_blank" rel="noopener nofollow" href="${escAttr(file.source)}">${esc(file.source.slice(0, 90))}</a>`
        : esc(file.source))
      : '&mdash;'],
    ['Used by', `<a href="/wiki/Special:WhatLinksHere/File:${encodeURIComponent(file.name)}">pages using this file</a>`],
  ];
  return `<div class="mw-body">
    <h1 id="firstHeading">File:${esc(display)}</h1>
    ${nonFree ? `<div class="ambox ambox-content"><span class="ambox-icon">&#169;</span><span>
      <b>Non-free file.</b> This image is used under a claim of fair use: it illustrates commentary
      about the subject, it is reproduced at low resolution, and it replaces nothing the copyright
      holder sells. It is not released under a free licence, so do not reuse it on the strength of
      this page. ${file.source ? 'The source is recorded below.' : ''}
      <a href="/wiki/${encodeURIComponent(ctx.site.project)}:Non-free_content">Policy</a>.</span></div>` : ''}
    <div class="filepage-preview">
      <a href="/images/${encodeURIComponent(file.name)}" target="_blank" rel="noopener">
        <img src="/images/${encodeURIComponent(file.name)}" alt="${escAttr(display)}" width="${w}"${h ? ` height="${h}"` : ''}>
      </a>
      <p class="helptext"><a href="/images/${encodeURIComponent(file.name)}" target="_blank" rel="noopener">Full resolution</a>
        &middot; to place it in an article, write <code>[[File:${esc(file.name.replace(/_/g, ' '))}|thumb|your caption]]</code></p>
    </div>
    ${parsed ? `<div class="mw-parser-output">${parsed.html}</div>` : ''}
    <h2>File information</h2>
    <table class="wikitable">${rows.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${v}</td></tr>`).join('')}</table>
  </div>`;
}
