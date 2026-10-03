# Quality audit: Which AC Should You Buy In 2026 | 3 Star VS 5 Star

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

- The 2026 star thresholds couldn't be confirmed: BEE's gazette text wasn't readable, and secondary sources give three conflicting tables (5-star from 5.30, 5.60 or 5.80). Chose not to print any table and to steer readers to ISEER values, which is the more useful advice anyway. ClearBuy's specific thresholds are not repeated.
- Payback uses Down To Earth's averages and linear scaling from the 1,600-hour basis; the article says it's an approximation and that hot cities will see more use and a bigger gap.
- Category set to "reviews" per the queue row.
- Two Hindi transcripts (Keshav, Girish Shinde) compared by hand: they cover the 2026 change and EER vs ISEER in general terms; this article's label-to-bill method, payback table and checklist are our own.
- No images: real labels are model-specific and branded; a field-by-field table explains the label more clearly.

## Open items for the human reviewer

Things only the author can do: add a real first-hand observation where marked `<!-- AUTHOR: … -->`, confirm the category, decide on any borderline claim.

- AUTHOR note in the payback section.
- If BEE's 2026 threshold table can be obtained (Gazette S.O. 3984(E) or the beestarlabel schedule), consider adding it.
- Cross-link to the electricity bill draft (how-to-calculate-electricity-bill) once both are published.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 2 warn · run 2026-10-02 21:01 UTC

- Words: 1528 (≈8 min read) · H2 sections: 9 · images: 0 · FAQ: 5
- Citations: 6 external, 2 internal · independent source domains: 3
- Transcript overlap (3 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 2 transcript(s) are mostly non-Latin script (_source\XCxHyUTD_Hc, _source\YILZsm_A7V0); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
<!-- AUTO-AUDIT:END -->
