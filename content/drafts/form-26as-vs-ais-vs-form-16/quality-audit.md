# Quality audit: Form 16 vs 26AS vs AIS vs TIS: 5 Step Reconciliation Formula (2026)

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

- Duplicate checker flagged the ITR-1 draft (0.58). Reviewed: different intent (that one is a filing walkthrough with a short mismatch table); kept overlap minimal; cross-link both once published.
- Hindi transcripts compared by hand; structure (map → each document → connections → worked reconciliation → feedback vs return → Form 130) is our own; the reconciliation example uses our own illustrative figures; video points are attributed.
- AIS/TIS/26AS facts from the department's AIS FAQ; Form 16 parts and deadline from an April 2026 guide; Form 130 confirmed by two sources (TaxGuru, FuturexSolutions).
- Not used: "AIS mismatch is the number one reason for notices" (unverified statistic).
- The PAN-mismatch sentence is general guidance, not a sourced statistic.
- Visuals: none; the portal blocks automated browsers and AIS contains personal data.

## Open items for the human reviewer

- One AUTHOR note: anything surprising you've found in your own AIS.
- Feedback option labels are as listed in Fisdom's video; check against the live AIS screen before publishing.
- Category: finance.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 2 warn · run 2026-10-02 17:05 UTC

- Words: 1570 (≈8 min read) · H2 sections: 10 · images: 0 · FAQ: 5
- Citations: 4 external, 2 internal · independent source domains: 3
- Transcript overlap (2 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 2 transcript(s) are mostly non-Latin script (_source, _source\CL9UZSJzA8Y); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
| INFO | trust | 1 UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty |
<!-- AUTO-AUDIT:END -->
