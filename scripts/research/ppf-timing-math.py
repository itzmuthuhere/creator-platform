"""PPF interest under the 2019 Scheme rule: for each month, interest at
rate/12 on the lowest balance between the close of the 5th and the month end;
interest credited (and compounded) on 31 March. Rate assumed flat at 7.1%.
"""

RATE = 0.071


def ppf(deposits_by_month, years=15):
    """deposits_by_month(year, month_index 0..11) -> list of (day, amount)."""
    bal = 0.0
    total_dep = 0
    for y in range(years):
        year_int = 0.0
        for m in range(12):
            deps = deposits_by_month(y, m)
            before = sum(a for d, a in deps if d <= 5)
            after = sum(a for d, a in deps if d > 5)
            bal += before
            year_int += bal * RATE / 12   # lowest balance from 5th to month end
            bal += after
            total_dep += before + after
        bal += year_int
    return bal, total_dep


def L(x):
    return f"Rs {x / 1e5:,.2f} lakh"


plans = {
    "Rs 1.5 lakh on 1-5 April each year": lambda y, m: [(3, 150_000)] if m == 0 else [],
    "Rs 1.5 lakh on 6 April or later": lambda y, m: [(6, 150_000)] if m == 0 else [],
    "Rs 1.5 lakh in March (end of year)": lambda y, m: [(20, 150_000)] if m == 11 else [],
    "Rs 12,500 monthly, on or before the 5th": lambda y, m: [(4, 12_500)],
    "Rs 12,500 monthly, after the 5th (e.g. salary day 7th)": lambda y, m: [(7, 12_500)],
}
base = None
print("15 years at 7.1%, Rs 1.5 lakh a year:")
for name, f in plans.items():
    bal, dep = ppf(f)
    if base is None:
        base = bal
    print(f"  {name:<58} maturity {L(bal)}  (deposited {L(dep)})  gap vs best {L(base - bal)}")

print("\nOne year, one deposit of Rs 1.5 lakh:")
for label, day, month in (("3 April", 3, 0), ("6 April", 6, 0)):
    bal, _ = ppf(lambda y, m, d=day, mm=month: [(d, 150_000)] if m == mm else [], years=1)
    print(f"  deposited {label}: interest in year 1 = Rs {bal - 150_000:,.0f}")
print(f"  one month's interest on Rs 1.5 lakh = Rs {150_000 * RATE / 12:,.0f}")
