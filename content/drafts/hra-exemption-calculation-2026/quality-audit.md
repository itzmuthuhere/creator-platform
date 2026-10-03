# Quality audit: New HRA Rules 2026: 4 New Cities Added to 50% Exemption List!

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

- Removed an unsupported claim ("under about ₹1.5 lakh the new regime usually wins"). It's replaced with a general statement in line with the break-even work in the old-vs-new draft.
- Archit's "Rule 279" couldn't be verified, so it's not used. The rule changes are cited to KPMG.
- All the examples were recomputed in scripts/research/hra-exemption-math.py.
- Cut the "actually" overuse (style WARN).
- The Hindi transcripts (Archit, Dwivedi) were compared by hand. Only Archit's point linking the disclosure to the notices is used, and it's attributed. The Dwivedi lecture contributed nothing specific.
- This draft is distinct from old-vs-new-tax-regime-2026-27. It uses different examples (Anita/Karthik, not Renter A/B) and focuses on the calculation and paperwork, not the regime choice.
- Visuals WARN: there are no images. A table carries Example 1, and there's no public page worth capturing.

## Open items for the human reviewer

Things only the author can do: add a real first-hand observation where marked `<!-- AUTHOR: … -->`, confirm the category, decide on any borderline claim.

- AUTHOR note: what the reader's employer's 2026-27 declaration asked for.
- Check the part-year "period of rented accommodation" principle against the Income-tax Rules 2026 HRA rule text. It's well established under the 1962 rules (Rule 2A), but the 2026 wording wasn't opened.
- Check the "rent to spouse not allowed" claim. It rests on ClearTax and case law and isn't a statutory bar.
- Cross-link old-vs-new-tax-regime-2026-27 once it's published (it's the natural next read).

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 2 warn · run 2026-10-03 06:41 UTC

- Words: 1222 (≈7 min read) · H2 sections: 9 · images: 0 · FAQ: 5
- Citations: 6 external, 1 internal · independent source domains: 4
- Transcript overlap (3 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 2 transcript(s) are mostly non-Latin script (_source, _source\px_zEqB3E3Q); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
| INFO | trust | 1 UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty |
<!-- AUTO-AUDIT:END -->
