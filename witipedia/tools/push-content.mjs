#!/usr/bin/env node
/**
 * Adds new content to a site that is already live, without touching anything
 * that already exists. Reads the same seed files as build-seed.mjs, then
 * POSTs each page to /api/admin/import, which only creates pages that are not
 * already on the site. Existing pages, revisions, ratings and accounts are
 * never touched, so it is safe to run against a wiki real people are editing.
 *
 *   node tools/push-content.mjs                       # against witipedia.co
 *   node tools/push-content.mjs --site http://localhost:8787
 *
 * Needs SEED_IMPORT_TOKEN in the environment, matching the secret set with
 * `wrangler secret put SEED_IMPORT_TOKEN` on the deployed Worker. This is the
 * step the GitHub Action runs after every deploy; run it by hand if you are
 * not using the Action, or want to push a batch without waiting for CI.
 */
import { articles1 } from './seed/articles-1.mjs';
import { articles2 } from './seed/articles-2.mjs';
import { articles3 } from './seed/articles-3.mjs';
import { projectPages } from './seed/project.mjs';

const args = process.argv.slice(2);
const argOf = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const SITE = (argOf('--site', process.env.SITE || 'https://witipedia.co')).replace(/\/$/, '');
const SITE_NAME = process.env.SITE_NAME || 'Witipedia';
const TOKEN = process.env.SEED_IMPORT_TOKEN || '';

if (!TOKEN) {
  console.error('SEED_IMPORT_TOKEN is not set. Set it to the same value as the deployed secret:');
  console.error('  npx wrangler secret put SEED_IMPORT_TOKEN   (prints/asks for the value once)');
  console.error('  SEED_IMPORT_TOKEN=... node tools/push-content.mjs');
  process.exit(1);
}

const sub = (s) => String(s).replace(/Witipedia/g, SITE_NAME);

/** Flatten the same article shape build-seed.mjs uses into {ns, title, content, comment, ratings}. */
function articlePages(list) {
  const out = [];
  for (const a of list) {
    const finalContent = sub(a.revisions[a.revisions.length - 1].content
      ?? a.revisions.reduce((c, r) => (r.revert !== undefined ? c : r.content ?? c), ''));
    // Resolve the final text the same way build-seed.mjs does: walk revisions,
    // applying patches/reverts in order, so what we push matches what the
    // local seed would have produced.
    let content = '';
    const byIndex = [];
    for (const r of a.revisions) {
      if (r.revert !== undefined) content = byIndex[r.revert - 1];
      else if (r.patch) { let c = content; for (const [from, to] of r.patch) c = c.split(from).join(to); content = c; }
      else content = r.content;
      byIndex.push(content);
    }
    out.push({ ns: 0, title: sub(a.title), content: sub(content), comment: 'imported', ratings: a.ratings });
    if (a.talk) {
      out.push({ ns: 1, title: sub(a.title), content: sub(a.talk.content), comment: 'imported' });
    }
  }
  return out;
}

function projectPagesFlat() {
  return projectPages.map((p) => ({ ns: p.ns, title: sub(p.title), content: sub(p.content), comment: 'imported' }));
}

const pages = [
  ...articlePages([...articles1, ...articles2, ...articles3]),
  ...projectPagesFlat(),
];

console.log(`Pushing ${pages.length} candidate pages to ${SITE} ...`);

const CHUNK = 100;
let created = 0, skipped = 0;
for (let i = 0; i < pages.length; i += CHUNK) {
  const chunk = pages.slice(i, i + CHUNK);
  const res = await fetch(`${SITE}/api/admin/import`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ pages: chunk }),
  });
  if (!res.ok) {
    console.error(`Import call failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const out = await res.json();
  created += out.created;
  skipped += out.skipped;
  for (const r of out.results) {
    if (r.created) console.log(`  + ${r.title}`);
  }
}

console.log(`\nDone: ${created} page${created === 1 ? '' : 's'} created, ${skipped} already existed and were left untouched.`);
