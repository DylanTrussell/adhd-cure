# ai-seo

An agent that watches a creator's short-form videos and turns them into one AI SEO
playbook you can actually audit against.

The problem with learning SEO from reels is that a 30 second video has no room for the
conditions under which the tactic fails, so everything arrives sounding equally true.
This skill forces every claim through an evidence tier before it can be recommended,
and keeps contradictions on the page instead of resolving them silently.

## What it produces

[`skills/ai-seo/references/playbook.md`](skills/ai-seo/references/playbook.md) is the
artifact. One entry per claim, sorted by evidence tier:

| Tier | Means |
|---|---|
| A | Confirmed in first-party platform docs |
| B | Measured data, numbers shown on screen |
| C | Practitioner experience, no numbers |
| D | Assertion only, or contradicted by a Tier A source |

It ships seeded from platform documentation so it is useful before you ingest anything,
and every seed entry is marked so reel-derived plays can replace it.

## Use it

**Ingest**

```bash
./skills/ai-seo/scripts/pull_reels.sh @lawrenceaiseo ~/ai-seo-corpus 40
```

Then, in Claude Code: `ingest ~/ai-seo-corpus into the ai-seo playbook`.

Needs `yt-dlp` and a browser you are logged into Instagram in. Set `IG_BROWSER` if it
is not Chrome. The script rate limits itself on purpose.

**Apply**

`audit culpritgroup.com against the ai-seo playbook` gives at most five ranked actions,
each with the metric that says it worked, plus what got skipped and why.

## Install

```
/plugin marketplace add dylantrussell/adhd-cure
/plugin install ai-seo@adhd-cure
```

## Files

- [`skills/ai-seo/SKILL.md`](skills/ai-seo/SKILL.md) - the agent: both modes, merge rules
- [`skills/ai-seo/references/playbook.md`](skills/ai-seo/references/playbook.md) - the living knowledge base
- [`skills/ai-seo/references/distill-template.md`](skills/ai-seo/references/distill-template.md) - the per-video entry format and tiering order
- [`skills/ai-seo/scripts/pull_reels.sh`](skills/ai-seo/scripts/pull_reels.sh) - download and transcribe
