#!/usr/bin/env node
// Automated quality audit for one draft folder.
//
// Usage:
//   node audit-draft.mjs <draft-dir> [--finalize] [--offline]
//
// Checks article.md + metadata.json + sources.md + research.md + screenshots/ for:
//   originality   word-for-word overlap with the source transcript (8-word shingles, longest copied run)
//   trust         invented first-hand experience, placeholder/unverified markers, fake internal links
//   style         stock AI phrasing, overused intensifiers, "isn't X — it's Y", em-dash density
//   seo           metadata fields and lengths, keyword placement and stuffing, heading hierarchy
//   depth         word count, empty sections, giant paragraphs, repeated sentences
//   visuals       image files exist, alt text, captions, provenance in manifest.json
//   sources       enough independent domains, article citations listed in sources.md
//
// Always: writes the results between the AUTO-AUDIT markers in quality-audit.md and refreshes
// metadata.json (wordCount, readingTimeMinutes, faq, screenshots, internalLinks, audit).
// --finalize: if there are no FAILs and every editorial checkbox in quality-audit.md is ticked,
//   sets status to DRAFT (only from RESEARCHING). It never sets any other status.
// --offline: skip the live-site lookup used to verify internal links.
// Exit code: 0 no FAILs, 4 at least one FAIL.

import fs from 'node:fs';
import path from 'node:path';
import { loadLibrary, SITE_URL } from './lib/library-core.mjs';

const args = process.argv.slice(2);
const finalize = args.includes('--finalize');
const offline = args.includes('--offline');
const dir = args.find(a => !a.startsWith('--'));
if (!dir) {
  console.error('Usage: node audit-draft.mjs <draft-dir> [--finalize] [--offline]');
  process.exit(1);
}

const results = [];
const add = (level, area, msg) => results.push({ level, area, msg });
const FAIL = (a, m) => add('FAIL', a, m);
const WARN = (a, m) => add('WARN', a, m);
const INFO = (a, m) => add('INFO', a, m);

const read = f => (fs.existsSync(path.join(dir, f)) ? fs.readFileSync(path.join(dir, f), 'utf8') : null);
for (const f of ['article.md', 'metadata.json', 'sources.md', 'research.md', 'quality-audit.md']) {
  if (read(f) === null) FAIL('structure', `missing ${f}`);
}
const articleRaw = read('article.md') || '';
const meta = JSON.parse(read('metadata.json') || '{}');
const sourcesMd = read('sources.md') || '';
const researchMd = read('research.md') || '';
let auditMd = read('quality-audit.md') || '';

// ---------- parse the article ----------
const authorNotes = [...articleRaw.matchAll(/<!--\s*AUTHOR:([\s\S]*?)-->/g)].map(m => m[1].trim());
const noComments = articleRaw.replace(/<!--[\s\S]*?-->/g, '');
const lines = noComments.split('\n');

const headings = [];
const bodyLines = [];      // prose lines (no code fences, no headings)
const quoteLines = [];
let inFence = false;
lines.forEach((line, i) => {
  if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; return; }
  if (inFence) return;
  const h = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
  if (h) { headings.push({ level: h[1].length, text: h[2], line: i }); return; }
  if (/^\s*>/.test(line)) quoteLines.push(line.replace(/^\s*>\s?/, ''));
  bodyLines.push({ text: line, i });
});

