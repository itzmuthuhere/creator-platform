# Quality audit: New UPI Charges 2026 | UPI Transaction Limits & MDR Rules Explained

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

- Corrected the Aadi Singh video's "no server issues" claim: RBI says Lite is offline only in that no extra authentication is needed; it still runs on UPI.
- Left out two Asset Yogi claims not in the NPCI FAQ summary: the 40/30/20/10 revenue split and the exemption for autopay mandates.
- Used SCC Online's ">95% of volume" figure instead of the video's "96%".
- Angel One's article on transfer-out quotes pre-December-2024 limits; used only for the transfer-out feature, with RBI's framework for limits.
- Softened "many banks cap new payees" to "some banks", since it wasn't verified.
- Reduced the exact keyword from 20 to 17 uses.
- Hindi transcript (Debdutta Tech): a short setup walkthrough; compared by hand. This article's limits table, MDR table and examples are our own.
- No images: app screens would show account details, and NPCI's own pages returned 404; the tables do the work.

## Open items for the human reviewer

Things only the author can do: add a real first-hand observation where marked `<!-- AUTHOR: … -->`, confirm the category, decide on any borderline claim.

- AUTHOR note in "When UPI Lite is worth using".
- The MDR rules come from SCC Online's summary of NPCI's FAQs; try to link NPCI's FAQ PDF directly before publishing, and check nothing changed after 15 October 2026.
- If publishing after 15 October, change "starts on" wording to "has applied since".

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 2 warn · run 2026-10-02 20:53 UTC

- Words: 1542 (≈8 min read) · H2 sections: 8 · images: 0 · FAQ: 5
- Citations: 4 external, 2 internal · independent source domains: 4
- Transcript overlap (3 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 1 transcript(s) are mostly non-Latin script (_source\PyiSze0WPYo); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
| INFO | trust | 2 UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty |
<!-- AUTO-AUDIT:END -->
