"""Repo-rate change -> home loan EMI or tenure, for the repo-rate EMI draft."""
import math
def emi(p, r, n):
    i = r / 1200; return p * i * (1 + i) ** n / ((1 + i) ** n - 1)
def months(p, r, e):
    i = r / 1200
    if e <= p * i: return float('inf')
    return math.log(e / (e - p * i)) / math.log(1 + i)

P, r, n = 5_000_000, 7.75, 240
e0 = emi(P, r, n)
print(f"Base: EMI {e0:,.0f} on {P:,} at {r}% for {n} months; total interest {e0*n-P:,.0f}")
for d in (0.25, 0.5, 1.0, 2.5):
    e1 = emi(P, r + d, n); m1 = months(P, r + d, e0)
    print(f"+{d}: EMI {e1:,.0f} (+{e1-e0:,.0f}/mo, +{(e1-e0)*12:,.0f}/yr) | same EMI -> {m1:.0f} months (+{m1-n:.0f}), extra interest {(e0*m1-P)-(e0*n-P):,.0f}")
for d in (-0.25,):
    e1 = emi(P, r + d, n); m1 = months(P, r + d, e0)
    print(f"{d}: EMI {e1:,.0f} ({e1-e0:,.0f}/mo) | same EMI -> {m1:.0f} months ({m1-n:.0f})")
# 2022-23 hike cycle example: 6.75% -> 9.25% on 20-yr loan taken 2021, reset after 1.5 years
P2, r2 = 5_000_000, 6.75; e2 = emi(P2, r2, 240)
bal = P2
for _ in range(18): bal -= e2 - bal * r2 / 1200
m = months(bal, 9.25, e2)
print(f"2022-23 style: EMI {e2:,.0f}; after 18 months bal {bal:,.0f}; at 9.25% with same EMI remaining {m:.0f} months vs {240-18}")
# Late in loan: 5 years left
bal5 = P
for _ in range(180): bal5 -= e0 - bal5 * r / 1200
e5 = emi(bal5, r + 0.25, 60)
print(f"5 yrs left: bal {bal5:,.0f}; +0.25% EMI change {e5-e0:+,.0f}")
# SBI EBLR markup
print("SBI EBLR 7.90 - repo 5.25 =", round(7.90 - 5.25, 2))
