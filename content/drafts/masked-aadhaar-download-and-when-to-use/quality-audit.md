# Quality audit: Masked Aadhaar

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

## Editorial notes

- Originality: three short Hindi explainers, compared by hand; no translated passages. The article's core, "what masking doesn't hide", the password edge cases, VID, selective sharing, biometric lock and the 2022 advisory history, comes from UIDAI's FAQ and news reports.
- Accuracy: definitions, the password rule and examples, e-Aadhaar validity, VID and app features are quoted from UIDAI pages last updated in 2026. The "not accepted for government schemes" claim couldn't be verified on UIDAI's site, so it's attributed to the videos and readers are told to check.
- Length is about 1,300 words, which suits a narrow topic; no padding added.

## Issues found and fixes made

- The first audit failed with only 2 source domains. Added The Quint (opened), which also contributed the hotels/film halls detail of the withdrawn advisory.
- The myAadhaar download page and PIB blocked automated access. Used the UIDAI home page screenshot and the UIDAI app FAQ instead.
- Dropped one Tamil video whose captions were unusable.

## Open items for the human reviewer

- One `<!-- AUTHOR: … -->` note (a hotel or office reaction to a masked copy).
- If you have a masked Aadhaar of your own, a screenshot with everything but the masked number blurred would show readers exactly what it looks like.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 1 warn · run 2026-09-29 17:53 UTC

- Words: 1336 (≈7 min read) · H2 sections: 7 · images: 1 · FAQ: 5
- Citations: 4 external, 1 internal · independent source domains: 3
- Transcript overlap (3 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 3 transcript(s) are mostly non-Latin script (_source, _source\fz_v2M1jeQ8, _source\k0s5TVh8rCU); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
| INFO | trust | 2 UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty |
<!-- AUTO-AUDIT:END -->
