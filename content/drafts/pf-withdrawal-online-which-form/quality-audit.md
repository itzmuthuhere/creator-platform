# Quality audit: EPFO 3.0 Portal: PF and EPS Withdrawal 2026 New rules explained | Form 19, Form 10C and Form 31 rule

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

- Hindi transcripts compared by hand; structure (what changed → form table → limits with example → after leaving a job → tax → steps → errors) is our own; portal behaviours are attributed to the videos that showed them.
- Grounded the 2026 rules in DD News's report of the EPF Scheme, 2026 (effective 29 June) plus dated secondary sources; the CBT decision (Oct 2025) for the 12/36-month waits.
- Corrected the TDS threshold (₹30,000 in a 2024 Business Standard explainer and Bajaj Finserv's page) to ₹50,000 (since 1 June 2016, Business Standard/PTI).
- Flagged the conflicting "75% after one month of unemployment" claim instead of stating it; pointed readers to the portal's eligibility figure.
- UPI withdrawals and WhatsApp services described as tested/planned, not live.
- Not used: the Online PF Consultant video (fetched but not read).
- Visuals: none; EPFO portals block automated capture and claim screens show personal data.
- Process note: the first attempt to write research.md and sources.md via a shell heredoc failed on an apostrophe; files were written with the file tool.

## Open items for the human reviewer

- Highest-stakes draft so far. Before publishing, ideally confirm on the EPF Scheme, 2026 notification itself (gazette) the 12-month and 36-month waits and whether any early unemployment release remains.
- TDS rates (10% / 34.608%) come from a 2024 explainer; confirm they're unchanged under the Income-tax Act, 2025.
- One AUTHOR note: how long your own PF claim took.
- Category: finance.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 2 warn · run 2026-10-02 15:38 UTC

- Words: 1761 (≈9 min read) · H2 sections: 9 · images: 0 · FAQ: 5
- Citations: 9 external, 2 internal · independent source domains: 8
- Transcript overlap (3 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 3 transcript(s) are mostly non-Latin script (_source, _source\hh0j1qr6jbQ, _source\XPOEUKJD6Qs); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
| INFO | trust | 1 UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty |
<!-- AUTO-AUDIT:END -->
