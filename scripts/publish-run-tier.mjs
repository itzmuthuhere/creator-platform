// Publishes the next eligible "Run tier" article from data/publish-run-tier-queue.json.
//
// Run by .github/workflows/publish-run-tier.yml on a cron (2x/day) and via
// workflow_dispatch. Local use: DATABASE_URL=... node scripts/publish-run-tier.mjs [--count N] [--dry-run]
//
// State lives in the database, not in a file: a queue slug is "done" once its
// Post row is PUBLISHED. Each run takes the first slug in the list that is still
// UNPUBLISHED, runs the mechanical gate, and publishes it (or logs a skip and
// moves to the next slug, up to --count publishes per run; default 1).
//
// Mechanical gate (no editorial judgement — a human curated the list):
//   - strip the stale key-takeaways <img>
//   - check-content.js exits 0
//   - word count >= 550
//   - >= 2 FAQ items
//   - no mid-article "Final Thought / Real Takeaway"-type <h2> (i.e. a wrap-up
//     heading that is not one of the last two headings = stitched-drafts tell)

import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import pg from "pg";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const QUEUE_FILE = path.join(ROOT, "data/publish-run-tier-queue.json");
const CHECK = path.join(ROOT, ".claude/skills/write-blog-article/scripts/check-content.js");
const SITE = process.env.SITE_ORIGIN || "https://techpulzo.in";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const COUNT = Math.max(1, parseInt((args.find((a) => a.startsWith("--count=")) || "").split("=")[1] || "1", 10));

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const wordCount = (html) => {
  const t = (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return t ? t.split(" ").length : 0;
};
const stripKeytakeaways = (html) => html.replace(/<img\b[^>]*keytakeaways[^>]*>\s*/gi, "");
const WRAP_RE = /real takeaway|final thought|the bottom line|in conclusion|wrapping up|final word|closing thought/i;

function gate(content, faqItems) {
  const cleaned = stripKeytakeaways(content).trim();
  const words = wordCount(cleaned);
  const faqCount = Array.isArray(faqItems) ? faqItems.length : 0;

  const h2s = [...cleaned.matchAll(/<h2>(.*?)<\/h2>/gis)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  const badWrapIdx = h2s.findIndex((h, i) => WRAP_RE.test(h) && i < h2s.length - 2);

  const tmp = path.join(ROOT, `.publish-check-${process.pid}.html`);
  writeFileSync(tmp, cleaned);
  let checkPass = true;
  let checkOut = "";
  try {
    checkOut = execFileSync("node", [CHECK, tmp], { encoding: "utf8" });
  } catch (err) {
    checkPass = false;
    checkOut = (err.stdout || "") + (err.stderr || "");
  } finally {
    try { unlinkSync(tmp); } catch {}
  }

  const reasons = [
    !checkPass ? "check-content.js flagged structural problems" : null,
    words < 550 ? `word count ${words} < 550` : null,
    faqCount < 2 ? `only ${faqCount} FAQ item(s)` : null,
    badWrapIdx !== -1 ? `mid-article wrap-up heading "${h2s[badWrapIdx]}" (${h2s.length - 1 - badWrapIdx} sections after it)` : null,
  ].filter(Boolean);

  return { ok: reasons.length === 0, reason: reasons.join("; "), cleaned, words, checkOut };
}

async function httpStatus(url) {
  try {
    const r = await fetch(url, { redirect: "follow" });
    return r.status;
  } catch (e) {
    return `ERR ${e.message}`;
  }
}

const { slugs } = JSON.parse(readFileSync(QUEUE_FILE, "utf8"));
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

let published = 0;
let exitCode = 0;
try {
  for (const slug of slugs) {
    if (published >= COUNT) break;

    const { rows } = await client.query(
      'SELECT id, slug, status, content, "faqItems" FROM "Post" WHERE slug = $1',
      [slug]
    );
    const row = rows[0];
    if (!row) {
      console.log(`WARN  ${slug} :: not found in DB — skipping`);
      continue;
    }
    if (row.status !== "UNPUBLISHED") continue; // already done or not eligible

    const g = gate(row.content, row.faqItems);
    if (!g.ok) {
      console.log(`SKIP  ${slug} :: ${g.reason}`);
      if (g.checkOut.trim()) console.log(g.checkOut.trim().split("\n").map((l) => `      ${l}`).join("\n"));
      continue; // try the next slug in the list
    }

    if (DRY_RUN) {
      console.log(`DRY   ${slug} :: would publish (${g.words}w, image ${/keytakeaways/i.test(row.content) ? "stripped" : "n/a"})`);
      published++;
      continue;
    }

    const now = new Date();
    const readingTime = Math.max(1, Math.ceil(g.words / 200));
    await client.query(
      `UPDATE "Post"
         SET content = $1, "readingTime" = $2, status = 'PUBLISHED',
             "publishedAt" = COALESCE("publishedAt", $3), "updatedAt" = $3
       WHERE id = $4`,
      [g.cleaned, readingTime, now, row.id]
    );

    const url = `${SITE}/${slug}`;
    let live = await httpStatus(url);
    if (live !== 200) {
      await new Promise((r) => setTimeout(r, 8000));
      live = await httpStatus(url);
    }
    console.log(`PUBLISH ${slug} :: ${g.words}w, readingTime=${readingTime}, live=${live} (${url})`);
    if (live !== 200) {
      console.log(`      WARNING: live check did not return 200 — verify by hand`);
      exitCode = 1;
    }
    published++;
  }

  if (published === 0) {
    const remaining = [];
    for (const slug of slugs) {
      const { rows } = await client.query('SELECT status FROM "Post" WHERE slug = $1', [slug]);
      if (rows[0] && rows[0].status === "UNPUBLISHED") remaining.push(slug);
    }
    console.log(remaining.length === 0
      ? "QUEUE EMPTY — every slug in the list is already PUBLISHED, nothing to do"
      : `Nothing published this run (${remaining.length} still pending; the next one(s) were skipped by the gate above)`);
  } else {
    console.log(`Done — published ${published} this run`);
  }
} finally {
  await client.end();
}

process.exit(exitCode);
