# How to check laptop battery health on Windows 10 and 11

Windows doesn't show a battery health percentage in Settings, but it keeps a detailed record you can open in under a minute. One command creates a report showing how much charge your battery can hold today compared with when it was new, how many charge cycles it has done, and how long it should last on a charge. From those numbers you can tell whether the battery is fine, ageing normally, or due for replacement.

This guide shows how to check laptop battery health on Windows, how to read the report, how to judge the result, and what actually makes a battery wear out faster.

## Generate the battery report

1. Click Start, type **cmd**, and open **Command Prompt** (or open Terminal).
2. Type this and press Enter:

   `powercfg /batteryreport`

3. Windows replies that the report was saved, and shows the path, usually your user folder (for example `C:\Users\YourName\battery-report.html`).
4. Open that file in your browser.

To save it somewhere easier to find, add an output path, for example `powercfg /batteryreport /output "C:\battery-report.html"`. [Microsoft's powercfg documentation](https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/powercfg-command-line-options) also lists a `/duration` option to set how many days of history to include.

## Read it: the four sections that matter

| Section | What to look at |
|---|---|
| **Installed batteries** | **Design capacity** (what it held when new), **Full charge capacity** (what it holds now), and **Cycle count** |
| **Battery capacity history** | How full charge capacity has changed over weeks and months |
| **Battery life estimates** | How long a full charge lasted at design capacity versus now |
| **Recent usage / Battery usage** | When and how fast the battery drained in recent sessions |

Capacity is shown in milliwatt-hours (mWh). Quick Tutorials' [walkthrough](https://www.youtube.com/watch?v=pRnsFlh8hNw) points out that the numbers fluctuate a little from day to day, so look at the trend rather than one reading.

## Work out your battery's health

**Health % = full charge capacity ÷ design capacity × 100**

Here's a real example from CrackTheWindows' [video](https://www.youtube.com/watch?v=Q8Cu_-yXlEk), using its HP laptop's report:

| Field | Value |
|---|---|
| Design capacity | 51,310 mWh |
| Full charge capacity | 41,514 mWh |
| Health | 41,514 ÷ 51,310 × 100 ≈ **81%** |
| Cycle count | 217 |
| Battery life at design capacity | 6 h 11 min |
| Battery life now | about 5 h |

So this battery has lost about a fifth of its capacity and roughly an hour of runtime after 217 cycles, which is normal ageing for a laptop used daily.

A **cycle** is 100% worth of discharge, which can be spread over several days: using 50% today and 50% tomorrow counts as one cycle.

## Is it time to replace?

Use the health percentage and how the laptop fits your day, not one number alone:

| Health | What it usually means |
|---|---|
| Above 80% | Healthy; normal wear |
| 60–80% | Noticeably shorter runtime; replace when it no longer gets you through your day |
| Below 60% | Plan a replacement, especially if the laptop shuts down suddenly at a reported 10–20% |

*Rule-of-thumb thresholds, as used in the CrackTheWindows video.*

Replace sooner, whatever the percentage, if the battery **swells** (the touchpad lifts, the case bulges or the lid won't close flat), or the laptop runs only on the charger. A swollen battery is a safety issue; stop using it and get it replaced.

<!-- AUTHOR: If you've checked your own laptop, one line with its health and cycle count would make this concrete. -->

## What actually wears a battery out

Laptop batteries are lithium-ion, and [Battery University's guide](https://batteryuniversity.com/article/bu-808-how-to-prolong-lithium-based-batteries) to prolonging them is clear about what does the damage:

- **Heat.** Above about 30°C counts as elevated temperature and speeds up wear. Don't game or work with the laptop on a bed or cushion that blocks its vents, and keep the fans clean; our guide to [cleaning laptop fans](https://techpulzo.in/how-often-you-should-actually-clean-your-laptop-fans) explains how often.
- **Sitting at 100%.** Battery University's figures show a battery kept fully charged at 25°C dropping to about 80% capacity in a year, and to about 65% at 40°C. Keeping it partly charged is gentler.
- **Deep discharges.** Shallow top-ups give far more cycles than draining to zero each time.

The practical fix for a laptop that's plugged in most of the day: turn on your manufacturer's **charge limit** or battery-care mode, found in its own app (Lenovo Vantage, Dell's power settings, HP's or ASUS's battery tools). These stop charging at a lower level, often somewhere between 55% and 80% depending on the brand, so the battery isn't held at full all day. Our explainer on [why phone batteries degrade](https://techpulzo.in/why-your-phone-battery-degrades-over-time-the-real-chemistry) covers the chemistry, which is the same in laptops.

## Two myths

- **"Do a full discharge every couple of months."** Some guides, including the CrackTheWindows video, suggest a full "calibration" cycle. Battery University says lithium-ion batteries have no memory and don't need periodic full discharges. An occasional full cycle can help the percentage reading stay accurate on some laptops, but it doesn't improve the battery's health.
- **"Unplug as soon as it reaches 100%."** Modern laptops stop charging at full. The better fix for always-plugged-in use is a charge limit, not unplugging.

## While you're there: two extras

- **Show the percentage in the taskbar.** Windows 11 now shows a coloured battery icon and, if you turn it on in **Settings > System > Power & battery**, the exact percentage, as [XDA reported](https://www.xda-developers.com/a-feature-windows-11-should-have-had-on-release-is-finally-rolling-out-says-microsoft/) when the feature rolled out widely in February 2026.
- **Find what's draining it.** Run `powercfg /energy` with the laptop idle; Microsoft says it analyses the system for common energy-efficiency and battery-life problems and saves a report.

## Frequently asked questions

### How do I check my laptop battery health in Windows 11?

Open Command Prompt, type `powercfg /batteryreport` and press Enter. Open the HTML file it saves, then divide the Full Charge Capacity by the Design Capacity and multiply by 100. That percentage is your battery's health.

### What is a good battery health percentage for a laptop?

Above 80% is healthy. Between 60% and 80%, runtime is noticeably shorter but the battery may still be fine for your use. Below 60%, or if the laptop shuts down unexpectedly, plan a replacement.

### What is battery cycle count?

It's the number of full charge-discharge cycles the battery has gone through. One cycle is 100% worth of use, even if spread across several days. Many laptop batteries are rated for several hundred cycles before noticeable wear.

### Is it bad to keep my laptop plugged in all the time?

Keeping a battery at 100% for long periods, especially when warm, speeds up wear. Most laptops have a charge-limit or battery-care setting in the manufacturer's app that stops charging below full; turn it on if your laptop is usually plugged in.

### Why is my battery report's design capacity higher than full charge capacity?

Because batteries lose capacity as they age. Design capacity is what the battery held when new; full charge capacity is what it holds today. The gap is normal wear.

## Check it twice a year

Run the report every six months and note the health and cycle count. A steady, gradual decline is normal; a sudden drop or swelling means it's time to act.
