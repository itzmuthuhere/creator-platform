"""Worked numbers for the home loan balance transfer draft."""
import math

def emi(p, r, n):
    i = r / 1200
    return p * i * (1 + i) ** n / ((1 + i) ** n - 1)

def months_for_emi(p, r, e):
    i = r / 1200
    return math.log(e / (e - p * i)) / math.log(1 + i)

P, old, new, n = 4_000_000, 8.9, 7.9, 180
e_old = emi(P, old, n); int_old = e_old * n - P
print(f"Old: EMI {e_old:,.0f}, interest {int_old:,.0f}")
# A: same tenure
e_a = emi(P, new, n); int_a = e_a * n - P
print(f"A same tenure: EMI {e_a:,.0f} (saves {e_old-e_a:,.0f}/mo), interest {int_a:,.0f}, saving {int_old-int_a:,.0f}")
# B: keep EMI
m_b = months_for_emi(P, new, e_old); int_b = e_old * m_b - P
print(f"B same EMI: {m_b:.1f} months ({(n-m_b):.1f} fewer), interest {int_b:,.0f}, saving {int_old-int_b:,.0f}")
# C: new lender stretches to 25 years
e_c = emi(P, new, 300); int_c = e_c * 300 - P
print(f"C 25 years: EMI {e_c:,.0f}, interest {int_c:,.0f}, vs old {int_c-int_old:+,.0f}")
# Costs
proc = 0.005 * P * 1.18; modt = 0.002 * P; legal = 10000
cost = proc + modt + legal
print(f"Costs: processing {proc:,.0f}, MODT(0.2%) {modt:,.0f}, legal/valuation {legal:,.0f}, total {cost:,.0f}")
# Break-even: first-year interest difference
bal_o = bal_n = P; cum = 0
for mth in range(1, n + 1):
    io = bal_o * old / 1200; inn = bal_n * new / 1200
    bal_o -= e_old - io; bal_n -= e_a - inn
    cum += e_old - e_a
    if cum >= cost:
        print("Break-even month (EMI saving vs cost):", mth); break
# Conversion with same bank: fee lower of 0.25% or 5000 (+GST)
conv = min(0.0025 * P, 5000) * 1.18
print(f"Conversion fee (HDFC-style): {conv:,.0f}")
# Late-stage transfer: 5 years left on same loan
bal5 = P
for mth in range(120):
    bal5 -= e_old - bal5 * old / 1200
e5o = e_old; e5n = emi(bal5, new, 60)
print(f"After 10 yrs: balance {bal5:,.0f}; remaining interest old {e5o*60-bal5:,.0f}, new {e5n*60-bal5:,.0f}, saving {(e5o-e5n)*60:,.0f}")
