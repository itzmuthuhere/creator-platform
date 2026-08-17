# TechPulzo — Technical SEO & Indexing Audit

**Date:** August 17, 2026
**Scope:** robots.txt, sitemap.xml, canonical URLs, index/noindex, redirects, 404s, status codes, duplicate URLs, pagination, structured data (Article/Author/Breadcrumb/FAQ/HowTo), Open Graph, metadata/titles, H1–H2 structure, image alt text, internal linking, orphan pages, mobile usability, and performance/Core Web Vitals where measurable.
**Action taken:** None. This is an audit only. One temporary script (`scripts/seo-audit-query.mjs`) was added to query the production database directly for the CMS/sitemap comparison in §8 — it makes no writes and is left in place since it matches the existing pattern of read-only scripts in `scripts/`.
**Inputs used:** Live `https://techpulzo.in` (byte-level HTTP responses via direct requests — status codes, headers, redirects, rendered HTML, JSON-LD — not cached assumptions), direct source review of `src/app/**`, `src/components/layout/**`, `next.config.ts`, `prisma/schema.prisma`, a live production-database query (47 published posts, 137 total), and a `site:techpulzo.in`-style search-engine check in place of Search Console (**no Search Console access exists for this audit** — see §8.3 for what that means for the "indexed URLs" comparison the brief asked for). Findings already fully covered by `01-forensic-audit.md` and `08-trust-ux-audit.md` are cited, not re-derived — this report's contribution is verifying which of those are still live today, plus several findings neither prior report caught (www/non-www duplication, sitewide duplicate meta descriptions, client-only nav links, the Vercel Analytics/Railway mismatch, missing redirect-on-slug-change mechanism).

---

## 0. Headline verdict

The sitemap and robots.txt are mechanically correct and exactly match the CMS (§8.1) — that part of the technical layer is not the problem. The problems that are real and verified live today cluster into two groups:

1. **Duplicate/inconsistent canonical signals** — the site is fully reachable on two hosts (`techpulzo.in` and `www.techpulzo.in`) with no redirect between them (§3), the homepage and every static page (`/about`, `/contact`, `/privacy`, `/disclosure`, `/posts`, all pagination pages, all category pages, `/search`) serve the **identical meta description**, byte for byte (§6), and the homepage has no `<link rel="canonical">` at all (§4.1).
2. **A likely-total indexing gap** — the best available proxy for "what's indexed" (no Search Console access; see §8.3) shows **zero** techpulzo.in URLs surfacing for `site:techpulzo.in` or direct-title queries, despite 47 published, fully-tagged articles and a correct sitemap. This matches the AdSense content-quality rejection context from `01-forensic-audit.md`, but is worth stating plainly as its own technical finding: right now, the technical layer (sitemap/robots/canonical/schema) is largely sound, yet apparently none of it is resulting in indexed pages.

Neither of these is a single quick fix — they're the kind of finding worth root-causing before touching code.

---

## 1. robots.txt — correct, no changes needed

```
User-Agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://techpulzo.in/sitemap.xml
```

Fetched live, `200 OK`. Matches `src/app/robots.ts` exactly. `/admin/` and `/api/` are disallowed; everything else is crawlable. This is the correct shape for this site and needs no action.

## 2. sitemap.xml — correct and live-accurate, but incomplete in scope

Fetched live: **55 `<loc>` entries**, `200 OK`. Verified byte-for-byte against the production database (§8.1): homepage (1) + `/search` (1) + 47 published posts + 6 categories with ≥1 published post = 55. **Exact match, no stale or orphaned URLs, no missing published posts.** `src/app/sitemap.ts` is `force-dynamic`, so this will stay accurate as content changes — no drift risk here.

**What it doesn't include, and the effect of that:** `/about`, `/contact`, `/privacy`, `/disclosure`, `/posts`, and `/categories` are real, indexable, `200`-status pages that are not in the sitemap. This isn't wrong — sitemaps don't need to be exhaustive, and Google discovers linked pages regardless — but it does mean these six pages depend entirely on being reached through crawled links rather than direct sitemap submission. `/about`, `/contact`, `/privacy`, and `/disclosure` are linked from the footer (server-rendered, so this works — see §7.1). `/posts` and `/categories` are also footer/homepage-linked. None of these are orphaned (§7.2), so this is a minor completeness gap, not a discovery failure.

