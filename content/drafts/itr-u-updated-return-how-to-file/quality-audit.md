# Quality audit: ❌ Don't file Updated Return (ITR-U) | How to file updated return | How to file ITR 2026

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

- CORRECTED CA Guru Ji's example: FY 2024-25's ITR-U last date is 31 Mar 2030 (48 months after AY 2025-26 ends), not 31 Mar 2029.
- The open-years table is computed in scripts/research/itr-u-windows.py. The point that every band steps up on 1 Apr 2027 is my own observation.
- Corrected "only a late fee" for the FY 2025-26 belated return. Interest on unpaid tax also applies.
- The video's framing ("don't file ITR-U, it only benefits the department") was not adopted. The article explains when it is the right tool.
- The Hindi transcripts (Puneet Jain, Tax2win) were compared by hand. Only the utility steps are used, and they're attributed.
- Shortened the meta description (SEO WARN).
- Visuals WARN: there are no images, because the filing screens need a login.

## Open items for the human reviewer

Things only the author can do: add a real first-hand observation where marked `<!-- AUTHOR: … -->`, confirm the category, decide on any borderline claim.

- AUTHOR note: what triggered an ITR-U, if the author has filed one.
- The Finance Act 2026 provisions (ITR-U after a reassessment notice +10%; loss reduction) come from secondary sources. Confirm them against the enacted text.
- Confirm the portal menu path for uploading ITR-U (e-File > Income Tax Returns > File Income Tax Return > updated return) on the current portal.
- The table is dated "as of October 2026". Update the bands if this is published after 31 Mar 2027.
- Cross-link file-itr-1-online-salaried once it's published.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 2 warn · run 2026-10-03 06:45 UTC

- Words: 1381 (≈7 min read) · H2 sections: 9 · images: 0 · FAQ: 5
- Citations: 5 external, 1 internal · independent source domains: 4
- Transcript overlap (3 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 2 transcript(s) are mostly non-Latin script (_source\9d_1CCeT9fU, _source\zCeKUZ3k-a4); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
<!-- AUTO-AUDIT:END -->
