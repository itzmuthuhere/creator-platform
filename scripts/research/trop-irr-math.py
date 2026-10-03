"""IRR of the 'extra' premium in a return-of-premium term plan (Ditto Sep 2026 quotes, Rs 2 crore cover to age 65)."""
def irr(extra, years, refund):
    lo, hi = -0.05, 0.2
    for _ in range(200):
        r = (lo + hi) / 2
        fv = sum(extra * (1 + r) ** (years - k) for k in range(years))  # premiums at start of each year
        if fv > refund: hi = r
        else: lo = r
    return r
def fv(extra, years, r):
    return sum(extra * (1 + r) ** (years - k) for k in range(years))
for age, pure, trop in ((25, 19719, 47075), (30, 25153, 66841)):
    yrs = 65 - age; extra = trop - pure; refund = trop * yrs
    print(f"Age {age}: extra {extra:,}/yr x {yrs}y; refund {refund:,}; IRR {irr(extra, yrs, refund)*100:.2f}%")
    for r in (0.06, 0.071, 0.10):
        print(f"   extra invested at {r*100:.1f}%: {fv(extra, yrs, r):,.0f}")
