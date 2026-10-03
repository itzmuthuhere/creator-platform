# Quality audit: ITR Filing 2026-27 for Salary Person | Step by Step ITR-1 Return Filing AY 2026-27 (Live Demo)

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

- Angle adjusted for the date (October): leads with belated filing until 31 December 2026 and its consequences, keeps the full walkthrough for next year.
- Eligibility and e-verification from the department's ITR-1 FAQ; regime rule from the department's FAQ and TaxGuru; dates and fees from ClearTax.
- Rejected Tax Filing School's tip to use ITR-3/4 to avoid the late fee (the form must match your income).
- Caught and removed an internal link whose anchor ("comparison of the old and new tax regimes") pointed to the home-loan article; the regime article is still a draft. Checked all 22 internal links across this session's drafts: the rest match.
- Softened unsourced details (consequence of verifying after 30 days, "most common" notice trigger, ITR-U costs, revised-return rule).
- Hindi transcript (Tax Filing School) compared by hand; only its portal behaviour is used.
- Visuals: none; the e-filing portal blocks automated access and logged-in screens show personal data.

## Open items for the human reviewer

- One AUTHOR note: which document you usually find missing or wrong.
- Seasonal: once the regime-comparison draft is published, link it from the "Next year" bullet.
- Next July, update for returns under the Income-tax Act, 2025 (form and section names may change).
- Category: finance.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 2 warn · run 2026-10-02 16:25 UTC

- Words: 1461 (≈8 min read) · H2 sections: 8 · images: 0 · FAQ: 5
- Citations: 5 external, 2 internal · independent source domains: 3
- Transcript overlap (4 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 1 transcript(s) are mostly non-Latin script (_source\kmnr_G5pkjs); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
<!-- AUTO-AUDIT:END -->
