# Research notes: UPI Lite and UPI transaction limits explained

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** New UPI Charges 2026 | UPI Transaction Limits & MDR Rules Explained (Asset Yogi), https://www.youtube.com/watch?v=oJJiIVb2T6o. 2 weeks old, Hindi (manual captions). NPCI's 15 Sep 2026 announcement: MDR on P2M from 15 Oct 2026; P2P free; 0.4% above ₹2,000, capped at ₹300 (₹75,000+); ≤₹2,000 free; small merchants ≤₹1 lakh/month UPI receipts exempt; ₹5 flat for railways, telecom, insurance, fuel, utilities, education, agri; autopay mandates exempt; capital markets 0.02% (cap ₹300) paid by AMC/broker; 96% of transactions by volume are under ₹2,000; split 40/30/20/10 between issuer bank, acquirer, app, PSP bank (attributed to Finance Ministry).
- **Second:** What is UPI Lite? How to use and activate (Aadi Singh), https://www.youtube.com/watch?v=j_zh4tAA2GE. ~7 months old. UPI Lite as an on-device wallet; no PIN; keeps small payments off the bank statement (one top-up entry instead); ₹5,000 max on Paytm, ₹100 min top-up; claims "no server issues, no bank issues" (overstated); can move balance back to the bank.
- **Third:** UPI Lite Explained! No UPI PIN? (Debdutta Tech), https://www.youtube.com/watch?v=PyiSze0WPYo. ~2 months old, Hindi auto captions. Setup walkthrough, PIN-free payments, auto top-up.

## 2. Topic assessment

Useful 5 · Searchable 5 · Evergreen 3 (limits/MDR change) · Depth 4 · Independent research 5 · Examples 5 · Screenshots 1 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED. Angle: what UPI Lite is and when to use it, every UPI limit in one place (Lite, P2P, high-value P2M categories), and what the 15 Oct 2026 MDR change means for a consumer (nothing directly, with the caveats).

## 3. Duplicate check

`library.mjs check "upi lite"`: no similar articles. Internal links: https://techpulzo.in/credit-card-vs-debit-card-for-everyday-spending-what-actually-saves-you-money, https://techpulzo.in/how-cashback-apps-actually-make-money-off-you.

## 4. Search intent and keywords

- **Primary keyword:** upi lite
- **Intent:** informational
- **Secondary:** upi lite limit; upi transaction limit per day; upi charges from october 2026; upi mdr 2026; upi lite transfer to bank

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | UPI Lite: ₹1,000 per transaction, ₹5,000 total; no AFA; alerts not real-time; top-up only online with AFA | Partly | VERIFIED | RBI offline framework (updated 4 Dec 2024) | |
| 2 | Transfer-out to bank without disabling; NPCI deadline 31 Mar 2025; inactive (6 months) balances returned; app lock required | Yes (Aadi Singh, partly) | VERIFIED (secondary) | Angel One (27 Feb 2025) | Angel One's limits outdated (₹500/₹2,000) |
| 3 | Auto top-up exists | Yes | VERIFIED (secondary) | Gizbot/search summary of NPCI circular | Stated generally |
| 4 | UPI Lite: "no server issues/bank issues" | Yes (Aadi Singh) | CORRECTED | RBI framework: offline only to the extent no AFA; still UPI | Reduces dependence on bank's real-time debit; not immune |
| 5 | P2P ₹1 lakh; from 15 Sep 2025 higher P2M limits (capital markets, insurance, GeM, travel, collections ₹5L/txn, ₹10L/day; credit card bills and jewellery ₹5L/₹6L; etc.); banks may set lower | No | VERIFIED (secondary) | CAalley; NPCI BHIM post | |
| 6 | MDR from 15 Oct 2026: P2M >₹2,000 at 0.4%, ₹300 cap at ₹75,000+; ₹5 flat for railways/telecom/insurance/fuel/utilities; capital markets 0.02% capped ₹300; small merchants ≤₹1L/month exempt; P2P free; merchants can't pass on; apps can't charge platform fees; RuPay credit card/credit lines outside framework | Yes (Asset Yogi) | VERIFIED (secondary) | SCC Online summary of NPCI FAQ (15 Sep 2026) | |
| 7 | MDR revenue split 40/30/20/10 | Yes (Asset Yogi) | UNVERIFIED | Not in SCC summary | Not used |
| 8 | 96% of transactions by volume under ₹2,000 | Yes (Asset Yogi) | PARTLY VERIFIED | SCC: framework excludes "more than 95%" of P2M volume | Use SCC figure |
| 9 | Autopay mandates exempt from MDR | Yes (Asset Yogi) | UNVERIFIED | Not in SCC summary | Not used |
| 10 | Worked MDR amounts | No | VERIFIED | Own arithmetic | ₹10,000 → ₹40; ₹1L → ₹300 cap; ₹1L to broker at 0.02% → ₹20 |

## 6. Value the video doesn't give

- RBI's primary rules for UPI Lite (limits, no AFA, alerts).
- One table of all current UPI limits including Sep 2025 category limits.
- NPCI FAQ details the videos skip: merchants can't surcharge; apps can't add platform fees; credit-line UPI excluded.
- Practical guidance: when UPI Lite is worth turning on, and what to do if a shop asks for cash or adds a fee.

## 7. Screenshot plan

None: app screens would show account details; NPCI pages unreliable (404).

## 8. Outline

- Opening
- H2 What UPI Lite is
- H2 UPI Lite limits and rules
- H2 When UPI Lite is worth using (and when not)
- H2 How to turn it on, top up and take money out
- H2 All the UPI limits in one place
- H2 The UPI charge from 15 October 2026: what it means for you
- FAQ
