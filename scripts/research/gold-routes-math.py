"""Gold routes: costs from AMFI Sep 2026 TER data and an illustrative 5-year holding.
Gold ETFs have one plan (TER in the 'regular' field); gold FoFs are compared on direct plans."""
import json, statistics as st
d = json.load(open("data/research/amfi-ter-gap-09-2026.json", encoding="utf-8"))
etf = [s for s in d["schemes"] if "gold" in s["name"].lower() and "etf" in s["name"].lower()
       and "fof" not in s["name"].lower() and "fund of fund" not in s["name"].lower()
       and "silver" not in s["name"].lower()]
fof = [s for s in d["schemes"] if "gold" in s["name"].lower() and ("fof" in s["name"].lower()
       or "fund of fund" in s["name"].lower() or s["name"].lower().endswith("gold fund"))
       and "silver" not in s["name"].lower() and "mining" not in s["name"].lower()]
print(f"Gold ETFs: n={len(etf)} median TER {st.median(s['regularTER'] for s in etf):.2f}% "
      f"range {min(s['regularTER'] for s in etf)}–{max(s['regularTER'] for s in etf)}")
print(f"Gold FoFs (direct): n={len(fof)} median TER {st.median(s['directTER'] for s in fof):.2f}%")

# Illustrative: ₹1,00,000, gold price +8%/yr for 5 years, sold after 5 years (long-term for all).
P, g, yrs = 100_000, 0.08, 5
growth = (1 + g) ** yrs
etf_val = P * growth * (1 - 0.0050) ** yrs                 # ~0.50% TER
dg_val = P / 1.03 * growth * (1 - 0.03)                   # 3% GST on buy, ~3% buy-sell spread on sale
coin_val = P / 1.03 * growth * (1 - 0.05)                 # 3% GST; assume ~5% below price when sold to a jeweller (assumption)
for name, v in [("Gold ETF", etf_val), ("Digital gold", dg_val), ("Coin (assumed 5% haircut on sale)", coin_val)]:
    gain = v - P
    tax = 0.125 * gain                                      # LTCG 12.5%, ignoring cess/surcharge
    print(f"{name}: value ₹{v:,.0f}, after 12.5% LTCG ₹{v - tax:,.0f}")
print(f"Pure gold value with no costs: ₹{P*growth:,.0f}")
