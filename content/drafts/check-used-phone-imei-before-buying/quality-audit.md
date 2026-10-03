# Quality audit: How to Check a Used Phone's IMEI Before You Buy It

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

- Originality: the English transcripts (Serg Tech, Repair My Mobile) show 0% 8-word overlap. The Hindi CyberSafe video was compared by hand; it corresponds only to the web-check step, with no wording carried over. The structure (IMEI matching, results table, account locks, legal section, meet-up order) is independent.
- Accuracy: rules come from the CEIR page, the Sanchar Saathi FAQ, Apple, Google and the bare acts. The red-warning wording, the district repair-shop guideline and the SIM-owner notices are attributed to the videos and flagged as unverified.
- The legal section is framed as information, with an explicit "not legal advice" line.
- Removed unsupported claims: "account locks catch more buyers than blacklists", and SMS charge details. The "no record" result label was softened, since the exact wording isn't documented.

## Issues found and fixes made

- The US-specific checks in the Serg Tech video (carrier finance status, US blacklist sites) were left out as irrelevant for India.
- The Trakin Tech Tamil captions were too fragmentary to use; kept only as a transcript for the audit.

## Open items for the human reviewer

- One `<!-- AUTHOR: … -->` note in the legal section. Add a real buying or selling experience, or delete it.
- Internal link to the "top 5 budget smartphones of 2026" guide: its title is year-pinned, so check it's still the right page to link.

<!-- AUTO-AUDIT:START -->
**Automated audit:** PASS_WITH_WARNINGS · 0 fail · 1 warn · run 2026-09-29 17:41 UTC

- Words: 1781 (≈9 min read) · H2 sections: 9 · images: 2 · FAQ: 5
- Citations: 6 external, 3 internal · independent source domains: 6
- Transcript overlap (4 transcript(s)): 0% of 8-word sequences · longest shared run: 0 words
- Editorial checklist: 27/27 ticked · AUTHOR notes open: 1
- Status set to DRAFT.

| Level | Area | Finding |
|---|---|---|
| WARN | originality | 1 transcript(s) are mostly non-Latin script (_source); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand |
| INFO | trust | 1 AUTHOR note(s) for the human reviewer to fill with real experience |
| INFO | trust | 4 UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty |
<!-- AUTO-AUDIT:END -->
