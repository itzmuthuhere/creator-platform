#!/usr/bin/env node
// Moves a draft between review states. Usage:
//   node set-status.mjs <draft-dir> <STATUS> [--note "why"]
//
// Lifecycle: RESEARCHING -> DRAFT -> NEEDS_REVIEW -> READY_TO_PUBLISH -> PUBLISHED
// - RESEARCHING -> DRAFT goes through `audit-draft.mjs --finalize`, not this script.
// - READY_TO_PUBLISH is a human decision: only set it when the user says so in chat.
// - PUBLISHED is only recorded after the article is live (published with the
//   write-blog-article skill); this script never publishes anything itself.
// Every change is appended to metadata.statusHistory.

import fs from 'node:fs';
import path from 'node:path';

const ORDER = ['RESEARCHING', 'DRAFT', 'NEEDS_REVIEW', 'READY_TO_PUBLISH', 'PUBLISHED'];
const args = process.argv.slice(2);
const noteIdx = args.indexOf('--note');
const note = noteIdx >= 0 ? args.splice(noteIdx, 2)[1] : '';
const [dir, next] = args;

if (!dir || !ORDER.includes(next)) {
  console.error(`Usage: node set-status.mjs <draft-dir> <${ORDER.join('|')}> [--note "why"]`);
  process.exit(1);
}
const metaPath = path.join(dir, 'metadata.json');
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
const cur = meta.status;

if (cur === 'RESEARCHING' && next === 'DRAFT') {
  console.error('Use `audit-draft.mjs <dir> --finalize` to move RESEARCHING -> DRAFT; it checks the audit first.');
  process.exit(1);
}
if (ORDER.indexOf(next) > ORDER.indexOf('DRAFT') && meta.audit?.result === 'FAIL') {
  console.error(`The last audit failed (${meta.audit.fails} FAIL). Fix and re-run audit-draft.mjs first.`);
  process.exit(1);
}
if (next === 'PUBLISHED' && !/https?:\/\//.test(note)) {
  console.error('Only mark PUBLISHED after it is live, with --note "<live url>".');
  process.exit(1);
}

meta.status = next;
meta.updatedAt = new Date().toISOString();
meta.statusHistory = [...(meta.statusHistory || []), { from: cur, to: next, at: meta.updatedAt, note }];
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');
console.log(`${meta.slug}: ${cur} -> ${next}`);
