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
npx wrangler d1 create wittypedia
```

Copy the `database_id` it prints into `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "wittypedia"
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
| `SITE_NAME` | `Wittypedia` | Wordmark, `Project:` namespace, page titles |
| `SITE_TAGLINE` | `It's funny because it's true.` | Under the wordmark |
| `ANON_EDITING` | `true` | `false` requires an account to edit |

`SITE_NAME` must match what the seed was built with, or the project pages land in the wrong
namespace. To rename after seeding, re-run `SITE_NAME="New" npm run seed` (destructive) or
move the pages by hand from `Special:AllPages`.

## Backups

```bash
npx wrangler d1 export wittypedia --remote --output backup-$(date +%F).sql
```

Worth a weekly cron. Deletion is permanent in this build, so the backup is the undelete.

## Operating notes

- **Vandalism**: `Special:RecentChanges` is the patrol queue. Rollback needs an
  autoconfirmed account. Protect with `?action=protect`, block at `Special:Block`.
- **Growth**: search is `LIKE`-based. Past roughly 10,000 articles, move it to D1 FTS5 or
  Cloudflare Vectorize; nothing else in the schema needs to change.
- **Cost**: reads dominate. If traffic spikes, cache article HTML for anonymous readers at
  the edge with a short TTL and purge on save.
