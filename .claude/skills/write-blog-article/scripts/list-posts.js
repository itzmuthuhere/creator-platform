#!/usr/bin/env node
// Lists posts with basic stats. Usage: node list-posts.js [status]
const { Client } = require('pg');

function wordCount(html) {
  const text = (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(' ').length : 0;
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }
  const statusFilter = process.argv[2];
  const c = new Client({ connectionString: process.env.DATABASE_URL });
  await c.connect();
  try {
    let q = 'SELECT p.id, p.slug, p.title, p.status, p.content, u.name as author, p."publishedAt" FROM "Post" p LEFT JOIN "User" u ON p."authorId" = u.id';
    const params = [];
    if (statusFilter) {
      q += ' WHERE p.status = $1';
      params.push(statusFilter);
    }
    q += ' ORDER BY p."publishedAt" ASC NULLS LAST';
    const res = await c.query(q, params);
    for (const row of res.rows) {
      console.log(`${row.id}\t${row.status}\t${wordCount(row.content)}w\t${row.author}\t${row.slug}\t${row.title}`);
    }
    console.log(`\nTotal: ${res.rows.length}`);
  } finally {
    await c.end();
  }
}
main().catch(e => { console.error(e); process.exit(1); });
