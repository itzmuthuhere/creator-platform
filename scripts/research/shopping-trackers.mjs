// Counts third-party requests on Indian shopping homepages, for the
// "how many trackers do Indian shopping sites load" article.
// Usage: node scripts/research/shopping-trackers.mjs <path-to-third-party-web>
//
// Loads each homepage in headless Chrome via Lighthouse (desktop preset, no
// clicks, so no cookie banner is accepted), takes every network request,
// and classifies each third-party domain with the third-party-web database
// (the same one Lighthouse uses; categories: ad, analytics, social, tag-manager,
// cdn, ...). Writes data/research/shopping-trackers.json.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";

const tpw = createRequire(import.meta.url)(process.argv[2]);
// Lighthouse's default user agent contains "Chrome-Lighthouse", which bot
// protection (e.g. Akamai on Meesho) blocks outright, so a real desktop Chrome
// UA is passed instead. Optional 3rd arg: comma-separated site names to run.
const UA = readFileSync("data/research/ua.txt", "utf8").trim();
const ONLY = process.argv[3] ? process.argv[3].split(",") : null;

const SITES = {
  "Amazon.in": "https://www.amazon.in/",
  "Flipkart": "https://www.flipkart.com/",
  "Myntra": "https://www.myntra.com/",
  "Meesho": "https://www.meesho.com/",
  "AJIO": "https://www.ajio.com/",
  "Nykaa": "https://www.nykaa.com/",
  "Tata CLiQ": "https://www.tatacliq.com/",
  "BigBasket": "https://www.bigbasket.com/",
  "JioMart": "https://www.jiomart.com/",
  "Snapdeal": "https://www.snapdeal.com/",
  "Croma": "https://www.croma.com/",
  "Reliance Digital": "https://www.reliancedigital.in/",
};
const TMP = "data/research/lh-tmp-shop.json";
const OUT = process.argv[4] || "data/research/shopping-trackers.json";
const TRACKING = new Set(["ad", "analytics", "social", "marketing", "customer-success", "tag-manager"]);

const firstParty = (host, site) => {
  const base = (h) => h.split(".").slice(-2).join(".");
  return base(host) === base(new URL(site).hostname);
};

const out = { testedAt: new Date().toISOString(), method: "Lighthouse desktop preset, homepage only, no interaction", sites: {} };
for (const [name, url] of Object.entries(SITES)) {
  if (ONLY && !ONLY.includes(name)) continue;
  try {
    execFileSync("npx", ["-y", "lighthouse", url, "--quiet", "--preset=desktop", "--only-categories=performance",
      "--output=json", `--output-path=${TMP}`, `--emulated-user-agent="${UA}"`, (process.env.HEADED ? "--chrome-flags=--no-first-run" : "--chrome-flags=--headless=new --no-first-run")],
      { stdio: "ignore", shell: true, timeout: 240000 });
    const r = JSON.parse(readFileSync(TMP, "utf8"));
    const finalUrl = r.finalDisplayedUrl;
    const reqs = r.audits["network-requests"].details.items;
    const domains = {};
    for (const q of reqs) {
      let host; try { host = new URL(q.url).hostname; } catch { continue; }
      if (!host || q.url.startsWith("data:") || firstParty(host, finalUrl)) continue;
      const ent = tpw.getEntity(q.url);
      const d = (domains[host] ||= { host, entity: ent?.name || null, categories: ent?.categories || [], requests: 0, bytes: 0 });
      d.requests++; d.bytes += q.transferSize || 0;
    }
    const list = Object.values(domains);
    const entities = {};
    for (const d of list) if (d.entity) (entities[d.entity] ||= { categories: d.categories, domains: 0 }).domains++;
    const trackerEntities = Object.entries(entities).filter(([, e]) => e.categories.some((c) => TRACKING.has(c))).map(([n]) => n);
    out.sites[name] = {
      url, finalUrl,
      totalRequests: reqs.length, thirdPartyRequests: list.reduce((a, d) => a + d.requests, 0),
      thirdPartyDomains: list.length, trackerEntities, entities, domains: list,
      score: Math.round((r.categories.performance.score || 0) * 100),
    };
    console.log(name.padEnd(17), finalUrl, "| requests", reqs.length, "| 3p domains", list.length, "| tracker companies", trackerEntities.length, trackerEntities.slice(0, 6).join(", "));
  } catch (e) {
    out.sites[name] = { url, error: String(e.message).slice(0, 150) };
    console.log(name, "FAILED", String(e.message).slice(0, 100));
  }
  writeFileSync(OUT, JSON.stringify(out, null, 1));
}
rmSync(TMP, { force: true });
