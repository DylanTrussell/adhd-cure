/**
 * Where uploaded bytes live.
 *
 * R2 is the right store for images and is used when it is bound. Some accounts
 * do not have R2 switched on, so KV is supported as a fallback: values up to
 * 25 MB, which covers every image this wiki accepts. If neither binding is
 * present the wiki runs normally with uploads switched off.
 */

export function storageKind(env) {
  if (env.MEDIA) return 'r2';
  if (env.MEDIA_KV) return 'kv';
  return null;
}

export function hasStorage(env) {
  return storageKind(env) !== null;
}

export async function putObject(env, key, buffer, contentType) {
  const kind = storageKind(env);
  if (kind === 'r2') {
    await env.MEDIA.put(key, buffer, {
      httpMetadata: { contentType, cacheControl: 'public, max-age=31536000, immutable' },
    });
    return true;
  }
  if (kind === 'kv') {
    await env.MEDIA_KV.put(key, buffer, { metadata: { contentType } });
    return true;
  }
  return false;
}

/** Returns something Response can take as a body, or null. */
export async function getObject(env, key) {
  const kind = storageKind(env);
  if (kind === 'r2') {
    const object = await env.MEDIA.get(key);
    return object ? { body: object.body } : null;
  }
  if (kind === 'kv') {
    const value = await env.MEDIA_KV.get(key, 'arrayBuffer');
    return value ? { body: value } : null;
  }
  return null;
}

export async function deleteObject(env, key) {
  const kind = storageKind(env);
  if (kind === 'r2') await env.MEDIA.delete(key);
  else if (kind === 'kv') await env.MEDIA_KV.delete(key);
}
