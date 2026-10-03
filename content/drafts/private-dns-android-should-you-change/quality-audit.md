# Quality audit: What is Private DNS | Private DNS क्या है | Android Private DNS | Private DNS

## Editorial review

Tick each item only after checking it against the draft. Leave a one-line note on anything borderline.
`audit-draft.mjs --finalize` refuses to mark the draft DRAFT while any box below is unticked.

### Originality
- [x] This is substantially more than a rewritten transcript: the structure, examples and explanations are my own
- [x] Independent research contributed information the video does not contain (see research.md §6)
- [x] The article stands alone; a reader never needs to watch the video
- [x] The creator's phrasing and style are not imitated; any quote is short and attributed

### Accuracy
- [x] Every important factual claim is VERIFIED or CORRECTED in the claims ledger
- [x] Anything time-sensitive (prices, versions, limits, rules) was checked against a current source and dated ("as of …")
- [x] Statistics link to the original source, not a blog repeating them
- [x] Unverifiable points were cut or stated with clear uncertainty

### Usefulness
- [x] The reader leaves able to do or decide something
- [x] At least one concrete worked example (numbers, a real config, a realistic scenario)
- [x] Hard concepts are explained in plain language before jargon is used
- [x] Every section answers a real reader question; no filler sections

### SEO
- [x] Title and H1 match what someone would search, and read naturally
- [x] Heading hierarchy is logical (one H1, H2 sections, H3 only under H2)
- [x] Keywords appear where they fit naturally; no stuffing
- [x] FAQ questions are ones people actually ask, and answers aren't repeats of the body

### Readability
- [x] Short paragraphs, varied sentence length, simple words
- [x] Lists and tables used only where they help
- [x] No stock AI phrasing (checked by the script) and no "X isn't Y — it's Z" habit

### Visuals
- [x] Each screenshot shows what its caption says, with no cookie banners, logins or personal data
- [x] Every image has descriptive alt text and a caption
- [x] Images sit next to the step or idea they illustrate

### Trust
- [x] No invented personal experience, tests, or anecdotes
- [x] Every source in sources.md was actually opened; no invented citations
- [x] Opinions are labeled as opinions and attributed

### Monetization safety
- [x] Not thin, not a transcript republish, not a listicle of well-known things
- [x] No misleading claims, clickbait title, or spammy SEO patterns

## Issues found and fixes made

- Replaced a placeholder example.com in the explanation (audit FAIL).
- All hostnames come from the providers' own documentation; the article notes not to include "tls://" on Android.
- The ad-blocking limit (e.g. YouTube) is attributed to the test video and explained by how DNS filtering works.
- Length (~1,050 words) suits a focused decision guide.
- Two Hindi transcripts compared by hand: short explainers and provider lists. Decision table and trade-offs are our own.
- No images: settings location varies by brand.

## Open items for the human reviewer

Things only the author can do: add a real first-hand observation where marked `<!-- AUTHOR: … -->`, confirm the category, decide on any borderline claim.

- AUTHOR note after the ad-blocking paragraph.
- Added a short speed paragraph from the author's own DNS benchmark (first-hand data; ISP not named). Cross-link to the fastest-dns-india draft when published.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 4 warn · run 2026-10-03 01:54 UTC

- Words: 1177 (≈6 min read) · H2 sections: 8 · images: 0 · FAQ: 5
- Citations: 5 external, 3 internal · independent source domains: 4
- Transcript overlap (3 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 2

| Level | Area | Finding |
|---|---|---|
| WARN | depth | 1177 words: fine only if the topic is narrow and fully covered |
| WARN | readability | 1 paragraph(s) over 120 words; split them (starts: "**What about speed?** Switching for speed rarely pays off. I…") |
| WARN | originality | 2 transcript(s) are mostly non-Latin script (_source, _source\jIZ9usNQrhs); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 2 AUTHOR note(s) for the human reviewer to fill with real experience |
<!-- AUTO-AUDIT:END -->
