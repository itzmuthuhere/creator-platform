# Research notes: How to block a lost or stolen phone with Sanchar Saathi (CEIR)

Internal working file. Not published.

## 1. Source videos (in my own words)

Four Hindi videos (auto-generated captions, so names and numbers were treated as unreliable until checked):

- **Technoside, "Phone stolen? Do THIS Immediately!"** (15:24): https://www.youtube.com/watch?v=3P0pUVPIBBE. The creator documents two months after his father's phone was stolen: locate/lock/erase with Google's tool, block the SIM (Jio/Vi online, Airtel only at a store), the police treating it as "lost" rather than theft and issuing a diary-entry number instead of an FIR, then blocking on CEIR. Afterwards IMEI 1 showed blocked but IMEI 2 showed active; he couldn't explain why.
- **UPCOP Shashank, "CEIR Portal से मोबाइल कैसे खोजें"** (10:40): https://www.youtube.com/watch?v=765e2cYCQEY. A police-oriented explanation: IMEI as the phone's "Aadhaar", blacklist shared with all operators, a new SIM in a blocked phone reveals it to the operator and then police; a walkthrough of the form fields.
- **infosuch, "CEIR Portal Par Complaint Kaise Kare"** (6:38): https://www.youtube.com/watch?v=nnymQpSBybk. The four things to have ready, the form section by section, advice to use the same (re-issued) number, a mention of the CEIR dashboard to counter "the portal is useless", and the traceable SMS and police handover.
- **infosuch, "CEIR Mobile Unblock Kaise Kare"** (4:50): https://www.youtube.com/watch?v=TFv2tE_2gik. The unblock flow (forgot request ID, reasons "recovered by police / found by itself / blocked by mistake"), advice never to unblock before holding the phone, 24–48 h to take effect, escalate via PG portal if stuck.

Useful material: the real sequence of screens; where people get stuck (police reluctant to register theft, OTP needs the duplicate SIM, IMEI unknown, dual-IMEI status confusion, premature unblocking); the unblock reasons list.

## 2. Topic assessment

| Criterion | Score 1–5 | Note |
|---|---|---|
| Useful to ordinary readers | 5 | Phone theft is common; the process is unfamiliar under stress |
| Searchable | 5 | "block lost phone ceir", "sanchar saathi block phone", "ceir portal" |
| Evergreen / long-lasting | 4 | Portal UI may change; the process has been stable since 2023 |
| Can be explained in depth | 4 | Mechanism (EIR/CEIR), order of steps, recovery data |
| Supports independent research | 5 | Official portal, FAQ, live statistics, Android/Apple docs, the Telecom Act |
| Supports practical examples | 4 | Worked timeline, state data table |
| Suits screenshots | 5 | Public portal pages, no login needed |
| Stands without the videos | 5 | Yes |
| Fits the site | 5 | Everyday tech, India-specific |

**Verdict:** PROCEED. Videos cover the form; none explain what blocking does and doesn't do, the order of steps with reasons, what the official recovery numbers say, or the unblock traps together.

**Chosen angle:** the complete "first hour to recovery" sequence for India, with CEIR as the centrepiece, plus what the official statistics say about your realistic odds.

## 3. Duplicate check

`library.mjs check "block lost phone ceir"`: no published article on this. Related: the UPI fraud article (money step), the 2FA article (account step). Queue siblings #2 (SIMs in your name) and #3 (IMEI check before buying) are separate intents; link to them once drafted.

## 4. Search intent and keywords

