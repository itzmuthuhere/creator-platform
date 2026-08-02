# Techpulzo — Complete Project Documentation

> Version: 1.0 | Last updated: Jun 28, 2026
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
| Hosting | **Railway** (project `humorous-commitment`, service `creator-platform`) — see §17 |
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
| Database | PostgreSQL | — | Hosted on Railway (see §17) |
| Auth | NextAuth.js | 4.24.14 | Email magic link auth |
| Image Upload | Cloudinary | 2.10.0 | Media storage and CDN |
| Rich Editor | Tiptap | 3.27.1 | WYSIWYG post editor |
| UI Components | Radix UI | — | Accessible headless UI |
| Charts | Recharts | 3.9.0 | Analytics charts |
| Icons | Lucide React | 1.21.0 | Icon library |
| QR Codes | qrcode | 1.5.4 | Per-article QR generation |
| Email | Nodemailer | 7.0.13 | Magic link email delivery |
| Hosting | Railway | — | Auto-deploy from GitHub — see §17 |
| DB Host | Railway Postgres | — | Managed PostgreSQL, service `Postgres` |

### Important version notes

- **Next.js 16**: `params` and `searchParams` must be awaited as Promises in server components
- **Tailwind v4**: Use `@import "tailwindcss"` not `@tailwind base`
- **Prisma 7**: No `url` field in schema.prisma datasource; uses `@prisma/adapter-pg` and `prisma.config.ts`
- **NextAuth v4**: Uses database sessions, email provider only

---

## 3. Environment Variables

**All variables live in Railway** → project `humorous-commitment` → service `creator-platform` →
Variables tab (`railway variables --service creator-platform` from a linked shell also works).
`vercel env ls` will show a similar-looking list on the `creator-platform` **Vercel** project —
that project is a leftover/unused deployment target for the same GitHub repo (Vercel still
auto-builds on push, but techpulzo.in's DNS does not point at it). Do not trust Vercel env values
for this app; Railway is the source of truth. See §17.

The values below are correct as of Aug 2, 2026 (verified via `railway run`); DB password redacted.

| Variable | Value | Purpose |
|----------|-------|---------|
| `DATABASE_URL` | postgresql://postgres:...@kodama.proxy.rlwy.net:23830/railway | Railway PostgreSQL connection |
| `NEXTAUTH_URL` | https://techpulzo.in | Auth callback base URL |
| `NEXTAUTH_SECRET` | CB/PbWrTZGR... | NextAuth JWT secret |
| `ADMIN_EMAIL` | rajamuthu107@gmail.com,nithiyaraj17081998@gmail.com | Comma-separated admin emails |
| `CLOUDINARY_CLOUD_NAME` | dkoqrad8k | Cloudinary cloud |
| `CLOUDINARY_API_KEY` | 851729445168496 | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | 5MbhwG8TXn3NDqr-xi_zFALs1KI | Cloudinary secret |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | dkoqrad8k | Client-side Cloudinary name |
| `EMAIL_SERVER_HOST` | smtp.gmail.com | Gmail SMTP host |
| `EMAIL_SERVER_PORT` | 587 | Gmail SMTP port |
| `EMAIL_SERVER_USER` | rajamuthu107@gmail.com | Gmail address |
| `EMAIL_SERVER_PASSWORD` | uvfenshpxwbcqtmh | Gmail App Password |
| `EMAIL_FROM` | rajamuthu107@gmail.com | From address for magic links |
| `NEXT_PUBLIC_SITE_URL` | https://techpulzo.in | Used in SEO and OG tags |
| `NEXT_PUBLIC_SITE_NAME` | Techpulzo | Site name shown in UI |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | ca-pub-5709135704283433 | Google AdSense publisher ID |

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
2. NextAuth sends magic link to email via Gmail SMTP
3. User clicks link → session created in database
4. Session stored in `Session` table via Prisma adapter

**Admin access control**:
- Only emails in `ADMIN_EMAIL` env var can sign in
- Multiple admins: comma-separated `email1@gmail.com,email2@gmail.com`
- Check in `auth.ts` → `signIn` callback

**Current admins**:
- rajamuthu107@gmail.com
- nithiyaraj17081998@gmail.com

**Session strategy**: Database sessions (not JWT)

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
are true, then flip it to `"true"` in Railway (project `humorous-commitment` → service
`creator-platform` → Variables):
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

**Status**: Review submitted for `techpulzo.in`. Approval expected in 1–14 days.

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

**Platform**: Railway (project `humorous-commitment`, service `creator-platform`), confirmed via
`railway status` on Aug 2, 2026. techpulzo.in is mapped as a custom domain directly on this
Railway service.

**Correction (Aug 2, 2026)**: this doc previously said Vercel. That was wrong — a `creator-platform`
Vercel project exists and is connected to the same GitHub repo (so it still auto-builds on every
push), but it is **not** what serves techpulzo.in and its env vars/database are not the live ones.
Local `.env` also points at a stale/different Postgres (Neon) left over from early development —
don't trust local `npm run dev` data as a preview of production content. To run commands against
the real database, use `railway run --service creator-platform -- <command>` from a Railway-linked
shell (`railway link` once, `railway whoami` to confirm auth) instead of relying on `.env`.

**Auto-deploy**: Every push to `main` branch triggers a Railway deploy (and a wasted, unused Vercel
build in parallel — harmless, just noise).

**Deploy time**: ~1–2 minutes

**Build command**: `prisma generate && next build`

**Git workflow**:
```bash
cd D:\creator-platform
git add -A
git commit -m "feat: description"
git push origin main
# Railway auto-deploys in ~1-2 minutes
```

**Git config** (important — must match GitHub account):
```
user.name  = itzmuthuhere
user.email = rajamuthu107107@gmail.com
```

---

## 18. Domain & DNS

| Item | Value |
|------|-------|
| Domain | techpulzo.in |
| Registrar | GoDaddy |
| Nameservers | ns1.vercel-dns.com, ns2.vercel-dns.com (still accurate — verified `nslookup -type=NS techpulzo.in`, Aug 2, 2026) |
| DNS records managed in | Vercel's DNS panel (via nameserver delegation) — but the record for techpulzo.in itself points at **Railway**, not the Vercel app |
| Actual hosting/SSL | Railway (custom domain on the `creator-platform` service) — see §17 |
| Domain expires | Jun 28, 2027 |
| KYC status | Verified |

**www redirect**: `www.techpulzo.in` → 308 redirect → `techpulzo.in`

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
