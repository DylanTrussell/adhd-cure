import { CSS } from './styles.js';
import { esc, escAttr, pageUrl, fullTitle, nsName } from './wikitext.js';
import { effectiveGroups } from './auth.js';

/**
 * The mark: a wireframe globe whose equator has given up and started smiling.
 * Deliberately not anybody else's logo, and legible down to 24px.
 */
export function logoSvg(size = 42) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
  <defs><clipPath id="wpglobe"><circle cx="22" cy="22" r="19.2"/></clipPath></defs>
  <g clip-path="url(#wpglobe)" fill="none" stroke="currentColor" stroke-width="1.15" opacity=".42">
    <ellipse cx="22" cy="22" rx="6.4" ry="19.2"/>
    <ellipse cx="22" cy="22" rx="13" ry="19.2"/>
    <path d="M2.8 13.2H41.2M2.8 30.8H41.2"/>
  </g>
  <circle cx="22" cy="22" r="19.2" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".85"/>
  <g clip-path="url(#wpglobe)" stroke="currentColor" fill="none" stroke-linecap="round">
    <path d="M3 21.4c6.4 7.4 12.8 11 19 11s12.6-3.6 19-11" stroke-width="1.9"/>
    <circle cx="15.6" cy="16.4" r="1.45" fill="currentColor" stroke="none"/>
    <path d="M25.2 17.1c1.1-1.4 2.6-1.4 3.7 0" stroke-width="1.7"/>
  </g>
</svg>`;
}

const TS_OPTS = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' };
export function ts(unix) {
  if (!unix) return '';
  const d = new Date(unix * 1000);
  const date = d.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  const time = `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
  return `${time}, ${date}`;
}
export function tsShort(unix) {
  const d = new Date(unix * 1000);
  return `${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })}`;
}

export function userLink(userText, extra = true) {
  const isIp = /^[0-9a-fA-F:.]+$/.test(userText) && /[.:]/.test(userText);
  const base = isIp
    ? `<a href="/wiki/Special:Contributions/${encodeURIComponent(userText)}" title="Anonymous edit from ${escAttr(userText)}">${esc(userText)}</a>`
    : `<a href="/wiki/User:${encodeURIComponent(userText.replace(/ /g, '_'))}">${esc(userText)}</a>`;
  if (!extra) return base;
  return `${base} <span class="userlinks">(<a href="/wiki/User_talk:${encodeURIComponent(userText.replace(/ /g, '_'))}">talk</a>`
    + ` | <a href="/wiki/Special:Contributions/${encodeURIComponent(userText)}">contribs</a>)</span>`;
}

export function byteDelta(len, parentLen) {
  const d = len - (parentLen ?? 0);
  const cls = d > 0 ? 'plus' : d < 0 ? 'minus' : 'zero';
  const sign = d > 0 ? '+' : '';
  return `<span class="${cls}">(${sign}${d.toLocaleString('en-US')})</span>`;
}

function sidebar(ctx) {
  const { site, page } = ctx;
  const tools = page ? `
    <h3>Tools</h3>
    <ul>
      <li><a href="/wiki/Special:WhatLinksHere/${encodeURIComponent(fullTitle(page.namespace, page.title, site.project).replace(/ /g, '_'))}">What links here</a></li>
      <li><a href="${pageUrl(page.namespace, page.title, site.project, '?action=history')}">Page history</a></li>
      <li><a href="${pageUrl(page.namespace, page.title, site.project, '?action=raw')}">Wikitext source</a></li>
      <li><a href="${pageUrl(page.namespace, page.title, site.project, `?oldid=${page.current_rev_id}`)}">Permanent link</a></li>
      <li><a href="/wiki/Special:PageInfo/${encodeURIComponent(fullTitle(page.namespace, page.title, site.project).replace(/ /g, '_'))}">Page information</a></li>
    </ul>` : '';
  return `<nav class="mw-sidebar" id="mw-sidebar" aria-label="Site">
    <h3>Navigation</h3>
    <ul>
      <li><a href="/wiki/Main_Page">Main page</a></li>
      <li><a href="/wiki/Special:AllPages">Contents</a></li>
      <li><a href="/wiki/Special:TopRated">Top rated</a></li>
      <li><a href="/wiki/Special:Random">Random article</a></li>
      <li><a href="/wiki/Special:RecentChanges">Recent changes</a></li>
      <li><a href="/wiki/Special:NewPages">New pages</a></li>
    </ul>
    <h3>Contribute</h3>
    <ul>
      <li><a href="/wiki/${encodeURIComponent(site.project)}:Five_pillars">Five pillars</a></li>
      <li><a href="/wiki/Help:Editing">Learn to edit</a></li>
      <li><a href="/wiki/${encodeURIComponent(site.project)}:Community_portal">Community portal</a></li>
      <li><a href="/wiki/${encodeURIComponent(site.project)}:Sandbox">Sandbox</a></li>
      <li><a href="/wiki/Special:SpecialPages">Special pages</a></li>
    </ul>
    ${tools}
  </nav>`;
}

