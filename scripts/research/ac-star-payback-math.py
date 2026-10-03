"""3-star vs 5-star AC: scale BEE label units (1,600 h/year basis) to actual use, and payback.
Average label figures for 1.5-ton split ACs per Down To Earth (Sep 2025): 3-star 1,008 kWh/yr, 5-star 740 kWh/yr.
Price gap ₹6,000-8,000 per ClearBuy video (attributed). Marginal rates: TN consumer rates ₹4.70 / ₹6.30 / ₹8.40."""
label = {"3-star": 1008, "5-star": 740}
LABEL_HOURS = 1600
scenarios = {"Light: 4 h x 120 days": 4*120, "Moderate: 8 h x 150 days": 8*150, "Heavy: 10 h x 240 days": 10*240}
for name, hours in scenarios.items():
    u3 = label["3-star"] * hours / LABEL_HOURS
    u5 = label["5-star"] * hours / LABEL_HOURS
    saved = u3 - u5
    print(f"{name}: {hours} h/yr -> 3-star {u3:.0f}, 5-star {u5:.0f}, saved {saved:.0f} units")
    for rate in (4.70, 6.30, 8.40):
        yr = saved * rate
        print(f"   at ₹{rate:.2f}/unit: ₹{yr:,.0f}/yr; payback on ₹7,000 gap: {7000/yr:.1f} yrs")
# Tonnage: 1 ton of refrigeration = 3.517 kW
for w in (5000, 5280):
    print(f"{w} W cooling = {w/3517:.2f} ton")
# Running cost per hour from ISEER-ish: power ≈ capacity / efficiency (rough, at rated conditions)
