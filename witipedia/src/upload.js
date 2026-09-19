/**
 * File uploads: validation, dimension sniffing, and R2 storage.
 *
 * Images are stored in R2 under a content hash, so re-uploading the same bytes
 * costs nothing and a file rename never breaks an existing article.
 */

export const MAX_BYTES = 10 * 1024 * 1024;

export const ALLOWED = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
};
// SVG is deliberately absent: it is a script-bearing document, not a picture.

export const LICENSES = [
  ['cc-by-sa-4.0', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'],
  ['cc-by-4.0', 'CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/'],
  ['cc-by-sa-3.0', 'CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'],
  ['cc-by-3.0', 'CC BY 3.0', 'https://creativecommons.org/licenses/by/3.0/'],
  ['cc0', 'CC0 (public domain dedication)', 'https://creativecommons.org/publicdomain/zero/1.0/'],
  ['pd', 'Public domain', 'https://en.wikipedia.org/wiki/Public_domain'],
  ['own-cc-by-sa-4.0', 'My own work, released as CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'],
];

export function licenseInfo(id) {
  const row = LICENSES.find((l) => l[0] === id);
  return row ? { id: row[0], name: row[1], url: row[2] } : null;
}

/** Magic-number check: the declared type has to match the actual bytes. */
export function sniffType(bytes) {
  const b = bytes;
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
  if (b.length > 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47
    && b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a) return 'image/png';
  if (b.length > 6 && b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38) return 'image/gif';
  if (b.length > 12 && b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46
    && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) return 'image/webp';
  return null;
}

/** Pixel dimensions from the file header, so pages can reserve the right box. */
export function imageSize(bytes) {
  const b = bytes;
  const type = sniffType(b);
  const be16 = (i) => (b[i] << 8) | b[i + 1];
  const be32 = (i) => ((b[i] << 24) | (b[i + 1] << 16) | (b[i + 2] << 8) | b[i + 3]) >>> 0;
  const le16 = (i) => b[i] | (b[i + 1] << 8);
  const le32 = (i) => (b[i] | (b[i + 1] << 8) | (b[i + 2] << 16) | (b[i + 3] << 24)) >>> 0;

  if (type === 'image/png') return { width: be32(16), height: be32(20) };
  if (type === 'image/gif') return { width: le16(6), height: le16(8) };

  if (type === 'image/jpeg') {
    let i = 2;
    while (i < b.length - 9) {
      if (b[i] !== 0xff) { i++; continue; }
      const marker = b[i + 1];
      // SOF0..SOF15, skipping the four that are not frame headers
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc, 0xd8].includes(marker)) {
        return { height: be16(i + 5), width: be16(i + 7) };
      }
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
      const len = be16(i + 2);
      if (!len) break;
      i += 2 + len;
    }
    return { width: 0, height: 0 };
  }

  if (type === 'image/webp') {
    const fourcc = String.fromCharCode(b[12], b[13], b[14], b[15]);
    if (fourcc === 'VP8X') return { width: (b[24] | (b[25] << 8) | (b[26] << 16)) + 1, height: (b[27] | (b[28] << 8) | (b[29] << 16)) + 1 };
    if (fourcc === 'VP8 ') return { width: le16(26) & 0x3fff, height: le16(28) & 0x3fff };
    if (fourcc === 'VP8L') {
      const bits = le32(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    return { width: 0, height: 0 };
  }
  return { width: 0, height: 0 };
}

export async function sha1Hex(buffer) {
  const digest = await crypto.subtle.digest('SHA-1', buffer);
  return [...new Uint8Array(digest)].map((x) => x.toString(16).padStart(2, '0')).join('');
}

/** "my photo.JPG" -> "My photo.jpg", the way MediaWiki normalises file titles. */
export function normalizeFileName(raw, ext) {
  let s = String(raw || '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  s = s.replace(/\.(jpe?g|png|gif|webp)$/i, '');
  s = s.replace(/[\\/:*?"<>|#{}[\]]/g, '').trim();
  if (!s) return null;
  s = s.charAt(0).toUpperCase() + s.slice(1);
  // Stored with underscores, like MediaWiki, so the row key and the page key agree.
  return `${s.slice(0, 120).replace(/ /g, '_')}.${ext}`;
}

export function humanSize(bytes) {
  if (bytes < 1024) return `${bytes} bytes`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Validates and stores one upload. Returns the row to insert, or an error
 * string suitable for showing to the person who tried.
 */
export async function storeUpload(env, { file, name, uploader, license, source, author }) {
  if (!env.MEDIA) return { error: 'File storage is not configured on this site yet. An administrator needs to create the R2 bucket.' };
  if (!file || typeof file.arrayBuffer !== 'function') return { error: 'No file was attached.' };
  if (file.size > MAX_BYTES) return { error: `That file is ${humanSize(file.size)}. The limit is ${humanSize(MAX_BYTES)}.` };
  if (file.size === 0) return { error: 'That file is empty.' };

  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const mime = sniffType(bytes);
  if (!mime) return { error: 'That is not a JPEG, PNG, GIF or WebP image. Those are the four types this wiki accepts.' };

  const lic = licenseInfo(license);
  if (!lic) return { error: 'Choose a licence. Every file here needs one, the same as on Wikipedia.' };
  if (!String(author || '').trim()) return { error: 'Name the author. "Own work" is fine if you took it.' };

  const ext = ALLOWED[mime];
  const finalName = normalizeFileName(name || file.name, ext);
  if (!finalName) return { error: 'Give the file a name.' };

  const sha1 = await sha1Hex(buffer);
  const { width, height } = imageSize(bytes);
  const key = `${sha1.slice(0, 2)}/${sha1}.${ext}`;

  await env.MEDIA.put(key, buffer, {
    httpMetadata: { contentType: mime, cacheControl: 'public, max-age=31536000, immutable' },
  });

  return {
    row: {
      name: finalName, r2_key: key, mime, size: file.size, width, height, sha1,
      uploader, source: String(source || '').slice(0, 500),
      author: String(author || '').slice(0, 200),
      license: lic.id, license_url: lic.url, license_name: lic.name,
    },
  };
}
