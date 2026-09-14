#!/usr/bin/env bash
# Pull an account's short-form videos and produce one transcript per post.
#
#   ./pull_reels.sh <profile-url-or-@handle> [workdir] [max-posts]
#
# Output:
#   <workdir>/video/        downloaded media (delete when done, it is large)
#   <workdir>/transcripts/  <shortcode>.txt  and  <shortcode>.info.json
#   <workdir>/manifest.tsv  shortcode, date, url, caption first line
#
# Needs: yt-dlp. Optional: ffmpeg + whisper (local fallback when no captions exist).
# Instagram requires a logged-in session. Set IG_BROWSER to the browser you are
# logged into (default: chrome), or export cookies to <workdir>/cookies.txt.

set -euo pipefail

TARGET="${1:-}"
WORKDIR="${2:-./ai-seo-corpus}"
MAX="${3:-0}"
IG_BROWSER="${IG_BROWSER:-chrome}"

if [[ -z "$TARGET" ]]; then
  echo "usage: $0 <profile-url-or-@handle> [workdir] [max-posts]" >&2
  exit 2
fi

if ! command -v yt-dlp >/dev/null 2>&1; then
  cat >&2 <<'EOF'
yt-dlp not found. Install one of:
  pipx install yt-dlp
  brew install yt-dlp
  python3 -m pip install --user -U yt-dlp
EOF
  exit 127
fi

# @handle -> profile URL. Strip any ?stkn= share token, it is single use.
case "$TARGET" in
  @*)      URL="https://www.instagram.com/${TARGET#@}/" ;;
  http*)   URL="${TARGET%%\?*}/" ;;
  *)       URL="https://www.instagram.com/${TARGET}/" ;;
esac
URL="${URL%//}/"

mkdir -p "$WORKDIR/video" "$WORKDIR/transcripts"

AUTH=()
if [[ -f "$WORKDIR/cookies.txt" ]]; then
  AUTH=(--cookies "$WORKDIR/cookies.txt")
  echo "auth: cookies.txt"
else
  AUTH=(--cookies-from-browser "$IG_BROWSER")
  echo "auth: $IG_BROWSER profile (set IG_BROWSER, or drop cookies.txt in $WORKDIR)"
fi

LIMIT=()
[[ "$MAX" != "0" ]] && LIMIT=(--playlist-end "$MAX")

echo "pulling: $URL -> $WORKDIR"

# Sleep between requests. Instagram rate limits hard and a ban costs more than time.
if ! yt-dlp "${AUTH[@]}" "${LIMIT[@]}" \
    --write-info-json --write-auto-subs --write-subs --sub-langs "en.*" \
    --convert-subs srt \
    --sleep-requests 3 --min-sleep-interval 4 --max-sleep-interval 9 \
    --retries 5 --ignore-errors \
    -o "$WORKDIR/video/%(id)s.%(ext)s" \
    "$URL"; then
  cat >&2 <<'EOF'

Pull failed or was partial. In order of likelihood:

1. Not logged in in that browser. Set IG_BROWSER=firefox|safari|edge|brave and retry.
2. Cookies locked by a running browser (Chrome on macOS does this). Quit the browser,
   or export cookies with a Netscape-format extension to <workdir>/cookies.txt.
3. Rate limited. Wait an hour, then retry with a max-posts of 20 and let it resume.

Do not switch to a scraping service to get around this.
EOF
  exit 1
fi

# Transcripts: prefer the platform's own captions, fall back to local whisper.
: > "$WORKDIR/manifest.tsv"
printf 'shortcode\tdate\turl\tcaption\n' >> "$WORKDIR/manifest.tsv"

shopt -s nullglob
for info in "$WORKDIR"/video/*.info.json; do
  id="$(basename "$info" .info.json)"
  out="$WORKDIR/transcripts/$id.txt"
  cp "$info" "$WORKDIR/transcripts/$id.info.json"

  srt="$(ls "$WORKDIR"/video/"$id".*.srt 2>/dev/null | head -n1 || true)"
  if [[ -n "$srt" ]]; then
    # strip indices, timestamps and blank lines
    sed -e '/^[0-9]\+$/d' -e '/-->/d' -e '/^[[:space:]]*$/d' "$srt" > "$out"
  elif command -v whisper >/dev/null 2>&1; then
    media="$(ls "$WORKDIR"/video/"$id".mp4 "$WORKDIR"/video/"$id".webm 2>/dev/null | head -n1 || true)"
    if [[ -n "$media" ]]; then
      echo "transcribing $id"
      whisper "$media" --model small --language en --output_format txt \
        --output_dir "$WORKDIR/transcripts" >/dev/null 2>&1 || true
    fi
  else
    echo "no captions for $id and whisper not installed" >&2
  fi

  python3 - "$info" "$WORKDIR/manifest.tsv" <<'PY'
import json, sys
info, manifest = sys.argv[1], sys.argv[2]
d = json.load(open(info))
cap = (d.get("description") or "").splitlines()
cap = cap[0][:200] if cap else ""
row = [d.get("id",""), str(d.get("upload_date","")), d.get("webpage_url",""), cap]
open(manifest, "a").write("\t".join(c.replace("\t"," ") for c in row) + "\n")
PY
done

n=$(find "$WORKDIR/transcripts" -name '*.txt' | wc -l | tr -d ' ')
echo
echo "$n transcripts in $WORKDIR/transcripts"
echo "manifest: $WORKDIR/manifest.tsv"
echo
echo "next: point Claude at $WORKDIR and say 'ingest these into the ai-seo playbook'"
echo "then delete $WORKDIR/video to reclaim the disk"
