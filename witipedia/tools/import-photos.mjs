#!/usr/bin/env node
/**
 * Finds photographs on Wikimedia Commons for the slots in tools/seed/photos.mjs,
 * shows them to you in a contact sheet, and publishes the ones you pick to the
 * live wiki with their author, licence and source intact.
 *
 *   node tools/import-photos.mjs                     # against witipedia.co
 *   node tools/import-photos.mjs --site http://localhost:8787
 *   node tools/import-photos.mjs --fake              # offline, generated images
 *
 * Nothing is published until you press the button in the contact sheet.
 */
import { createServer } from 'node:http';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
import { deflateSync } from 'node:zlib';
import { photoSlots } from './seed/photos.mjs';

const args = process.argv.slice(2);
const argOf = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const SITE = (argOf('--site', 'https://witipedia.co')).replace(/\/$/, '');
const FAKE = args.includes('--fake');
const PORT = Number(argOf('--port', 8788));
const CANDIDATES = Number(argOf('--candidates', 6));
const AUTO = args.includes('--auto');          // publish the top pick, no contact sheet
const USER = argOf('--user', null);
const PASS = argOf('--password', null);
const root = new URL('..', import.meta.url);
const photoDir = fileURLToPath(new URL('photos/', root));
mkdirSync(photoDir, { recursive: true });

const ask = (q, hidden = false) => new Promise((resolve) => {
  const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  if (hidden) {
    const onData = (ch) => { if (['\n', '\r', '\u0004'].includes(String(ch))) process.stdin.removeListener('data', onData); };
    process.stdin.on('data', onData);
    rl._writeToOutput = function (s) { if (s.includes(q)) rl.output.write(q); };
  }
  rl.question(q, (a) => { rl.close(); if (hidden) process.stdout.write('\n'); resolve(a.trim()); });
});

// ------------------------------------------------------------------- Commons

