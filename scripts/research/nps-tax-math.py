"""NPS tax savings for the draft (tax year 2026-27, salaried, under 60).
Reuses the slab logic from tax-regime-breakeven.py.
"""
import importlib.util, pathlib

spec = importlib.util.spec_from_file_location("tr", pathlib.Path(__file__).with_name("tax-regime-breakeven.py"))
src = open(spec.origin, encoding="utf-8").read().split('print(f"{\'Salary\'')[0]
ns = {}
exec(src, ns)
new_tax, old_tax = ns["new_tax"], ns["old_tax"]


def new_tax_with_ded(gross, ded):
    return new_tax(gross - ded)


print("Employer NPS in the NEW regime (deduction up to 14% of basic + DA)")
for gross in (12e5, 15e5, 20e5, 30e5):
    basic = gross * 0.5
    emp = 0.14 * basic
    # employer contribution is part of CTC; restructuring moves it from taxable salary to NPS
    before = new_tax(gross)
    after = new_tax_with_ded(gross, emp)
    print(f"  CTC Rs {gross/1e5:.0f}L, basic {basic/1e5:.1f}L: employer NPS Rs {emp:,.0f}/yr -> tax {before:,.0f} -> {after:,.0f} (saves Rs {before-after:,.0f})")

print("\nOwn NPS Rs 50,000 extra deduction in the OLD regime (beyond Rs 1.5 lakh)")
for slab in (0.05, 0.20, 0.30):
    print(f"  at {int(slab*100)}% slab: saves Rs {50000*slab*1.04:,.0f} a year (with cess)")

print("\nAt 60, corpus Rs 1 crore, non-government subscriber (>Rs 12 lakh):")
c = 1e7
print(f"  up to 80% lump sum: Rs {0.8*c:,.0f}; of which tax-free 60%: Rs {0.6*c:,.0f}; taxable extra 20%: Rs {0.2*c:,.0f}")
print(f"  annuity minimum 20%: Rs {0.2*c:,.0f} (pension taxable as received)")
