# Research notes: How to set or reset a UPI PIN with Aadhaar

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Official Sonu TC, "Aadhaar OTP nahi aa raha"** (4:29, Hindi, English auto-translation): https://www.youtube.com/watch?v=bNgNYi8bwvs. The Aadhaar OTP goes to the Aadhaar-linked mobile, often a family member's; check which number via UIDAI's verify service (last digits shown); the bank OTP goes to the bank-registered number, so both phones may be needed.
- **Yah Kaise, "BOI Aadhaar OTP problem"** (4:59, English auto): https://www.youtube.com/watch?v=7DkqLeOWOyI. For Bank of India customers the Aadhaar OTP wasn't arriving at the time (a bank/server-side issue); generic fixes (clear cache, update app) didn't help; use a debit card if you have one, or wait.
- **Yashpal Yadav** (3:18, Hindi): https://www.youtube.com/watch?v=KxeaMzqInhU. Only some banks offer the Aadhaar option; first 6 digits of Aadhaar; two OTPs; PIN is 4 or 6 digits depending on the bank; a PIN set in one app works in others for the same account.
- **SUBARAJ TECH** (6:16, Tamil): https://www.youtube.com/watch?v=W9inBeR_k3I. PhonePe reset flow: Profile → Bank accounts → UPI PIN → Reset → "Aadhaar number linked with bank"; bank and Aadhaar mobile should be the same; two OTPs arrive together, and the Aadhaar one is entered first; check the balance afterwards to confirm.

## 2. Topic assessment

**Verdict:** PROCEED. Very common need (no debit card, forgotten PIN). Videos cover app taps but not prerequisites clearly, not the October 2025 face-authentication option, and not the three-wrong-attempts lockout.

**Angle:** prerequisites check first (which avoids the "OTP not coming" loop), then the flow, the newer face-authentication route, and a troubleshooting table.

## 3. Duplicate check

No duplicate. Related published: UPI fraud warning signs; credit vs debit card.

## 4. Search intent and keywords

- **Primary:** set upi pin with aadhaar
- **Intent:** how-to / troubleshooting
- **Secondary:** upi pin without debit card, reset upi pin aadhaar otp, aadhaar otp not received upi, upi pin face authentication

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | You can set/reset a UPI PIN with Aadhaar authentication; Aadhaar used only for authentication, not retained | partly | VERIFIED | ICICI UPI FAQ | |
| 2 | Enter the first 6 digits of Aadhaar | yes | VERIFIED | NPCI search snippet + all 4 videos | NPCI page itself not retrievable; stated as the flow shown in apps |
| 3 | Two OTPs: one to the Aadhaar-linked mobile (UIDAI), one to the bank-registered mobile | yes | UNVERIFIED (official) | Videos (3 of 4) | Described as what users see; consistent with bank OTP + Aadhaar OTP |
| 4 | Bank account must have Aadhaar linked; not all banks offer the option | yes | VERIFIED (partly) | Videos; ICICI | "Not all banks" hedged |
| 5 | PIN 4 or 6 digits depending on bank | yes | UNVERIFIED | Yashpal Yadav video; NPCI 123PAY snippet "4-6 digit" | Hedged |
| 6 | 3 wrong PIN attempts → UPI debits blocked for 24 hours; reset possible immediately | no | VERIFIED | ICICI UPI FAQ | Bank-specific wording; framed as "for example, ICICI" |
| 7 | Oct 2025: NPCI enabled Aadhaar face authentication for setting/resetting UPI PIN (UIDAI FaceRD); for first-time users, seniors, people without cards | no | VERIFIED | Business Today; The Week (announced 7 Oct 2025, GFF) | Availability varies by app/bank: hedged |
| 8 | Biometric approval of payments is opt-in; initially capped at ₹5,000 | no | VERIFIED | Business Today | Side note |
| 9 | Bank of India Aadhaar OTP outage in 2026 | yes | UNVERIFIED | Yah Kaise video | Used as an example of bank-side failure, attributed, not dated as current |
| 10 | Check the Aadhaar-linked mobile via UIDAI's verify service (last digits) | yes | UNVERIFIED | Official Sonu TC video | Attributed |
| 11 | A PIN set for a bank account works across UPI apps | yes | UNVERIFIED | Yashpal Yadav video | PIN is per bank account; plausible, hedged "usually" |

## 6. Value the videos don't give

- Prerequisites checklist before starting.
- The face-authentication route (Oct 2025).
- The lockout rule.
- A troubleshooting table that separates Aadhaar-OTP from bank-OTP failures.
- Safety: the PIN is never needed to receive money.

## 7. Screenshot plan

None captured. The flow happens inside phone apps (PhonePe, GPay, Paytm, BHIM), which can't be captured from this environment, and NPCI's public how-to pages returned 404 after its site restructure. Replaced with a step table and a troubleshooting table.

## 8. Outline

1. Intro
2. Before you start: 4 checks
3. Steps (app-agnostic)
4. Face authentication option
5. Troubleshooting table
6. After setting: test, lockout rule, safety
7. FAQ
8. Closing
