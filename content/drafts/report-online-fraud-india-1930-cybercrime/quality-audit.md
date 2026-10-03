# Quality audit: Lost Money to an Online Scam?

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

- Originality: one English transcript (0% overlap); four Hindi ones compared by hand. The structure (two parallel tracks, the before/after-2027 liability tables, the restoration routes, the escalation ladder) is independent. The videos supplied the practical form-filling details and warnings, which are attributed.
- Accuracy: the rules come from RBI's 2017 circular and 2026 Ombudsman FAQ, the MHA/I4C portals, and dated secondary reports for the 2026 SOP and the June 2026 RBI directions (the RBI final text itself wasn't opened; MediaNama's summary is cited and the claim is flagged "as reported"). BNSS sections are attributed to the lawyer's video, with advice to consult a lawyer.
- Money-related advice is framed as process information, not legal advice. Nothing promises recovery.

## Issues found and fixes made

- None of the videos cover the 2026 changes (MHA SOP, MRM portal, RBI's 2027 rules, RB-IOS 2026). All added, with effective dates.
- Removed an unsupported "by August 2026" date on the Moneylife figure, and softened the routing claim.
- Screenshots crop out the portal's banner photographs of politicians.

## Open items for the human reviewer

- One `<!-- AUTHOR: … -->` note (an anonymised real case).
- **Time-sensitive:** re-check the RBI 2027 rules against RBI's own final notification before publishing, and update the "before/after 1 January 2027" framing once that date has passed.
- Consider having someone with a legal background glance at the court-order paragraph.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 1 warn · run 2026-09-29 18:05 UTC

- Words: 1711 (≈9 min read) · H2 sections: 8 · images: 2 · FAQ: 5
- Citations: 6 external, 1 internal · independent source domains: 6
- Transcript overlap (5 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 4 transcript(s) are mostly non-Latin script (_source\5XBi_B5kfAI, _source\HQlmnRX64rQ, _source\IXssQBjAXVs, _source\okmUYP92Sqk); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
| INFO | trust | 2 UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty |
<!-- AUTO-AUDIT:END -->
