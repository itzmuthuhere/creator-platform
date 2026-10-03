# Quality audit: TNEB EB Bill Calculation 2026 | TNEB Bill அதிகமாக வருவதற்கான காரணங்கள் + தீர்வுகள் #ebbill #tneb

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

- Two secondary sources disagree on the >500-unit 101–200 slab (₹2.35 vs ₹4.70). DT Next's report that the ₹2.35 subsidy applies to the ≤500 group and that >500 users get no benefit, plus the video's arithmetic, support ₹4.70; used that and noted the conflict in sources.md.
- The video's spoken jump figures (₹428.40 / ₹470) don't match its own arithmetic; the article uses the computed ₹478.40.
- Fixed step numbering (Step 4) and made the standby FAQ figure match the worked table.
- Appliance wattages are labelled as examples; the article tells readers to use their own labels and to measure.
- Keyword introduced in the first 150 words; seoTitle shortened.
- Tamil transcript (startuponline): a short calculator demo; compared by hand. Only its slab rates were used, with other sources.
- No images: the slab breakdown is behind a TNPDCL login; tables carry the example.

## Open items for the human reviewer

Things only the author can do: add a real first-hand observation where marked `<!-- AUTHOR: … -->`, confirm the category, decide on any borderline claim.

- AUTHOR note in the worked example.
- Rates are consumer-payable rates from secondary sources; confirm against a real TNPDCL bill breakdown or TNERC Order No. 5 of 2026 before publishing. A pending inflation-linked revision (TNERC Order 6 of 2025) could change the TNERC rates, though domestic consumer rates have been held by subsidy.
- Rates above 600 units deliberately not listed (conflicting sources).

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 2 warn · run 2026-10-02 20:56 UTC

- Words: 1615 (≈9 min read) · H2 sections: 9 · images: 0 · FAQ: 5
- Citations: 6 external, 2 internal · independent source domains: 4
- Transcript overlap (3 transcript(s)): 0.06% of 8-word sequences · longest shared run: 8 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 1 transcript(s) are mostly non-Latin script (_source\JsA0DmBi-xs); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
<!-- AUTO-AUDIT:END -->
