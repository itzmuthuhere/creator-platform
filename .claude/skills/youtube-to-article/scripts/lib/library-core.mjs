// Shared article-library loading and title similarity, used by library.mjs and audit-draft.mjs.

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

export const SITE_URL = (process.env.SITE_URL || 'https://techpulzo.in').replace(/\/$/, '');
export const DRAFTS_DIR = path.resolve(process.env.DRAFTS_DIR || 'content/drafts');

const STOP = new Set(('a an and are as at be by can do does for from how i in is it its of on or that the this to vs what when '
  + 'where which who why will with you your my our explained guide actually real really should without need know').split(' '));

function stem(w) {
  return w.replace(/(ies)$/, 'y').replace(/(ing|ed|es|s)$/, '') || w;
}
export function tokens(text) {
  return new Set((text || '').toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/[\s-]+/)
    .filter(w => w.length > 1 && !STOP.has(w)).map(stem));
}
// Crude stemming misses pairs like degrades/degradation, so long words also match on a 5-char prefix.
function sameWord(x, y) {
  return x === y || (x.length >= 5 && y.length >= 5 && x.slice(0, 5) === y.slice(0, 5));
}
// Blend of Jaccard (penalises size mismatch) and overlap coefficient (lets a short
// query fully match a long title). Neither alone ranks well for title-vs-phrase.
// A single shared word ("learn", "phone") is weak evidence, so it's halved.
export function similarity(a, b) {
  const A = [...tokens(a)], B = [...tokens(b)];
  if (!A.length || !B.length) return 0;
  const inter = A.filter(x => B.some(y => sameWord(x, y))).length;
  const jaccard = inter / (A.length + B.length - inter);
  const overlap = inter / Math.min(A.length, B.length);
  const score = 0.5 * jaccard + 0.5 * overlap;
  return +(inter < 2 && Math.min(A.length, B.length) > 1 ? score / 2 : score).toFixed(3);
}

function titleFromSlug(slug) {
  const s = slug.replace(/-/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function localDrafts() {
  if (!fs.existsSync(DRAFTS_DIR)) return [];
  const out = [];
  for (const dir of fs.readdirSync(DRAFTS_DIR)) {
    const f = path.join(DRAFTS_DIR, dir, 'metadata.json');
    if (!fs.existsSync(f)) continue;
    try {
      const m = JSON.parse(fs.readFileSync(f, 'utf8'));
      out.push({
        source: 'draft', status: m.status, slug: m.slug || dir, title: m.title || titleFromSlug(dir),
        keywords: [m.primaryKeyword, ...(m.secondaryKeywords || [])].filter(Boolean),
        sourceVideo: m.sourceVideo || null, path: path.relative(process.cwd(), path.join(DRAFTS_DIR, dir)),
        url: null,
      });
    } catch (e) {
      console.error(`WARN: unreadable ${f}: ${e.message}`);
    }
  }
  return out;
}

async function sitemapPosts() {
  try {
    const res = await fetch(`${SITE_URL}/sitemap.xml`, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const out = [];
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const u = new URL(m[1]);
      const parts = u.pathname.split('/').filter(Boolean);
      // Posts live at /<slug> or /ta/<slug>; skip the home page and /category/* pages.
      if (!parts.length || parts[0] === 'category' || (parts[0] === 'ta' && parts.length === 1)) continue;
      const slug = parts[parts.length - 1];
      out.push({ source: 'site', status: 'PUBLISHED', slug, title: titleFromSlug(slug), keywords: [], url: m[1] });
    }
    return out;
  } catch (e) {
    console.error(`WARN: could not read ${SITE_URL}/sitemap.xml (${e.message}); continuing without live posts`);
    return [];
  }
}

async function dbPosts() {
  if (!process.env.DATABASE_URL) return [];
  try {
    const require = createRequire(path.join(process.cwd(), 'package.json'));
    const { Client } = require('pg');
    const c = new Client({ connectionString: process.env.DATABASE_URL });
    await c.connect();
    try {
      const r = await c.query('SELECT slug, title, status, keywords, locale FROM "Post"');
      return r.rows.map(p => ({
        source: 'db', status: p.status, slug: p.slug, title: p.title, keywords: p.keywords || [],
        url: p.status === 'PUBLISHED' ? `${SITE_URL}${p.locale === 'ta' ? '/ta' : ''}/${p.slug}` : null,
      }));
    } finally {
      await c.end();
    }
  } catch (e) {
    console.error(`WARN: database lookup failed (${e.message}); continuing without it`);
    return [];
  }
}

export async function loadLibrary() {
  const [drafts, site, db] = await Promise.all([localDrafts(), sitemapPosts(), dbPosts()]);
  // DB rows have real titles, so they win over sitemap rows for the same slug.
  const bySlug = new Map();
  for (const e of [...site, ...db, ...drafts]) {
    const prev = bySlug.get(e.slug);
    bySlug.set(e.slug, prev ? { ...prev, ...e, url: e.url || prev.url, sources: [...(prev.sources || [prev.source]), e.source] } : e);
  }
  return [...bySlug.values()];
}

export function videoId(u) {
  if (!u) return null;
  const m = String(u).match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([\w-]{11})/);
  return m ? m[1] : (/^[\w-]{11}$/.test(u) ? u : null);
}
