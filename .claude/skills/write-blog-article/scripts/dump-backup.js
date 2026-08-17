#!/usr/bin/env node
// Backs up full Post rows to a single JSON file before any bulk edit.
// Usage: node dump-backup.js <output-path.json>
const { Client } = require('pg');
const fs = require('fs');

async function main() {
  const outPath = process.argv[2];
  if (!outPath) {
    console.error('Usage: node dump-backup.js <output-path.json>');
    process.exit(1);
  }
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }
  const c = new Client({ connectionString: process.env.DATABASE_URL });
  await c.connect();
  try {
    const res = await c.query(`
      SELECT id, title, subtitle, slug, content, excerpt, status, "publishedAt",
             "seoTitle", "metaDescription", keywords, "faqItems", "readingTime", "updatedAt"
      FROM "Post" ORDER BY "publishedAt" ASC NULLS LAST
    `);
    fs.writeFileSync(outPath, JSON.stringify(res.rows, null, 2), 'utf8');
    console.log(`Backed up ${res.rows.length} posts to ${outPath}`);
  } finally {
    await c.end();
  }
}
main().catch(e => { console.error(e); process.exit(1); });
