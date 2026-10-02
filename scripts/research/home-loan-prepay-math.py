"""Worked numbers for the home-loan prepayment draft (reduce EMI vs tenure).

Monthly reducing-balance loan, interest = balance * annual_rate / 12, which is
how Indian banks compute EMI-based home loans. A prepayment is applied right
after that month's EMI.
"""


def emi(principal, annual_rate, months):
    r = annual_rate / 12
    return principal * r * (1 + r) ** months / ((1 + r) ** months - 1)


def run(principal, annual_rate, months, prepay=None, mode="tenure", extra_monthly=0.0, rate_change=None):
    """Simulate a loan.

    prepay: dict {month_number: amount}
    mode: "tenure" keeps the EMI, "emi" recomputes EMI over the remaining original months
    extra_monthly: extra amount paid towards principal every month (after any EMI cut)
    rate_change: (month, new_rate, "tenure"|"emi") applied from that month
    """
    prepay = prepay or {}
    bal, rate, pay = principal, annual_rate, emi(principal, annual_rate, months)
    total_interest, m, first_pay = 0.0, 0, pay
    pays = []
    while bal > 0.5 and m < 1200:
        m += 1
        if rate_change and m == rate_change[0]:
            rate = rate_change[1]
            if rate_change[2] == "emi":
                pay = emi(bal, rate, months - m + 1)
        interest = bal * rate / 12
        principal_part = min(pay - interest, bal)
        if principal_part <= 0:
            raise ValueError("negative amortisation")
        total_interest += interest
        bal -= principal_part
        pays.append(pay)
        if m in prepay and bal > 0:
            bal -= min(prepay[m], bal)
            if mode == "emi" and bal > 0:
                pay = emi(bal, rate, months - m)
        if extra_monthly and bal > 0:
            bal -= min(extra_monthly, bal)
    return {"months": m, "interest": total_interest, "first_emi": first_pay, "last_emi": pay}


def L(x):
    return f"{x / 1e5:,.2f} lakh"


P, R, N = 50_00_000, 0.0775, 240
base = run(P, R, N)
print(f"Loan Rs 50 lakh, 7.75%, 20 years: EMI Rs {base['first_emi']:,.0f}; total interest {L(base['interest'])}")
first_interest = P * R / 12
print(f"First EMI: interest Rs {first_interest:,.0f} = {first_interest / base['first_emi'] * 100:.0f}% of the EMI")

print("\n== Rs 5 lakh prepaid after EMI 12")
t = run(P, R, N, {12: 5_00_000}, "tenure")
e = run(P, R, N, {12: 5_00_000}, "emi")
print(f"reduce tenure: {t['months']} months ({N - t['months']} fewer), interest {L(t['interest'])}, saved {L(base['interest'] - t['interest'])}")
print(f"reduce EMI: EMI Rs {e['last_emi']:,.0f} (cut Rs {base['first_emi'] - e['last_emi']:,.0f}), interest {L(e['interest'])}, saved {L(base['interest'] - e['interest'])}")

cut = base["first_emi"] - e["last_emi"]
# Reduce EMI, but pay the cut back into the loan every month from month 13
eb = run(P, R, N, {12: 5_00_000}, "emi", extra_monthly=0)
sim_bal = None
# simulate: EMI mode with extra monthly = cut starting after prepayment
def run_emi_plus_extra():
    bal, pay = P, base["first_emi"]
    ti, m = 0.0, 0
    while bal > 0.5:
        m += 1
        i = bal * R / 12
        ti += i
        bal -= min(pay - i, bal)
        if m == 12:
            bal -= 5_00_000
            pay = emi(bal, R, N - m)
        elif m > 12 and bal > 0:
            bal -= min(cut, bal)
    return m, ti
m2, i2 = run_emi_plus_extra()
print(f"reduce EMI but prepay the Rs {cut:,.0f} cut every month: {m2} months, interest {L(i2)} (vs reduce tenure {t['months']} months, {L(t['interest'])})")

print("\n== Same Rs 5 lakh, reduce tenure, at different points in the loan")
for month in (12, 60, 120, 180):
    r_ = run(P, R, N, {month: 5_00_000}, "tenure")
    print(f"after EMI {month:>3}: interest saved {L(base['interest'] - r_['interest'])}, {N - r_['months']} months fewer")

print("\n== Habits")
for label, kw in [
    ("one extra EMI every year (paid each 12th month)", {"prepay": {m: base['first_emi'] for m in range(12, N, 12)}}),
]:
    r_ = run(P, R, N, kw["prepay"], "tenure")
    print(f"{label}: {r_['months']} months ({r_['months'] / 12:.1f} y), interest saved {L(base['interest'] - r_['interest'])}")

def stepup(pct):
    bal, pay, ti, m = P, base["first_emi"], 0.0, 0
    while bal > 0.5:
        m += 1
        if m > 1 and (m - 1) % 12 == 0:
            pay *= 1 + pct
        i = bal * R / 12
        ti += i
        bal -= min(pay - i, bal)
    return m, ti
for pct in (0.05, 0.10):
    m_, ti_ = stepup(pct)
    print(f"raise the EMI {pct * 100:.0f}% every year: {m_} months ({m_ / 12:.1f} y), interest saved {L(base['interest'] - ti_)}")

print("\n== Rate rises 0.5 point after 2 years (from EMI 25)")
k = run(P, R, N, rate_change=(25, 0.0825, "tenure"))
k2 = run(P, R, N, rate_change=(25, 0.0825, "emi"))
print(f"bank keeps EMI, extends tenure: {k['months']} months (+{k['months'] - N}), interest {L(k['interest'])}")
print(f"borrower raises EMI to Rs {k2['last_emi']:,.0f} (+{k2['last_emi'] - base['first_emi']:,.0f}): {k2['months']} months, interest {L(k2['interest'])}")
print(f"extra interest from extending vs raising EMI: {L(k['interest'] - k2['interest'])}")

print("\n== Old tax regime: interest vs the Rs 2 lakh deduction cap")
def yearly_interest(prepay, mode):
    bal, pay, out, m = P, base["first_emi"], [], 0
    yi = 0.0
    while bal > 0.5 and m < N:
        m += 1
        i = bal * R / 12
        yi += i
        bal -= min(pay - i, bal)
        if m in prepay:
            bal -= prepay[m]
            if mode == "emi":
                pay = emi(bal, R, N - m)
        if m % 12 == 0:
            out.append(yi)
            yi = 0.0
    return out
yi_base = yearly_interest({}, "tenure")
yi_pre = yearly_interest({12: 5_00_000}, "tenure")
for y in (1, 2, 5, 8, 10, 12):
    print(f"year {y}: interest {yi_base[y-1]:,.0f} no prepay, {yi_pre[y-1]:,.0f} after Rs 5L prepay")
first_below = next(i + 1 for i, v in enumerate(yi_pre) if v < 2_00_000)
print(f"after prepaying, yearly interest first drops below Rs 2 lakh in year {first_below}")