function header(ctx) {
  const { site, user } = ctx;
  const groups = effectiveGroups(user).filter((g) => !['*', 'user'].includes(g));
  const right = user
    ? `<a href="/wiki/User:${encodeURIComponent(user.username.replace(/ /g, '_'))}" title="Your user page${groups.length ? ` (${groups.join(', ')})` : ''}"><b>${esc(user.username)}</b></a>
       <a href="/wiki/User_talk:${encodeURIComponent(user.username.replace(/ /g, '_'))}">Talk</a>
       <a href="/wiki/Special:Watchlist">Watchlist</a>
       <a href="/wiki/Special:Contributions/${encodeURIComponent(user.username)}">Contributions</a>
       <form method="post" action="/logout" style="display:inline"><input type="hidden" name="csrf" value="${escAttr(ctx.csrf || '')}"><button class="btn" type="submit">Log out</button></form>`
    : `<a href="/wiki/Special:CreateAccount">Create account</a>
       <a class="btn" href="/wiki/Special:UserLogin">Log in</a>`;
  return `<header class="mw-header">
    <button class="hamburger" type="button" aria-label="Menu" aria-controls="mw-sidebar" onclick="document.getElementById('mw-sidebar').classList.toggle('open')">&#9776;</button>
    <a class="brand" href="/wiki/Main_Page">${logoSvg(40)}<span><span class="brand-word">${esc(site.name)}</span><span class="brand-tag">${esc(site.tagline)}</span></span></a>
    <div class="hdr-search">
      <form action="/wiki/Special:Search" method="get" role="search" autocomplete="off">
        <input type="search" name="q" id="searchInput" placeholder="Search ${escAttr(site.name)}" value="${escAttr(ctx.searchValue || '')}" aria-label="Search">
      </form>
      <div class="suggest" id="suggest" hidden></div>
    </div>
    <div class="hdr-user">
      <button class="btn" type="button" id="themeToggle" title="Toggle dark mode" aria-label="Toggle dark mode" style="line-height:0;padding:6px 9px"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M6.5 1.4A6.6 6.6 0 0 0 8 14.6a6.6 6.6 0 0 0 6.1-4.1 5.3 5.3 0 0 1-7.6-6.9c0-.8.3-1.6.7-2.2z"/></svg></button>
      ${right}
    </div>
  </header>`;
}

function tabs(ctx) {
  const { page, site, title, ns, action, user, isWatched, canEdit } = ctx;
  if (!title) return '';
  if (ns === -1) return '';
  const subjectNs = ns % 2 === 1 ? ns - 1 : ns;
  const talkNs = subjectNs + 1;
  const exists = !!page;
  const editLabel = exists ? 'Edit' : 'Create';
  const sel = (a) => (action === a ? ' class="selected"' : '');
  const talkExists = ctx.talkExists;
  const admin = effectiveGroups(user).includes('sysop');
  const more = admin && exists ? `
      <li><a href="${pageUrl(ns, title, site.project, '?action=protect')}">Protect</a></li>
      <li><a href="${pageUrl(ns, title, site.project, '?action=delete')}">Delete</a></li>` : '';
  const moveTab = exists && user ? `<li><a href="${pageUrl(ns, title, site.project, '?action=move')}">Move</a></li>` : '';
  return `<div class="mw-tabs">
    <ul>
      <li${ns === subjectNs ? ' class="selected"' : ''}><a href="${pageUrl(subjectNs, title, site.project)}">${subjectNs === 0 ? 'Article' : nsName(subjectNs, site.project)}</a></li>
      <li${ns === talkNs ? ' class="selected"' : ''}${!talkExists ? ' class="new"' : ''}><a href="${pageUrl(talkNs, title, site.project)}">Discussion</a></li>
    </ul>
    <ul>
      <li${sel('view')}><a href="${pageUrl(ns, title, site.project)}">Read</a></li>
      <li${sel('edit')}${!canEdit ? '' : ''}><a href="${pageUrl(ns, title, site.project, '?action=edit')}">${canEdit ? editLabel : 'View source'}</a></li>
      <li${sel('history')}><a href="${pageUrl(ns, title, site.project, '?action=history')}">View history</a></li>
      ${user && exists ? `<li><form method="post" action="/api/watch" style="display:inline">
        <input type="hidden" name="csrf" value="${escAttr(ctx.csrf || '')}">
        <input type="hidden" name="page" value="${escAttr(fullTitle(ns, title, site.project))}">
        <button type="submit" class="btn" style="border:0;background:none;padding:9px 12px" title="${isWatched ? 'Remove from your watchlist' : 'Add to your watchlist'}">${isWatched ? '&#9733; Unwatch' : '&#9734; Watch'}</button>
      </form></li>` : ''}
      ${moveTab}${more}
    </ul>
  </div>`;
}

