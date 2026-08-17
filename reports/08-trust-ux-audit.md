# TechPulzo — First-Time-Visitor Trust & UX Audit

**Date:** August 17, 2026
**Scope:** Every public-facing surface a first-time visitor could land on — homepage, About, Authors, Contact, Privacy, Terms, Disclaimer/Disclosure, Editorial policy, Corrections policy, navigation, categories, search, breadcrumbs, internal links, footer, mobile UX, images, popups, CTAs — audited against five questions: **What is this? Who is it for? What does it cover? Who makes it? Why trust it?**
**Action taken:** None. This is an audit only — no code, content, or configuration was changed in producing this report, per instruction.
**Inputs used:** Live `https://techpulzo.in` (rendered pages, HTTP status codes, rendered DOM, console/network output — not cached assumptions), and direct source review of `src/app/**`, `src/components/**`. Findings already established in [`01-forensic-audit.md`](01-forensic-audit.md), [`03-editorial-author-system.md`](03-editorial-author-system.md), and [`06-fact-checking.md`](06-fact-checking.md) are cited, not re-derived, where this audit's scope overlaps theirs (content quality, sourcing, author identity design). This report's own contribution is the UX/navigation/trust-page surface those reports didn't cover, plus two live bugs neither caught.

---

## 0. Headline verdict

| Question | Can a first-time visitor answer it? | Where it breaks down |
|---|---|---|
| **What is this?** | Mostly — but the site's own name is inconsistent on the very first page load (§1.1) | Brand-name mismatch between `<title>`/navbar/OG tags and body copy |
| **Who is it for?** | Yes, reasonably — "curious, ambitious people" / tech, career, finance, productivity is stated on the homepage and About | — |
| **What topics does it cover?** | Yes — Browse Topics section, footer, category pages all work and only show non-empty categories | Productivity category has exactly 1 article (§2.10) — thin but not broken |
| **Who creates the content?** | Partially, and it depends which page you're on — About page is honest (§1.1), homepage hero is not (§1.2) | Direct contradiction between two pages a visitor can reach in two clicks |
| **Why should I trust it?** | Weakly — Privacy/Disclosure exist and are genuine (§2.5–2.6), but there is no Editorial Policy, no Corrections Policy, and no Terms page at all (§2.7–2.9) | Three of the eight requested trust pages don't exist yet |

None of these are catastrophic individually, but stacked together they describe a site where the trust layer is about half-built: the pages that exist are honest, and the pages that don't exist yet leave real gaps a skeptical visitor (or an AdSense reviewer) would notice.

---

## 1. Two live bugs this audit found that no prior report caught

### 1.1 The site's displayed name doesn't match its own body copy, live, right now

Confirmed directly against `https://techpulzo.in` (not from documentation):

| Surface | What it shows |
|---|---|
| Browser tab title | `TechPulse — Tech Reviews, AI Tools & Digital Content` |
| Navbar logo text | `TechPulse` |
| `og:site_name` meta tag | `TechPulse` |
| Every article's `<title>` | `... \| TechPulse` |
| About page body copy | *"**Techpulzo** is an independent blog..."*, *"**Techpulzo** was started to fill a gap..."* |
| Footer/Privacy/Disclosure body copy | Also reads "Techpulzo" (interpolated from the same `siteName` variable as the navbar — see below) |

