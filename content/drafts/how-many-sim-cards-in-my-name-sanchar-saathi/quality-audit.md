# Quality audit: How Many SIM Cards Are in Your Name?

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

- Originality: the videos are screen walkthroughs. This article's structure (the limit, the decision table, the re-verification timeline, family SIMs, the next steps for an unknown number) is independent. The Hindi and Tamil transcripts were compared by hand: no translated passages. The Tamil video is itself a narration of the Sarkari DNA video, so it was treated as non-independent.
- Accuracy: every rule comes from the DoT FAQ or the Act. The Aug 2026 enforcement comes from one news report, dated in the text. The "Required" option, app SMS registration and masked display are attributed to the videos.
- Visuals: only one screenshot is possible without logging in with a real number. The results page is described in a table instead.
- FAQ repeats a few body facts on purpose (the site shows the FAQ separately), phrased for standalone questions.

## Issues found and fixes made

- All four videos say the limit is 10 SIMs; the official limit is 9 (6 in J&K, Assam and the North-East). Corrected.
- Videos say a reported number closes in 7 or 15 days; the official timeline is 30/45/60 days. Corrected.
- One sentence about who goes through re-verification was confusing. Rewritten.
- "Real-time checks at the point of sale" went beyond the news source. Trimmed to what it says.
- cybercrime.gov.in couldn't be opened (certificate error from this environment), so it's named but not linked. The referral itself comes from the Sanchar Saathi FAQ.

## Open items for the human reviewer

- One `<!-- AUTHOR: … -->` note in the family-SIMs section. Add a real example, or delete it.
- The Aug 2026 enforcement and the 30 Nov 2026 real-time deadline: re-check for updates before publishing.
- Only one screenshot. If you're comfortable, a screenshot of your own results page with the numbers blurred would help readers. Blur everything except the option labels.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 1 warn · run 2026-09-29 17:37 UTC

- Words: 1844 (≈10 min read) · H2 sections: 9 · images: 1 · FAQ: 5
- Citations: 5 external, 2 internal · independent source domains: 4
- Transcript overlap (4 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 4 transcript(s) are mostly non-Latin script (_source, _source\4TBXNayRW1U, _source\CUSCHO9XxqA, _source\qmsKTx2jD7Q); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
| INFO | trust | 3 UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty |
<!-- AUTO-AUDIT:END -->
