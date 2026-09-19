-- Adds file uploads to a wiki that is already running.
-- Apply with:
--   npx wrangler d1 execute witipedia --remote -y --file=./migrations/0001-files.sql
CREATE TABLE IF NOT EXISTS files (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL UNIQUE,
  r2_key      TEXT NOT NULL,
  mime        TEXT NOT NULL,
  size        INTEGER NOT NULL,
  width       INTEGER NOT NULL DEFAULT 0,
  height      INTEGER NOT NULL DEFAULT 0,
  sha1        TEXT NOT NULL,
  uploader    TEXT NOT NULL,
  uploaded_at INTEGER NOT NULL,
  source      TEXT,
  author      TEXT,
  license     TEXT,
  license_url TEXT
);
CREATE INDEX IF NOT EXISTS files_uploaded ON files(uploaded_at DESC);
