# TechPulzo — Forensic Content & Technical Audit

**Date:** August 16, 2026
**Scope:** Full site (production database, live techpulzo.in, and application source code)
**Purpose:** Establish ground truth before any AdSense-readiness remediation work begins. This is an audit only — no content, code, or configuration was modified in the course of producing this report.
**Prepared for:** Google AdSense readiness effort, following 5 prior rejections for "low value content."

---

## 0. Method note

This audit combines three independent data sources so findings are verifiable, not asserted:

1. **Direct production database query** (Railway Postgres, the live `DATABASE_URL`, cross-checked against `DOCUMENTATION.md`'s documented connection string) — the authoritative source for every post's real status, dates, author, category, tags, and full content, including scheduled and unpublished posts the public site never exposes.
2. **Live site verification** — `https://www.techpulzo.in/sitemap.xml`, `/robots.txt`, and rendered pages fetched directly, byte-for-byte, and cross-checked against the database (see §2).
3. **Source code review** — `src/app/**` and `src/components/**` read directly to confirm what the technical SEO layer (sitemap, robots, structured data, metadata) actually does, not what documentation claims it does.
4. **Full-text content review of all 137 articles** — every article's complete body content (stripped of markup) was read and independently assessed against a fixed rubric (originality, evidence, sources, first-hand experience, factual claims, AI-generic characteristics, duplication, cannibalization, quality score 1–10, recommended action). This was done in 12 batches to keep each read thorough; every one of the 137 posts received an individual assessment — none were sampled or skipped. Full per-article output is in [`/data/articles.csv`](../data/articles.csv).

Structural counts (word count, heading counts, image counts, FAQ counts) were computed programmatically by parsing the actual HTML, not estimated.

No claims below about specific articles are invented — each is traceable to a specific field in `articles.csv` or a specific file/line in the codebase.

---

## 1. Headline numbers

| Metric | Count |
|---|---|
| Total posts in database | **137** |
| Published (live, indexable) | **45** |
| Scheduled (future auto-publish) | **87** |
| Unpublished (pulled from a published/draft state) | **5** |
| Draft (never published) | **0** |
| Categories | 6 (Tech, Finance, Career, Reviews, Productivity, Tutorials) |
| Tags | 160 (90 of which are used on exactly one post) |
| Registered authors | 2 (only 1 has ever authored a post — see §5.1) |
| Sitemap URLs (live, verified) | **53** = 1 homepage + 1 `/search` + 45 articles + 6 categories |
| Author pages | **0** (no `/author/[x]` route exists) |
| Dedicated tag pages | **0** (tags link to `/search?q=`, not an indexable page) |
| Comments | 0 (table exists, nothing has ever been posted) |
| Series | 0 |

The sitemap was fetched live and parsed directly (53 `<loc>` entries, byte-counted) and matches the database's 45 `PUBLISHED` posts + 6 categories with at least one published post + homepage + `/search` exactly. **The sitemap and robots.txt are technically correct and match the database.** This rules out the class of bug the team previously suspected (see `DOCUMENTATION.md` §19 — a prior `NEXT_PUBLIC_SITE_URL`/`NEXTAUTH_URL` drift to a raw Railway hostname, already fixed) as the *current* cause of AdSense rejection. The problem, per this audit, is overwhelmingly content quality, not a live technical misconfiguration — though several smaller technical issues remain (§3).

---

## 2. Content quality — aggregate findings

Every one of the 137 posts was read in full and scored 1–10 against a skeptical rubric (1–3 thin/generic AI filler, 4–6 competent but unremarkable, 7–8 genuinely useful/specific, 9–10 exceptional). Full detail per article is in `articles.csv`; this section summarizes what that data shows.

### 2.1 Quality score distribution

| Score | Count |
|---|---|
| 2 | 2 |
| 3 | 6 |
| 4 | 28 |
| 5 | 59 |
| 6 | 37 |
| 7 | 5 |
| 8–10 | **0** |

**Average: 5.01 / 10.** Not one article — published, scheduled, or unpublished — scored in the "genuinely exceptional" range. The distribution is a tight bell curve centered on "competent but generic," which is itself a signature: genuinely varied human writing produces a wider spread. By status: Published avg **5.24**, Scheduled avg **5.01**, Unpublished avg **2.80** (the 5 unpublished posts are, correctly, the weakest on the site — see §2.5).

### 2.2 First-hand experience: effectively absent

- **4 of 137** articles (2.9%) show first-hand experience the reviewer judged "specific and plausible" — e.g. a WiFi-speed article with measured numbers ("bedroom at the far end gets 40 Mbps, living room ten feet from the router gets 300"), a resume/salary-negotiation article with a reproduced negotiation script and real rupee figures, and one describing using voice typing "while cooking, with flour on both hands."
- A further ~40 articles *claim* first-person experience but in a form the reviewers flagged as generic and unverifiable — recurring patterns like "a friend of mine asked me this exact question over chai," "my cousin," "a colleague," never named, never given a specific, checkable detail. Several of these use a hypothetical-example construction ("call your friend Aishwarya") that isn't actually a first-hand account at all.
- **The remaining ~90+ articles** are written in fully generic instructional/prescriptive voice with no personal claim whatsoever — including several where the topic obviously invites hands-on demonstration (earbuds buying guides with "no evidence the author ever tested a pair," a phone-speed-up guide with "no evidence of an actual device being tested," a WhatsApp-transfer tutorial with "no screenshots of the actual steps despite the topic being extremely screenshot-friendly").

This is the single most consequential finding for AdSense purposes: Google's own guidance (§6) treats demonstrated first-hand experience as a core signal separating people-first content from search-engine-first content, and on this measure the overwhelming majority of the site's content does not clear that bar.

### 2.3 Sources and citations: essentially absent

- **49 of 137** articles cite no source of any kind.
- **~80** cite something only as "generic mentions only" — real entity names (RBI, TRAI, Google, a bank, a named app) dropped in as background color with no link, no document, no data point actually pulled from them.
- **Only 7 of 137** were judged "named and specific" — e.g. one citing Apple's actual documented guidance on identical twins defeating Face ID and Android's `BiometricPrompt` security-class distinction, one citing CERT-In's actual regulation with its effective date, one directly naming the correct government portals (`incometax.gov.in`, UIDAI, NSDL/UTIITSL).

### 2.4 Structural uniformity (a bulk-production signature)

These are exact, programmatically measured counts across all 137 posts — not estimates:

| Structural feature | Finding |
|---|---|
| Word count | Min 807, max 1569, **average 1254, median 1199** — a strikingly narrow band across 137 articles spanning six unrelated categories (tech explainers, personal finance, career advice, product reviews) |
| H2 section count | Min 7, max 22, **average 14.6** for ~1200-word articles — roughly one new heading every 85 words |
| In-body images | **Exactly 1 per article, on every single one of the 137 posts**, no exceptions |
| FAQ blocks | **136 of 137** articles carry an FAQ section (avg 2.8 questions), regardless of whether the topic genuinely warrants one |
| Cover/OG image set | **2 of 137** |

The one-image-per-post finding turned out to have a specific cause worth noting accurately: it is not a missing feature, it's an auto-generated "key takeaways" summary graphic (Cloudinary-hosted, unique per article, with a descriptive alt attribute). That is a genuinely useful accessibility/skim feature and shouldn't be removed — but it is not a substitute for the contextual, topic-specific imagery a "top 5 smartphones" review or a step-by-step tutorial actually needs (product photos, screenshots, charts), and no article has any of that.

The near-identical word count band, near-identical heading density, near-universal FAQ block, and exactly-one-image-per-post pattern, taken together across 137 topically unrelated articles, is the clearest single piece of evidence that this content was produced by a template-driven pipeline rather than organic long-form writing that would naturally vary in length and structure by topic.

### 2.5 AI-generic characteristics actually found in the text

Reviewers were instructed to only report a characteristic if it was actually present in the article, not inferred from metadata. The most frequently recurring, independently-flagged patterns:

- **Formulaic H2 padding**: dozens of articles were flagged for far more sections than the topic needs — examples include a subscription-cancellation how-to with "16+ speculative 'what if' sections beyond the 5 core steps," a phone-backup guide with "19 H2 sections for a topic that needs roughly 6," and a Google Alerts tutorial flagged as "the most extreme case — 21 sections."
- **Recap-style / hedge-everything closers**: a recurring closing pattern that restates the thesis without adding information, flagged independently across multiple batches.
- **A recurring "X, not Y" sentence construction**, flagged as an overused tic across articles by different reviewers who had no visibility into each other's batches.
- **Promise/delivery mismatches**: e.g. an article titled around "how to set up parental controls" that a reviewer found delivers relationship advice with no actual setup steps.
- **Zero code in coding tutorials**: a "Learn Python in 30 days" post (unpublished) was flagged for containing no actual code despite being a programming roadmap.
- **Topic-agnostic genericness**: several articles were flagged as "could apply to any country's audience despite nominal India framing," or "could describe this topic in almost any month of 2024–2026 with no unique angle" — notable since the site's stated audience is specifically Indian readers.

### 2.6 A real factual/credibility error worth fixing before anything else

One **scheduled** article, `how-to-verify-a-company-is-real-before-accepting-a-job-offer`, states the government GST verification portal is at `services.gst.in`. The actual live domain is `services.gst.gov.in`. This is an article whose entire premise is teaching readers to detect fraudulent employers by checking official government portals — citing an incorrect government URL in that exact context is a genuine credibility risk, not a style nitpick, and should be corrected (and the correct URL verified against the live GST portal) before this article is ever published. This finding is flagged `MAJOR REWRITE` in the CSV pending that fix.

### 2.7 Where the content is genuinely good

To be balanced: a handful of articles cleared a meaningfully higher bar and should be used as the internal quality benchmark going forward, not rewritten:

- `why-your-wifi-feels-slow-in-certain-rooms-router-placement` (score 7) — includes a wall-material signal-loss comparison and specific measured Mbps numbers rather than generic "move your router" advice.
- `how-facial-recognition-unlock-actually-works-on-your-phone` (score 7) — cites Android's actual `BiometricPrompt` security-class distinction and Apple's documented identical-twins caveat.
- `how-your-phone-knows-your-location-even-with-gps-off` (score 7) — includes a correct India-specific detail (emergency-call location bypass for dialing 112) that generic versions of this topic omit.
- `how-autocorrect-actually-decides-what-you-meant-to-type` (score 7) — uses concrete contrasting example sentences and flags Hindi/regional-language code-switching, an India-specific detail a generic answer is unlikely to surface unprompted.
- `how-to-prepare-for-a-technical-interview-a-step-by-step-guide-for-freshers` (score 7) — sustains a genuine interviewer-perspective voice with a specific, non-obvious observation (candidates who talk through a partially-correct answer often score better than silent-but-correct candidates).

These score 7/10, not 9–10 — even the best content on the site is "good," not "exceptional" — but they demonstrate the site's own writer is capable of the specificity the rest of the catalog lacks. The fastest realistic path forward is closer to *this* bar, not a wholesale rewrite from zero.

---

## 3. Duplication and keyword cannibalization

This was checked two ways: (a) programmatic title-similarity clustering across all 137 titles, and (b) each reviewer cross-referencing their batch against the full 137-title master list.

- **25 articles** were flagged with likely direct content **duplication** with another specific article on the site.
- **94 articles** (69% of the catalog) were flagged with likely **cannibalization** — competing for the same search intent as another specific article without being an outright duplicate.

The clearest clusters (each already named to a specific counterpart slug in `articles.csv`):

| Cluster | Articles | Issue |
|---|---|---|
| "Best free AI tools" | `best-free-ai-tools-in-2026-complete-guide`, `best-free-ai-tools-that-will-save-you-10-hours-every-week` | Both unpublished; near-identical tool list (ChatGPT, Gemini, Canva, Perplexity, GitHub Copilot) |
| Salary negotiation | `how-to-negotiate-your-salary-in-india-what-actually-works` (published), `how-to-handle-a-counteroffer-from-your-current-employer`, `what-to-actually-negotiate-besides-salary-in-a-job-offer`, `how-to-ask-for-a-raise-without-a-new-offer-in-hand` (all scheduled) | Four separate articles competing for overlapping "salary negotiation India" intent |
| Notion comparisons | `notion-vs-google-docs-what-each-one-is-actually-built-for`, `notion-vs-google-keep-vs-obsidian-which-note-taking-app-should-you-use` | Both published; same Notion strengths/pricing covered against different but overlapping competitor sets |
| Forgotten subscriptions | `how-to-actually-cancel-a-subscription-you-forgot-you-had`, `five-recurring-charges-most-people-forget-to-cancel` | Same statement-scan / Play Store–App Store / UPI Autopay methodology, nearly point for point |
| Spam calls | `how-to-register-a-complaint-against-spam-calls-with-trai`, `how-to-stop-spam-calls-and-sms-on-an-indian-sim-the-settings-that-actually-help` | Both walk through the same DND/1909 registration process |
| Phone storage cleanup | `how-to-free-up-storage-on-your-phone-without-deleting-photos-you-want`, `digital-decluttering-how-to-clean-up-years-of-phone-photos-and-files` | Same core topic and approach |
| Credit score | `credit-score-in-india-how-it-works-and-how-to-fix-it` (published), `how-to-check-your-cibil-score-for-free-legally` (scheduled) | Overlapping "credit score India" intent |
| Resume screening | `how-to-write-a-resume-that-actually-gets-shortlisted` (published), `how-applicant-tracking-systems-actually-filter-resumes` (scheduled) | Significant overlap on getting past resume screening |

Publishing the scheduled half of these pairs as currently written would put the site in direct competition with itself for the same queries — the opposite of building topical authority. Google's own guidance on this (see §6) recommends consolidating overlapping pages into one comprehensive page rather than running several thin, competing versions.

---

## 4. Editorial authenticity signals

The user's brief is explicit that "manufacturing fake editorial activity" is out of scope to *do*, but *detecting whether it has already happened* is core to an honest audit — this determines what "genuine" would even mean going forward.

- **All 137 posts, published, scheduled, and unpublished, are authored by a single account** ("Muthu"). The second registered user ("Nithiyaraj," bio: "Influencer covering everyday tech and lifestyle topics") has never authored a post. The site's own copy claims content is "written by experts, for curious minds" (homepage hero) — for a single generalist author writing across smartphones, GST law, credit scoring, WiFi RF physics, database indexing, and career coaching, that claim is not well supported and is worth softening rather than defending.
- **123 of 137 posts (90%) were created within 5 minutes of the immediately preceding post**, by database timestamp. This is a strong bulk-generation signature — organic day-by-day writing does not produce this pattern.
- **87 posts are scheduled to auto-publish roughly one per day from August 15 through November 9, 2026** — nearly three months of daily-cadence future publication, despite the underlying articles having apparently been bulk-created together. Spreading bulk-created content across a manufactured daily publish schedule to *simulate* organic, steady output is precisely the kind of practice that should stop, independent of whether any individual article's content is otherwise acceptable. **This report is not recommending the current 87-post queue be published on this schedule as-is** — see §7.

None of this means the underlying facts in the articles are false (most factual claims checked out as accurate, if unsourced — see §2.3). It means the *production and publication pattern* itself doesn't yet reflect genuine, paced editorial activity, and that's worth being honest about internally even though it isn't something Google can directly observe from outside.

---

## 5. Technical SEO, structured data, and site architecture

### 5.1 Sitemap & robots.txt — correct

`src/app/sitemap.ts` and `src/app/robots.ts` were read directly and the live output verified byte-for-byte (§1). Both are correct: only `PUBLISHED` posts and categories with at least one published post are included; `/admin/` and `/api/` are disallowed; the sitemap is correctly referenced from robots.txt. No action needed here.

### 5.2 `/search` is indexable — should be noindexed

`/search` is included in `sitemap.xml` with priority 0.8 and carries no `noindex` directive (root `robots: { index: true, follow: true }` in `src/app/layout.tsx` applies site-wide, and `src/app/(public)/search/page.tsx` does not override it). Google's guidance explicitly discourages submitting internal search-results pages for indexing, since they're auto-generated, low-value landing pages from Google's perspective and can look like doorway pages at scale. **Recommendation:** add `robots: { index: false }` to the search page's metadata and drop `/search` from `sitemap.ts`.

### 5.3 Structured data — present but incomplete

`src/app/(public)/[slug]/page.tsx` correctly emits `BreadcrumbList` and `Article` JSON-LD on every article, plus conditional `FAQPage` (when `faqItems` exist — true for 136/137 posts) and `HowTo` (only when the content has literal "Step N:" headings, a sensible guard against over-claiming). Gaps:
- No `publisher` field on the `Article` schema (Google's Article guidelines recommend it).
- `author` is only `{ "@type": "Person", "name": ... }` — no `url` or `sameAs`, so there's no way for Google to connect the byline to any authoritative profile, which works against the E-E-A-T signal the site otherwise needs.
- No site-wide `Organization`/`WebSite` schema in the root layout.
- No `image` array with multiple sizes on `Article` (only a single `ogImage`/`coverImage`, and see §5.4 — that field is empty for 135/137 posts).

### 5.4 Images — the most concrete technical finding in this audit

- **Only 2 of 137 posts have a `coverImage` or `ogImage` set at all**, and both of those two are hotlinked to third-party domains the site doesn't control (`logicgate.com`, an `easebuzz` S3 bucket) rather than the site's own Cloudinary account (which is otherwise correctly configured and already used for the per-article "key takeaways" graphic — see §2.4).
- For the other 135 posts, `[slug]/page.tsx` conditionally skips the hero image entirely (`{post.coverImage && (...)}`) — there's no fallback, so the article page, and every `PostCard` thumbnail on the homepage/category/search grids, simply renders no image.
- The `og-default.png` referenced as the fallback Open Graph image in `layout.tsx` **returns HTTP 404 on the live site** (confirmed by direct request) — the file does not exist in `public/`. This means every article's social-share preview (Facebook, Twitter/X, WhatsApp, LinkedIn) is currently broken, not just generic.

This is a fully mechanical, zero-ambiguity fix (generate/set real cover images and add the missing default OG file) and arguably the highest-leverage item in this whole audit relative to effort required.

### 5.5 No author pages, no dedicated tag pages

There is no `/author/[id]` route — the only author-identifying surface is the `AuthorBio` component embedded at the bottom of each article and on `/about`. For a single-author site this is a defensible minimal choice, but it also means there's no page that consolidates the author's full body of work and credentials the way Google's "Who" test (§6) is looking for. Tags link to `/search?q=<tag>` rather than a real indexable tag archive — reasonable given the 160-tags-for-137-posts bloat (§1) would otherwise produce dozens of near-empty tag pages, a known thin-content pattern; this is a correct call already made in the code, not a gap.

### 5.6 About / Contact / Privacy / Disclosure — present and legitimate

All four pages exist, are reachable, and contain real, non-boilerplate-only content: `/about` pulls the actual founder's bio from the database rather than hardcoding it; `/contact` is a working form backed by `/api/contact`, plus a direct email; `/privacy` and `/disclosure` cover cookie/ad-consent, data retention, and affiliate-program disclosure in specific (not templated-empty) terms. No fabrication concerns here — these pages accurately describe the actual site.

---

## 6. Google policy basis for this audit

Per instruction, this section quotes only what Google has actually published — nothing here is inferred or assumed.

**Google Search Central — "Creating helpful, reliable, people-first content":**
- Self-assessment includes: *"Does the content demonstrate first-hand expertise and a depth of knowledge?"*, *"Does the content provide substantial value when compared to other pages in search results?"*, and the negative test — *"Is the content primarily made to attract visits from search engines?"*
- Explicitly lists as a warning sign: *"using extensive automation to produce content on many topics,"* *"summarizing what other people have to say without adding much value,"* and *"[content] created for search engines first, not people."*
- Frames evaluation around three questions: **Who** created this (clear authorship, background), **How** was it created (including transparency about AI/automation use), **Why** was it created (to help people vs. to manipulate rankings).
- Source: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

**Google Search Essentials — spam policies, "Scaled content abuse":**
- Defined as: *"many pages are generated for the primary purpose of manipulating search rankings and not helping users."* Explicitly includes *"generating numerous pages with generative AI tools lacking user value"* and combining/rewriting content from other sources *"without adding sufficient value."*
- Source: https://developers.google.com/search/docs/essentials/spam-policies

**Google AdSense — Program policies / content requirements:**
- Publisher content must be *"high-quality, original, and [designed to] attract an audience."*
- Source: https://support.google.com/adsense/answer/9724

Read against these three documents, the findings in §2–§4 (near-uniform structure, near-total absence of first-hand experience or citation, 90% of posts bulk-created within minutes of each other, 69% of the catalog competing with itself) line up closely with what Google itself describes as the failure mode — not because this report is asserting a violation, but because the *pattern* these documents describe as low-value is the same pattern this audit independently found by reading the content, before consulting the policy language.

---

## 7. Recommended actions — summary

Full per-article recommendation is in `articles.csv`. Site-wide counts:

| Action | Count | Meaning |
|---|---|---|
| IMPROVE | 62 | Usable core, needs real sourcing/specificity/trimming before or in addition to publication |
| HOLD FROM PUBLICATION | 26 | All SCHEDULED; do not let these auto-publish on their current date as-is |
| MERGE | 23 | Consolidate with a named counterpart article (see §3) rather than publishing both |
| KEEP | 17 | Meets the bar as-is (13 published, 4 scheduled) |
| MAJOR REWRITE | 8 | Core topic is sound but execution needs a ground-up rewrite (includes the GST URL error, §2.6) |
| REMOVE | 1 | `what-is-artificial-intelligence-simple-explanation-for-beginners` — textbook-generic, no unique value, recommend deleting rather than fixing |

**Immediate, low-effort, high-leverage fixes** (independent of any content rewrite):
1. Fix or replace `og-default.png` (currently 404 live) and set real, owned `coverImage`/`ogImage` values — currently 2/137.
2. Add `noindex` to `/search` and remove it from the sitemap.
3. Correct the GST portal URL in `how-to-verify-a-company-is-real-before-accepting-a-job-offer` before it ever publishes.
4. Pause the 87-post scheduled queue's auto-publish (or at minimum the 26 flagged `HOLD FROM PUBLICATION`) until each has been reviewed against the `IMPROVE`/`MERGE`/`MAJOR REWRITE` note in `articles.csv`.
5. Resolve the 8 MERGE clusters in §3 before their scheduled dates arrive, so the site doesn't launch two competing pages for the same query on the same week.

This report makes no changes and recommends none be made without separate, explicit sign-off — it is the ground-truth baseline for that decision, per the brief.

---

## Appendix: data files

- [`/data/articles.csv`](../data/articles.csv) — full 137-row inventory, one row per article, all fields specified in the brief (URL, Title, Author, Status, Publish/Scheduled Date, Category, Tags, Word Count, Main Topic, Search Intent, Content Type, Originality, Evidence, Sources, First-Hand Experience, Factual Claims, AI-Generic Characteristics, Potential Duplication, Potential Cannibalization, Quality Score, Recommended Action, Notes).
