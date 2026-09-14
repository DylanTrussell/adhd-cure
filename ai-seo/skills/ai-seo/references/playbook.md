# AI SEO Playbook

Living file. Grows one play per ingested video. Sorted by evidence tier, best first.

**Seeded:** 2026-09-14, from platform documentation and public writing, not from the
videos. Every seed entry is marked `Source: seed`. Reel-derived entries replace or
re-tier these as they come in.

**Tiers:** A = first-party platform docs. B = measured data with numbers shown.
C = practitioner experience, no numbers. D = assertion only, or contradicted by A.

---

## Tier A

### A1. Search Console platform properties are the new query data source for social
**Claim:** Instagram, TikTok, X and YouTube accounts now get Search Console
performance data (clicks, impressions, and the actual queries) without owning a website.
**Mechanism:** Google indexes social posts for Search, Discover and News, and as of
July 2026 exposes that reporting against the account rather than a domain.
**Do:** Connect the account in the Search Console property selector. Export the
query list. This is the only first-party view of which searches your video content
already answers.
**Test:** Property connected, 28 days of query data exported.
**Watch for:** It is organic search data only. Native views, likes and watch time
are absent, so it is not a replacement for platform analytics. Accounts above
100k followers (300k on TikTok) may already have the property auto-created.
**Evidence:** A. Google Search Central blog, July 2026 rollout.
**Checked:** 2026-09-14. **Source:** seed.

### A2. llms.txt does nothing for Google AI surfaces
**Claim:** An `llms.txt` file does not help visibility in AI Overviews, AI Mode or any
Google generative surface.
**Mechanism:** Google's May 2026 AI optimization guidance names it directly, alongside
content chunking, AI-specific rewriting and special schema, as tactics that do not help.
**Do:** Skip it for Google. It remains defensible only on developer docs and API
reference sites where Claude or OpenAI agents are a measurable referrer, and that is a
different job with a different metric.
**Test:** Not testable for Google visibility. Treat any claimed lift as confounded.
**Evidence:** A. Google Search Central AI optimization guidance, May 2026.
**Conflict:** This is the reference case for Tier D re-tiering. Any video recommending
`llms.txt` for AI Overviews gets filed D and pointed here.
**Checked:** 2026-09-14. **Source:** seed.

### A3. Crawler access and server-rendered text are the floor
**Claim:** If the answer text is not in the HTML the crawler receives, nothing
downstream matters.
**Mechanism:** Retrieval happens over fetched text. Client-side rendered content and
blocked user agents are absent from the index the model retrieves against.
**Do:** Confirm the answer paragraphs appear in view-source, not just in the rendered
DOM. Check robots rules against the AI crawler user agents separately from Googlebot.
**Test:** `curl` the page, grep for the answer sentence. It is there or it is not.
**Evidence:** A. Follows from documented crawl and index behaviour.
**Checked:** 2026-09-14. **Source:** seed.

---

## Tier B

### B1. Measure three numbers, over four to eight weeks, against yourself
**Claim:** Citation share, AI referral sessions, and crawl-to-referral ratio are the
metrics that track AI search. Single vendor "visibility scores" are not.
**Mechanism:** Citation share is available free in Bing Webmaster AI Visibility.
Referral sessions come from GA4. Crawl-to-referral is bot hits divided by sessions
sent, which exposes whether heavy crawling is buying you anything.
**Do:** Baseline all three, then compare to your own prior window and to named
competitors. Not to an industry average.
**Reference points (one practitioner's first-party site, not a benchmark):** citation
share 12.72%; crawl-to-referral 46:1 against a quoted GPTBot average near 1,091:1.
**Test:** Four to eight week window, same three numbers, direction of travel.
**Evidence:** B. Published first-party numbers from a single site. Sample size one.
**Checked:** 2026-09-14. **Source:** seed.

### B2. Social topical map: one plan, sorted into optimise / embed / produce
**Claim:** Build the content plan from the Google queries your social posts already
earn, then sort every theme into one of three actions.
**Mechanism:** Platform property query data (see A1) tells you which themes are in
striking distance rather than which you assumed you owned.
**Do:**
1. **Optimise** the posts already ranking: tighten captions and on-screen text.
2. **Embed** your best videos on the matching page of your site.
3. **Produce** new posts for themes showing impressions with no strong post yet.
**Why captions:** On Instagram the caption carries the text relevance Google uses to
decide which search a visual answers. Emoji-only captions forfeit that entirely.
**Test:** Impressions and query count for the treated themes, 28 days, from the
platform property.
**Evidence:** B. Method published July 2026 with worked query data, not independently
replicated.
**Checked:** 2026-09-14. **Source:** seed.

---

## Tier C

### C1. Write the answer as a self-contained passage, not a page
**Claim:** Citation is decided at passage level. A passage that fully answers the
query inside roughly 40 to 170 words gets pulled; a page that answers it across four
scattered sections does not.
**Mechanism:** RAG systems chunk on paragraph and heading boundaries, embed the chunks,
and retrieve chunks. The chunk is the unit of competition, so a chunk that depends on
earlier context loses to one that stands alone.
**Do:** Open each section with a direct 40 to 60 word answer, then expand. Repeat the
entity name inside the chunk instead of relying on a pronoun that points at a heading
three chunks up.
**Test:** Citation share on the treated URLs vs untreated, eight weeks.
**Evidence:** C. The chunking mechanism is well established. The specific word counts
and the multiplier figures circulating with them come from vendor blogs with
undisclosed methodology. Treat the shape as real and the numbers as marketing.
**Checked:** 2026-09-14. **Source:** seed.

### C2. Schema earns trust, it does not earn ranking
**Claim:** JSON-LD is how an engine confirms entity, author, date and relationships
before it is willing to name you.
**Mechanism:** Parsed as a corroboration layer, not a ranking input.
**Do:** Ship accurate Organization, Person and Article markup with real `sameAs` links.
Do not invent AI-specific schema types, which Google's guidance groups with the tactics
that do not help.
**Test:** Hard to isolate. Do it because it is cheap and correct, not because you expect
a measurable lift on its own.
**Evidence:** C. Widely asserted, mechanism plausible, effect not cleanly isolated.
**Checked:** 2026-09-14. **Source:** seed.

### C3. Expect 60 to 90 days before citation movement
**Claim:** Restructuring plus schema plus two or three category-relevant third-party
placements shows early citation lift in 60 to 90 days. Compounding takes 6 to 9 months.
**Do:** Set the review date at day 90 when the work starts, so the eight week null
result does not get read as failure.
**Evidence:** C. Consistent across practitioner writing, no controlled data.
**Checked:** 2026-09-14. **Source:** seed.

---

## Tier D

*(Empty at seed. Populated as ingested reels produce claims that conflict with Tier A,
or claims with no stated mechanism and no numbers. Each entry names what it conflicts
with.)*

---

## Open questions

Things the seed cannot settle. Flag when an ingested video addresses one.

1. Does embedding a Reel on a ranking page measurably lift the Reel's own search
   impressions, or only the page's?
2. Is citation share in Bing Webmaster AI Visibility correlated with ChatGPT or
   Perplexity citation, or only with Copilot?
3. What is a realistic crawl-to-referral ratio by vertical? One site's 46:1 is not a
   benchmark.
4. Do platform-property query gains on Instagram survive a caption rewrite, or does
   the re-index reset the post's earned queries?
