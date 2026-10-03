# Research notes: Android storage full: freeing space without deleting photos

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** How to Clear Android Storage (Without Deleting Photos) (Device Guardian), https://www.youtube.com/watch?v=1PokGP-1yyY. ~1 month old, English. Sort apps by size and clear cache (not data) for the biggest; Files app > analyse storage > large files, then empty the 30-day trash; Chrome site settings > data stored > clear; Samsung auto-optimisation. Claims about "tracking cache" exaggerated.
- **Second:** How to Clean Internal Storage in Android Phone 2026 (RaRe iTech), https://www.youtube.com/watch?v=6MjUJCLE3o0. ~11 months old, English. Claims deleting the Play Store "Not installed" library frees ~5 GB: CORRECTED (that list is your account's app history in the cloud, not phone storage). Clears Chrome *data* (logs you out; contradicts primary's advice).
- **Third:** Storage Full Problem | 3 Settings (Tippu Tech), https://www.youtube.com/watch?v=zVNwer3Cvhc. Tamil; captions almost empty. Settings-only fixes; not used for specifics.

## 2. Topic assessment

Useful 5 · Searchable 5 · Evergreen 5 · Depth 4 · Independent research 4 · Examples 3 · Screenshots 1 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED. Angle: free space safely without losing photos: back them up and let Google Photos remove device copies, archive unused apps, clear caches the right way, clean WhatsApp media and downloads; and what not to do (clear data, delete hidden folders, "cleaner" apps). Distinct from #37 (cloud storage).

## 3. Duplicate check

`library.mjs check "android storage full"`: 0.583 to the Google storage draft (cloud, different problem). Internal links: https://techpulzo.in/google-drive-vs-onedrive-vs-icloud-which-cloud-storage-to-use, https://techpulzo.in/top-5-budget-smartphones-of-2026-full-buying-guide.

## 4. Search intent and keywords

- **Primary keyword:** android storage full
- **Intent:** troubleshooting
- **Secondary:** free up space android; clear cache android; google photos free up space; archive apps android; whatsapp storage full

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | Settings > Storage > Free up space; Smart Storage auto-clears backed-up photos; clear cache = temporary data; clear storage/data permanent; uninstall; auto-archive in Play; delete downloads in media apps; copy to computer | Partly | VERIFIED | Android Help | |
| 2 | Google Photos Free up space removes device copies of backed-up items; items <30 days may stay; still visible in Photos app/web; not in built-in gallery offline | No | VERIFIED | Google Photos Help | |
| 3 | Auto-archive: up to ~60% of app size, keeps data, cloud icon, reinstall on tap; toggle Play Store > Settings > General | No | VERIFIED | Android Developers Blog (Apr 2023); Android Police (Sep 2023) | |
| 4 | Clear cache not data | Yes (Device Guardian) | VERIFIED (consistent with Android Help definitions) | | |
| 5 | Deleting Play "Not installed" list frees phone storage | Yes (RaRe iTech) | CORRECTED | It's a library list, not device storage | General knowledge |
| 6 | Files trash keeps deleted files 30 days | Yes (Device Guardian) | OPINION (device-specific; attributed) | | |
| 8 | WhatsApp Manage storage 'Larger than 5 MB' view | No | VERIFIED (app feature, general knowledge) | | |
| 7 | Archiving 10 apps × 300 MB ≈ 1.8 GB | No | VERIFIED (illustrative arithmetic) | | |

## 6. Value the video doesn't give

- Safe order of steps from official docs; what's permanent vs reversible.
- Photos: let Photos remove device copies only after backup is confirmed.
- Corrections of two common bad tips.

## 7. Screenshot plan

None: settings vary by brand.

## 8. Outline

- Opening
- H2 See what's using the space
- H2 1. Photos and videos (keep them, free the phone)
- H2 2. Archive apps you rarely use
- H2 3. Clear caches the right way
- H2 4. WhatsApp and other media apps
- H2 5. Downloads, large files and the bin
- H2 What not to do
- FAQ
