"""Worked numbers for the emergency-fund draft.

Rates (checked 2 Oct 2026):
- SBI savings account 2.50% (w.e.f. 15 Jun 2025)
- SBI 1-year FD 6.25%, 46-179 days 4.90% (w.e.f. 15 Dec 2025); premature penalty 0.5% up to Rs 5 lakh
- Large liquid funds, direct growth, 1 Oct 2025 -> 1/2 Oct 2026: 6.46-6.57% (AMFI NAVs)
"""

essentials = {
    "Rent": 25_000,
    "Home/vehicle loan EMIs": 18_000,
    "Groceries, utilities, phone, internet": 14_000,
    "School fees (monthly equivalent)": 6_000,
    "Insurance premiums (monthly equivalent)": 3_000,
    "Transport": 5_000,
    "Parent's medicines": 4_000,
}
total_spend = 95_000
ess = sum(essentials.values())
print(f"Essential monthly costs: Rs {ess:,} (of Rs {total_spend:,} total spending)")
for months in (6, 9, 12):
    print(f"  {months} months of essentials: Rs {ess * months:,}   vs {months} months of total spending: Rs {total_spend * months:,}")

target = ess * 12
tiers = [
    ("Savings account (1 month)", ess * 1, 0.025),
    ("Sweep-in / auto-sweep FD (3 months)", ess * 3, 0.0625),
    ("Liquid funds, 3 schemes (8 months)", ess * 8, 0.065),
]
print(f"\nTarget (12 months of essentials): Rs {target:,}")
earn = 0
for name, amt, r in tiers:
    earn += amt * r
    print(f"  {name:<40} Rs {amt:>9,}  @ {r * 100:.2f}% = Rs {amt * r:,.0f}/yr")
print(f"  Tiered total: Rs {earn:,.0f} a year before tax ({earn / target * 100:.2f}%)")
print(f"  All in savings account: Rs {target * 0.025:,.0f} a year")
print(f"  Difference: Rs {earn - target * 0.025:,.0f} a year before tax")

print("\nSame-day access from liquid funds: Rs 50,000 per scheme per day (or 90% of holding, if lower)")
print(f"  3 schemes -> up to Rs {3 * 50_000:,} within ~30 minutes, rest next working day")

print("\nBreaking Rs 1 lakh of a 1-year FD after 4 months (premature penalty 0.5%):")
# Interest at the 46-179 day rate minus 0.5% penalty for the period it ran
rate = 0.049 - 0.005
print(f"  earns {rate * 100:.2f}% for 4 months: Rs {1_00_000 * rate * 4 / 12:,.0f} instead of Rs {1_00_000 * 0.0625 * 4 / 12:,.0f} at the 1-year rate")