**`/search` is still in the sitemap and still indexable** — `robots: { index: true, follow: true }` from the root layout applies to it with no override, and it carries priority `0.8`. This was already flagged in `01-forensic-audit.md §5.2` and re-flagged in `08-trust-ux-audit.md §3` as unresolved; confirmed still live today (`curl https://techpulzo.in/search` → `200`, `<meta name="robots" content="index, follow">`). Internal search-results pages are exactly the auto-generated, query-dependent content Google's own guidance discourages submitting for indexing — not being re-litigated here, just confirmed as still open.

## 3. Duplicate hosts: `www.techpulzo.in` and `techpulzo.in` both serve full 200 content, no redirect

This is a new finding — neither prior report checked this. Verified live across multiple URL types:

| Request | Result |
|---|---|
| `http://techpulzo.in/` | `301` → `https://techpulzo.in/` (HTTP→HTTPS works correctly) |
| `https://www.techpulzo.in/` | `200 OK` — full homepage HTML, **no redirect** |
| `https://www.techpulzo.in/voice-access-...` | `200 OK` — full article HTML, **no redirect** |

There is no `middleware.ts` anywhere in `src/` and no `redirects()` entry in `next.config.ts` — nothing in the codebase normalizes `www` to the apex domain (or vice versa). Every one of the site's ~55+ URLs is currently reachable at two different hostnames with identical content and no HTTP redirect connecting them.

**Why this matters concretely, not as a "best practice":** `getBaseUrl()` (`src/lib/utils.ts:47-49`) always returns `NEXT_PUBLIC_SITE_URL` (the apex, `https://techpulzo.in`) regardless of which host actually served the request, so every page's `<link rel="canonical">` and `og:url` correctly self-reports the apex even when fetched via `www`. That's the one thing keeping this from being a full duplicate-content problem — canonical tags should let Google consolidate the two hosts. But a canonical tag is a *hint*; a `301` redirect is a *directive*. Right now:
- Anyone who lands on, bookmarks, or shares a `www` link (a very common typing/autofill habit) is serving Google, social crawlers, and analytics a second, technically-distinct copy of every page indefinitely.
- Backlinks or social shares that happen to use `www` never consolidate their link equity to the canonical host at the HTTP level — they rely entirely on Google's (not guaranteed, not immediate) canonical-following behavior.

## 4. Canonical URLs

### 4.1 Article pages (`/[slug]`, `/ta/[slug]`) — implemented correctly

`generateMetadata()` in both `[slug]/page.tsx:89-94` and `ta/[slug]/page.tsx:71-76` sets `alternates.canonical` to `post.canonicalUrl || url`, where `url` is always built from `getBaseUrl()` (the apex domain) — confirmed live: fetching an article via either host renders `<link rel="canonical" href="https://techpulzo.in/...">`. This is the fix from the Aug 14 canonical-URL incident (`DOCUMENTATION.md` §"Root cause found Aug 14, 2026") holding correctly today. No action needed on article canonicals themselves.

### 4.2 Homepage and every static/listing page — no canonical tag at all

Confirmed live by direct HTML inspection: `https://techpulzo.in/` has **no `<link rel="canonical">` element anywhere in the response**. Neither does `/posts`, `/posts?page=2`, `/categories`, `/about`, `/contact`, `/privacy`, `/disclosure`, `/search`, or `/category/tech`. Root cause: `src/app/layout.tsx`'s `metadata` object (lines 19-38) never sets `alternates.canonical`, and none of these pages' own `page.tsx` files set it either (only the two article route types do — §4.1).

This is the concrete, verifiable form of "no canonical" — not a hypothetical risk. Combined with the www/non-www duplication in §3, the single most important URL on the site (the homepage) currently has **no explicit statement of which of its two live host variants is canonical**, and is relying entirely on `og:url` (which does correctly say `https://techpulzo.in`) as an indirect, weaker signal.

## 5. Index/noindex status

Site-wide default is `robots: { index: true, follow: true }` (`layout.tsx:37`), and no page overrides it to `noindex` anywhere in the codebase — confirmed by `grep` across `src/app` for `noindex`/`robots:` returning only the one root declaration and the two article pages' `alternates.languages` (unrelated). Practical effect, confirmed live (`<meta name="robots" content="index, follow">` on every URL tested):

