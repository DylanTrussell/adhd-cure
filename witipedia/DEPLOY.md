# Deploying to Cloudflare

Runs on Workers + D1. Free tier is enough to start; D1 free allows 5 GB storage and
5 million row reads a day.

## 1. Install and log in

```bash
npm install
npx wrangler login
```

## 2. Create the database

```bash
npx wrangler d1 create witipedia
```

Copy the `database_id` it prints into `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "witipedia"
database_id = "paste-it-here"
```

## 3. Create the tables

```bash
npm run db:init          # remote
npm run db:init:local    # local dev copy
```

## 4. Seed the content and the admin account

```bash
ADMIN_PASSWORD='choose-a-real-password' npm run seed
```

Omit `ADMIN_PASSWORD` and one is generated and printed once. The account is `Admin`
(sysop + bureaucrat). Log in at `/wiki/Special:UserLogin` and change nothing else: the
rights ladder promotes everyone else automatically.

Seeding **wipes and replaces all content**. Run it once, at setup.

## 5. Deploy

```bash
npx wrangler deploy
```

You get a `*.workers.dev` URL immediately. Open it and check the main page.

## 6. Point your domain at it

In `wrangler.toml`:

```toml
[[routes]]
pattern = "yourdomain.example"
custom_domain = true
```

Then `npx wrangler deploy` again. The domain must be on the same Cloudflare account;
Wrangler creates the DNS record and the certificate. Add a second block for `www` if you
want it, or set a redirect rule in the dashboard.

## Settings

Set in `wrangler.toml` under `[vars]`:

| Variable | Default | Effect |
|---|---|---|
| `SITE_NAME` | `Witipedia` | Wordmark, `Project:` namespace, page titles |
| `SITE_TAGLINE` | `It's funny because it's true.` | Under the wordmark |
| `ANON_EDITING` | `true` | `false` requires an account to edit |

`SITE_NAME` must match what the seed was built with, or the project pages land in the wrong
namespace. To rename after seeding, re-run `SITE_NAME="New" npm run seed` (destructive) or
move the pages by hand from `Special:AllPages`.

## Passwords

New passwords are PBKDF2-SHA256 at 100,000 iterations, the highest count production
Workers will run. Accounts seeded at 210,000 still verify, in JavaScript, because
`crypto.subtle.deriveBits` throws above 100,000 and that throw was the live
error 1101. The next successful login rewrites the row at 100,000 iterations.

That one-time check is about 160ms of CPU. The Workers Paid default (30 seconds)
covers it. The free plan's 10ms limit may not, in which case set a new password
and write the hash directly:

```bash
cd witipedia
HASH=$(ADMIN_PASSWORD='choose-a-real-password' node --input-type=module -e 'import { hashPassword } from "./src/auth.js"; console.log(await hashPassword(process.env.ADMIN_PASSWORD));')
npx wrangler d1 execute witipedia --remote -y --command "UPDATE users SET password_hash = '$HASH' WHERE username_lc = 'admin'"
```

## File uploads

`wrangler.toml` binds R2 bucket `witipedia-media` as `MEDIA` and KV namespace
`witipedia-media` as `MEDIA_KV`. Uploads use R2 when `MEDIA` is bound. The KV
namespace is the fallback `storage.js` uses only if that binding is removed.

Both resources already exist on the account. To recreate them:

```bash
npx wrangler r2 bucket create witipedia-media
npx wrangler kv namespace create witipedia-media
npx wrangler d1 execute witipedia --remote -y --file=./migrations/0001-files.sql
```

Paste the KV namespace id into the `MEDIA_KV` binding, then `npx wrangler deploy`.
The `files` table is already on the live database; the migration is `CREATE TABLE IF NOT EXISTS`.

## Deploying automatically from GitHub (no terminal after this)

By default, getting new code or content live means running commands on your Mac. A GitHub Action
(`.github/workflows/witipedia-deploy.yml`, at the repo root) can do that for you instead: every
push to `witipedia/` deploys the Worker and pushes any new pages, with no terminal step. Content
pushed this way never overwrites a page that already exists, so it is safe even once real people
are editing the live site.

Three secrets, set once.

1. **A Cloudflare API token.** dash.cloudflare.com &rarr; the account icon (top right) &rarr;
   **My Profile** &rarr; **API Tokens** &rarr; **Create Token** &rarr; use the **Edit Cloudflare
   Workers** template, scoped to your account. Copy the token; Cloudflare shows it once.
2. **Your account ID.** Printed by `npx wrangler whoami`, or on the right-hand side of any zone's
   Overview page in the dashboard.
3. **A content-import token.** Any long random string you make up yourself, for example the
   output of `openssl rand -hex 32`. This one is not a Cloudflare credential; it just has to match
   between the Worker and GitHub. Set it on the live Worker with:

   ```bash
   npx wrangler secret put SEED_IMPORT_TOKEN
   # paste the same random string when it prompts
   ```

Then, on GitHub: the repo's **Settings** &rarr; **Secrets and variables** &rarr; **Actions** &rarr;
**New repository secret**, three times:

| Secret name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | from step 1 |
| `CLOUDFLARE_ACCOUNT_ID` | from step 2 |
| `SEED_IMPORT_TOKEN` | from step 3, exactly as you set it on the Worker |

That's it. The next push to `witipedia/` runs the Action: `wrangler deploy`, then
`node tools/push-content.mjs` against the live domain. Check progress under the repo's **Actions**
tab. Skip the third secret if you would rather content stay a manual step; the Action still
deploys code changes automatically either way.

To push a new content batch by hand instead of waiting for CI:

```bash
SEED_IMPORT_TOKEN=your-random-string node tools/push-content.mjs
```

## Backups

```bash
npx wrangler d1 export witipedia --remote --output backup-$(date +%F).sql
```

Worth a weekly cron. Deletion is permanent in this build, so the backup is the undelete.

## Operating notes

- **Vandalism**: `Special:RecentChanges` is the patrol queue. Rollback needs an
  autoconfirmed account. Protect with `?action=protect`, block at `Special:Block`.
- **Growth**: search is `LIKE`-based. Past roughly 10,000 articles, move it to D1 FTS5 or
  Cloudflare Vectorize; nothing else in the schema needs to change.
- **Cost**: reads dominate. If traffic spikes, cache article HTML for anonymous readers at
  the edge with a short TTL and purge on save.
