"""Worked numbers for the factsheet article, from PPFAS Flexi Cap Fund factsheet (Aug 2026)
and AMFI TER disclosure (Sep 2026)."""
# Base expense ratio (factsheet) vs total TER (AMFI)
base = {"regular": 1.05, "direct": 0.53}
ter = {"regular": 1.30, "direct": 0.69}
for p in base:
    print(f"{p}: base {base[p]}% -> total TER {ter[p]}% (+{ter[p]-base[p]:.2f} pts)")
# Cost of the regular-direct TER gap on ₹10 lakh for a year
print("Annual cost gap on ₹10 lakh:", round(10_00_000 * (ter['regular'] - ter['direct']) / 100))
# Sharpe sanity: (return - rf) / sd -> implied excess return
sd, sharpe, rf = 9.93, 0.80, 4.97
print("Implied annualised return behind Sharpe 0.80:", round(rf + sharpe * sd, 2), "%")
# Exit load example: ₹1 lakh invested, redeemed at month 10 when worth ₹1.1 lakh
value = 110000
free = 0.10 * value
load = 0.02 * (value - free)
print("Exit load on full redemption within 365 days:", round(load))
