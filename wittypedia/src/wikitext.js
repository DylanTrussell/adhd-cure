/**
 * Wikitext -> HTML. A deliberate subset of MediaWiki's markup, chosen so that
 * anyone who has ever edited Wikipedia can paste an article in and have it
 * come out looking right: headings, links (with red links and link trails),
 * lists, tables, refs, infoboxes, maintenance templates, magic words.
 *
 * Pure function, no DOM, no dependencies -> runs on Workers and in Node tests.
 */

const NS = {
  0: '', 1: 'Talk', 2: 'User', 3: 'User talk', 4: 'Project', 5: 'Project talk',
  6: 'File', 10: 'Template', 12: 'Help', 14: 'Category', 100: 'Portal', '-1': 'Special',
};

export function esc(s) {
  // Apostrophes stay literal: they carry wikitext emphasis markup, and every
  // attribute emitted by this file is double-quoted.
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function escAttr(s) {
  return esc(s).replace(/'/g, '&#39;');
}

/** "talk:foo bar" -> {ns:1, title:"Foo bar", key:"1:Foo_bar"} */
export function parseTitle(raw, projectName = 'Project') {
  let s = String(raw || '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  let ns = 0;
  const m = /^([^:]+):(.*)$/.exec(s);
  if (m) {
    const want = m[1].trim().toLowerCase();
    for (const [id, name] of Object.entries(NS)) {
      if (!name) continue;
      const canonical = name.toLowerCase();
      const local = id === '4' ? projectName.toLowerCase()
        : id === '5' ? `${projectName.toLowerCase()} talk` : canonical;
      if (want === canonical || want === local) { ns = Number(id); s = m[2].trim(); break; }
    }
  }
  s = s.charAt(0).toUpperCase() + s.slice(1);
  return { ns, title: s, key: `${ns}:${s.replace(/ /g, '_')}` };
}

export function nsName(ns, projectName = 'Project') {
  if (ns === 4) return projectName;
  if (ns === 5) return `${projectName} talk`;
  return NS[ns] || '';
}

export function fullTitle(ns, title, projectName = 'Project') {
  const n = nsName(ns, projectName);
  return n ? `${n}:${title}` : title;
}

export function pageUrl(ns, title, projectName = 'Project', query = '') {
  const t = fullTitle(ns, title, projectName).replace(/ /g, '_');
  return `/wiki/${encodeURIComponent(t).replace(/%3A/g, ':').replace(/%2F/g, '/')}${query}`;
}

// ---------------------------------------------------------------- placeholders

const MARK = '\u0001';
function stash(ctx, html) {
  ctx.stash.push(html);
  return `${MARK}${ctx.stash.length - 1}${MARK}`;
}
function unstash(ctx, html) {
  let out = html, guard = 0;
  while (out.includes(MARK) && guard++ < 12) {
    out = out.replace(new RegExp(`${MARK}(\\d+)${MARK}`, 'g'), (m, i) => ctx.stash[Number(i)] ?? '');
  }
  return out;
}

// ------------------------------------------------------------------- templates

function tplParams(body) {
  // Split on top-level pipes (nested {{ }} are already resolved, but [[a|b]] is not).
  const parts = [];
  let depth = 0, cur = '';
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (c === '[' && body[i + 1] === '[') { depth++; cur += '[['; i++; continue; }
    if (c === ']' && body[i + 1] === ']') { depth--; cur += ']]'; i++; continue; }
    if (c === '|' && depth <= 0) { parts.push(cur); cur = ''; continue; }
    cur += c;
  }
  parts.push(cur);
  const name = parts.shift().trim();
  const named = {}, positional = [];
  for (const p of parts) {
    const m = /^\s*([A-Za-z0-9 _-]+?)\s*=([\s\S]*)$/.exec(p);
    if (m) named[m[1].trim().toLowerCase()] = m[2].trim();
    else positional.push(p.trim());
  }
  return { name, named, positional };
}

function ambox(cls, icon, html) {
  return `<div class="ambox ambox-${cls}"><span class="ambox-icon">${icon}</span><span>${html}</span></div>`;
}

function renderTemplate(raw, ctx) {
  const { name, named, positional } = tplParams(raw);
  const key = name.toLowerCase().replace(/\s+/g, ' ');
  const inl = (s) => inline(esc(s == null ? '' : s), ctx);
  const p0 = positional[0];

  switch (key) {
    case 'reflist':
    case 'references':
      ctx.reflistUsed = true;
      return stash(ctx, referencesHtml(ctx));

    case 'cn': case 'citation needed': case 'fact':
      return stash(ctx, `<sup class="noprint cn">[<a href="/wiki/${encodeURIComponent(ctx.projectName)}:Citing_sources" title="Citation needed">citation needed</a>]</sup>`);

    case 'jn': case 'joke needed': case 'humour needed': case 'humor needed':
      return stash(ctx, `<sup class="noprint cn">[<a href="/wiki/${encodeURIComponent(ctx.projectName)}:Be_funny" title="This passage is accurate but joyless">joke needed</a>]</sup>`);

    case 'explain': case 'explain the joke':
      return stash(ctx, `<sup class="noprint cn">[<a href="/wiki/Talk:${encodeURIComponent(ctx.title || '')}" title="Explain the joke on the talk page">explain the joke</a>]</sup>`);

    case 'stub':
      return stash(ctx, `<div class="stub"><i>This article is a stub. You can help ${esc(ctx.siteName)} by expanding it, ideally with a joke that survives fact-checking.</i></div>`);

    case 'unfunny': case 'humourless':
      return stash(ctx, ambox('style', '&#128533;', `This article is accurate but <b>not funny</b>. Please help by adding wit that does not damage the facts. <small>(<a href="/wiki/${encodeURIComponent(ctx.projectName)}:Be_funny">guideline</a>)</small>`));

    case 'unverified joke': case 'dubious joke':
      return stash(ctx, ambox('content', '&#9888;', `The joke in this article <b>may not be true</b>. If it is only funny, it does not belong here. ${named.reason ? `<small>Reason: ${inl(named.reason)}</small>` : ''}`));

    case 'multiple issues':
      return stash(ctx, ambox('content', '&#9888;', `This article has <b>multiple issues</b>. ${inl(named.reason || p0 || '')}`));

    case 'refimprove': case 'citations needed':
      return stash(ctx, ambox('content', '&#9888;', `This article <b>needs additional citations</b>. Funny is not a source.`));

    case 'about': case 'hatnote': case 'distinguish':
      return stash(ctx, `<div class="hatnote">${inl(positional.join(' '))}</div>`);

    case 'main':
      return stash(ctx, `<div class="hatnote">Main article: ${inl(`[[${p0 || ''}]]`)}</div>`);

    case 'see also':
      return stash(ctx, `<div class="hatnote">See also: ${positional.map((x) => inl(`[[${x}]]`)).join(', ')}</div>`);

    case 'quote': case 'quotation':
      return stash(ctx, `<blockquote class="quote"><p>${inl(named.text || p0 || '')}</p>${named.author || positional[1] ? `<footer>&mdash; ${inl(named.author || positional[1])}</footer>` : ''}</blockquote>`);

    case 'true and funny': case 'trueandfunny': case 'verified':
      return stash(ctx, `<div class="ambox ambox-verified"><span class="ambox-icon">&#10004;</span><span>The funny part of this article has been <b>fact-checked and survived</b>.${named.source ? ` Source: ${inl(named.source)}` : ''}</span></div>`);

    case 'infobox': {
      const rows = Object.entries(named)
        .filter(([k]) => !['title', 'name', 'image', 'caption', 'above'].includes(k))
        .map(([k, v]) => `<tr><th scope="row">${inl(k.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase()))}</th><td>${inl(v)}</td></tr>`)
        .join('');
      const cap = named.caption ? `<tr><td colspan="2" class="ib-caption">${inl(named.caption)}</td></tr>` : '';
      return stash(ctx, `<table class="infobox"><caption>${inl(named.title || named.name || named.above || ctx.title || '')}</caption>${cap}${rows}</table>`);
    }

    case 'nowrap':
      return stash(ctx, `<span class="nowrap">${inl(p0 || '')}</span>`);

    case 'small':
      return stash(ctx, `<small>${inl(p0 || '')}</small>`);

    case '!':
      return stash(ctx, '|');

    default:
      // Unknown template: MediaWiki shows a red link to Template:Name.
      ctx.links.add(`10:${(name.charAt(0).toUpperCase() + name.slice(1)).replace(/ /g, '_')}`);
      return stash(ctx, `<a class="new" href="/wiki/Template:${encodeURIComponent(name.replace(/ /g, '_'))}?action=edit" title="Template:${escAttr(name)} (page does not exist)">Template:${esc(name)}</a>`);
  }
}

function referencesHtml(ctx) {
  if (!ctx.refs.length) return '';
  const items = ctx.refs.map((r, i) => `<li id="cite_note-${i + 1}"><span class="mw-cite-backlink"><a href="#cite_ref-${i + 1}">^</a></span> <span class="reference-text">${r.html}</span></li>`).join('');
  return `<ol class="references">${items}</ol>`;
}

// ---------------------------------------------------------------------- inline

function linkTarget(raw, ctx) {
  const t = parseTitle(raw, ctx.projectName);
  return t;
}

function inline(text, ctx) {
  let s = text;

  // '''''both''''' / '''bold''' / ''italic''
  s = s.replace(/'''''(.+?)'''''/g, '<b><i>$1</i></b>')
       .replace(/'''(.+?)'''/g, '<b>$1</b>')
       .replace(/''(.+?)''/g, '<i>$1</i>');

  // [[Internal links]] (+ link trail, pipe trick, anchors, interwiki)
  s = s.replace(/\[\[([^[\]|]+)(?:\|([^[\]]*))?\]\]([a-z]*)/g, (m, target, label, trail) => {
    let tgt = target.trim();
    if (/^(category)\s*:/i.test(tgt)) {
      const c = tgt.replace(/^[^:]*:/, '').trim();
      if (c) { ctx.categories.push(c); ctx.links.add(`14:${c.replace(/ /g, '_')}`); }
      return '';
    }
    if (/^(file|image)\s*:/i.test(tgt)) {
      const cap = (label || '').trim();
      return `<span class="mw-file placeholder" title="uploads are not enabled">&#128444; ${esc(cap || tgt.replace(/^[^:]*:/, ''))}</span>`;
    }
    // interwiki: [[w:Foo]] goes to the real Wikipedia
    const iw = /^(w|wikipedia)\s*:(.+)$/i.exec(tgt);
    if (iw) {
      const u = `https://en.wikipedia.org/wiki/${encodeURIComponent(iw[2].trim().replace(/ /g, '_'))}`;
      return `<a class="extiw" href="${u}" rel="nofollow noopener" target="_blank">${esc((label || iw[2]).trim())}${esc(trail)}</a>`;
    }
    let anchor = '';
    const h = tgt.indexOf('#');
    if (h >= 0) { anchor = `#${tgt.slice(h + 1).trim().replace(/ /g, '_')}`; tgt = tgt.slice(0, h).trim(); }
    if (!tgt && anchor) return `<a href="${anchor}">${esc((label || '').trim() || anchor.slice(1))}${esc(trail)}</a>`;

    const t = linkTarget(tgt, ctx);
    let shown = (label ?? '').trim();
    if (label === '') shown = t.title.replace(/\s*\([^)]*\)\s*$/, '').replace(/,.*$/, ''); // pipe trick
    if (!shown) shown = tgt.replace(/_/g, ' ').trim(); // MediaWiki keeps the typed case
    ctx.links.add(t.key);
    // Special: pages are generated by the software, so they always exist.
    const exists = t.ns === -1 ? true : (ctx.exists ? ctx.exists(t.key) : true);
    const href = pageUrl(t.ns, t.title, ctx.projectName, exists ? '' : '?action=edit&redlink=1') + anchor;
    const cls = exists ? '' : ' class="new"';
    const title = exists ? fullTitle(t.ns, t.title, ctx.projectName) : `${fullTitle(t.ns, t.title, ctx.projectName)} (page does not exist)`;
    return `<a${cls} href="${href}" title="${escAttr(title)}">${shown}${esc(trail)}</a>`;
  });

  // [https://example.com label] and bare URLs
  let extCount = 0;
  s = s.replace(/\[((?:https?:)\/\/[^\s\]]+)(?:[ \t]+([^\]]*))?\]/g, (m, url, label) => {
    const text2 = (label || '').trim() || `[${++extCount}]`;
    const cls = (label || '').trim() ? 'external' : 'external autonumber';
    return `<a class="${cls}" href="${esc(url)}" rel="nofollow noopener" target="_blank">${text2}</a>`;
  });
  s = s.replace(/(^|[\s(])((?:https?:)\/\/[^\s<]+[^\s<.,;:!?)\]])/g, (m, pre, url) =>
    `${pre}<a class="external" href="${esc(url)}" rel="nofollow noopener" target="_blank">${esc(url)}</a>`);

  return s;
}