This is not a code bug — `src/app/layout.tsx:16`, `Footer.tsx:7`, `Navbar.tsx:59`, `privacy/page.tsx:2`, and `disclosure/page.tsx:2` all read `process.env.NEXT_PUBLIC_SITE_NAME || "Techpulzo"`, so they're all *supposed* to render the same value from the same variable. The fact that the navbar/title/OG tags say "TechPulse" while the same variable's fallback (and the domain, and every hardcoded string in About's prose) says "Techpulzo" means Railway's live `NEXT_PUBLIC_SITE_NAME` env var has drifted to `"TechPulse"` — the exact same class of drift `DOCUMENTATION.md` §19 already flagged for `NEXT_PUBLIC_SITE_URL`/`NEXTAUTH_URL` (which caused the canonical-URL AdSense rejection root cause), just on a variable nobody was watching.

**Why this matters for trust, specifically:** a first-time visitor's very first signal — the browser tab — names the site "TechPulse." Two clicks later, the About page's own story says "Techpulzo was started to..." A visitor who bookmarks, screenshots, or tells a friend about "TechPulse" is one letter off from ever finding it again by searching the actual domain name. This is the single highest-priority fix in this report because it undermines "What is this?" — the first question — before a visitor reads a word of actual content.

### 1.2 `og-default.png` is still a 404 (confirmed live, not just from `01-forensic-audit.md`)

`report 01 §5.4` flagged this on the database/code review. This audit re-confirmed it live: `https://techpulzo.in/og-default.png` returns **HTTP 404**, and the browser console throws a real 404 resource-load error on every page load because `layout.tsx:31` references it as the site-wide fallback Open Graph image. Every social share of the homepage, and any article that doesn't have its own `ogImage` set, currently shows a broken image in the link preview on WhatsApp/Facebook/X/LinkedIn — the exact channels a "why trust it" first impression travels through before someone even clicks. Unlike report 01's finding, article cover images themselves are **no longer** the problem — this audit confirmed real, unique, Cloudinary-hosted cover images now render correctly on article pages (see §2.11) — so this is narrowly the *default fallback* file that's still missing, a small, mechanical fix.

---

## 2. Section-by-section audit

### 2.1 Homepage

Live and code-reviewed (`src/app/(public)/page.tsx`). What works: clear hero framing ("Discover stories, thinking, and expertise"), a real stats bar (46 articles / 6 categories), Editor's Picks, Browse Topics, Most Read, and Latest Articles sections all populate from real data, and empty categories are already filtered out before rendering (`page.tsx:37-39`) — a genuinely good defensive pattern already in place.

**Problems:**
- **"written by experts, for curious minds"** (`page.tsx:87`) is still live, unchanged since `03-editorial-author-system.md §4.1` flagged it as the report's top-priority correction. It's plural ("experts") for a single-author site, and it directly contradicts the About page's own honest framing two clicks away (§1.1, and see §2.2 below) — this is a live, visible "misleading editorial claim," not a hypothetical one.
- **The "Trending" tag row is showing broken-looking fragments**, live: `voice`, `voi`, `redmi`, `top`. These are raw `SearchQuery.query` strings that crossed the `count >= 3` threshold (`page.tsx:62`, `lib` trending logic) — but nothing filters out partial/truncated queries like `"voi"` (someone mid-typing "voice") from being surfaced as if they were a real trending topic. To a first-time visitor this reads as a broken or fake "trending" widget, which is a credibility hit on a section whose entire purpose is to look alive and popular.

### 2.2 About

Live-checked and code-reviewed (`src/app/(public)/about/page.tsx`). This page is in noticeably better shape than the last full audit found it — it now pulls the real founder's bio from the database (`AuthorBio` component) and the bio itself reads as honest and specific: *"I'm Muthu, a software engineer based in India who writes about technology, career growth, and personal finance **on the side**"* — no inflated "expert" framing, consistent with `03-editorial-author-system.md §3.3`'s recommended direction. Real photo initial, real story section, working CTAs to `/` and `/contact`.

**Problem:** it directly contradicts the homepage hero (§2.1). A visitor who reads About first gets an honest "one person, on the side" picture; a visitor who only sees the homepage hero gets "written by experts." Both are two clicks from the front door. This isn't a hypothetical inconsistency — it's the same site telling two different stories about who's behind it, which is precisely the kind of "How was this made" test Google's own guidance (quoted in `01-forensic-audit.md §6`) is checking for.

### 2.3 Authors

**Does not exist.** No `/author/[slug]` route, confirmed both in source (`Grep` across `src/app` for `author/` found nothing) and live (`https://techpulzo.in/author` → 404, `https://techpulzo.in/author/muthu-raja` → 404). This matches `01-forensic-audit.md §5.5` and is exactly what `03-editorial-author-system.md §3.1` recommended building (one page, real bio, real photo, live list of the author's actual published articles) — not yet built. The only author-identifying surface a visitor can reach is the per-article `AuthorBio` block and the About page; there's no page that consolidates "everything this person has actually written," which is the single strongest authorship signal the site could show for free (the data already exists via `Post.authorId`).

### 2.4 Contact

Works. `/contact` (`src/app/(public)/contact/page.tsx`) is a real form posting to `/api/contact`, which — per the Aug 15 commit — now sends through Resend's HTTP API rather than the SMTP transport already proven broken on Railway (`DOCUMENTATION.md §9`). A direct mailto fallback is also shown. This is a genuine, working page, not a placeholder — no issues found.

### 2.5 Privacy

Works, and is specific rather than templated-boilerplate (`src/app/(public)/privacy/page.tsx`): names the actual cookie-consent mechanism (Accept/Reject, what each choice does), names actual third-party services used (Google Analytics, AdSense, Cloudinary), gives a real contact email. "Last updated: June 28, 2026" is present and current enough not to read as abandoned. No issues found.

### 2.6 Disclaimer / Editorial disclosure (`/disclosure`)

Works, and is genuinely specific (`src/app/(public)/disclosure/page.tsx`): names the actual affiliate programs (Amazon Associates, AdSense), explains what triggers a commission, and states the editorial-independence position plainly. It is linked from the footer as **"Affiliate Disclosure,"** and is also re-stated inline on every article that has affiliate links (`[slug]/page.tsx:268-270`, a clearly labeled orange callout box directly below the affiliate section) — good, redundant placement exactly where a reader would need it, not buried. No issues found here. Note: this page covers *affiliate* disclosure; the user's audit brief separately asked about a general-purpose "Disclaimer" page (medical/financial/liability disclaimer language) — that doesn't exist as a distinct page, but given the site's YMYL content (finance, tax, legal procedure — see `01-forensic-audit.md §2` and `06-fact-checking.md`), a first-time visitor reading a salary or tax article has no on-page pointer to "this isn't professional financial/legal advice." That gap sits between this section and §2.7 below.

### 2.7 Editorial policy

**Does not exist.** `https://techpulzo.in/editorial-policy` → 404, confirmed live. This is `03-editorial-author-system.md §3.7`'s top recommendation, unbuilt: a short, honest page stating who writes the site, what that person's real background is and does/doesn't qualify them for, and the actual sequential self-review process the site can honestly claim (§2.2 of that report). Right now there is **no page anywhere** that explicitly says "this is written by one person" — a visitor has to infer it by noticing every article has the same byline, which most won't. This is the single biggest gap in the "Why trust it" question this audit was asked to answer.

### 2.8 Corrections policy

**Does not exist as a standalone page** — matches `03-editorial-author-system.md §3.9`'s explicit recommendation *not* to build one yet (a corrections log with nothing in it yet would itself read as a thin, checkbox page at this site's current scale). No action needed beyond what report 03 already decided, but worth naming here since the user's brief asked for it explicitly: the honest answer is "intentionally not built yet, and the reasoning for that is sound," not "missing."

### 2.9 Terms (of Service)

**Does not exist.** No `/terms` route in source, confirmed live (`https://techpulzo.in/terms` → 404). Unlike the Corrections Policy (§2.8), no prior report evaluated whether this is a deliberate omission or a gap — it wasn't addressed in reports 01–07 at all. For a content site with a working contact form, a comments system (`CommentSection`, currently unused per `01-forensic-audit.md §1` — 0 comments ever posted, but the feature is live and accepting input), and a newsletter signup, having no Terms of Service/Use page is a real gap, not a stylistic choice — it's the page that would normally state acceptable use, content licensing/reuse terms, and liability limits. Flagging as a genuine missing page, not a non-issue.

### 2.10 Navigation

Live-checked (`Navbar.tsx`) both desktop and mobile (375×812 viewport). Desktop nav: Home + up to 7 categories, populated dynamically from `/api/categories`, already filters to categories with `_count.posts > 0` (`Navbar.tsx:26`) — the same good defensive pattern as the homepage. Search icon opens an inline search bar with live autocomplete suggestions (debounced, 300ms) that actually returned real result titles when tested. Dark/light theme toggle works.

**Minor gap:** the mobile hamburger menu (`Navbar.tsx:131-144`) lists categories only — there's no explicit "Home" link in the mobile panel (a visitor has to know the logo is tappable to get home, which is a reasonably common pattern but not guaranteed-discoverable on every visitor's first visit).

