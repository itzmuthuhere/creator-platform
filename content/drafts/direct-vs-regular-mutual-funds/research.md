# Research notes: Direct vs regular mutual funds

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** Direct vs Regular Mutual funds: How expense ratios impact returns (Zerodha), https://www.youtube.com/watch?v=e4dsD-0w3qM. 8:11, published 2026-07-31, English auto-captions.
- **Second:** How to Switch from Regular to Direct Funds (Sanjay Kathuria, CFA), https://www.youtube.com/watch?v=tmHJEUo68ro. 15:14, published 2024-10-22, Hindi auto-captions (many numbers dropped by the captioner).
- **Third:** Direct vs Regular Mutual Funds | Explainer (Value Research), https://www.youtube.com/watch?v=DPh9Apfj4yU. 3:17, published 2023-04-21, English auto-captions.

**Zerodha:** a story of two friends with the same SIP in the same fund, one in the regular plan and one in the direct plan, who end up about ₹14 lakh apart after 20 years. It explains that the only structural difference is the distributor commission inside the expense ratio, that the expense ratio is taken out of the NAV daily, how to spot which plan you own from the scheme name, and that moving between plans means redeeming and reinvesting. It closes with a pitch for Coin.

**Kathuria:** argues that people bargain over small sums at the vegetable stall but ignore a 1% annual drag, then frames the switch as why / when / how / cost. Useful bits: a one-time fee-only adviser as a middle path; switching on a platform that imports your folios; and a staged approach: stop the regular SIP and start a direct one, leave units under a year old alone, and sell only enough older units each year to stay under the LTCG exemption.

**Value Research:** short explainer. More than half of AUM at most large fund houses came through regular plans (2023), DIY people should go direct, beginners can start regular and move later, and switching is a redemption for tax with a 1–2% exit load on units under a year.

Useful material across the three:
- The mechanism: commission sits inside the regular plan's expense ratio, so regular NAV grows slower; same portfolio, same manager.
- How to tell which plan you hold (scheme name).
- Switching = redemption + fresh purchase; tax applies.
- Staged switching to use the yearly LTCG exemption (Kathuria).
- When a regular plan can be worth it: only if real advice comes with it (Zerodha, Kathuria).

## 2. Topic assessment

| Criterion | Score 1–5 | Note |
|---|---|---|
| Useful to ordinary readers | 5 | 55% of industry AUM is still in regular plans (AMFI, March 2026) |
| Searchable | 5 | Many suggestions: difference, calculator, which is better, switch, tax |
| Evergreen | 4 | Mechanism is stable since 2013; TER limits and tax rates need dating |
| Can be explained in depth | 5 | Mechanism, real TER data, worked maths, tax staging |
| Supports independent research | 5 | SEBI circulars and board decision, AMFI TER data, AMC addenda |
| Supports practical examples | 5 | SIP and lump-sum maths, switch tax example |
| Suits screenshots or visuals | 2 | Mostly numbers; tables do more work than screenshots |
| Stands without the video | 5 | |
| Fits the site | 5 | Personal finance for Indian readers |

**Verdict:** PROCEED.

**Chosen angle:** "What the regular plan really costs you, measured with this month's AMFI data, and how to switch without handing back the savings in tax." The videos and most top results stop at "direct is cheaper by ~1%". This article measures the actual gap across every scheme AMFI publishes, prices it in rupees, corrects the outdated exit-load claim, and lays out a staged switch with a worked tax calculation.

## 3. Duplicate check

`library.mjs check "direct vs regular mutual fund"`: no similar articles. Checked "mutual fund sip", "expense ratio", "capital gains tax", "index fund": none. Decision: new article.

Related published articles usable for internal links (from `library.mjs list`):
- https://techpulzo.in/sip-vs-lump-sum-how-to-actually-decide-where-to-put-your-money
- https://techpulzo.in/how-to-read-a-loan-apr-instead-of-just-the-emi
- https://techpulzo.in/the-real-difference-between-a-fixed-deposit-and-a-recurring-deposit

## 4. Search intent and keywords

