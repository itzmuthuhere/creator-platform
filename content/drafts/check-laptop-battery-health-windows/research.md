# Research notes: How to check laptop battery health on Windows

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** Windows 11 Battery Health Check | Read Battery Report (CrackTheWindows), https://www.youtube.com/watch?v=Q8Cu_-yXlEk. ~1 year old. `powercfg /batteryreport`; real HP report: design 51,310 mWh, full charge 41,514 mWh → ~81%; cycle count 217; ratings 300–500 cycles typical (some 800+); capacity history; battery life estimates (6 h 11 m at design vs ~5 h now); recent usage drain; thresholds (above 80% fine, below 60% replace); tips incl. 20–80%, heat, and "full calibration every 2–3 months" (CORRECTED: not needed for health).
- **Second:** How to Check Battery Health on Windows 11 (Quick Tutorials), https://www.youtube.com/watch?v=pRnsFlh8hNw. ~3 months old. Command Prompt, file saved in user folder; health = full/design ×100; readings fluctuate.
- **Third:** Check Your Laptop's Battery Health using CMD (Buzz2day Tech), https://www.youtube.com/watch?v=fFCBvfO0k5w. ~5 years old, Hindi. Same method.

## 2. Topic assessment

Useful 5 · Searchable 5 · Evergreen 5 · Depth 4 · Independent research 4 · Examples 5 · Screenshots 1 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED. Angle: generate and read the report section by section, calculate health, judge it (cycles, runtime), and what actually slows wear (heat, sitting at 100%; charge limits), with myths corrected.

## 3. Duplicate check

`library.mjs check "check laptop battery health windows"`: no similar. Internal links: https://techpulzo.in/why-your-phone-battery-degrades-over-time-the-real-chemistry, https://techpulzo.in/how-often-you-should-actually-clean-your-laptop-fans.

## 4. Search intent and keywords

- **Primary keyword:** check laptop battery health windows
- **Intent:** how-to
- **Secondary:** powercfg batteryreport; design capacity vs full charge capacity; battery cycle count laptop; when to replace laptop battery

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | `powercfg /batteryreport` generates HTML report in current path; `/output`; `/duration days`; `/energy` analyses battery-life problems (run idle, 60 s default) | Yes (partly) | VERIFIED | Microsoft Learn | |
| 2 | Example 51,310 → 41,514 mWh = 80.9%; 217 cycles; 6 h 11 m → ~5 h | Yes | VERIFIED (arithmetic on video's report) | | |
| 3 | Heat >30°C accelerates ageing; 100% charge at 25°C → ~80% capacity after a year (40°C → 65%); shallower discharges far more cycles; no memory, no periodic full discharge needed; store ~40% cool | No | VERIFIED | Battery University BU-808 | |
| 4 | Windows 11 battery percentage/colour icons via KB5077241 (wider rollout Feb 2026); Settings > System > Power & battery | No | VERIFIED (secondary) | XDA | |
| 5 | Thresholds 80%/60%; 300–500 cycles typical | Yes | OPINION (attributed rule of thumb) | | |
| 6 | Full calibration every 2–3 months | Yes (CrackTheWindows) | CORRECTED | BU-808 | Only helps gauge accuracy |
| 7 | Manufacturer charge-limit modes (Lenovo, Dell, HP, ASUS) | No | VERIFIED (general; hedged, no specifics) | | Lenovo/Dell pages blocked |

## 6. Value the video doesn't give

- Microsoft-documented options (/output, /duration, /energy).
- Battery University data on what actually ages batteries; myth correction.
- Clear "is it time to replace" decision.

## 7. Screenshot plan

None (report contains machine identifiers; the table reproduces the key fields).

## 8. Outline

- Opening
- H2 Generate the battery report
- H2 Read it: the four sections that matter
- H2 Work out your battery's health (example)
- H2 Is it time to replace?
- H2 What actually wears a battery out
- H2 Two myths
- FAQ