### 2.11 Categories

Live-checked (`/categories`, `/category/[slug]`). Six categories currently have published content: Tech (19), Career (8), Tutorials (7), Finance (7), Reviews (4), Productivity (1). Category pages with zero published posts correctly `notFound()` (`category/[slug]/page.tsx:55`) rather than rendering an empty page — this is the fix `01-forensic-audit.md §7` recommended and it's live and working. **Productivity at 1 article** is thin enough that it's borderline whether it should be a standalone category at all — `05-editorial-strategy.md` (not re-read in full for this audit, but referenced in `07-human-input-requests.md` §H) apparently already recommended retiring Productivity as a standalone category; that decision, if made, hasn't been reflected here yet. Not a broken page, but a visibly thin one.

### 2.12 Search

Live-checked (`/search`). Works: real query matching against title/excerpt/content/tags, relevance-ranked (title match beats body match, per `search/page.tsx:21-30`), a proper empty state ("No results for..."), and trending-searches display when no query is active. `/search` is indexable and in `sitemap.xml` — `01-forensic-audit.md §5.2` already flagged this as something that should be `noindex`ed and removed from the sitemap (internal search results are exactly the auto-generated low-value-landing-page pattern Google discourages submitting); that recommendation is still unimplemented as of this audit; re-flagging here since it directly touches the UX/trust surface this report covers.

