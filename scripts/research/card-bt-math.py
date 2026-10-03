"""Credit card balance transfer worked numbers (illustrative)."""
def emi(p, r, n):
    i = r / 1200; return p * i * (1 + i) ** n / ((1 + i) ** n - 1)
P = 100000
# 1. Stay revolving at 3.75%/month + 18% GST, paying 17,000/month until cleared
bal, months, paid_int = P, 0, 0
while bal > 0:
    it = bal * 0.0375 * 1.18; paid_int += it; bal = bal + it - 17000; months += 1
print(f"Revolving: {months} months, interest+GST {paid_int:,.0f}")
# 2. BT on EMI, 6 months at 16% (mid of SBI 12.5-20%), fee 1% + GST, GST on interest
e = emi(P, 16, 6); i = e * 6 - P; fee = 1000
print(f"BT on EMI 6m @16%: EMI {e:,.0f}, interest {i:,.0f}, fee {fee}, GST {0.18*(i+fee):,.0f}, total {i+fee+0.18*(i+fee):,.0f}")
for r in (12.5, 20):
    e = emi(P, r, 6); i = e * 6 - P
    print(f"  @{r}%: total {i+fee+0.18*(i+fee):,.0f}")
# 3. 0% for 60 days with an assumed 2% fee + GST, repaid in 2 months
fee = 2000; print(f"0% 60 days, 2% fee: cost {fee*1.18:,.0f} (must repay 50,000/month)")
# Trap: losing interest-free period on new spends of 30,000/month, avg 25 days of interest at 45%/yr + GST
lost = 30000 * 0.45 * 25 / 365 * 1.18
print(f"Lost interest-free period on 30,000/mo spend: ~{lost:,.0f}/month")
