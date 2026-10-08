#!/usr/bin/env node
// Prints every article title already in the seed files, one per line.
import fs from 'node:fs';
const dir = new URL('./seed/', import.meta.url);
const titles = [];
for (const f of fs.readdirSync(dir).filter((f) => /^articles-\d+\.mjs$/.test(f))) {
  const m = await import(new URL(f, dir));
  for (const k of Object.keys(m)) for (const a of m[k]) titles.push(a.title);
}
console.log(titles.sort().join('\n'));