### 2.13 Breadcrumbs

Work correctly on article pages (`[slug]/page.tsx:194-207`): Home → Category → Article title, with matching `BreadcrumbList` JSON-LD (`[slug]/page.tsx:125-133`). Verified live. No issues found — this is one of the site's stronger technical-SEO surfaces.

### 2.14 Internal links / orphan articles

No orphan articles found: every published post is reachable via `/posts` (paginated, 12/page), its category page, the homepage's Latest/Featured/Trending sections, `/search`, and `sitemap.xml` (55 URLs live — matches 46 published posts + 6 non-empty categories + homepage + `/search`, consistent with `01-forensic-audit.md §1`'s methodology). Related-posts and tag links on article pages add further cross-linking. No dead-end or unreachable published content found.

### 2.15 Footer

Live-checked (`Footer.tsx`). Genuinely useful, not decorative: real Topics list (same non-empty-category filter as nav), a Company column linking About/Contact/Search/Sitemap/Privacy/Affiliate Disclosure, and an honest one-line affiliate note ("This site may contain affiliate links..."). **Gap:** the footer's Company column is the natural place a visitor looks for Terms/Editorial Policy — both absent (§2.7, §2.9), so the footer currently undersells the site's trust surface even relative to what a visitor would expect to find there.

### 2.16 Mobile UX

