# Quality audit: Home loan costs rising? Why a balance transfer could help you save big |  Paisabazaar CEO explains

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

- The title dropped the "actually" formula (style WARN).
- The primary video's "rates have moderated" framing is now dated. The repo has been 5.25% since late 2025, and a hike is possible at the 7 Oct 2026 MPC. The article advises comparing spreads instead of assuming rates fall.
- All the examples were recomputed (scripts/research/home-loan-bt-math.py). The videos' figures (₹1 crore example; ₹43 lakh scenarios) weren't reused.
- The Hindi transcripts were compared by hand. Only the "tenure/EMI reset" warning is used, and it's attributed to Real Indian Money. The structure and numbers are my own.
- Cost amounts (0.5% fee, 0.2% stamp duty, ₹10,000 legal) are illustrative and labelled as such. Stamp duty varies by state.
- Visuals WARN: there are no images. Tables carry the comparison, and there's nothing public worth capturing.

## Open items for the human reviewer

Things only the author can do: add a real first-hand observation where marked `<!-- AUTHOR: … -->`, confirm the category, decide on any borderline claim.

- AUTHOR note: asking your own bank for a lower rate.
- The RBI MPC decision is due 7 Oct 2026. Update the "rates are about to move" bullet with the actual outcome before publishing.
- FIXED during review: the 2025 RBI directions apply to loans sanctioned or renewed from 1 Jan 2026. Existing bank loans are covered by the 2014 RBI circular (added as a source). Confirm the HFC-equivalent rule if the reader's lender is an HFC.
- Cross-link home-loan-prepayment-reduce-emi-or-tenure once it's published.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 2 warn · run 2026-10-03 06:49 UTC

- Words: 1286 (≈7 min read) · H2 sections: 8 · images: 0 · FAQ: 5
- Citations: 7 external, 1 internal · independent source domains: 5
- Transcript overlap (3 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 2 transcript(s) are mostly non-Latin script (_source\SjfX5kL2uKs, _source\ysYQ2ho7rkc); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
<!-- AUTO-AUDIT:END -->