// ----------------------------------------------------------------------- lists

function closeLists(stack, out) {
  while (stack.length) {
    const top = stack.pop();
    out.push(`</${top.tag}>`);
    if (top.closeItem) out.push(`</${top.closeItem}>`);
  }
}

// ---------------------------------------------------------------------- tables

function renderTable(lines, ctx) {
  let cls = 'wikitable', caption = '';
  const unq = (x) => String(x).replace(/&quot;/g, '"');
  const first = unq(lines[0].slice(2).trim());
  if (/class\s*=/.test(first)) {
    const m = /class\s*=\s*"?([^"|]+)"?/.exec(first);
    if (m) cls = m[1].trim();
  }
  const rows = [];
  let cur = null;
  for (let i = 1; i < lines.length; i++) {
    const ln = lines[i];
    if (/^\|\}/.test(ln)) break;
    if (/^\|\+/.test(ln)) { caption = inline(ln.slice(2).trim(), ctx); continue; }
    if (/^\|-/.test(ln)) { cur = []; rows.push(cur); continue; }
    if (/^[!|]/.test(ln)) {
      if (!cur) { cur = []; rows.push(cur); }
      const head = ln[0] === '!';
      const body = ln.slice(1);
      const cells = body.split(head ? /!!/ : /\|\|/);
      for (const c of cells) {
        let content = c, attrs = '';
        const am = /^([^|[{]*?)\|(?!\|)([\s\S]*)$/.exec(c);
        if (am && /=/.test(am[1])) { attrs = ` ${unq(am[1].trim())}`; content = am[2]; }
        cur.push({ head, attrs, content: inline(content.trim(), ctx) });
      }
    } else if (cur && cur.length) {
      cur[cur.length - 1].content += `<br>${inline(ln.trim(), ctx)}`;
    }
  }
  const body = rows.map((r) => `<tr>${r.map((c) => c.head
    ? `<th${c.attrs}>${c.content}</th>` : `<td${c.attrs}>${c.content}</td>`).join('')}</tr>`).join('');
  return `<table class="${escAttr(cls)}">${caption ? `<caption>${caption}</caption>` : ''}<tbody>${body}</tbody></table>`;
}


