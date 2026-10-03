# Quality audit: Home Loan Prepayment Reduce EMI or Tenure? Calculation Method EXPLAINED

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

- Three Hindi/Tamil transcripts can't be overlap-checked automatically. Compared by hand: the article's structure (verdict → worked loan → equal-cash-flow argument → when EMI cut is better → timing/habits → rate rises → rules → how-to) follows none of the videos; examples use our own ₹50 lakh/7.75%/20-year loan; the Varsity and Warikoo points used are attributed by name.
- Recomputed every video figure: Warikoo's EMI/interest check out; Zerodha Varsity's prepayment result (197 months, ₹10L saved) and Yuvarani's (24 years, ₹18L saved; "80% interest") are wrong. Corrected values are in the ledger; the article uses only our own numbers.
- Removed or reworded unsourced statements: "many lenders quietly extend tenure" (now RBI's own description of complaints), "banks generally offer one or the other", the credit-score effect of full closure, an unopened calculator link, and an unattributed NBFC claim (now attributed to Varsity).
- Kept "most banks default to tenure reduction" out (UNVERIFIED); the article tells readers to state their choice in writing instead.
- Added the keyword to the opening after the SEO warning; added ICICI FAQ link.
- Remaining warning: non-Latin transcripts; handled by the manual comparison above.

## Open items for the human reviewer

- One AUTHOR note: which option you chose on your own loan, and why.
- The RBI policy decision is due on 7 October 2026. If publishing after that, update the repo-rate paragraph with the actual outcome.
- SBI's rate card (screenshot and the 7.75% example rate) is dated 20 May 2026; check it hasn't changed before publishing.
- Category: finance.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 1 warn · run 2026-10-02 09:05 UTC

- Words: 2393 (≈12 min read) · H2 sections: 9 · images: 1 · FAQ: 5
- Citations: 8 external, 2 internal · independent source domains: 9
- Transcript overlap (4 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 3 transcript(s) are mostly non-Latin script (_source, _source\3Ptpi3GjP9I, _source\Ekh34kPrbt0); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
| INFO | trust | 1 UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty |
<!-- AUTO-AUDIT:END -->