- **Primary keyword:** block lost phone ceir
- **Search intent:** how-to (urgent), secondary informational ("does it work?")
- **Target reader:** someone in India whose phone was lost or stolen in the last day or so, or who wants to be ready
- **Secondary keywords:** sanchar saathi block mobile, ceir portal, how to block stolen phone imei india, unblock phone ceir, ceir request status, find imei without phone
- **Questions people ask:** do I need an FIR; how to find IMEI without the phone; how long blocking takes; can police track a blocked phone; how to unblock after recovery; does it work on iPhone
- **What the current top results miss:** order of steps and why; that the IMEI field is optional on the form; the traced-vs-recovered distinction in the official numbers; the state-by-state gap; the "don't unblock before possession" trap

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | Portal has four services: block, unblock found, check status, forgot request ID | yes | VERIFIED | ceir.gov.in home (screenshot 01) | |
| 2 | Prerequisites: police report/FIR copy, re-issued SIM, ID proof, invoice optional, IMEI "if available" | partly | CORRECTED | Block form prerequisites pop-up (screenshot 02) | Videos imply IMEI is required; the form marks it "if available" and IMEI 1 has no asterisk |
| 3 | SMS on a re-issued SIM works only 24 h after activation (TRAI) | no | VERIFIED | CEIR FAQ on ceir.gov.in home | |
| 4 | Blocked within 24 hours of a successful request; blocked phone can't be used on any network in India; police can still track | yes | VERIFIED | CEIR FAQ | |
| 5 | CEIR shares blacklists across all operators' EIRs, so changing SIM doesn't help | yes | VERIFIED | CEIR FAQ ("What is CEIR?", "What is an EIR?") | |
| 6 | An IMEI is assigned to each SIM slot; dual-SIM phones have two | yes | VERIFIED | CEIR FAQ ("What is CEIR?") | |
| 7 | After blocking, only IMEI 1 may show as blocked while IMEI 2 shows active | yes (one creator) | UNVERIFIED | Technoside video only | Stated as one user's report; article tells readers to enter both and verify both |
| 8 | Unblock only after the phone is found and in your possession; report to local police it is found | yes | VERIFIED | CEIR FAQ | |
| 9 | Police-registered blocks must be unblocked through state police | no | VERIFIED | CEIR FAQ | |
| 10 | "Request already exist … by State police" message meaning | no | VERIFIED | CEIR FAQ | |
| 11 | Unblock reasons: recovered by police / found by itself / blocked by mistake / other | yes | UNVERIFIED | infosuch unblock video | Described as what the creator's walkthrough shows; not independently screenshotted |
| 12 | Unblocking takes 24–48 h | yes | UNVERIFIED | infosuch video only | Attributed; not stated as official |
| 13 | Dashboard as of 24-09-2026: 60,66,759 blocked, 37,67,180 traced, 13,93,213 recovered, 36.98% | partly | VERIFIED | ceir.gov.in dashboard + state table | 36.98% = recovered ÷ traced (computed and matches) |
| 14 | State recovery rates (AP 35.7%, UP 30.1%, KA 28.0%, TN 27.6%, TG 26.3%, MH 24.0%, WB 16.5%, Delhi 5.1% of blocked) | no | VERIFIED | Computed from the official state table | Interpretation (police follow-up) labeled as inference |
| 15 | Sanchar Saathi portal launched 16 May 2023; app January 2025 | no | VERIFIED | Search summary of PIB release (PIB page 403 to fetch), Wikipedia | Cite Wikipedia + ddnews |
| 16 | Google's tool is now called Find Hub; can ring, mark as lost (lock), factory reset; after a reset the device is no longer in Find Hub | no | VERIFIED | support.google.com/android/answer/6160491 | Videos say "Find My Device" (older name) |
| 17 | Android Theft Protection: Theft Detection Lock, Offline Device Lock, Remote Lock (android.com/lock), Identity Check; paths | no | VERIFIED | support.google.com/android/answer/15146908 | |
| 18 | iPhone: IMEI in Settings > General > About; without the device, from the Apple Account device list or the box | no | VERIFIED | support.apple.com/en-us/108037 | |
| 19 | iPhone Mark As Lost locks device, shows message, suspends Apple Pay cards | no | VERIFIED | Apple Find My (Mac guide) | |
| 20 | *#06# shows IMEI | yes | VERIFIED | CEIR home "Know Genuineness" box text | |
| 21 | Tampering with IMEI: up to 3 years' jail, ₹50 lakh fine, or both (Telecommunications Act 2023, s.42) | no | VERIFIED | Business Standard report on DoT advisory; Act text summaries | |
| 22 | Airtel lost SIM: 198/121 from another Airtel number, 9849098490 / 1800 103 4444, store, Thanks app chat | no | VERIFIED | airtel.in blog | Jio: Lost SIM option on jio.com / MyJio (secondary sources) |
| 23 | Delhi Police: Lost Report app gives a digitally signed lost report (not an FIR); theft goes through e-FIR (property theft portal) | partly | VERIFIED | lostfound.delhipolice.gov.in FAQ, propertytheft.delhipolice.gov.in | |
| 24 | Police often record a "lost" entry rather than theft FIR | yes (creator's experience) | OPINION | Technoside video | Attributed as the creator's experience |
| 25 | IMEI is optional on the form, presumably because operators can link the number to the handset | no | UNVERIFIED | Inference | Stated as a likely reason, clearly hedged |
| 26 | Blocking an IMEI stops cellular service, not Wi-Fi | no | VERIFIED | CEIR FAQ: EIR blocks service "based on the IMEI transmitted by the device to the mobile network" | Wi-Fi doesn't involve the EIR |

## 6. Value the videos don't give

- Official prerequisites show IMEI is "if available" (correction).
- The 24-hour SMS delay on re-issued SIMs explains OTP failures.
- The traced-vs-recovered distinction, national and state-by-state, with the inference that recovery depends on local follow-up.
- The Find Hub rename and the erase trade-off (erasing removes it from Find Hub).
- Android Theft Protection and iPhone Stolen Device / Mark As Lost setup, for prevention.
- Where to find IMEI without the phone (Apple Account device list, box, invoice).
- Legal context: IMEI tampering penalties.
- The state-police-block message and unblock route.

## 7. Screenshot plan

| # | What it shows | Page URL | Why a reader needs it | Captured? |
|---|---|---|---|---|
| 01 | CEIR home service buttons + dashboard | https://www.ceir.gov.in/Home/index.jsp | Recognise the right site and the four services | yes (cropped from full page) |
| 02 | Block form prerequisites pop-up | https://www.ceir.gov.in/Request/CeirUserBlockRequestDirect.jsp | Official checklist, shows IMEI "if available" | yes |
| 03 | Lost Information section of the form | same | The section people most often fill inconsistently with the police report | yes |
| — | Device information section | same | Would show IMEI fields | skipped: covered by the pop-up's overlay in the full-page capture; text description used instead |

## 8. Outline

1. Intro: the order matters; what CEIR does in one paragraph
2. The first hour, in order (why each step comes where it does)
3. What blocking the IMEI does, and what it doesn't
4. What you need before opening the form (table; finding IMEI without the phone; police report options)
5. Filling in the block request, section by section (screenshots)
6. After you submit (24 h, request ID, verify both IMEIs, state-police message)
7. Will you get the phone back? What the official numbers say (table + inference)
8. If the phone turns up: unblocking without mistakes
9. Mistakes that cost people time
10. Set this up today (prevention)
11. FAQ
12. Closing: write down your IMEI
