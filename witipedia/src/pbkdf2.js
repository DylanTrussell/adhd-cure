/**
 * PBKDF2-SHA256 for iteration counts Cloudflare Workers will not run.
 *
 * Production WebCrypto rejects deriveBits above 100,000 iterations
 * (NotSupportedError). Seeded accounts were stored at 210,000, so those
 * hashes are recomputed here and then rewritten at the Workers maximum
 * on the next successful login. The function is synchronous and reuses
 * its buffers; do not await inside a caller while it is on the stack.
 */

const K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

const IV = new Int32Array([
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
  0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
]);

const W = new Int32Array(64);
const INNER = new Int32Array(8);
const OUTER = new Int32Array(8);
const STATE = new Int32Array(8);
const BLOCK = new Uint8Array(64);
const INNER_BYTES = new Uint8Array(32);
const FIRST = new Uint8Array(128);

function compress(H, w) {
  for (let i = 16; i < 64; i++) {
    const w15 = w[i - 15];
    const w2 = w[i - 2];
    const s0 = ((w15 >>> 7) | (w15 << 25)) ^ ((w15 >>> 18) | (w15 << 14)) ^ (w15 >>> 3);
    const s1 = ((w2 >>> 17) | (w2 << 15)) ^ ((w2 >>> 19) | (w2 << 13)) ^ (w2 >>> 10);
    w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
  }
  let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
  for (let i = 0; i < 64; i++) {
    const S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
    const ch = (e & f) ^ (~e & g);
    const t1 = (h + S1 + ch + K[i] + w[i]) | 0;
    const S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
    const maj = (a & b) ^ (a & c) ^ (b & c);
    h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + ((S0 + maj) | 0)) | 0;
  }
  H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
  H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
}

function loadBlock(bytes, offset) {
  for (let i = 0; i < 16; i++) {
    const o = offset + i * 4;
    W[i] = ((bytes[o] << 24) | (bytes[o + 1] << 16) | (bytes[o + 2] << 8) | bytes[o + 3]) | 0;
  }
}

function writeState(state, dest) {
  for (let i = 0; i < 8; i++) {
    const v = state[i];
    const o = i * 4;
    dest[o] = v >>> 24;
    dest[o + 1] = v >>> 16;
    dest[o + 2] = v >>> 8;
    dest[o + 3] = v;
  }
}

function hmacInto(msg, msgLen, dest) {
  if (msgLen > 55) throw new Error('PBKDF2 message does not fit in one block');
  STATE.set(INNER);
  BLOCK.fill(0);
  BLOCK.set(msg.subarray(0, msgLen));
  BLOCK[msgLen] = 0x80;
  const bits = (64 + msgLen) * 8;
  BLOCK[63] = bits;
  BLOCK[62] = bits >>> 8;
  BLOCK[61] = bits >>> 16;
  BLOCK[60] = bits >>> 24;
  loadBlock(BLOCK, 0);
  compress(STATE, W);
  writeState(STATE, INNER_BYTES);

  STATE.set(OUTER);
  BLOCK.fill(0);
  BLOCK.set(INNER_BYTES);
  BLOCK[32] = 0x80;
  // 96 bytes * 8 = 768 = 0x300
  BLOCK[62] = 0x03;
  loadBlock(BLOCK, 0);
  compress(STATE, W);
  writeState(STATE, dest);
}

/**
 * PBKDF2-HMAC-SHA256, 32-byte derived key (one block). `password` and `salt`
 * are Uint8Array. Iteration counts above a few hundred thousand are slow in
 * JavaScript; callers cap them.
 */
export function pbkdf2Sha256(password, salt, iterations) {
  let key = password;
  if (key.length > 64) key = sha256Blocks(key);

  const ipad = BLOCK;
  ipad.fill(0x36);
  for (let i = 0; i < key.length; i++) ipad[i] = key[i] ^ 0x36;
  INNER.set(IV);
  loadBlock(ipad, 0);
  compress(INNER, W);

  ipad.fill(0x5c);
  for (let i = 0; i < key.length; i++) ipad[i] = key[i] ^ 0x5c;
  OUTER.set(IV);
  loadBlock(ipad, 0);
  compress(OUTER, W);

  const firstLen = salt.length + 4;
  if (firstLen > FIRST.length) throw new Error('PBKDF2 salt is too long');
  FIRST.set(salt);
  FIRST[salt.length] = 0;
  FIRST[salt.length + 1] = 0;
  FIRST[salt.length + 2] = 0;
  FIRST[salt.length + 3] = 1;

  const u = new Uint8Array(32);
  const t = new Uint8Array(32);
  hmacInto(FIRST, firstLen, u);
  t.set(u);
  for (let i = 1; i < iterations; i++) {
    hmacInto(u, 32, u);
    for (let j = 0; j < 32; j++) t[j] ^= u[j];
  }
  return t;
}

/** SHA-256 for passwords longer than one block. Rare for a wiki password. */
function sha256Blocks(bytes) {
  STATE.set(IV);
  const blocks = Math.ceil((bytes.length + 9) / 64);
  const padded = new Uint8Array(blocks * 64);
  padded.set(bytes);
  padded[bytes.length] = 0x80;
  const bits = bytes.length * 8;
  const end = padded.length;
  padded[end - 4] = bits >>> 24;
  padded[end - 3] = bits >>> 16;
  padded[end - 2] = bits >>> 8;
  padded[end - 1] = bits;
  for (let off = 0; off < padded.length; off += 64) {
    loadBlock(padded, off);
    compress(STATE, W);
  }
  const out = new Uint8Array(32);
  writeState(STATE, out);
  return out;
}
