"""Rooftop solar sizing and payback for a Tamil Nadu household (bimonthly billing).
Generation: ~1,400 units per kW per year (SolarSquare assumption) -> ~230 units per kW per 60-day cycle.
Subsidy: central ₹30,000/kW up to 2 kW + ₹18,000 for 3rd kW (cap ₹78,000) [pmsuryaghar.gov.in];
TN top-up ₹5,000 / ₹10,000 / ₹22,000 for 1/2/3 kW [Sep 2026].
Install cost: 1 kW ₹80,000 and 3 kW ₹1,90,000 (midpoints of Tamil Yojana's ranges); 2 kW ₹1,35,000 is our interpolation.
Surplus export assumed to earn nothing (conservative)."""

def tn_bill(units):
    units = max(0, round(units))
    if units <= 500:
        slabs = [(200, 0.0), (400, 4.70), (500, 6.30)]
    else:
        slabs = [(100, 0.0), (400, 4.70), (500, 6.30), (600, 8.40)]
    bill, prev = 0.0, 0
    for top, rate in slabs:
        if units > prev:
            bill += (min(units, top) - prev) * rate
        prev = top
    return round(bill, 2)

per_kw_cycle = 1400 / 365 * 60
central = {1: 30000, 2: 60000, 3: 78000}
state = {1: 5000, 2: 10000, 3: 22000}
cost = {1: 80000, 2: 135000, 3: 190000}
for use in (300, 558):
    base = tn_bill(use)
    print(f"\nHousehold using {use} units per cycle: bill ₹{base:,.2f}")
    for kw in (1, 2, 3):
        net = use - kw * per_kw_cycle
        b = tn_bill(net)
        save_yr = (base - b) * 6
        outlay = cost[kw] - central[kw] - state[kw]
        pb = outlay / save_yr if save_yr else float("inf")
        print(f"  {kw} kW: generates {kw*per_kw_cycle:.0f}, net {max(0,net):.0f} -> bill ₹{b:,.2f}; "
              f"saves ₹{save_yr:,.0f}/yr; outlay after subsidy ₹{outlay:,}; payback {pb:.1f} yrs")