const COMMONS = 'https://commons.wikimedia.org/w/api.php';
const stripHtml = (s) => String(s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

const FREE = /^(cc[ -]|public domain|pd|cc0|no restrictions)/i;

async function commonsCandidates(query, limit) {
  const url = `${COMMONS}?action=query&format=json&origin=*`
    + `&generator=search&gsrsearch=${encodeURIComponent(`filetype:bitmap ${query}`)}`
    + `&gsrnamespace=6&gsrlimit=${limit * 3}`
    + `&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=1400`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Witipedia-photo-import/1.0 (wiki setup script)' } });
  if (!res.ok) throw new Error(`Commons returned ${res.status}`);
  const data = await res.json();
  const pages = Object.values(data?.query?.pages || {});
  const out = [];
  for (const p of pages) {
    const ii = p.imageinfo?.[0];
    if (!ii) continue;
    const meta = ii.extmetadata || {};
    const license = stripHtml(meta.LicenseShortName?.value) || stripHtml(meta.License?.value);
    if (!FREE.test(license)) continue;
    if (!/^image\/(jpeg|png|webp|gif)$/.test(ii.mime || '')) continue;
    if ((ii.width || 0) < 700) continue;
    const assessments = String(meta.Assessments?.value || '').toLowerCase();
    out.push({
      title: p.title.replace(/^File:/, ''),
      thumb: ii.thumburl || ii.url,
      full: ii.url,
      width: ii.width, height: ii.height, mime: ii.mime,
      author: stripHtml(meta.Artist?.value) || 'unknown',
      license,
      licenseUrl: stripHtml(meta.LicenseUrl?.value) || '',
      description: stripHtml(meta.ImageDescription?.value).slice(0, 300),
      source: ii.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title)}`,
      score: (assessments.includes('featured') ? 100 : 0) + (assessments.includes('quality') ? 60 : 0)
        + (assessments.includes('valued') ? 30 : 0) + Math.min(30, (ii.width || 0) / 200),
    });
  }
  return out.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** Offline stand-in so the publish path can be exercised without Commons. */
function fakeImage(seed, w = 900, h = 650) {
  const crcT = [...Array(256)].map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = (b) => { let c = 0xffffffff; for (const x of b) c = crcT[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const b = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(b)); return Buffer.concat([l, b, c]); };
  const ih = Buffer.alloc(13); ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4); ih[8] = 8; ih[9] = 2;
  const raw = Buffer.alloc(h * (1 + w * 3));
  for (let y = 0; y < h; y++) {
    const off = y * (1 + w * 3);
    for (let x = 0; x < w; x++) {
      raw[off + 1 + x * 3] = (x + seed * 40) % 256;
      raw[off + 2 + x * 3] = (y + seed * 25) % 256;
      raw[off + 3 + x * 3] = (seed * 60) % 256;
    }
  }
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ih), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

async function gather() {
  const sheet = [];
  for (const [i, slot] of photoSlots.entries()) {
    const id = `${slug(slot.article)}-${slug(slot.place)}`;
    process.stdout.write(`  ${String(i + 1).padStart(2)}/${photoSlots.length}  ${slot.article} (${slot.place}) ... `);
    let found = [];
    if (FAKE) {
      found = [1, 2, 3].map((n) => ({
        title: `${slot.query.split(' ')[0]} example ${n}.png`,
        thumb: null, width: 900, height: 650, mime: 'image/png',
        author: 'Test Fixture', license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        description: `Generated stand-in ${n}`, source: 'offline fixture', score: 10 - n,
      }));
    } else {
      try { found = await commonsCandidates(slot.query, CANDIDATES); }
      catch (e) { console.log(`failed (${e.message})`); continue; }
    }
    const saved = [];
    for (const [n, c] of found.entries()) {
      const ext = c.mime === 'image/png' ? 'png' : c.mime === 'image/webp' ? 'webp' : c.mime === 'image/gif' ? 'gif' : 'jpg';
      const file = join(photoDir, `${id}-${n}.${ext}`);
      try {
        if (FAKE) writeFileSync(file, fakeImage(n + 1));
        else if (!existsSync(file)) {
          const r = await fetch(c.thumb, { headers: { 'User-Agent': 'Witipedia-photo-import/1.0' } });
          if (!r.ok) continue;
          writeFileSync(file, Buffer.from(await r.arrayBuffer()));
        }
        saved.push({ ...c, local: file, localName: `${id}-${n}.${ext}`, ext });
      } catch (e) { /* skip this candidate */ }
    }
    console.log(`${saved.length} candidate${saved.length === 1 ? '' : 's'}`);
    sheet.push({ ...slot, id, candidates: saved });
  }
  return sheet;
}

// ----------------------------------------------------------------- publishing

function cookieJar() {
  const jar = new Map();
  return {
    header: () => [...jar].map(([k, v]) => `${k}=${v}`).join('; '),
    absorb: (res) => {
      for (const c of res.headers.getSetCookie?.() || []) {
        const [kv] = c.split(';');
        const [k, ...v] = kv.split('=');
        jar.set(k.trim(), v.join('='));
      }
    },
  };
}

async function publish(sheet, selections, { username, password, log }) {
  const jar = cookieJar();
  const req = async (path, opts = {}) => {
    const res = await fetch(SITE + path, {
      redirect: 'manual', ...opts,
      headers: { Cookie: jar.header(), Origin: SITE, ...(opts.headers || {}) },
    });
    jar.absorb(res);
    return res;
  };

  const loginRes = await req('/wiki/Special:UserLogin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username, password }).toString(),
  });
  if (loginRes.status !== 302) throw new Error('Login failed. Check the Admin password.');
  log(`Logged in to ${SITE} as ${username}.`);

  const csrfFrom = (html) => (/name="csrf" value="([^"]*)"/.exec(html) || [, ''])[1];
  const uploadCsrf = csrfFrom(await (await req('/wiki/Special:Upload')).text());

  const results = [];
  for (const slot of sheet) {
    const pickIndex = selections[slot.id];
    if (pickIndex === undefined || pickIndex === null || pickIndex === 'skip') { results.push({ slot: slot.id, skipped: true }); continue; }
    const pick = slot.candidates[Number(pickIndex)];
    if (!pick) { results.push({ slot: slot.id, skipped: true }); continue; }

    const bytes = readFileSync(pick.local);
    const destination = `${slot.article} ${slot.place === 'lead' ? '' : slot.place.replace('section:', '')} (${pick.title.replace(/\.[a-z]+$/i, '')})`
      .replace(/\s+/g, ' ').trim().slice(0, 100);

    const licenseId = pick.license.toLowerCase().includes('cc0') ? 'cc0'
      : /public domain|^pd/i.test(pick.license) ? 'pd'
      : pick.license.toLowerCase().includes('by-sa 4') ? 'cc-by-sa-4.0'
      : pick.license.toLowerCase().includes('by-sa') ? 'cc-by-sa-3.0'
      : pick.license.toLowerCase().includes('by 4') ? 'cc-by-4.0'
      : 'cc-by-3.0';

    const fd = new FormData();
    fd.append('csrf', uploadCsrf);
    fd.append('name', destination);
    fd.append('description', `${pick.description || slot.caption}\n\nOriginally ${pick.title} on Wikimedia Commons.`);
    fd.append('author', pick.author);
    fd.append('source', pick.source);
    fd.append('license', licenseId);
    fd.append('file', new Blob([bytes], { type: pick.mime }), pick.localName);

    const up = await req('/wiki/Special:Upload', { method: 'POST', body: fd });
    if (up.status !== 302) {
      const body = await up.text();
      const why = (/class="errorbox">([^<]*)/.exec(body) || [, 'unknown error'])[1].trim();
      results.push({ slot: slot.id, error: why });
      log(`  ${slot.article}: upload refused (${why})`);
      continue;
    }
    const fileName = decodeURIComponent(up.headers.get('location').replace('/wiki/File:', ''));
    log(`  uploaded ${fileName}`);

    // Put it in the article.
    const wikitext = await (await req(`/wiki/${encodeURIComponent(slot.article.replace(/ /g, '_'))}?action=raw`)).text();
    if (wikitext.includes(`[[File:${fileName.replace(/_/g, ' ')}`)) {
      results.push({ slot: slot.id, file: fileName, already: true });
      continue;
    }
    const tag = `[[File:${fileName.replace(/_/g, ' ')}|thumb|${slot.place === 'lead' ? 'right|300px' : 'right|280px'}|${slot.caption}]]`;
    const updated = insert(wikitext, tag, slot.place);
    if (updated === wikitext) {
      results.push({ slot: slot.id, file: fileName, error: 'could not find where to place it' });
      log(`  ${slot.article}: uploaded, but the placement point was not found`);
      continue;
    }
    const editCsrf = csrfFrom(await (await req(`/wiki/${encodeURIComponent(slot.article.replace(/ /g, '_'))}?action=edit`)).text());
    const save = await req(`/wiki/${encodeURIComponent(slot.article.replace(/ /g, '_'))}?action=submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        csrf: editCsrf, text: updated, save: '1',
        summary: `adding image from Wikimedia Commons (${pick.license}, ${pick.author})`,
      }).toString(),
    });
    results.push({ slot: slot.id, file: fileName, placed: save.status === 302 });
    log(`  ${save.status === 302 ? 'placed in' : 'FAILED to place in'} ${slot.article}`);
  }
  return results;
}

