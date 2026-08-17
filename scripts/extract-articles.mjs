import fs from 'node:fs';
import path from 'node:path';

function htmlToText(html) {
  return html
    .replace(/<img[^>]*alt="([^"]*)"[^>]*>/gi, '\n[IMAGE: $1]\n')
    .replace(/<h([1-4])[^>]*>(.*?)<\/h\1>/gi, (_, lvl, txt) => `\n${'#'.repeat(Number(lvl))} ${txt.replace(/<[^>]+>/g, '')}\n`)
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '$2 ($1)')
    .replace(/<\/(p|div|ul|ol|blockquote)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, '—')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const target = JSON.parse(fs.readFileSync('data/article-content/target-list.json', 'utf8'));
const posts = JSON.parse(fs.readFileSync('data/article-content/all-posts.json', 'utf8'));
const byId = Object.fromEntries(posts.map(p => [p.id, p]));

const outDir = 'data/article-content/articles';
fs.mkdirSync(outDir, { recursive: true });

const manifest = [];
for (const t of target) {
  const post = byId[t.postId];
  const text = htmlToText(post.content);
  const fname = `${t.slug}.md`;
  const fpath = path.join(outDir, fname);
  const header = `# ${t.title}\n\nURL: ${t.url}\nCategory: ${t.category} | Status: ${t.status} | Quality Score: ${t.qualityScore} | Editorial Decision: ${t.decision}\nEditorial Reason: ${t.reason}\nSubtitle: ${post.subtitle || ''}\nKeywords: ${(post.keywords || []).join(', ')}\n\n---\n\n`;
  fs.writeFileSync(fpath, header + text);
  manifest.push({ ...t, file: fpath.replace(/\\/g, '/') });
}

fs.writeFileSync('data/article-content/manifest.json', JSON.stringify(manifest, null, 2));
console.log('Wrote', manifest.length, 'article files to', outDir);
