# Quality audit: सावधान! Credit Card का Minimum Due आपको कंगाल बना देगा! | Debt Trap | Zee Business

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

- Hindi/Tamil transcripts compared by hand: the article's structure (formula → cost → part-payment trap → what the minimum protects → way out) follows none of the videos; examples are our own simulations; Roongta's advice and Stewart's study are attributed.
- Corrected Finance Samjho's "RBI rule" for the minimum: RBI only bans negative amortisation and capitalising unpaid charges; formulas are issuers' own (HDFC and SBI Card MITCs quoted).
- Verified the "~20 years" and "double the minimum ≈ 4 years" claims by simulation (22.2/16.6 years; 5.4/4.8 years).
- Removed a ₹200 HDFC floor that came from an aggregator snippet and isn't in the September 2026 MITC; the simulation's ₹200 floor is now labelled as our assumption.
- Did not use the video's Indian card-market statistics or Stewart's specific percentages (not verified), or aggregator personal-loan rate ranges.
- Removed "reward points are reversed" (not seen on HDFC's page); softened two sentences that attributed intent or overstated the study.
- Opened the Upstox article before citing it.
- Visuals: no screenshot. The best candidate (HDFC SmartEMI rate table) sits behind a tab the capture script can't open, and the other key sources are PDFs. The two tables in the article carry the information.
- Remaining warning: non-Latin transcripts, handled above.

## Open items for the human reviewer

- One AUTHOR note: a real surprise interest charge, if you've had one.
- HDFC SmartEMI rates quoted are for April–June 2026; check the current quarter's figures on hdfc.bank.in/smartemi before publishing.
- Category: finance.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 2 warn · run 2026-10-02 09:30 UTC

- Words: 1933 (≈10 min read) · H2 sections: 7 · images: 0 · FAQ: 5
- Citations: 5 external, 2 internal · independent source domains: 5
- Transcript overlap (3 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 3 transcript(s) are mostly non-Latin script (_source, _source\biyG_Ius2tQ, _source\Sm4Bz8KK-94); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
| INFO | trust | 3 UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty |
<!-- AUTO-AUDIT:END -->
