import fs from 'node:fs';
import path from 'node:path';

const resultsDir = 'data/article-content/results';
const files = fs.readdirSync(resultsDir).filter(f => f.endsWith('.json'));

let allRows = [];
const perFile = {};
for (const f of files) {
  const raw = fs.readFileSync(path.join(resultsDir, f), 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error('PARSE ERROR in', f, e.message);
    continue;
  }
  if (!Array.isArray(data)) {
    console.error('NOT AN ARRAY in', f);
    continue;
  }
  perFile[f] = data.length;
  allRows = allRows.concat(data);
}

console.log('Files:', files.length);
console.log(perFile);
console.log('Total claim rows:', allRows.length);

// Reconcile each row's article_url/title/decision against the canonical manifest by slug,
// since agents wrote inconsistent URL formats (with/without "(not live)" prefix, full domain vs relative).
const manifest0 = JSON.parse(fs.readFileSync('data/article-content/manifest.json', 'utf8'));
function slugFromAny(url) {
  const m = String(url).match(/\/([a-z0-9-]+)\s*$/i);
  return m ? m[1] : null;
}
const bySlug0 = Object.fromEntries(manifest0.map(m => [m.slug, m]));
let unresolvable = 0;
for (const r of allRows) {
  const slug = slugFromAny(r.article_url);
  const canon = slug ? bySlug0[slug] : null;
  if (canon) {
    r.article_url = canon.url;
    r.article_title = canon.title;
    r.editorial_decision = canon.decision;
  } else {
    unresolvable++;
  }
}
console.log('Rows not resolvable to a canonical article:', unresolvable);

// Basic validation
const validClass = new Set(['VERIFIABLE', 'OPINION', 'EXPERIENCE', 'UNSUPPORTED', 'OUTDATED', 'POTENTIALLY MISLEADING']);
const validStatus = new Set(['Confirmed', 'Contradicted', 'Partially Confirmed', 'Outdated', 'Could Not Verify', 'N/A']);
let badClass = 0, badStatus = 0;
for (const r of allRows) {
  if (!validClass.has(r.classification)) badClass++;
  if (!validStatus.has(r.verification_status)) badStatus++;
}
console.log('Rows with unexpected classification:', badClass);
console.log('Rows with unexpected verification_status:', badStatus);

// Coverage check against manifest
const manifest = JSON.parse(fs.readFileSync('data/article-content/manifest.json', 'utf8'));
const coveredUrls = new Set(allRows.map(r => r.article_url));
const missing = manifest.filter(m => !coveredUrls.has(m.url));
console.log('Articles in manifest:', manifest.length, '| Articles with at least 1 claim row:', coveredUrls.size);
if (missing.length) {
  console.log('MISSING ARTICLES (no claim rows found):');
  for (const m of missing) console.log(' -', m.decision, m.url);
}

function csvEscape(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

const header = ['Article Title', 'Article URL', 'Editorial Decision', 'Claim', 'Classification', 'Source', 'Source URL', 'Verification Status', 'Required Correction'];
const lines = [header.map(csvEscape).join(',')];
for (const r of allRows) {
  lines.push([
    r.article_title, r.article_url, r.editorial_decision, r.claim, r.classification,
    r.source, r.source_url, r.verification_status, r.required_correction,
  ].map(csvEscape).join(','));
}

fs.writeFileSync('data/fact-check.csv', lines.join('\n'));
console.log('Wrote data/fact-check.csv with', allRows.length, 'rows');

fs.writeFileSync('data/article-content/all-claims.json', JSON.stringify(allRows, null, 2));
