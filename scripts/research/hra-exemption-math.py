"""Worked examples for the HRA exemption draft (FY 2026-27, old regime)."""

def exempt(hra, basic_da, rent, metro):
    return min(hra, (0.5 if metro else 0.4) * basic_da, max(0, rent - 0.1 * basic_da))

# Example 1: Bengaluru, basic 50,000/month, HRA 20,000, rent 22,000 (annual)
for metro in (False, True):
    e = exempt(240000, 600000, 264000, metro)
    print("Ex1 metro" if metro else "Ex1 40%", e, "taxable", 240000 - e)

# Example 2: lived with parents Apr-Sep, rented Oct-Mar at 25,000; basic 50,000, HRA 20,000
annual = exempt(240000, 600000, 6 * 25000, True)
period = exempt(6 * 20000, 6 * 50000, 6 * 25000, True)
print("Ex2 annual-method", annual, "rented-period method", period, "diff", period - annual)

# Example 3: rent with no HRA in salary (80GG-type): total income 7,00,000, rent 15,000/month
ti = 700000; rent = 180000
print("Ex3 no-HRA deduction", min(60000, 0.25 * ti, max(0, rent - 0.1 * ti)))
