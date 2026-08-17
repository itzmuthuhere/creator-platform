#!/usr/bin/env node
// Corpus-level triage scan across every post: opening line, closing heading,
// overused-word counts, contrastive-crutch count, em-dash count, word count.
// Usage: node corpus-scan.js [status]
// Prints TSV to stdout: id, slug, words, actually, genuinely, contrast, emdash, opening, closing
const { Client } = require('pg');

function wordCount(html) {
  const text = (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(' ').length : 0;
}

function stripTags(s) {
  return (s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
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
    let q = 'SELECT id, slug, title, content, status FROM "Post"';
    const params = [];
    if (statusFilter) {
      q += ' WHERE status = $1';
      params.push(statusFilter);
    }
    q += ' ORDER BY "publishedAt" ASC NULLS LAST';
    const res = await c.query(q, params);

    console.log(['id', 'slug', 'words', 'actually', 'genuinely', 'contrast', 'emdash', 'opening', 'closingHeading'].join('\t'));
    const closingHeadings = {};
    for (const row of res.rows) {
      const html = row.content || '';
      const words = wordCount(html);
      const actually = (html.match(/\bactually\b/gi) || []).length;
      const genuinely = (html.match(/\bgenuinely\b/gi) || []).length;
      const contrast = (html.match(/isn'?t [^.]{0,40}[—-] it'?s|is not [^.]{0,40}[—-] it'?s/gi) || []).length;
      const emdash = (html.match(/—/g) || []).length;

      const firstP = html.match(/<p>([\s\S]*?)<\/p>/);
      const opening = firstP ? stripTags(firstP[1]).slice(0, 80) : '(no <p>)';

      const headings = [...html.matchAll(/<h[23]>([^<]*)<\/h[23]>/g)].map(m => stripTags(m[1]));
      const closing = headings.length ? headings[headings.length - 1] : '(no heading)';
      closingHeadings[closing] = (closingHeadings[closing] || 0) + 1;

      console.log([row.id, row.slug, words, actually, genuinely, contrast, emdash, opening, closing].join('\t'));
    }

    console.error('\n--- Closing headings used more than once ---');
    for (const [h, n] of Object.entries(closingHeadings)) {
      if (n > 1) console.error(`${n}x\t${h}`);
    }
  } finally {
    await c.end();
  }
}
main().catch(e => { console.error(e); process.exit(1); });
