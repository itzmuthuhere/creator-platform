"""Worked numbers for the direct-vs-regular mutual fund draft.

All returns are annual, compounded monthly for SIPs (instalment at the start
of each month). Expense ratios are deducted from the gross return, which is
how the NAV reflects them.
"""


def sip_fv(monthly, annual_return, years):
    r = (1 + annual_return) ** (1 / 12) - 1
    fv = 0.0
    for _ in range(years * 12):
        fv = (fv + monthly) * (1 + r)
    return fv


def lump_fv(amount, annual_return, years):
    return amount * (1 + annual_return) ** years


def lakh(x):
    return f"{x / 1e5:,.2f} lakh"


print("== 1. Zerodha's example: Rs 15,000/month, 20 years, 9.5% vs 10.5% net")
reg = sip_fv(15000, 0.095, 20)
dir_ = sip_fv(15000, 0.105, 20)
print(f"regular {lakh(reg)}  direct {lakh(dir_)}  gap {lakh(dir_ - reg)}  invested {lakh(15000*240)}")

print("\n== 2. Same SIP with gaps measured in AMFI Sep 2026 data; gross 12%, direct TER 1.0%")
for gap in (0.5, 1.1, 1.25):
    d_ter = 0.010  # median direct TER of active equity funds, AMFI Sep 2026
    d = sip_fv(15000, 0.12 - d_ter, 20)
    r = sip_fv(15000, 0.12 - d_ter - gap / 100, 20)
    print(f"gap {gap:.2f}%: direct {lakh(d)} regular {lakh(r)} difference {lakh(d - r)} ({(d - r) / d * 100:.1f}% of direct corpus)")

print("\n== 3. Share of the final corpus lost to a TER gap, lump sum")
for years in (10, 20, 30):
    for gap in (0.5, 1.1):
        net = 0.11
        share = 1 - ((1 + net - gap / 100) / (1 + net)) ** years
        print(f"{years}y gap {gap}%: lose {share * 100:.1f}% of the corpus")

print("\n== 4. Commission in rupees on an existing Rs 10 lakh regular holding")
for gap in (0.5, 1.1):
    print(f"gap {gap}%: Rs {10e5 * gap / 100:,.0f} this year")

print("\n== 5. Switch tax: Rs 8 lakh regular holding, Rs 2.6 lakh LTCG, all units > 12 months")
gain = 260000
exempt = 125000
cess = 1.04
one_go = (gain - exempt) * 0.125 * cess
print(f"switch everything in one financial year: tax Rs {one_go:,.0f}")
# Staged: Rs 1.25 lakh of gains in March, the rest after 1 April
second = gain - exempt
print(f"staged over two financial years: year 1 gain {exempt:,} -> Rs 0; year 2 gain {second:,} -> Rs {max(0, second - exempt) * 0.125 * cess:,.0f}")
annual_saving = 800000 * 0.011
print(f"saving per year at a 1.1% gap on Rs 8 lakh: Rs {annual_saving:,.0f}; one-go tax recovered in {one_go / annual_saving:.1f} years")
