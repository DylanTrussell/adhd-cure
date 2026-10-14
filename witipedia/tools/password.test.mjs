#!/usr/bin/env node
/**
 * Password hashing, including the production Workers limit.
 *
 * Cloudflare's production runtime rejects PBKDF2 above 100,000 iterations.
 * Local workerd does not, so this test installs that ceiling itself and checks
 * that a hash stored at the old 210,000 iterations still verifies.
 */
import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { hashPassword, verifyPassword, passwordNeedsRehash, PBKDF2_ITERATIONS } from '../src/auth.js';

let failed = 0;
function check(name, cond, detail = '') {
  if (cond) console.log(`  ok   ${name}`);
  else { failed++; console.log(`  FAIL ${name}${detail ? ` -- ${detail}` : ''}`); }
}

function storedHash(password, salt, iterations) {
  const bits = pbkdf2Sync(password, salt, iterations, 32, 'sha256');
  return `pbkdf2:${iterations}:${Buffer.from(salt).toString('base64')}:${bits.toString('base64')}`;
}

const realDeriveBits = crypto.subtle.deriveBits.bind(crypto.subtle);
const deriveCalls = [];
crypto.subtle.deriveBits = async (algorithm, key, length) => {
  deriveCalls.push(algorithm.iterations);
  if (algorithm?.iterations > PBKDF2_ITERATIONS) {
    throw new DOMException(
      `PBKDF2 iteration counts above ${PBKDF2_ITERATIONS} are not supported`,
      'NotSupportedError',
    );
  }
  return realDeriveBits(algorithm, key, length);
};

const password = 'hunter2hunter2';
const salt = randomBytes(16);
const legacy = storedHash(password, salt, 210_000);

console.log('\nLegacy hashes (210,000 iterations, the seeded accounts)');
deriveCalls.length = 0;
const t0 = performance.now();
check('legacy hash verifies', await verifyPassword(password, legacy));
check('wrong password does not', !(await verifyPassword('hunter2hunter3', legacy)));
check('legacy check does not call deriveBits', deriveCalls.length === 0, `calls ${deriveCalls.join(',')}`);
check('legacy hash is marked for upgrade', passwordNeedsRehash(legacy));
const legacyMs = Math.round(performance.now() - t0);
console.log(`  ..   legacy verify ${legacyMs}ms`);
check('legacy verify stays under a second', legacyMs < 1000, `${legacyMs}ms`);

console.log('\nNew hashes (Workers maximum)');
deriveCalls.length = 0;
const t1 = performance.now();
const fresh = await hashPassword(password);
const freshMs = Math.round(performance.now() - t1);
console.log(`  ..   new hash ${freshMs}ms`);
check('new hash uses 100,000 iterations', fresh.startsWith('pbkdf2:100000:'), fresh.split(':').slice(0, 2).join(':'));
check('new hash stays inside the iteration cap', deriveCalls.every((n) => n <= PBKDF2_ITERATIONS), deriveCalls.join(','));
check('new hash verifies', await verifyPassword(password, fresh));
check('new hash does not need an upgrade', !passwordNeedsRehash(fresh));
check('new hash finishes quickly', freshMs < 100, `${freshMs}ms`);

const upgraded = await hashPassword(password, legacy.split(':')[2]);
check('rehash of the same salt still verifies', await verifyPassword(password, upgraded));
check('rehash is at the current count', upgraded.startsWith('pbkdf2:100000:'));

check('garbage hash is rejected', !(await verifyPassword(password, 'nope')));
check('absurd iteration count is rejected', !(await verifyPassword(password, 'pbkdf2:9000000:YQ==:YQ==')));

const longPassword = 'p'.repeat(80);
const longStored = storedHash(longPassword, salt, 100_001);
check('long password at the legacy count verifies', await verifyPassword(longPassword, longStored));

console.log(failed ? `\n${failed} failed\n` : '\npassword checks passed\n');
process.exit(failed ? 1 : 0);
