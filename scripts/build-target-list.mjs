import fs from 'node:fs';

function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else if (c === '\r') { /* skip */ }
      else field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function slugFromUrl(url) {
  const m = url.match(/\/([a-z0-9-]+)\s*$/i);
  return m ? m[1] : null;
}

const decisionsRaw = fs.readFileSync('data/content-decisions.csv', 'utf8');
const rows = parseCSV(decisionsRaw);
const header = rows[0];
const idx = Object.fromEntries(header.map((h, i) => [h, i]));

const target = rows.slice(1).filter(r => r.length > 1 && ['KEEP', 'IMPROVE', 'MAJOR REWRITE', 'REBUILD'].includes(r[idx['Final Decision']]));

const posts = JSON.parse(fs.readFileSync('data/article-content/all-posts.json', 'utf8'));
const bySlug = Object.fromEntries(posts.map(p => [p.slug, p]));

const matched = [];
const unmatched = [];
for (const r of target) {
  const url = r[idx['URL']];
  const slug = slugFromUrl(url);
  const post = slug ? bySlug[slug] : null;
  if (post) {
    matched.push({
      url, title: r[idx['Title']], category: r[idx['Category']], status: r[idx['Status']],
      qualityScore: r[idx['Quality Score']], decision: r[idx['Final Decision']], reason: r[idx['Reason']],
      slug, postId: post.id, wordCountApprox: post.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
    });
  } else {
    unmatched.push({ url, slug, title: r[idx['Title']], decision: r[idx['Final Decision']] });
  }
}

console.log('Target rows:', target.length, 'Matched:', matched.length, 'Unmatched:', unmatched.length);
if (unmatched.length) console.log(JSON.stringify(unmatched, null, 2));

fs.writeFileSync('data/article-content/target-list.json', JSON.stringify(matched, null, 2));

// Breakdown by decision
const byDecision = {};
for (const m of matched) byDecision[m.decision] = (byDecision[m.decision] || 0) + 1;
console.log(byDecision);
