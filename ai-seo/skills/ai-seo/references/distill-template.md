# Distill template

One ingested video becomes one block in this exact shape. Fields in this order.
Omit nothing: write `not stated` where the video does not say.

```
### <tier><n>. <Claim in six words or fewer>
**Claim:** <the creator's assertion, compressed, in their framing>
**Mechanism:** <why it would work | not stated>
**Do:** <the concrete action, imperative, specific enough to start today>
**Test:** <smallest experiment that settles it in under two weeks, metric named>
**Watch for:** <the failure condition the video skipped> (optional)
**Evidence:** <A|B|C|D>. <one line justifying the tier>
**Conflict:** <points at the play it disagrees with> (only when one exists)
**Checked:** <YYYY-MM-DD>. **Source:** <post URL or shortcode>
```

## Tiering, decided in this order

1. Does a platform doc contradict it? -> **D**, and quote what the doc says.
2. Does a platform doc confirm it? -> **A**.
3. Did the video show numbers on screen, from their own account or client? -> **B**.
   Screenshots of a dashboard count. A spoken number does not.
4. Anything else -> **C**.

A claim with no mechanism and no numbers is **D**, not C, no matter how confidently
it is delivered.

## What does not become a play

Skip and do not file:

- Motivational content, agency pitches, hiring posts, conference recaps.
- Restatements of a play already in the file at the same or lower tier. Add the source
  line to the existing entry instead.
- Tool demos where the claim is "this tool exists". A tool becomes a play only when the
  video states what it changes and how you would know.

## Worked example

From a video asserting that adding `llms.txt` gets you into AI Overviews:

```
### D1. llms.txt for AI Overviews
**Claim:** Adding llms.txt at the root gets your pages picked up by AI Overviews.
**Mechanism:** not stated
**Do:** Nothing. See A2.
**Test:** Not testable. Any observed lift is confounded with the content work shipped
alongside it.
**Evidence:** D. Google's May 2026 AI optimization guidance names llms.txt among the
tactics that do not help with AI Overviews, AI Mode or other generative surfaces.
**Conflict:** Contradicts A2. Tier A wins.
**Checked:** 2026-09-14. **Source:** <post URL>
```

The point of filing it rather than dropping it: the next time someone repeats the
claim, the file already answers it.
