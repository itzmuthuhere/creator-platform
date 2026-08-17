# TechPulzo — Truthful Editorial & Author Architecture

**Date:** August 16, 2026
**Scope:** Author/editorial identity only — who TechPulzo says is behind its content, and what process it claims that content goes through.
**Constraint (explicit, from brief):** No invented authors, identities, credentials, biographies, or profile photos. No claiming multiple writers exist if they don't.
**Action taken:** None. This is a design and audit document. No code, database row, or page copy was changed in producing it.
**Inputs used:** Direct inspection of `prisma/schema.prisma`, `src/lib/auth.ts`, `src/app/(public)/about/page.tsx`, `src/app/(public)/[slug]/page.tsx`, `src/components/posts/AuthorBio.tsx`, `src/components/admin/ProfileForm.tsx`, `DOCUMENTATION.md`, and the findings already established in [`01-forensic-audit.md`](01-forensic-audit.md) §4 and §5.1 (not re-derived — cited where used).

---

## 0. Who is actually available to TechPulzo

This is not a hypothetical staffing exercise — it's a read of the real `User` table via the app's own account system. `src/lib/auth.ts` gates sign-in to a hard-coded allow-list (`ADMIN_EMAIL`), so "who *can* be a contributor" is a closed, known set of exactly two email addresses (`DOCUMENTATION.md` §3, §16):

| # | Email | Name on record | Account role | Has ever authored a post? |
|---|---|---|---|---|
| 1 | rajamuthu107@gmail.com | Muthu Raja (Muthuraja) | Founder / builder of the site | **Yes — all 137 posts in the database** (01-forensic-audit.md §4) |
| 2 | nithiyaraj17081998@gmail.com | Nithiyaraj | Registered admin account | **No — zero posts** (01-forensic-audit.md §4) |

There is no third person. There is no editorial staff, no freelance pool, no agency. The `User` model (`prisma/schema.prisma:36-52`) has no fields for job title, publication history elsewhere, certifications, or years of experience — whatever authority an author page claims has to come from what's actually true of these two people, not from a schema that happens to have a `bio` field.

### 1.1 Contributor 1 — Muthu Raja

| Field | Determination | Basis |
|---|---|---|
| Name | Muthu Raja | `DOCUMENTATION.md` §1; matches account email |
| Actual role | Founder, sole writer, sole editor, sole publisher of TechPulzo | Every post in the DB has this one `authorId` (01-forensic-audit.md §4) |
| Day-job / real credential | Java developer, Bank of America | `DOCUMENTATION.md` §1 — a genuine, verifiable professional credential, but it's a *software engineering* credential |
| Topics he can legitimately claim domain expertise in | Software/backend development, and by extension general consumer tech literacy (apps, devices, how software works) | Follows directly from the day job; nothing else in the record supports a professional claim |
| Topics he writes about but has **no** demonstrated professional credential for | Personal finance, tax/legal procedure (GST, PAN, IT Act), career coaching, biometrics/security research, productivity psychology | Cross-referencing `articles.csv` categories against the one credential on record — this is the gap the current "written by experts" claim (see §3) papers over |
| First-hand experience — can he legitimately claim it? | **Only when he actually did the thing and it shows in the text.** The audit found this true for 4 of 137 articles (measured Wi-Fi Mbps numbers, a reproduced salary-negotiation script, voice-typing "with flour on both hands") — 01-forensic-audit.md §2.2. For the other ~133, no. | Per-article, not blanket |
| Can he fact-check his own work? | He can verify claims against primary sources (government portals, vendor docs, RBI circulars) before publishing — that's a real, doable step. He **cannot** provide *independent* fact-checking, because independence requires a second person, and there isn't one. | Structural, not a skill gap |
| Can he review/edit his own work? | Same limitation: he can do a deliberate self-review pass (a second look after a cooling-off period, checked against a fixed rubric), but that is not the same signal as independent editorial review, and the architecture below should not call it that. | Structural |

### 1.2 Contributor 2 — Nithiyaraj

