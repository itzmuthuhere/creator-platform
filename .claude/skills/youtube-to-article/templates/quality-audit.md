# Quality audit: {{WORKING_TITLE}}

## Editorial review

Tick each item only after checking it against the draft. Leave a one-line note on anything borderline.
`audit-draft.mjs --finalize` refuses to mark the draft DRAFT while any box below is unticked.

### Originality
- [ ] This is substantially more than a rewritten transcript: the structure, examples and explanations are my own
- [ ] Independent research contributed information the video does not contain (see research.md §6)
- [ ] The article stands alone; a reader never needs to watch the video
- [ ] The creator's phrasing and style are not imitated; any quote is short and attributed

### Accuracy
- [ ] Every important factual claim is VERIFIED or CORRECTED in the claims ledger
- [ ] Anything time-sensitive (prices, versions, limits, rules) was checked against a current source and dated ("as of …")
- [ ] Statistics link to the original source, not a blog repeating them
- [ ] Unverifiable points were cut or stated with clear uncertainty

### Usefulness
- [ ] The reader leaves able to do or decide something
- [ ] At least one concrete worked example (numbers, a real config, a realistic scenario)
- [ ] Hard concepts are explained in plain language before jargon is used
- [ ] Every section answers a real reader question; no filler sections

### SEO
- [ ] Title and H1 match what someone would search, and read naturally
- [ ] Heading hierarchy is logical (one H1, H2 sections, H3 only under H2)
- [ ] Keywords appear where they fit naturally; no stuffing
- [ ] FAQ questions are ones people actually ask, and answers aren't repeats of the body

### Readability
- [ ] Short paragraphs, varied sentence length, simple words
- [ ] Lists and tables used only where they help
- [ ] No stock AI phrasing (checked by the script) and no "X isn't Y — it's Z" habit

### Visuals
- [ ] Each screenshot shows what its caption says, with no cookie banners, logins or personal data
- [ ] Every image has descriptive alt text and a caption
- [ ] Images sit next to the step or idea they illustrate

### Trust
- [ ] No invented personal experience, tests, or anecdotes
- [ ] Every source in sources.md was actually opened; no invented citations
- [ ] Opinions are labeled as opinions and attributed

### Monetization safety
- [ ] Not thin, not a transcript republish, not a listicle of well-known things
- [ ] No misleading claims, clickbait title, or spammy SEO patterns

## Issues found and fixes made

-

## Open items for the human reviewer

Things only the author can do: add a real first-hand observation where marked `<!-- AUTHOR: … -->`, confirm the category, decide on any borderline claim.

-

<!-- AUTO-AUDIT:START -->
(run `node .claude/skills/youtube-to-article/scripts/audit-draft.mjs <draft-dir>` to fill this section)
<!-- AUTO-AUDIT:END -->
