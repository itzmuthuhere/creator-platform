// Groups the per-scheme output of amfi-ter-gap.mjs into reader-friendly
// categories (AMCs label the same SEBI category in several ways) and prints
// median regular TER, direct TER and gap per group. ETFs are excluded: they
// trade on the exchange and don't have a meaningful direct/regular split.
// Usage: node scripts/research/amfi-ter-gap-groups.mjs data/research/amfi-ter-gap-09-2026.json
import { readFileSync } from "node:fs";

const { schemes } = JSON.parse(readFileSync(process.argv[2], "utf8"));

const groups = [
  ["Large cap", /large cap fund/i, /large & mid/i],
  ["Large & mid cap", /large & mid cap/i],
  ["Mid cap", /mid cap fund/i, /large & mid/i],
  ["Small cap", /small cap fund/i],
  ["Flexi cap", /flexi cap/i],
  ["Multi cap", /multi cap/i],
  ["ELSS (tax saver)", /elss/i],
  ["Sectoral / thematic", /sectoral|thematic/i],
  ["Balanced advantage", /balanced advantage|dynamic asset allocation/i],
  ["Aggressive hybrid", /aggressive hybrid/i],
  ["Index fund (equity)", /index fund/i, /debt|etf/i],
  ["Short duration debt", /short (duration|term)/i, /ultra/i],
  ["Corporate bond", /corporate bond/i],
  ["Liquid", /liquid fund/i, /fof|fund of funds/i],
  ["Overnight", /overnight/i],
];

const median = (a) => {
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const eligible = schemes.filter((s) => !/etf|exchange traded/i.test(s.category + " " + s.name));
const rows = [];
for (const [label, include, exclude] of groups) {
  const list = eligible.filter((s) => include.test(s.category) && !(exclude && exclude.test(s.category)));
  if (!list.length) continue;
  rows.push({
    group: label,
    schemes: list.length,
    medianRegularTER: +median(list.map((s) => s.regularTER)).toFixed(2),
    medianDirectTER: +median(list.map((s) => s.directTER)).toFixed(2),
    medianGap: +median(list.map((s) => s.gap)).toFixed(2),
    p25Gap: +[...list.map((s) => s.gap)].sort((a, b) => a - b)[Math.floor(list.length * 0.25)].toFixed(2),
    p75Gap: +[...list.map((s) => s.gap)].sort((a, b) => a - b)[Math.floor(list.length * 0.75)].toFixed(2),
  });
}
console.table(rows);
const all = eligible.map((s) => s.gap);
console.log(`non-ETF schemes: ${eligible.length}, median gap ${median(all).toFixed(2)}, latest dates: ${[...new Set(eligible.map((s) => s.date))].sort().slice(-2).join(", ")}`);
