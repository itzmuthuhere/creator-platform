#!/usr/bin/env node
// Updates an existing post's content/title/etc after a humanization edit.
// Usage: node update-post.js <path-to-patch.json>
// Patch JSON shape: { "id": "...", "content": "<p>...</p>", "title"?, "subtitle"?,
//   "excerpt"?, "seoTitle"?, "metaDescription"? }
// Only fields present in the patch are updated. Recomputes readingTime from content
// whenever content is patched.
const { Client } = require('pg');
const fs = require('fs');

function wordCount(html) {
  const text = (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(' ').length : 0;
}

async function main() {
  const patchPath = process.argv[2];
  if (!patchPath) {
    console.error('Usage: node update-post.js <path-to-patch.json>');
    process.exit(1);
  }
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }
  const patch = JSON.parse(fs.readFileSync(patchPath, 'utf8'));
  if (!patch.id) {
    console.error('Patch JSON must include "id"');
    process.exit(1);
  }

  const fields = [];
  const values = [];
  let i = 1;
  for (const key of ['title', 'subtitle', 'content', 'excerpt', 'seoTitle', 'metaDescription']) {
    if (patch[key] !== undefined) {
      fields.push(`"${key}" = $${i}`);
      values.push(patch[key]);
      i++;
    }
  }
  if (patch.content !== undefined) {
    fields.push(`"readingTime" = $${i}`);
    values.push(Math.max(1, Math.ceil(wordCount(patch.content) / 200)));
    i++;
  }
  if (fields.length === 0) {
    console.error('Patch has no updatable fields');
    process.exit(1);
  }
  fields.push(`"updatedAt" = $${i}`);
  values.push(new Date());
  i++;
  values.push(patch.id);

  const c = new Client({ connectionString: process.env.DATABASE_URL });
  await c.connect();
  try {
    const res = await c.query(`UPDATE "Post" SET ${fields.join(', ')} WHERE id = $${i} RETURNING slug`, values);
    if (res.rows.length === 0) {
      console.error(`No post found with id ${patch.id}`);
      process.exit(1);
    }
    console.log(`Updated: ${res.rows[0].slug}`);
  } finally {
    await c.end();
  }
}
main().catch(e => { console.error(e); process.exit(1); });
