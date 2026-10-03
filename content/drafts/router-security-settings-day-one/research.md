# Research notes: Router security settings to change on day one

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** 8 Steps to Securing Your Router (Ask Leo!), https://www.youtube.com/watch?v=HLoWEsFAEzA. ~3 months old. Change admin password; disable remote management; turn off UPnP; WPA2/WPA3 (not WEP/WPA); disable WPS; turn off logging (privacy); physical security; firmware updates; MAC filtering and hiding SSID don't help (false sense of security).
- **Second:** 5 Router Settings You Should Change Now! (ThioJoe), https://www.youtube.com/watch?v=mJnIgjyjEtc. ~4 years old. How to reach the admin page (common gateway addresses, sticker); default logins; other settings. Sponsor segment ignored.
- **Third:** How to Stop Hackers from Entering Through Your Router (Shannon Morse), https://www.youtube.com/watch?v=rKsXrbu3z_w. ~11 months old. Router hardening overview.

## 2. Topic assessment

Useful 5 · Searchable 4 · Evergreen 5 · Depth 4 · Independent research 5 · Examples 3 · Screenshots 1 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED. Angle: a 15-minute day-one checklist ranked by impact, grounded in CISA/NSA guidance, with Indian ISP-router realities (some settings locked; use the ISP app), and the "don't bother" myths.

## 3. Duplicate check

`library.mjs check "router security settings"`: no similar. Internal links: https://techpulzo.in/how-to-set-up-a-home-wi-fi-guest-network-and-why-you-should, https://techpulzo.in/how-to-set-up-a-password-manager-in-15-minutes, https://techpulzo.in/why-your-wifi-feels-slow-in-certain-rooms-router-placement.

## 4. Search intent and keywords

- **Primary keyword:** router security settings
- **Intent:** how-to
- **Secondary:** change router admin password; disable wps; disable upnp; wpa3 vs wpa2; router firmware update

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | Change default credentials (available online); WPA3 Personal AES strongest; update firmware; disable remote management, WPS (PIN brute force), UPnP (malware bypassing firewall); monitor devices; firewall | Yes | VERIFIED | CISA "Home Network Security" | |
| 2 | NSA (Feb 2023): router is gateway; enable auto firmware updates; replace end-of-life routers; weekly reboots; prefer own router over ISP-provided | No | VERIFIED (secondary) | BleepingComputer | |
| 3 | ASUS: separate strong passwords; WPA2-AES/WPA3; auto firmware; disable UPnP if unused; keep WAN/remote access off; disable Telnet/SSH; avoid DMZ; DNS rebind protection; MAC filtering suggested | No | VERIFIED | ASUS FAQ | MAC filtering conflicts with Ask Leo → present nuance |
| 4 | MAC filtering and hidden SSID give false security | Yes (Ask Leo) | OPINION (attributed; widely held) | | |
| 5 | Common admin addresses / sticker | Yes (ThioJoe) | VERIFIED (general) | | Not listing specific ISP IPs |

## 6. Value the video doesn't give

- Ranked checklist with "why" from CISA/NSA.
- ISP-router reality in India.
- Myths section reconciling vendor vs expert advice.

## 7. Screenshot plan

None: admin pages vary by model.

## 8. Outline

- Opening
- H2 Getting into your router
- H2 The day-one checklist (ranked)
- H2 Worth doing next
- H2 Two settings that don't help much
- H2 If your ISP supplied the router
- FAQ
