#!/usr/bin/env node
// The article library: every article this site already has, from three places.
//   1. Local drafts   content/drafts/*/metadata.json   (always)
//   2. Live site      <SITE_URL>/sitemap.xml            (published posts; titles derived from slugs)
//   3. Database       "Post" table                      (only if DATABASE_URL is set; includes DRAFT/UNPUBLISHED)
//
// Usage:
//   node library.mjs list [--json]
//   node library.mjs check "<topic or keyword phrase>" [--video <youtube-url>] [--json]
//
// `check` scores every library entry against the phrase and reports:
//   ALREADY_PROCESSED  a local draft was made from this exact video
//   LIKELY_DUPLICATE   score >= 0.5  -> update that article or pick a different search intent
//   RELATED            score >= 0.2  -> candidate internal link (only these real URLs may be linked)
// Exit code 3 if ALREADY_PROCESSED or LIKELY_DUPLICATE, so the pipeline can stop on it.
//
// Run from the creator-platform root (drafts dir and the optional `pg` package resolve from cwd).

import { loadLibrary, similarity, videoId } from './lib/library-core.mjs';

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const cmd = args[0];
  const lib = await loadLibrary();

  if (cmd === 'list') {
    if (json) return console.log(JSON.stringify(lib, null, 2));
    for (const e of lib) console.log(`${e.status.padEnd(12)} ${e.source.padEnd(5)} ${e.slug}${e.url ? '  ' + e.url : e.path ? '  ' + e.path : ''}`);
    console.log(`\n${lib.length} articles`);
    return;
  }

  if (cmd === 'check') {
    const phrase = args[1];
    if (!phrase) { console.error('Usage: node library.mjs check "<phrase>" [--video <url>]'); process.exit(1); }
    const vIdx = args.indexOf('--video');
    const vid = vIdx >= 0 ? videoId(args[vIdx + 1]) : null;

    const already = vid ? lib.filter(e => videoId(e.sourceVideo) === vid) : [];
    const scored = lib
      .map(e => ({ ...e, score: Math.max(similarity(phrase, e.title), similarity(phrase, e.slug), ...e.keywords.map(k => similarity(phrase, k))) }))
      .filter(e => e.score >= 0.2)
      .sort((a, b) => b.score - a.score);
    const dupes = scored.filter(e => e.score >= 0.5);
    const related = scored.filter(e => e.score < 0.5).slice(0, 10);

    if (json) {
      console.log(JSON.stringify({ phrase, alreadyProcessed: already, likelyDuplicates: dupes, related }, null, 2));
    } else {
      console.log(`Library: ${lib.length} articles. Checking "${phrase}"\n`);
      for (const e of already) console.log(`ALREADY_PROCESSED  ${e.status}  ${e.path || e.slug}  (same source video)`);
      for (const e of dupes) console.log(`LIKELY_DUPLICATE   ${e.score}  ${e.status}  ${e.title}  ${e.url || e.path || ''}`);
      for (const e of related) console.log(`RELATED            ${e.score}  ${e.status}  ${e.title}  ${e.url || e.path || ''}`);
      if (!already.length && !scored.length) console.log('No similar articles found.');
    }
    if (already.length || dupes.length) process.exit(3);
    return;
  }

  console.error('Usage: node library.mjs list [--json] | check "<phrase>" [--video <url>] [--json]');
  process.exit(1);
}

main().catch(e => { console.error(e); process.exit(1); });
