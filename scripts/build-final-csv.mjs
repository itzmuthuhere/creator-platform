import fs from 'fs';

function csvEscape(v) {
  const s = String(v ?? '');
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

const joined = JSON.parse(fs.readFileSync('data/.survival-joined.json', 'utf8'));
const scored = [1, 2, 3, 4].flatMap(n => JSON.parse(fs.readFileSync(`data/.scored-batch-${n}.json`, 'utf8')));

if (scored.length !== joined.length) {
  console.error(`MISMATCH: joined=${joined.length} scored=${scored.length}`);
  process.exit(1);
}

const scoredById = new Map(scored.map(s => [Number(s.id), s]));

// map merge_target slug -> title, for target_article_if_merge column
const byUrlFragment = (frag) => joined.find(r => r.url.includes(frag));

const header = [
  'id', 'url', 'title', 'status', 'category', 'current_author', 'current_word_count',
  'recommended_action', 'quality_score', 'originality_score', 'factual_risk',
  'information_gain_score', 'first_hand_experience_potential', 'duplicate_risk',
  'cannibalization_risk', 'reason', 'required_human_input', 'target_article_if_merge', 'priority'
];

const rows = [header.join(',')];
let mismatches = 0;

for (const a of joined) {
  const s = scoredById.get(a.id);
  if (!s) { console.error('MISSING SCORE for id', a.id); mismatches++; continue; }

  let targetTitle = '';
  if (a.merge_target) {
    const t = byUrlFragment(a.merge_target);
    targetTitle = t ? t.title : a.merge_target;
  }

  const row = [
    a.id,
    a.url,
    a.title,
    a.status,
    a.category,
    a.author,
    a.word_count,
    a.recommended_action,
    a.quality_score,
    s.originality_score,
    s.factual_risk,
    s.information_gain_score,
    s.first_hand_experience_potential,
    s.duplicate_risk,
    s.cannibalization_risk,
    a.reason,
    s.required_human_input,
    targetTitle,
    s.priority
  ].map(csvEscape);
  rows.push(row.join(','));
}

if (mismatches > 0) {
  console.error(`${mismatches} rows missing scores — aborting write`);
  process.exit(1);
}

fs.writeFileSync('data/content-decisions.csv', rows.join('\n') + '\n');
console.log('Wrote', rows.length - 1, 'rows to data/content-decisions.csv');

// quick priority distribution for sanity + to help build top-priority report
const dist = {};
for (const s of scored) dist[s.priority] = (dist[s.priority] || 0) + 1;
console.log('Priority distribution:', dist);

const p1 = joined
  .map(a => ({ ...a, ...scoredById.get(a.id) }))
  .filter(a => a.priority === 'P1');
fs.writeFileSync('data/.p1-articles.json', JSON.stringify(p1, null, 2));
console.log('P1 count:', p1.length, '-> data/.p1-articles.json');
