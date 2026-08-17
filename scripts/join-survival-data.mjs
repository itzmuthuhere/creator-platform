import fs from 'fs';

function parseCSV(text) {
  const rows = [];
  let cur = '', row = [], inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else inQ = false; }
      else cur += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
      else if (c === '\r') {}
      else cur += c;
    }
  }
  if (cur.length || row.length) { row.push(cur); rows.push(row); }
  return rows;
}

function toObjects(rows) {
  const header = rows[0];
  return rows.slice(1).map(r => {
    const o = {};
    header.forEach((h, i) => o[h] = r[i] ?? '');
    return o;
  });
}

const articles = toObjects(parseCSV(fs.readFileSync('data/articles.csv', 'utf8')));
const decisions = toObjects(parseCSV(fs.readFileSync('data/content-decisions.csv', 'utf8')));
const factCheckRows = toObjects(parseCSV(fs.readFileSync('data/fact-check.csv', 'utf8')));

function normUrl(u) {
  return u.trim().replace(/^\(not live\)\s*/, '').replace(/^https:\/\/techpulzo\.in/, '');
}

const decisionsByUrl = new Map(decisions.map(d => [normUrl(d.URL), d]));

// aggregate fact-check rows by Article URL
const factCheckByUrl = new Map();
for (const r of factCheckRows) {
  const key = r['Article URL'].trim();
  if (!factCheckByUrl.has(key)) factCheckByUrl.set(key, []);
  factCheckByUrl.get(key).push(r);
}

const unmatched = [];
const joined = articles.map((a, idx) => {
  const url = a.URL.trim();
  const d = decisionsByUrl.get(normUrl(url));
  if (!d) unmatched.push(url);
  const fc = factCheckByUrl.get(url) || [];
  return {
    id: idx + 1,
    url,
    title: a.Title,
    status: a.Status,
    category: a.Category,
    author: a.Author,
    word_count: a['Word Count'],
    quality_score: d ? d['Quality Score'] : a['Quality Score'],
    recommended_action: d ? d['Final Decision'] : a['Recommended Action'],
    merge_target: d ? d['Merge Target'] : '',
    reason: d ? d.Reason : a.Notes,
    originality: a.Originality,
    evidence: a.Evidence,
    sources: a.Sources,
    first_hand: a['First-Hand Experience'],
    factual_claims: a['Factual Claims'],
    ai_generic: a['AI-Generic Characteristics'],
    duplication: a['Potential Duplication'],
    cannibalization: a['Potential Cannibalization'],
    notes: a.Notes,
    fact_check_count: fc.length,
    fact_check_issues: fc.filter(r => /unverified|false|needs citation|incorrect|outdated|uncited/i.test(r['Verification Status'] || '')).map(r => ({
      claim: r.Claim, status: r['Verification Status'], correction: r['Required Correction']
    }))
  };
});

console.log('total articles', joined.length);
console.log('unmatched URLs', unmatched.length, unmatched);

fs.writeFileSync('data/.survival-joined.json', JSON.stringify(joined, null, 2));
console.log('wrote data/.survival-joined.json');
