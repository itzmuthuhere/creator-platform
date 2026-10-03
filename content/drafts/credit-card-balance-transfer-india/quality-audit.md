# Quality audit: Credit Card Balance Transfer | How To Transfer My Credit Card Balance | Credit Cards

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

- FAIL fixed: there were too few source domains, so I added Axis Bank's charges guide, which supports the 1–2% BT fee range used in the example.
- The 11-word shared run with BankBazaar (definition sentence in the FAQ) was rephrased.
- BankBazaar's "paid by demand draft" step is outdated. The article uses SBI Card's NEFT process.
- The SBI BT on EMI T&C PDF shows older (Dec 2024) rates. The current web page rates (Oct 2026) were used.
- Fixed a wrong internal link (it pointed a "card EMI vs personal loan" mention at the credit-score article). It's now plain text plus an AUTHOR note.
- Assumptions are labelled: 2% one-time BT fee, and GST on BT EMI interest.
- The Hindi transcript (Card Buddhi) is cited only as a pointer to the booking flow.
- Visuals WARN: there are no images. Tables carry the comparison, and the issuer pages need a login to show the booking screens.

## Open items for the human reviewer

Things only the author can do: add a real first-hand observation where marked `<!-- AUTHOR: … -->`, confirm the category, decide on any borderline claim.

- AUTHOR notes: (1) personal experience of the interest-free catch; (2) link to the card EMI vs personal loan draft once it's published.
- Check whether other issuers (HDFC, ICICI, Axis) also remove the interest-free period on purchases during a one-time BT. The article attributes it to SBI Card only.
- Confirm SBI Card's one-time BT processing fee (not shown on its page).

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 3 warn · run 2026-10-03 07:06 UTC

- Words: 1193 (≈6 min read) · H2 sections: 8 · images: 0 · FAQ: 5
- Citations: 8 external, 1 internal · independent source domains: 3
- Transcript overlap (3 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 2
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | depth | 1193 words: fine only if the topic is narrow and fully covered |
| WARN | originality | 1 transcript(s) are mostly non-Latin script (_source\7eJxomiP3v4); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 2 AUTHOR note(s) for the human reviewer to fill with real experience |
<!-- AUTO-AUDIT:END -->
