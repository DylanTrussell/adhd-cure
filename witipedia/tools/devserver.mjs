#!/usr/bin/env node
/**
 * Local dev server: runs the Worker against a real SQLite file through a small
 * D1-compatible shim, so the site can be developed and reviewed without a
 * Cloudflare account. Production still runs on Workers + D1 unchanged.
 *
 *   node tools/devserver.mjs [port]
 */
import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, writeFileSync, existsSync, unlinkSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { Readable } from 'node:stream';
import worker from '../src/index.js';

const root = new URL('..', import.meta.url);
const dbPath = fileURLToPath(new URL('local.sqlite', root));
const port = Number(process.argv[2]) || 8787;
const fresh = process.env.FRESH !== '0';

if (fresh && existsSync(dbPath)) unlinkSync(dbPath);
const sqlite = new DatabaseSync(dbPath);

function execScript(file) {
  const sql = readFileSync(fileURLToPath(new URL(file, root)), 'utf8');
  // Split on semicolons at end of line: enough for our own generated SQL.
  for (const stmt of sql.split(/;\s*(?:\r?\n|$)/)) {
    const s = stmt.trim();
    if (!s || s.startsWith('--')) continue;
    try { sqlite.exec(`${s};`); } catch (e) { throw new Error(`${e.message}\n  in: ${s.slice(0, 160)}`); }
  }
}
if (fresh) {
  execScript('schema.sql');
  if (existsSync(fileURLToPath(new URL('seed.sql', root)))) execScript('seed.sql');
}

const toResult = (rows) => ({ results: rows, success: true, meta: {} });

function makeStatement(sql, binds = []) {
  return {
    bind: (...args) => makeStatement(sql, args),
    async first() {
      const st = sqlite.prepare(sql);
      const r = st.get(...binds);
      return r === undefined ? null : r;
    },
    async all() { return toResult(sqlite.prepare(sql).all(...binds)); },
    async run() {
      const info = sqlite.prepare(sql).run(...binds);
      return { success: true, meta: { last_row_id: Number(info.lastInsertRowid), changes: Number(info.changes) } };
    },
    __sql: sql, __binds: binds,
  };
}

const DB = {
  prepare: (sql) => makeStatement(sql),
  async batch(stmts) {
    const out = [];
    sqlite.exec('BEGIN');
    try {
      for (const s of stmts) out.push(await s.run());
      sqlite.exec('COMMIT');
    } catch (e) { sqlite.exec('ROLLBACK'); throw e; }
    return out;
  },
};

/**
 * Local stand-in for the R2 bucket: objects land in ./local-media so uploads
 * can be developed and tested without a Cloudflare account.
 */
const mediaDir = fileURLToPath(new URL('local-media/', root));
mkdirSync(mediaDir, { recursive: true });
const MEDIA = {
  async put(key, value, opts = {}) {
    const dest = join(mediaDir, key.replace(/\//g, '_'));
    writeFileSync(dest, Buffer.from(value));
    writeFileSync(`${dest}.meta`, JSON.stringify(opts.httpMetadata || {}));
    return { key };
  },
  async get(key) {
    const src = join(mediaDir, key.replace(/\//g, '_'));
    if (!existsSync(src)) return null;
    const buf = readFileSync(src);
    let meta = {};
    try { meta = JSON.parse(readFileSync(`${src}.meta`, 'utf8')); } catch (e) {}
    return {
      body: Readable.toWeb(Readable.from(buf)),
      httpMetadata: meta,
      size: buf.length,
      async arrayBuffer() { return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength); },
    };
  },
  async delete(key) {
    const src = join(mediaDir, key.replace(/\//g, '_'));
    if (existsSync(src)) unlinkSync(src);
    if (existsSync(`${src}.meta`)) unlinkSync(`${src}.meta`);
  },
};

const env = {
  DB, MEDIA,
  SITE_NAME: process.env.SITE_NAME || 'Witipedia',
  SITE_TAGLINE: process.env.SITE_TAGLINE || "It's funny because it's true.",
  ANON_EDITING: process.env.ANON_EDITING || 'true',
};

createServer(async (req, res) => {
  const url = `http://${req.headers.host || `localhost:${port}`}${req.url}`;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const body = chunks.length ? Buffer.concat(chunks) : undefined;
  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : body,
  });
  try {
    const resp = await worker.fetch(request, env);
    res.statusCode = resp.status;
    for (const [k, v] of resp.headers) res.setHeader(k, v);
    res.end(Buffer.from(await resp.arrayBuffer()));
  } catch (e) {
    res.statusCode = 500;
    res.end(`dev server error: ${e.stack}`);
  }
}).listen(port, () => {
  console.log(`${env.SITE_NAME} dev server: http://localhost:${port}/wiki/Main_Page`);
  console.log(`sqlite: ${dbPath}${fresh ? ' (rebuilt from schema.sql + seed.sql)' : ' (reused; FRESH=0)'}`);
});
