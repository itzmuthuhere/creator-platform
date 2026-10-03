# Quality audit: How to Check Your PAN-Aadhaar Link Status

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

- Originality: the five videos (Hindi and Tamil) are payment walkthroughs, compared by hand; no translated passages. The article's order, exemptions, error table, TDS worked example and new-Act context come from the official user manual and help page.
- Accuracy: the user manual was last updated 29 Sep 2026 and reflects the Income-tax Act, 2025 (s.262). Circular 9/2025 is sourced to Taxmann because the CBDT site blocked automated access, and the article tells readers to confirm it applies under the new Act.
- Time-sensitive items dated in the text: the 1 July 2017 cut-off, the 31 Dec 2025 Enrolment-ID deadline, the circular windows.
- Unverified video claims (year-of-birth box, exact mismatch fields, no refund) are attributed or hedged.
- The audit first failed with only 2 source domains. Added Protean and UIDAI, both opened and read, which also back the correction advice.

## Issues found and fixes made

- Videos say to wait "2–2.5 hours" after paying; the official manual says 4–5 working days. Corrected.
- One video says to "raise a grievance" when PAN is linked to the wrong Aadhaar; the manual says contact the Jurisdictional AO. Corrected.
- Removed three unsupported statements: banks refusing KYC, NRI residential-status advice, and the voluntary-linking fee (seen only in a search snippet).
- The e-filing forms couldn't be screenshotted ("Permission Denied" to the automated browser). The public Quick Links page is used instead.

## Open items for the human reviewer

- One `<!-- AUTHOR: … -->` note on how long linking took in practice.
- Category set to `finance`. Confirm.
- Re-check Circular 9/2025's status under the Income-tax Act, 2025 before publishing; a new circular may have replaced it.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 1 warn · run 2026-09-29 17:47 UTC

- Words: 1636 (≈9 min read) · H2 sections: 9 · images: 1 · FAQ: 5
- Citations: 7 external, 2 internal · independent source domains: 4
- Transcript overlap (5 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 5 transcript(s) are mostly non-Latin script (_source, _source\3hM6T8V-lIE, _source\M43LbzYHLRU, _source\ojOGno01l3U, _source\R47xeTh40dI); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
| INFO | trust | 3 UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty |
<!-- AUTO-AUDIT:END -->
