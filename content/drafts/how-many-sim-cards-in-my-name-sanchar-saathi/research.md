# Research notes: How to check how many SIM cards are registered in your name

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Sarkari DNA, "Aadhaar SIM Check New Process 2026"** (7:13, Hindi auto-captions): https://www.youtube.com/watch?v=QcLFgW3uka8. Web portal walkthrough: Citizen Centric Services → Know Mobile Connections, captcha, OTP; six numbers found in the creator's name; the options Not My Number / Not Required / Required; request ID and SMS; claims that the other holder must re-do KYC and the number closes "within about 15 days"; says the limit is 10 SIMs.
- **SS Tech Knowledge, "आपके नाम पर कितने SIM"** (4:04, Hindi): https://www.youtube.com/watch?v=CUSCHO9XxqA. The same check in the Sanchar Saathi app: registration by an SMS sent from the phone's SIM, five numbers across Jio/Airtel/BSNL, all used by family; claims "Not Required" closes a number "within 7 days".
- **HOW TO - PC, "How Many Sim Registered On My Aadhar Card"** (7:17, Hindi): https://www.youtube.com/watch?v=4TBXNayRW1U. The web flow in detail: numbers shown partly masked (first two and last four digits), session-extend pop-up, "you cannot report this number again", tracking the request by ID with status "In progress".
- **Money Coach Tamil** (7:04, Tamil): https://www.youtube.com/watch?v=qmsKTx2jD7Q. A Tamil narration of the Sarkari DNA video (same example, same request number 2316). Not an independent source; kept only to check the audit against it.

Useful material: the screens in order, where people hesitate (which option to pick, session timeout), the family-SIMs situation, the masked display.

## 2. Topic assessment

| Criterion | Score 1–5 | Note |
|---|---|---|
| Useful to ordinary readers | 5 | SIMs in your name used for fraud is a real risk |
| Searchable | 5 | "how many sim cards on my aadhaar", "sanchar saathi sim check", "tafcop" |
| Evergreen / long-lasting | 4 | Portal stable; the 9-SIM enforcement changed in Aug 2026 |
| Can be explained in depth | 4 | Options, re-verification, timelines, limits, family SIMs |
| Supports independent research | 5 | Official FAQ is detailed |
| Supports practical examples | 4 | Family scenarios, over-the-limit scenario |
| Suits screenshots | 3 | Login page only; results page needs OTP and shows personal data |
| Stands without the videos | 5 | Yes |
| Fits the site | 5 | India-specific everyday tech/security |

**Verdict:** PROCEED. Every video gets the limit (10) and the timelines (7 or 15 days) wrong against the official FAQ. None explains re-verification, the porting freeze, or what to do about SIMs family members use.

**Chosen angle:** how to run the check, how to decide what to do with each number on the list (including family SIMs), and what really happens after you report, with the official timelines.

## 3. Duplicate check

`library.mjs check "how many sim cards on my aadhaar"`: no duplicate. Related published: spam calls/SMS settings article, UPI fraud article. Queue sibling #1 (CEIR) is a draft, so it can't be linked yet.

## 4. Search intent and keywords