Tested at 375×812. Cookie consent banner renders correctly and is usable (Accept/Reject both reachable, doesn't block the page). Hamburger menu opens/closes. Article pages render with working breadcrumbs, cover image, and reading-progress indicator. No layout breakage, overflow, or unreadable text found at this viewport. The one gap already noted in §2.10 (no explicit "Home" link in the mobile panel) is minor.

### 2.17 Images

Live-checked on an article page: real, unique Cloudinary-hosted cover images now render (`res.cloudinary.com/dkoqrad8k/.../covers/<slug>.png`) — this is a marked improvement over `01-forensic-audit.md §5.4`'s finding of 2/137 posts having any cover image at all; whatever generated these has since been run across (at least) the sampled article and its related posts. The per-article "key takeaways" diagram image (flagged as a genuinely good feature in report 01) is also present and has a real, descriptive alt attribute. **Remaining issue:** the site-wide OG fallback (`og-default.png`) is still missing — §1.2.

### 2.18 Popups

Exactly one popup-like element exists site-wide: the cookie-consent banner (`CookieConsentBanner.tsx`), which is a bottom-anchored bar, not a modal/overlay — it doesn't block content, has clear Accept/Reject choices, and links to the Privacy Policy inline. This is compliant, non-aggressive popup behavior; nothing found that resembles an intrusive interstitial, exit-intent popup, or forced-subscribe modal. No AdSense/UX policy concerns here.

### 2.19 CTAs

Inventoried: "Read our articles" / "Get in touch" (About), "Subscribe — It's Free" (Newsletter widget, sidebar on every article — confirmed working end-to-end since the Aug 15 Resend fix, §2.4), "View all" section links (homepage), "View all articles" (homepage → /posts), pagination CTAs (Previous/Next on /posts and category pages), share buttons, reaction buttons, and QR code section on articles. All CTAs found go to real, working destinations — no dead-end or placeholder CTAs found (e.g., no "Coming soon" buttons, no CTAs pointing at unbuilt pages).

---

## 3. Cross-cutting checks (per the brief)

| Check | Finding |
|---|---|
| **Placeholder content** | None found on public pages themselves (About/Privacy/Disclosure/Contact are all real, specific text — confirmed again in this audit, consistent with `01-forensic-audit.md §5.6`). The one placeholder-*shaped* thing a visitor can see is the homepage's raw, unfiltered "Trending" tags (§2.1) — not literally a lorem-ipsum placeholder, but reads like one. |
| **Broken pages** | `og-default.png` (404, live) and the three unbuilt trust pages (`/terms`, `/editorial-policy` — 404s, by absence rather than error) are the only broken/missing surfaces found. No 500s, no crashed pages, no dead internal links found anywhere in this audit's crawl. |
| **Empty categories** | None reachable — already filtered from nav, footer, homepage, `/categories`, and hard-404'd if visited directly (`category/[slug]/page.tsx:55`). This is correctly handled. |
| **Orphan articles** | None found — see §2.14. |
| **Misleading author claims** | The homepage hero's "written by experts" (plural) is the one live example — see §2.1, §2.2, and the full prior treatment in `03-editorial-author-system.md §4.1`. Every other author-facing surface (About bio, AuthorBio component) is honest and specific. |
| **Misleading editorial claims** | Same root cause as above — no separate additional claims found. The About page's "editorial 'we'" language (§2.2) was already judged borderline-acceptable, not deceptive, by `03-editorial-author-system.md §4` ("a common, generally accepted convention for solo-run publications"); this audit agrees with that read and isn't re-flagging it as a new issue. |
| **Excessive promotional content** | Not currently observable — `AdUnit.tsx` renders **nothing** (not even a placeholder box) because `NEXT_PUBLIC_ADS_LIVE` is unset (`AdUnit.tsx:35-39`), so the ad-stuffed appearance `DOCUMENTATION.md §11` warned about is not currently live. This will need re-checking once ads go live with real slot IDs — the placement density itself (16 slots across the site, per `DOCUMENTATION.md §8`) is reasonable and already scaled to content length on article pages (`showCoreAds`/`showExtraAds` gates, `[slug]/page.tsx:120-122`), but that's a code-level safeguard, not something a visitor can currently see either way. |
| **Affiliate disclosures** | Present and well-placed — footer link, dedicated `/disclosure` page, and an inline per-article callout box directly under any affiliate links (§2.6). This is the strongest trust-signal category on the site. |
| **Unclear sponsorships** | Not found to be unclear — `Post.sponsored` + `sponsoredLabel` renders a visible "Sponsored" (or custom label) badge on both the article page and its `PostCard` thumbnail (`page.tsx:210`, `PostCard.tsx:78,103-106`) wherever `sponsored` is true. The mechanism is sound; this audit did not independently verify how many *currently published* posts have `sponsored: true` set (that's a database-content question, not a UX-surface question, and outside this report's method) — noting the distinction rather than claiming false coverage. |

---

## 4. Recommended actions — summary (not performed, per the brief)

**Highest priority — fixes "What is this?" and "Why trust it?" before anything else:**
1. Fix the `NEXT_PUBLIC_SITE_NAME` drift in Railway (currently "TechPulse" live; should be "Techpulzo" to match the domain and every hardcoded string on the site) — §1.1. Same category of bug as the canonical-URL drift `DOCUMENTATION.md §19` already lists as a standing watch-item; recommend adding `NEXT_PUBLIC_SITE_NAME` to that same watch-list once fixed.
2. Fix or replace `og-default.png` (still 404 live) — §1.2. Small, mechanical, already scoped in `01-forensic-audit.md §7`.
3. Correct the homepage hero's "written by experts" line (`src/app/(public)/page.tsx:87`) to match the About page's already-honest framing — §2.1/§2.2. Exact text already drafted in `03-editorial-author-system.md §3.3`.

**Trust-page gaps, in priority order:**
4. Build `/editorial-policy` — the largest single "why trust it" gap this audit found; full spec already written in `03-editorial-author-system.md §3.7–3.9`.
5. Build `/author/muthu-raja` — spec already written in `03-editorial-author-system.md §3.1`.
6. Add a `/terms` page — newly flagged by this audit, not previously scoped by any prior report.
7. Corrections policy: no action needed — the decision to defer it was already made deliberately (§2.8).

**Smaller UX fixes:**
8. Filter obviously-truncated/single-word-fragment queries (e.g., "voi") out of the homepage's Trending tags, or raise the `count >= 3` bar / add a minimum-length check — §2.1.
9. `noindex` `/search` and drop it from `sitemap.xml` — already recommended in `01-forensic-audit.md §5.2`, still open; re-flagged here as a UX/trust-adjacent item since it's a search-results page being presented to Google as if it were content.
10. Consider adding an explicit "Home" link in the mobile nav panel — §2.10, minor.
11. Revisit whether Productivity (1 article) should stay a standalone category or fold into Tech, per whatever `05-editorial-strategy.md` already recommended — §2.11.

This report makes no changes and recommends none be made without separate, explicit sign-off, consistent with every prior report in this series.
