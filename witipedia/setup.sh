#!/usr/bin/env bash
# One-command setup: installs, creates the D1 database, loads the schema and
# content, deploys, and optionally attaches your domain.
#
#   bash setup.sh
#
# Safe to re-run. It reuses an existing database instead of making a second one,
# and it will not reload the content over a wiki that already has edits.

set -euo pipefail
cd "$(dirname "$0")"

DB_NAME="witipedia"
bold() { printf '\033[1m%s\033[0m\n' "$1"; }
step() { printf '\n\033[1;34m==>\033[0m \033[1m%s\033[0m\n' "$1"; }
warn() { printf '\033[33m! %s\033[0m\n' "$1"; }
die()  { printf '\033[31mx %s\033[0m\n' "$1" >&2; exit 1; }

command -v node >/dev/null || die "Node.js is not installed. Get it from https://nodejs.org (LTS), then run this again."
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
[ "$NODE_MAJOR" -ge 18 ] || die "Node 18 or newer is required; you have $(node -v)."

step "1/7  Installing dependencies"
npm install --no-audit --no-fund

step "2/7  Checking your Cloudflare login"
if npx --no-install wrangler whoami >/dev/null 2>&1; then
  npx --no-install wrangler whoami | sed -n '1,6p'
else
  bold "A browser window will open. Approve the Wrangler login, then come back here."
  npx --no-install wrangler login
fi

step "3/7  Finding or creating the D1 database"
DB_ID="$(npx --no-install wrangler d1 list --json 2>/dev/null \
  | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const clean=s.replace(/\x1b\[[0-9;]*m/g,"");const i=clean.search(/^\s*\[/m);const l=JSON.parse(clean.slice(i));const m=l.find(d=>d.name===process.argv[1]);process.stdout.write(m?(m.uuid||m.id||""):"")}catch(e){}})' "$DB_NAME" || true)"

if [ -n "$DB_ID" ]; then
  echo "Reusing the existing database \"$DB_NAME\" ($DB_ID)."
else
  echo "Creating \"$DB_NAME\"..."
  npx --no-install wrangler d1 create "$DB_NAME" >/dev/null
  sleep 2
  DB_ID="$(npx --no-install wrangler d1 list --json 2>/dev/null \
    | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const clean=s.replace(/\x1b\[[0-9;]*m/g,"");const i=clean.search(/^\s*\[/m);const l=JSON.parse(clean.slice(i));const m=l.find(d=>d.name===process.argv[1]);process.stdout.write(m?(m.uuid||m.id||""):"")}catch(e){}})' "$DB_NAME" || true)"
  [ -n "$DB_ID" ] || die "Created the database but could not read its id. Run: npx wrangler d1 list --json"
  echo "Created ($DB_ID)."
fi

step "4/7  Writing the database id into wrangler.toml"
node -e '
  const fs = require("fs");
  const f = "wrangler.toml";
  const before = fs.readFileSync(f, "utf8");
  const after = before.replace(/^database_id\s*=\s*".*"$/m, `database_id = "${process.argv[1]}"`);
  if (before !== after) fs.writeFileSync(f, after);
  console.log(after.match(/^database_id.*$/m)[0]);
' "$DB_ID"

step "5/7  Creating the tables"
EXISTING="$(npx --no-install wrangler d1 execute "$DB_NAME" --remote -y --json \
  --command "SELECT COUNT(*) AS n FROM revisions" 2>/dev/null | grep -o '"n":[0-9]*' | head -1 | cut -d: -f2 || true)"

case "${EXISTING:-}" in ''|*[!0-9]*) EXISTING=0 ;; esac
if [ "$EXISTING" -gt 0 ]; then
  warn "This database already holds $EXISTING revisions."
  printf "Wipe it and reload the starter content? Everything written so far is lost. [y/N] "
  read -r WIPE </dev/tty
  case "$WIPE" in
    [yY]*) ;;
    *) echo "Keeping your data. Skipping steps 5 and 6."; SKIP_LOAD=1 ;;
  esac
fi

if [ -z "${SKIP_LOAD:-}" ]; then
  npx --no-install wrangler d1 execute "$DB_NAME" --remote -y --file=./schema.sql

  step "6/7  Loading the articles, policies and admin account"
  printf "Choose a password for the Admin account (at least 8 characters, hidden as you type): "
  read -rs ADMIN_PW </dev/tty; echo
  if [ "${#ADMIN_PW}" -lt 8 ]; then
    warn "Too short. Generating one instead."
    ADMIN_PW="$(node -e 'console.log(require("crypto").randomBytes(9).toString("base64url"))')"
    bold "Admin password: $ADMIN_PW   <- write this down now"
  fi
  ADMIN_PASSWORD="$ADMIN_PW" node tools/build-seed.mjs >/dev/null
  npx --no-install wrangler d1 execute "$DB_NAME" --remote -y --file=./seed.sql
  echo "Content loaded. Log in as Admin with the password you just set."
else
  step "6/7  Skipped (existing content kept)"
fi

step "7/7  Deploying"
DEPLOY_OUT="$(npx --no-install wrangler deploy 2>&1 | tee /dev/tty)"
URL="$(printf '%s' "$DEPLOY_OUT" | grep -oE 'https://[a-z0-9.-]+\.workers\.dev' | head -1 || true)"

printf '\n'
bold "Done."
[ -n "$URL" ] && bold "Your wiki is live at: $URL/wiki/Main_Page"

if ! grep -q '^\[\[routes\]\]' wrangler.toml; then
  printf '\nAttach your own domain now? It must already be in this Cloudflare account. [y/N] '
  read -r WANT_DOMAIN </dev/tty
  case "$WANT_DOMAIN" in
    [yY]*)
      printf 'Domain (e.g. witipedia.co): '
      read -r DOMAIN </dev/tty
      [ -n "$DOMAIN" ] || die "No domain given."
      cat >> wrangler.toml <<EOF

[[routes]]
pattern = "$DOMAIN"
custom_domain = true
EOF
      step "Re-deploying with $DOMAIN attached"
      if npx --no-install wrangler deploy; then
        bold "Live at https://$DOMAIN/wiki/Main_Page (the certificate can take a few minutes)."
      else
        warn "That failed, so the domain is probably not in this Cloudflare account."
        warn "Removed the route again; your workers.dev URL still works."
        node -e '
          const fs=require("fs");const f="wrangler.toml";
          fs.writeFileSync(f, fs.readFileSync(f,"utf8").replace(/\n*^\[\[routes\]\][\s\S]*$/m, "\n"));
        '
      fi
      ;;
  esac
fi