| Field | Determination | Basis |
|---|---|---|
| Name | Nithiyaraj | Account email `nithiyaraj17081998@gmail.com` |
| Actual role today | Registered admin with publish access. **Not an active contributor** — has never written, fact-checked, or reviewed anything on the site. | 01-forensic-audit.md §4: "the second registered user... has never authored a post" |
| Self-declared bio on file | "Influencer covering everyday tech and lifestyle topics" | Value currently sitting in the `User.bio` field (per 01-forensic-audit.md §4) |
| Can this bio be published as an author profile right now? | **No.** It's a self-description with zero corroborating TechPulzo byline behind it. Publishing it as an "our writer" bio would itself be exactly the kind of unverifiable claim this brief prohibits — the fact that it's typed into a real database field doesn't make it a demonstrated credential. | Direct consequence of §0's rule set |
| Expertise / topics / first-hand experience / fact-check / review capability | **Unknown — no track record exists to evaluate.** Any answer here would be invented. | N/A |

**Bottom line: TechPulzo has one (1) active author.** This report designs around that fact rather than around what would look better.

---

## 2. Editorial architecture recommendation

### 2.1 Why the requested pipeline (Author → Research → Fact verification → Editorial review → Publication) can't be staffed as five independent checkpoints today

That pipeline implies at least two people: someone who writes and at least one *other* person who checks. TechPulzo doesn't have that second person on the content side. Building a UI or a public-facing claim that implies otherwise — a "fact-checked by" byline with no second account behind it, a "reviewed by our editorial team" footer with a team of one — would be fabricating exactly the kind of editorial theater the brief asks to avoid, and which 01-forensic-audit.md §4 already flagged as a live risk ("written by experts, for curious minds" for a single generalist author).

### 2.2 What TechPulzo can honestly run: a single-author pipeline with real, sequential self-checks

The individual stages are still worth doing — they just have to be described as what they are: the same person, at different points, doing a different job. This is not a downgrade dressed up; disciplined sequential self-review is a genuine quality practice and directly answers the sourcing/specificity gaps 01-forensic-audit.md §2.2–2.3 already found (no first-hand experience, no citations on 49/137 articles).

```
Author (Muthu writes the draft)
        ↓
Research (claims get a named, linkable source — govt portal, vendor doc, RBI circular —
           before the sentence is allowed to assert a number or a legal fact)
        ↓
Self fact-check (a second, separate pass, after a cooling-off gap, checking every
                  factual/numeric claim against its source — not the same sitting as drafting)
        ↓
Self editorial review (structure, padding, whether the piece actually delivers what the
                        title promises — the exact failure modes 01-forensic-audit.md §2.5
                        found repeatedly)
        ↓
Publication (with an honest byline — see §3)
```

Concretely, this means:
- Every claim that's a number, a law, a regulation, or a "how it works" mechanism gets a named source before publish — not "generic mentions" (01-forensic-audit.md §2.3), an actual link or citation.
- Fact-check and editorial review happen as **separate, later passes**, not proofreading folded into the same drafting session — the goal is catching what the writer's own blind spots miss, which requires actual distance in time, not a different hat worn in the same five minutes.
- For YMYL topics specifically (tax, credit, employment law, health-adjacent claims — the ones flagged `SENSITIVE FINANCIAL/LEGAL CLAIMS` in `scheduled-decisions.csv`), the research step is not optional and the self fact-check step should be a hard publish gate, not a nice-to-have.

### 2.3 What changes if Nithiyaraj ever actually starts contributing

If Nithiyaraj publishes real content — even one article — the calculus changes and a second, genuine author profile becomes appropriate at that point, built the same way Muthu's is (§3.1): real name, real bio *they* wrote, real topics *they've* actually published in, an actual byline history to point to. Nothing about that requires advance work now. It should not be pre-built, pre-populated, or teased ("more writers coming soon") — that's a promise about people, and per the brief's constraints, promises about people who don't yet have a publishing track record shouldn't be made.

---

## 3. Recommendations by surface

### 3.1 Author pages

