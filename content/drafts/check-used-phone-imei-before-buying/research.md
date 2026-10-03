# Research notes: How to check a used phone's IMEI before buying it

Internal working file. Not published.

## 1. Source videos (in my own words)

- **CyberSafe Rajasthan, "Mobile chori ka hai ya nahi"** (3:45, Hindi auto-captions): https://www.youtube.com/watch?v=txFS9Dhyzbo. A police-affiliated channel shows the CEIR IMEI verification: any mobile number works for the OTP; a clean IMEI shows as valid with the model; a blocked one shows a red line ("do not use this device without permission", "IMEI is blacklisted"). Advises checking both IMEIs because a block may have been filed on only one.
- **Repair My Mobile, "Technician par bhi case?"** (5:07, English auto-translation): https://www.youtube.com/watch?v=dCiPijT4t9E. A district cyber cell guideline told repair shops to check whether an IMEI is blacklisted before repairing; don't put your own or a customer's SIM into such phones, because police pull call records and the SIM owner gets a notice; report suspicious phones to cyber police.
- **Serg Tech, "MUST DO Checklist Before Buying Used Phones"** (5:47, English): https://www.youtube.com/watch?v=2bLvpsaB3r0. US-centric: physical and function checks, battery health, carrier unlock, US blacklist, finance status, warranty via IMEI/serial. The carrier-finance checks don't apply in India; the physical, battery and warranty checks do.
- **Trakin Tech Tamil, "Used Phones Buying Guide"** (7:48, fragmentary auto-captions): https://www.youtube.com/watch?v=nlFErav8_n8. Captions too broken to use beyond general remarks on flagship age and battery health. Not relied on.

## 2. Topic assessment

| Criterion | Score 1–5 | Note |
|---|---|---|
| Useful to ordinary readers | 5 | Large used-phone market in India; buying a stolen phone has real consequences |
| Searchable | 5 | "check imei stolen phone", "kym 14422", "imei blacklist check india" |
| Evergreen | 4 | Services stable; UI may change |
| Can be explained in depth | 4 | Three methods, matching IMEIs, account locks, legal angle |
| Supports independent research | 5 | DoT FAQ, CEIR, Apple, Google, BNS, Telecom Act |
| Supports practical examples | 4 | Meet-up checklist, result interpretation table |
| Suits screenshots | 4 | CEIR KYM box and verification form |
| Stands without the videos | 5 | |
| Fits the site | 5 | |

**Verdict:** PROCEED. Angle: a meet-the-seller checklist built around the official IMEI check, adding what the IMEI check can't tell you (account locks, swapped parts, tampered IMEI) and why checking matters legally.

## 3. Duplicate check

No duplicate. Related published: budget smartphones buying guide, best time to buy electronics, phone battery degradation. Drafts #1/#2 are not published, so no links.

## 4. Search intent and keywords

- **Primary keyword:** check imei stolen phone india
- **Intent:** how-to
- **Secondary:** kym 14422, imei blacklist check india, ceir imei verification, second hand phone checklist, is my phone stolen check
- **Questions:** how to check if a phone is stolen; what KYM results mean; what if the IMEI doesn't match; is it illegal to buy a stolen phone unknowingly; iPhone Activation Lock; Google FRP

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | KYM: SMS "KYM <15-digit IMEI>" to 14422; web portal; Sanchar Saathi app | yes | VERIFIED | CEIR home "Know Genuineness" box; Sanchar Saathi FAQ | |
| 2 | Avoid buying if status is black-listed, duplicate or already in use | partly | VERIFIED | CEIR home box (screenshot 01) | |
| 3 | IMEI verification shows manufacturer, device type, brand and model | partly | VERIFIED | Sanchar Saathi FAQ | |
| 4 | Web verification needs a captcha and an OTP to any mobile number | yes | VERIFIED | CEIR IMEI verification page (screenshot 02); CyberSafe video | |
| 5 | Blacklisted result shows a red warning line | yes | UNVERIFIED | CyberSafe video | Attributed |
| 6 | Dual-SIM phones have two IMEIs; check both | yes | VERIFIED | Sanchar Saathi FAQ ("Dual SIM phones will have two IMEI numbers") | "check both" as advice |
| 7 | *#06# shows IMEI; also printed on box and invoice | yes | VERIFIED | CEIR home box | |
| 8 | Phones with all-zero or invalid IMEIs are not allowed on networks | no | VERIFIED | Sanchar Saathi FAQ | |
| 9 | GSMA allocates TAC; manufacturers assign IMEIs | no | VERIFIED | Sanchar Saathi FAQ | Background only |
| 10 | Tampering with IMEI (s.42(3)(c)) and wilfully possessing equipment knowing it uses tampered identifiers (s.42(3)(f)): up to 3 years, up to ₹50 lakh, or both | no | VERIFIED | Telecom Act s.42 text | |
| 11 | BNS s.317(2): dishonestly receiving or retaining stolen property, knowing or having reason to believe it's stolen: up to 3 years, fine, or both | no | VERIFIED | devgan.in BNS 317 | "Reason to believe" framing, no legal advice |
| 12 | Apple: don't buy if "iPhone Locked to Owner" / Activation Lock is on; ask the seller to remove it; "Hello" screen means erased | no | VERIFIED | support.apple.com/104999 | |
| 13 | Google FRP: after a reset, needs a previously synced Google Account; sellers should remove their account first | no | VERIFIED | support.google.com/android/answer/9459346 | |
| 14 | A district cyber cell told repair shops to check IMEIs before repair | yes | UNVERIFIED | Repair My Mobile video | District not named; attributed |
| 15 | SIM owners have received police notices for using their SIM in a stolen phone | yes | UNVERIFIED | Repair My Mobile video | Attributed as the technician's account; mechanism (CDR shows SIM/IMEI pairs) is plausible, not officially documented here |
| 16 | A block may be filed on only one of two IMEIs | yes | UNVERIFIED | CyberSafe video; also Technoside (topic #1) | Advice: check both |

## 6. Value the videos don't give

- A clear results table (what each status means and what to do).
- Matching the IMEI across *#06#, Settings, box and bill, and why a mismatch matters.
- What the IMEI check can't catch: Activation Lock / FRP, account lock, parts swaps; the Apple and Google official checks.
- Legal context in India (BNS 317, Telecom Act 42(3)(f)): why a documented check helps.
- A step-by-step meet-up checklist in order.

## 7. Screenshot plan

| # | What it shows | Page URL | Why | Captured? |
|---|---|---|---|---|
| 01 | Know Genuineness box (SMS 14422 + web portal) | https://www.ceir.gov.in/Home/index.jsp | The two ways to check, from the official page | yes |
| 02 | IMEI Verification form | https://www.ceir.gov.in/Device/CeirImeiVerification.jsp | What to expect: captcha + OTP before the IMEI field | yes |

## 8. Outline

1. Intro: the check takes a minute; do it before paying
2. Get the right IMEI (both), and make sure it matches
3. Three ways to check (SMS / web / app) with screenshots
4. Reading the result (table)
5. What the IMEI check doesn't tell you: account locks
6. The rest of the meet-up checklist (physical, battery, paperwork)
7. Why it matters legally
8. If the result is bad
9. FAQ
10. Closing
