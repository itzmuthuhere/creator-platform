"""Old vs new regime for salaried residents under 60, tax year 2026-27.
Slabs, rebates and standard deductions as on incometax.gov.in / ClearTax
(unchanged by Budget 2026). 4% cess. Surcharge ignored (incomes <= Rs 50 lakh).
"""


def new_tax(gross):
    ti = max(0, gross - 75_000)
    slabs = [(4e5, 0), (8e5, .05), (12e5, .10), (16e5, .15), (20e5, .20), (24e5, .25), (float("inf"), .30)]
    tax, prev = 0.0, 0
    for lim, r in slabs:
        if ti > prev:
            tax += (min(ti, lim) - prev) * r
        prev = lim
    if ti <= 12e5:
        tax = 0
    else:
        tax = min(tax, ti - 12e5)  # marginal relief
    return tax * 1.04


def old_tax(gross, ded):
    ti = max(0, gross - 50_000 - ded)
    slabs = [(2.5e5, 0), (5e5, .05), (10e5, .20), (float("inf"), .30)]
    tax, prev = 0.0, 0
    for lim, r in slabs:
        if ti > prev:
            tax += (min(ti, lim) - prev) * r
        prev = lim
    if ti <= 5e5:
        tax = 0
    return tax * 1.04


def breakeven(gross):
    target = new_tax(gross)
    lo, hi = 0, gross
    for _ in range(60):
        mid = (lo + hi) / 2
        if old_tax(gross, mid) > target:
            lo = mid
        else:
            hi = mid
    return hi, target


print(f"{'Salary':>8} {'New regime tax':>15} {'Old regime with Rs 2 lakh deductions':>38} {'Deductions needed to match':>28}")
for g in (8e5, 10e5, 12.75e5, 15e5, 18e5, 20e5, 25e5, 30e5, 40e5, 50e5):
    be, nt = breakeven(g)
    print(f"{g / 1e5:>6.2f}L {nt:>15,.0f} {old_tax(g, 2e5):>38,.0f} {be:>28,.0f}")

print("\nWorked example: Bengaluru, salary Rs 18 lakh (basic Rs 9 lakh), rent Rs 30,000/month")
basic = 9e5
hra_recv = 3.6e5
rent = 3.6e5
hra_old_rule = min(hra_recv, 0.40 * basic, rent - 0.10 * basic)
hra_new_rule = min(hra_recv, 0.50 * basic, rent - 0.10 * basic)
print(f"  HRA exemption: 40% rule Rs {hra_old_rule:,.0f}; 50% rule (Bengaluru from Apr 2026) Rs {hra_new_rule:,.0f}")
other = 1.5e5 + 25_000 + 50_000  # 80C-type Rs 1.5L (EPF/PPF), health insurance Rs 25k, NPS own Rs 50k
for label, hra in (("before (40%)", hra_old_rule), ("now (50%)", hra_new_rule)):
    d = hra + other
    print(f"  {label}: deductions Rs {d:,.0f}; old tax Rs {old_tax(18e5, d):,.0f} vs new tax Rs {new_tax(18e5):,.0f}")
d2 = hra_new_rule + other + 2e5
print(f"  + home loan interest Rs 2 lakh: deductions Rs {d2:,.0f}; old tax Rs {old_tax(18e5, d2):,.0f}")

print("\nHigher-rent case: HRA received Rs 4.5 lakh (50% of basic), rent Rs 45,000/month")
hra_recv2, rent2 = 4.5e5, 5.4e5
h40 = min(hra_recv2, 0.40 * basic, rent2 - 0.10 * basic)
h50 = min(hra_recv2, 0.50 * basic, rent2 - 0.10 * basic)
for label, hra in (("40% rule", h40), ("50% rule", h50)):
    d = hra + other
    print(f"  {label}: HRA exempt Rs {hra:,.0f}; deductions Rs {d:,.0f}; old tax Rs {old_tax(18e5, d):,.0f}; with Rs 2L home-loan interest Rs {old_tax(18e5, d + 2e5):,.0f}; new tax Rs {new_tax(18e5):,.0f}")