const stripMd = s => s
  .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/`([^`]*)`/g, '$1')
  .replace(/[*_~>#|]/g, ' ')
  .replace(/^\s*[-+]\s+/gm, ' ')
  .replace(/^\s*\d+\.\s+/gm, ' ');
const proseText = stripMd(bodyLines.map(l => l.text).join('\n'));
const headingText = headings.map(h => h.text).join(' ');
const words = (proseText + ' ' + stripMd(headingText)).split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w));
const wordCount = words.length;
const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200)); // same formula the site uses

// ---------- structure / leftovers ----------
if (/\{\{\w+\}\}/.test(articleRaw)) FAIL('structure', 'article.md still has {{PLACEHOLDER}} text');
if (/Conventions \(delete this comment block/.test(articleRaw)) FAIL('structure', 'the template conventions comment is still at the top of article.md');
for (const [re, label] of [[/\bTODO\b/, 'TODO'], [/\bTBD\b/, 'TBD'], [/\[VERIFY/i, '[VERIFY'], [/lorem ipsum/i, 'lorem ipsum'], [/\bexample\.com\b/, 'example.com link']]) {
  if (re.test(noComments)) FAIL('trust', `leftover marker in article: ${label}`);
}

// ---------- headings ----------
const h1s = headings.filter(h => h.level === 1);
if (h1s.length !== 1) FAIL('seo', `expected exactly one H1, found ${h1s.length}`);
const h1 = h1s[0]?.text || '';
for (let k = 1; k < headings.length; k++) {
  if (headings[k].level > headings[k - 1].level + 1) {
    FAIL('seo', `heading level jumps from H${headings[k - 1].level} to H${headings[k].level} at "${headings[k].text}"`);
  }
}
const h2s = headings.filter(h => h.level === 2);
if (wordCount > 1000 && h2s.length < 3) WARN('seo', `only ${h2s.length} H2 sections for ${wordCount} words`);
if (headings.length > Math.max(8, (wordCount / 1000) * 14)) WARN('readability', `${headings.length} headings for ${wordCount} words; too many headings chops the article up`);
const seen = new Map();
for (const h of headings) {
  const k = h.text.toLowerCase();
  if (seen.has(k)) WARN('seo', `duplicate heading "${h.text}"`);
  seen.set(k, true);
}
// Empty section: nothing but whitespace between a heading and the next heading of same-or-higher level.
for (let k = 0; k < headings.length; k++) {
  const h = headings[k];
  if (h.level === 1) continue;
  let end = lines.length;
  for (let j = k + 1; j < headings.length; j++) if (headings[j].level <= h.level) { end = headings[j].line; break; }
  const section = lines.slice(h.line + 1, end).filter(l => !/^#{1,6}\s/.test(l)).join(' ').replace(/\s+/g, '');
  if (section.length < 40) FAIL('depth', `section "${h.text}" is empty or nearly empty`);
}

// ---------- depth ----------
if (wordCount < 900) FAIL('depth', `${wordCount} words: too thin for a standalone article`);
else if (wordCount < 1200) WARN('depth', `${wordCount} words: fine only if the topic is narrow and fully covered`);
const paragraphs = noComments.replace(/```[\s\S]*?```/g, '').split(/\n\s*\n/).map(p => p.trim())
  .filter(p => p && !/^(#|!\[|\||[-*+] |\d+\. |>)/.test(p));
const longParas = paragraphs.filter(p => p.split(/\s+/).length > 120);
if (longParas.length) WARN('readability', `${longParas.length} paragraph(s) over 120 words; split them (starts: "${longParas[0].slice(0, 60)}…")`);
const sentences = proseText.split(/(?<=[.!?])\s+/).map(s => s.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '')).filter(s => s.split(' ').length >= 8);
const sentenceCounts = sentences.reduce((m, s) => m.set(s, (m.get(s) || 0) + 1), new Map());
const repeated = [...sentenceCounts].filter(([, n]) => n > 1);
if (repeated.length) WARN('readability', `${repeated.length} sentence(s) appear more than once, e.g. "${repeated[0][0].slice(0, 70)}…"`);

// ---------- style ----------
const lower = proseText.toLowerCase();
const HARD_AI = ["let's dive in", 'lets dive in', 'dive into', "in today's digital", 'in todays digital', "in today's fast-paced", 'in the ever-evolving',
  "whether you're a beginner or", 'whether you are a beginner or', 'this comprehensive guide', 'without further ado', 'in this article, we will',
  'in this article we will', 'look no further', 'embark on a journey', 'unlock the power', 'harness the power', 'buckle up', 'game-changer',
  'a testament to', 'navigating the complexities', 'in conclusion,', "it's important to note that", 'it is important to note that'];
const SOFT_AI = ['delve', 'seamless', 'robust', 'leverage', 'crucial', 'elevate', 'unleash', 'landscape', 'realm', 'paramount', 'pivotal', 'furthermore', 'moreover', 'the world of'];
for (const p of HARD_AI) if (lower.includes(p)) FAIL('style', `stock AI phrase: "${p}"`);
const softHits = SOFT_AI.map(w => [w, (lower.match(new RegExp(`\\b${w}\\w*`, 'g')) || []).length]).filter(([, n]) => n);
const softTotal = softHits.reduce((n, [, c]) => n + c, 0);
if (softTotal > 4) WARN('style', `AI-flavoured vocabulary used ${softTotal}x: ${softHits.map(([w, n]) => `${w}(${n})`).join(', ')}`);
for (const w of ['actually', 'genuinely', 'really', 'simply', 'basically']) {
  const n = (lower.match(new RegExp(`\\b${w}\\b`, 'g')) || []).length;
  if (n > 3) WARN('style', `"${w}" used ${n}x; 0–2 reads natural`);
}
const contrast = (proseText.match(/\b(isn'?t|is not|aren'?t|are not)\b[^.]{0,50}[—–-]\s*(it'?s|they'?re|it is|they are)\b/gi) || []).length;
if (contrast > 1) WARN('style', `"X isn't Y — it's Z" construction used ${contrast}x`);
const emdash = (proseText.match(/—/g) || []).length;
const emPer1k = wordCount ? (emdash / wordCount) * 1000 : 0;
if (emPer1k > 8) WARN('style', `${emdash} em-dashes (${emPer1k.toFixed(1)} per 1,000 words); vary with commas, periods, semicolons`);
const title = meta.title || h1;
if (/\bactually\b|\bthe real\b|\bgenuinely\b/i.test(title) || /\bactually\b|\bthe real\b/i.test(h1)) {
  WARN('style', 'title uses the "actually / the real" formula already overused on this site');
}
if (/^\s*(\d+|top \d+|best \d+)\b/i.test(title)) WARN('style', 'numbered listicle title; make sure it has a real angle, not a list of well-known things');

// ---------- trust: invented experience ----------
const EXPERIENCE = [
  /\bI (tested|tried|used|ran|bought|installed|benchmarked|measured|switched|noticed|found that)\b/i,
  /\bI'?ve (been using|tested|tried|used|seen|noticed)\b/i,
  /\bin my (own )?experience\b/i, /\bI personally\b/i, /\bwhen I first\b/i, /\bmy (own )?(phone|laptop|router|account|setup|team|colleague|friend|cousin)\b/i,
  /\bwe (tested|tried|ran|benchmarked|measured)\b/i,
];
const expHits = [];
for (const s of proseText.split(/(?<=[.!?])\s+/)) if (EXPERIENCE.some(re => re.test(s))) expHits.push(s.trim());
if (expHits.length) {
  const human = Array.isArray(meta.firstHandNotes) && meta.firstHandNotes.length;
  (human ? WARN : FAIL)('trust', `${expHits.length} first-person experience claim(s)${human ? ' (metadata.firstHandNotes present: confirm each is the author\'s real experience)' : ' with no firstHandNotes from the author; remove or turn into an AUTHOR note'}: "${expHits[0].slice(0, 90)}"`);
}
if (authorNotes.length) INFO('trust', `${authorNotes.length} AUTHOR note(s) for the human reviewer to fill with real experience`);

// ---------- originality vs transcript ----------
// Every transcript in _source/ (the primary one plus _source/<videoId>/ for extra videos),
// kept as separate word lists so a shingle never spans two transcripts.
function loadTranscripts() {
  const out = [];
  const dirs = [path.join(dir, '_source')];
  if (fs.existsSync(dirs[0])) {
    for (const d of fs.readdirSync(dirs[0])) {
      const p = path.join(dirs[0], d);
      if (fs.statSync(p).isDirectory()) dirs.push(p);
    }
  }
  for (const d of dirs) {
    const tj = path.join(d, 'transcript.json');
    const tt = path.join(d, 'transcript.txt');
    let text = null;
    if (fs.existsSync(tj)) text = JSON.parse(fs.readFileSync(tj, 'utf8')).segments.map(s => s.text).join(' ');
    else if (fs.existsSync(tt)) text = fs.readFileSync(tt, 'utf8').replace(/\[\d+(:\d+)+\]/g, ' ');
    if (!text) continue;
    // norm() keeps only Latin letters and digits, so a Hindi/Tamil transcript mostly vanishes.
    // Record that: word overlap can't catch an article translated from such a transcript.
    const rawWords = text.split(/\s+/).filter(Boolean).length;
    const words = norm(text);
    if (rawWords && words.length / rawWords < 0.5) nonLatinTranscripts.push(path.relative(dir, d) || '_source');
    out.push(words);
  }
  return out;
}
const nonLatinTranscripts = [];
function norm(text) {
  return text.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, ' ').split(' ').filter(Boolean);
}
const transcripts = loadTranscripts();
if (nonLatinTranscripts.length) {
  WARN('originality', `${nonLatinTranscripts.length} transcript(s) are mostly non-Latin script (${nonLatinTranscripts.join(', ')}); the overlap check can't detect translated copying, so the editorial review must compare structure and examples by hand`);
}
let originality = null;
if (!transcripts.length) {
  WARN('originality', 'no transcript in _source/; transcript overlap not checked');
} else {
  const N = 8;
  const tSet = new Set();
  for (const tWords of transcripts) {
    for (let i = 0; i + N <= tWords.length; i++) tSet.add(tWords.slice(i, i + N).join(' '));
  }
  // Blockquotes are deliberate, attributed quotes; they're checked for length separately.
  const quoteSet = new Set(quoteLines.map(l => norm(stripMd(l)).join(' ')));
  const aText = bodyLines.filter(l => !/^\s*>/.test(l.text)).map(l => l.text).join('\n');
  const aWords = norm(stripMd(aText) + ' ' + stripMd(headingText));
  const hitIdx = [];
  for (let i = 0; i + N <= aWords.length; i++) if (tSet.has(aWords.slice(i, i + N).join(' '))) hitIdx.push(i);
  const shingles = Math.max(1, aWords.length - N + 1);
  const pct = (hitIdx.length / shingles) * 100;
  // Merge consecutive matching shingles into copied runs.
  const runs = [];
  for (const i of hitIdx) {
    const last = runs[runs.length - 1];
    if (last && i <= last.end - N + 1) last.end = i + N; else runs.push({ start: i, end: i + N });
  }
  runs.sort((a, b) => (b.end - b.start) - (a.end - a.start));
  const longest = runs[0] ? runs[0].end - runs[0].start : 0;
  originality = { transcriptsChecked: transcripts.length, overlapPct: +pct.toFixed(2), longestCopiedRun: longest, runs: runs.slice(0, 5).map(r => aWords.slice(r.start, r.end).join(' ')) };
  if (pct > 8) FAIL('originality', `${pct.toFixed(1)}% of the article's 8-word sequences appear in the transcript; it is tracking the video too closely`);
  else if (pct > 3) WARN('originality', `${pct.toFixed(1)}% 8-word overlap with the transcript; rewrite the flagged runs in your own structure`);
  if (longest >= 25) FAIL('originality', `a ${longest}-word run is copied from the transcript: "${originality.runs[0].slice(0, 120)}…"`);
  else if (longest >= 15) WARN('originality', `a ${longest}-word run matches the transcript: "${originality.runs[0].slice(0, 120)}…"`);
  for (const q of quoteSet) if (q.split(' ').length > 40) WARN('originality', `blockquote of ${q.split(' ').length} words; keep quotes short`);
  const videoRefs = (lower.match(/\b(in (this|the) video|the (creator|youtuber|host|video) (says|said|explains|mentions|shows)|as shown in the video)\b/g) || []).length;
  if (videoRefs > 3) WARN('originality', `article refers to "the video" ${videoRefs}x; it should stand on its own`);
}

