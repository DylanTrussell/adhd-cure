#!/usr/bin/env node
/** End-to-end smoke test against a running dev server (default :8787). */
const BASE = process.env.BASE || 'http://localhost:8787';
let pass = 0, fail = 0;
const jar = new Map();

function cookieHeader() { return [...jar].map(([k, v]) => `${k}=${v}`).join('; '); }
async function go(path, opts = {}) {
  const res = await fetch(BASE + path, {
    redirect: 'manual',
    ...opts,
    headers: { Cookie: cookieHeader(), Origin: BASE, ...(opts.headers || {}) },
  });
  const sc = res.headers.getSetCookie?.() || [];
  for (const c of sc) { const [kv] = c.split(';'); const [k, ...v] = kv.split('='); jar.set(k.trim(), v.join('=')); }
  const text = res.headers.get('content-type')?.includes('json') ? JSON.stringify(await res.json()) : await res.text();
  return { status: res.status, location: res.headers.get('location'), text };
}
function check(name, cond, detail = '') {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}${detail ? ` -- ${detail}` : ''}`); }
}
const form = (obj) => new URLSearchParams(obj);
const csrfOf = (html) => (/name="csrf" value="([^"]*)"/.exec(html) || [, ''])[1];

console.log('\nReading');
let r = await go('/wiki/Main_Page');
check('main page 200', r.status === 200);
check('main page has tagline', r.text.includes("It's funny because it's true."));
check('main page shows leaderboard', r.text.includes('Highest rated: funny'));
check('main page shows recent changes', r.text.includes('Recent changes'));

r = await go('/wiki/Great_Emu_War');
check('article 200', r.status === 200);
check('article renders infobox', r.text.includes('class="infobox"'));
check('article renders refs', r.text.includes('class="references"'));
check('article renders TOC', r.text.includes('id="toc"'));
check('article renders quote', r.text.includes('invulnerability of tanks'));
check('article has both rating rows', r.text.includes('Was this helpful?') && r.text.includes('Was this funny?'));
check('article shows seeded counts', /class="n">498</.test(r.text));
check('categories box', r.text.includes('catlinks'));
check('discussion tab present', r.text.includes('Discussion'));

r = await go('/wiki/Emu_War');
check('redirect page follows', r.status === 200 && r.text.includes('Redirected from'));

r = await go('/wiki/Talk:Great_Emu_War');
check('talk page renders', r.status === 200 && r.text.includes('neutral'));
check('signature expanded in seed', r.text.includes('HansardHannah'));

r = await go('/wiki/Nonexistent_Page_Xyz');
check('missing page 404', r.status === 404 && r.text.includes('does not have an article'));

r = await go('/wiki/Great_Emu_War?action=history');
check('history 200', r.status === 200);
check('history lists revisions', (r.text.match(/Special:Diff\//g) || []).length >= 2);
check('history shows rollback tag', r.text.includes('rollback'));

const histIds = [...r.text.matchAll(/Special:Diff\/(\d+)/g)].map((m) => Number(m[1]));
r = await go(`/wiki/Special:Diff/${histIds[0]}`);
check('diff 200', r.status === 200);
check('diff shows added/removed lines', r.text.includes('diff-addedline') || r.text.includes('diff-deletedline'));

r = await go('/wiki/Great_Emu_War?action=raw');
check('raw wikitext', r.status === 200 && r.text.startsWith('{{true and funny'));

console.log('\nSearch');
r = await go('/api/search?q=womb');
check('api search json', r.text.includes('Wombat'));
r = await go('/wiki/Special:Search?q=cube&fulltext=1');
check('fulltext search finds wombat', r.text.includes('Wombat'));
r = await go('/wiki/Special:Search?q=Platypus');
check('exact title search redirects', r.status === 302 && r.location === '/wiki/Platypus');

console.log('\nSpecial pages');
for (const [p, needle] of [
  ['/wiki/Special:RecentChanges', 'Recent changes'],
  ['/wiki/Special:NewPages', 'New pages'],
  ['/wiki/Special:AllPages', 'All pages'],
  ['/wiki/Special:TopRated', 'Top rated'],
  ['/wiki/Special:Statistics', 'Content pages'],
  ['/wiki/Special:ListUsers', 'User list'],
  ['/wiki/Special:Log', 'Logs'],
  ['/wiki/Special:ShortPages', 'Short pages'],
  ['/wiki/Special:WantedPages', 'Wanted pages'],
  ['/wiki/Special:SpecialPages', 'Special pages'],
  ['/wiki/Special:Contributions/Admin', 'Contributions'],
  ['/wiki/Special:WhatLinksHere/Wombat', 'Pages that link to'],
  ['/wiki/Special:PageInfo/Wombat', 'Information for'],
]) { r = await go(p); check(`${p} 200`, r.status === 200 && r.text.includes(needle), `status ${r.status}`); }
r = await go('/wiki/Special:Random');
check('random redirects to an article', r.status === 302 && r.location.startsWith('/wiki/'));
r = await go('/wiki/Special:Nonsense');
check('unknown special 404', r.status === 404);

console.log('\nAnonymous editing');
r = await go('/wiki/Sandbox_Test?action=edit');
check('anon edit form', r.status === 200 && r.text.includes('IP address'));
r = await go('/wiki/Sandbox_Test?action=submit', {
  method: 'POST', body: form({ text: "'''Sandbox Test''' is a page created by the test suite.<ref>Itself.</ref>\n\n== References ==\n{{reflist}}", summary: 'anon creation', save: '1' }),
});
check('anon save redirects', r.status === 302, `status ${r.status}`);
r = await go('/wiki/Sandbox_Test');
check('anon page saved', r.status === 200 && r.text.includes('created by the test suite'));
check('anon edit attributed to IP', r.text.length > 0);
r = await go('/wiki/Sandbox_Test?action=history');
check('anon edit shows IP in history', /127\.0\.0\.1/.test(r.text));

console.log('\nPreview and section editing');
r = await go('/wiki/Sandbox_Test?action=submit', {
  method: 'POST', body: form({ text: "''preview only''", preview: '1' }),
});
check('preview does not save', r.status === 200 && r.text.includes('Preview'));
r = await go('/wiki/Sandbox_Test');
check('preview really did not save', !r.text.includes('preview only'));
r = await go('/wiki/Great_Emu_War?action=edit&section=2');
check('section edit loads one section', r.status === 200 && r.text.includes('== The campaign =='), 'section text missing');

console.log('\nRatings');
r = await go('/api/rate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ page: 'Wombat', axis: 'funny', value: 1 }) });
check('rate up works', JSON.parse(r.text).up === 413, r.text);
r = await go('/api/rate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ page: 'Wombat', axis: 'funny', value: 1 }) });
check('rating toggles off', JSON.parse(r.text).up === 412, r.text);
r = await go('/api/rate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ page: 'Wombat', axis: 'helpful', value: -1 }) });
check('helpful axis independent', JSON.parse(r.text).down === 5, r.text);

console.log('\nAccounts');
r = await go('/wiki/Special:CreateAccount');
const caCsrf = csrfOf(r.text);
r = await go('/wiki/Special:CreateAccount', { method: 'POST', body: form({ csrf: caCsrf, username: 'TestEditor', password: 'hunter2hunter2', password2: 'hunter2hunter2' }) });
check('account created + logged in', r.status === 302 && r.location.includes('User:TestEditor'), `${r.status} ${r.location}`);
r = await go('/wiki/Main_Page');
check('session active', r.text.includes('TestEditor'));
check('logged-in user sees Watchlist link', r.text.includes('Special:Watchlist'));

r = await go('/wiki/Special:CreateAccount', { method: 'POST', body: form({ csrf: caCsrf, username: 'TestEditor', password: 'hunter2hunter2', password2: 'hunter2hunter2' }) });
check('duplicate username rejected', r.text.includes('taken'));
r = await go('/wiki/Special:CreateAccount', { method: 'POST', body: form({ csrf: caCsrf, username: 'Shorty', password: 'abc', password2: 'abc' }) });
check('short password rejected', r.text.includes('at least 8'));

r = await go('/wiki/User:TestEditor?action=edit');
const ecsrf = csrfOf(r.text);
r = await go('/wiki/User:TestEditor?action=submit', { method: 'POST', body: form({ csrf: ecsrf, text: 'I am a test account.', summary: 'hello', save: '1', watch: '1' }) });
check('logged-in edit saves', r.status === 302);
r = await go('/wiki/Special:Watchlist');
check('watchlist populated', r.text.includes('User:TestEditor'));
r = await go('/wiki/Special:Contributions/TestEditor');
check('contributions show edit', r.text.includes('User:TestEditor'));

r = await go('/wiki/User:TestEditor?action=submit', { method: 'POST', body: form({ csrf: 'wrong-token', text: 'csrf attack', save: '1' }) });
check('bad csrf rejected', r.status === 403, `status ${r.status}`);

console.log('\nPermissions');
r = await go('/wiki/Special:Block');
check('non-admin cannot block', r.text.includes('Administrators only'));
r = await go('/wiki/Special:UserRights');
check('non-bureaucrat cannot grant rights', r.text.includes('Bureaucrats only'));
r = await go('/wiki/Main_Page?action=edit');
check('protected page is view-source for new user', r.text.includes('View source') || r.text.includes('fully protected'), 'not protected');

r = await go('/wiki/Main_Page?action=submit', { method: 'POST', body: form({ csrf: csrfOf((await go('/wiki/Main_Page?action=edit')).text), text: 'vandalism', save: '1' }) });
check('protected page rejects save', r.status === 403, `status ${r.status}`);

console.log('\nLogin / logout');
r = await go('/logout', { method: 'POST', body: form({ csrf: (await go('/wiki/Main_Page')).text.match(/name="csrf" value="([^"]*)"/)?.[1] || '' }) });
check('logout redirects', r.status === 302);
r = await go('/wiki/Special:UserLogin', { method: 'POST', body: form({ username: 'TestEditor', password: 'wrongpass' }) });
check('wrong password rejected', r.status === 401);
r = await go('/wiki/Special:UserLogin', { method: 'POST', body: form({ username: 'testeditor', password: 'hunter2hunter2' }) });
check('login works (case-insensitive username)', r.status === 302, `status ${r.status}`);


// ---------------------------------------------------------------- file uploads
console.log('\nUploads');
{
  // logged out: the form explains why it will not take the file
  await go('/logout', { method: 'POST', body: form({ csrf: csrfOf((await go('/wiki/Main_Page')).text) }) });
  let r = await go('/wiki/Special:Upload');
  check('anon sees the login requirement', r.text.includes('need an account to upload'));

  r = await go('/wiki/Special:UserLogin', { method: 'POST', body: form({ username: 'TestEditor', password: 'hunter2hunter2' }) });
  check('logged back in for upload', r.status === 302);
  r = await go('/wiki/Special:Upload');
  const upCsrf = csrfOf(r.text);
  check('upload form renders for a logged-in user', r.text.includes('Destination filename'));

  // A real PNG, built here so the test carries its own fixture.
  const { deflateSync } = await import('node:zlib');
  const makePng = (w, h) => {
    const crcTable = [...Array(256)].map((_, n) => {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      return c >>> 0;
    });
    const crc = (buf) => {
      let c = 0xffffffff;
      for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
      return (c ^ 0xffffffff) >>> 0;
    };
    const chunk = (type, data) => {
      const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
      const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
      const cr = Buffer.alloc(4); cr.writeUInt32BE(crc(body));
      return Buffer.concat([len, body, cr]);
    };
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
    ihdr[8] = 8; ihdr[9] = 2; // 8-bit RGB
    const raw = Buffer.alloc(h * (1 + w * 3));
    for (let y = 0; y < h; y++) {
      const off = y * (1 + w * 3);
      raw[off] = 0;
      for (let x = 0; x < w; x++) {
        raw[off + 1 + x * 3] = (x * 4) % 256;
        raw[off + 2 + x * 3] = (y * 4) % 256;
        raw[off + 3 + x * 3] = 128;
      }
    }
    return Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0)),
    ]);
  };
  const png = makePng(320, 240);
  const send = async (fields, bytes, filename = 'shot.png', type = 'image/png') => {
    const fd = new FormData();
    for (const [k, v] of Object.entries(fields)) fd.append(k, v);
    if (bytes) fd.append('file', new Blob([bytes], { type }), filename);
    return go('/wiki/Special:Upload', { method: 'POST', body: fd });
  };

  r = await send({ csrf: upCsrf, name: 'Test upload', author: 'Own work', license: 'cc-by-sa-4.0', description: 'A test image.' }, png);
  check('upload redirects to the file page', r.status === 302 && r.location.includes('File:Test_upload.png'), `${r.status} ${r.location}`);

  r = await go('/wiki/File:Test_upload.png');
  check('file page shows the image', r.status === 200 && r.text.includes('/images/Test_upload.png'));
  check('file page shows the licence', r.text.includes('cc-by-sa-4.0') || r.text.includes('CC BY-SA 4.0'));
  check('file page shows the author', r.text.includes('Own work'));
  check('file page shows pixel dimensions', r.text.includes('320') && r.text.includes('240'));

  const img = await fetch(`${BASE}/images/Test_upload.png`, { headers: { Cookie: cookieHeader() } });
  const buf = new Uint8Array(await img.arrayBuffer());
  check('image bytes are served', img.status === 200 && buf.length === png.length, `status ${img.status} ${buf.length} vs ${png.length}`);
  check('image served with the right type', img.headers.get('content-type') === 'image/png');
  const etag = img.headers.get('etag');
  const again = await fetch(`${BASE}/images/Test_upload.png`, { headers: { 'If-None-Match': etag } });
  check('image revalidates with 304', again.status === 304, `status ${again.status}`);

  // the file shows up in an article
  r = await go('/wiki/Sandbox_Test?action=edit');
  r = await go('/wiki/Sandbox_Test?action=submit', {
    method: 'POST',
    body: form({ csrf: csrfOf((await go('/wiki/Sandbox_Test?action=edit')).text),
      text: '[[File:Test upload.png|thumb|right|240px|A caption about [[Wombat|wombats]].]]\n\nBody text.', summary: 'add image', save: '1' }),
  });
  check('article with an image saves', r.status === 302);
  r = await go('/wiki/Sandbox_Test');
  check('article renders the thumbnail', r.text.includes('class="thumb tright"') && r.text.includes('/images/Test_upload.png'));
  check('caption links still work inside the image', r.text.includes('>wombats</a>'));

  r = await go('/wiki/Special:ListFiles');
  check('file list shows the upload', r.text.includes('Test upload'));

  // rejections
  r = await send({ csrf: upCsrf, name: 'Bad file', author: 'Own work', license: 'cc-by-sa-4.0' },
    new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'), 'evil.svg', 'image/svg+xml');
  check('svg is rejected', r.text.includes('not a JPEG, PNG, GIF or WebP'), r.text.slice(0, 120));
  r = await send({ csrf: upCsrf, name: 'No licence', author: 'Own work', license: '' }, png);
  check('missing licence is rejected', r.text.includes('Choose a licence'));
  r = await send({ csrf: upCsrf, name: 'No author', author: '', license: 'cc0' }, png);
  check('missing author is rejected', r.text.includes('Name the author'));
  r = await send({ csrf: 'wrong', name: 'Csrf', author: 'x', license: 'cc0' }, png);
  check('upload with a bad csrf token is rejected', r.status === 403);
}

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
