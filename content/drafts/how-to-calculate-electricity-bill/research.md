# Research notes: How to calculate your electricity bill from appliance usage

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** TNEB EB Bill Calculation 2026 | Reasons for high TNEB bills + solutions (Stay Focus in Attitude – Karthikeyan Mani), https://www.youtube.com/watch?v=gZ1ACGmNhx8. ~1 month old; auto-translated captions. Bills at 500 vs 501 units under the 200-free-units scheme: 500 → ₹1,570; 501 → ₹2,048.40 (loses the 101–200 subsidy and drops to 100 free units). Old (100-free) structure gave ₹1,805 at 500. Shows slab-wise breakdown on the TNPDCL consumer portal after registering with the consumer number. Spoken "₹428.40/₹470" difference figures are inconsistent; the arithmetic gives ₹478.40.
- **Second:** How to Calculate Electricity Usage & kWh Step by Step (ElectroDecoded), https://www.youtube.com/watch?v=ct9BNGDUb8Y. 2 weeks old. Energy = power × time; convert W to kW and minutes/seconds to hours; build a table of appliances.
- **Third:** How to calculate EB bill 2026 (startuponline), https://www.youtube.com/watch?v=JsA0DmBi-xs. ~4 months old, Tamil auto captions. Walks through an online TNEB calculator: 0–200 free, 201–400 ₹4.70, 401–500 ₹6.30 for ≤500 units.

## 2. Topic assessment

Useful 5 · Searchable 5 · Evergreen 3 (tariffs change; method doesn't) · Depth 4 · Independent research 4 · Examples 5 · Screenshots 1 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED. Angle: a method that works anywhere in India (watts → units → slabs), with a full worked household in Tamil Nadu under the May 2026 scheme, the 500-unit cliff, and where the units actually go (AC, water heater, standby).

## 3. Duplicate check

`library.mjs check "how to calculate electricity bill"`: no similar articles. Internal links: https://techpulzo.in/how-to-turn-a-spreadsheet-into-a-simple-budget-tracker, https://techpulzo.in/zero-based-budgeting-how-to-build-a-budget-that-actually-works.

## 4. Search intent and keywords

- **Primary keyword:** how to calculate electricity bill
- **Intent:** how-to
- **Secondary:** electricity bill calculation per unit; tneb bill calculation 2026; 200 units free electricity tamil nadu; how many units does an ac consume; kwh calculation

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | TN: from 10 May 2026, 200 units free bimonthly for domestic consumers using ≤500 units; >500 keep 100 free; G.O. signed by CM Vijay | Yes | VERIFIED | DT Next (10 May 2026); ANI | |
| 2 | TNERC Order 5 of 2026 (26 May 2026) gave effect; ₹1,545.14 cr provisional subsidy to 31 Mar 2027 | No | VERIFIED (secondary) | thediscombill guide; search summaries | |
| 3 | Consumer counts: 77 lakh ≤100, 59 lakh 101–200, 87 lakh 201–500, 23 lakh >500 | No | VERIFIED | DT Next | |
| 4 | Consumer rates ≤500: 0–200 free, 201–400 ₹4.70, 401–500 ₹6.30 | Yes | VERIFIED (secondary, multiple agree) | startuponline video; Karthikeyan Mani video; electricitybillcalc.com | |
| 5 | >500: 0–100 free, 101–400 ₹4.70, 401–500 ₹6.30, 501–600 ₹8.40 | Yes (Karthikeyan) | VERIFIED (secondary) | Video arithmetic; DT Next: ₹2.35 subsidy on 101–200 only for ≤500 | electricitybillcalc lists 101–200 at ₹2.35 for >500, which contradicts DT Next's "23 lakh >500: no benefit" → not followed |
| 6 | No fixed charge for TN domestic | No | VERIFIED (secondary) | thediscombill; electricitybillcalc | |
| 7 | BEE: refrigerator label parameter is annual energy consumption; lower is better; verify on beestarlabel.com | No | VERIFIED | BEE "Know your Star Label" session PDF | |
| 8 | Energy (kWh) = kW × hours | Yes | VERIFIED (physics) | | |
| 9 | Appliance wattages and hours in the example | No | ASSUMPTION (labelled) | Own example | Article says to use your own labels |
| 10 | Bills: 558 → ₹2,527.20; 484 → ₹1,469.20; 500 → ₹1,570; 501 → ₹2,048.40 | No | VERIFIED | scripts/research/electricity-bill-math.py | |

## 6. Value the video doesn't give

- A method that works for any state, plus TN as the worked case.
- A full household table (8 appliance groups) turned into units and a bill.
- The 500-unit cliff explained with official context (who's affected, by numbers).
- Practical: where to find your slab breakdown, how to measure, which appliances dominate.

## 7. Screenshot plan

None: TNPDCL bill breakdown needs a login.

## 8. Outline

- Opening
- H2 Step 1: units = watts × hours ÷ 1,000
- H2 Step 2: list your appliances (table)
- H2 Step 3: apply your tariff's slabs (TN 2026 tables)
- H2 The 500-unit cliff in Tamil Nadu
- H2 Worked example: from 558 to 484 units
- H2 Checking against your actual bill
- H2 Other states
- FAQ
