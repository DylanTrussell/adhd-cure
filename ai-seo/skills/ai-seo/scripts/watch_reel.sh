#!/usr/bin/env bash
# Turn one video into something Claude can actually look at.
#
#   ./watch_reel.sh <video-file> [outdir] [target-frames]
#
# Output in <outdir>/:
#   sheet-01.jpg ...   contact sheets, GRID tiles each, timestamp burned in
#   frames/NNN.jpg     full-resolution frames, for when the sheet is too small to read
#   audio.m4a          stripped audio
#   ocr.txt            on-screen text per frame (only if tesseract is installed)
#   index.tsv          frame number -> timestamp
#
# Needs: ffmpeg (ffprobe used when present). Optional: tesseract (on-screen text), whisper (speech).
# Env: GRID=3x4 (default) or GRID=2x3 for larger, more readable tiles.
#
# Why frames and not the video: Claude reads images, not video streams. For a reel,
# frames plus audio is close to watching, and the on-screen text carries most of the
# content, which is why the OCR pass matters more than it looks.

set -euo pipefail

SRC="${1:-}"
OUT="${2:-}"
TARGET="${3:-24}"
# Tiles per sheet. 3x4 fits a whole short reel on one image. Drop to 2x3 when the
# captions are small: fewer frames per sheet, but each tile is 540px wide instead
# of 360px, which is the difference between reading the overlay and guessing at it.
GRID="${GRID:-3x4}"

if [[ -z "$SRC" || ! -f "$SRC" ]]; then
  echo "usage: $0 <video-file> [outdir] [target-frames]" >&2
  exit 2
fi

command -v ffmpeg >/dev/null 2>&1 || {
  echo "ffmpeg not found (brew install ffmpeg / apt install ffmpeg)" >&2; exit 127; }

base="$(basename "${SRC%.*}")"
OUT="${OUT:-$(dirname "$SRC")/watch/$base}"
mkdir -p "$OUT/frames"

# Duration via ffprobe, falling back to parsing ffmpeg's own banner. Some installs
# ship ffmpeg without ffprobe (pip wheels, trimmed container images).
dur=""
if command -v ffprobe >/dev/null 2>&1; then
  dur="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC" 2>/dev/null || true)"
fi
if [[ -z "$dur" || "$dur" == "N/A" ]]; then
  # ffmpeg exits nonzero when probing with no output file, hence the || true:
  # under `set -o pipefail` that status would otherwise kill the assignment.
  dur="$( { ffmpeg -nostdin -i "$SRC" 2>&1 || true; } \
    | sed -n 's/.*Duration: \([0-9:.]*\).*/\1/p' | head -n1 \
    | awk -F: '{print ($1*3600)+($2*60)+$3}' )" || true
fi
dur="${dur%%.*}"; dur="${dur:-0}"
if [[ "$dur" -lt 1 ]]; then dur=1; fi

# One frame every dur/TARGET seconds, floored at 1 fps for very short clips.
# Reels are usually a static talking head with changing text overlays, so scene-change
# detection under-samples badly. Fixed interval does not miss a caption swap.
step=$(( dur / TARGET ))
if [[ "$step" -lt 1 ]]; then step=1; fi
fps="1/$step"

echo "$base: ${dur}s, 1 frame per ${step}s"

ffmpeg -nostdin -v error -y -i "$SRC" \
  -vf "fps=$fps" -q:v 2 "$OUT/frames/%03d.jpg"

# index: frame -> timestamp
: > "$OUT/index.tsv"
printf 'frame\tt_seconds\n' >> "$OUT/index.tsv"
i=0
for f in "$OUT"/frames/*.jpg; do
  n="$(basename "$f" .jpg)"
  printf '%s\t%s\n' "$n" "$(( i * step ))" >> "$OUT/index.tsv"
  i=$(( i + 1 ))
done

# Contact sheets: 3x4, timestamp burned in so a claim can be cited to a moment.
# drawtext is skipped when the build lacks it rather than failing the whole run.
cols="${GRID%x*}"
tile_w=$(( 1080 / cols ))
tile_filter="scale=${tile_w}:-1"
if ffmpeg -hide_banner -filters 2>/dev/null | grep -q ' drawtext '; then
  tile_filter="scale=360:-1,drawtext=text='%{eif\:n*${step}\:d}s':x=6:y=6:fontsize=$(( tile_w / 16 )):fontcolor=yellow:box=1:boxcolor=black@0.6:boxborderw=4"
fi

ffmpeg -nostdin -v error -y -framerate 1 -i "$OUT/frames/%03d.jpg" \
  -vf "${tile_filter},tile=${GRID}" -q:v 3 "$OUT/sheet-%02d.jpg" 2>/dev/null \
  || echo "contact sheet failed, individual frames are still in $OUT/frames" >&2

ffmpeg -nostdin -v error -y -i "$SRC" -vn -acodec copy "$OUT/audio.m4a" 2>/dev/null \
  || ffmpeg -nostdin -v error -y -i "$SRC" -vn -acodec aac "$OUT/audio.m4a" 2>/dev/null \
  || echo "no audio track" >&2

# On-screen text. For a reel this is often the whole argument, so it is worth the pass.
if command -v tesseract >/dev/null 2>&1; then
  : > "$OUT/ocr.txt"
  for f in "$OUT"/frames/*.jpg; do
    n="$(basename "$f" .jpg)"
    t="$(awk -F'\t' -v k="$n" '$1==k{print $2}' "$OUT/index.tsv")"
    txt="$(tesseract "$f" - --psm 11 2>/dev/null | tr '\n' ' ' | tr -s ' ' | sed 's/^ *//;s/ *$//')"
    if [[ -n "$txt" ]]; then printf '[%ss] %s\n' "$t" "$txt" >> "$OUT/ocr.txt"; fi
  done
  echo "ocr: $(wc -l < "$OUT/ocr.txt" | tr -d ' ') frames with text"
else
  echo "tesseract not installed, skipping on-screen text (brew install tesseract)" >&2
fi

nf=$(find "$OUT/frames" -name '*.jpg' | wc -l | tr -d ' ')
ns=$(find "$OUT" -maxdepth 1 -name 'sheet-*.jpg' | wc -l | tr -d ' ')
echo "$nf frames, $ns sheet(s) -> $OUT"
