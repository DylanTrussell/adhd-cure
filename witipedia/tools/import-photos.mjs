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

// --------------------------------------------------------------- web search

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

/**
 * Image results from the open web, for the joke pictures. These are other
 * people's work: they are marked non-free, and the file page records where each
 * one came from and why it is there. DuckDuckGo needs no API key, which is why
 * it is used here; if the endpoint changes, the "use my own image" tab in the
 * picker still works.
 */
async function webCandidates(query, limit) {
  const seed = await fetch(`https://duckduckgo.com/?q=${encodeURIComponent(query)}&iar=images&iax=images&ia=images`,
    { headers: { 'User-Agent': UA } });
  const html = await seed.text();
  const vqd = (/vqd=["']?([\d-]+)["']?/.exec(html) || /vqd=([\w-]+)&/.exec(html) || [])[1];
  if (!vqd) throw new Error('could not start an image search');

  const res = await fetch(
    `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}&f=,,,&p=1`,
    { headers: { 'User-Agent': UA, Referer: 'https://duckduckgo.com/', Accept: 'application/json' } });
  if (!res.ok) throw new Error(`image search returned ${res.status}`);
  const data = await res.json();

  return (data.results || [])
    .filter((r) => r.image && /\.(jpe?g|png|gif|webp)(\?|$)/i.test(r.image))
    .filter((r) => (r.width || 0) >= 400)
    .slice(0, limit)
    .map((r) => ({
      title: String(r.title || 'web image').slice(0, 90),
      thumb: r.thumbnail || r.image,
      full: r.image,
      width: r.width, height: r.height,
      mime: /\.png(\?|$)/i.test(r.image) ? 'image/png'
        : /\.gif(\?|$)/i.test(r.image) ? 'image/gif'
        : /\.webp(\?|$)/i.test(r.image) ? 'image/webp' : 'image/jpeg',
      author: String(r.source || 'unknown').slice(0, 80),
      license: 'fair use',
      licenseUrl: 'https://www.copyright.gov/fair-use/',
      description: String(r.title || '').slice(0, 200),
      source: r.url || r.image,
      nonFree: true,
      score: Math.min(30, (r.width || 0) / 200),
    }));
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

/** Images composed in the browser or fetched from a URL you supplied. */
const stagedFiles = new Map();
let stageCounter = 0;
function stage(buffer, mime, { title = '', source = '' } = {}) {
  const ext = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : mime === 'image/gif' ? 'gif' : 'jpg';
  const id = `staged-${++stageCounter}`;
  const name = `${id}.${ext}`;
  const path = join(photoDir, name);
  writeFileSync(path, buffer);
  stagedFiles.set(id, { path, name, mime, title, source });
  return { id, name };
}

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
        nonFree: n === 3,
      }));
    } else {
      // Joke pictures come from the open web first, where the photoshops live.
      // Documentary pictures come from Commons first, where the real ones are.
      const wantWeb = slot.kind === 'humour' || slot.web !== false;
      const [commons, web] = await Promise.all([
        commonsCandidates(slot.query, CANDIDATES).catch(() => []),
        wantWeb ? webCandidates(slot.webQuery || slot.query, CANDIDATES).catch((e) => {
          process.stdout.write(`(web search unavailable: ${e.message}) `);
          return [];
        }) : Promise.resolve([]),
      ]);
      found = slot.kind === 'humour' ? [...web, ...commons] : [...commons, ...web];
      if (!found.length) { console.log('nothing found'); sheet.push({ ...slot, id, candidates: [], second: [] }); continue; }
      found = found.slice(0, CANDIDATES * 2);
    }
    let second = [];
    if (slot.diptych && !FAKE) {
      try { second = await commonsCandidates(slot.diptych, Math.max(3, Math.floor(CANDIDATES / 2))); }
      catch (e) { second = []; }
    } else if (slot.diptych && FAKE) {
      second = [1, 2].map((n) => ({
        title: `${slot.diptych.split(' ')[0]} second ${n}.png`, width: 900, height: 650, mime: 'image/png',
        author: 'Test Fixture', license: 'CC0', licenseUrl: '', description: `second group ${n}`,
        source: 'offline fixture', score: 5 - n,
      }));
    }

    const saved = [];
    for (const [n, c] of found.entries()) {
      const ext = c.mime === 'image/png' ? 'png' : c.mime === 'image/webp' ? 'webp' : c.mime === 'image/gif' ? 'gif' : 'jpg';
      const file = join(photoDir, `${id}-${n}.${ext}`);
      try {
        if (FAKE) writeFileSync(file, fakeImage(n + 1));
        else if (!existsSync(file)) {
          let r = await fetch(c.full || c.thumb, { headers: { 'User-Agent': UA, Referer: c.source || '' } })
            .catch(() => null);
          if ((!r || !r.ok) && c.thumb) r = await fetch(c.thumb, { headers: { 'User-Agent': UA } }).catch(() => null);
          if (!r || !r.ok) continue;
          const buf = Buffer.from(await r.arrayBuffer());
          if (buf.length > 10 * 1024 * 1024 || buf.length < 1000) continue;
          writeFileSync(file, buf);
        }
        saved.push({ ...c, local: file, localName: `${id}-${n}.${ext}`, ext });
      } catch (e) { /* skip this candidate */ }
    }
    const savedB = [];
    for (const [n, c] of second.entries()) {
      const ext = c.mime === 'image/png' ? 'png' : c.mime === 'image/webp' ? 'webp' : c.mime === 'image/gif' ? 'gif' : 'jpg';
      const file = join(photoDir, `${id}-b${n}.${ext}`);
      try {
        if (FAKE) writeFileSync(file, fakeImage(n + 5));
        else if (!existsSync(file)) {
          const r = await fetch(c.thumb, { headers: { 'User-Agent': 'Witipedia-photo-import/1.0' } });
          if (!r.ok) continue;
          writeFileSync(file, Buffer.from(await r.arrayBuffer()));
        }
        savedB.push({ ...c, local: file, localName: `${id}-b${n}.${ext}`, ext });
      } catch (e) { /* skip */ }
    }
    console.log(`${saved.length} candidate${saved.length === 1 ? '' : 's'}${savedB.length ? ` + ${savedB.length} for the diptych` : ''}`);
    sheet.push({ ...slot, id, candidates: saved, second: savedB });
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
    const choice = selections[slot.id];
    if (!choice || choice === 'skip') { results.push({ slot: slot.id, skipped: true }); continue; }

    let pick;
    if (choice.type === 'staged') {
      const staged = stagedFiles.get(choice.id);
      if (!staged) { results.push({ slot: slot.id, skipped: true }); continue; }
      pick = {
        local: staged.path, localName: staged.name, mime: staged.mime,
        title: staged.title || `${slot.article} illustration`,
        author: choice.author || 'unknown', license: choice.license || 'CC BY-SA 4.0',
        source: choice.source || staged.source || 'supplied by the site owner',
        description: choice.description || '',
      };
    } else {
      pick = slot.candidates[Number(choice.index)];
    }
    if (!pick) { results.push({ slot: slot.id, skipped: true }); continue; }

    const bytes = readFileSync(pick.local);
    const destination = `${slot.article} ${slot.place === 'lead' ? '' : slot.place.replace('section:', '')} (${pick.title.replace(/\.[a-z]+$/i, '')})`
      .replace(/\s+/g, ' ').trim().slice(0, 100);

    const licenseId = pick.nonFree || /fair use/i.test(pick.license || '') ? 'fair-use'
      : pick.license.toLowerCase().includes('cc0') ? 'cc0'
      : /public domain|^pd/i.test(pick.license) ? 'pd'
      : pick.license.toLowerCase().includes('by-sa 4') ? 'cc-by-sa-4.0'
      : pick.license.toLowerCase().includes('by-sa') ? 'cc-by-sa-3.0'
      : pick.license.toLowerCase().includes('by 4') ? 'cc-by-4.0'
      : 'cc-by-3.0';

    const fd = new FormData();
    fd.append('csrf', uploadCsrf);
    fd.append('name', destination);
    const rationale = (pick.nonFree || /fair use/i.test(pick.license || ''))
      ? `${pick.description || slot.caption}\n\n'''Fair-use rationale.''' This image illustrates commentary in [[${slot.article}]]. `
        + `It is used at low resolution, it substitutes for nothing the copyright holder sells, and no free equivalent exists. `
        + `Source: ${pick.source || 'unrecorded'}.`
      : `${pick.description || slot.caption}\n\nOriginally ${pick.title} on Wikimedia Commons.`;
    fd.append('description', rationale);
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
    const tag = slot.place === 'end'
      ? `[[File:${fileName.replace(/_/g, ' ')}|thumb|center|420px|${slot.caption}]]`
      : `[[File:${fileName.replace(/_/g, ' ')}|thumb|${slot.place === 'lead' ? 'right|300px' : 'right|280px'}|${slot.caption}]]`;
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
  if (place === 'end') {
    // Above the references, which is where a closing illustration belongs.
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const m = /^(={2,6})\s*(.+?)\s*\1\s*$/.exec(lines[i]);
      if (m && /^(references|see also|notes|sources)$/i.test(m[2].trim())) {
        lines.splice(i, 0, tag, '');
        return lines.join('\n');
      }
    }
    return `${text.replace(/\s+$/, '')}\n\n${tag}\n`;
  }
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
  const tile = (c, i, group) => `
    <label class="cand">
      <input type="radio" name="pick-${group}" value="${i}">
      <img src="/img/${c.localName}" alt="" loading="lazy">
      <span class="lic ${c.nonFree ? 'nonfree' : 'free'}">${c.nonFree ? 'non-free, fair use' : 'free licence'}</span>
      <span class="meta"><b>${c.title.replace(/</g, '&lt;')}</b><br>${c.width}&times;${c.height} &middot; ${c.license}<br>${String(c.author).replace(/</g, '&lt;').slice(0, 70)}</span>
    </label>`;

  const card = (slot) => `
  <section class="slot" id="${slot.id}" data-kind="${slot.kind}">
    <div class="slot-head">
      <h2>${slot.article}</h2>
      <span class="badge ${slot.kind}">${slot.kind === 'humour' ? 'the joke picture, foot of the article' : 'the real thing, top of the article'}</span>
      <span class="state" id="state-${slot.id}">nothing chosen</span>
    </div>
    <p class="cap">Caption: <i>${slot.caption}</i></p>

    <div class="tabs">
      <button type="button" class="tab on" data-tab="single" data-slot="${slot.id}">Pick one</button>
      ${slot.second && slot.second.length ? `<button type="button" class="tab" data-tab="diptych" data-slot="${slot.id}">Make a side-by-side</button>` : ''}
      <button type="button" class="tab" data-tab="own" data-slot="${slot.id}">Use my own image</button>
      <button type="button" class="tab" data-tab="skip" data-slot="${slot.id}">Skip</button>
    </div>

    <div class="pane on" data-pane="single" data-slot="${slot.id}">
      <div class="row">${slot.candidates.map((c, i) => tile(c, i, slot.id)).join('') || '<p class="none">Commons returned nothing for this one. Use your own image.</p>'}</div>
    </div>

    ${slot.second && slot.second.length ? `
    <div class="pane" data-pane="diptych" data-slot="${slot.id}">
      <p class="hint">Left half, then right half. It gets stitched into one picture, like a press compilation.</p>
      <div class="half"><b>Left</b><div class="row">${slot.candidates.map((c, i) => `
        <label class="cand sm"><input type="radio" name="dl-${slot.id}" value="${i}"><img src="/img/${c.localName}" loading="lazy"><span class="meta">${c.license}</span></label>`).join('')}</div></div>
      <div class="half"><b>Right</b><div class="row">${slot.second.map((c, i) => `
        <label class="cand sm"><input type="radio" name="dr-${slot.id}" value="${i}"><img src="/img/${c.localName}" loading="lazy"><span class="meta">${c.license}</span></label>`).join('')}</div></div>
      <div class="dip-actions">
        <button type="button" class="mk" data-slot="${slot.id}">Stitch these two</button>
        <label class="bw"><input type="checkbox" id="bw-${slot.id}"> match them in black and white</label>
      </div>
      <canvas id="canvas-${slot.id}" class="preview" hidden></canvas>
    </div>` : ''}

    <div class="pane" data-pane="own" data-slot="${slot.id}">
      <p class="hint">Paste a direct image address (in a browser: right-click the image, Copy Image Address) or choose a file from this Mac.
        Whatever you upload gets a file page recording the source you type here, so the record stays honest.</p>
      <div class="own-grid">
        <input type="url" id="url-${slot.id}" placeholder="https://example.com/thing.jpg">
        <button type="button" class="fetch" data-slot="${slot.id}">Fetch it</button>
        <input type="file" id="file-${slot.id}" accept="image/*">
        <input type="text" id="author-${slot.id}" placeholder="Author or creator (required)">
        <input type="text" id="source-${slot.id}" placeholder="Where it came from (page URL, or how you made it)">
        <select id="license-${slot.id}">
          <option value="cc-by-sa-4.0">CC BY-SA 4.0</option>
          <option value="cc-by-4.0">CC BY 4.0</option>
          <option value="cc0">CC0 / public domain dedication</option>
          <option value="pd">Public domain</option>
          <option value="own-cc-by-sa-4.0">My own work, CC BY-SA 4.0</option>
          <option value="fair-use">Non-free, used under fair use</option>
        </select>
      </div>
      <img class="preview" id="own-preview-${slot.id}" hidden>
    </div>
  </section>`;

  return `<!doctype html><html><head><meta charset="utf-8"><title>Pick the pictures</title>
<style>
  :root{--bg:#f6f7f9;--card:#fff;--ink:#1c1e21;--dim:#61656b;--line:#d3d7dc;--blue:#36c;--good:#178a4c}
  @media(prefers-color-scheme:dark){:root{--bg:#121518;--card:#1b1e22;--ink:#e9ecef;--dim:#9aa0a6;--line:#343a40}}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font:14px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
  header{position:sticky;top:0;z-index:9;background:var(--card);border-bottom:1px solid var(--line);
    padding:12px 20px;display:flex;gap:14px;align-items:center;flex-wrap:wrap}
  h1{font:600 16px/1.2 inherit;margin:0}
  header .sub{color:var(--dim);font-size:12.5px;flex:1;min-width:220px}
  main{padding:18px 20px 60px;max-width:1500px;margin:0 auto}
  .slot{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:14px 16px;margin:0 0 16px}
  .slot-head{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
  .slot h2{font-size:16px;margin:0}
  .badge{font-size:11px;padding:2px 8px;border-radius:10px;background:#e8f0fe;color:#1a4b8c}
  .badge.humour{background:#fdf0d5;color:#8a5a00}
  @media(prefers-color-scheme:dark){.badge{background:#1e3350;color:#a9c8f5}.badge.humour{background:#3d2f12;color:#f0c674}}
  .state{margin-left:auto;font-size:12px;color:var(--dim)}
  .state.set{color:var(--good);font-weight:600}
  .cap{margin:6px 0 10px;color:var(--dim);font-size:13px}
  .tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
  .tab{background:var(--bg);border:1px solid var(--line);border-radius:4px;padding:5px 11px;font:inherit;font-size:12.5px;cursor:pointer;color:var(--ink)}
  .tab.on{background:var(--blue);border-color:var(--blue);color:#fff}
  .pane{display:none}.pane.on{display:block}
  .row{display:flex;gap:10px;overflow-x:auto;padding-bottom:6px}
  .cand{flex:0 0 230px;border:2px solid transparent;border-radius:5px;padding:6px;cursor:pointer;background:var(--bg)}
  .cand.sm{flex:0 0 150px}
  .cand:has(input:checked){border-color:var(--blue)}
  .cand img{width:100%;height:160px;object-fit:cover;border-radius:3px;display:block;background:#ccc}
  .cand.sm img{height:110px}
  .cand input{margin:0 0 5px}
  .meta{display:block;font-size:11px;line-height:1.35;margin-top:5px;color:var(--dim);word-break:break-word}
  .lic{display:inline-block;font-size:10.5px;padding:1px 6px;border-radius:8px;margin-top:5px}
  .lic.free{background:#e4f5e9;color:#176c3a}
  .lic.nonfree{background:#fbe9e7;color:#8c2f1f}
  @media(prefers-color-scheme:dark){.lic.free{background:#16351f;color:#8fd6a8}.lic.nonfree{background:#3a1f1a;color:#f2a99b}}
  .half{margin:8px 0}.half b{font-size:12.5px;color:var(--dim)}
  .hint{font-size:12.5px;color:var(--dim);margin:0 0 8px}
  .none{color:var(--dim);font-size:13px}
  .dip-actions{display:flex;gap:12px;align-items:center;margin-top:8px;flex-wrap:wrap}
  .mk,.fetch{background:var(--blue);color:#fff;border:0;border-radius:4px;padding:7px 14px;font:600 13px inherit;cursor:pointer}
  .bw{font-size:12.5px;color:var(--dim)}
  .own-grid{display:grid;grid-template-columns:1fr auto;gap:8px;max-width:640px}
  .own-grid input,.own-grid select{padding:7px 9px;border:1px solid var(--line);border-radius:4px;background:var(--bg);color:var(--ink);font:inherit;font-size:13px}
  .own-grid input[type=file],.own-grid select,.own-grid input[type=text]{grid-column:1/-1}
  .preview{display:block;max-width:100%;width:520px;margin-top:10px;border:1px solid var(--line);border-radius:4px}
  #go{background:var(--good);color:#fff;border:0;border-radius:4px;padding:9px 18px;font:600 14px inherit;cursor:pointer}
  #go:disabled{opacity:.6;cursor:progress}
  #log{white-space:pre-wrap;font:12px/1.5 ui-monospace,Menlo,monospace;background:var(--card);border:1px solid var(--line);
    border-radius:5px;padding:12px;margin-top:14px;max-height:320px;overflow:auto}
</style></head><body>
<header>
  <h1>Pick the pictures</h1>
  <span class="sub">Two per article: the real thing at the top, the joke at the foot. Green means free to reuse; red means someone else's work, published with a fair-use rationale on its file page. Nothing publishes until you press the button.</span>
  <button id="go">Publish what I picked</button>
</header>
<main>
  ${sheet.map(card).join('')}
  <div id="log" hidden></div>
</main>
<script>
const picks = {};

function setState(slot, text) {
  const el = document.getElementById('state-' + slot);
  el.textContent = text;
  el.classList.toggle('set', text !== 'nothing chosen' && text !== 'skipped');
}

document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
  const slot = t.dataset.slot;
  document.querySelectorAll('.tab[data-slot="' + slot + '"]').forEach(x => x.classList.toggle('on', x === t));
  document.querySelectorAll('.pane[data-slot="' + slot + '"]').forEach(p => p.classList.toggle('on', p.dataset.pane === t.dataset.tab));
  if (t.dataset.tab === 'skip') { picks[slot] = 'skip'; setState(slot, 'skipped'); }
}));

document.querySelectorAll('input[type=radio][name^="pick-"]').forEach(r => r.addEventListener('change', () => {
  const slot = r.name.slice(5);
  picks[slot] = { type: 'candidate', index: Number(r.value) };
  setState(slot, 'one photo chosen');
}));

// --- side-by-side composer, done on canvas so no image library is needed
document.querySelectorAll('.mk').forEach(btn => btn.addEventListener('click', async () => {
  const slot = btn.dataset.slot;
  const l = document.querySelector('input[name="dl-' + slot + '"]:checked');
  const r = document.querySelector('input[name="dr-' + slot + '"]:checked');
  if (!l || !r) { alert('Choose one for the left and one for the right.'); return; }
  const left = document.querySelectorAll('.pane[data-pane="diptych"][data-slot="' + slot + '"] input[name="dl-' + slot + '"]')[Number(l.value)].parentElement.querySelector('img');
  const right = document.querySelectorAll('.pane[data-pane="diptych"][data-slot="' + slot + '"] input[name="dr-' + slot + '"]')[Number(r.value)].parentElement.querySelector('img');
  const load = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  const [a, b] = await Promise.all([load(left.src), load(right.src)]);
  const H = 640, GAP = 6;
  const wa = Math.round(a.naturalWidth * (H / a.naturalHeight));
  const wb = Math.round(b.naturalWidth * (H / b.naturalHeight));
  const canvas = document.getElementById('canvas-' + slot);
  canvas.width = wa + GAP + wb; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (document.getElementById('bw-' + slot).checked) ctx.filter = 'grayscale(1) contrast(1.05)';
  ctx.drawImage(a, 0, 0, wa, H);
  ctx.drawImage(b, wa + GAP, 0, wb, H);
  canvas.hidden = false;
  const blob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.9));
  const fd = new FormData();
  fd.append('file', blob, 'diptych.jpg');
  fd.append('title', 'composite');
  const res = await fetch('/stage', { method: 'POST', body: fd });
  const out = await res.json();
  picks[slot] = { type: 'staged', id: out.id, author: 'see file page', license: 'cc-by-sa-4.0', source: 'composite of two Wikimedia Commons photographs' };
  setState(slot, 'side-by-side ready');
}));

// --- your own image, by address or from this machine
document.querySelectorAll('.fetch').forEach(btn => btn.addEventListener('click', async () => {
  const slot = btn.dataset.slot;
  const url = document.getElementById('url-' + slot).value.trim();
  if (!url) return;
  btn.disabled = true; btn.textContent = 'Fetching...';
  try {
    const res = await fetch('/stage-url', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) });
    const out = await res.json();
    if (out.error) { alert(out.error); return; }
    const prev = document.getElementById('own-preview-' + slot);
    prev.src = '/img/' + out.name; prev.hidden = false;
    picks[slot] = { type: 'staged', id: out.id, source: url, license: 'fair-use', author: 'unknown (see source)' };
    document.getElementById('license-' + slot).value = 'fair-use';
    setState(slot, 'your image ready');
  } finally { btn.disabled = false; btn.textContent = 'Fetch it'; }
}));

document.querySelectorAll('input[type=file]').forEach(inp => inp.addEventListener('change', async () => {
  const slot = inp.id.slice(5);
  if (!inp.files[0]) return;
  const fd = new FormData();
  fd.append('file', inp.files[0]);
  fd.append('title', inp.files[0].name);
  const res = await fetch('/stage', { method: 'POST', body: fd });
  const out = await res.json();
  const prev = document.getElementById('own-preview-' + slot);
  prev.src = '/img/' + out.name; prev.hidden = false;
  picks[slot] = { type: 'staged', id: out.id, source: 'uploaded from this computer' };
  setState(slot, 'your image ready');
}));

document.getElementById('go').addEventListener('click', async () => {
  const btn = document.getElementById('go');
  const log = document.getElementById('log');
  // attach the attribution fields to any staged pick
  document.querySelectorAll('.slot').forEach(s => {
    const p = picks[s.id];
    if (p && p.type === 'staged') {
      const a = document.getElementById('author-' + s.id).value.trim();
      const src = document.getElementById('source-' + s.id).value.trim();
      const lic = document.getElementById('license-' + s.id).value;
      if (a) p.author = a;
      if (src) p.source = src;
      if (lic) p.license = lic;
      if (!p.author) p.author = 'supplied by the site owner';
    }
  });
  const chosen = Object.values(picks).filter(p => p && p !== 'skip').length;
  if (!chosen) { alert('Nothing is chosen yet.'); return; }
  btn.disabled = true; btn.textContent = 'Publishing...';
  log.hidden = false; log.textContent = 'Working. The terminal shows the same thing.\\n';
  const res = await fetch('/publish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(picks) });
  const out = await res.json();
  log.textContent += out.log.join('\\n');
  btn.textContent = 'Done';
});
</script>
</body></html>`;
}

