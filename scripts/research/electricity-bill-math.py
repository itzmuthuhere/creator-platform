"""Electricity bill from appliance usage, with Tamil Nadu domestic (LT-IA) consumer rates
after government subsidy, bimonthly billing, from 10 May 2026 (G.O. Ms 50; TNERC Order 5/2026).
Rates as used in TNPDCL bills per secondary sources: up to 500 units -> 0-200 free, 201-400 4.70, 401-500 6.30.
Above 500 units -> 0-100 free, 101-400 4.70, 401-500 6.30, 501-600 8.40 (higher slabs not used here)."""

def tn_bill(units):
    if units <= 500:
        slabs = [(200, 0.0), (400, 4.70), (500, 6.30)]
    else:
        slabs = [(100, 0.0), (400, 4.70), (500, 6.30), (600, 8.40)]
        assert units <= 600, "higher slabs not modelled"
    bill, prev = 0.0, 0
    for top, rate in slabs:
        if units > prev:
            bill += (min(units, top) - prev) * rate
        prev = top
    return round(bill, 2)

# A household's appliances: (name, watts, hours per day, days per 60-day cycle, duty factor)
home = [
    ("Ceiling fans x3 (75 W each)", 225, 10, 60, 1.0),
    ("LED lights x8 (10 W each)", 80, 6, 60, 1.0),
    ("Refrigerator (label: 250 units/year)", None, None, None, None),
    ("TV (100 W)", 100, 4, 60, 1.0),
    ("1.5-ton inverter AC (avg ~900 W while running)", 900, 4, 60, 1.0),
    ("Water heater (2,000 W)", 2000, 0.5, 60, 1.0),
    ("Washing machine (500 W)", 500, 1, 20, 1.0),
    ("Wi-Fi router, phone chargers, standby", 30, 24, 60, 1.0),
]
total = 0
for name, w, h, d, f in home:
    if w is None:
        kwh = 250 / 365 * 60
    else:
        kwh = w * h * d * f / 1000
    total += kwh
    print(f"{name:52s} {kwh:7.1f} units")
print(f"Total for 60 days: {total:.0f} units")
for u in (200, 350, 450, 500, 501, 520):
    print(f"{u} units -> ₹{tn_bill(u):,.2f}")
print("Cliff 500->501:", round(tn_bill(501) - tn_bill(500), 2))
print("AC 3 h/day instead of 4:", round(total - 900*1*60/1000), "units ->", tn_bill(round(total - 900*1*60/1000)))
print("558 units ->", tn_bill(558))
print("Example fix: AC 3 h/day (-54) and water heater 20 min (-20):", 558 - 54 - 20, "units ->", tn_bill(558 - 54 - 20))
