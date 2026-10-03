"""Index vs active: cost hurdle and SIP outcome.
Median direct-plan TERs from AMFI Sep 2026 data (scripts/research/amfi-ter-gap-groups.mjs):
index funds (equity) 0.37%, large cap 1.06%, flexi cap 0.92%, mid cap 0.96%, small cap 0.91%.
"""
import json

def sip(monthly, annual, years):
    r = (1 + annual) ** (1/12) - 1
    fv = 0.0
    for _ in range(years * 12):
        fv = (fv + monthly) * (1 + r)
    return fv

d = json.load(open("data/research/amfi-ter-gap-09-2026.json", encoding="utf-8"))
idx = [s for s in d["schemes"] if "index fund" in s["category"].lower() and "debt" not in s["category"].lower() and "etf" not in s["name"].lower()]
n50 = [s for s in idx if "nifty 50" in s["name"].lower() and "next" not in s["name"].lower() and "equal" not in s["name"].lower() and "value" not in s["name"].lower() and "momentum" not in s["name"].lower() and "quality" not in s["name"].lower() and "alpha" not in s["name"].lower() and "low vol" not in s["name"].lower()]
dt = sorted(s["directTER"] for s in n50)
print(f"Plain Nifty 50 index funds in AMFI Sep 2026 data: {len(n50)}; direct TER min {dt[0]:.2f}%, median {dt[len(dt)//2]:.2f}%, max {dt[-1]:.2f}%")

gross = 0.12
for name, ter in (("Nifty 50 index fund (direct)", dt[len(dt)//2] / 100), ("Active large-cap (direct, median)", 0.0106)):
    print(f"  {name:<36} TER {ter*100:.2f}% -> Rs 10,000/month for 20 years: Rs {sip(10000, gross - ter, 20)/1e5:,.1f} lakh (if both earn the same before costs)")
hurdle = 1.06 - dt[len(dt)//2]
print(f"Active fund must beat the index by ~{hurdle:.2f} points a year before costs just to match it")
print(f"Gap over 20 years at that hurdle: Rs {(sip(10000, gross - dt[len(dt)//2]/100, 20) - sip(10000, gross - 0.0106, 20))/1e5:,.1f} lakh")