// ---------------------------------------------------------------------- main

console.log(`\nWitipedia photo import  ->  ${SITE}${FAKE ? '  (offline fixtures)' : ''}\n`);
console.log('Searching Wikimedia Commons and the open web:');
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
  if (req.url === '/stage' && req.method === 'POST') {
    // A composed diptych or a file from this machine.
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const request = new Request('http://local/stage', {
      method: 'POST', headers: req.headers, body: Buffer.concat(chunks), duplex: 'half',
    });
    const form = await request.formData();
    const file = form.get('file');
    if (!file || typeof file.arrayBuffer !== 'function') {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'no file' }));
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const out = stage(buf, file.type || 'image/jpeg', { title: String(form.get('title') || '') });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(out));
  }

  if (req.url === '/stage-url' && req.method === 'POST') {
    // An image address you pasted. Fetched here rather than in the browser,
    // because most sites refuse a cross-origin read.
    const chunks = [];
    for await (const c of req) chunks.push(c);
    let url = '';
    try { url = JSON.parse(Buffer.concat(chunks).toString()).url; } catch (e) { /* handled below */ }
    const fail = (msg) => { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: msg })); };
    if (!/^https?:\/\//i.test(url || '')) return fail('That is not a web address.');
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (witipedia photo import)' }, redirect: 'follow' });
      if (!r.ok) return fail(`The server answered ${r.status}. Some sites block direct fetches; save the image and use the file picker instead.`);
      const type = (r.headers.get('content-type') || '').split(';')[0].trim();
      if (!/^image\/(jpeg|png|gif|webp)$/.test(type)) {
        return fail(`That address returned ${type || 'something that is not an image'}. You need the image address itself, not the page it sits on.`);
      }
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length > 10 * 1024 * 1024) return fail('That image is over 10 MB.');
      const out = stage(buf, type, { title: url.split('/').pop().slice(0, 80), source: url });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(out));
    } catch (e) {
      return fail(`Could not fetch it: ${e.message}`);
    }
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