// ---------- SEO / metadata ----------
const STATUSES = ['RESEARCHING', 'DRAFT', 'NEEDS_REVIEW', 'READY_TO_PUBLISH', 'PUBLISHED'];
for (const k of ['title', 'seoTitle', 'h1', 'slug', 'metaDescription', 'primaryKeyword', 'searchIntent', 'author', 'sourceVideo', 'category']) {
  if (!meta[k] || (typeof meta[k] === 'string' && !meta[k].trim())) FAIL('seo', `metadata.${k} is empty`);
}
if (!STATUSES.includes(meta.status)) FAIL('structure', `metadata.status "${meta.status}" is not one of ${STATUSES.join(', ')}`);
if (meta.slug && meta.slug !== path.basename(path.resolve(dir))) FAIL('structure', `metadata.slug "${meta.slug}" doesn't match folder name`);
if (meta.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(meta.slug)) FAIL('seo', 'slug must be lowercase kebab-case');
if (meta.slug && meta.slug.split('-').length > 10) WARN('seo', `slug has ${meta.slug.split('-').length} words; shorter slugs read better`);
if (meta.seoTitle && (meta.seoTitle.length > 60 || meta.seoTitle.length < 25)) WARN('seo', `seoTitle is ${meta.seoTitle.length} chars (aim 25–60)`);
if (meta.metaDescription && (meta.metaDescription.length > 160 || meta.metaDescription.length < 110)) WARN('seo', `metaDescription is ${meta.metaDescription.length} chars (aim 110–160)`);
if (meta.h1 && h1 && meta.h1.trim() !== h1.trim()) WARN('seo', 'metadata.h1 differs from the article H1');
if (meta.category && !['tech', 'finance', 'reviews'].includes(meta.category)) WARN('seo', `category "${meta.category}" isn't one of the site's live categories (tech, finance, reviews)`);
if (!Array.isArray(meta.secondaryKeywords) || meta.secondaryKeywords.length < 2) WARN('seo', 'fewer than 2 secondary keywords');