- **Primary keyword:** direct vs regular mutual fund
- **Search intent:** decision (with a how-to section for switching)
- **Target reader:** salaried Indian investors with existing SIPs, often bought through a bank RM or agent, or about to start one
- **Secondary keywords:** direct vs regular mutual fund expense ratio difference; regular to direct mutual fund switch; regular to direct switch tax; how to check if mutual fund is direct or regular; is direct mutual fund safe; direct vs regular mutual fund returns comparison
- **Questions people ask** (Google suggestions, 2026-10-02): which is better; expense ratio difference; switch charges; switch tax; how to check if my fund is direct or regular (Groww, Zerodha); is direct mutual fund safe; is Groww / Coin direct.
- **What the current top results miss:** most still say exit load applies on the switch (removed April 2025); few give the actual measured gap by category; almost none show the staged-switch tax maths; none mention that Groww now also sells regular plans (Groww Prime, July 2026), so "bought on an app" no longer guarantees direct.

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | Every scheme has a direct plan with a lower expense ratio, no commission, separate NAV; required since 1 Jan 2013 | Yes (all) | VERIFIED | SEBI circular CIR/IMD/DF/21/2012 (13 Sep 2012), para D | |
| 2 | Same portfolio and fund manager in both plans; only cost differs | Yes (Zerodha) | VERIFIED | SEBI 2012 circular (separate plan within the same scheme); AMFI TER page note | |
| 3 | Expense ratio is deducted from the NAV, not billed separately | Yes (Zerodha) | VERIFIED | AMFI TER page (annualised, daily accrual); SEBI board PR | |
| 4 | Expense ratio limits renamed Base Expense Ratio from 1 Apr 2026; statutory levies now charged separately; slabs e.g. 2.10% for equity schemes up to ₹500 cr, 0.95% above ₹50,000 cr; index funds/ETFs 0.90% | No | VERIFIED | SEBI PR 84/2025 (212th board meeting, Dec 2025), pp. 5–7; Cafemutual 17 Feb 2026 | |
| 5 | AMFI publishes regular and direct TER (BER, brokerage, levies) per scheme | No | VERIFIED | amfiindia.com/ter-of-mf-schemes, API checked 2026-10-02 | Our own measurement, §6 |
| 6 | Regular-direct gap "~1%" | Yes (all) | CORRECTED | AMFI TER data, September 2026 (our analysis, 1,671 non-ETF schemes, last day of month) | Median gap 1.08–1.25 points for active equity categories (IQR ~0.7–1.5), 0.49 for index funds, 0.10 for liquid, 0.07 for overnight; overall median 0.73. `scripts/research/amfi-ter-gap-groups.mjs` |
| 7 | ₹15,000/month for 20 years: direct ₹1.09 cr vs regular ₹95 lakh, ~₹14 lakh gap | Yes (Zerodha) | CORRECTED | Our calculation (scripts/research/direct-regular-math.py) | Gap of ~₹13–15 lakh reproduces; the absolute figures don't under monthly or effective-annual compounding. We use our own numbers |
| 8 | Direct share of industry AUM 45.1% (Mar 2026); retail 36.7% (21.4% in Mar 2021) | No (VR said >50% via regular in 2023) | VERIFIED | Business Standard, 7 Sep 2026, citing AMFI–CRISIL report | |
| 9 | Distributors were paid ~₹27,335 crore in commissions in a year | No | VERIFIED (secondary) | 1 Finance, 24 Aug 2026, analysis of AMFI disclosures | Use with attribution |
| 10 | CAS shows commission paid in rupees per scheme and the plan's average TER, half-yearly | No | VERIFIED | Cafemutual 21 Sep 2016 on SEBI circular SEBI/HO/IMD/DF2/CIR/P/2016/89, effective 1 Oct 2016 | |
| 11 | Switching regular→direct is a redemption + purchase for tax | Yes (all) | VERIFIED | Bajaj AMC (May 2026); Value Research (Jul 2026) | |
| 12 | Exit load applies on the switch (1–2% within a year) | Yes (VR, Kathuria) | CORRECTED | HDFC MF addendum (17 Apr 2025) citing AMFI letter of 9 Apr 2025; Value Research Jul 2026 | No exit load for regular→direct within the same scheme from 21 Apr 2025; the load clock continues from the original purchase date if you later redeem |
| 13 | Equity fund LTCG: 12.5% above ₹1.25 lakh a year; STCG 20%; 12-month holding; unchanged for FY 2026-27 | Yes (Kathuria) | VERIFIED | Bajaj AMC (27 May 2026); Tata MF; Value Research (Jul 2026) | Plus 4% cess; exemption is shared with all other equity LTCG in the year |
| 14 | Debt funds bought after 1 Apr 2023 taxed at slab regardless of holding | No | VERIFIED | Tata MF taxation blog; Value Research Jul 2026 | |
| 15 | Units redeemed FIFO; each SIP instalment has its own clock | Implied (Kathuria) | VERIFIED | Bajaj AMC exit-load glossary | |
| 16 | Staged switch: stop regular SIP, start direct; leave <12-month units; sell older units up to the exemption each year | Yes (Kathuria) | VERIFIED (method) | Value Research Jul 2026 also recommends staging across FYs | Our worked example adds numbers |
| 17 | SEBI RIA fees: up to 2.5% of AUA or ₹1,51,000 a year per family (fixed) | No | VERIFIED | SEBI IA guidelines as reported by TaxGuru/Cafemutual (2025) | Context for "paying for advice separately" |
| 18 | Groww launched regular plans via Groww Prime (Jul 2026); Zerodha Coin sells only direct | No | VERIFIED | Business Today, 10 Jul 2026 | Reason to check the plan name, not the app |
| 19 | Some international funds pause fresh purchases, which blocks a switch | No | VERIFIED | Value Research Jul 2026 | |
| 20 | Kathuria's 25-year step-up SIP example (₹ figures) | Yes (Kathuria) | UNVERIFIED | Captions dropped digits | Not used |

