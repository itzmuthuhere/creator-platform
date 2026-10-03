# Quality audit: Credit Card Loan Vs Personal Loan | Which one should you choose? | Advantages & Disadvantages

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

- FAIL fixed: there were too few source domains, so I added SBI Card's Flexipay terms, which give rate tiers by bureau score and are useful in their own right.
- Replaced an unsourced revolving-rate range with HDFC's MITC (3.75%/month on most variants).
- HDFC's pages disagree on the SmartEMI fee (₹999 web, ₹849 MITC, ₹249 for pay-in-parts from 1 Oct 2026). The article says so, and the calculation uses the conservative ₹999.
- SmartEMI pre-closure (3%) is confirmed from the MITC.
- GST at 18% on card EMI interest is assumed from HDFC's "EMI plus GST" wording plus the standard rate. Personal loan interest isn't charged GST in the calculation.
- The Hindi transcript (Money9) was compared by hand. Only the credit-history point is used, and it's attributed.
- Depth WARN: about 1,300 words covers the decision, and the minimum-due draft covers revolving in depth.
- Visuals WARN: there are no images. Tables carry the comparison.

## Open items for the human reviewer

Things only the author can do: add a real first-hand observation where marked `<!-- AUTHOR: … -->`, confirm the category, decide on any borderline claim.

- AUTHOR note: the card EMI rate the author was actually offered.
- Confirm GST treatment: 18% on card EMI interest, and no GST on personal loan interest.
- Rates are dated Sep 2026 (HDFC) and Jun 2026 (SBI Card terms). Refresh them at publication.
- Cross-link credit-card-minimum-due-cost and credit-utilisation once they're published.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 2 warn · run 2026-10-03 07:03 UTC

- Words: 1254 (≈7 min read) · H2 sections: 8 · images: 0 · FAQ: 5
- Citations: 7 external, 2 internal · independent source domains: 3
- Transcript overlap (2 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 1 transcript(s) are mostly non-Latin script (_source\DKPnLGNqi8s); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
<!-- AUTO-AUDIT:END -->
