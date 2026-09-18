-- Witipedia schema. Mirrors the parts of MediaWiki that actually matter:
-- pages, immutable revisions, users with rights groups, logs, watchlists.

DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS watchlist;
DROP TABLE IF EXISTS logs;
DROP TABLE IF EXISTS revisions;
DROP TABLE IF EXISTS pages;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  username      TEXT NOT NULL UNIQUE,
  username_lc   TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  email         TEXT,
  created_at    INTEGER NOT NULL,
  edit_count    INTEGER NOT NULL DEFAULT 0,
  groups        TEXT NOT NULL DEFAULT '',      -- csv: sysop,bureaucrat,editor,bot
  blocked_until INTEGER,                        -- unix seconds, 0 = infinite
  block_reason  TEXT,
  blocked_by    TEXT
);

CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id),
  csrf       TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX sessions_user ON sessions(user_id);

CREATE TABLE pages (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  namespace       INTEGER NOT NULL DEFAULT 0,
  title           TEXT NOT NULL,               -- display title, no ns prefix
  page_key        TEXT NOT NULL UNIQUE,        -- "ns:Title_with_underscores"
  current_rev_id  INTEGER,
  is_redirect     INTEGER NOT NULL DEFAULT 0,
  redirect_target TEXT,
  protect_edit    TEXT NOT NULL DEFAULT '',    -- '' | autoconfirmed | sysop
  protect_move    TEXT NOT NULL DEFAULT '',
  created_at      INTEGER NOT NULL,
  touched_at      INTEGER NOT NULL,
  len             INTEGER NOT NULL DEFAULT 0,
  rating_helpful_up   INTEGER NOT NULL DEFAULT 0,
  rating_helpful_down INTEGER NOT NULL DEFAULT 0,
  rating_funny_up     INTEGER NOT NULL DEFAULT 0,
  rating_funny_down   INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX pages_ns_title ON pages(namespace, title);
CREATE INDEX pages_touched ON pages(touched_at DESC);

CREATE TABLE revisions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  page_id    INTEGER NOT NULL REFERENCES pages(id),
  parent_id  INTEGER,
  user_id    INTEGER,                          -- NULL for anonymous edits
  user_text  TEXT NOT NULL,                    -- username or IP
  comment    TEXT NOT NULL DEFAULT '',
  content    TEXT NOT NULL,
  len        INTEGER NOT NULL,
  is_minor   INTEGER NOT NULL DEFAULT 0,
  tags       TEXT NOT NULL DEFAULT '',         -- csv: new,rollback,undo,mobile
  created_at INTEGER NOT NULL
);
CREATE INDEX revisions_page ON revisions(page_id, created_at DESC);
CREATE INDEX revisions_user ON revisions(user_text, created_at DESC);
CREATE INDEX revisions_recent ON revisions(created_at DESC);

CREATE TABLE ratings (
  page_id    INTEGER NOT NULL REFERENCES pages(id),
  voter_key  TEXT NOT NULL,                    -- "u:12" or "ip:1.2.3.4"
  axis       TEXT NOT NULL,                    -- 'helpful' | 'funny'
  value      INTEGER NOT NULL,                 -- 1 | -1
  created_at INTEGER NOT NULL,
  PRIMARY KEY (page_id, voter_key, axis)
);

CREATE TABLE watchlist (
  user_id INTEGER NOT NULL REFERENCES users(id),
  page_id INTEGER NOT NULL REFERENCES pages(id),
  PRIMARY KEY (user_id, page_id)
);

CREATE TABLE logs (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  type       TEXT NOT NULL,                    -- newusers|block|protect|delete|move|rights
  action     TEXT NOT NULL,
  user_text  TEXT NOT NULL,
  target     TEXT NOT NULL DEFAULT '',
  comment    TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL
);
CREATE INDEX logs_recent ON logs(created_at DESC);
