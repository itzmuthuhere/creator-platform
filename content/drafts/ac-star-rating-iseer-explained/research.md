# Research notes: AC tonnage and star ratings: what the ISEER number means

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** Which AC Should You Buy In 2026 | 3 Star vs 5 Star (ClearBuy), https://www.youtube.com/watch?v=AnXo9f-5nu8. ~7 months old. Stars are based on ISEER; BEE tightened bands from Jan 2026 (video cites 3★ 4.30–4.99, 4★ 5.00–5.59, 5★ ≥5.60, valid 2026–2028); check the ISEER number, not just stars; label kWh/year at 1,600 h; label figures for 1.5-ton 3★ vs 5★ of four brands (difference ~108–243 units/yr); savings scenarios at ₹8/unit; payback 5–13 years by usage; 3★ models sometimes have lower real cooling capacity (5,000 W = 1.42 ton vs 5,280 W); check capacity in watts; 2-way vs 4-way swing.
- **Second:** BEE New Star Rating 2026: full guide for AC buyers (Electro by Keshav), https://www.youtube.com/watch?v=YILZsm_A7V0. ~7 months old, Hindi. Labels valid to 31 Dec 2025 under the old table; new models from Mar–Apr 2026 with new label period; last year's 5★ would be 4★ now; discounts on 2025 stock.
- **Third:** What is ISEER? Difference between EER & ISEER (Girish Shinde), https://www.youtube.com/watch?v=XCxHyUTD_Hc. ~6 years old, Hindi. EER measured at one condition; ISEER seasonal across temperatures; higher is better.

## 2. Topic assessment

Useful 5 · Searchable 5 · Evergreen 3 (bands change) · Depth 4 · Independent research 4 · Examples 5 · Screenshots 1 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED. Angle: read the label's numbers (ISEER, annual units, cooling capacity in watts, label period), turn them into your own running cost, and decide 3★ vs 5★ by usage and your marginal electricity rate (with the TN slab link from the electricity draft).

## 3. Duplicate check

`library.mjs check "ac star rating iseer"`: no similar articles. Internal links: https://techpulzo.in/ssd-vs-hdd-for-a-budget-laptop-where-the-money-should-actually-go (not relevant) → use https://techpulzo.in/how-to-turn-a-spreadsheet-into-a-simple-budget-tracker and https://techpulzo.in/how-to-read-a-loan-apr-instead-of-just-the-emi (total cost vs sticker price). Electricity bill draft (#25) to cross-link once published.

## 4. Search intent and keywords

- **Primary keyword:** ac star rating iseer
- **Intent:** decision
- **Secondary:** what is iseer; 3 star vs 5 star ac; ac star rating 2026; 1.5 ton ac units per hour; ac cooling capacity watts

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | ISEER introduced 2015; uses outdoor temps 24–43°C weighted by hours, from 54 cities; label shows stars, ISEER, kWh/yr at 1,600 h | Yes (partly) | VERIFIED | Down To Earth (22 Sep 2025) | |
| 2 | ~1,100 of the 1,600 hours are at ≤30°C; Chennai has far more hours above 30°C than Bengaluru; one national label | No | VERIFIED | Down To Earth | |
| 3 | Average 3★ 1,008 kWh/yr vs 5★ 740 kWh/yr | No | VERIFIED (secondary) | Down To Earth | |
| 4 | Old star table extended to 31 Dec 2025; label valid 1 Jul 2022–31 Dec 2025 | Yes (Keshav) | VERIFIED (secondary, quoting BEE notice of 1 Aug 2024) | BL India | |
| 5 | Bands tightened from 1 Jan 2026 | Yes | VERIFIED (multiple secondary; BEE index lists 2025 amendment S.O. 3984(E)) | BEE AC notification index; ClearBuy; retailer guides | Exact new thresholds: sources disagree (5★ at 5.30/5.60/5.80) → not printed |
| 6 | 1 ton refrigeration = 3.517 kW; 5,000 W ≈ 1.42 ton | Yes (ClearBuy) | VERIFIED (unit definition) | | |
| 7 | Brand label units (Panasonic 759/977 etc.) | Yes (ClearBuy) | OPINION/attributed | ClearBuy | Not reproduced in detail |
| 8 | Payback scenarios | No | VERIFIED | scripts/research/ac-star-payback-math.py | Linear scaling from 1,600 h is an approximation |
| 9 | Price gap ₹6,000–8,000 3★→5★ | Yes (ClearBuy) | OPINION (attributed) | | |

## 6. Value the video doesn't give

- The label basis (1,600 h, 24–43°C bins) and its limitation for hot cities, from Down To Earth.
- Payback tied to your *marginal* electricity rate, using real slab rates, not a flat ₹8.
- Honest note that published 2026 thresholds disagree, so compare ISEER directly.
- A buying checklist: capacity in watts, ISEER, label period, annual units.

## 7. Screenshot plan

None: BEE label images are manufacturer-specific; describing fields is clearer.

## 8. Outline

- Opening
- H2 What ISEER means
- H2 What's on the label (fields)
- H2 Stars changed in January 2026
- H2 Turn the label into your running cost
- H2 3-star or 5-star: payback by usage and rate
- H2 Tonnage: check the watts
- H2 Buying checklist
- FAQ
