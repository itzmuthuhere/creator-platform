#!/usr/bin/env node
// Structural/mechanical issue scan across every post: tag balance, TRUE orphan
// headings (empty all the way to the next heading of the same-or-higher level,
// not just the next heading of any level -- an <h2> immediately followed by
// real <h3> subsections is a normal pattern, not an orphan), suspicious code
// blocks, and "actually"/"genuinely" in title-like strings.
// Usage: node structural-scan.js
const { Client } = require('pg');

const TAGS = ['p', 'ul', 'ol', 'li', 'h2', 'h3', 'strong', 'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'pre', 'code'];

function checkOne(row) {
  const html = row.content || '';
  const problems = [];

  for (const t of TAGS) {
    const open = (html.match(new RegExp('<' + t + '(\\s[^>]*)?>', 'g')) || []).length;
    const close = (html.match(new RegExp('</' + t + '>', 'g')) || []).length;
    if (open !== close) problems.push(`TAG MISMATCH <${t}> open=${open} close=${close}`);
  }

  // Build an ordered list of {level, text, start, end} for every h2/h3.
  const headingRe = /<h([23])>([^<]*)<\/h\1>/g;
  const headings = [];
  let m;
  while ((m = headingRe.exec(html)) !== null) {
    headings.push({ level: Number(m[1]), text: m[2], start: m.index, end: m.index + m[0].length });
  }
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    // Find the next heading with level <= this one (i.e. the real end of this section).
    let sectionEnd = html.length;
    for (let j = i + 1; j < headings.length; j++) {
      if (headings[j].level <= h.level) { sectionEnd = headings[j].start; break; }
    }
    const sectionHtml = html.slice(h.end, sectionEnd);
    const sectionText = sectionHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (sectionText.length < 20) problems.push(`ORPHAN HEADING (empty through end of its section): "${h.text}"`);
  }

  const codeBlocks = html.match(/<pre><code>[\s\S]*?<\/code><\/pre>|<code>[^<]*<\/code>/g) || [];
  for (const cb of codeBlocks) {
    if (/\.\./.test(cb) && !/\.\.\./.test(cb)) problems.push(`SUSPICIOUS CODE BLOCK: ${JSON.stringify(cb.slice(0, 80))}`);
  }

  if (/actually|genuinely/i.test(row.title || '')) problems.push(`TITLE contains actually/genuinely: "${row.title}"`);

  const words = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
  if (words < 600) problems.push(`THIN CONTENT: ${words} words`);

  return problems;
}

async function main() {
  if (!process.env.DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1); }
  const c = new Client({ connectionString: process.env.DATABASE_URL });
  await c.connect();
  try {
    const res = await c.query('SELECT id, slug, title, content, status FROM "Post" ORDER BY "publishedAt" ASC NULLS LAST');
    let total = 0;
    for (const row of res.rows) {
      const problems = checkOne(row);
      if (problems.length) {
        total += problems.length;
        console.log(`\n${row.status}\t${row.slug}\t(${row.id})`);
        for (const p of problems) console.log(`  - ${p}`);
      }
    }
    console.log(`\n\nTotal posts: ${res.rows.length}, total problems: ${total}`);
  } finally {
    await c.end();
  }
}
main().catch(e => { console.error(e); process.exit(1); });
