#!/usr/bin/env node
// Sanity-checks a drafted article before it goes anywhere near the database.
// Usage: node check-content.js <path-to-content.html>
//
// Run this from inside the creator-platform project directory (it needs no
// dependencies, but Node module resolution for other scripts in this skill
// requires that anyway).

const fs = require('fs');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node check-content.js <path-to-content.html>');
  process.exit(1);
}

const html = fs.readFileSync(file, 'utf8');
let problems = 0;

// 1. Tag balance. Do this with a real script file, not an inline `node -e`
//    one-liner -- shell escaping of the backslashes in these regexes silently
//    produces wrong counts from a bash `-e` string, which looks like a false
//    "mismatch" or hides a real one. Ask us how we know.
const tags = ['p', 'ul', 'ol', 'li', 'h2', 'h3', 'strong', 'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'pre', 'code'];
for (const t of tags) {
  const open = (html.match(new RegExp('<' + t + '(\\s[^>]*)?>', 'g')) || []).length;
  const close = (html.match(new RegExp('</' + t + '>', 'g')) || []).length;
  if (open !== close) {
    console.log(`TAG MISMATCH: <${t}> open=${open} close=${close}`);
    problems++;
  }
}

// 2. Word count -- aim for 600-900+. Thin content was the single biggest
//    reason articles got flagged as low-value.
const words = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
console.log(`Word count: ${words}${words < 600 ? '  <-- thin, consider expanding' : ''}`);

// 3. Orphan headings: a heading immediately followed by another heading with
//    nothing in between. This happened repeatedly when FAQ content was meant
//    to live in the separate faqItems field but a placeholder heading got
//    left behind in the body with no content under it.
const headingSequence = [...html.matchAll(/<h[23]>([^<]*)<\/h[23]>/g)].map(m => m[1]);
const afterHeadings = html.split(/<h[23]>[^<]*<\/h[23]>/);
for (let i = 0; i < headingSequence.length; i++) {
  const following = afterHeadings[i + 1] || '';
  const strippedFollowing = following.replace(/<h[23]>.*/s, '').trim();
  if (strippedFollowing.length < 20) {
    console.log(`ORPHAN HEADING (near-empty section): "${headingSequence[i]}"`);
    problems++;
  }
}

// 4. Overused intensifiers. One or two per article reads human; one per
//    paragraph reads like a template.
for (const word of ['actually', 'genuinely']) {
  const count = (html.match(new RegExp('\\b' + word + '\\b', 'gi')) || []).length;
  console.log(`"${word}" count: ${count}${count > 3 ? '  <-- high, consider trimming' : ''}`);
}
if (/actually|genuinely/i.test((html.match(/<title>.*?<\/title>/) || [''])[0])) {
  console.log('NOTE: "actually"/"genuinely" appears in a title-like string -- check the title separately.');
}

// 5. The "X isn't Y -- it's Z" contrastive crutch, and em-dash density.
const contrastPattern = (html.match(/isn'?t [^.]{0,40}[—-] it'?s|is not [^.]{0,40}[—-] it'?s/gi) || []).length;
console.log(`"X isn't Y -- it's Z" construction count: ${contrastPattern}${contrastPattern > 1 ? '  <-- consider varying' : ''}`);
const emdash = (html.match(/—/g) || []).length;
console.log(`Em-dash count: ${emdash}`);

// 6. Whitespace-before-punctuation artifacts inside <code>/<pre> blocks --
//    these are almost always a sign a cleanup regex ate a meaningful space
//    (e.g. a Dockerfile "COPY . ." losing its spaces and becoming "COPY..").
//    Never run a blind find/replace across content that contains code blocks
//    without re-checking them afterward.
const codeBlocks = html.match(/<pre><code>[\s\S]*?<\/code><\/pre>|<code>[^<]*<\/code>/g) || [];
for (const cb of codeBlocks) {
  if (/\.\./.test(cb) && !/\.\.\./.test(cb)) {
    console.log(`SUSPICIOUS CODE BLOCK (possible eaten space, e.g. "COPY . ." -> "COPY.."): ${JSON.stringify(cb.slice(0, 80))}`);
    problems++;
  }
}

console.log(problems === 0 ? '\nNo structural problems found.' : `\n${problems} structural problem(s) found -- fix before publishing.`);
process.exit(problems === 0 ? 0 : 1);
