// Lighthouse mobile performance test of Indian bank homepages, for the
// "how fast do Indian bank websites load" article.
// Usage: node scripts/research/bank-lighthouse.mjs
// Runs each site 3 times (Lighthouse's default mobile profile: emulated
// mid-range phone, throttled 4G) and keeps the median-score run. Writes
// data/research/banks-lighthouse.json.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";

// Final .bank.in URLs: Indian banks moved to the RBI-mandated .bank.in
// domain, and testing the old .com/.co.in address measures a redirect.
const SITES = {
  "SBI": "https://sbi.bank.in/",
  "HDFC Bank": "https://www.hdfc.bank.in/",
  "ICICI Bank": "https://www.icici.bank.in/",
  "Axis Bank": "https://www.axis.bank.in/",
  "Kotak Mahindra Bank": "https://www.kotak.bank.in/en/home.html",
  "Punjab National Bank": "https://pnb.bank.in/",
  "Bank of Baroda": "https://bankofbaroda.bank.in/",
  "Canara Bank": "https://www.canarabank.bank.in/",
  "Union Bank of India": "https://www.unionbankofindia.bank.in/en/home",
  "IndusInd Bank": "https://www.indusind.bank.in/",
  "Yes Bank": "https://www.yes.bank.in/",
  "IDFC FIRST Bank": "https://www.idfcfirst.bank.in/",
};
const RUNS = 3;
const TMP = "data/research/lh-tmp.json";
mkdirSync("data/research", { recursive: true });

const out = { testedAt: new Date().toISOString(), profile: "Lighthouse default mobile", sites: {} };
for (const [name, url] of Object.entries(SITES)) {
  const runs = [];
  for (let i = 0; i < RUNS; i++) {
    try {
      execFileSync("npx", ["-y", "lighthouse", url, "--quiet", "--only-categories=performance",
        "--output=json", `--output-path=${TMP}`, "--chrome-flags=--headless=new --no-first-run"],
        { stdio: "ignore", shell: true, timeout: 180000 });
      const r = JSON.parse(readFileSync(TMP, "utf8"));
      const a = r.audits;
      if (r.runtimeError) throw new Error(r.runtimeError.code);
      runs.push({
        score: Math.round(r.categories.performance.score * 100),
        finalUrl: r.finalDisplayedUrl,
        fcp: a["first-contentful-paint"].numericValue,
        lcp: a["largest-contentful-paint"].numericValue,
        tbt: a["total-blocking-time"].numericValue,
        cls: a["cumulative-layout-shift"].numericValue,
        si: a["speed-index"].numericValue,
        bytes: a["total-byte-weight"].numericValue,
        requests: a["network-requests"]?.details?.items?.length ?? null,
        thirdPartyBytes: a["third-party-summary"]?.details?.summary?.wastedBytes ?? null,
      });
    } catch (e) {
      runs.push({ error: String(e.message).slice(0, 120) });
    }
  }
  const good = runs.filter((r) => r.score != null).sort((x, y) => x.score - y.score);
  out.sites[name] = { url, runs, median: good.length ? good[Math.floor(good.length / 2)] : null };
  const m = out.sites[name].median;
  console.log(name, m ? `score ${m.score} lcp ${(m.lcp / 1000).toFixed(1)}s ${(m.bytes / 1e6).toFixed(1)}MB ${m.requests} req` : "FAILED " + JSON.stringify(runs));
  writeFileSync("data/research/banks-lighthouse.json", JSON.stringify(out, null, 1));
}
rmSync(TMP, { force: true });
