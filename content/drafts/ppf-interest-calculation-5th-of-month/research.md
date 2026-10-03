# Research notes: How PPF interest is calculated

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** How PPF Interest is Calculated | Best time to invest money in PPF account (BiRaJ Ki BaAtEiN), https://www.youtube.com/watch?v=eABhECddNo8. 7:25, ~2 years old, Hindi.
- **Second:** PPF Interest Calculation (CA Rahul Agarwal), https://www.youtube.com/watch?v=YvUqQRLgRow. 3:23, ~5 years old, Hindi.
- **Third:** Complete PPF Guide 2026 (Asset Yogi), https://www.youtube.com/watch?v=FydkDqMDFc8. 12:41, ~4 months old, Hindi (English translation track).
- Not used: FinCalC TV (B6wSI4uPYYc) fetched but not read.

**BiRaJ:** deposit by the 5th to earn that month's interest; an April 1–5 deposit earns the full year; claims a maximum of 12 deposits a year; shows a calculator.

**CA Rahul Agarwal:** interest on the lowest balance between the 5th and month end, credited yearly; example ₹1 lakh + ₹20,000 on the 10th earns on ₹1 lakh that month.

**Asset Yogi:** 7.1% (revisable quarterly), EEE tax status, ₹500–₹1.5 lakh, 15-year term ending 31 March, 5-year extensions, loans (years 3–6, 25%, 1% interest), withdrawals from year 7 (50% rule), premature closure after 5 years with 1% less interest.

Useful material: the 5th rule; yearly crediting; lump sum at the start of the year; rules context.

## 2. Topic assessment

Useful 5 · Searchable 5 · Evergreen 5 (rule since 2019 scheme; rate dated) · Depth 4 · Independent research 4 · Examples 5 · Screenshots 1 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED.

**Chosen angle:** Show the mechanism month by month, then put a price on the two timing decisions: the 5th (₹887 a year on ₹1.5 lakh) versus the month of the year (₹2.7 lakh over 15 years between April and March). Correct the "12 deposits" limit.

## 3. Duplicate check

`library.mjs check "ppf interest calculation"`: no similar articles. Internal links: https://techpulzo.in/sip-vs-lump-sum-how-to-actually-decide-where-to-put-your-money, https://techpulzo.in/the-real-difference-between-a-fixed-deposit-and-a-recurring-deposit.

## 4. Search intent and keywords

- **Primary keyword:** ppf interest calculation
- **Search intent:** informational
- **Secondary keywords:** ppf 5th of month rule; best time to deposit in ppf; ppf interest rate 2026; ppf monthly vs lump sum; ppf maturity amount 1.5 lakh 15 years

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | Monthly interest on lowest balance between close of the 5th and month end | Yes (all) | VERIFIED | PPF Scheme 2019 (G.S.R. 915(E)) via TaxGuru; SBI PPF FAQ | |
| 2 | Interest credited once a year (31 March) | Yes | VERIFIED | Scheme text; SBI FAQ | |
| 3 | Max 12 deposits a year | Yes (BiRaJ) | CORRECTED | SBI FAQ: no restriction on number of instalments | Old 1968 scheme rule |
| 4 | ₹500–₹1.5 lakh a year, multiples of ₹50 | Yes (Asset Yogi) | VERIFIED | Scheme; SBI FAQ | |
| 5 | Rate 7.1% for Oct–Dec 2026; unchanged since April 2020 | Yes (7.1%) | VERIFIED (current quarter) | Business Standard 2 Oct 2026 | "Unchanged since April 2020" seen only in search summaries; not used |
| 6 | Premature closure: 1% lower interest | Yes (Asset Yogi) | VERIFIED | Scheme text via TaxGuru | |
| 7 | Extension in 5-year blocks via Form 4 within a year of maturity | Yes (Asset Yogi) | VERIFIED | SBI FAQ | |
| 8 | Withdrawals/loans details | Yes (Asset Yogi) | VERIFIED (partly) | SBI FAQ | Not central; article mentions briefly |
| 9 | 15-year figures (₹40.68 lakh etc.) | No (Tamil title shows ₹40,68,209) | VERIFIED | Own calculation (scripts/research/ppf-timing-math.py) | Matches a widely quoted figure |

## 6. Value the video doesn't give

- Priced comparison of five deposit patterns over 15 years.
- The bigger lever (month of the year) vs the 5th.
- Correction of the 12-deposit limit.
- Practical scheduling (salary day after the 5th; standing instructions).

## 7. Screenshot plan

None: SBI FAQ answers are collapsed accordions the capture script can't open; scheme text is a gazette PDF.

## 8. Outline

- Opening
- H2 The rule, month by month
- H2 What the 5th is worth
- H2 The bigger lever: which month of the year
- H2 Making it automatic
- H2 Rate and other rules that affect returns
- FAQ
- Closing
