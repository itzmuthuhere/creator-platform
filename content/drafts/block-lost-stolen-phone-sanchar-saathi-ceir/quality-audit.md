# Quality audit: How to Block a Lost or Stolen Phone in India with Sanchar Saathi (CEIR)

## Editorial review

Tick each item only after checking it against the draft. Leave a one-line note on anything borderline.
`audit-draft.mjs --finalize` refuses to mark the draft DRAFT while any box below is unticked.

### Originality
- [x] This is substantially more than a rewritten transcript: the structure, examples and explanations are my own
  - Note: the "first hour" list follows the same broad order as the Technoside video (locate, lock, erase, SIM, police, CEIR), because the process forces that order. The reasons for each step, the money step, the erase trade-off, the mechanism section, the data section and the corrections are independent.
- [x] Independent research contributed information the video does not contain (see research.md §6)
- [x] The article stands alone; a reader never needs to watch the video
- [x] The creator's phrasing and style are not imitated; any quote is short and attributed
  - Note: the transcripts are Hindi, so the automated overlap check could not compare them. Checked by hand: no translated passages; creators' experiences are paraphrased briefly and attributed by channel name.

### Accuracy
- [x] Every important factual claim is VERIFIED or CORRECTED in the claims ledger
- [x] Anything time-sensitive (prices, versions, limits, rules) was checked against a current source and dated ("as of …")
  - Statistics dated 24 September 2026; Find Hub rename reflected.
- [x] Statistics link to the original source, not a blog repeating them
- [x] Unverifiable points were cut or stated with clear uncertainty
  - Dual-IMEI status (ledger 7), unblock reasons (11), 24–48 h unblock time (12) and why IMEI is optional (25) are all hedged and attributed in the text.

### Usefulness
- [x] The reader leaves able to do or decide something
- [x] At least one concrete worked example (numbers, a real config, a realistic scenario)
  - State recovery table with calculated ratios; field-by-field form guidance.
- [x] Hard concepts are explained in plain language before jargon is used
- [x] Every section answers a real reader question; no filler sections

### SEO
- [x] Title and H1 match what someone would search, and read naturally
- [x] Heading hierarchy is logical (one H1, H2 sections, H3 only under H2)
- [x] Keywords appear where they fit naturally; no stuffing
- [x] FAQ questions are ones people actually ask, and answers aren't repeats of the body
  - The FAQ repeats a few facts from the body by design (FAQ is shown separately on the site), but each answer is phrased for the standalone question.

### Readability
- [x] Short paragraphs, varied sentence length, simple words
- [x] Lists and tables used only where they help
- [x] No stock AI phrasing (checked by the script) and no "X isn't Y — it's Z" habit

### Visuals
- [x] Each screenshot shows what its caption says, with no cookie banners, logins or personal data
  - All three are of blank public forms and pages, viewed after capture.
- [x] Every image has descriptive alt text and a caption
- [x] Images sit next to the step or idea they illustrate

### Trust
- [x] No invented personal experience, tests, or anecdotes
- [x] Every source in sources.md was actually opened; no invented citations
  - Sources first seen only in search summaries were opened before ticking this; three that could not be opened (PIB, DD News, Business Standard) were removed and listed under "Could not access".
- [x] Opinions are labeled as opinions and attributed
  - The police follow-up explanation of state differences is labeled as our inference.

### Monetization safety
- [x] Not thin, not a transcript republish, not a listicle of well-known things
- [x] No misleading claims, clickbait title, or spammy SEO patterns

## Issues found and fixes made

- Videos imply the IMEI is mandatory; the official pop-up says "if available". The article corrects this.
- Videos call Google's tool "Find My Device"; it is now Find Hub. Updated.
- The portal's "recovery percentage" is recovered ÷ traced, which is easy to misread. The article explains it and gives recovered ÷ blocked.
- The Jio helpline number came from a search summary and isn't on the page opened. Removed.
- The IMEI penalty was first sourced to a news report that blocks automated access. Replaced with the Act's text.
- The device-information section of the form couldn't be screenshotted cleanly (the pop-up's overlay covers it in a full-page capture). It is described in text instead.
- The audit script originally reported 0% overlap for non-Latin transcripts without warning. The script now flags this.

## Open items for the human reviewer

- Two `<!-- AUTHOR: … -->` notes: the opening (any real experience of a lost phone), and the prevention list (where you saved your own IMEIs). Fill them with real detail, or delete them.
- Category set to `tech`. Confirm.
- Screenshots need uploading to the site's image host when publishing.
- The statistics are a snapshot (24 Sep 2026). Refresh the table if publishing much later.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 1 warn · run 2026-09-29 17:32 UTC

- Words: 2792 (≈14 min read) · H2 sections: 11 · images: 3 · FAQ: 5
- Citations: 16 external, 2 internal · independent source domains: 11
- Transcript overlap (4 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 2
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 4 transcript(s) are mostly non-Latin script (_source, _source\765e2cYCQEY, _source\nnymQpSBybk, _source\TFv2tE_2gik); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| INFO | trust | 2 AUTHOR note(s) for the human reviewer to fill with real experience |
| INFO | trust | 4 UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty |
<!-- AUTO-AUDIT:END -->
