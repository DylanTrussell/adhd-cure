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

## Adding file uploads to a wiki that is already live

```bash
git pull --autostash
bash setup.sh          # creates the R2 bucket, applies migrations, redeploys
```

`setup.sh` is safe to re-run: it reuses the existing database, asks before touching content, and
if R2 is unavailable on the account it leaves uploads switched off rather than breaking the deploy.

To do it by hand instead:

```bash
npx wrangler r2 bucket create witipedia-media
npx wrangler d1 execute witipedia --remote -y --file=./migrations/0001-files.sql
# uncomment the [[r2_buckets]] block in wrangler.toml
npx wrangler deploy
```

R2 has to be enabled on the account first, at dash.cloudflare.com under R2. The free tier covers
10 GB, which is a few thousand photographs.

If R2 is not available on the account, `setup.sh` creates a KV namespace and uses that instead.
KV holds values up to 25 MB, so every image this wiki accepts fits. R2 is cheaper per gigabyte and
better suited to media, so switch over later if you turn R2 on: create the bucket, swap the
commented blocks in `wrangler.toml`, and re-upload.

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
