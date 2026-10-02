# Writing and SEO

Also read `.claude/skills/write-blog-article/references/voice-and-quality-guide.md`. It records what got this site's articles flagged as low-value (aggregator framing, templated openings and closings, "actually" overuse, "X isn't Y — it's Z"). All of it applies here, **with one deliberate exception**: that guide asks for first-person anecdotes from the author personas. This skill never writes them, because they would be invented. Instead, leave an `<!-- AUTHOR: … -->` note where a real first-hand detail would help, and the human adds it during review (see "First-hand experience" below).

## Pick the angle before the outline

The video's angle is rarely the best article angle. Ask:

- What is the reader trying to do or decide when they search this?
- What do the current top results get wrong or leave out? (Check them.)
- What did research turn up that the video doesn't have: a correction, a current number, an Indian specific, a mechanism, a worked calculation?

The site's articles that survived review explain a mechanism, do real math, or take a specific, defended position. "N things about X" does not.

## Structure follows intent

| Intent | Shape that usually works |
|---|---|
| "What is / how does X work" | Plain-language answer first → mechanism, step by step → worked example → where it breaks / limits → FAQ |
| "How to do X" | What you need → numbered steps with screenshots → verify it worked → common mistakes → troubleshooting |
| "X vs Y" / "should I" | Short verdict by situation → comparison table on the criteria that matter → worked scenarios → who should pick which |
| "Why is my X doing Y" | Most likely causes, ranked → how to tell which one you have → fixes → when it's hardware / call support |
| Money decision | The real numbers → a worked calculation with Indian figures → hidden costs → rule of thumb, with its limits |

Don't reuse one skeleton across articles. The value-expansion menu (beginner explanation, context, steps, examples, pros/cons, mistakes, tips, alternatives, comparison, FAQ, troubleshooting, advanced) lists options, not required sections. Include a section only when it answers a question a reader of this article has.

## Adding value beyond the video

Aim for at least three of these in every article:

- a worked example with real numbers or a real configuration
- a correction or update to something the video says
- official documentation the video doesn't reference
- India-specific details
- common mistakes (from support docs, forums, issue trackers)
- a comparison table on criteria that matter
- troubleshooting for the things that go wrong
- a deeper "how it works" section than the video attempts
- an honest limitations section

## Writing

- Open with the answer or the useful fact, not a warm-up. Vary opening moves between articles.
- Explain a term in plain words the first time it appears.
- Short paragraphs (2–4 sentences); vary sentence length.
- Prefer a concrete example to an abstract statement.
- Tables for comparisons; numbered lists for real sequences; prose for reasoning.
- The audit fails on: "let's dive in", "in today's digital world", "whether you're a beginner or an expert", "this comprehensive guide", "without further ado", "in conclusion,", "it's important to note that", and similar. Don't reword them into near-synonyms either; cut the move entirely.
- Don't imitate the creator's voice or catchphrases, and don't follow the video's order section by section.
- Refer to the video rarely: once as a credited source is normal; "in the video, he says…" repeatedly means the article is leaning on it.
- Quotes: only when the exact wording matters, under ~25 words, attributed, as a blockquote or in quotation marks.
- Close on something specific to this article. No generic "Conclusion" heading, and not a closing heading reused from another article on the site.

## First-hand experience

Never write "I tested", "in my experience", "my phone", or "a colleague told me" unless it really happened. The audit fails those phrases unless `metadata.firstHandNotes` (filled in by the human author) says what the real experience was.

Two honest alternatives:

1. **Things you verified during this session.** If you ran a command, used a public calculator, or checked a live page, describe it neutrally: "Running `nslookup` against 1.1.1.1 returns…", "NPCI's limits page (checked September 2026) lists…".
2. **AUTHOR notes.** Where a personal detail would strengthen the piece, leave a specific suggestion:
   `<!-- AUTHOR: If you've done this on your own Jio/Airtel connection, add one sentence on the speed difference you saw. -->`
   The audit counts these and lists them as open items for the reviewer. Aim for 1–3 well-placed ones.

## SEO

Human-first. The audit's SEO checks are guardrails, not a formula.

- **Primary keyword:** the phrase the target reader would type. Check it against search suggestions, not guesswork. One per article.
- **Secondary keywords:** 3–8 related phrasings and subtopics that the article really covers.
- **Search intent:** informational / how-to / comparison / decision / troubleshooting. The structure must match it.
- **Title / H1:** natural, specific, and promises what the article delivers. Avoid the site's overused "actually / the real" formula and numbered-listicle titles.
- **SEO title:** ≤ 60 characters, keyword near the front.
- **Meta description:** 110–160 characters, says what the reader will learn, includes the keyword naturally.
- **Slug:** short kebab-case, keyword-led, no dates or stop-word padding (`upi-transaction-limits`, not `what-are-the-upi-transaction-limits-in-india-2026`).
- **Headings:** one H1; H2 per real section; H3 only inside H2s. Headings describe content ("Why 5 GHz drops through walls"), not "Introduction" / "Overview".
- **Keyword use:** in the H1 or SEO title, the first ~150 words, one or two H2s where it fits, and the meta description. Nowhere forced. The audit warns about stuffing.
- **FAQ:** 3–7 questions people ask (from search suggestions and "People also ask"), each an H3 ending in "?", with a 40–120 word answer that adds something beyond the body. The audit copies them into `metadata.faq` for the site's FAQ component.
- **Internal links:** 2–4 links to related, published articles, using only URLs `library.mjs check` printed. Descriptive anchor text.
- **External links:** to the specific primary source for each key claim.
- **Category:** one of the site's live categories: `tech`, `finance`, `reviews`.
