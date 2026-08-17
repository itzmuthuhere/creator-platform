#!/usr/bin/env node
// Publishes a drafted article to the Post table.
// Usage: node insert-post.js <path-to-post-spec.json>
//
// Run this from inside the creator-platform project directory so the `pg`
// package resolves (Node resolves modules relative to cwd, not the script's
// own location -- running it from elsewhere throws MODULE_NOT_FOUND even
// though pg is installed).
//
// Requires DATABASE_URL in the environment, pointing at the PUBLIC Railway
// Postgres proxy (the private *.railway.internal host only resolves inside
// Railway's own network, not from your machine). Get it with:
//   railway variables --service <postgres-service-name> --json
// and use the "DATABASE_PUBLIC_URL" value, not "DATABASE_URL", from that output.
//
// Spec JSON shape -- see ../references/post-spec-example.json for a filled-in
// example:
// {
//   "title": "...", "subtitle": "...", "slug": "...",
//   "contentFile": "relative/path/to/content.html",   // or "content": "<p>...</p>" inline
//   "excerpt": "...", "seoTitle": "...", "metaDescription": "...",
//   "keywords": ["...", "..."],
//   "category": "tech",              // must match an existing Category.slug
//   "tags": ["tag-name", "..."],      // reused by name (case-insensitive) or created
//   "author": "Muthu",                // must match an existing User.name
//   "faq": [{ "question": "...", "answer": "..." }]   // goes in faqItems, NOT inline in content
// }

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function cuid() {
  return 'c' + crypto.randomBytes(12).toString('hex');
}

function wordCount(html) {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(' ').length : 0;
}

async function main() {
  const specPath = process.argv[2];
  if (!specPath) {
    console.error('Usage: node insert-post.js <path-to-post-spec.json>');
    process.exit(1);
  }
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Use the Railway Postgres PUBLIC proxy URL (see comment at top of this script).');
    process.exit(1);
  }

  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  const content = spec.content || fs.readFileSync(path.resolve(path.dirname(specPath), spec.contentFile), 'utf8');

  const required = ['title', 'slug', 'excerpt', 'category', 'author', 'faq'];
  for (const field of required) {
    if (!spec[field]) {
      console.error(`Missing required field in spec: ${field}`);
      process.exit(1);
    }
  }

  const c = new Client({ connectionString: process.env.DATABASE_URL });
  await c.connect();

  try {
    const existing = await c.query('SELECT id FROM "Post" WHERE slug = $1', [spec.slug]);
    if (existing.rows.length > 0) {
      console.error(`A post with slug "${spec.slug}" already exists. Pick a different slug or edit it directly.`);
      process.exit(1);
    }

    const catRes = await c.query('SELECT id FROM "Category" WHERE slug = $1', [spec.category]);
    if (catRes.rows.length === 0) {
      const all = await c.query('SELECT slug FROM "Category"');
      console.error(`No category with slug "${spec.category}". Available: ${all.rows.map(r => r.slug).join(', ')}`);
      process.exit(1);
    }
    const categoryId = catRes.rows[0].id;

    const authorRes = await c.query('SELECT id FROM "User" WHERE name = $1', [spec.author]);
    if (authorRes.rows.length === 0) {
      const all = await c.query('SELECT name FROM "User" WHERE name IS NOT NULL');
      console.error(`No author named "${spec.author}". Available: ${all.rows.map(r => r.name).join(', ')}`);
      process.exit(1);
    }
    const authorId = authorRes.rows[0].id;

    const words = wordCount(content);
    const readingTime = Math.max(1, Math.ceil(words / 200));
    const id = cuid();
    const now = new Date();
    const faqItems = Array.isArray(spec.faq) ? spec.faq : [spec.faq];

    await c.query(
      `INSERT INTO "Post" (
        id, title, subtitle, slug, content, excerpt, status, featured, sponsored,
        "publishedAt", "createdAt", "updatedAt", "readingTime", "viewCount",
        "reactLike", "reactFire", "reactBulb", "seoTitle", "metaDescription", keywords,
        "faqItems", locale, "authorId", "categoryId", images
      ) VALUES (
        $1, $2, $3, $4, $5, $6, 'PUBLISHED', false, false,
        $7, $7, $7, $8, 0,
        0, 0, 0, $9, $10, $11,
        $12, 'en', $13, $14, ARRAY[]::text[]
      )`,
      [
        id, spec.title, spec.subtitle || null, spec.slug, content, spec.excerpt,
        now, readingTime, spec.seoTitle || spec.title, spec.metaDescription || spec.excerpt,
        spec.keywords || [], JSON.stringify(faqItems), authorId, categoryId,
      ]
    );

    for (const tagName of (spec.tags || [])) {
      const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
      let tagRes = await c.query('SELECT id FROM "Tag" WHERE slug = $1', [tagSlug]);
      let tagId;
      if (tagRes.rows.length === 0) {
        tagId = cuid();
        await c.query('INSERT INTO "Tag" (id, name, slug, "createdAt") VALUES ($1, $2, $3, $4)', [tagId, tagName, tagSlug, now]);
      } else {
        tagId = tagRes.rows[0].id;
      }
      await c.query('INSERT INTO "_PostToTag" ("A", "B") VALUES ($1, $2) ON CONFLICT DO NOTHING', [id, tagId]);
    }

    console.log(`Published: ${spec.slug} (${words} words, ${readingTime} min read)`);
    console.log(`Live at: https://techpulzo.in/${spec.slug}`);
    console.log('Note: ISR caching means the first request right after this may still show a 404 or stale page -- request the URL twice, a few seconds apart, before concluding something is wrong.');
  } finally {
    await c.end();
  }
}

main().catch(e => { console.error(e); process.exit(1); });
