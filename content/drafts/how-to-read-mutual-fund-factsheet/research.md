# Research notes: How to read a mutual fund factsheet

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** How to Read a PPFAS Mutual Fund Factsheet | Key Terms Explained Simply (PPFAS), https://www.youtube.com/watch?v=y_ZqDr_1yQM. 2 weeks old, auto captions. A 50+ item glossary walk-through: scheme type, objective (not a promise), inception, fund managers and "managing since", base expense ratio vs TER (actual TER on the AMC's statutory disclosures page), benchmark, minimums, AUM vs average AUM, NAV per plan/option, exit load (credited back to scheme), holdings, asset allocation, rating allocation, sector allocation, debt instruments (T-bills, CDs, CPs, TREPS, CDMDF), quantitative measures (SD, beta, Sharpe with stated risk-free rate, turnover with/without arbitrage, information ratio), debt measures (average maturity, modified/Macaulay duration, YTM not guaranteed), PRC for debt, performance (CAGR, rolling, SIP, direct vs regular). Comprehensive but a dictionary, not a reading order.
- **Second:** How to read Mutual Fund Factsheets? (Mutual Funds with Groww), https://www.youtube.com/watch?v=95Pm0mKE45s. ~1 year old, Hindi with manual captions. Where to find factsheets (AMC website → scheme documents); Edelweiss Large Cap example: objective, managers, benchmark Nifty 100 TRI, holdings, sector weights, market-cap split. Claims SEBI doesn't require factsheets (they're voluntary but standardised): UNVERIFIED, not used.
- **Third:** How to read the Factsheet (SBI Mutual Fund), https://www.youtube.com/watch?v=UTLKiS3avK4. 2 weeks old, Hindi auto captions. Factsheet as a monthly report card from the AMC; objective, scheme category, NAV, AUM, portfolio changes.

## 2. Topic assessment

Useful 5 · Searchable 5 · Evergreen 4 · Depth 4 · Independent research 4 · Examples 5 (real factsheet) · Screenshots 2 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED. Angle: a reading order (what to check first, what each number tells you, and the traps), walked through on one real factsheet (PPFAS Flexi Cap, Aug 2026), not a 50-term glossary. Traps: base expense ratio vs total TER; the regular vs direct return rows; Sharpe/SD/beta without a peer; turnover with vs without arbitrage; information ratio now mandated by SEBI.

## 3. Duplicate check

`library.mjs check "mutual fund factsheet"`: only match 0.533 to the direct-vs-regular draft (different intent). Internal links: https://techpulzo.in/sip-vs-lump-sum-how-to-actually-decide-where-to-put-your-money, https://techpulzo.in/how-to-read-a-loan-apr-instead-of-just-the-emi.

## 4. Search intent and keywords

- **Primary keyword:** mutual fund factsheet
- **Intent:** how-to
- **Secondary:** how to read mutual fund factsheet; sharpe ratio in mutual fund factsheet; portfolio turnover ratio meaning; information ratio mutual fund; base expense ratio vs TER

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | PPFAS Flexi Cap Aug 2026: benchmark Nifty 500 TRI; inception 24 May 2013; base expense ratio 1.05% reg / 0.53% direct; beta 0.60, SD 9.93%, Sharpe 0.80, IR -0.01; turnover 16.84% excl / 43.00% incl arbitrage; risk-free 4.97% (TREPS yield); exit load 10% free units, 2% ≤365 days, 1% 366–730 days | No | VERIFIED | PPFAS factsheet Aug 2026 (PDF) | Values matched by layout order in extracted text |
| 2 | Returns to 31 Aug 2026 (regular/direct/benchmark): 1Y -0.94/-0.32/5.31; 3Y 13.19/13.96/12.54; 5Y 11.59/12.46/11.12; 10Y 16.13/17.02/13.31 | No | VERIFIED | Same | Column order: regular, direct, benchmark |
| 3 | 3-yr rolling (direct vs Nifty 500 TRI): avg 19.12 vs 14.89; min 0.74 vs -6.31 | No | VERIFIED (layout-inferred) | Same, page 5 | |
| 4 | Total TER Sep 2026: 1.30% reg / 0.69% direct | No | VERIFIED | AMFI TER data (our pull) | Base vs total gap +0.25/+0.16 |
| 5 | Riskometer six levels; evaluated monthly; disclosed with portfolio within 10 days of month end; changes communicated to unitholders; effective 1 Jan 2021 | No | VERIFIED | SEBI circular 5 Oct 2020 (via TaxGuru); SEBI investor site | |
| 6 | IR: SEBI circular 17 Jan 2025; equity-oriented schemes; daily on AMC site with performance; AMFI comparable downloadable; formula vs Tier 1 benchmark, daily returns | No | VERIFIED | SEBI circular PDF | |
| 7 | Exit load credited back to scheme | Yes (PPFAS) | VERIFIED (attributed) | PPFAS video; factsheet | |
| 8 | YTM is not a guaranteed return; modified duration = rate sensitivity | Yes (PPFAS) | VERIFIED (general) | PPFAS video | |
| 9 | Factsheets are voluntary (SEBI doesn't mandate) | Yes (Groww) | UNVERIFIED | — | Not used |
| 10 | Worked numbers (₹6,100 cost gap on ₹10 lakh; exit load ₹1,980) | No | VERIFIED | scripts/research/factsheet-example-math.py | |

## 6. Value the video doesn't give

- A reading order (a 10-minute checklist) rather than a glossary.
- A real current factsheet with real numbers and what they mean in context.
- Base expense ratio vs total TER, shown with AMFI's figures.
- SEBI's rules behind the riskometer and information ratio, with dates.
- Worked exit-load and cost examples.

## 7. Screenshot plan

Factsheets are PDFs (capture tool works on HTML pages); a crop of a fund house's factsheet risks misrepresenting a dated document. Use tables of the figures instead. No screenshots.

## 8. Outline

- Opening
- H2 Where to find it, and which month you're reading
- H2 Step 1: what the fund is allowed to do (type, objective, benchmark, riskometer)
- H2 Step 2: what it costs (base vs total TER, exit load)
- H2 Step 3: performance, read correctly (direct vs regular rows, benchmark, rolling, SIP)
- H2 Step 4: what it owns (allocation, cash, holdings, sector)
- H2 Step 5: the risk ratios (SD, beta, Sharpe, IR, turnover) — with "compare to peers" rule
- H2 Debt funds: four different numbers
- H2 A 10-minute checklist
- FAQ
