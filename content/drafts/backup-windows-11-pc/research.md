# Research notes: How to back up a Windows 11 PC properly

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** Windows 11: Create Full Backup to External Hard Drive and Restore (2026) (Pureinfotech), https://www.youtube.com/watch?v=lWuEIP2HShU. ~11 months old. Legacy system image (deprecated but works) for temporary full backups (before upgrades/drive swaps); for ongoing file backups use File History, OneDrive or manual copies; Control Panel > Backup and Restore (Windows 7) > Create a system image; external HDD/SSD, not a flash drive; not on the same drive; image not encrypted; restore via Recovery > Advanced startup > Troubleshoot > System Image Recovery; BitLocker key needed.
- **Second:** Windows File History vs Windows Backup and Restore (OnlineComputerTips), https://www.youtube.com/watch?v=FJcPSUlxdlA. ~1 year old. File History: incremental, user folders, hourly default, external/network only, previous versions; Backup and Restore: system image + file level, schedules, internal/external/network.
- **Third:** How to make a Windows backup image 2026 (INFORMATRIX), https://www.youtube.com/watch?v=UjneIBp3TOg. 3 weeks old. Short system image demo.

## 2. Topic assessment

Useful 5 · Searchable 5 · Evergreen 4 · Depth 5 · Independent research 5 · Examples 4 · Screenshots 1 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED. Angle: "properly" = three layers (Windows Backup/OneDrive for settings & sync, File History on an external drive for versions, occasional system image), with what each misses, plus the September 2026 File History bug and how to check backups work.

## 3. Duplicate check

`library.mjs check "how to backup windows 11"`: 0.533 to clean-install draft (shared "windows 11"; different task). Internal links: https://techpulzo.in/google-drive-vs-onedrive-vs-icloud-which-cloud-storage-to-use, https://techpulzo.in/ssd-vs-hdd-for-a-budget-laptop-where-the-money-should-actually-go.

## 4. Search intent and keywords

- **Primary keyword:** how to backup windows 11
- **Intent:** how-to
- **Secondary:** windows backup app; file history windows 11; system image windows 11; backup to external hard drive; file history not working september 2026

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | Windows Backup: backs up certain folders, settings, credentials, apps to the cloud; needs personal Microsoft account; not for work/school accounts; restore on new device; system component | No | VERIFIED | Microsoft KB5032038 | |
| 2 | Free Microsoft storage 5 GB shared across OneDrive, Outlook attachments, M365 | No | VERIFIED | Microsoft storage FAQs | |
| 3 | Windows Backup limits: OneDrive-only, non-Store apps don't reinstall, clutter | No | OPINION (PCWorld) | PCWorld | |
| 4 | File History: Control Panel path; Documents, Pictures, Videos, Desktop (+ libraries); external drive or network; restore previous versions | Yes | VERIFIED | Microsoft Support | |
| 5 | Sept 2026 bug: KB5124008 (8 Sep) broke File History on 24H2/25H2 ("Reconnect your drive"); KB5129195 didn't fix; optional KB5124010 (23 Sep) for 25H2/24H2 and KB5124006 for 26H1 fix it; automatic in October Patch Tuesday | No | VERIFIED (secondary, two) | PCWorld; Windows Latest | |
| 6 | System image deprecated but works; external HDD/SSD; restore path; not encrypted | Yes (Pureinfotech) | VERIFIED (attributed) | | |
| 7 | 3-2-1 rule | No | General best practice | | |

## 6. Value the video doesn't give

- A layered plan with what each tool covers/misses (table).
- The September 2026 File History bug and how to confirm backups.
- Testing a restore.

## 7. Screenshot plan

None.

## 8. Outline

- Opening
- H2 What "properly" means (three copies)
- H2 The three Windows tools (table)
- H2 Layer 1: Windows Backup and OneDrive
- H2 Layer 2: File History to an external drive (+ Sept 2026 bug)
- H2 Layer 3: a full system image
- H2 Test your backup
- FAQ