| Page | Indexable? | Should it be? |
|---|---|---|
| Homepage, articles, categories, `/about`, `/contact`, `/privacy`, `/disclosure`, `/posts`, `/categories` | Yes | Yes — all real content |
| `/search` (with or without a query) | Yes | **No** — internal search results, still open from §2 |
| `/admin/*` | Blocked via `robots.txt Disallow`, not via `noindex` | Acceptable — disallow prevents crawling entirely, which is the stronger control for pages with no public content value; not flagging as broken |
| `/ta` and `/ta/*` | Would be indexable, but currently return `404` | Correct — see §5.1 |

### 5.1 `/ta` returning 404 is correct behavior, not a bug

Live check: `https://techpulzo.in/ta` → `404`. The production database currently has **zero** posts with `locale: "ta"` (confirmed via direct query — all 137 posts, across all statuses, are `locale: "en"`). `ta/page.tsx:35-37` deliberately calls `notFound()` when there's no Tamil content, specifically to avoid serving an indexable "coming soon" placeholder. `sitemap.ts:19,24` also correctly omits `/ta` from the sitemap while `hasTamilPosts` is false. This is the intended, already-fixed behavior — not a regression of the `/ta` 404 bug mentioned in the Aug 15 commit log; that fix is holding.

## 6. Duplicate meta descriptions — sitewide, verified live

This is the report's most concrete new finding. Every one of the following URLs currently serves the **exact same** `<meta name="description">` content — word for word, the root layout's site-wide default:

> "In-depth reviews, tutorials, and insights on tech, AI tools, and digital productivity."

| URL | Title | Description |
|---|---|---|
| `/` | `TechPulse — Tech Reviews, AI Tools & Digital Content` | *(default)* |
| `/posts` | `All Articles \| TechPulse` | *(default — identical)* |
| `/posts?page=2` (and every other page) | `All Articles \| TechPulse` (identical to page 1) | *(default — identical)* |
| `/about` | `TechPulse — Tech Reviews, AI Tools & Digital Content` (identical to homepage) | *(default — identical)* |
| `/contact` | Same as homepage | *(default — identical)* |
| `/privacy` | Same as homepage | *(default — identical)* |
| `/disclosure` | Same as homepage | *(default — identical)* |
| `/search` | `Search \| TechPulse` | *(default — identical)* |
| `/category/tech` (and every other category, every page) | `Tech — Articles \| TechPulse` | *(default — identical)* |

Root cause: `about/page.tsx`, `contact/page.tsx`, `privacy/page.tsx`, and `disclosure/page.tsx` export **no `metadata` at all**, so Next.js falls through entirely to the root layout's default (not even the title template applies, since these pages set no `title` to slot into `%s | Techpulzo`) — this is why `/about`'s `<title>` is literally identical to the homepage's, not "About | Techpulse". `posts/page.tsx`, `category/[slug]/page.tsx`, and `search/page.tsx` do set a page-specific `title`, but none of them set a `description`, so they inherit the homepage's.

**Why this is a real finding, not a stylistic nitpick:** this isn't 2-3 pages sharing text — it's the homepage plus at minimum 9 other distinct, indexable URL patterns (and every paginated variant of `/posts` and all 6 categories multiplies that further). A search engine forming an independent understanding of what each of these pages is *about* has the same 13-word sentence to go on for all of them, and Google has been known to silently rewrite `<title>`/description in search snippets when it judges the on-page ones as unhelpful or non-distinguishing — which duplication at this scale actively invites.

## 7. Internal linking, orphan pages, and pagination

### 7.1 Primary site navigation contributes zero links in server-rendered HTML

New finding, verified by direct comparison of source and live HTML. `Navbar.tsx` and `Footer.tsx` are both `"use client"` components, and in both, the category links (`/category/[slug]`) are populated entirely from a `useEffect` → `fetch("/api/categories")` call that only resolves after hydration:

```tsx
// Navbar.tsx:22-28 and Footer.tsx:10-16 — same pattern in both
useEffect(() => {
  fetch("/api/categories").then(r => r.json()).then(data => {
    if (Array.isArray(data)) setCategories(data.filter(...));
  }).catch(() => {});
}, []);
```

