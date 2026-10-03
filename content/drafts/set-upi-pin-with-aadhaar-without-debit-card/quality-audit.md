# Quality audit: Set or Reset Your UPI PIN with Aadhaar

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

- Originality: two English transcripts (0% overlap); the Hindi and Tamil ones were compared by hand. The structure (prerequisite checks, OTP-source table, face-auth route, lockout, safety) is independent of the videos' tap-by-tap flows.
- Accuracy: NPCI's own pages weren't retrievable (404 after its site restructure), so the official facts come from ICICI Bank's FAQ and two national news reports of NPCI's Oct 2025 announcement. The two-OTP flow, 4/6-digit PIN, one PIN across apps, and the BOI outage are described as what the apps and videos show, and hedged.
- Visuals: no screenshots. The flow runs inside phone apps, which can't be captured here, and no public official web page shows it. Replaced with a step table and a troubleshooting table.

## Issues found and fixes made

- Softened two statements that rested on weaker sources.
- None of the videos mention face authentication (Oct 2025); added.

## Open items for the human reviewer

- One `<!-- AUTHOR: … -->` note (setting a PIN for a relative).
- Screenshots: if you're comfortable, 2–3 phone screenshots of the Reset UPI PIN screen in your own app (with account numbers hidden) would help a lot here.
- Check whether face authentication is live in PhonePe/GPay/Paytm for your bank before publishing, and name the apps if it is.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 2 warn · run 2026-09-29 18:00 UTC

- Words: 1310 (≈7 min read) · H2 sections: 7 · images: 0 · FAQ: 5
- Citations: 3 external, 1 internal · independent source domains: 3
- Transcript overlap (4 transcript(s)): 0.08% of 8-word sequences · longest shared run: 8 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 2 transcript(s) are mostly non-Latin script (_source\KxeaMzqInhU, _source\W9inBeR_k3I); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| WARN | visuals | no images; fine only if nothing visual would help, so say why in the editorial notes |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
| INFO | trust | 5 UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty |
<!-- AUTO-AUDIT:END -->
