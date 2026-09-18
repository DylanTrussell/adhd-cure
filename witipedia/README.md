# Witipedia

A working encyclopedia, built to behave exactly like Wikipedia, with one rule changed:
**the humour stays, and the facts still have to hold.**

Tagline: *It's funny because it's true.*

The premise: the funniest things in the world are true, and a lot of them get deleted
every day by editors enforcing tone. Everything that makes Wikipedia trustworthy is kept
here on purpose; the only difference is a humour guideline that says wit is welcome and
inaccuracy is not.

## What is built

**Identical to Wikipedia**

| | |
|---|---|
| Editing | Anyone, logged in or not. Anonymous edits are attributed to the editor's IP address |
| Wikitext | Headings, `'''bold'''`, `''italic''`, `[[links]]` with red links and link trails, pipe trick, lists, tables, `<ref>` footnotes with named reuse, infoboxes, templates, magic words (`__NOTOC__`), `<nowiki>`, categories, redirects, interwiki `[[w:X]]` |
| Namespaces | Main, Talk, User, User talk, Project, Project talk, Template, Help, Category, Special |
| Revisions | Every version kept forever, with parent links, byte deltas, minor flags and tags |
| Diffs | Two-column MediaWiki-style diff with word-level highlighting |
| History | Per page, with restore and rollback |
| Talk pages | With `~~~~` signature expansion at save time |
| Section editing | `?action=edit&section=N`, spliced back on save |
| Preview | Full render before saving, plus "show changes" |
| Accounts | PBKDF2-SHA256 (210k iterations), sessions as hashed tokens, CSRF tokens |
| Rights ladder | Autoconfirmed at 4 days + 10 edits, extended confirmed at 30 days + 500 edits, plus editor / sysop / bureaucrat |
| Protection | None / autoconfirmed / extended confirmed / sysop, enforced on save as well as in the UI |
| Admin actions | Protect, delete, move (leaves a redirect), block, grant user rights, all logged |
| Watchlists | Star a page, filter recent changes to what you watch |
| Special pages | RecentChanges, NewPages, AllPages, Random, Search, TopRated, Statistics, ListUsers, Log, ShortPages, WantedPages, WhatLinksHere, PageInfo, Contributions, Watchlist, SpecialPages |
| Search | Title and full-text, with live suggestions in the header |
| Skin | Vector-2022-style layout, dark mode, mobile layout |

**The one difference**

Two independent ratings per article: **was this helpful** and **was this funny**, each with
a thumbs up and a visible thumbs down. They are separate because an article can be useless
and hilarious, or accurate and flat, and the editors need to know which problem they have.
One vote per person per question (account, or IP when logged out); clicking the same thumb
again clears your vote. [Special:TopRated](/wiki/Special:TopRated) ranks by the Wilson lower
bound, so nine out of ten beats one out of one.

Site-specific maintenance templates: `{{unfunny}}`, `{{unverified joke}}`, `{{jn}}` (joke
needed), `{{true and funny|source=}}` (the funny claim was fact-checked and held).

## Run it locally

No Cloudflare account needed.

```bash
npm install
npm run seed:build          # writes seed.sql (prints the Admin password once)
node tools/devserver.mjs    # http://localhost:8787/wiki/Main_Page
npm test                    # 68 end-to-end checks against the running server
```

The dev server runs the real Worker code against a local SQLite file through a small
D1-compatible shim, so what you see locally is what deploys.

## Deploy to Cloudflare

See [DEPLOY.md](DEPLOY.md). Short version:

```bash
npx wrangler d1 create witipedia     # put the returned id in wrangler.toml
npm run db:init                       # schema
npm run seed                          # content + accounts
npx wrangler deploy
```

## Rename the site

The name lives in one place. Change `SITE_NAME` in `wrangler.toml` (and pass the same value
to the seed builder so the project namespace matches):

```bash
SITE_NAME="YourName" npm run seed:build
```

Everything follows: the wordmark, the `Project:` namespace, page titles, policy text.

## Layout

```
src/
  index.js      router: pages, actions, special pages, API
  wikitext.js   wikitext -> HTML, title parsing, sections, signatures
  views.js      article, editor, history, diff, auth forms
  special.js    special pages
  skin.js       header, sidebar, tabs, footer, logo
  styles.js     the stylesheet
  db.js         queries, revisions, ratings, Wilson score
  auth.js       passwords, sessions, rights model
  diff.js       LCS diff, MediaWiki two-column rendering
tools/
  build-seed.mjs   generates seed.sql
  seed/            the seeded articles and policy pages
  devserver.mjs    local server (node:sqlite D1 shim)
  test.mjs         end-to-end tests
```

## Not built yet

File uploads, undelete (deletion is permanent), email password recovery, edit-conflict
merging (last save wins), rate limiting, categories as browsable listing pages, and a real
full-text index (search is `LIKE`-based, which is fine to roughly the 10,000-article mark).

## On the name

Witipedia, at witipedia.co. The name and the logo are its own; everything else about how
the site works is Wikipedia's, deliberately. That distinction is what keeps the domain:
copying the workflow is fair game, copying the wordmark on a near-miss domain is trademark
infringement against the Wikimedia Foundation.

MediaWiki's interface conventions are reimplemented here, not copied: no MediaWiki code or
assets are included. Text content is CC BY-SA 4.0.
