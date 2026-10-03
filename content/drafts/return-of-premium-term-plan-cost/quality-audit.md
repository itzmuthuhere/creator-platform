# Quality audit: Term Life Insurance with REFUND OPTION | Everything You Need to Know | Zero Cost Term Plan | Ditto

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

- CORRECTED the Ditto video's GST point: individual life insurance has been GST-exempt since 22 Sep 2025 (PIB).
- Rejected outdated (2019) and inconsistent (Bajaj illustration) premium examples. Ditto's Sep 2026 quotes are used, and the IRR was recomputed (scripts/research/trop-irr-math.py).
- The video's "70–100% higher" figure wasn't used, because the 2026 quotes show 139–166%.
- The surrender point is kept general, since the Oct 2024 surrender rule sources covered endowment plans, not TROP.
- Depth WARN: about 1,050 words covers the decision fully.
- The Hindi transcript is cited only for the general conclusion.
- Visuals WARN: there are no images. Tables carry the numbers.

## Open items for the human reviewer

Things only the author can do: add a real first-hand observation where marked `<!-- AUTHOR: … -->`, confirm the category, decide on any borderline claim.

- AUTHOR notes: (1) pitch experience; (2) link to the term-cover draft once it's published.
- The IRR assumes regular pay to 65 and a level premium. Limited-pay TROP variants would give a different IRR. Consider a note if publishing.
- Check the 10(10D)-equivalent conditions under the Income-tax Act 2025 before stating tax treatment more precisely.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 3 warn · run 2026-10-03 07:20 UTC

- Words: 1043 (≈6 min read) · H2 sections: 7 · images: 0 · FAQ: 5
- Citations: 6 external, 1 internal · independent source domains: 3
- Transcript overlap (2 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 2
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | depth | 1043 words: fine only if the topic is narrow and fully covered |
| WARN | originality | 1 transcript(s) are mostly non-Latin script (_source\1-x5wIc-D5o); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 2 AUTHOR note(s) for the human reviewer to fill with real experience |
<!-- AUTO-AUDIT:END -->