/**
 * MediaWiki allows a subset of raw HTML in wikitext. This is that subset:
 * layout and inline-formatting tags, with an optional class attribute and
 * nothing else. No href, no style, no event handlers, so nothing here can
 * execute or exfiltrate.
 */
const SAFE_TAGS = 'div|span|small|big|code|sub|sup|abbr|br|hr|u|s|strong|em|b|i|blockquote|cite|kbd|samp|var|dl|dt|dd|ul|ol|li|p|center';
const VOID_TAGS = new Set(['br', 'hr']);
function restoreSafeHtml(escaped) {
  const stack = [];
  const opened = new RegExp(`&lt;(${SAFE_TAGS})((?:\\s+class=&quot;[A-Za-z0-9 _-]{0,80}&quot;)?)\\s*(/?)&gt;`, 'gi');
  const closed = new RegExp(`&lt;/(${SAFE_TAGS})\\s*&gt;`, 'gi');
  let out = escaped.replace(opened, (m, tag, cls, slash) => {
    const t = tag.toLowerCase();
    if (!VOID_TAGS.has(t) && !slash) stack.push(t);
    return `<${t}${cls.replace(/&quot;/g, '"')}${VOID_TAGS.has(t) || slash ? ' /' : ''}>`;
  });
  // Drop closing tags with no matching open: a stray </div> in an article must
  // not be able to close the page's own layout.
  const open = [...stack];
  out = out.replace(closed, (m, tag) => {
    const t = tag.toLowerCase();
    const i = open.lastIndexOf(t);
    if (i === -1) return m;
    open.splice(i, 1);
    return `</${t}>`;
  });
  // ...and anything left unclosed is closed here, for the same reason.
  return out + open.reverse().map((t) => `</${t}>`).join('');
}

