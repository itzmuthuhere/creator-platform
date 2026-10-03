"""Fixed vs floating home loan comparison for the fixed-vs-floating draft.
Floating loan: EMI recomputed on remaining balance/tenure whenever the rate changes."""
def emi(p, r, n):
    i = r / 1200; return p * i * (1 + i) ** n / ((1 + i) ** n - 1)
def run(P, n, path):          # path: function month -> annual rate
    bal = P; paid = 0; r_prev = None; e = 0
    for m in range(n):
        r = path(m)
        if r != r_prev: e = emi(bal, r, n - m); r_prev = r
        it = bal * r / 1200; bal -= e - it; paid += e
    return paid - P
P, n = 5_000_000, 240
fixed = 9.5; fl = 7.75
print(f"EMI fixed {fixed}%: {emi(P,fixed,n):,.0f}; floating {fl}%: {emi(P,fl,n):,.0f}; gap {emi(P,fixed,n)-emi(P,fl,n):,.0f}/mo")
scen = {
 "floating flat 7.75": lambda m: fl,
 "+1% after 2y, stays": lambda m: fl if m < 24 else fl + 1,
 "+2.5% for years 2-5 then back": lambda m: fl + 2.5 if 24 <= m < 60 else fl,
 "+1.75% from month 1 (=fixed)": lambda m: fl + 1.75,
 "-1% after 2y": lambda m: fl if m < 24 else fl - 1,
}
fi = run(P, n, lambda m: fixed)
print(f"Fixed total interest: {fi:,.0f}")
for k, f in scen.items():
    t = run(P, n, f); print(f"{k}: interest {t:,.0f}; vs fixed {t-fi:+,.0f}")
# break-even constant rate
lo, hi = 7.75, 12
for _ in range(50):
    mid = (lo+hi)/2
    if run(P, n, lambda m: mid) < fi: lo = mid
    else: hi = mid
print("Constant floating rate that equals fixed:", round(mid, 2))