## 6. Value the video doesn't give

- A measurement of the actual regular–direct gap for every scheme AMFI published in September 2026, by category (our own pull of AMFI's TER data). Turns "about 1%" into real numbers.
- The 2026 expense framework (Base Expense Ratio, new slabs) from SEBI's board decision.
- Correction: exit load no longer applies to regular→direct switches within a scheme (since 21 Apr 2025).
- Worked tax example of switching in one go vs over two financial years, with the break-even against the annual saving.
- How to read your CAS: it already shows commission paid in rupees.
- Current market context: direct share of AUM; Groww Prime, so the app no longer tells you the plan.
- An honest "when regular is reasonable" section with the fee-only adviser alternative and SEBI's fee caps.
- Debt funds: switching triggers slab-rate tax regardless of holding period, so staging matters less and the decision is different.

## 7. Screenshot plan

| # | What it shows | Page URL | Why a reader needs it | Captured? |
|---|---|---|---|---|
| 01 | AMFI's TER lookup page with the note that direct plans must exclude distribution commission | https://www.amfiindia.com/ter-of-mf-schemes | Tells readers where to check any fund's regular vs direct TER themselves | see audit |

## 8. Outline

- H1: Direct vs regular mutual funds: what the commission costs you, and how to switch
- Opening: the answer up front (same fund, same manager; regular carries a commission inside its expense ratio; measured gap this month)
- H2 What is different between a direct plan and a regular plan (and what is the same): mechanism, NAV, 2013 rule, 2026 BER
- H2 How big the gap is right now: AMFI data table by category
- H2 What the gap does to your money over 10–30 years: SIP worked example + percentage-of-corpus table
- H2 When a regular plan is worth paying for: honest; fee-only adviser alternative; RIA caps
- H2 How to check whether you hold direct or regular: scheme name, CAS (with commission in rupees), apps (Groww Prime caveat)
- H2 How to switch without a big tax bill: what it costs now (no exit load, tax), staged method, worked example, debt-fund note, SIP order, routes
- H2 FAQ
- Closing section specific to this piece