- **Primary keyword:** how many sim cards on my aadhaar
- **Search intent:** how-to
- **Target reader:** anyone in India wanting to check for unknown SIMs, or to close unused ones
- **Secondary keywords:** sanchar saathi sim check, know mobile connections in your name, tafcop portal, not my number sanchar saathi, sim card limit per person india, how to close sim in my name
- **Questions people ask:** how many SIMs can one person have; what happens after "not my number"; how long it takes; is it only Aadhaar; what about SIMs my family uses; can someone be arrested for a SIM in my name

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | Limit: 9 connections per person across all operators; 6 in J&K, Assam and North-East | yes (as 10) | CORRECTED | Sanchar Saathi FAQ; Free Press Journal 25 Aug 2026 | All four videos say 10 |
| 2 | From Aug 2026, operators must suspend any connection activated beyond the limit; real-time checks due by 30 Nov 2026, using DoT's Digital Intelligence Platform | no | VERIFIED | Free Press Journal 25 Aug 2026 | News report of a DoT directive; dated in text |
| 3 | Report via portal login with OTP, tick "This is not my number" or "Not required", click Report | yes | VERIFIED | Sanchar Saathi FAQ | |
| 4 | A third option "Required" appears in the interface | yes | UNVERIFIED | Videos (2 channels) | Official FAQ names only the two report options; described as what the videos show |
| 5 | Reported connections are flagged for re-verification by the operator | partly | VERIFIED | FAQ | |
| 6 | Re-verification compares the subscriber's photo and a PoI with records; any specified PoI document can be used | yes (loosely) | VERIFIED | FAQ | |
| 7 | Timelines: outgoing suspended within 30 days, incoming within 45, disconnection within 60 days if re-verification fails; +30 days for roaming/disability/hospitalisation | yes (as 7 / 15 days) | CORRECTED | FAQ | |
| 8 | Flagged numbers can't be ported until re-verification completes | no | VERIFIED | FAQ | |
| 9 | Connections over the limit are disconnected in order of activation | no | VERIFIED | FAQ | |
| 10 | Connections are non-transferable; name change allowed between blood relatives / legal heirs with NOC and a new CAF; new SIM issued | no | VERIFIED | FAQ | |
| 11 | Forged documents: police complaint/FIR against the subscriber | no | VERIFIED | FAQ | |
| 12 | Obtaining a SIM through fraud, cheating or personation: up to 3 years, up to ₹50 lakh fine, or both | no | VERIFIED | Telecom Act s.42(3)(e) | |
| 13 | Portal counters: 4,22,52,742 requests received; 3,98,56,550 resolved | no | VERIFIED | tafcop page (screenshot) | Snapshot, dated |
| 14 | App registration works by sending an SMS from the phone's own SIM | yes | UNVERIFIED | SS Tech Knowledge video | Attributed |
| 15 | Numbers are shown partly masked | yes | UNVERIFIED | HOW TO - PC video | Attributed |
| 16 | Check covers all operators (Jio, Airtel, Vi, BSNL) | yes | VERIFIED | FAQ ("from all the TSPs") | |
| 17 | Matching is by the subscriber's identity; how DoT matches isn't published in detail | no | VERIFIED (limits) | FAQ says "connections taken in his/her name"; FPJ mentions subscriber images on DIP | Article avoids saying "only Aadhaar" |
| 18 | Chakshu is for suspected fraud calls/SMS, not for money already lost (use 1930 / cybercrime.gov.in) | no | VERIFIED | Sanchar Saathi FAQ | |

## 6. Value the videos don't give

- Correct limit (9/6) and the Aug 2026 enforcement.
- Official re-verification timelines (30/45/60 days) instead of "7" or "15 days".
- Porting freeze on flagged numbers.
- How to decide per number: yours, family's, old and unused, unknown.
- Family SIMs: legally yours; name-change route for blood relatives.
- What to do if an unknown number turns up (report, keep proof, police if forged, 1930 if money lost).
- Legal context (s.42(3)(e)).

## 7. Screenshot plan

| # | What it shows | Page URL | Why a reader needs it | Captured? |
|---|---|---|---|---|
| 01 | Know Mobile Connections login form + counters | https://tafcop.sancharsaathi.gov.in/telecomUser/ | Recognise the right page | yes |
| — | Results list with report options | same, after OTP | Would show the options | not captured: needs OTP and shows personal numbers; described in a table instead |
| — | Sanchar Saathi citizen services | https://sancharsaathi.gov.in/Home/index.jsp | Navigation | skipped: a video pop-up covers the services grid |

## 8. Outline

1. Intro: direct answer (portal/app, 2 minutes) + why it matters
2. How many SIMs you're allowed (9/6) and the 2026 enforcement
3. Check on the website, step by step (screenshot)
4. Check on the app
5. Reading the list: what to do with each kind of number (table)
6. What happens after you report (timeline table)
7. SIMs your family uses in your name
8. If you find a number you never took
9. Mistakes
10. FAQ
11. Closing