There is currently no `/author/[slug]` route (confirmed absent — 01-forensic-audit.md §5.5). Recommendation: build exactly **one**, `/author/muthu-raja` (or the existing account's slug), consolidating:
- Real name, real photo (already in `User.image`, uploaded via `ProfileForm.tsx` — not a stock/generated photo), real bio (already in `User.bio`).
- A genuine, narrow expertise statement (see §3.3) — not "tech expert," something specific and true.
- A live list of everything he's actually published (a filtered `Post` query by `authorId`), which is the single strongest, hardest-to-fake authorship signal available and costs nothing to build honestly since the data already exists.
- Do **not** build a second author page for Nithiyaraj yet (§2.3).

### 3.2 Author bios

The existing `ProfileForm.tsx` (`src/components/admin/ProfileForm.tsx`) already does the right thing structurally: it's a real field a real person fills in, shown only if non-empty (`AuthorBio.tsx:14`, `if (!bio) return null;`), with a UI hint that already nudges toward honesty ("Real, specific bios are one of the signals AdSense and readers use to judge whether content is trustworthy"). No architecture change needed here — the fix needed is to the *content* of the bio, not the mechanism: it should currently say what's true (a Java developer who writes about tech, being upfront elsewhere on the site about which topics that credential does and doesn't cover), not an inflated "tech expert" framing.

### 3.3 Expertise statements

Write one, specific, true sentence — not a title. Draft direction (for the site owner to approve/edit, not to publish verbatim without review):

> "Muthu writes TechPulzo based on hands-on use of the apps, devices, and tools he covers, and his day-to-day work as a software developer. Articles on regulated topics — tax, credit, employment law — are researched against official sources and linked; they aren't written from professional credentials in those fields."

That second sentence is the important one: it's the honest disclosure the current "written by experts" hero copy (§4.1) is missing, and it's the kind of transparency Google's own "Who" framing (quoted in 01-forensic-audit.md §6) is checking for — not "do you have a title," but "is it clear who wrote this and what actually qualifies them."

### 3.4 Article attribution

Keep the existing mechanism (`post.author.name` + image on every article, `[slug]/page.tsx:230-236`) — it's already correctly pulling the real author, not a placeholder. Two concrete gaps to close, both already flagged in 01-forensic-audit.md §5.3 and repeated here because they're squarely in this report's scope (identity, not just SEO plumbing):
- The `Article` JSON-LD `author` object is name-only (`[slug]/page.tsx:141`) — add `url: "<site>/author/muthu-raja"` once §3.1 exists, so the byline resolves to an actual page instead of being an inert string.
- No `sameAs` linking the author to his real social profiles, which are already collected in `User.socialLinks` and rendered in `AuthorBio.tsx` — wiring the same data into the JSON-LD is mechanical, not a new claim.

### 3.5 Published date / updated date

`Post.publishedAt` and `Post.updatedAt` already exist and are already correctly emitted as `datePublished`/`dateModified` in the `Article` JSON-LD (`[slug]/page.tsx:142-143`). No architectural change needed. One process recommendation tied to §2.2: when a self fact-check pass on regulatory content (GST portal URLs, tax thresholds, portal names) results in a correction, `updatedAt` should visibly bump and — for the highest-stakes YMYL pieces — the article should carry a one-line "Last verified: [date]" note in the body itself, since a bare `dateModified` in JSON-LD is invisible to a human reader deciding whether to trust a government-portal URL.

### 3.6 Reviewer attribution

**Do not add a "Reviewed by ___" byline or badge anywhere on the site.** There is no second person doing independent review today (§1.2, §2.1), so any reviewer credit would name either a fictional person or misrepresent Muthu's own self-check pass as independent review. If §2.3 ever triggers (Nithiyaraj becomes an active contributor), genuine cross-review between two real accounts becomes possible and a real "Reviewed by [name]" credit becomes honest — build the byline mechanism then, tied to an actual second `authorId`/reviewer field, not now.

### 3.7 Editorial policy (new page, `/editorial-policy`)

Recommend a short, plain page stating, truthfully:
- TechPulzo is written and published by one person (name it).
- What that person's actual background is, and what topics it does/doesn't professionally qualify him for (§3.3).
- The four-stage self-check process from §2.2, described honestly as sequential self-review, not as independent editorial oversight.
- That the site does not currently have a multi-person editorial team, and that this page will be updated if that changes.

This is a page the current site (`/about`, `/disclosure`, `/privacy` — all confirmed real and non-boilerplate in 01-forensic-audit.md §5.6) doesn't yet have, and it directly answers Google's "How was it created" question (01-forensic-audit.md §6) with something true instead of something that reads well.

### 3.8 Fact-checking policy (fold into `/editorial-policy`, don't make a separate page)

State plainly: claims involving numbers, law, regulation, or "how X works" mechanics are checked against a named primary source before publishing (§2.2); where that didn't happen historically (01-forensic-audit.md §2.3: 49/137 articles cite no source at all), the site is working backward through the catalog to add sourcing, not claiming it was always there. A false "we fact-check everything" claim is worse than no claim — it's falsifiable by anyone who reads the unsourced articles the audit already catalogued.

### 3.9 Corrections policy (fold into `/editorial-policy`)

State: when a factual error is found (the GST portal URL error in 01-forensic-audit.md §2.6 is the concrete example on hand right now), the article is corrected, `updatedAt` reflects it, and for material factual errors a brief in-body note says what changed and when. No separate corrections log/page is warranted at TechPulzo's current scale (one author, 45 live articles) — that's process overhead disproportionate to the size of the operation, and an empty or sparsely-populated "corrections log" page would itself read as a thin, table-stakes-checkbox page rather than a genuine signal.

---

## 4. Audit of current claims

| Claim | Where | Verdict | Why |
|---|---|---|---|
| "written by experts, for curious minds" | Homepage hero, `src/app/(public)/page.tsx:87` | **Inaccurate — flag for correction** | One person, one verifiable professional credential (software development), writing across finance/law/career/health topics outside that credential. "Experts" (plural) is also factually wrong on headcount alone — there is one author. |
| "We write so you can decide" / "We do the research..." / "We're independently owned..." | About page hero and story, `src/app/(public)/about/page.tsx:23,26,55-57` | **Borderline — recommend disclosure, not necessarily a rewrite** | Editorial "we" is a common, generally accepted convention for solo-run publications and isn't inherently deceptive. But combined with the homepage's "experts" claim and with no page anywhere stating "this is one person," a reader has no way to discover the true scale. Pairing this with the new `/editorial-policy` page (§3.7) resolves it without forcing an awkward "I" rewrite of existing, otherwise-fine copy. |
| "Who writes this" section pulling the real founder's live bio from the database | About page, `src/app/(public)/about/page.tsx:60-72` | **Accurate — keep as-is** | Confirmed: queries the real `User` record by the real founder's email, renders only if a real bio exists. Already flagged as legitimate in 01-forensic-audit.md §5.6. |
| Article byline (name + photo on every article) | `[slug]/page.tsx:230-236` | **Accurate — keep as-is** | Real `authorId` relation, no placeholder/fallback identity. |
| Any claim of independent fact-checking or editorial review | Searched site-wide | **None currently exists** | Not a false claim today — there's simply nothing to correct. Flagging only so that whoever builds §3.7 doesn't accidentally introduce one while writing the policy page (easy mistake: "fact-checked by our team" is one careless sentence away). |
| "Reviewed by" / "Our editorial team" anywhere | Searched site-wide | **None currently exists** | Same as above — nothing to fix, but explicitly do not add this (§3.6) without a real second reviewer behind it. |

---

## 5. Summary of recommended next actions

1. Correct the homepage "written by experts" line — smallest, highest-priority fix in this report (one string, in `src/app/(public)/page.tsx:87`).
2. Build `/author/muthu-raja` (§3.1) — real bio, real photo, real published-articles list; do not build a second author page yet.
3. Write a true, narrow expertise statement (§3.3) and drop the current generic framing.
4. Add `url`/`sameAs` to the `Article` JSON-LD author object once the author page exists (§3.4).
5. Publish `/editorial-policy` (§3.7–3.9) — the single biggest transparency gap this report found: the site currently makes no explicit statement anywhere about who writes it and how, beyond the About page's dynamic-but-unlabeled bio block.
6. Do not build reviewer-attribution UI, a second author profile, or any "fact-checked"/"team"-implying copy until Nithiyaraj (or anyone else) has an actual publishing track record to back it (§2.3, §3.6).

No code or content was changed in producing this report, per the brief.
