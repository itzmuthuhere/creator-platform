# Research notes: Home loan prepayment, reduce EMI or tenure

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** Home Loan Prepayment Reduce EMI or Tenure? Calculation Method EXPLAINED (FinCalC TV), https://www.youtube.com/watch?v=GYSDiqLGJ0w. 19:37, ~4 years old, Hindi auto-captions (numbers heavily garbled).
- **Second:** Should You Prepay Your Loan or Invest Instead? (Zerodha Varsity), https://www.youtube.com/watch?v=Ekh34kPrbt0. 7:29, ~1 year old, Hindi auto-captions of mostly English speech.
- **Third:** Save LAKHS while paying off LOANS! (Ankur Warikoo, Hindi), https://www.youtube.com/watch?v=3Ptpi3GjP9I. 13:47, ~2 years old.
- **Fourth:** Save 18 Lakh on Home Loan! Reduce EMI vs Reduce Tenure? (Yuvarani, Tamil; captions translated to English), https://www.youtube.com/watch?v=4Bmazu6hVF0. 10:08, ~10 months old.

**FinCalC:** an Excel walkthrough of an amortisation schedule. A ₹1 lakh prepayment in month 6 of a 25-year loan, applied to tenure, trims about 21 months and saves several lakh of interest; applied to the EMI it saves much less. Conclusion: reduce tenure.

**Varsity:** a ₹5 lakh bonus against a ₹40 lakh, 20-year loan at 8.5%. Compares prepaying (reduce tenure) with investing in an index fund, raises start- and end-point bias in market returns, and lists when prepaying is clearly better (near retirement, costly NBFC loans, short tenure, unstable job, sole earner). Recommends peace of mind.

**Warikoo:** a ₹50 lakh, 8%, 25-year loan in a spreadsheet. Shows how early EMIs are mostly interest, that small prepayments early save far more than late ones, and that reducing EMI saves little. Habits: one extra EMI a year, and raising the EMI 10% a year to finish in about 10 years.

**Yuvarani:** a ₹50 lakh, 8.5%, 30-year loan. Says 80% of early EMIs is interest; a ₹10 lakh prepayment after one year saves far more if applied to tenure than to EMI.

Useful material across the four:
- Early EMIs are mostly interest, so early prepayment does the most.
- Tenure reduction "saves more" than EMI reduction (all four).
- Habits: extra EMI per year, yearly EMI step-up (Warikoo).
- Situations where prepaying beats investing (Varsity).

## 2. Topic assessment

| Criterion | Score 1–5 | Note |
|---|---|---|
| Useful to ordinary readers | 5 | Every home-loan borrower faces this at bonus time |
| Searchable | 5 | Many suggestions around prepayment, EMI vs tenure, calculators |
| Evergreen | 4 | Maths is permanent; rates, RBI rules and tax need dating |
| Can be explained in depth | 5 | Amortisation mechanism, fair comparison, Indian rules |
| Supports independent research | 5 | RBI circulars, bank pages, own calculations |
| Supports practical examples | 5 | |
| Suits screenshots or visuals | 2 | SBI rate card; the rest is numbers |
| Stands without the video | 5 | |
| Fits the site | 5 | |

**Verdict:** PROCEED.

**Chosen angle:** Every video and most search results say "reduce tenure, it saves more". That comparison quietly assumes the EMI-reducer spends the monthly saving. Run the same cash flow through both options and they are identical, so the real choice is between a commitment and flexibility. The article shows that with numbers, then covers the India-specific factors that decide it: RBI's no-penalty rules, banks extending tenure when rates rise (relevant with an RBI hike expected on 7 October 2026), the old-regime ₹2 lakh interest cap, and SBI MaxGain-style overdrafts as a third option.

## 3. Duplicate check

`library.mjs check "home loan prepayment reduce emi or tenure"`: RELATED only:
- https://techpulzo.in/how-much-home-loan-you-can-actually-afford (0.375, different intent: affordability before borrowing)
- https://techpulzo.in/how-to-read-a-loan-apr-instead-of-just-the-emi (0.267)
Decision: new article; link both.

## 4. Search intent and keywords

