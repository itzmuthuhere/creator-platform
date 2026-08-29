// Writes data/article-content/live-status.json — the CURRENT publish state of
// every post, straight from the DB dump (all-posts.json). manifest.json is a
// frozen audit artifact from when ~46 posts were live; this file is the one to
// trust for "what is actually published right now".
// Run scripts/dump-articles.mjs first to refresh all-posts.json.
const fs = require('fs');
const base = 'data/article-content';
const posts = JSON.parse(fs.readFileSync(`${base}/all-posts.json`, 'utf8'));

const counts = posts.reduce((a, p) => (a[p.status] = (a[p.status] || 0) + 1, a), {});
const rows = posts
  .map(p => ({ slug: p.slug, title: p.title, status: p.status, publishedAt: p.publishedAt || null }))
  .sort((a, b) => (a.status === b.status ? a.slug.localeCompare(b.slug) : a.status.localeCompare(b.status)));

const out = {
  note: 'Current DB state. Regenerate: node scripts/dump-articles.mjs && node _tmp_manifest.js (stamp date manually).',
  counts,
  published: rows.filter(r => r.status === 'PUBLISHED').map(r => r.slug),
  unpublished: rows.filter(r => r.status === 'UNPUBLISHED').map(r => r.slug),
  rows,
};
fs.writeFileSync(`${base}/live-status.json`, JSON.stringify(out, null, 2));
console.log('counts:', counts);
console.log('published:', out.published.length, out.published);
