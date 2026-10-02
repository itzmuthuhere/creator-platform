"""Needs-based term cover for a worked example (all figures in rupees).

Method: present value of the family's yearly expenses (excluding the insured
person's own spending) until the insured would have turned 60, growing with
inflation and discounted at a conservative post-tax return, paid at the start
of each year; plus outstanding loans; plus big goals in today's money
discounted at the real rate; plus a buffer; minus investments the family
could use. Employer group cover is not counted (it ends with the job).
"""


def pv_growing(first_year, growth, rate, years):
    """PV of `years` payments starting now (annuity due), growing at `growth`."""
    if abs(rate - growth) < 1e-12:
        return first_year * years
    return first_year * (1 - ((1 + growth) / (1 + rate)) ** years) / (rate - growth) * (1 + rate)


def cr(x):
    return f"Rs {x / 1e7:,.2f} crore"


def L(x):
    return f"Rs {x / 1e5:,.1f} lakh"


age = 32
income = 18_00_000
family_expenses = 60_000 * 12          # household spending minus the earner's own (~Rs 10,000/month)
years = 60 - age
loan = 45_00_000
goal_today, goal_in = 30_00_000, 16    # child's education + other big goal, today's money, needed in 16 years
buffer = 5_00_000
investments = 15_00_000
infl, ret = 0.06, 0.07

need_income = pv_growing(family_expenses, infl, ret, years)
real = (1 + ret) / (1 + infl) - 1
goal_pv = goal_today / (1 + real) ** goal_in
total = need_income + loan + goal_pv + buffer - investments
print(f"Age {age}, income {L(income)}, family expenses {L(family_expenses)}/yr for {years} years")
print(f"  Replace family expenses (6% inflation, 7% return): {cr(need_income)}")
print(f"  Home loan outstanding: {L(loan)}")
print(f"  Child goals {L(goal_today)} today, needed in {goal_in} y -> PV {L(goal_pv)}")
print(f"  Buffer: {L(buffer)}   Minus investments: {L(investments)}")
print(f"  NEED: {cr(total)}  = {total / income:.1f}x income")
print(f"  Rules of thumb: 10x = {cr(10 * income)}, 20x = {cr(20 * income)}, 25x = {cr(25 * income)}")

print("\nSensitivity of the expense-replacement part:")
for r in (0.06, 0.07, 0.08):
    print(f"  return {r * 100:.0f}% with 6% inflation: {cr(pv_growing(family_expenses, infl, r, years))}")

print("\nThe same household at 45 (loan Rs 20 lakh left, goal 3 years away, investments Rs 60 lakh):")
yrs45 = 60 - 45
exp45 = family_expenses * (1 + infl) ** 13
need45 = pv_growing(exp45, infl, ret, yrs45) + 20_00_000 + goal_today * (1 + infl) ** 13 / (1 + ret) ** 3 + buffer * (1 + infl) ** 13 - 60_00_000
print(f"  family expenses then {L(exp45)}/yr for {yrs45} years -> need {cr(need45)} (in that year's rupees)")
