#!/usr/bin/env node
// Captures a screenshot of a web page (optionally cropped to one element or a region)
// into a draft's screenshots/ folder, and records where it came from in manifest.json.
//
// Usage:
//   node capture-screenshot.mjs <url> <draft-dir> <NN-meaningful-name.png> [options]
//
// Options:
//   --selector "<css>"     crop to this element (scrolled into view first)
//   --crop x,y,w,h         crop to a region of the viewport, in CSS pixels
//   --pad 16               padding around --selector crops (CSS px, default 16)
//   --full                 full-page screenshot instead of the viewport
//   --viewport 1280x800    viewport size (default 1280x800)
//   --scale 2              device scale factor for sharper images (default 2)
//   --wait 2000            ms to wait after load for late content (default 1500)
//   --dark                 emulate prefers-color-scheme: dark
//
// Uses the agent-browser CLI (a real Chromium). It does not log in, solve CAPTCHAs, or
// get around paywalls/bot checks: if a page blocks it, the capture fails and the skill
// records that in quality-audit.md and moves on.
// Needs `sharp`, which the creator-platform project already has; run from the project root.

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync, execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(path.join(process.cwd(), 'package.json'));
const SESSION = 'yt2article';

function agentBrowserCommand() {
  if (process.env.AGENT_BROWSER_JS) return [process.execPath, [process.env.AGENT_BROWSER_JS]];
  try {
    const js = path.join(execSync('npm root -g', { encoding: 'utf8' }).trim(), 'agent-browser', 'bin', 'agent-browser.js');
    if (fs.existsSync(js)) return [process.execPath, [js]];
  } catch { /* fall through */ }
  return ['agent-browser', []];
}
const [AB_CMD, AB_PRE] = agentBrowserCommand();

function ab(...args) {
  const r = spawnSync(AB_CMD, [...AB_PRE, '--session', SESSION, ...args], { encoding: 'utf8', timeout: 90000 });
  const out = (r.stdout || '') + (r.stderr || '');
  if (r.status !== 0) throw new Error(`agent-browser ${args[0]} failed: ${out.trim() || r.error?.message}`);
  return out.trim();
}
function abJson(...args) {
  const out = ab(...args, '--json');
  const json = JSON.parse(out.slice(out.indexOf('{')));
  if (!json.success) throw new Error(`agent-browser ${args[0]}: ${json.error}`);
  return json.data;
}

function opt(args, name, dflt) {
  const i = args.indexOf(name);
  if (i === -1) return dflt;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
}
function flag(args, name) {
  const i = args.indexOf(name);
  if (i === -1) return false;
  args.splice(i, 1);
  return true;
}

async function main() {
  const args = process.argv.slice(2);
  const selector = opt(args, '--selector');
  const crop = opt(args, '--crop');
  const pad = Number(opt(args, '--pad', 16));
  const [vw, vh] = opt(args, '--viewport', '1280x800').split('x').map(Number);
  const scale = Number(opt(args, '--scale', 2));
  const wait = Number(opt(args, '--wait', 1500));
  const full = flag(args, '--full');
  const dark = flag(args, '--dark');
  const [url, draftDir, name] = args;

  if (!url || !draftDir || !name) {
    console.error('Usage: node capture-screenshot.mjs <url> <draft-dir> <NN-name.png> [--selector css | --crop x,y,w,h] [--full] [--viewport 1280x800] [--scale 2] [--wait ms] [--dark]');
    process.exit(1);
  }
  if (!/^\d{2}-[a-z0-9]+(-[a-z0-9]+)*\.png$/.test(name)) {
    console.error(`Filename "${name}" should look like 03-dns-settings-page.png (2-digit order, kebab-case, .png)`);
    process.exit(1);
  }
  const shotsDir = path.join(draftDir, 'screenshots');
  fs.mkdirSync(shotsDir, { recursive: true });
  const outPath = path.join(shotsDir, name);
  const rawPath = outPath.replace(/\.png$/, '.raw.png');

  ab('set', 'viewport', String(vw), String(vh), String(scale));
  if (dark) ab('set', 'media', 'dark');
  ab('open', url);
  ab('wait', String(wait));
  const finalUrl = ab('get', 'url').split('\n').pop().trim();
  const pageTitle = ab('get', 'title').split('\n').pop().trim();

  let region = null;
  if (selector) {
    ab('scrollintoview', selector);
    ab('wait', '400');
    const box = abJson('get', 'box', selector);
    if (!box.width || !box.height) throw new Error(`Selector "${selector}" matched an element with zero size; pick its visible container`);
    region = { x: box.x - pad, y: box.y - pad, w: box.width + 2 * pad, h: box.height + 2 * pad };
  } else if (crop) {
    const [x, y, w, h] = crop.split(',').map(Number);
    region = { x, y, w, h };
  }

  ab('screenshot', ...(full ? ['--full'] : []), rawPath);

  const sharp = require('sharp');
  const meta = await sharp(rawPath).metadata();
  if (region) {
    // Box coordinates are CSS pixels; the image is CSS pixels * scale. Clamp to the image.
    const left = Math.max(0, Math.round(region.x * scale));
    const top = Math.max(0, Math.round(region.y * scale));
    const width = Math.min(meta.width - left, Math.round(region.w * scale));
    const height = Math.min(meta.height - top, Math.round(region.h * scale));
    if (width <= 0 || height <= 0) throw new Error('Crop region is outside the captured image');
    await sharp(rawPath).extract({ left, top, width, height }).png({ compressionLevel: 9 }).toFile(outPath);
  } else {
    await sharp(rawPath).png({ compressionLevel: 9 }).toFile(outPath);
  }
  fs.unlinkSync(rawPath);
  const outMeta = await sharp(outPath).metadata();

  const manifestPath = path.join(shotsDir, 'manifest.json');
  const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : [];
  const entry = {
    file: name, sourceUrl: finalUrl || url, pageTitle, selector: selector || null, crop: crop || null,
    width: outMeta.width, height: outMeta.height, capturedAt: new Date().toISOString(),
    alt: '', caption: '',  // filled in by the writer; audit-draft.mjs checks the article's alt text and caption
  };
  const idx = manifest.findIndex(m => m.file === name);
  if (idx >= 0) manifest[idx] = entry; else manifest.push(entry);
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`Saved ${outPath} (${outMeta.width}x${outMeta.height}) from "${pageTitle}" ${finalUrl}`);
  console.log('Look at the image before using it: confirm it shows what the caption will claim, with no cookie banner, login wall, or personal data.');
}

main().catch(e => { console.error(`Screenshot failed: ${e.message}`); process.exit(1); });
