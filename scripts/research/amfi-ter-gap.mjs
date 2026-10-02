// Pulls AMFI's published daily TER data for one month and summarises the
// regular-minus-direct expense ratio gap per scheme category.
// Usage: node scripts/research/amfi-ter-gap.mjs 09-2026 > data/research/amfi-ter-gap-09-2026.json
import { writeFileSync } from "node:fs";

const month = process.argv[2] || "09-2026";
const base = "https://www.amfiindia.com/api/populate-te-rdata-revised";
const pageSize = 100; // the API caps pages at 100 rows

async function getPage(page) {
  const url = `${base}?MF_ID=All&Month=${month}&strCat=-1&strType=1&page=${page}&pageSize=${pageSize}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} on page ${page}`);
  return res.json();
}

const first = await getPage(1);
const rows = [...first.data];
const pages = Math.ceil(first.meta.total / pageSize);
for (let p = 2; p <= pages; p++) {
  rows.push(...(await getPage(p)).data);
  await new Promise((r) => setTimeout(r, 150)); // be gentle with AMFI
}

// Keep each scheme's latest row in the month.
const latest = new Map();
for (const r of rows) {
  const prev = latest.get(r.NSDLSchemeCode);
  if (!prev || r.TER_Date > prev.TER_Date) latest.set(r.NSDLSchemeCode, r);
}

const num = (v) => (v === null || v === undefined || v === "" ? NaN : Number(v));
const schemes = [...latest.values()]
  .map((r) => ({
    name: r.Scheme_Name,
    category: r.SchemeCat_Desc,
    date: r.TER_Date.slice(0, 10),
    regularTER: num(r.R_TER),
    directTER: num(r.D_TER),
    regularBER: num(r.R_BER),
    directBER: num(r.D_BER),
  }))
  .filter((s) => s.regularTER > 0 && s.directTER >= 0 && !Number.isNaN(s.directTER));
for (const s of schemes) s.gap = +(s.regularTER - s.directTER).toFixed(4);

const median = (a) => {
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const summarise = (list) => ({
  n: list.length,
  medianGap: +median(list.map((s) => s.gap)).toFixed(3),
  medianRegularTER: +median(list.map((s) => s.regularTER)).toFixed(3),
  medianDirectTER: +median(list.map((s) => s.directTER)).toFixed(3),
  minGap: Math.min(...list.map((s) => s.gap)),
  maxGap: Math.max(...list.map((s) => s.gap)),
});

const byCat = {};
for (const s of schemes) (byCat[s.category] ||= []).push(s);
const categories = Object.fromEntries(
  Object.entries(byCat)
    .filter(([, l]) => l.length >= 5)
    .map(([c, l]) => [c, summarise(l)])
    .sort((a, b) => b[1].n - a[1].n)
);

const out = {
  source: `${base}?Month=${month} (AMFI 'TER of MF Schemes', amfiindia.com/ter-of-mf-schemes)`,
  fetchedAt: new Date().toISOString(),
  rowsFetched: rows.length,
  schemesWithBothPlans: schemes.length,
  overall: summarise(schemes),
  categories,
  schemes,
};
const file = process.argv[3];
if (file) writeFileSync(file, JSON.stringify(out, null, 2));
console.log(JSON.stringify({ ...out, schemes: undefined }, null, 2));
