# Research notes: How to port your mobile number to another network

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** Sim Card Port Online New Update | Jio MNP Online (IND Hindi Tech), https://www.youtube.com/watch?v=jQ8AGda21P0. ~1 month old, Hindi. Jio now lets you start porting online from home (SIM delivered); still SMS PORT <number> to 1900 from the number, need an active plan/SMS; UPC from 1901; plan promo (ignored).
- **Second:** UPC Code Nahi Aa Raha? Solution (Mr Zaman), https://www.youtube.com/watch?v=O13liV79OV8. ~4 months old, Hindi. Common reasons the PORT SMS fails or no UPC: no active recharge/SMS pack, etc.
- **Third:** Mobile number port kaise kare 2026 (Flight Information), https://www.youtube.com/watch?v=ZcndBCQixL4. 8 days old, Hindi. Basic steps for Jio/Airtel/Vi/BSNL.

## 2. Topic assessment

Useful 5 · Searchable 5 · Evergreen 5 · Depth 4 · Independent research 5 · Examples 4 · Screenshots 1 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED. Angle: TRAI's rules turned into a checklist (eligibility, UPC, timing, fees), plus why UPC requests fail and what to do on porting night; operator-neutral.

## 3. Duplicate check

`library.mjs check "port mobile number"`: no similar. Internal links: https://techpulzo.in/prepaid-vs-postpaid-mobile-plans-which-actually-costs-less-over-a-year, https://techpulzo.in/how-two-factor-authentication-actually-stops-account-hacks (OTP-dependent accounts during the switch).

## 4. Search intent and keywords

- **Primary keyword:** port mobile number
- **Intent:** how-to
- **Secondary:** upc code; mnp rules; how long does porting take; upc code not received; port jio to airtel

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | UPC eligibility (a)–(g): postpaid dues cleared; ≥90 days on current network; no ownership change in process; no pending contractual exit obligations; not barred by court; not sub-judice; 7 days after SIM swap/replacement; rejection reason by SMS | Partly | VERIFIED | TRAI MNP FAQ (30 Sep 2024) | |
| 2 | SMS "PORT <10-digit number>" to 1900; UPC (8 digits) from 1901 | Yes | VERIFIED | TRAI FAQ | |
| 3 | UPC valid 4 days (30 days in J&K, Assam, NE); generation day excluded | No | VERIFIED | TRAI FAQ | |
| 4 | Porting 3 working days within LSA; 5 across LSAs and for corporate; up to 15 in J&K, Assam, NE; night switchover, up to 4 h without service | No | VERIFIED | TRAI FAQ | |
| 5 | Withdraw within 24 h by SMS "CANCEL <number>" to 1900; no refund of porting charge | No | VERIFIED | TRAI FAQ | |
| 6 | Max per-port charge ₹6.46 | No | VERIFIED | TRAI FAQ | |
| 7 | Individual porting request with valid UPC can't be rejected; corporate needs authorisation letter (≤100 numbers) | No | VERIFIED | TRAI FAQ | |
| 8 | Ninth Amendment issued 14 Mar 2024, effective 1 Jul 2024 (SIM swap rule, anti-fraud) | No | VERIFIED (secondary) | TeamLease RegTech; FoneArena | |
| 9 | Jio online porting with home delivery | Yes | OPINION (attributed; operator-specific) | | |
| 10 | Active plan needed to send SMS | Yes | VERIFIED (practical; attributed) | | |

## 6. Value the video doesn't give

- Complete eligibility list and rejection reasons from TRAI.
- Timelines by region, the 24-hour cancel window, fee cap.
- Practical prep: bank/UPI OTPs during switchover, postpaid final bill, unused balance.

## 7. Screenshot plan

None: SMS-based process; operator apps need login.

## 8. Outline

- Opening
- H2 Before you start: can you port? (eligibility)
- H2 Step by step
- H2 How long it takes, and porting night
- H2 Why your UPC didn't arrive
- H2 Changing your mind
- H2 What to sort out before the switch
- FAQ
