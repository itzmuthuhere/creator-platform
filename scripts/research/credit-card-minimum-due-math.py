"""Worked numbers for the credit-card minimum-due draft.

Assumptions (from HDFC Bank and SBI Card MITCs, Sep 2026):
- finance charge 3.75% a month (45% a year), charged daily on the balance
- GST 18% on finance charges
- HDFC-style MAD (from June 2025): GST + 5% of (finance charge + balance)
  when that 5% exceeds the finance charge, else GST + finance charge + 5% of
  balance; minimum Rs 200 (HDFC MITC)
- SBI-style MAD (from 15 July 2025): GST + finance charge + 2% of remaining
  balance
Monthly cycle simplification: interest for a cycle = balance * 3.75%.
No new spending, no late fees (the minimum is always paid on time).
"""

RATE = 0.0375
GST = 0.18


def payoff(balance, style, fixed=None, mult=1.0):
    months, paid_interest, paid_gst, paid_total = 0, 0.0, 0.0, 0.0
    while balance > 0.5 and months < 1200:
        months += 1
        fc = balance * RATE
        gst = fc * GST
        if fixed:
            pay = fixed
        elif style == "hdfc":
            five = 0.05 * (fc + balance)
            mad = gst + (five if five > fc else fc + 0.05 * balance)
            pay = max(mad * mult, 200)
        else:  # sbi
            pay = max((gst + fc + 0.02 * balance) * mult, 200)  # same Rs 200 floor assumed
        due = balance + fc + gst
        pay = min(pay, due)
        paid_interest += fc
        paid_gst += gst
        paid_total += pay
        balance = due - pay
    return months, paid_interest, paid_gst, paid_total


def show(label, r):
    m, i, g, t = r
    print(f"{label:<52} {m:>4} months ({m / 12:4.1f} y)  interest Rs {i:>9,.0f}  GST Rs {g:>8,.0f}  total paid Rs {t:>9,.0f}")


B = 1_00_000
print(f"Balance Rs {B:,} at 3.75%/month + 18% GST, no new spending\n")
show("Minimum only, 5% style (HDFC formula)", payoff(B, "hdfc"))
show("Minimum only, 2% style (SBI Card formula)", payoff(B, "sbi"))
show("Twice the minimum, 5% style", payoff(B, "hdfc", mult=2))
show("Twice the minimum, 2% style", payoff(B, "sbi", mult=2))
show("Fixed Rs 5,000 a month", payoff(B, "x", fixed=5000))
show("Fixed Rs 10,000 a month", payoff(B, "x", fixed=10000))
first_fc = B * RATE
print(f"\nFirst month: finance charge Rs {first_fc:,.0f} + GST Rs {first_fc * GST:,.0f} = Rs {first_fc * (1 + GST):,.0f}")
print(f"Annual cost with GST: {RATE * 12 * (1 + GST) * 100:.1f}% (45% before GST)")

print("\n== Paying 90% of a bill: interest runs from purchase dates on the full amount")
bill = 50_000
days_purchase_to_payment = 40   # typical: average purchase ~20 days before statement, due date 20 days after
days_payment_to_next_statement = 10
paid = 45_000
fc = bill * 0.45 * days_purchase_to_payment / 365 + (bill - paid) * 0.45 * days_payment_to_next_statement / 365
print(f"Bill Rs {bill:,}, pay Rs {paid:,} on the due date, leave Rs {bill - paid:,}:")
print(f"  finance charge Rs {fc:,.0f} + GST Rs {fc * GST:,.0f} = Rs {fc * (1 + GST):,.0f} on next statement")
print(f"  i.e. {fc * (1 + GST) / (bill - paid) * 100:.0f}% of the Rs {bill - paid:,} you left unpaid, for one month")

print("\n== Losing the interest-free period on new spending")
spend = 20_000
avg_days = 20  # average days from a new purchase to the next statement while revolving
fc_new = spend * 0.45 * avg_days / 365
print(f"Rs {spend:,} of new monthly spending while revolving: about Rs {fc_new * (1 + GST):,.0f} a month in extra interest + GST")
