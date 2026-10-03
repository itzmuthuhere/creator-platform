"""Card EMI vs personal loan cost comparison (illustrative rates from HDFC pages, Sep 2026)."""
def emi(p, r, n):
    i = r / 1200; return p * i * (1 + i) ** n / ((1 + i) ** n - 1)
def cost(p, r, n, fee, gst_on_interest):
    e = emi(p, r, n); interest = e * n - p
    gst = 0.18 * fee + (0.18 * interest if gst_on_interest else 0)
    return e, interest, fee, gst, interest + fee + gst
cases = [("Card EMI 18.2% (HDFC avg), fee 999", 18.2, 999, True),
         ("Card EMI 12% offer, fee 999", 12.0, 999, True),
         ("Personal loan 10.89% (HDFC avg), fee 3000", 10.89, 3000, False),
         ("Personal loan 16%, fee 3000", 16.0, 3000, False)]
for amt, n in ((150000, 12), (40000, 6)):
    print(f"--- {amt:,} over {n} months")
    for name, r, fee, g in cases:
        e, i, f, gst, tot = cost(amt, r, n, fee, g)
        print(f"{name}: EMI {e:,.0f}, interest {i:,.0f}, fee {f:,}, GST {gst:,.0f}, total cost {tot:,.0f}")
# Revolving at 3.75%/month for comparison: pay same EMI as card EMI 18.2% case for 12 months
bal = 150000; pay = emi(150000, 18.2, 12); tot_int = 0
for m in range(12):
    it = bal * 0.0375; tot_int += it * 1.18; bal = bal + it * 1.18 - pay
print(f"Revolving 45%/yr +GST paying {pay:,.0f}/mo: balance after 12 months {bal:,.0f}, interest+GST {tot_int:,.0f}")