// ------------------------------------------------------------------ main parse

export function parse(src, opts = {}) {
  const ctx = {
    stash: [], refs: [], refNames: new Map(), headings: [], categories: [], links: new Set(),
    reflistUsed: false, noToc: false, forceToc: false,
    exists: opts.exists, siteName: opts.siteName || 'Wittypedia',
    projectName: opts.projectName || opts.siteName || 'Wittypedia',
    title: opts.title || '', sectionEdit: opts.sectionEdit !== false,
    editUrl: opts.editUrl || '',
  };

  let t = String(src == null ? '' : src).replace(/\r\n/g, '\n');

  const redirect = /^\s*#REDIRECT\s*:?\s*\[\[([^[\]|]+)/i.exec(t);

  t = t.replace(/<!--[\s\S]*?-->/g, '');
  if (/__NOTOC__/.test(t)) { ctx.noToc = true; t = t.replace(/__NOTOC__/g, ''); }
  if (/__FORCETOC__|__TOC__/.test(t)) { ctx.forceToc = true; t = t.replace(/__FORCETOC__|__TOC__/g, ''); }

  // <nowiki> and <pre> survive untouched
  t = t.replace(/<nowiki\s*\/>/gi, () => stash(ctx, ''));
  t = t.replace(/<nowiki>([\s\S]*?)<\/nowiki>/gi, (m, c) => stash(ctx, esc(c)));
  t = t.replace(/<pre>([\s\S]*?)<\/pre>/gi, (m, c) => stash(ctx, `<pre>${esc(c)}</pre>`));

  // <ref> ... </ref>, <ref name=x />
  t = t.replace(/<ref(\s+name\s*=\s*"?([^">/]+)"?)?\s*>([\s\S]*?)<\/ref>/gi, (m, _a, name, body) => {
    ctx.refs.push({ html: inline(esc(body.trim()), ctx) });
    const idx = ctx.refs.length;
    if (name) ctx.refNames.set(name.trim(), idx);
    return stash(ctx, `<sup id="cite_ref-${idx}" class="reference"><a href="#cite_note-${idx}">[${idx}]</a></sup>`);
  });
  t = t.replace(/<ref\s+name\s*=\s*"?([^">/]+)"?\s*\/>/gi, (m, name) => {
    const idx = ctx.refNames.get(name.trim());
    if (!idx) return '';
    return stash(ctx, `<sup class="reference"><a href="#cite_note-${idx}">[${idx}]</a></sup>`);
  });

  // templates, innermost first
  let guard = 0;
  while (/\{\{[^{}]*\}\}/.test(t) && guard++ < 200) {
    t = t.replace(/\{\{([^{}]*)\}\}/, (m, body) => renderTemplate(body, ctx));
  }

  // Everything that remains is user text: escape it, then run block parsing.
  t = esc(t);
  t = restoreSafeHtml(t);

  const lines = t.split('\n');
  const out = [];
  const listStack = [];
  let para = [];
  let sectionIdx = 0;

  const BLOCK = /^<\/?(div|table|ol|ul|blockquote|pre|hr|center|h[1-6])[\s/>]/i;
  const flushPara = () => {
    if (!para.length) return;
    const joined = para.join('\n');
    // A line holding nothing but a block-level template ({{stub}}, {{infobox}},
    // {{reflist}}) is a block in its own right, not paragraph text.
    const bare = joined.trim().replace(new RegExp(`${MARK}\\d+${MARK}`, 'g'), '').trim() === '';
    const resolved = unstash(ctx, joined.trim());
    if ((bare || BLOCK.test(resolved.trim())) && BLOCK.test(resolved.trim())) {
      out.push(resolved); para = []; return;
    }
    const body = inline(joined, ctx);
    if (body.trim()) out.push(`<p>${body}</p>`);
    para = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (/^\{\|/.test(line)) {
      flushPara(); closeLists(listStack, out);
      const buf = [line];
      let j = i + 1;
      for (; j < lines.length; j++) { buf.push(lines[j]); if (/^\|\}/.test(lines[j])) break; }
      out.push(renderTable(buf, ctx));
      i = j;
      continue;
    }

    const h = /^(={1,6})\s*(.+?)\s*\1\s*$/.exec(line);
    if (h) {
      flushPara(); closeLists(listStack, out);
      const level = h[1].length;
      const textHtml = inline(h[2], ctx);
      const plain = textHtml.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
      const id = plain.replace(/\s+/g, '_').replace(/"/g, '');
      sectionIdx++;
      ctx.headings.push({ level, text: plain, id, index: sectionIdx });
      const editLink = ctx.sectionEdit && ctx.editUrl
        ? `<span class="mw-editsection">[<a href="${ctx.editUrl}&section=${sectionIdx}">edit</a>]</span>` : '';
      out.push(`<h${level} id="${escAttr(id)}"><span class="mw-headline">${textHtml}</span>${editLink}</h${level}>`);
      continue;
    }

    if (/^----+\s*$/.test(line)) { flushPara(); closeLists(listStack, out); out.push('<hr>'); continue; }

    const li = /^([*#:;]+)\s?(.*)$/.exec(line);
    if (li) {
      flushPara();
      const marks = li[1];
      const want = [...marks].map((c) => (c === '*' ? 'ul' : c === '#' ? 'ol' : 'dl'));
      let common = 0;
      while (common < want.length && common < listStack.length && want[common] === listStack[common].tag) common++;
      while (listStack.length > common) {
        const top = listStack.pop();
        out.push(`</${top.tag}>`);
        if (top.closeItem) out.push(`</${top.closeItem}>`);
      }
      while (listStack.length < want.length) {
        const tag = want[listStack.length];
        // Nest inside the previous item the way MediaWiki does, rather than
        // hanging a <ul> straight off another <ul>.
        let closeItem = null;
        const prev = out[out.length - 1];
        if (listStack.length && prev && /<\/(li|dd|dt)>$/.test(prev)) {
          closeItem = /<\/(li|dd|dt)>$/.exec(prev)[1];
          out[out.length - 1] = prev.replace(/<\/(li|dd|dt)>$/, '');
        }
        listStack.push({ tag, closeItem });
        out.push(`<${tag}>`);
      }
      const last = marks[marks.length - 1];
      const tag = last === ';' ? 'dt' : last === ':' ? 'dd' : 'li';
      out.push(`<${tag}>${inline(li[2], ctx)}</${tag}>`);
      continue;
    }

    if (/^\s+\S/.test(line)) {
      flushPara(); closeLists(listStack, out);
      const buf = [line.replace(/^\s/, '')];
      let j = i + 1;
      while (j < lines.length && /^\s+\S/.test(lines[j])) { buf.push(lines[j].replace(/^\s/, '')); j++; }
      out.push(`<pre>${buf.join('\n')}</pre>`);
      i = j - 1;
      continue;
    }

    if (!line.trim()) { flushPara(); closeLists(listStack, out); continue; }

    // <div class="x"> or </div> alone on a line wraps the content that follows,
    // rather than becoming part of a paragraph with it.
    if (/^<\/?(div|center|blockquote|dl|ul|ol|p)(\s[^>]*)?\/?>$/i.test(line.trim())) {
      flushPara(); closeLists(listStack, out); out.push(line.trim()); continue;
    }

    para.push(line);
  }
  flushPara();
  closeLists(listStack, out);

  if (ctx.refs.length && !ctx.reflistUsed) {
    out.push(`<h2 id="References"><span class="mw-headline">References</span></h2>`, referencesHtml(ctx));
  }

  let html = unstash(ctx, out.join('\n'));

  // Table of contents: MediaWiki shows it at 4+ headings unless suppressed.
  let toc = '';
  if (!ctx.noToc && (ctx.forceToc || ctx.headings.length >= 4)) {
    const base = Math.min(...ctx.headings.map((x) => x.level));
    const counters = [];
    const items = ctx.headings.map((hd) => {
      const depth = hd.level - base;
      counters.length = depth + 1;
      counters[depth] = (counters[depth] || 0) + 1;
      for (let d = 0; d < depth; d++) counters[d] = counters[d] || 1;
      const number = counters.slice(0, depth + 1).join('.');
      return `<li class="toclevel-${depth + 1}"><a href="#${escAttr(hd.id)}"><span class="tocnumber">${number}</span> <span class="toctext">${esc(hd.text)}</span></a></li>`;
    }).join('');
    toc = `<div id="toc" class="toc" role="navigation"><div class="toctitle"><h2>Contents</h2></div><ul>${items}</ul></div>`;
  }

  return {
    html, toc,
    categories: [...new Set(ctx.categories)],
    links: [...ctx.links],
    headings: ctx.headings,
    redirect: redirect ? parseTitle(redirect[1], ctx.projectName) : null,
  };
}

/** Plain-text lead sentence, for search results and meta descriptions. */
export function extract(src, max = 300) {
  let s = String(src || '')
    .replace(/<ref[\s\S]*?<\/ref>/gi, '').replace(/<[^>]+>/g, '')
    .replace(/\{\{[\s\S]*?\}\}/g, '')
    .replace(/\[\[(?:[^[\]|]*\|)?([^[\]]*)\]\]/g, '$1')
    .replace(/\[(?:https?:)\/\/\S+\s+([^\]]*)\]/g, '$1')
    .replace(/'''?/g, '').replace(/^[=*#:;].*$/gm, '')
    .replace(/\s+/g, ' ').trim();
  if (s.length > max) s = `${s.slice(0, max).replace(/\s+\S*$/, '')}...`;
  return s;
}

// ------------------------------------------------- section editing + signatures

/** Split into section 0 (lead) plus one entry per heading, MediaWiki-style. */
export function splitSections(text) {
  const lines = String(text || '').replace(/\r\n/g, '\n').split('\n');
  const sections = [{ index: 0, level: 0, heading: '', lines: [] }];
  let inNowiki = false, inPre = false;
  for (const line of lines) {
    if (/<nowiki>/i.test(line)) inNowiki = true;
    if (/<\/nowiki>/i.test(line)) inNowiki = false;
    if (/^\{\|/.test(line)) inPre = true;
    if (/^\|\}/.test(line)) inPre = false;
    const h = !inNowiki && !inPre && /^(={1,6})\s*(.+?)\s*\1\s*$/.exec(line);
    if (h) sections.push({ index: sections.length, level: h[1].length, heading: h[2], lines: [line] });
    else sections[sections.length - 1].lines.push(line);
  }
  return sections.map((s) => ({ ...s, text: s.lines.join('\n') }));
}

export function getSection(text, n) {
  const secs = splitSections(text);
  const i = Number(n);
  if (!Number.isInteger(i) || i < 0 || i >= secs.length) return null;
  // A section owns everything until the next heading of the same or higher rank.
  let out = [secs[i].text];
  for (let j = i + 1; j < secs.length; j++) {
    if (secs[j].level <= secs[i].level && secs[i].level !== 0) break;
    if (secs[i].level === 0) break;
    out.push(secs[j].text);
  }
  return out.join('\n');
}

export function replaceSection(text, n, replacement) {
  const secs = splitSections(text);
  const i = Number(n);
  if (!Number.isInteger(i) || i < 0 || i >= secs.length) return text;
  let end = i;
  if (secs[i].level !== 0) {
    for (let j = i + 1; j < secs.length; j++) {
      if (secs[j].level <= secs[i].level) break;
      end = j;
    }
  }
  const before = secs.slice(0, i).map((s) => s.text);
  const after = secs.slice(end + 1).map((s) => s.text);
  return [...before, replacement.replace(/\s+$/, ''), ...after].join('\n');
}

/** ~~~ / ~~~~ / ~~~~~ expansion, done at save time the way MediaWiki does. */
export function expandSignatures(text, userText, unixTime, projectName = 'Project') {
  const stamp = new Date(unixTime * 1000);
  const time = `${String(stamp.getUTCHours()).padStart(2, '0')}:${String(stamp.getUTCMinutes()).padStart(2, '0')}`;
  const date = stamp.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const when = `${time}, ${date} (UTC)`;
  const sig = `[[User:${userText}|${userText}]] ([[User talk:${userText}|talk]])`;
  return String(text)
    .replace(/~~~~~/g, when)
    .replace(/~~~~/g, `${sig} ${when}`)
    .replace(/~~~/g, sig);
}
