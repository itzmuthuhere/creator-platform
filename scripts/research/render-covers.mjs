// Renders cover PNGs for the data-driven articles from cover.html.
// Usage: node scripts/research/render-covers.mjs <out-dir>
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const outDir = process.argv[2] || "content/drafts/covers";
mkdirSync(outDir, { recursive: true });
const tpl = pathToFileURL(path.resolve("scripts/research/cover.html")).href;

const COVERS = {
  "fastest-dns-server-in-india-tested": { cat: "Tech · Tested", title: "Fastest DNS in India: 6 Resolvers, 1,800 Timed Lookups",
    stat: "4.8 ms", statLabel: "median, ISP default DNS", unit: " ms",
    bars: [["ISP (ACT)", 4.8, "hi"], ["Cloudflare", 8.2], ["Google", 29.7], ["OpenDNS", 53.6], ["AdGuard", 119], ["Quad9", 322, "lo"]] },
  "indian-bank-websites-speed-test": { cat: "Tech · Tested", title: "How Fast Do Indian Bank Websites Load? 12 Banks Tested",
    stat: "22.5 s", statLabel: "SBI homepage, slow 4G", unit: " s",
    bars: [["IndusInd", 4.0, "hi"], ["HDFC", 5.5], ["ICICI", 7.1], ["Kotak", 16.9], ["SBI", 22.5, "lo"], ["Canara", 46.8, "lo"]] },
  "fd-interest-rates-compared-indian-banks": { cat: "Finance · Sep 2026", title: "FD Interest Rates Compared Across 9 Indian Banks",
    stat: "1.15%", statLabel: "3-year rate gap, highest vs lowest", unit: "%",
    bars: [["AU SFB", 7.40, "hi"], ["IDFC FIRST", 7.10, "hi"], ["Axis", 6.50], ["HDFC", 6.45], ["SBI", 6.30], ["BoB", 6.25]] },
  "beginner-python-programs-with-output": { cat: "Tech · Python", title: "10 Beginner Python Programs With Real Output",
    stat: "10 + 5", statLabel: "programs + real error messages", unit: "",
    bars: [], code: "$ python main.py\n<b>EMI: Rs 10,747 per month</b>\n<b>Total paid: Rs 644,817</b>\n<b>Interest: Rs 144,817</b>" },
};

for (const [slug, d] of Object.entries(COVERS)) {
  const file = path.resolve(outDir, `${slug}.png`);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=1200,630",
    `--screenshot=${file}`, `${tpl}#${encodeURIComponent(JSON.stringify(d))}`], { stdio: "ignore" });
  console.log("rendered", file);
}
