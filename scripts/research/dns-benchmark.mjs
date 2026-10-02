// DNS resolver benchmark used for the "fastest DNS in India" article.
// Usage: node scripts/research/dns-benchmark.mjs [label]
// Writes data/research/dns-<label>.json with every individual timing.
//
// Two tests, both interleaved across resolvers so no resolver gets a
// quieter time slot than another:
//   warm  - popular Indian-use domains, 10 rounds each (what browsing mostly is)
//   cold  - long-tail domains, first lookup only (cache miss likely at the ISP)
import dgram from "node:dgram";
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";

const label = process.argv[2] || new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");

const RESOLVERS = {
  "ISP (ACT Fibernet)": "183.82.243.66",
  "Google": "8.8.8.8",
  "Cloudflare": "1.1.1.1",
  "Quad9": "9.9.9.9",
  "OpenDNS": "208.67.222.222",
  "AdGuard": "94.140.14.14",
};

const WARM = ["google.com", "youtube.com", "instagram.com", "whatsapp.com", "flipkart.com", "amazon.in",
  "hotstar.com", "onlinesbi.sbi", "hdfcbank.com", "irctc.co.in", "zomato.com", "swiggy.com", "paytm.com",
  "phonepe.com", "ndtv.com", "cricbuzz.com", "netflix.com", "linkedin.com", "wikipedia.org", "github.com",
  "myntra.com", "makemytrip.com", "incometax.gov.in", "uidai.gov.in", "naukri.com"];

// Small or niche sites: unlikely to be sitting in every resolver's cache.
const COLD = ["thehindubusinessline.com", "kmbl.co.in", "iob.in", "ucobank.com", "karnatakabank.com",
  "tmb.in", "cityunionbank.com", "dhanbank.com", "southindianbank.com", "federalbank.co.in",
  "chennaimetrorail.org", "kseb.in", "tangedco.gov.in", "tnpsc.gov.in", "annauniv.edu", "iitm.ac.in",
  "nitt.edu", "psgtech.edu", "vit.ac.in", "srmist.edu.in", "sastra.edu", "kct.ac.in", "tneb.in",
  "dinamalar.com", "dailythanthi.com", "vikatan.com", "maalaimalar.com", "polimernews.com",
  "sathyam.tv", "puthiyathalaimurai.com", "tnstc.in", "tnpds.gov.in", "tnreginet.gov.in",
  "eservices.tn.gov.in", "cmcvellore.ac.in", "apollohospitals.com", "kauveryhospital.com",
  "saravanabhavan.com", "adyarananda.com", "grtjewels.com", "lalithaajewellery.com",
  "pothys.com", "chennaisilks.com", "ramraj.com", "aavin.tn.gov.in", "tvsmotor.com",
  "murugappa.com", "zohocorp.com", "freshworks.com", "chargebee.com"];

const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);

// Raw UDP queries instead of node:dns — Node's c-ares resolver keeps its own
// local answer cache, so repeat lookups returned in ~0.1ms without touching
// the network. A hand-built packet always goes to the resolver.
function buildQuery(id, host) {
  const labels = host.split(".").flatMap((l) => [l.length, ...Buffer.from(l)]);
  return Buffer.from([id >> 8, id & 255, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, ...labels, 0, 0, 1, 0, 1]);
}

function makeResolver(ip) { return ip; }

function timeLookup(ip, host) {
  return new Promise((resolve) => {
    const sock = dgram.createSocket("udp4");
    const id = Math.floor(Math.random() * 65536);
    const t = process.hrtime.bigint();
    const done = (res) => { clearTimeout(timer); sock.close(); resolve(res); };
    const timer = setTimeout(() => done({ ms: 2000, ok: false, err: "TIMEOUT" }), 2000);
    sock.on("message", (msg) => {
      if (msg.readUInt16BE(0) !== id) return;
      const rcode = msg[3] & 15; // 0 = NOERROR, 3 = NXDOMAIN (both real answers)
      done({ ms: Number(process.hrtime.bigint() - t) / 1e6, ok: rcode === 0 || rcode === 3, rcode });
    });
    sock.on("error", (e) => done({ ms: Number(process.hrtime.bigint() - t) / 1e6, ok: false, err: e.code }));
    sock.send(buildQuery(id, host), 53, ip);
  });
}

function ping(ip) {
  try {
    const out = execFileSync("ping", ["-n", "10", ip], { encoding: "utf8" });
    const m = out.match(/Average = (\d+)ms/);
    return m ? Number(m[1]) : null;
  } catch { return null; }
}

const names = Object.keys(RESOLVERS);
const resolvers = Object.fromEntries(names.map((n) => [n, makeResolver(RESOLVERS[n])]));
const results = { label, startedAt: new Date().toISOString(), resolvers: RESOLVERS, ping: {}, warm: {}, cold: {} };
for (const n of names) { results.warm[n] = []; results.cold[n] = []; }

for (const n of names) results.ping[n] = ping(RESOLVERS[n]);
console.log("ping", results.ping);

// Cold first, so the warm rounds can't pre-fill caches for these names.
for (const host of shuffle(COLD)) {
  await Promise.all(shuffle(names).map(async (n) => {
    results.cold[n].push({ host, ...(await timeLookup(resolvers[n], host)) });
  }));
}

for (let round = 0; round < 10; round++) {
  for (const host of shuffle(WARM)) {
    for (const n of shuffle(names)) {
      results.warm[n].push({ host, round, ...(await timeLookup(resolvers[n], host)) });
    }
  }
}
results.finishedAt = new Date().toISOString();

const pct = (xs, p) => { const s = [...xs].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))]; };
const summary = {};
for (const n of names) {
  const w = results.warm[n].filter((x) => x.ok).map((x) => x.ms);
  const c = results.cold[n].filter((x) => x.ok).map((x) => x.ms);
  summary[n] = {
    ping: results.ping[n],
    warmMedian: +pct(w, 50).toFixed(1), warmP95: +pct(w, 95).toFixed(1),
    warmFail: results.warm[n].length - w.length,
    coldMedian: +pct(c, 50).toFixed(1), coldP95: +pct(c, 95).toFixed(1),
    coldFail: results.cold[n].length - c.length,
  };
}
results.summary = summary;
mkdirSync("data/research", { recursive: true });
writeFileSync(`data/research/dns-${label}.json`, JSON.stringify(results, null, 1));
console.table(summary);
