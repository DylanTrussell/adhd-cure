/** Accounts, sessions, and the rights model. Same shape as MediaWiki's. */

const ITERATIONS = 210000;
const enc = new TextEncoder();

function b64(buf) {
  let s = '';
  const b = new Uint8Array(buf);
  for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s);
}
function fromB64(s) {
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function randomBytes(n) { return crypto.getRandomValues(new Uint8Array(n)); }

export async function hashPassword(password, saltB64) {
  const salt = saltB64 ? fromB64(saltB64) : randomBytes(16);
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITERATIONS }, key, 256);
  return `pbkdf2:${ITERATIONS}:${b64(salt)}:${b64(bits)}`;
}

export async function verifyPassword(password, stored) {
  const parts = String(stored || '').split(':');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
  const candidate = await hashPassword(password, parts[2]);
  const a = enc.encode(candidate), b = enc.encode(stored);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function sha256hex(s) {
  const d = await crypto.subtle.digest('SHA-256', enc.encode(s));
  return [...new Uint8Array(d)].map((x) => x.toString(16).padStart(2, '0')).join('');
}

export function newToken() {
  return [...randomBytes(32)].map((x) => x.toString(16).padStart(2, '0')).join('');
}

const SESSION_DAYS = 30;

export async function createSession(db, userId) {
  const token = newToken();
  const csrf = newToken().slice(0, 32);
  const now = Math.floor(Date.now() / 1000);
  await db.prepare(
    'INSERT INTO sessions (token_hash,user_id,csrf,created_at,expires_at) VALUES (?,?,?,?,?)')
    .bind(await sha256hex(token), userId, csrf, now, now + SESSION_DAYS * 86400).run();
  return { token, csrf };
}

export async function loadSession(db, token) {
  if (!token) return null;
  const now = Math.floor(Date.now() / 1000);
  const row = await db.prepare(
    `SELECT s.csrf, s.expires_at, u.* FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = ? AND s.expires_at > ?`).bind(await sha256hex(token), now).first();
  if (!row) return null;
  return { ...row, groups: String(row.groups || '').split(',').filter(Boolean) };
}

export async function destroySession(db, token) {
  if (!token) return;
  await db.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256hex(token)).run();
}

export function sessionCookie(token, secure = true) {
  return `wp_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}${secure ? '; Secure' : ''}`;
}
export function clearCookie(secure = true) {
  return `wp_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? '; Secure' : ''}`;
}

export function readCookie(request, name) {
  const raw = request.headers.get('Cookie') || '';
  for (const part of raw.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return null;
}

// ------------------------------------------------------------------ user model

export const USERNAME_RE = /^[A-Za-z0-9][A-Za-z0-9 _.\-']{1,48}$/;

export function normalizeUsername(raw) {
  const s = String(raw || '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Rights groups, promoted automatically the way Wikipedia does it.
 *   autoconfirmed        4 days old + 10 edits   (can edit semi-protected pages)
 *   extendedconfirmed    30 days + 500 edits
 * plus hand-granted editor / sysop / bureaucrat.
 */
export function effectiveGroups(user) {
  if (!user) return ['*'];
  const now = Math.floor(Date.now() / 1000);
  const ageDays = (now - user.created_at) / 86400;
  const g = new Set(['*', 'user', ...(user.groups || [])]);
  if (ageDays >= 4 && user.edit_count >= 10) g.add('autoconfirmed');
  if (ageDays >= 30 && user.edit_count >= 500) g.add('extendedconfirmed');
  if (g.has('sysop')) { g.add('autoconfirmed'); g.add('extendedconfirmed'); g.add('editor'); }
  return [...g];
}

const RIGHTS = {
  '*': ['read', 'edit', 'createtalk', 'rate'],
  user: ['createpage', 'move', 'upload', 'watch', 'minoredit'],
  autoconfirmed: ['editsemiprotected', 'rollback'],
  extendedconfirmed: ['editextendedsemiprotected'],
  editor: ['patrol', 'rollback'],
  sysop: ['protect', 'delete', 'block', 'editprotected', 'undelete'],
  bureaucrat: ['userrights'],
  bot: ['bot'],
};

export function can(user, right, env = {}) {
  if (right === 'edit' && !user && String(env.ANON_EDITING) === 'false') return false;
  if (user && isBlocked(user) && ['edit', 'move', 'createpage', 'upload'].includes(right)) return false;
  const groups = effectiveGroups(user);
  return groups.some((g) => (RIGHTS[g] || []).includes(right));
}

export function isBlocked(user) {
  if (!user || user.blocked_until === null || user.blocked_until === undefined) return false;
  if (user.blocked_until === 0) return true; // indefinite
  return user.blocked_until > Math.floor(Date.now() / 1000);
}

export function canEditPage(user, page, env = {}) {
  const level = page?.protect_edit || '';
  if (!can(user, 'edit', env)) return { ok: false, reason: user && isBlocked(user) ? 'blocked' : 'anon-disabled' };
  if (!level) return { ok: true };
  const groups = effectiveGroups(user);
  if (level === 'sysop' && !groups.includes('sysop')) return { ok: false, reason: 'protected' };
  if (level === 'autoconfirmed' && !groups.includes('autoconfirmed')) return { ok: false, reason: 'semi' };
  if (level === 'extendedconfirmed' && !groups.includes('extendedconfirmed')) return { ok: false, reason: 'extended' };
  return { ok: true };
}

/** Wikipedia shows anonymous edits under the editor's IP. Same here. */
export function clientIp(request) {
  return request.headers.get('CF-Connecting-IP')
    || request.headers.get('X-Forwarded-For')?.split(',')[0].trim()
    || '127.0.0.1';
}
