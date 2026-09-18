#!/usr/bin/env node
/**
 * Builds a single-file static preview of the running site: fetches real
 * rendered pages, keeps the real markup and stylesheet, and adds a small
 * client-side router so the whole thing can be clicked through offline.
 * Writes demo/index.html.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { CSS } from '../src/styles.js';

const BASE = process.env.BASE || 'http://localhost:8787';
const PATHS = [
  '/wiki/Main_Page',
  '/wiki/Great_Emu_War', '/wiki/Great_Emu_War?action=history', '/wiki/Great_Emu_War?action=edit',
  '/wiki/Wombat', '/wiki/Wombat?action=history', '/wiki/Wombat?action=edit',
  '/wiki/Mantis_shrimp', '/wiki/Platypus', '/wiki/Boaty_McBoatface',
  '/wiki/Project_Pigeon', '/wiki/Tardigrade', '/wiki/Ig_Nobel_Prize',
  '/wiki/Talk:Great_Emu_War', '/wiki/Talk:Platypus', '/wiki/Talk:Mantis_shrimp',
  '/wiki/Talk:Wombat', '/wiki/Talk:Tardigrade',
  '/wiki/Wittypedia:About', '/wiki/Wittypedia:Five_pillars', '/wiki/Wittypedia:Be_funny',
  '/wiki/Wittypedia:Verifiability', '/wiki/Wittypedia:Community_portal',
  '/wiki/Wittypedia:Requests_for_adminship', '/wiki/Wittypedia:Administrators',
  '/wiki/Wittypedia:Sandbox', '/wiki/Wittypedia:Talk_pages', '/wiki/Wittypedia:Citing_sources',
  '/wiki/Wittypedia:Privacy_policy', '/wiki/Wittypedia:General_disclaimer',
  '/wiki/Help:Editing',
  '/wiki/Special:RecentChanges', '/wiki/Special:NewPages', '/wiki/Special:AllPages',
  '/wiki/Special:TopRated', '/wiki/Special:TopRated?axis=helpful', '/wiki/Special:Statistics',
  '/wiki/Special:ListUsers', '/wiki/Special:Log', '/wiki/Special:ShortPages',
  '/wiki/Special:WantedPages', '/wiki/Special:SpecialPages', '/wiki/Special:UserLogin',
  '/wiki/Special:CreateAccount', '/wiki/Special:Contributions/HansardHannah',
  '/wiki/Special:WhatLinksHere/Wombat', '/wiki/Special:PageInfo/Wombat',
  '/wiki/Special:Diff/2', '/wiki/Special:Diff/3', '/wiki/Special:Diff/4',
  '/wiki/User:Admin', '/wiki/User:CiteOrDie', '/wiki/Emu_War',
];

const pages = {};
const titles = {};
for (const path of PATHS) {
  const res = await fetch(BASE + path, { redirect: 'follow' });
  const html = await res.text();
  const start = html.indexOf('<main class="mw-content-wrap">');
  const end = html.indexOf('</main>', start);
  if (start === -1 || end === -1) { console.warn('skipped', path, res.status); continue; }
  pages[path] = html.slice(start + '<main class="mw-content-wrap">'.length, end);
  titles[path] = (/<title>([^<]*)<\/title>/.exec(html) || [, path])[1].replace(/ - Wittypedia$/, '');
}
console.log(`captured ${Object.keys(pages).length} pages`);

// Chrome comes from the real page too, so the demo cannot drift from the site.
const shell = await (await fetch(`${BASE}/wiki/Main_Page`)).text();
const header = shell.slice(shell.indexOf('<header class="mw-header">'), shell.indexOf('</header>') + 9);
const sidebar = shell.slice(shell.indexOf('<nav class="mw-sidebar"'), shell.indexOf('</nav>') + 6);
const footer = shell.slice(shell.indexOf('<footer class="mw-footer">'), shell.indexOf('</footer>') + 9);

const DEMO_CSS = `
.demo-bar{background:#202122;color:#f8f9fa;font-size:12.8px;padding:8px 16px;display:flex;
  gap:10px;align-items:center;flex-wrap:wrap;justify-content:center;text-align:center}
.demo-bar b{color:#fff}
.demo-bar a{color:#9ec5ff}
.demo-note{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:#202122;color:#fff;
  padding:10px 16px;border-radius:3px;font-size:13.2px;z-index:99;box-shadow:0 3px 14px rgba(0,0,0,.3);max-width:min(560px,92vw)}
.demo-note a{color:#9ec5ff}
@media(prefers-reduced-motion:no-preference){.demo-note{animation:demoIn .18s ease-out}}
@keyframes demoIn{from{opacity:0;transform:translate(-50%,6px)}to{opacity:1;transform:translate(-50%,0)}}
`;

const out = `<title>Wittypedia Preview</title>
<style>${CSS}${DEMO_CSS}</style>
<div class="demo-bar">
  <span><b>Static preview.</b> Real rendered pages from the wiki engine, with the database frozen.
  Reading, navigation, history, diffs and the ratings work. Saving an edit needs the live site.</span>
</div>
${header}
<div class="mw-page">
${sidebar}
<main class="mw-content-wrap" id="mw-content"></main>
</div>
${footer}
<script id="wp-pages" type="application/json">${JSON.stringify(pages).replace(/<\/script/gi, '<\\/script')}</script>
<script id="wp-titles" type="application/json">${JSON.stringify(titles).replace(/<\/script/gi, '<\\/script')}</script>
<script>
(function(){
  var PAGES = JSON.parse(document.getElementById('wp-pages').textContent);
  var TITLES = JSON.parse(document.getElementById('wp-titles').textContent);
  var main = document.getElementById('mw-content');
  var KEY = 'wp-demo-votes';
  var votes = {};
  try { votes = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  function saveVotes(){ try { localStorage.setItem(KEY, JSON.stringify(votes)); } catch (e) {} }

  function note(html){
    var old = document.querySelector('.demo-note');
    if (old) old.remove();
    var el = document.createElement('div');
    el.className = 'demo-note';
    el.innerHTML = html;
    document.body.appendChild(el);
    setTimeout(function(){ el.remove(); }, 5200);
  }

  function normalise(href){
    try {
      var u = new URL(href, 'http://x');
      var p = decodeURIComponent(u.pathname) + (u.search || '');
      if (PAGES[p]) return p;
      if (PAGES[decodeURIComponent(u.pathname)]) return decodeURIComponent(u.pathname);
      return null;
    } catch (e) { return null; }
  }

  function show(path, push){
    main.innerHTML = PAGES[path];
    document.title = (TITLES[path] || 'Wittypedia') + ' - Wittypedia';
    window.scrollTo(0, 0);
    bind();
    if (push !== false) history.pushState({ p: path }, '', '#' + path);
  }

  function bind(){
    main.querySelectorAll('.vote').forEach(function(b){
      var id = b.dataset.page + '|' + b.dataset.axis;
      var row = b.closest('.rating-row');
      var mine = votes[id] || 0;
      b.classList.toggle('on', mine === Number(b.dataset.value));
      b.addEventListener('click', function(){
        var v = Number(b.dataset.value);
        var was = votes[id] || 0;
        var delta = {};
        votes[id] = was === v ? 0 : v;
        saveVotes();
        // Adjust the displayed tallies the way the server would.
        row.querySelectorAll('.vote').forEach(function(x){
          var xv = Number(x.dataset.value);
          var n = x.querySelector('.n');
          var base = Number(n.dataset.base || n.textContent);
          n.dataset.base = base;
          var add = (votes[id] === xv ? 1 : 0);
          n.textContent = base + add;
          x.classList.toggle('on', votes[id] === xv);
        });
        var ns = row.querySelectorAll('.vote .n');
        var up = Number(ns[0].textContent), down = Number(ns[1].textContent);
        var total = up + down, pctv = total ? Math.round(up / total * 100) : 0;
        var bar = row.querySelector('.bar i'); if (bar) bar.style.width = pctv + '%';
        var lbl = row.querySelector('.rating-pct');
        if (lbl) lbl.textContent = total ? pctv + '% of ' + total + ' ' + (total === 1 ? 'reader' : 'readers') + ' said yes' : 'No ratings yet';
      });
    });
    main.querySelectorAll('form').forEach(function(f){
      f.addEventListener('submit', function(e){
        e.preventDefault();
        note('This is the static preview, so nothing saves. On the live site this posts a real edit and writes a revision.');
      });
    });
    main.querySelectorAll('.edit-toolbar button').forEach(function(b){
      var ta = main.querySelector('#wpTextbox1');
      if (!ta) return;
      b.addEventListener('click', function(){
        var s = ta.selectionStart, e2 = ta.selectionEnd, v = ta.value, sel = v.slice(s, e2);
        var wrap = b.dataset.wrap, ins = b.dataset.insert, res, caret;
        if (wrap) { var parts = wrap.indexOf('|') >= 0 ? wrap.split('|') : [wrap, wrap];
          res = v.slice(0, s) + parts[0] + sel + parts[1] + v.slice(e2); caret = s + parts[0].length + sel.length; }
        else { res = v.slice(0, s) + ins + v.slice(e2); caret = s + ins.length; }
        ta.value = res; ta.focus(); ta.setSelectionRange(caret, caret);
      });
    });
  }

  document.addEventListener('click', function(e){
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (/^(https?:)?\\/\\//.test(href) || href.startsWith('#') || a.target === '_blank') return;
    e.preventDefault();
    if (href.indexOf('Special:Random') >= 0) {
      var arts = Object.keys(PAGES).filter(function(p){ return /^\\/wiki\\/[A-Z]/.test(p) && !/[:?]/.test(p); });
      return show(arts[Math.floor(Math.random() * arts.length)]);
    }
    var path = normalise(href);
    if (path) return show(path);
    note('<b>' + (a.textContent || 'That page').trim().slice(0, 60) + '</b> is not one of the ' + Object.keys(PAGES).length + ' pages captured in this preview. On the live site it is a real page, or a red link waiting for someone to write it.');
  });

  document.querySelectorAll('.mw-header form, .mw-footer a').forEach(function(f){
    if (f.tagName === 'FORM') f.addEventListener('submit', function(e){ e.preventDefault(); });
  });

  var input = document.getElementById('searchInput'), box = document.getElementById('suggest'), sel = -1;
  function hide(){ box.hidden = true; box.innerHTML = ''; sel = -1; }
  if (input) input.addEventListener('input', function(){
    var q = input.value.trim().toLowerCase();
    if (q.length < 2) return hide();
    var hits = Object.keys(PAGES).filter(function(p){
      return !/action=|Special:/.test(p) && (TITLES[p] || '').toLowerCase().indexOf(q) >= 0;
    }).slice(0, 7);
    if (!hits.length) return hide();
    box.innerHTML = hits.map(function(p){
      return '<a href="' + p + '"><span class="s-title">' + TITLES[p] + '</span></a>';
    }).join('');
    box.hidden = false;
  });
  if (input) input.addEventListener('keydown', function(e){ if (e.key === 'Escape') hide(); });
  document.addEventListener('click', function(e){ if (box && !box.contains(e.target) && e.target !== input) hide(); });

  var KEY2 = 'wp-theme';
  try { var saved = localStorage.getItem(KEY2); if (saved) document.documentElement.setAttribute('data-theme', saved); } catch (e) {}
  var tb = document.getElementById('themeToggle');
  if (tb) tb.addEventListener('click', function(){
    var cur = document.documentElement.getAttribute('data-theme');
    var isDark = cur === 'dark' || (!cur && window.matchMedia('(prefers-color-scheme:dark)').matches);
    var next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(KEY2, next); } catch (e) {}
  });

  window.addEventListener('popstate', function(ev){
    show((ev.state && ev.state.p) || '/wiki/Main_Page', false);
  });
  var initial = decodeURIComponent(location.hash.slice(1));
  show(PAGES[initial] ? initial : '/wiki/Main_Page', false);
})();
</script>
`;

mkdirSync(new URL('../demo', import.meta.url), { recursive: true });
writeFileSync(new URL('../demo/index.html', import.meta.url), out);
console.log(`demo/index.html: ${(out.length / 1024).toFixed(0)} KB`);
