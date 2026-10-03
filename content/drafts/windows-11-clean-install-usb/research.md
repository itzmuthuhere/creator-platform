# Research notes: How to clean install Windows 11 from a USB drive

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** Windows 11 Clean Install from USB – ENTIRE PROCESS (Updated) (Pureinfotech), https://www.youtube.com/watch?v=JGSeN0cZqno. ~1 month old. Back up first; Media Creation Tool, 8 GB USB (wiped); boot menu/BIOS key per manufacturer (check support site/user guide); setup: language, Install Windows 11, "I don't have a product key" if previously activated (auto-activates online); pick the right edition; delete partitions on the target drive only; OOBE: region, keyboard, device name, new option to set user folder name, Microsoft account, PIN, privacy settings, "set up as new PC", skip promos.
- **Second:** How to Clean Install Windows 11 From USB (Tech Made Visual), https://www.youtube.com/watch?v=2NoKtdrHSb4. ~1 month old. Same flow.
- **Third:** Install Windows 11 from USB (Rufus) (Istoryahe TV Vlogs), https://www.youtube.com/watch?v=uNlQDUw2yYI. ~2 months old. Rufus alternative with ISO.

## 2. Topic assessment

Useful 5 · Searchable 5 · Evergreen 4 · Depth 4 · Independent research 4 · Examples 3 · Screenshots 1 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED. Angle: a complete, careful walkthrough with the decisions that cause trouble (backup, edition, which partitions to delete, activation, drivers), plus "do you need a clean install?" and post-install checklist.

## 3. Duplicate check

`library.mjs check "windows 11 clean install"`: related only (battery draft 0.361). Internal links: https://techpulzo.in/how-much-ram-you-actually-need-in-a-laptop-in-2026, https://techpulzo.in/ssd-vs-hdd-for-a-budget-laptop-where-the-money-should-actually-go, https://techpulzo.in/how-to-set-up-a-password-manager-in-15-minutes.

## 4. Search intent and keywords

- **Primary keyword:** windows 11 clean install
- **Intent:** how-to
- **Secondary:** windows 11 bootable usb; media creation tool; windows 11 26h2 download; windows 11 requirements tpm; activate windows after reinstall

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | Download page options: Installation Assistant; Media Creation Tool (USB ≥8 GB or DVD, x64); ISO; requires licence or eligible Windows 10 device, internet, 64-bit CPU; not recommended on unsupported PCs; current release Windows 11 2026 Update (26H2) | Partly | VERIFIED | Microsoft download page (3 Oct 2026) | |
| 2 | Requirements: 1 GHz 2+ cores (approved list), 4 GB RAM, 64 GB storage, UEFI Secure Boot capable, TPM 2.0, DX12/WDDM 2.0, 720p >9", internet + Microsoft account for Home setup | No | VERIFIED | Microsoft Support | |
| 3 | Delete partitions only on target drive; auto-activation for previously licensed PCs; post-install Windows Update, drivers, restore | Yes | VERIFIED | Pureinfotech guide + video | |
| 4 | New OOBE option to set user folder name (rolling out) | Yes | OPINION (attributed; rolling out) | | |
| 6 | Reset this PC path; BitLocker key in Microsoft account; RST/VMD storage driver for 'no drives'; fTPM/PTT | No | VERIFIED (standard Windows knowledge; hedged) | | |
| 5 | Wrong edition won't activate | Yes | VERIFIED (consistent; attributed) | | |

## 6. Value the video doesn't give

- Decision: reset vs clean install.
- Pre-flight checklist (BitLocker key, licence, drivers for storage/Wi-Fi).
- Troubleshooting (no drives shown, USB not booting, no internet in OOBE).

## 7. Screenshot plan

None: setup screens are generic; not capturable via the tool.

## 8. Outline

- Opening
- H2 Do you need a clean install? (vs Reset this PC)
- H2 Before you start (checklist)
- H2 Step 1: make the USB
- H2 Step 2: boot from it
- H2 Step 3: install
- H2 Step 4: setup (OOBE)
- H2 After installing
- H2 Troubleshooting
- FAQ
