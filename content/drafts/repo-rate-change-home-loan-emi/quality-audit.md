# Quality audit: Will Your Home Loan EMI Finally Reduce? 🚨 RBI Repo Rate Explained

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

- Softened two unverified claims: "almost all banks chose the repo rate" (now SBI as the example) and the size and causation of the 2022–23 cycle (now neutral wording).
- Every EMI and tenure figure is computed in scripts/research/repo-emi-math.py. The videos' numbers aren't reused.
- The RBI FAQ is current to 1 Oct 2025: the fixed-rate switch is now optional, which the article reflects. Older videos and articles still say it's mandatory.
- Added the keyword to the opening (SEO WARN).
- The Hindi transcript (Trade Neeti) was compared by hand. Only the dates and facts of the Aug 2026 hold are used, and they're attributed.
- Visuals WARN: there are no images. The tables carry the numbers, and SBI's EBLR table is quoted as text.

## Open items for the human reviewer

Things only the author can do: add a real first-hand observation where marked `<!-- AUTHOR: … -->`, confirm the category, decide on any borderline claim.

- AUTHOR note: whether the author's bank changed the tenure rather than the EMI.
- The RBI MPC decision is due 7 Oct 2026. Update "Where rates stand now" with the outcome, and SBI's EBLR if it changes.
- Cross-link the balance transfer and prepayment drafts once they're published.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 2 warn · run 2026-10-03 06:53 UTC

- Words: 1286 (≈7 min read) · H2 sections: 7 · images: 0 · FAQ: 5
- Citations: 7 external, 1 internal · independent source domains: 6
- Transcript overlap (3 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 1 transcript(s) are mostly non-Latin script (_source); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
<!-- AUTO-AUDIT:END -->
