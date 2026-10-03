# Research notes: Google storage full: what is using your 15 GB and how to free it

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** Gmail Storage Full? 1 क्लिक में 15GB खाली करें (Bijay Tech Skills), https://www.youtube.com/watch?v=_lUlMBUp-f4. ~7 months old, Hindi. Open one.google.com/storage/management; see % used; "Clean up suggested items" (large photos/videos, large email attachments, trash, spam); two Gmail search operators for large/old mail. Clickbait framing ("15 GB never fills") not used.
- **Second:** Google Storage Full? 15GB से 500GB कैसे बढ़ाएं (Dynamic Techno), https://www.youtube.com/watch?v=A_B57DDyQDw. ~1 month old, Hindi. Buying more storage / plans.
- **Third:** Google Photos Storage Full Problem Solved (Tippu Tech), https://www.youtube.com/watch?v=TmXTBgBnl6g. ~1 year old, Tamil. Photos and Gmail cleanup.

## 2. Topic assessment

Useful 5 · Searchable 5 · Evergreen 4 · Depth 4 · Independent research 4 · Examples 4 · Screenshots 1 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED. Angle: find what's actually using the space (including hidden users: Android device backups, WhatsApp backups, Gmail spam/trash, Docs since 2021), clean up in order of payoff, decide when paying makes sense (₹/GB), and what happens if you ignore it.

## 3. Duplicate check

`library.mjs check "google storage full"`: 0.5 to WhatsApp draft (shared words), related 0.458 to the published Drive vs OneDrive vs iCloud post (different intent: choosing a service). Internal links: https://techpulzo.in/google-drive-vs-onedrive-vs-icloud-which-cloud-storage-to-use, https://techpulzo.in/how-two-factor-authentication-actually-stops-account-hacks.

## 4. Search intent and keywords

- **Primary keyword:** google storage full
- **Intent:** troubleshooting
- **Secondary:** gmail storage full; google photos storage full; free up google storage; google one plans india; what counts toward google storage

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | 15 GB shared across Gmail, Drive, Photos; counts: original + Storage saver/Express photos after 1 Jun 2021, Gmail incl. spam/trash, Drive files, Meet recordings, Docs etc. edited after 1 Jun 2021, WhatsApp Android backups, Android device backups; doesn't count: Storage saver before Jun 2021, Shared with me, older Docs | Partly | VERIFIED | Google One Help "How your Google storage works" | |
| 2 | Over limit: can't send/receive Gmail (bounces), can't upload to Drive, can't back up Photos; over 2 years → content may be deleted | Partly | VERIFIED | Google One Help "Manage your storage" | |
| 3 | Cleanup: empty trash/spam; Gmail `has:attachment larger:10M`; Drive storage view by size; delete old device backups at one.google.com/storage/management; exclude WhatsApp videos | Yes (partly) | VERIFIED | Google One Help | |
| 4 | Regular India prices: Lite 30 GB ₹708/yr, Basic 100 GB ₹1,560/yr, Premium 2 TB ₹7,800/yr | Partly (Dynamic Techno) | VERIFIED (secondary) | Digit (Dec 2025 promo article listing regular prices) | May change |
| 5 | Fill-rate and ₹/GB | No | VERIFIED (illustrative) | scripts/research/google-storage-math.py | Assumed file sizes |

## 6. Value the video doesn't give

- The full official list of what counts (hidden items) and what happens if you ignore it.
- Priority-ordered cleanup with search operators.
- When paying is cheaper per GB, with India prices.

## 7. Screenshot plan

None: storage manager shows personal account data.

## 8. Outline

- Opening
- H2 What happens when it's full
- H2 Find what's using it
- H2 What counts (table)
- H2 Clean up in this order
- H2 Stop it filling again
- H2 When paying makes sense
- FAQ