Confirmed by fetching a live article page's raw HTML directly (`curl`, no JS execution): the only site-wide chrome links present are `Home` (Navbar, hardcoded) and the six static Footer links (`About`, `Contact`, `Search`, `Sitemap`, `Privacy Policy`, `Affiliate Disclosure`, also hardcoded). **Zero category links appear in the raw server-rendered HTML of the navbar or footer on any page** — they only exist after the client-side fetch resolves.

This doesn't orphan the category pages — they're still reachable via the homepage's "Browse Topics" section and `/categories`, both of which *are* server-rendered (confirmed directly in `page.tsx` and `categories/page.tsx`, genuine server components) — so §7.2 below still finds no true orphans. But it does mean the one piece of navigation present on literally every page of the site (47 articles + every listing page) currently carries **no crawlable link** to any category page in its initial HTML. For a crawler or tool that doesn't fully execute client JS (not all of them do, even now), or for any link-equity analysis based on raw HTML, category pages are receiving internal links from exactly two pages sitewide (home, `/categories`) instead of from every page via nav — a meaningfully weaker internal-linking signal than the site's visual navigation implies it has.

### 7.2 No orphan articles found

Every one of the 47 published posts is reachable through at least one server-rendered path: `/posts` (paginated, fully SSR'd), its category page (if it has one), the homepage's Latest/Featured/Trending sections (all server-rendered), and the sitemap. Confirmed no article exists outside this reachable set (47 published = 47 sitemap post entries = matches `/posts` total count from the live count query). This matches `08-trust-ux-audit.md §2.14`'s finding and remains true today.

### 7.3 Pagination has no distinguishing signal beyond page content

`/posts?page=2`, `/posts?page=3`, etc. (and the equivalent for every category) are all indexable (`index, follow`), all return `200`, and all currently render the identical `<title>` and `<meta description>` as page 1 (§6) — the only thing that differs page-to-page is which 12 post cards are in the grid. Google deprecated `rel=prev/next` in 2019 and generally handles paginated series fine on its own, so this isn't flagged as broken — but it compounds §6: without at least a page-number-aware title (e.g. "All Articles — Page 2"), these pages have literally nothing in their `<head>` to tell them apart.

### 7.4 Two homepage links point at unhandled query parameters

Not a crawl/indexing issue (both resolve `200`), but a content-discovery one, since it's in scope: the homepage's "Editor's Picks → View all" links to `/search?featured=true`, and "Most Read → View all" links to `/search?sort=trending` (`page.tsx:131,175`). `search/page.tsx` only reads `q` and `page` from `searchParams` (§ code review) — `featured` and `sort` are silently ignored, so both links land a visitor on the plain, empty `/search` page instead of a filtered list. Flagging because it's a real dead-end a visitor (and a crawler trying to discover featured/trending content through those links) will hit today, not a hypothetical.

## 8. CMS vs. sitemap vs. public URLs vs. indexed URLs

### 8.1 CMS vs. sitemap — exact match, no discrepancy

Queried the production database directly:

| | Count |
|---|---|
| Total posts (all statuses) | 137 |
| `PUBLISHED` | 47 |
| `SCHEDULED` | 85 |
| `UNPUBLISHED` | 5 |
| `DRAFT` | 0 |
| `locale: "ta"` (any status) | 0 |
| Categories with ≥1 published post | 6 (Tech 19, Career 8, Finance 8, Tutorials 7, Reviews 4, Productivity 1) |
| Duplicate slugs | 0 |
| Published posts missing `seoTitle`/`metaDescription`/`ogImage`/`coverImage` | 0 |
| Published posts with `publishedAt: null` | 0 |

`1 (home) + 1 (search) + 47 (posts) + 6 (categories) = 55` — exactly the live sitemap's entry count. **No stale, missing, or orphaned entries.** Every published post has complete SEO metadata at the database level (title, description, image) — the technical/data layer here is in good shape; this contradicts nothing in `01-forensic-audit.md`, which reached the same conclusion for the sitemap specifically.

The 85 `SCHEDULED` posts are correctly invisible everywhere public: `getPost()` in both `[slug]/page.tsx` and `ta/[slug]/page.tsx` filters `status: "PUBLISHED"` explicitly, so a scheduled post's slug returns `404` until it actually publishes — no premature exposure of unpublished content confirmed.

### 8.2 Public URLs vs. what's actually reachable — one intentional gap, no accidental ones

Every `200`-status public URL traced back to either the sitemap or a server-rendered internal link (§7.2). The only category/locale gaps found are intentional and already correctly handled with `404` (empty categories, `/ta` with no Tamil content) rather than being either missing entirely or exposed as broken/empty pages.

### 8.3 Indexed URLs — no Search Console access; best available proxy shows a likely-total gap

**This audit has no Google Search Console (or Bing Webmaster Tools) connection**, so the "compare against indexed URLs" instruction in the brief cannot be done with authoritative data — flagging this explicitly rather than guessing. As the best available substitute, three different `site:techpulzo.in`-style search queries were run (a general `site:techpulzo.in`, a title-specific query for the Voice Access article, and a bare `techpulzo.in` query). **All three returned zero results from the actual techpulzo.in domain** — every result returned was an unrelated site with a similar name (techpulz.com, techpulse.com, etc.).

This needs three caveats before drawing a conclusion from it: (1) the search tool used here is not Google itself and may have materially different (likely much smaller) index coverage than Google's own index; (2) a `site:` operator query returning nothing is a known-unreliable signal even on real Google, historically; (3) without GSC's Index Coverage report, there is no way to distinguish "not indexed," "indexed but suppressed from this particular search surface," or "this tool's index doesn't include techpulzo.in for unrelated coverage reasons." What can be said with confidence: this audit found **no independent confirmation that any techpulzo.in page is currently indexed anywhere**, despite the technical layer (sitemap, robots, canonical tags, structured data) being largely correct. **Recommend connecting Search Console** as the single highest-value action for closing this specific gap in future audits — without it, "is this actually getting indexed" cannot be answered with real data, only inferred from search-engine side effects.

## 9. Structured data

### 9.1 Article pages — solid, with two specific gaps

Live-verified JSON-LD on a sampled article: `BreadcrumbList`, `Article`, `FAQPage` (when the post has FAQ items), and `HowTo` (when the post's content has explicit "Step N:" headings — `extractHowToSteps`, deliberately conservative so it doesn't fabricate steps from generic H2s). The `FAQPage` and `HowTo` schemas are both generated from the same data that's rendered visibly on the page (`faqItems`, `post.content`), so there's no schema/visible-content mismatch risk — a real, correctly-implemented safeguard.

Two gaps, both already identified in `01-forensic-audit.md §5.3` and confirmed still present today:
- **No `publisher` field** on the `Article` schema. Google's Article structured-data guidelines list this as expected for news/article rich-result eligibility.
- **No site-wide `Organization`/`WebSite` JSON-LD** in the root layout — nothing anywhere on the site declares the publisher entity itself (name, logo, sameAs social profiles) independent of individual articles. This also forecloses Sitelinks Search Box eligibility, which specifically requires a `WebSite` schema with a `SearchAction`.

### 9.2 Author schema — present, correctly typed, but a dead end

Each `Article`'s `author` field is `{"@type": "Person", "name": post.author.name}` — correctly `Person` rather than `Organization` for a single-author blog, which is the right schema type here. However, it carries **only a name** — no `url`, `image`, or `sameAs`. Since `03-editorial-author-system.md` and `08-trust-ux-audit.md §2.3` already established there is no `/author/[slug]` page to link to, this Person entity currently has nowhere to resolve to — a crawler or rich-result system reading `"Person", "name": "Muthu"` has no URL to follow to verify who that is. Not re-litigating whether to build the author page (already scoped in report 03/08) — noting specifically that the *schema* half of that gap is real and verified in the JSON-LD itself, not just the missing page.

### 9.3 No structured data on listing pages

`/posts`, `/category/[slug]`, and `/categories` carry no JSON-LD (no `ItemList`, `CollectionPage`, or `BreadcrumbList`). Not flagging this as broken — listing pages don't strictly need it — but noting it since `BreadcrumbList` in particular would be a low-cost, direct extension of the pattern already used correctly on article pages (§9.1), and category pages are one click deeper than the homepage with no breadcrumb trail back.

## 10. Open Graph and Twitter Card tags

Verified live on both a static page and an article:

| | Homepage | Article |
|---|---|---|
| `og:title` | Present (= site title) | Present (= article SEO title) |
| `og:description` | Present (= default description, §6) | Present, article-specific |
| `og:url` | `https://techpulzo.in` (correct apex, even though not canonicalized in `<head>` — §4.2) | Correct apex + full slug |
| `og:image` | `https://techpulzo.in/og-default.png` — **`404` live** | Real Cloudinary cover image — loads correctly |
| `og:type` | `website` | `article` |
| `twitter:card` | `summary_large_image` | `summary_large_image` |

The `og-default.png` `404` was already flagged in `01-forensic-audit.md §5.4` and `08-trust-ux-audit.md §1.2`; confirmed still live and unfixed today — every social share of the homepage or of any article lacking its own `ogImage` currently renders a broken preview image, and it produces a real `404` console error on every single page load (confirmed via live browser console — `Failed to load resource: 404` fires on every page, not just ones missing an image, because the root layout references it as the OG fallback regardless).

## 11. Title tags, H1/H2 structure

- **H1**: exactly one `<h1>` per article page, containing the actual post title — correct, verified across the sampled article.
- **H2/H3**: the sampled article's body had **14 `<h2>` and 15 `<h3>`** elements — a real, substantive heading hierarchy, not thin content wearing SEO clothing. (This is consistent with `01-forensic-audit.md`'s separate finding that content depth/quality, not structure, is the site's main content problem — structurally, this article is fine.)
- **Title tags**: article titles are correctly distinct per post (`seoTitle || title`). The site-wide duplication problem is confined to the static/listing pages already covered in §6 — not repeating that analysis here.
- **Brand name in titles**: every `<title>` on the live site currently reads `TechPulse`, not `Techpulzo` — this is the `NEXT_PUBLIC_SITE_NAME` env-var drift `08-trust-ux-audit.md §1.1` already root-caused and flagged as its top-priority fix. Confirmed still live today; not re-diagnosing it here, just noting it's the reason every title tag in this audit's own live checks shows "TechPulse."

## 12. Image alt text

Verified live on the sampled article: **every `<img>` element (7 total — cover image, author avatar, QR code, 4 related-post thumbnails) has a non-empty, descriptive `alt` attribute** — cover images use the full post title, the QR code uses `"QR Code"`, related-post thumbnails use their own post titles. No missing or generic (`"image"`, `"photo123.jpg"`) alt text found. This is a genuine strength, not a gap — no action needed.

## 13. Redirects and 404 handling

| Scenario | Live result |
|---|---|
| `http://` → `https://` | `301`, correct |
| Trailing slash (`/article-slug/`) | `308` → strips slash, correct (Next.js default) |
| `www` → apex | **No redirect — `200` on both** (§3) |
| Case-mismatched slug | `404` (case-sensitive matching, no duplicate served) |
| Nonexistent page/category | `404`, correct |
| `/admin` (unauthenticated) | `307` (auth redirect to login) — correct, not indexable regardless per `robots.txt` |

**No mechanism exists for redirecting an old slug to a new one.** Checked `prisma/schema.prisma`'s `Post` model directly — there is no slug-history field, no separate redirects table, and `next.config.ts` defines no static `redirects()`. If an already-published, already-indexed article's slug is ever changed (via the admin post editor), the old URL will `404` permanently with no path back to the new one — any inbound links or search rankings the old URL had accumulated are simply lost. This is worth flagging now, before it happens, rather than after: with 47 published articles and an active editorial pipeline (85 scheduled), a slug edit is a realistic future event, not a hypothetical.

**No custom `not-found.tsx` exists anywhere in `src/app`** — confirmed by direct file search. Every `404` on the site (nonexistent URL, empty category, no-Tamil-content `/ta`) falls through to Next.js's bare default 404 page, which has no navigation, no search bar, and no link back into the site. Combined with the point above, a visitor (or a crawler retrying a now-dead link) who hits any `404` on this site currently has no in-page way to recover and find live content — they have to manually edit the URL bar.

## 14. Mobile usability

Live-tested at 375×812 (Android viewport emulation) on an article page. `<meta name="viewport" content="width=device-width, initial-scale=1">` is correctly present. Layout rendered without horizontal overflow or broken elements. This is consistent with `08-trust-ux-audit.md §2.16`'s more thorough mobile pass (cookie banner, hamburger menu, breadcrumbs all confirmed working at this viewport) — not re-doing that full pass here, just confirming the viewport-meta/rendering fundamentals that report didn't explicitly check are also fine.

## 15. Performance and Core Web Vitals — partially measurable, no live-lab tool available

Full Core Web Vitals (LOP, INP, CLS field data) require either real-user Chrome UX Report data or a Lighthouse-style lab run, neither of which this audit's toolset can produce. What was directly measurable:

- **Server response time**: homepage `TTFB ≈ 329ms`, article `TTFB ≈ 320ms`, both served with `x-nextjs-cache: HIT` (CDN/ISR cache hit) and `s-maxage=60, stale-while-revalidate=31535940` — a sound caching policy that should keep TTFB low for the overwhelming majority of real requests.
- **Image delivery**: the sampled article's cover image is served through Next.js's built-in image optimizer at a viewport-appropriate width (`_next/image?...&w=750&q=75`) rather than the raw Cloudinary original — correct, bandwidth-conscious behavior that directly helps LCP.
- **A guaranteed-failing request on every single page load**: `<Analytics />` from `@vercel/analytics/next` is included in the root layout (`layout.tsx:4,73`), but the site is hosted on Railway (confirmed via live response header `Server: railway-hikari`), not Vercel. Live browser check confirms `GET /_vercel/insights/script.js` returns `404` on every page load — this endpoint only exists on Vercel's own infrastructure. This isn't a Core Web Vitals blocker (it's a small, async, already-failed request), but it is a real, easily-avoidable wasted request and console error firing on 100% of page loads, and it means Vercel Analytics is not actually collecting any real-user data on this site today — whatever dashboard this is meant to feed is empty.
- **Duplicate API call**: `Navbar.tsx` and `Footer.tsx` each independently `fetch("/api/categories")` on mount (§7.1) — confirmed via live network trace, two separate requests to the same endpoint on every single page load. Minor, but free to fix once someone's in that code for the §7.1 issue.

---

## 16. Priority summary

Ordered by the brief's stated priorities — crawlability, indexing correctness, accessibility, usability, content discovery — not by "SEO best practice" framing:

**Crawlability / indexing correctness:**
1. Redirect `www.techpulzo.in` → `https://techpulzo.in` (or the reverse — either is fine, but pick one) at the hosting/DNS layer. Currently the entire site is duplicated across two hosts with zero redirect (§3).
2. Add `alternates.canonical` to the root layout (or per-page) so the homepage and every static/listing page has an explicit self-referencing canonical tag — currently none of them do (§4.2).
3. Give `/about`, `/contact`, `/privacy`, `/disclosure`, `/posts`, `/category/[slug]`, and `/search` each their own `description` (and, for the four pages missing it, their own `title`) instead of silently inheriting the homepage's — currently at least 9 distinct URL patterns share one identical meta description (§6).
4. Add `robots: { index: false }` to `/search` and drop it from the sitemap — open since `01-forensic-audit.md §5.2`, still live today (§2, §5).
5. Connect Google Search Console — there is currently no way to verify actual indexing status, and the best available proxy suggests a possible total indexing gap worth investigating with real data (§8.3).

**Correctness / avoiding future breakage:**
6. Fix or replace `og-default.png` (still `404` live) — open since `01-forensic-audit.md`, re-confirmed in `08-trust-ux-audit.md`, and re-confirmed again here (§10).
7. Add a redirect mechanism (even a simple slug-history table + lookup) before the first time an already-published article's slug is edited — no such mechanism exists today (§13).
8. Add a custom `not-found.tsx` with navigation/search back into the site — every 404 today is a dead end (§13).
9. Remove `@vercel/analytics` (or migrate to an analytics approach that matches the actual Railway host) — it silently fails on every page load and is collecting no data (§15).

**Content discovery:**
10. Make `Navbar`/`Footer` category links server-rendered instead of client-fetched — currently zero category links exist in any page's raw HTML outside the homepage and `/categories` itself (§7.1).
11. Fix or remove the `/search?featured=true` and `/search?sort=trending` homepage links — both currently land on a plain, unfiltered search page (§7.4).
12. Add `publisher` to the `Article` schema and a site-wide `Organization`/`WebSite` schema to the root layout — no publisher entity is declared anywhere on the site today (§9.1).

This report makes no changes and recommends none be made without separate, explicit sign-off, consistent with every prior report in this series.
