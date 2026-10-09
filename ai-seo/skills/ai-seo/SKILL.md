---
name: ai-seo
description: Watch a creator's short-form videos (Instagram Reels, TikTok, YouTube Shorts), distill each one into a testable play, and merge them into a living AI SEO playbook. Also applies that playbook to audit a site or social account for AI search visibility. Use when asked to learn AI SEO / GEO / AEO from videos, ingest reels, build or update the playbook, or audit something for AI search citations.
---

# ai-seo

Two modes. Read the request, pick one, say which you picked in the first line.

- **INGEST** ("watch these videos", "learn from this account", "update the playbook") -> pull, transcribe, distill, merge.
- **APPLY** ("audit my site", "why am I not cited", "plan my content") -> read `references/playbook.md`, produce a ranked plan.

The playbook at `references/playbook.md` is the artifact. It is the mastery. Everything else exists to grow it.

## INGEST

### 1. Pull the corpus

Run `scripts/pull_reels.sh <profile-url-or-handle> <workdir>`. Needs `yt-dlp` and `ffmpeg`, plus a logged-in browser profile for cookies. Per post it writes:

- `<workdir>/transcripts/<id>.txt` and `.info.json` (speech and caption)
- `<workdir>/watch/<id>/sheet-NN.jpg` (contact sheets, timestamp on each tile)
- `<workdir>/watch/<id>/frames/NNN.jpg` (full resolution)
- `<workdir>/watch/<id>/ocr.txt` (on-screen text by timestamp, when tesseract is installed)

If the script fails on auth, do not improvise a scraper. Tell the user which of the three fixes applies (browser choice, cookie export, or a manual saved-collection download) and stop.

### 2. Actually watch it

Read the contact sheets as images. This is the step people skip, and it is where most of the content is: a reel's argument usually lives in the on-screen text, not in the spoken audio, and the transcript alone makes a precise claim look vague.

In order:

1. **Contact sheet** for the shape of it: how many beats, where the text changes, whether a dashboard or a screenshot appears.
2. **`ocr.txt`** for the overlay text verbatim. Prefer it over your reading of the sheet when they differ.
3. **Individual frames** at the timestamps where a number, a dashboard, or a settings screen appears. The sheet is too small to read those, and they are the difference between a Tier B claim and a Tier C one.
4. **Transcript** last, as the connective tissue between what is on screen.

If the captions were too small to read on the sheet, re-run with `GRID=2x3` for 540px tiles before guessing.

A dashboard screenshot with legible numbers is Tier B evidence. The same claim spoken with no visual is Tier C. You cannot make that call from a transcript, which is the whole reason for this step.

If the user hands you video files directly, run `scripts/watch_reel.sh <file>` on each and start here. Never claim you watched something you only read about.

### 3. Distill each post into one play

One post becomes one entry. Use the fields in `references/distill-template.md` exactly, in that order. Rules that matter:

- **Claim** is the creator's assertion in their words, compressed. Quote the on-screen text where it is sharper than the audio, which it usually is. Not your paraphrase of what they probably meant.
- **Mechanism** is why it would work. If the video never says, write `not stated` rather than inventing plumbing. A missing mechanism is itself a signal about the play's quality.
- **Test** is the smallest thing that would prove or kill it in under two weeks, with the metric named. "Track rankings" fails. "Citation share in Bing Webmaster AI Visibility, 4 week window, vs the 12.72% reference point" passes.
- **Evidence** gets a tier from the table below. Tier it honestly. A confident delivery is not evidence.

| Tier | Means |
|---|---|
| A | Confirmed in first-party platform documentation (Google Search Central, Bing, OpenAI) |
| B | Creator's own measured data, with the numbers shown on screen |
| C | Creator's experience, no numbers |
| D | Assertion only, or a claim the platform docs contradict |

### 4. Merge, do not append

Before adding a play, read the existing playbook.

- **Same claim already present** -> raise or lower its evidence tier, add the new source line, do not duplicate.
- **Contradicts an existing play** -> keep both, add a `Conflict:` line to each pointing at the other, and note which tier wins. Never silently overwrite. The conflicts are the most valuable part of the file.
- **Contradicts a Tier A source** -> keep it, mark it Tier D, and say what the platform docs actually say. The `llms.txt` entry is the worked example of this.

### 5. Report

Give the count ingested, the new plays, the conflicts raised, and one thing to test this week. Link the playbook file path.

## APPLY

1. Read `references/playbook.md` in full.
2. Sort plays by evidence tier, then by effort. Tier A and B first, always.
3. Produce at most five actions, each with the metric that says it worked.
4. Name what you skipped and why. "Tier D, contradicted by Google's own guidance" is a complete reason.

Do not recommend a Tier C or D play ahead of a Tier A one because it is more interesting.

## Standing rules

- **Short-form video overstates certainty.** A 30 second reel has no room for the conditions under which a tactic fails. Assume every claim has a missing "when this works" clause and go find it before you promote it above Tier C.
- **Platform docs beat creators.** Google publishes what it does and does not use. When a video conflicts with that, the video is the thing that needs evidence.
- **Dates decay fast.** Any play about a specific product surface (AI Overviews layout, Search Console reports, crawler names) carries a `Checked:` date. Past 90 days, re-verify before acting on it.
- **Never fabricate a transcript, a frame, a view count, or a citation.** If a video could not be pulled, the entry is `unavailable`, not a guess.