- **Primary keyword:** home loan prepayment reduce emi or tenure
- **Search intent:** decision
- **Target reader:** salaried borrower 1–10 years into a floating-rate home loan, with a bonus or savings to put in
- **Secondary keywords:** home loan prepayment calculator; reduce emi or tenure which is better; home loan part payment; prepay home loan or invest; home loan prepayment charges; home loan tenure increased after rate hike
- **What top results miss:** the equal-cash-flow comparison; that banks lengthen tenure on rate hikes and RBI lets you choose; old-regime tax cap maths; overdraft-style loans; correct numbers (two of the four videos are badly off).

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | EMI and interest on reducing balance; early EMIs mostly interest | Yes (all) | VERIFIED | Own calculation (scripts/research/home-loan-prepay-math.py) | ₹50L, 7.75%, 20y: first EMI 79% interest |
| 2 | "80% of early EMIs is interest" (₹50L, 8.5%, 30y) | Yes (Yuvarani) | CORRECTED | Own calculation | 92% at those terms; share depends on rate and tenure |
| 3 | ₹10L prepaid after a year on ₹50L/8.5%/30y: ~24 years, saves ~₹18L (tenure) | Yes (Yuvarani) | CORRECTED | Own calculation | ~198 months (16.5 y), saves ~₹52L; EMI route: EMI ~₹30,698, saves ~₹17L |
| 4 | ₹5L prepaid at month 6 on ₹40L/8.5%/20y: 197 months, interest ₹43.3L → ₹33.3L | Yes (Varsity) | CORRECTED | Own calculation | Base (EMI ₹34,712, ₹43.3L) matches; result is ~180 months, interest ~₹27.3L |
| 5 | ₹50L, 8%, 25y: EMI ₹38,591, interest ~₹65.8L | Yes (Warikoo) | VERIFIED | Own calculation | |
| 6 | Tenure reduction saves more than EMI reduction | Yes (all) | VERIFIED with caveat | Own calculation | True only if the EMI saving is spent; reduce-EMI + repaying the difference = identical result (195 months, ₹34.79L) |
| 7 | Earlier prepayment saves more | Yes (Warikoo, FinCalC) | VERIFIED | Own calculation | ₹5L at EMI 12/60/120/180 saves 13.7/9.3/5.0/2.0 lakh |
| 8 | One extra EMI per year; EMI +10%/yr finishes ~10 y | Yes (Warikoo) | VERIFIED | Own calculation | On our loan: 17.0 y; +5% → 12.4 y; +10% → 9.8 y |
| 9 | No prepayment charges on floating-rate home loans to individuals (banks) | No | VERIFIED | RBI circular DBOD.No.Dir.BC.107/13.03.00/2011-12, 5 Jun 2012 | |
| 10 | From 1 Jan 2026, no prepayment charges on any non-business floating loan to individuals, by any RE; any source of funds; no lock-in | No | VERIFIED | RBI (Pre-payment Charges on Loans) Directions, 2025 (2 Jul 2025), paras 3(ii), 5(i), 5(iii) | Applies to loans sanctioned/renewed on or after 1 Jan 2026 |
| 11 | At a rate reset, borrowers can choose higher EMI, longer tenure, a mix, or prepay; tenure extension can't cause negative amortisation; quarterly statement shows EMIs left | No | VERIFIED | RBI circular RBI/2023-24/55, 18 Aug 2023 (updated 1 Oct 2025) | |
| 12 | Repo 5.25%; MPC 5–7 Oct 2026; economists expect a 25 bp hike | No | VERIFIED | Business Standard, 2 Oct 2026 | Date the claim |
| 13 | SBI home loans 7.25–8.55%, MaxGain 7.75–9.05%, EBLR 7.90% (w.e.f. 20 May 2026) | No | VERIFIED | SBI rate card page (image), checked 2026-10-02 | |
| 14 | MaxGain: loan as an overdraft; park surplus, withdraw it, save interest | No | VERIFIED | SBI home loan scheme page; SBI home loan FAQ | |
| 15 | HDFC Bank lets you choose reduce EMI or reduce tenure on a part-prepayment request online | No | VERIFIED | HDFC Bank MyLoans part-prepayment page | |
| 16 | ICICI: minimum part-prepayment = 1 EMI; a voluntarily increased EMI can't be reduced later except via part-prepayment or conversion | No | VERIFIED | ICICI Bank home loan FAQ | |
| 17 | Most banks default to reducing tenure | No | UNVERIFIED | Only aggregator snippets | Not stated as fact; article says to specify the option |
| 18 | Old regime: up to ₹2L interest deduction on self-occupied (Sec 22, ITA 2025; was 24(b)); principal under Sec 123 within ₹1.5L; new regime: no interest deduction for self-occupied | No | VERIFIED | ICICI HFC article; TaxClue (updated 2 Oct 2026) | |
| 19 | After a ₹5L prepay in year 1, yearly interest on our loan stays above ₹2L until year 10 | No | VERIFIED | Own calculation | So the old-regime deduction is unaffected for ~9 years |
| 20 | Rate +0.5 pt in year 3: bank keeping EMI adds 19 months, ₹4.5L extra interest vs raising EMI by ₹1,444 | No | VERIFIED | Own calculation | |
| 21 | Prepay-vs-invest considerations (start/end-point bias; prepay near retirement, high-rate loans, unstable income, sole earner) | Yes (Varsity) | OPINION | Attributed to Zerodha Varsity | |

## 6. Value the video doesn't give

- The equal-cash-flow proof: reduce EMI and repay the difference = reduce tenure, to the month. Reframes the decision.
- Corrected numbers for two videos.
- RBI rules (2012 and 2025 prepayment directions; 2023 reset circular) and what to do when rates rise, timed with the October 2026 MPC.
- Old-regime tax cap maths.
- Overdraft (MaxGain) as a third option, with SBI's official rate premium.
- Bank-process details (HDFC choice, ICICI minimum and irreversibility of EMI increases).

## 7. Screenshot plan

| # | What it shows | Page URL | Why a reader needs it | Captured? |
|---|---|---|---|---|
| 01 | SBI home loan rate card (term loan vs MaxGain, EBLR) | https://sbi.bank.in/web/interest-rates/interest-rates/loan-schemes-interest-rates/home-loans-interest-rates-current | Shows current rates and the overdraft premium | Yes |

## 8. Outline

- Opening: direct verdict
- H2 What each option does to a real loan (worked example)
- H2 Why the comparison is closer than it looks (equal cash flow)
- H2 When lowering the EMI is the better call
- H2 Prepay early, and keep a habit going (timing table, habits)
- H2 When rates rise, your bank may stretch the tenure for you
- H2 Rules and costs worth knowing (RBI no charges; tax cap; MaxGain)
- H2 How to make the prepayment
- H2 FAQ
- Closing