const kw = (meta.primaryKeyword || '').toLowerCase().trim();
if (kw) {
  const kwTokens = norm(kw).filter(t => t.length > 2);
  const containsAll = s => { const w = norm(s || '').join(' '); return kwTokens.every(t => w.includes(t.slice(0, Math.max(4, t.length - 2)))); };
  if (!containsAll(h1) && !containsAll(meta.seoTitle)) WARN('seo', `primary keyword "${kw}" isn't reflected in the H1 or SEO title`);
  if (!containsAll(words.slice(0, 150).join(' '))) WARN('seo', 'primary keyword topic not introduced in the first 150 words');
  if (!h2s.some(h => containsAll(h.text)) && !h2s.some(h => kwTokens.some(t => norm(h.text).join(' ').includes(t)))) INFO('seo', 'no H2 mentions the primary keyword topic');
  if (!containsAll(meta.metaDescription)) WARN('seo', 'meta description does not mention the primary keyword topic');
  const exact = (lower.match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  const density = wordCount ? (exact * kwTokens.length / wordCount) * 100 : 0;
  if (density > 2.5) WARN('seo', `exact primary keyword repeated ${exact}x (${density.toFixed(1)}% of words); reads as stuffing`);
}

// ---------- FAQ (extracted into metadata.faq for publishing) ----------
const faq = [];
const faqH2 = headings.findIndex(h => h.level === 2 && /frequently asked|faq|common questions/i.test(h.text));
if (faqH2 >= 0) {
  for (let k = faqH2 + 1; k < headings.length && headings[k].level > 2; k++) {
    const q = headings[k];
    if (q.level !== 3) continue;
    const end = headings[k + 1] ? headings[k + 1].line : lines.length;
    const answer = stripMd(lines.slice(q.line + 1, end).join('\n')).replace(/\s+/g, ' ').trim();
    if (!q.text.trim().endsWith('?')) WARN('seo', `FAQ heading doesn't end with "?": "${q.text}"`);
    if (answer.split(' ').length < 15) WARN('depth', `FAQ answer too short for "${q.text}"`);
    faq.push({ question: q.text.trim(), answer });
  }
  if (faq.length < 3) WARN('seo', `FAQ has ${faq.length} question(s); 3–7 real ones is typical`);
}

// ---------- images ----------
const imageRe = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/;
const images = [];
lines.forEach((line, i) => {
  const m = line.match(imageRe);
  if (!m) return;
  let j = i + 1;
  while (j < lines.length && !lines[j].trim()) j++;
  const next = (lines[j] || '').trim();
  const caption = /^(\*[^*].*\*|_[^_].*_)$/.test(next) ? next.slice(1, -1).replace(/^caption:\s*/i, '').trim() : '';
  images.push({ alt: m[1].trim(), src: m[2], caption });
});
const shotsDir = path.join(dir, 'screenshots');
const manifestPath = path.join(shotsDir, 'manifest.json');
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : [];
for (const img of images) {
  const local = !/^https?:/.test(img.src);
  if (local && !fs.existsSync(path.join(dir, img.src))) FAIL('visuals', `image file missing: ${img.src}`);
  if (!local) WARN('visuals', `remote image ${img.src}; store screenshots locally in screenshots/`);
  if (!img.alt) FAIL('visuals', `image ${img.src} has no alt text`);
  else if (img.alt.split(/\s+/).length < 4) WARN('visuals', `alt text for ${img.src} is too short to describe it: "${img.alt}"`);
  else if (/^(image|screenshot|picture) of\b/i.test(img.alt)) INFO('visuals', `alt text for ${img.src} starts with "${img.alt.split(' ').slice(0, 2).join(' ')}"; just describe the content`);
  if (!img.caption) FAIL('visuals', `image ${img.src} has no italic caption line directly below it`);
  const base = path.basename(img.src);
  if (local && !/^\d{2}-[a-z0-9]+(-[a-z0-9]+)*\.(png|jpe?g|webp)$/.test(base)) WARN('visuals', `filename "${base}" should look like 02-meaningful-name.png`);
  const entry = manifest.find(e => e.file === base);
  if (local && !entry) WARN('visuals', `${base} has no manifest.json entry, so its source page isn't recorded`);
  if (entry) { entry.alt = img.alt; entry.caption = img.caption; }
}
if (fs.existsSync(shotsDir)) {
  const used = new Set(images.map(i => path.basename(i.src)));
  for (const f of fs.readdirSync(shotsDir)) {
    if (/\.(png|jpe?g|webp)$/.test(f) && !used.has(f)) WARN('visuals', `screenshots/${f} isn't used in the article; delete it or place it`);
  }
  if (manifest.length) fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}
if (!images.length) WARN('visuals', 'no images; fine only if nothing visual would help, so say why in the editorial notes');
if (images.length > Math.max(3, wordCount / 250)) WARN('visuals', `${images.length} images for ${wordCount} words; keep only the ones that explain something`);

// ---------- links and sources ----------
const linkRe = /(?<!!)\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
const articleLinks = [...noComments.matchAll(linkRe)].map(m => ({ text: m[1], url: m[2] }));
const siteHost = new URL(SITE_URL).hostname;
const internal = articleLinks.filter(l => new URL(l.url).hostname.replace(/^www\./, '') === siteHost);
const external = articleLinks.filter(l => !internal.includes(l));
const sourceUrls = [...sourcesMd.matchAll(/\((https?:\/\/[^)\s]+)\)/g)].map(m => m[1]);
const hostOf = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };
const sourceDomains = new Set(sourceUrls.map(hostOf).filter(h => h && !/youtube\.com|youtu\.be/.test(h)));
if (sourceDomains.size < 3) FAIL('sources', `sources.md lists ${sourceDomains.size} independent domain(s) besides YouTube; research needs at least 3`);
if (external.length < 2) WARN('sources', `only ${external.length} external citation link(s) in the article`);
const normUrl = u => u.replace(/[#?].*$/, '').replace(/\/$/, '');
const sourceSet = new Set(sourceUrls.map(normUrl));
const unlisted = external.filter(l => !sourceSet.has(normUrl(l.url)) && !/youtube\.com|youtu\.be/.test(l.url));
if (unlisted.length) WARN('sources', `${unlisted.length} article link(s) not recorded in sources.md, e.g. ${unlisted[0].url}`);

if (internal.length) {
  if (offline) {
    WARN('trust', `${internal.length} internal link(s) not verified (--offline)`);
  } else {
    const lib = await loadLibrary();
    const known = new Set(lib.filter(e => e.url).map(e => normUrl(e.url)));
    for (const l of internal) if (!known.has(normUrl(l.url))) FAIL('trust', `internal link to a page that isn't a published article: ${l.url}`);
  }
}

// ---------- research ledger ----------
const ledger = researchMd.split(/^## 5\./m)[1]?.split(/^## /m)[0] || '';
const ledgerRows = ledger.split('\n').filter(l => /^\|\s*\d+\s*\|/.test(l) && l.split('|')[2]?.trim());
if (ledgerRows.length < 5) WARN('trust', `claims ledger in research.md has ${ledgerRows.length} filled row(s); log every claim the article relies on`);
const unverified = ledgerRows.filter(r => /UNVERIFIED/i.test(r));
if (unverified.length) INFO('trust', `${unverified.length} UNVERIFIED claim(s) in the ledger; the article must omit them or state the uncertainty`);
if (/\{\{\w+\}\}/.test(researchMd + sourcesMd)) WARN('structure', 'research.md or sources.md still has {{PLACEHOLDER}} text');
if (!/\*\*Verdict:\*\*\s*(PROCEED|REFRAME)/i.test(researchMd)) WARN('structure', 'research.md topic verdict (PROCEED/REFRAME) not filled in');

// ---------- editorial checklist ----------
const editorial = auditMd.split('<!-- AUTO-AUDIT:START -->')[0];
const unticked = (editorial.match(/^\s*- \[ \]/gm) || []).length;
const ticked = (editorial.match(/^\s*- \[x\]/gim) || []).length;

// ---------- write results ----------
const fails = results.filter(r => r.level === 'FAIL').length;
const warns = results.filter(r => r.level === 'WARN').length;
const verdict = fails ? 'FAIL' : warns ? 'PASS_WITH_WARNINGS' : 'PASS';
const now = new Date().toISOString();

let statusNote = '';
if (finalize) {
  if (fails) statusNote = `Not finalized: ${fails} FAIL(s).`;
  else if (unticked) statusNote = `Not finalized: ${unticked} editorial checklist item(s) unticked.`;
  else if (meta.status === 'RESEARCHING') { meta.status = 'DRAFT'; statusNote = 'Status set to DRAFT.'; }
  else statusNote = `Status left as ${meta.status}.`;
}

Object.assign(meta, {
  h1: meta.h1 || h1,
  wordCount,
  readingTimeMinutes,
  updatedAt: now,
  faq,
  screenshots: images.map(i => ({ file: i.src, alt: i.alt, caption: i.caption })),
  internalLinks: internal.map(l => l.url),
  audit: { lastRunAt: now, result: verdict, fails, warnings: warns, editorialChecklist: `${ticked}/${ticked + unticked}`, originality },
});
fs.writeFileSync(path.join(dir, 'metadata.json'), JSON.stringify(meta, null, 2) + '\n');

const order = { FAIL: 0, WARN: 1, INFO: 2 };
results.sort((a, b) => order[a.level] - order[b.level]);
const report = [
  `**Automated audit:** ${verdict} · ${fails} fail · ${warns} warn · run ${now.slice(0, 16).replace('T', ' ')} UTC`,
  '',
  `- Words: ${wordCount} (≈${readingTimeMinutes} min read) · H2 sections: ${h2s.length} · images: ${images.length} · FAQ: ${faq.length}`,
  `- Citations: ${external.length} external, ${internal.length} internal · independent source domains: ${sourceDomains.size}`,
  originality ? `- Transcript overlap (${originality.transcriptsChecked} transcript(s)): ${originality.overlapPct}% of 8-word sequences · longest shared run: ${originality.longestCopiedRun} words` : '- Transcript overlap: not checked',
  `- Editorial checklist: ${ticked}/${ticked + unticked} ticked · AUTHOR notes open: ${authorNotes.length}`,
  statusNote ? `- ${statusNote}` : null,
  '',
  results.length ? '| Level | Area | Finding |\n|---|---|---|\n' + results.map(r => `| ${r.level} | ${r.area} | ${r.msg.replace(/\|/g, '\\|')} |`).join('\n') : 'No findings.',
].filter(l => l !== null).join('\n');

const START = '<!-- AUTO-AUDIT:START -->', END = '<!-- AUTO-AUDIT:END -->';
if (auditMd.includes(START) && auditMd.includes(END)) {
  auditMd = auditMd.slice(0, auditMd.indexOf(START) + START.length) + '\n' + report + '\n' + auditMd.slice(auditMd.indexOf(END));
} else {
  auditMd += `\n\n${START}\n${report}\n${END}\n`;
}
if (fs.existsSync(path.join(dir, 'quality-audit.md'))) fs.writeFileSync(path.join(dir, 'quality-audit.md'), auditMd);

console.log(report);
process.exit(fails ? 4 : 0);
