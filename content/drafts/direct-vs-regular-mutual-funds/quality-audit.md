# Quality audit: Direct vs Regular Mutual funds: How expense ratios impact returns

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

- Hindi transcript (Kathuria) compared by hand: the article doesn't follow his why/when/how/cost structure, his apple-seller analogy or his examples; only his staged-switch idea is used, credited by name, and given new worked numbers.
- The videos' "about 1%" gap was replaced with a measurement of AMFI's September 2026 TER data (1,671 schemes): active equity is typically 1.1–1.25 points, index funds ~0.5, liquid ~0.1. The worked examples were redone with the measured gaps.
- Corrected the videos' exit-load claim (removed for regular→direct switches from 21 Apr 2025; HDFC MF addendum citing AMFI).
- Zerodha's ₹1.09 cr vs ₹95 lakh figures don't reproduce under either compounding convention; the article says so and uses its own calculation, which confirms the ~₹13–15 lakh gap.
- Cut three unsourced sentences: "bank apps mostly sell regular plans", "a one-time plan costs a small fraction of the cap", and a demat/broking-arm caveat in the FAQ.
- Removed "CAS shows the ARN code" (not confirmed in a source I opened); confirmed the 1 Jan 2013 start date in para N of SEBI's 2012 circular.
- Rephrased one "X is not Y; it is Z" sentence in the regular-plan section.
- Screenshot 01 recaptured at a wider viewport because AMFI's floating chat buttons covered part of one line.
- Internal links added after the first audit showed none.
- Remaining warning: the non-Latin transcript overlap check can't run automatically; handled by the manual comparison above.

## Open items for the human reviewer

- Two AUTHOR notes: (1) the commission figure on your own CAS, (2) the route and time if you've switched a folio yourself.
- The TER table is a snapshot (last day of September 2026). If publishing much later, rerun `node scripts/research/amfi-ter-gap.mjs <MM-YYYY> data/research/amfi-ter-gap-<MM-YYYY>.json` (about 30 minutes, ~610 requests) and `node scripts/research/amfi-ter-gap-groups.mjs <file>`.
- Tax figures are for FY 2026-27 from AMC explainers (incometaxindia.gov.in blocks automated access). If you can, glance at the Income Tax Department's capital-gains page to confirm nothing changed.
- Category check: filed under finance.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 1 warn · run 2026-10-02 07:58 UTC

- Words: 2744 (≈14 min read) · H2 sections: 8 · images: 1 · FAQ: 5
- Citations: 15 external, 2 internal · independent source domains: 11
- Transcript overlap (3 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 2
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 1 transcript(s) are mostly non-Latin script (_source\tmHJEUo68ro); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| INFO | trust | 2 AUTHOR note(s) for the human reviewer to fill with real experience |
| INFO | trust | 1 UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty |
<!-- AUTO-AUDIT:END -->
