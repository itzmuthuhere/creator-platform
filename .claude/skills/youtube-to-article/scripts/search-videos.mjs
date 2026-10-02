#!/usr/bin/env node
// Finds YouTube videos for a topic, so one article can draw on several creators instead of one.
//
// Usage:
//   node search-videos.mjs "<search query>" [--limit 10] [--json]
//
// Reads the public YouTube results page (no API key) and prints, per video:
// id, duration, age, views, channel, title. Skips Shorts, live streams, and anything
// under 3 minutes or over 90 minutes, which rarely hold useful explanatory detail.
// Pick 2–4 from different channels, favouring clear tutorials and explainers with recent dates,
// then run fetch-transcript.mjs on each.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

function extractJsonVar(html, varName) {
  const idx = html.indexOf(varName);
  if (idx === -1) return null;
  const start = html.indexOf('{', idx);
  let depth = 0, inStr = false, esc = false;
  for (let i = start; i < html.length; i++) {
    const ch = html[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === '\\') esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') inStr = true;
    else if (ch === '{') depth++;
    else if (ch === '}' && --depth === 0) {
      try { return JSON.parse(html.slice(start, i + 1)); } catch { return null; }
    }
  }
  return null;
}

// Collects every videoRenderer object anywhere in the results tree.
function findVideos(node, out = []) {
  if (!node || typeof node !== 'object') return out;
  if (node.videoRenderer) out.push(node.videoRenderer);
  for (const v of Object.values(node)) if (v && typeof v === 'object') findVideos(v, out);
  return out;
}

const text = t => t?.simpleText || t?.runs?.map(r => r.text).join('') || '';
function seconds(len) {
  if (!len) return 0;
  return len.split(':').map(Number).reduce((a, b) => a * 60 + b, 0);
}

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const li = args.indexOf('--limit');
  const limit = li >= 0 ? Number(args[li + 1]) : 10;
  const query = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--limit');
  if (!query) {
    console.error('Usage: node search-videos.mjs "<query>" [--limit 10] [--json]');
    process.exit(1);
  }
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&hl=en`;
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9', Cookie: 'CONSENT=YES+1; SOCS=CAI' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = extractJsonVar(await res.text(), 'ytInitialData');
  if (!data) throw new Error('Could not read the results page (layout may have changed); search in the built-in browser instead');

  const seen = new Set();
  const videos = findVideos(data)
    .map(v => ({
      videoId: v.videoId,
      url: `https://www.youtube.com/watch?v=${v.videoId}`,
      title: text(v.title),
      channel: text(v.ownerText || v.longBylineText),
      duration: text(v.lengthText),
      seconds: seconds(text(v.lengthText)),
      published: text(v.publishedTimeText),
      views: text(v.viewCountText),
    }))
    .filter(v => v.videoId && !seen.has(v.videoId) && seen.add(v.videoId))
    .filter(v => v.seconds >= 180 && v.seconds <= 5400)
    .slice(0, limit);

  if (json) return console.log(JSON.stringify(videos, null, 2));
  for (const v of videos) {
    console.log(`${v.videoId}  ${v.duration.padStart(7)}  ${v.published.padEnd(14)}  ${v.views.padEnd(16)}  ${v.channel} — ${v.title}`);
  }
  if (!videos.length) console.log('No suitable videos found; try a different phrasing.');
}

main().catch(e => { console.error(e.message); process.exit(1); });