/** Lead images go under the infobox; section images go under their heading. */
export function insert(wikitext, tag, place) {
  const text = wikitext.replace(/\r\n/g, '\n');
  if (place.startsWith('section:')) {
    const heading = place.slice('section:'.length).trim().toLowerCase();
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const m = /^(={2,6})\s*(.+?)\s*\1\s*$/.exec(lines[i]);
      if (m && m[2].trim().toLowerCase() === heading) {
        lines.splice(i + 1, 0, tag);
        return lines.join('\n');
      }
    }
    return text;
  }
  // lead: an article with an infobox takes the picture inside the box, which is
  // where Wikipedia puts it; anything else gets a floated thumbnail.
  const ib = /\{\{Infobox[\s\S]*?\n\}\}\n/i.exec(text);
  if (ib) {
    const fileName = (/\[\[File:([^|\]]+)/.exec(tag) || [, ''])[1].trim();
    const caption = (tag.match(/\|([^|\]]*)\]\]$/) || [, ''])[1].trim();
    if (/\|\s*image\s*=/i.test(ib[0])) return text; // already illustrated
    const withImage = ib[0].replace(/\n\}\}\n$/, `\n| image = ${fileName}\n| caption = ${caption}\n}}\n`);
    return text.slice(0, ib.index) + withImage + text.slice(ib.index + ib[0].length);
  }
  const lines = text.split('\n');
  let at = 0;
  while (at < lines.length && (/^\{\{/.test(lines[at]) || !lines[at].trim())) at++;
  lines.splice(at, 0, tag);
  return lines.join('\n');
}

// --------------------------------------------------------------- contact sheet

function sheetHtml(sheet) {
  const card = (slot) => `
  <section class="slot" id="${slot.id}">
    <h2>${slot.article} <small>${slot.place === 'lead' ? 'lead image' : slot.place.replace('section:', 'section: ')}</small></h2>
    <p class="cap">Caption: <i>${slot.caption}</i></p>
    <div class="row">
      ${slot.candidates.map((c, i) => `
        <label class="cand">
          <input type="radio" name="${slot.id}" value="${i}"${i === 0 ? ' checked' : ''}>
          <img src="/img/${c.localName}" alt="">
          <span class="meta"><b>${c.title}</b><br>${c.width}&times;${c.height} &middot; ${c.license}<br>${c.author.slice(0, 70)}</span>
        </label>`).join('')}
      <label class="cand skip"><input type="radio" name="${slot.id}" value="skip"><span class="meta"><b>None of these</b><br>Skip this slot</span></label>
    </div>
  </section>`;
  return `<!doctype html><html><head><meta charset="utf-8"><title>Pick the photos</title>
<style>
  :root{--bg:#f8f9fa;--card:#fff;--ink:#202122;--line:#c8ccd1;--blue:#36c}
  @media(prefers-color-scheme:dark){:root{--bg:#14171a;--card:#1c1f23;--ink:#eaecf0;--line:#3a3f44}}
  body{margin:0;background:var(--bg);color:var(--ink);font:14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
  header{position:sticky;top:0;background:var(--card);border-bottom:1px solid var(--line);padding:14px 20px;z-index:5;
    display:flex;gap:16px;align-items:center;flex-wrap:wrap}
  h1{font:600 17px/1.2 inherit;margin:0}
  main{padding:20px;max-width:1500px;margin:0 auto}
  .slot{background:var(--card);border:1px solid var(--line);border-radius:4px;padding:14px 16px;margin:0 0 18px}
  .slot h2{font-size:16px;margin:0 0 2px}.slot h2 small{font-weight:400;color:#72777d}
  .cap{margin:0 0 12px;color:#54595d;font-size:13px}
  .row{display:flex;gap:12px;overflow-x:auto;padding-bottom:6px}
  .cand{flex:0 0 240px;border:2px solid transparent;border-radius:4px;padding:6px;cursor:pointer;background:var(--bg)}
  .cand:has(input:checked){border-color:var(--blue);background:#eaf3ff}
  @media(prefers-color-scheme:dark){.cand:has(input:checked){background:#20304a}}
  .cand img{width:100%;height:170px;object-fit:cover;border-radius:2px;display:block;background:#ddd}
  .cand input{margin:0 0 6px}
  .meta{display:block;font-size:11.5px;line-height:1.4;margin-top:6px;color:#54595d;word-break:break-word}
  .skip{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;min-height:200px}
  button{background:var(--blue);color:#fff;border:0;border-radius:3px;padding:9px 18px;font:600 14px inherit;cursor:pointer}
  button:disabled{opacity:.6;cursor:progress}
  #log{white-space:pre-wrap;font:12px/1.5 ui-monospace,Menlo,monospace;background:var(--card);border:1px solid var(--line);
    border-radius:4px;padding:12px;margin-top:16px;max-height:340px;overflow:auto}
</style></head><body>
<header>
  <h1>Pick the photos</h1>
  <span style="color:#54595d">Everything here is free-licensed on Wikimedia Commons. Nothing publishes until you press the button.</span>
  <button id="go" style="margin-left:auto">Publish the selected photos</button>
</header>
<main>
  ${sheet.map(card).join('')}
  <div id="log" hidden></div>
</main>
<script>
document.getElementById('go').addEventListener('click', async () => {
  const btn = document.getElementById('go');
  const log = document.getElementById('log');
  btn.disabled = true; btn.textContent = 'Publishing...';
  log.hidden = false; log.textContent = 'Working. Watch the terminal too.\\n';
  const sel = {};
  document.querySelectorAll('.slot').forEach(s => {
    const checked = s.querySelector('input:checked');
    sel[s.id] = checked ? checked.value : 'skip';
  });
  const res = await fetch('/publish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sel) });
  const out = await res.json();
  log.textContent += out.log.join('\\n');
  btn.textContent = 'Done';
});
</script>
</body></html>`;
}

// ---------------------------------------------------------------------- main

console.log(`\nWitipedia photo import  ->  ${SITE}${FAKE ? '  (offline fixtures)' : ''}\n`);
console.log('Searching Wikimedia Commons:');
const sheet = await gather();
const total = sheet.reduce((n, s) => n + s.candidates.length, 0);
if (!total) { console.error('\nNo candidates found. Check the network and try again.'); process.exit(1); }

const username = USER || (await ask('\nWiki username with upload rights [Admin]: ')) || 'Admin';
const password = PASS || await ask(`Password for ${username}: `, true);

if (AUTO) {
  // Highest-ranked candidate for every slot, no review step.
  const selections = Object.fromEntries(sheet.map((s) => [s.id, s.candidates.length ? 0 : 'skip']));
  const results = await publish(sheet, selections, { username, password, log: (m) => console.log(m) });
  const placed = results.filter((r) => r.placed).length;
  console.log(`\nDone: ${placed} image${placed === 1 ? '' : 's'} published and placed.`);
  process.exit(results.some((r) => r.error) ? 1 : 0);
}

const server = createServer(async (req, res) => {
  if (req.url === '/' ) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(sheetHtml(sheet));
  }
  if (req.url.startsWith('/img/')) {
    const name = decodeURIComponent(req.url.slice(5));
    const file = join(photoDir, name.replace(/[^\w.-]/g, ''));
    if (!existsSync(file)) { res.writeHead(404); return res.end('no'); }
    const ext = name.split('.').pop();
    res.writeHead(200, { 'Content-Type': ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : ext === 'gif' ? 'image/gif' : 'image/jpeg' });
    return res.end(readFileSync(file));
  }
  if (req.url === '/publish' && req.method === 'POST') {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const selections = JSON.parse(Buffer.concat(chunks).toString() || '{}');
    const lines = [];
    const log = (m) => { console.log(m); lines.push(m); };
    try {
      const results = await publish(sheet, selections, { username, password, log });
      const placed = results.filter((r) => r.placed).length;
      log(`\nDone: ${placed} image${placed === 1 ? '' : 's'} published and placed.`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ log: lines, results }));
      console.log(`\nAll done. Look at ${SITE}/wiki/Special:ListFiles`);
    } catch (e) {
      log(`Failed: ${e.message}`);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ log: lines, error: e.message }));
    }
    return;
  }
  res.writeHead(404); res.end('no');
});

server.listen(PORT, () => {
  console.log(`\nOpen this to choose:  http://localhost:${PORT}\n`);
  console.log('Pick one photo per slot, then press "Publish the selected photos".');
  console.log('Ctrl-C when you are finished.\n');
});
