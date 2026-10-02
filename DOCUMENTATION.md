# Techpulzo — Complete Project Documentation

> Version: 1.1 | Last updated: Aug 15, 2026
> Full reference for features, APIs, tech stack, workflows, and context.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Environment Variables](#3-environment-variables)
4. [Project Structure](#4-project-structure)
5. [Database Schema](#5-database-schema)
6. [API Reference](#6-api-reference)
7. [Pages & Routes](#7-pages--routes)
8. [Components](#8-components)
9. [Authentication](#9-authentication)
10. [File Upload — Cloudinary](#10-file-upload--cloudinary)
11. [Google AdSense](#11-google-adsense)
12. [SEO System](#12-seo-system)
13. [Search System](#13-search-system)
14. [Affiliate Links](#14-affiliate-links)
15. [Analytics](#15-analytics)
16. [Admin Dashboard](#16-admin-dashboard)
17. [Deployment](#17-deployment)
18. [Domain & DNS](#18-domain--dns)
19. [Known Decisions & Context](#19-known-decisions--context)

---

## 1. Project Overview

**Techpulzo** is a professional content publishing and monetization platform.

| Item | Value |
|------|-------|
| Site Name | Techpulzo |
| Live URL | https://techpulzo.in |
| Hosting | **Google Cloud Run** (project `creator-platform-prod`, service `creator-platform`, region `asia-southeast1`) — see §17 |
| GitHub | https://github.com/itzmuthuhere/creator-platform |
| Local path | D:\creator-platform |
| Builder | Muthu Raja (Muthuraja), 26, Java Dev at Bank of America |
| Goal | Generate traffic and revenue via Google AdSense + affiliate links |

### What the platform does

- Publishes in-depth blog articles on tech, career, finance, AI, tutorials
- Monetizes via Google AdSense (14 ad placements) and Amazon affiliate links
- Admin dashboard for writing, editing, publishing posts
- SEO-optimized pages with meta tags, OG images, sitemaps, robots.txt
- Search with hashtag support
- QR code per article
- Analytics dashboard
- Dark/light mode
- Mobile-first responsive design

---

## 2. Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js | 16.2.9 | Full stack React framework |
| Language | TypeScript | 5 | Type safety |
| Styling | Tailwind CSS | v4 | Utility-first CSS |
| Database ORM | Prisma | 7.8.0 | Type-safe DB queries |
| Database | PostgreSQL | — | Hosted on Neon (see §17) |
| Auth | NextAuth.js | 4.24.14 | Email magic link auth |
| Image Upload | Cloudinary | 2.10.0 | Media storage and CDN |
| Rich Editor | Tiptap | 3.27.1 | WYSIWYG post editor |
| UI Components | Radix UI | — | Accessible headless UI |
| Charts | Recharts | 3.9.0 | Analytics charts |
| Icons | Lucide React | 1.21.0 | Icon library |
| QR Codes | qrcode | 1.5.4 | Per-article QR generation |
| Email | Resend HTTP API | — | Magic link email delivery — see §9 for why this was adopted (outbound SMTP was blocked on the old host) |
| Hosting | Google Cloud Run | — | Auto-deploy via GitHub Actions + Cloud Build — see §17 |
| DB Host | Neon | — | Managed serverless PostgreSQL, project `creator-platform`, database `creator_platform_prod` |

### Important version notes

- **Next.js 16**: `params` and `searchParams` must be awaited as Promises in server components
- **Tailwind v4**: Use `@import "tailwindcss"` not `@tailwind base`
- **Prisma 7**: No `url` field in schema.prisma datasource; uses `@prisma/adapter-pg` and `prisma.config.ts`
- **NextAuth v4**: Uses database sessions, email provider only

---

## 3. Environment Variables

**Secrets live in GCP Secret Manager** (project `creator-platform-prod`) — `DATABASE_URL`,
`NEXTAUTH_SECRET`, `CLOUDINARY_API_SECRET`, `RESEND_API_KEY`, `CRON_SECRET` (`gcloud secrets list`
/ `gcloud secrets versions access latest --secret=NAME` from an authenticated shell). Everything
else is a plain env var set directly on the Cloud Run service (`gcloud run services describe
creator-platform --region=asia-southeast1 --format=yaml` shows the full set, or the Cloud Run console
→ service → Edit & Deploy New Revision → Variables & Secrets tab).
`vercel env ls` will show a similar-looking list on the `creator-platform` **Vercel** project —
that project is a leftover/unused deployment target for the same GitHub repo (Vercel still
auto-builds on push, but techpulzo.in's DNS does not point at it). Do not trust Vercel env values
for this app. See §17.

The values below are correct as of Sep 26, 2026 (post-migration to Google Cloud); secrets redacted.

| Variable | Value | Purpose |
|----------|-------|---------|
| `DATABASE_URL` | postgresql://neondb_owner:...@ep-purple-poetry-aonlg5it-pooler.c-2.ap-southeast-1.aws.neon.tech/creator_platform_prod | Neon PostgreSQL connection (pooled) — used for both the runtime app and the build-time `generateStaticParams()` query, see §17 |
| `NEXTAUTH_URL` | https://techpulzo.in | Auth callback base URL — **do not let this drift to the raw `*.run.app` Cloud Run hostname**, same class of bug that hit this app on Railway, see §9 |
| `NEXTAUTH_URL_PRODUCTION` | https://techpulzo.in | Same as above; NextAuth reads this in production |
| `NEXTAUTH_SECRET` | CB/PbWrTZGR... | NextAuth JWT secret |
| `ADMIN_EMAIL` | rajamuthu107@gmail.com,nithiyaraj17081998@gmail.com | Comma-separated admin emails |
| `CLOUDINARY_CLOUD_NAME` | dkoqrad8k | Cloudinary cloud |
| `CLOUDINARY_API_KEY` | 851729445168496 | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | 5MbhwG8TXn3NDqr-xi_zFALs1KI | Cloudinary secret |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | dkoqrad8k | Client-side Cloudinary name |
| `RESEND_API_KEY` | re_Axs8XpZJ_... | Resend API key, "Sending access" scope — sends magic-link email, see §9 |
| `EMAIL_FROM` | Techpulzo \<login@techpulzo.in\> | Verified sender identity in Resend (domain `techpulzo.in` verified Aug 15, 2026) |
| `NEXT_PUBLIC_SITE_URL` | https://techpulzo.in | Used in SEO, OG tags, sitemap.xml, canonical URLs — same drift warning as `NEXTAUTH_URL` above |
| `NEXT_PUBLIC_SITE_NAME` | Techpulzo | Site name shown in UI |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | ca-pub-5709135704283433 | Google AdSense publisher ID |

**No longer used (Aug 15, 2026)**: `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD` (Gmail SMTP config) — the app no longer reads these; not carried over to the Cloud Run env config during the Sep 2026 migration. See §9 for why they were replaced.

### Local .env file location
`D:\creator-platform\.env`

---

## 4. Project Structure

```
D:\creator-platform\
├── prisma/
│   ├── schema.prisma          # Database models
│   └── prisma.config.ts       # Prisma adapter config (Prisma 7)
├── public/
│   ├── ads.txt                # AdSense verification file
│   └── og-default.png         # Default OG image
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout — AdSense script, fonts, providers
│   │   ├── robots.ts          # robots.txt generation
│   │   ├── sitemap.ts         # sitemap.xml generation
│   │   ├── (public)/          # Public-facing pages
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── [slug]/page.tsx        # Article page
│   │   │   ├── search/page.tsx        # Search results
│   │   │   ├── posts/page.tsx         # All articles list
│   │   │   ├── category/[slug]/page.tsx  # Category page
│   │   │   ├── about/page.tsx         # About page
│   │   │   ├── privacy/page.tsx       # Privacy policy
│   │   │   └── disclosure/page.tsx    # Affiliate disclosure
│   │   ├── (admin)/           # Admin-only pages (auth protected)
│   │   │   ├── layout.tsx     # Admin layout wrapper
│   │   │   └── admin/
│   │   │       ├── page.tsx           # Admin redirect
│   │   │       ├── login/page.tsx     # Magic link login
│   │   │       ├── dashboard/page.tsx # Stats overview
│   │   │       ├── posts/
│   │   │       │   ├── page.tsx       # All posts table
│   │   │       │   ├── new/page.tsx   # Create post
│   │   │       │   └── [slug]/edit/page.tsx  # Edit post
│   │   │       ├── categories/page.tsx # Category management
│   │   │       └── analytics/page.tsx  # Analytics charts
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts  # NextAuth handler
│   │       ├── posts/route.ts         # GET all, POST create
│   │       ├── posts/[slug]/route.ts  # GET one, PUT update, DELETE
│   │       ├── categories/route.ts    # GET, POST, PUT, DELETE categories
│   │       ├── search/route.ts        # Search with hashtag support
│   │       ├── upload/route.ts        # Cloudinary image upload
│   │       ├── analytics/route.ts     # Analytics data
│   │       ├── affiliate/[id]/click/route.ts  # Affiliate click tracking
│   │       └── qr/[slug]/route.ts     # QR code generation
│   ├── components/
│   │   ├── ads/
│   │   │   └── AdUnit.tsx     # Reusable Google AdSense component
│   │   ├── admin/
│   │   │   ├── AdminLayout.tsx        # Admin sidebar layout
│   │   │   ├── PostEditor.tsx         # Full post creation/edit form
│   │   │   └── DeletePostButton.tsx   # Delete with confirmation
│   │   ├── editor/
│   │   │   └── RichTextEditor.tsx     # Tiptap WYSIWYG editor
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Top navigation (dynamic categories)
│   │   │   ├── Footer.tsx     # Footer (dynamic categories)
│   │   │   ├── SessionProvider.tsx    # NextAuth session wrapper
│   │   │   └── ThemeProvider.tsx      # Dark/light mode provider
│   │   ├── posts/
│   │   │   ├── PostCard.tsx   # Reusable post card (3 variants)
│   │   │   ├── SearchBar.tsx  # Search input with suggestions
│   │   │   ├── AffiliateSection.tsx   # Affiliate links display
│   │   │   ├── QRCodeSection.tsx      # Article QR code
│   │   │   └── ShareButtons.tsx       # Social share buttons
│   │   └── ui/
│   │       ├── badge.tsx      # Badge component
│   │       ├── button.tsx     # Button component
│   │       ├── card.tsx       # Card component
│   │       └── input.tsx      # Input component
│   ├── lib/
│   │   ├── auth.ts            # NextAuth config
│   │   ├── cloudinary.ts      # Cloudinary client
│   │   ├── prisma.ts          # Prisma client singleton
│   │   └── utils.ts           # formatDate, formatNumber, getBaseUrl
│   └── types/
│       └── index.ts           # Shared TypeScript types
```

---

## 5. Database Schema

### User
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | Primary key |
| name | String? | Display name |
| email | String? (unique) | Login email |
| role | Role enum | ADMIN / CREATOR / VIEWER |
| bio | String? | Author bio |
| socialLinks | Json? | Social media links |

### Post
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | Primary key |
| title | String | Article title |
| subtitle | String? | Optional subtitle |
| slug | String (unique) | URL-friendly identifier |
| content | String (Text) | HTML content from Tiptap |
| excerpt | String? | Short summary |
| coverImage | String? | Cloudinary URL |
| status | PostStatus | DRAFT / PUBLISHED / SCHEDULED / UNPUBLISHED |
| featured | Boolean | Show in Editor's Picks |
| sponsored | Boolean | Mark as sponsored |
| readingTime | Int | Auto-calculated minutes |
| viewCount | Int | Incremented on each visit |
| seoTitle | String? | Custom SEO title |
| metaDescription | String? | Custom meta description |
| keywords | String[] | SEO keywords array |
| canonicalUrl | String? | Custom canonical URL |
| ogImage | String? | Custom OG image |
| publishedAt | DateTime? | When published |
| authorId | String | FK → User |
| categoryId | String? | FK → Category |

### Category
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | Primary key |
| name | String (unique) | Display name |
| slug | String (unique) | URL slug |
| description | String? | Optional description |
| color | String? | Hex color for UI |

### Tag
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | Primary key |
| name | String (unique) | Tag name (stored without #) |
| slug | String (unique) | URL slug |

### AffiliateLink
| Column | Type | Notes |
|--------|------|-------|
| id | String (cuid) | Primary key |
| postId | String | FK → Post |
| label | String | Product name |
| url | String | Affiliate URL |
| platform | String? | Amazon, Flipkart etc. |
| clickCount | Int | Click tracking |

### SearchQuery
| Column | Type | Notes |
|--------|------|-------|
| query | String | Search term |
| count | Int | How many times searched |
| results | Int | Number of results returned |

### PostAnalytic
| Column | Type | Notes |
|--------|------|-------|
| postId | String | FK → Post |
| date | Date | Analytics date |
| views | Int | Views on that date |
| source | String? | Traffic source |
| country | String? | Visitor country |

---

## 6. API Reference

### Posts

#### GET /api/posts
Returns all published posts.

Query params:
- `page` — page number (default: 1)
- `limit` — posts per page (default: 10)
- `category` — filter by category slug
- `featured` — filter featured posts

Response:
```json
{
  "posts": [...],
  "total": 42,
  "page": 1
}
```

#### POST /api/posts
Create a new post. Requires session.

Body:
```json
{
  "title": "string",
  "subtitle": "string?",
  "content": "html string",
  "excerpt": "string?",
  "coverImage": "string?",
  "status": "DRAFT | PUBLISHED | SCHEDULED | UNPUBLISHED",
  "featured": false,
  "sponsored": false,
  "categoryId": "string?",
  "tags": ["string"],
  "seoTitle": "string?",
  "metaDescription": "string?",
  "keywords": ["string"],
  "affiliateLinks": [{ "label": "", "url": "", "platform": "" }]
}
```

#### GET /api/posts/[slug]
Returns a single post by slug.

#### PUT /api/posts/[slug]
Update a post. Requires session.

#### DELETE /api/posts/[slug]
Delete a post. Requires session.

---

### Categories

#### GET /api/categories
Returns all categories with post counts.

#### POST /api/categories
Create a new category.

Body: `{ "name": "string", "description": "string?", "color": "string?" }`

#### PUT /api/categories
Update a category.

Body: `{ "id": "string", "name": "string", "description": "string?", "color": "string?" }`

#### DELETE /api/categories
Delete a category.

Query: `?id=categoryId`

---

### Search

#### GET /api/search
Search posts by keyword or hashtag.

Query params:
- `q` — search query (hashtag # prefix is stripped automatically)
- `limit` — results limit (default: 12)

Response:
```json
{
  "posts": [...],
  "total": 5
}
```

**Hashtag search**: Searching `#python` automatically strips `#` and searches for `python` in tags.

---

### Upload

#### POST /api/upload
Upload image to Cloudinary. Returns URL.

Body: `FormData` with `file` field.

Response: `{ "url": "https://res.cloudinary.com/..." }`

---

### Analytics

#### GET /api/analytics
Returns site analytics data. Requires session.

Query params:
- `range` — `7d | 30d | 90d` (default: 30d)

---

### Affiliate Click Tracking

#### POST /api/affiliate/[id]/click
Increments click count for an affiliate link.

---

### QR Code

#### GET /api/qr/[slug]
Returns QR code PNG image for the article URL.

---

## 7. Pages & Routes

### Public Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `(public)/page.tsx` | Homepage — hero, featured, categories, trending, latest |
| `/[slug]` | `(public)/[slug]/page.tsx` | Article page with full content |
| `/posts` | `(public)/posts/page.tsx` | All articles with pagination |
| `/search` | `(public)/search/page.tsx` | Search results page |
| `/category/[slug]` | `(public)/category/[slug]/page.tsx` | Category articles |
| `/about` | `(public)/about/page.tsx` | About page |
| `/privacy` | `(public)/privacy/page.tsx` | Privacy policy |
| `/disclosure` | `(public)/disclosure/page.tsx` | Affiliate disclosure |
| `/sitemap.xml` | `app/sitemap.ts` | Auto-generated sitemap |
| `/robots.txt` | `app/robots.ts` | robots.txt |
| `/ads.txt` | `public/ads.txt` | AdSense verification |

### Admin Routes (requires login)

| Route | Description |
|-------|-------------|
| `/admin/login` | Magic link login page |
| `/admin/dashboard` | Stats overview |
| `/admin/posts` | All posts table with edit/delete |
| `/admin/posts/new` | Create new post |
| `/admin/posts/[slug]/edit` | Edit existing post |
| `/admin/categories` | Manage categories |
| `/admin/analytics` | Analytics charts |

---

## 8. Components

### AdUnit (`src/components/ads/AdUnit.tsx`)

Reusable Google AdSense component.

```tsx
<AdUnit
  slot="1234567890"      // AdSense ad slot ID
  format="horizontal"    // auto | rectangle | vertical | horizontal
  className="h-24"       // Tailwind height classes
  label={true}           // Show "Advertisement" label
/>
```

**Behavior**: Shows "Ad Placement" placeholder when `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is not set. Activates real ads when env var is present.

**Ad placements across site:**
- Homepage: 4 ads (below hero, between featured/categories, rectangle, before latest)
- Article page: 6 ads (below cover, mid-content, end, sidebar ×2, before/after related)
- Search page: 2 ads (top, between results)
- Category page: 2 ads (below header, between results)
- Posts page: 2 ads (top, between results)
- **Total: 16 ad placements**

### PostCard (`src/components/posts/PostCard.tsx`)

Displays a post in card format. 3 variants:

```tsx
<PostCard post={post} variant="featured" />   // Large featured card
<PostCard post={post} variant="horizontal" />  // Horizontal layout
<PostCard post={post} />                       // Default grid card
```

### PostEditor (`src/components/admin/PostEditor.tsx`)

Full post creation/editing form. Fields:
- Title, subtitle, slug (auto-generated)
- Rich text content (Tiptap editor)
- Cover image upload (Cloudinary)
- Category selector
- Tags input
- Status selector (Draft/Published/Scheduled)
- Featured toggle
- Sponsored toggle
- SEO fields (title, description, keywords, canonical, OG image)
- Affiliate links manager

### Navbar (`src/components/layout/Navbar.tsx`)

- Fetches categories dynamically from `/api/categories` on mount
- Shows Home + up to 7 categories
- Search with autocomplete suggestions
- Dark/light mode toggle
- Mobile hamburger menu

### Footer (`src/components/layout/Footer.tsx`)

- Fetches categories dynamically from `/api/categories`
- Links to About, Privacy, Disclosure pages
- Social media icons

---

## 9. Authentication

**Method**: Email magic link (passwordless)

**Flow**:
1. User enters email at `/admin/login`
2. NextAuth sends magic link via Resend's HTTP API (see below)
3. User clicks link → session created in database
4. Session stored in `Session` table via Prisma adapter

**Admin access control**:
- Only emails in `ADMIN_EMAIL` env var can sign in
- Multiple admins: comma-separated `email1@gmail.com,email2@gmail.com`
- Checked in `auth.ts` → `signIn` callback, which runs on the initial `/api/auth/signin/email` POST — an email not in the allow-list gets `AccessDenied` immediately and no email is sent at all (not just blocked at the callback-click step)

**Current admins**:
- rajamuthu107@gmail.com
- nithiyaraj17081998@gmail.com

**Session strategy**: Database sessions (not JWT)

### Email delivery: Resend HTTP API, not SMTP (as of Aug 15, 2026)

`src/lib/auth.ts` → `EmailProvider` uses a custom `sendVerificationRequest` that POSTs to
`https://api.resend.com/emails` instead of nodemailer/SMTP.

**Why**: the app originally sent magic-link email via raw SMTP to `smtp.gmail.com` (port 587,
then 465). Both hung indefinitely on the **live Railway service** —
`railway logs --network` showed repeated TCP SYN retransmission with no response, and
application logs eventually surfaced `[next-auth][error][SIGNIN_EMAIL_ERROR] Connection timeout`.
Critically, the identical SMTP credentials worked fine when tested via `railway run` (a one-off
job container) — only the persistent service container's outbound SMTP was blocked, which points
to a Railway anti-abuse policy on services rather than a config problem. Resend's API rides
HTTPS/443, which is never blocked, and fixed it immediately.

**Sender identity**: `EMAIL_FROM` is `Techpulzo <login@techpulzo.in>`, sent from Resend's Tokyo
(ap-northeast-1) region. The `techpulzo.in` domain is verified in Resend (DKIM + SPF) — see §18 for
the DNS records. Before verification (same day), `EMAIL_FROM` was temporarily
`onboarding@resend.dev`, Resend's shared sandbox address, which only delivers to the email used to
sign up for the Resend account — that's why it briefly worked for `rajamuthu107@gmail.com` but
not `nithiyaraj17081998@gmail.com`.

**Debugging note**: if magic-link email ever stops arriving again, check (in order): Resend
dashboard → Emails (delivery status, bounces), Railway `RESEND_API_KEY` is still set, and the
`ADMIN_EMAIL` allow-list actually contains the address being tested (an `AccessDenied` response is
a config issue, not a delivery issue — no email is even attempted in that case).

---

## 10. File Upload — Cloudinary

**Config**: `src/lib/cloudinary.ts`

**Upload endpoint**: `POST /api/upload`

**Flow**:
1. Admin selects image in PostEditor
2. Frontend sends `FormData` to `/api/upload`
3. Server uploads to Cloudinary using API key
4. Returns Cloudinary CDN URL
5. URL stored in post's `coverImage` field

**Cloudinary account**:
- Cloud name: `dkoqrad8k`
- Images stored at: `res.cloudinary.com/dkoqrad8k/...`

---

## 11. Google AdSense

**Publisher ID**: `ca-pub-5709135704283433`

**Setup**:
- AdSense verification script loaded in `src/app/layout.tsx` via `next/script`
- Only loads when `NEXT_PUBLIC_ADSENSE_CLIENT_ID` env var is set
- `public/ads.txt` used for site verification

**`NEXT_PUBLIC_ADS_LIVE` gate (added Aug 2, 2026)**: `AdUnit.tsx` renders nothing
(not even a placeholder box) unless `NEXT_PUBLIC_ADS_LIVE="true"`. Previously,
having `NEXT_PUBLIC_ADSENSE_CLIENT_ID` set (it was, in Vercel) was enough to
make every `<AdUnit>` render a real `<ins class="adsbygoogle">` request using
the placeholder slot IDs below — none of which exist in AdSense. Since the
account wasn't approved either, nothing filled those slots, so the site
showed empty "Advertisement"-labeled boxes stacked between short sections of
content (5 on the homepage, 6–7 on a single article) — a strong low-value /
ad-heavy signal to AdSense reviewers, and a likely contributor to repeated
rejection. Leave `NEXT_PUBLIC_ADS_LIVE` unset/`false` until **both** of these
are true, then flip it to `"true"` on the Cloud Run service (`gcloud run services update
creator-platform --region=asia-southeast1 --update-env-vars=NEXT_PUBLIC_ADS_LIVE=true`, or via the
Cloud Run console → service → Edit & Deploy New Revision → Variables & Secrets):
1. AdSense account is approved
2. Every placeholder slot ID below has been replaced with a real one

**AdUnit slot IDs** (placeholder — replace with real AdSense slot IDs):

| Page | Slot ID | Format |
|------|---------|--------|
| Homepage — below hero | 1111111111 | horizontal |
| Homepage — between featured/categories | 2222222222 | horizontal |
| Homepage — between categories/trending | 3333333333 | rectangle |
| Homepage — before latest | 4444444444 | horizontal |
| Article — below cover image | 5555555555 | horizontal |
| Article — mid content | 6666666666 | rectangle |
| Article — end of article | 7777777777 | horizontal |
| Article — sidebar top | 8888888888 | vertical |
| Article — sidebar bottom | 9999999999 | rectangle |
| Article — before related posts | 1010101010 | horizontal |
| Article — after related posts | 1122334455 | horizontal |
| Search — top | 2233445566 | horizontal |
| Search — between results | 3344556677 | horizontal |
| Category — below header | 4455667788 | horizontal |
| Category — between results | 5566778899 | rectangle |
| Posts — top | 6677889900 | horizontal |

**To get real slot IDs**:
1. AdSense → Ads → By ad unit → Display ads
2. Create one unit per placement
3. Replace placeholder IDs in respective page files

**Status (Sep 16, 2026)**: rejected 5× for "Low value content" as of Aug 14, 2026. Root cause
(canonical URL bug, below) and follow-up content fixes (reports 11–18) were applied through
Aug 20. Review re-requested in the AdSense dashboard on **16 Sep 2026 11:28** — this is the
first review to run against the site with the canonical bug actually fixed, not just another
retry. Per Google's own estimate this can take anywhere from a few days to 2-4 weeks. See below
for what was actually wrong.

### Root cause found Aug 14, 2026: canonical URLs pointed at the wrong domain

`NEXT_PUBLIC_SITE_URL`, `NEXTAUTH_URL`, and `NEXTAUTH_URL_PRODUCTION` had drifted in Railway to
the raw `creator-platform-production-b465.up.railway.app` hostname instead of `https://techpulzo.in`
(cause unknown — possibly Railway auto-populating them when the custom domain was configured).
Since `getBaseUrl()` (`src/lib/utils.ts`) reads `NEXT_PUBLIC_SITE_URL`, and Next.js inlines
`NEXT_PUBLIC_*` vars at **build time**, every page's `<link rel="canonical">`, `og:url`, and every
URL in `sitemap.xml` was pointing at the Railway subdomain — not `techpulzo.in`, the domain
actually under AdSense review.

**Why this plausibly explains the rejections**: when Googlebot crawls `techpulzo.in`, every page
declares its canonical version lives on a *different, unrelated domain*. That reads as
duplicate/unoriginal content attached to the reviewed site, regardless of how good the writing
actually is — a much more literal explanation than generic thinness, and it would explain why
earlier rounds of genuine content fixes (real author bios, hiding empty categories, removing
placeholder ad boxes — see git log for `low-value-content`) didn't move the needle. The bug
was structural, not content quality.

**Fix**: reset all three vars to `https://techpulzo.in` in Railway and forced a rebuild (env var
changes alone don't help — `NEXT_PUBLIC_*` is baked into the bundle at build time). Verified live:
canonical/og:url on articles and `sitemap.xml`'s first entry both correctly read `techpulzo.in`.

### Secondary fix: `/ta` (Tamil section) no longer serves an indexable placeholder

`/ta` (see §7, Tamil-language section infrastructure from Aug 12) rendered a real, crawlable page
with only "தமிழில் கட்டுரைகள் வெளியிடப்படும் விரைவில்" ("Tamil articles coming soon") when zero
Tamil posts exist — the same thin-content pattern already fixed for empty categories
(`fix: hide and 404 empty categories`, Aug 3). It wasn't linked from Navbar/Footer and was already
excluded from `sitemap.xml` while empty, so exposure was low, but `src/app/(public)/ta/page.tsx`
now calls `notFound()` when there are no published `locale: "ta"` posts, matching the empty-category
pattern exactly. Revert this once real Tamil content ships.

**Next steps once approved / before resubmitting**: submit `sitemap.xml` in Google Search Console
and request indexing on the homepage + a few articles to speed up the recrawl, then confirm via
GSC's URL Inspection that the "Google-selected canonical" says `techpulzo.in` before resubmitting
for AdSense review.

**While the Sep 16, 2026 review is pending**: avoid major structural changes (nav, redirects,
bulk unpublishing) that could confuse the recrawl. If report 18's still-open items ever need
closing before a future resubmission, they are: (1) a human read of the four merged articles for
voice coherence — Wi-Fi, 2FA, Resume, Salary Negotiation; (2) regenerating the stale
key-takeaways header images on those same four articles; (3) the never-explained
unattributed-database-write pattern from reports 13–18, which needs admin/deployment-log access
this repo's own tooling doesn't have.

---

## 12. SEO System

### Per-post SEO fields
- `seoTitle` — overrides title in `<title>` tag
- `metaDescription` — meta description tag
- `keywords` — keyword array
- `canonicalUrl` — custom canonical URL
- `ogImage` — custom Open Graph image

### Auto-generated
- `sitemap.xml` at `/sitemap.xml` — includes all published posts, categories
- `robots.txt` at `/robots.txt` — allows all crawlers
- Open Graph tags on every page
- Twitter card tags
- Article structured data on post pages

### Dynamic metadata
Every page uses Next.js `generateMetadata()` for server-side meta generation.

---

## 13. Search System

**Endpoint**: `GET /api/search?q=keyword`

**Search fields**:
- Post title (case-insensitive)
- Post excerpt
- Post content
- Tag names

**Hashtag support**: If query starts with `#`, the `#` is stripped before searching tags. Example: `#python` → searches for posts tagged `python`.

**Search tracking**: Every search query is stored in `SearchQuery` table with count. Used to show trending searches on homepage hero and search page.

**Trending threshold**: Only queries with `count >= 3` show in homepage hero tags.

---

## 14. Affiliate Links

**Per-post affiliate links** stored in `AffiliateLink` table.

**Fields**: label, URL, platform, clickCount

**Display**: `AffiliateSection` component shows links as styled product cards below article content.

**Click tracking**: `POST /api/affiliate/[id]/click` increments `clickCount` for analytics.

**Disclosure**: Affiliate disclosure notice auto-shown on every article page.

**Recommended affiliate programs**:
- Amazon India: affiliate-program.amazon.in (4–8% commission)
- Flipkart: affiliate.flipkart.com
- Coursera: coursera.org/affiliate
- Hostinger: hostinger.in/affiliate

---

## 15. Analytics

**Tracking**: View count incremented on every article page load via `prisma.post.update`.

**PostAnalytic table**: Stores daily view counts per post with source and country.

**Admin analytics page** (`/admin/analytics`): Shows:
- Total views over time (line chart)
- Top posts by views
- Views by category

**Recharts** used for all charts.

---

## 16. Admin Dashboard

### Login
URL: `https://techpulzo.in/admin/login`

Enter admin email → receive magic link → click → logged in.

### Dashboard (`/admin/dashboard`)
- Total posts count
- Total views
- Draft count
- Published count

### Posts Management (`/admin/posts`)
- Table of all posts (all statuses)
- Edit button → opens full editor
- View button → opens live article (published only)
- Delete button → confirms then deletes

### Create/Edit Post (`/admin/posts/new` or `/admin/posts/[slug]/edit`)

Full PostEditor with:
- Title and subtitle
- Auto-generated slug (editable)
- Tiptap rich text editor (bold, italic, headings, lists, links, images)
- Cover image upload → Cloudinary
- Category dropdown
- Tags input (comma or enter separated)
- Status: Draft / Published / Scheduled / Unpublished
- Featured toggle
- Sponsored toggle + label
- SEO section (title, description, keywords, canonical, OG image)
- Affiliate links (add multiple with label, URL, platform)

### Categories (`/admin/categories`)
- List all categories
- Add new category (name, description, color)
- Edit inline
- Delete with confirm

---

## 17. Deployment

**Platform**: Google Cloud Run (project `creator-platform-prod`, service `creator-platform`,
region `asia-southeast1` / Singapore — same city as Neon). techpulzo.in reaches it through free
Cloud Run domain mappings — see §18. Artifact Registry and the `publish-run-tier` job remain in
`asia-south1`; `cloudbuild.yaml` deploys the service to `_SERVICE_REGION` (default
`asia-southeast1`) and the job to `_REGION`.

**Why not asia-south1 + load balancer (Oct 2, 2026)**: the service originally ran in
`asia-south1`, which doesn't support domain mappings, so techpulzo.in went through a Global
External HTTPS Load Balancer. Its forwarding rules bill ~$0.025/hr (~₹50/day, ~₹1,500/month)
regardless of traffic — the first GCP bill after migration was ₹435 for ~8 days, almost all LB.
Firebase Hosting was ruled out because it strips every request cookie except `__session`, which
breaks next-auth admin login. Moving the service to `asia-southeast1` allows free domain mappings
and puts it in the same region as Neon.

**Migration history**: this app ran on Railway (project `humorous-commitment`) from launch until
it was migrated to Google Cloud Run + Neon on **Sep 24–26, 2026**, to cut hosting cost — Railway's
paid plan cost more than this app needed, whereas Cloud Run's free tier plus Neon's free tier
covers a low-traffic blog at effectively $0/month. Railway's project and subscription were deleted
after migration verification. Historical incident write-ups elsewhere in this doc (§9, §11) that
reference Railway describe issues from *before* the migration and are kept as-is for the
record — they are not current architecture.

**Database**: Neon (project `creator-platform`, database `creator_platform_prod`, region AWS
`ap-southeast-1` / Singapore) — not Cloud SQL. Cloud SQL has no free tier and would run
~$10–17/month regardless of traffic; Neon's free tier fits this app's usage. Local `.env` points
at a separate, older Neon database (`neondb`, same Neon project) left over from early
development — don't trust local `npm run dev` data as a preview of production content. To run
commands against the real database, use the `creator_platform_prod` connection string from GCP
Secret Manager (`gcloud secrets versions access latest --secret=DATABASE_URL`), not local `.env`.

**Build-time DB dependency**: `next build` calls `generateStaticParams()` in
`src/app/(public)/[slug]/page.tsx`, which queries Postgres for every published slug to
pre-render — this needs a real, reachable `DATABASE_URL` *during the build*, not just at runtime.
`Dockerfile` takes it as a build `ARG`; `cloudbuild.yaml` supplies it from the same Secret Manager
secret used at runtime (Neon's connection string is a public, SSL-required endpoint, so no extra
networking is needed for the build to reach it).

**Auto-deploy**: Every push to `main` triggers `.github/workflows/deploy-cloud-run.yml`, which
authenticates to GCP via Workload Identity Federation (pool `github-pool`, provider
`github-provider`, service account `gh-deployer@creator-platform-prod.iam.gserviceaccount.com` —
no long-lived JSON key in GitHub secrets) and runs `cloudbuild.yaml`. That builds the image from
`Dockerfile`, pushes it to Artifact Registry (`asia-south1-docker.pkg.dev/creator-platform-prod/
creator-platform`), deploys the Cloud Run service, and updates the `publish-run-tier` Cloud Run
Job (below) to the same image. Required GitHub repo secrets: `GCP_WORKLOAD_IDENTITY_PROVIDER`,
`GCP_SERVICE_ACCOUNT`; variables: `GCP_PROJECT_ID`, `GCP_REGION`, `GCP_ARTIFACT_REPO`,
`GCP_CLOUD_RUN_SERVICE`.

**railway.json** in the repo root is a vestigial safety pin from the migration (it forced Railway
to keep using Nixpacks instead of auto-detecting the new root `Dockerfile` and breaking the old
deploy mid-migration). Harmless now that Railway is gone; safe to delete.

**Publish queue cron**: the twice-daily publish-queue drain (`scripts/publish-run-tier.mjs`) that
ran as a Railway cron service now runs as a **Cloud Run Job** (`publish-run-tier`, same image as
the web service, entrypoint overridden to `node scripts/publish-run-tier.mjs`), triggered by
**Cloud Scheduler** (`publish-run-tier-trigger`, schedule `43 2,14 * * *` UTC — same schedule as
before) via a dedicated `scheduler-invoker` service account with `roles/run.invoker` on the job.
Manually test with `gcloud run jobs execute publish-run-tier --region=asia-south1 --args=scripts/
publish-run-tier.mjs,--dry-run --wait` (the job's default args have no `--dry-run`, so passing
`--args` at execute time replaces them entirely — always include the script path).

**Deploy time**: ~2–4 minutes (Cloud Build has no layer cache from local Docker builds, so it
reinstalls `npm ci` from scratch each time)

**Build command**: `prisma generate && next build && cp -r public .next/standalone/public && cp -r .next/static .next/standalone/.next/static` (see `package.json` `build` script; `Dockerfile` runs this inside a multi-stage build)

**Git workflow**:
```bash
cd D:\creator-platform
git add -A
git commit -m "feat: description"
git push origin main
# GitHub Actions builds and deploys to Cloud Run in ~2-4 minutes
```

**Git config** (important — must match GitHub account):
```
user.name  = itzmuthuhere
user.email = rajamuthu107107@gmail.com
```

**First-time / manual deploy** (bypassing CI, e.g. for local debugging): build and push with
Docker directly, then `gcloud run deploy`:
```bash
docker build --build-arg DATABASE_URL="<neon connection string>" \
  -t asia-south1-docker.pkg.dev/creator-platform-prod/creator-platform/creator-platform:manual .
docker push asia-south1-docker.pkg.dev/creator-platform-prod/creator-platform/creator-platform:manual
gcloud run deploy creator-platform --image=...:manual --region=asia-southeast1
```

---

## 18. Domain & DNS

| Item | Value |
|------|-------|
| Domain | techpulzo.in |
| Registrar | GoDaddy |
| Nameservers | ns1.vercel-dns.com, ns2.vercel-dns.com (still accurate — verified `nslookup -type=NS techpulzo.in`, Aug 2, 2026) |
| DNS records managed in | Vercel's DNS panel (via nameserver delegation) — apex `techpulzo.in` has `A` records `216.239.32.21`, `216.239.34.21`, `216.239.36.21`, `216.239.38.21` (optional `AAAA` records `2001:4860:4802:{32,34,36,38}::15` not added); `www` is a `CNAME` → `ghs.googlehosted.com.` |
| Actual hosting/SSL | Google Cloud — Cloud Run domain mappings (`gcloud beta run domain-mappings list --region=asia-southeast1`), Google-managed certs (see §17) |
| Domain expires | Jun 28, 2027 |
| KYC status | Verified |

**Former load balancer setup** (removed Oct 2026 — see §17 for why; kept for the record):
Serverless NEG `creator-platform-neg` → backend service
`creator-platform-backend` → URL map `creator-platform-lb` → target HTTPS proxy
`creator-platform-https-proxy` (two Google-managed SSL certs attached — `creator-platform-cert`
for the apex domain, `creator-platform-www-cert` for `www`) → global forwarding rule on the static
IP `creator-platform-ip` (`136.82.10.1`). A parallel HTTP→HTTPS redirect uses its own URL map
(`creator-platform-http-redirect`) and proxy on port 80. Managed certs can take 15–60 min to
activate after DNS starts pointing at the IP — check status with `gcloud compute
ssl-certificates describe creator-platform-cert --global --format="value(managed.status)"`.

**www redirect**: `www.techpulzo.in` → its own domain mapping to the same service → app-level
308 redirect (in `next.config.ts`) → `techpulzo.in`.

**Vestigial Railway records**: `_railway-verify` and `_railway-verify.www` TXT records, and one
leftover Vercel-auto-managed apex `ALIAS` record (→ `cname.vercel-dns-017.com.`, sitting alongside
the real apex `A` record), are still in the DNS zone from before the migration. Harmless — safe to
delete whenever, just hasn't been cleaned up yet.

**Resend DNS records (added Aug 15, 2026)**, alongside the existing Railway/Google verification
TXT records, added via Vercel's DNS panel to verify `techpulzo.in` for sending email (see §9):

| Name | Type | Purpose |
|------|------|---------|
| `resend._domainkey` | TXT | DKIM |
| `send` | MX (priority 10) | SPF — `feedback-smtp.ap-northeast-1.amazonses.com` |
| `send` | TXT | SPF — `v=spf1 include:amazonses.com ~all` |

DMARC and the "Enable Receiving" MX record were skipped — this app only sends mail, never
receives it. Domain shows **Verified** in Resend's dashboard.

**Old URL still works**: `creator-platform-three-self.vercel.app` still points to same site.

---

## 19. Known Decisions & Context

### Why email magic link auth (no password)
Admin-only platform. No public user registration needed. Magic links are more secure than passwords for a small team.

### Why Vercel nameservers instead of GoDaddy DNS records
GoDaddy DNS record editing was disabled pending WHOIS verification. Switching nameservers to Vercel bypassed the restriction and gave Vercel full DNS control — simpler long-term.

### Why `export const dynamic = "force-dynamic"` on all pages
Next.js tries to statically pre-render pages at build time. Pages that query the database must opt out of static rendering. All DB-querying server pages include this export.

### Why remove role check from API routes
The `session.user.role` was null (not populated from DB correctly). Changed auth check to `!session?.user` — all logged-in users are admins since only admin emails can log in.

### Why Tailwind v4 uses `@import "tailwindcss"`
Tailwind v4 changed the CSS entry syntax. The old `@tailwind base; @tailwind components; @tailwind utilities` causes build errors.

### Why AdSense uses placeholder slot IDs
Real slot IDs are created in AdSense dashboard after account approval. Placeholder IDs (1111111111 etc.) are in place — replace with real ones after approval.

### AdSense account note
Currently under `rajamuthu107@gmail.com`. Plan to transfer to brother's account once everything is confirmed working, to avoid OBA (Outside Business Activity) conflict with Bank of America employment.

### Why `params` must be awaited
Next.js 15/16 changed `params` and `searchParams` to be Promises in server components. All pages use `const { slug } = await params` pattern.

### Cloudinary cleanup note
If image upload to Cloudinary succeeds but DB save fails, the uploaded image becomes orphaned. Not currently handled — future improvement.

### Why email switched from Gmail SMTP to Resend's HTTP API (Aug 15, 2026)
Railway blocks outbound SMTP (ports 587 and 465) from the running service, confirmed via
`[next-auth][error][SIGNIN_EMAIL_ERROR] Connection timeout` in production logs — identical
credentials worked fine from a one-off `railway run` job container, so it's specific to the
persistent service, not the credentials. See §9 for the full story.

### Watch for `NEXT_PUBLIC_SITE_URL` / `NEXTAUTH_URL` drifting off `techpulzo.in`
Found Aug 14, 2026 pointing at the raw `*.up.railway.app` hostname instead, which silently broke
canonical URLs, `og:url`, and `sitemap.xml` sitewide and is the leading suspect for the AdSense
"Low value content" rejections — see §11. If either var ever shows anything other than
`https://techpulzo.in` in `railway variables`, that's a live bug, not a valid alternate config.

---

## Quick Reference

### Run locally
```bash
cd D:\creator-platform
npm run dev
# Opens at http://localhost:3000
```

### Push changes
```bash
cd D:\creator-platform
git add -A
git commit -m "feat: your message"
git push origin main
```

### Add new admin email
Vercel → Environment Variables → `ADMIN_EMAIL` → add comma-separated email → Redeploy

### Add real AdSense slot IDs
1. AdSense → Ads → By ad unit → create units
2. Find `slot="1111111111"` etc. in page files
3. Replace with real slot IDs
4. Push to deploy

### Check site health
- Live site: https://techpulzo.in
- Admin: https://techpulzo.in/admin/login
- Sitemap: https://techpulzo.in/sitemap.xml
- Ads.txt: https://techpulzo.in/ads.txt
- Vercel dashboard: vercel.com/itzmuthuhere1/creator-platform
- AdSense: adsense.google.com
- Neon DB: console.neon.tech
- Cloudinary: cloudinary.com/console
- GoDaddy: dcc.godaddy.com
