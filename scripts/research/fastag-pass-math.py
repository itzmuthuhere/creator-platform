"""FASTag Annual Pass break-even. Pass: ₹3,075 for 1 year or 200 trips (FY 2026-27, NHAI).
A 'trip' = one crossing at a point-based plaza; one entry-exit pair on closed tolling."""
PASS = 3075
print(f"Cost per trip if all 200 used: ₹{PASS/200:.2f}")
for toll in (50, 80, 100, 150):
    print(f"Avg toll ₹{toll}: break-even at {PASS/toll:.0f} crossings a year; 200 crossings would cost ₹{200*toll:,}")
# Example commuter: 2 NH plazas each way, 2 round trips a month -> 8 crossings/month
crossings = 2 * 2 * 2 * 12
for toll in (80,):
    print(f"Weekend-trip example: {crossings} crossings/yr at ₹{toll} = ₹{crossings*toll:,} vs pass ₹{PASS:,}")
# Daily commuter through one plaza twice a day, 22 days/month
daily = 2 * 22
print(f"Daily commuter: {daily} crossings/month -> 200 trips used in {200/daily:.1f} months")
# Non-FASTag penalties on a ₹100 toll
print("Non-FASTag on ₹100 toll: cash ₹200, UPI ₹125")
