# Quality audit: Should You Choose Nifty Midcap150 Index or Active Midcap Funds? (6-Year Data)

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

- Audit FAIL: only 2 independent domains. Added SEBI's 2022 passive-fund rules (via Moneylife) to the "choosing an index fund" step on tracking error/difference, which also made that step more useful.
- Meta description didn't name the topic; rewritten to lead with "index fund vs active fund".
- freefincal's "about half beat the benchmark" is attributed and set against SPIVA's 10-year figures rather than stated as fact.
- No images: SPIVA's charts are S&P's copyrighted figures and the AMFI TER page is a filter form; the numbers are presented as tables instead, which is clearer.

## Open items for the human reviewer

Things only the author can do: add a real first-hand observation where marked `<!-- AUTHOR: … -->`, confirm the category, decide on any borderline claim.

- AUTHOR note in the cost-hurdle section: which funds the author holds and why (optional).
- SPIVA publishes twice a year; refresh the table when the Year-End 2026 report comes out (around March 2027).
- TER medians are September 2026; re-run scripts/research/index-vs-active-math.py before publishing if it's much later.
- Cross-link the direct-vs-regular draft once it's published.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 1 warn · run 2026-10-02 20:39 UTC

- Words: 1816 (≈10 min read) · H2 sections: 8 · images: 0 · FAQ: 5
- Citations: 5 external, 2 internal · independent source domains: 3
- Transcript overlap (2 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
<!-- AUTO-AUDIT:END -->