export function layout(ctx, body) {
  const { site } = ctx;
  const headTitle = ctx.pageTitle
    ? `${ctx.pageTitle} - ${site.name}`
    : `${site.name}, the funny encyclopedia`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(headTitle)}</title>
<meta name="description" content="${escAttr(ctx.description || `${site.name}: ${site.tagline}`)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>${CSS}</style>
</head>
<body>
${header(ctx)}
<div class="mw-page">
${sidebar(ctx)}
<main class="mw-content-wrap">
${tabs(ctx)}
${body}
</main>
</div>
<footer class="mw-footer">
  <p>Text is available under the <a class="external" rel="nofollow noopener" target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 License</a>; additional terms may apply. Every claim on this site is meant to be true. Every joke is meant to be funny. Report failures of either on the article's discussion page.</p>
  <ul>
    <li><a href="/wiki/${encodeURIComponent(site.project)}:About">About</a></li>
    <li><a href="/wiki/${encodeURIComponent(site.project)}:Five_pillars">Five pillars</a></li>
    <li><a href="/wiki/${encodeURIComponent(site.project)}:Be_funny">Be funny</a></li>
    <li><a href="/wiki/${encodeURIComponent(site.project)}:Verifiability">Verifiability</a></li>
    <li><a href="/wiki/${encodeURIComponent(site.project)}:Privacy_policy">Privacy policy</a></li>
    <li><a href="/wiki/${encodeURIComponent(site.project)}:General_disclaimer">Disclaimer</a></li>
    <li><a href="/wiki/Special:Statistics">Statistics</a></li>
  </ul>
</footer>
<script>
(function(){
  var KEY='wp-theme';
  try{var saved=localStorage.getItem(KEY); if(saved)document.documentElement.setAttribute('data-theme',saved);}catch(e){}
  var btn=document.getElementById('themeToggle');
  if(btn)btn.addEventListener('click',function(){
    var cur=document.documentElement.getAttribute('data-theme');
    var isDark=cur==='dark'||(!cur&&window.matchMedia('(prefers-color-scheme:dark)').matches);
    var next=isDark?'light':'dark';
    document.documentElement.setAttribute('data-theme',next);
    try{localStorage.setItem(KEY,next);}catch(e){}
  });
  var input=document.getElementById('searchInput'), box=document.getElementById('suggest'), t=null, sel=-1;
  function hide(){box.hidden=true;box.innerHTML='';sel=-1;}
  if(input)input.addEventListener('input',function(){
    var q=input.value.trim();
    clearTimeout(t);
    if(q.length<2){hide();return;}
    t=setTimeout(function(){
      fetch('/api/search?q='+encodeURIComponent(q)).then(function(r){return r.json();}).then(function(d){
        if(!d.results||!d.results.length){hide();return;}
        box.innerHTML=d.results.map(function(r){
          return '<a href="'+r.url+'"><span class="s-title">'+r.title+'</span><span class="s-snip">'+r.snippet+'</span></a>';
        }).join('');
        box.hidden=false;
      }).catch(hide);
    },140);
  });
  if(input)input.addEventListener('keydown',function(e){
    var items=box.querySelectorAll('a');
    if(e.key==='ArrowDown'&&items.length){e.preventDefault();sel=(sel+1)%items.length;}
    else if(e.key==='ArrowUp'&&items.length){e.preventDefault();sel=(sel-1+items.length)%items.length;}
    else if(e.key==='Enter'&&sel>=0&&items[sel]){e.preventDefault();window.location=items[sel].getAttribute('href');return;}
    else if(e.key==='Escape'){hide();return;}
    items.forEach(function(a,i){a.classList.toggle('sel',i===sel);});
  });
  document.addEventListener('click',function(e){ if(box&&!box.contains(e.target)&&e.target!==input)hide(); });
  document.querySelectorAll('.vote').forEach(function(b){
    b.addEventListener('click',function(){
      var box=b.closest('.rating-row');
      fetch('/api/rate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
        page:b.dataset.page, axis:b.dataset.axis, value:Number(b.dataset.value), csrf:b.dataset.csrf
      })}).then(function(r){return r.json();}).then(function(d){
        if(d.error){alert(d.error);return;}
        box.querySelectorAll('.vote').forEach(function(v){
          v.classList.toggle('on', d.mine===Number(v.dataset.value));
          v.querySelector('.n').textContent = Number(v.dataset.value)===1 ? d.up : d.down;
        });
        var bar=box.querySelector('.bar i'), pct=box.querySelector('.rating-pct');
        var total=d.up+d.down, p=total?Math.round(d.up/total*100):0;
        if(bar)bar.style.width=p+'%';
        if(pct)pct.textContent=total? p+'% of '+total+' '+(total===1?'reader':'readers')+' said yes' : 'No ratings yet';
      });
    });
  });
})();
</script>
</body>
</html>`;
}

export function html(ctx, body, status = 200, extraHeaders = {}) {
  return new Response(layout(ctx, body), {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Content-Type-Options': 'nosniff', ...extraHeaders },
  });
}
