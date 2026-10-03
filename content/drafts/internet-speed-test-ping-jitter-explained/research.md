# Research notes: How to read an internet speed test: ping, jitter, upload

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** What Your Speed Test Really Means (Vibrant Broadband), https://www.youtube.com/watch?v=l-j5jJy81js. ~3 months old (US ISP show). Test wired first; pause other devices; test on newer devices; several times; phone vs computer vs Wi-Fi tests different things; in-home traffic affects streaming.
- **Second:** Every Type of Latency Factor in 7 Minutes (Your internet speed expert), https://www.youtube.com/watch?v=HbhzrmdPz2s. ~8 months old. Ping = round trip; distance/physics (fibre ~200,000 km/s); typical latency by connection type; congestion; jitter = variation; bufferbloat.
- **Third:** Internet Bandwidth (speed) Explained (PowerCert), https://www.youtube.com/watch?v=DHa9gxRfAmM. ~2 years old. Bandwidth vs speed; bits vs bytes.

## 2. Topic assessment

Useful 5 · Searchable 4 · Evergreen 5 · Depth 4 · Independent research 4 · Examples 5 · Screenshots 1 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED. Angle: read each number, why loaded latency matters more than headline Mbps for calls/gaming, how to test properly, and India-specific: TRAI MySpeed for evidence when complaining.

## 3. Duplicate check

`library.mjs check "internet speed test ping jitter"`: no similar. Internal links: https://techpulzo.in/why-video-calls-lag-even-with-fast-internet, https://techpulzo.in/why-your-wifi-feels-slow-in-certain-rooms-router-placement.

## 4. Search intent and keywords

- **Primary keyword:** internet speed test ping jitter
- **Intent:** informational
- **Secondary:** what is a good ping; what is jitter; mbps vs MBps; loaded latency; bufferbloat test

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | Cloudflare test measures throughput at different sizes, idle and loaded latency, jitter, packet loss; quality scores for streaming/gaming/video calls; modern use more sensitive to latency/jitter/loss than bandwidth | No | VERIFIED | Cloudflare blog | |
| 2 | Bufferbloat: oversized buffers cause latency spikes; VoIP/video stutter; fix with AQM (fq_codel, CAKE) | Yes (partly) | VERIFIED | bufferbloat.net | |
| 3 | TRAI MySpeed web/app for speed and video/browsing tests | No | VERIFIED | myspeed.trai.gov.in | |
| 4 | Ping ranges / feel (20 ms instant, 100 slight lag, 200+ frustrating) | Yes | OPINION (attributed rule of thumb) | | |
| 5 | 100 Mbps = 12.5 MB/s; 2 GB in ~2.7 min at 100 Mbps, ~6.8 min at 40 Mbps | No | VERIFIED (arithmetic) | | |
| 6 | Testing practice: wired first, pause devices, repeat | Yes (Vibrant) | VERIFIED (general, attributed) | | |

## 6. Value the video doesn't give

- A results-decoder table with what "good" looks like for each use.
- Worked comparison showing a slower plan beating a faster one for calls.
- India: TRAI MySpeed as evidence.

## 7. Screenshot plan

None.

## 8. Outline

- Opening
- H2 The five numbers (table)
- H2 Mbps vs MB/s
- H2 Idle vs loaded latency (worked comparison)
- H2 What's good enough for what
- H2 How to test properly
- H2 Fixes by symptom
- FAQ
