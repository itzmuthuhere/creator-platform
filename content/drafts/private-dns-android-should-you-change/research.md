# Research notes: Private DNS on Android: what it does and whether to change it

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** What is Private DNS (Techno Hindustani), https://www.youtube.com/watch?v=E7fWMl4GSN8. ~4 years old, Hindi. What DNS is; Private DNS encrypts lookups; how to set a hostname.
- **Second:** How to Block Ads on Android & Chrome (Updated Private DNS 2026) (Mate Gamer), https://www.youtube.com/watch?v=iMsPvgzz0kY. ~3 months old. AdGuard hostname; blocks web banner ads in Chrome; doesn't block YouTube ads; Chrome's own "Use secure DNS" setting.
- **Third:** Top 5 DNS settings (Only Faishal Tech), https://www.youtube.com/watch?v=jIZ9usNQrhs. ~1 year old, Hindi. List of DNS providers.

## 2. Topic assessment

Useful 4 · Searchable 4 · Evergreen 5 · Depth 4 · Independent research 5 · Examples 4 · Screenshots 1 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED. Angle: decision guide: what Private DNS actually protects (and doesn't), the three modes, when to switch to a named provider (filtering: malware/family/ads), trade-offs (trusting the provider, broken links, captive portals), with exact hostnames from official docs.

## 3. Duplicate check

`library.mjs check "private dns android"`: no similar. Internal links: https://techpulzo.in/what-a-vpn-actually-protects-you-from-and-what-it-does-not, https://techpulzo.in/how-to-set-up-parental-controls-without-making-a-teenager-furious, https://techpulzo.in/how-to-turn-off-ads-in-free-android-apps-what-is-legal-and-what-is-not.

## 4. Search intent and keywords

- **Primary keyword:** private dns android
- **Intent:** decision
- **Secondary:** best private dns for android; adguard dns android; cloudflare family dns; dns.google; private dns block ads

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | Modes Off / Automatic / provider hostname; Settings > Network & internet > Private DNS; protects only DNS questions and answers; default uses Private DNS where available | Partly | VERIFIED | Android Help | |
| 2 | Android 9+; DoT; Cloudflare hostnames one.one.one.one, security.cloudflare-dns.com, family.cloudflare-dns.com | Partly | VERIFIED | Cloudflare docs | |
| 3 | Google: dns.google; strict vs opportunistic privacy; port 853; strict fails closed | No | VERIFIED | Google Public DNS docs | Map Automatic≈opportunistic, hostname≈strict (general) |
| 4 | AdGuard: dns.adguard-dns.com (ads, tracking, phishing), family.adguard-dns.com, unfiltered.adguard-dns.com | Yes (Mate Gamer) | VERIFIED | AdGuard KB | Use hostname without tls:// on Android |
| 6 | Limits beyond DNS (ISP sees connections; captive portals; work networks) | No | VERIFIED (general networking; hedged) | | |
| 7 | Own benchmark: ISP resolver median ~5 ms (popular sites, run 1 4.8 ms), Cloudflare ~8 ms, Google ~30 ms, Quad9 >300 ms | No | VERIFIED (first-hand data) | data/research/dns-run1.json, dns-run2.json | Plain UDP DNS, not DoT; ISP name withheld |
| 5 | DNS ad-blocking doesn't block YouTube ads | Yes (Mate Gamer) | OPINION/attributed | | Consistent with how DNS filtering works |

## 6. Value the video doesn't give

- What it protects vs not (sites still see you; ISP still sees IP/SNI) — kept to official wording + VPN link.
- Decision table by need.
- Exact official hostnames; trade-offs and how to undo.

## 7. Screenshot plan

None.

## 8. Outline

- Opening
- H2 What DNS and Private DNS are
- H2 The three settings
- H2 What it does and doesn't protect
- H2 Should you change it? (table)
- H2 How to set a provider
- H2 Problems and how to undo
- FAQ
