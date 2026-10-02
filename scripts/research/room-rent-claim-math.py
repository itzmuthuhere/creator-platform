"""Worked claim for the health-insurance limits draft.

Policy: Arogya Sanjeevani-style terms, sum insured Rs 5 lakh:
room rent up to 2% of SI, max Rs 5,000/day; proportionate deduction if a
costlier room is taken; 5% co-pay on the admissible amount.
IRDAI's June 2020 norms: proportionate deduction may apply only to defined
"associated medical expenses", never to pharmacy/consumables, implants/devices,
diagnostics, or ICU charges.
The bill split is illustrative.
"""

limit = 5_000
room_per_day = 8_000
days = 4
bill = {
    "Room": room_per_day * days,
    "Doctor, surgeon, OT and nursing (room-linked)": 90_000,
    "Medicines and consumables": 45_000,
    "Diagnostics": 20_000,
    "Non-medical items (not payable)": 3_000,
}
ratio = limit / room_per_day
total = sum(bill.values())
print(f"Bill Rs {total:,}; eligible room Rs {limit:,}/day, chosen Rs {room_per_day:,}/day -> ratio {ratio:.3f}")

payable = {
    "Room": bill["Room"] * ratio,
    "Doctor, surgeon, OT and nursing (room-linked)": bill["Doctor, surgeon, OT and nursing (room-linked)"] * ratio,
    "Medicines and consumables": bill["Medicines and consumables"],
    "Diagnostics": bill["Diagnostics"],
    "Non-medical items (not payable)": 0,
}
for k in bill:
    print(f"  {k:<48} billed Rs {bill[k]:>7,}  admissible Rs {payable[k]:>9,.0f}")
adm = sum(payable.values())
copay = adm * 0.05
print(f"Admissible Rs {adm:,.0f}; 5% co-pay Rs {copay:,.0f}; insurer pays Rs {adm - copay:,.0f}; you pay Rs {total - (adm - copay):,.0f}")

old = (total - bill["Non-medical items (not payable)"]) * ratio
print(f"\nIf the whole bill were cut proportionately (as some explainers describe): admissible Rs {old:,.0f}, insurer pays Rs {old * 0.95:,.0f}, you pay Rs {total - old * 0.95:,.0f}")

# Same stay in an eligible Rs 5,000 room; assume room-linked charges scale with room (hospitals tier them)
eligible_bill = {
    "Room": limit * days,
    "room-linked": bill["Doctor, surgeon, OT and nursing (room-linked)"] * ratio,
    "meds": 45_000, "diag": 20_000, "nonmed": 3_000,
}
t2 = sum(eligible_bill.values())
adm2 = t2 - 3_000
print(f"\nIn an eligible Rs {limit:,} room (room-linked charges tiered down): bill Rs {t2:,.0f}, insurer pays Rs {adm2 * 0.95:,.0f}, you pay Rs {t2 - adm2 * 0.95:,.0f}")

print("\nCataract sub-limit: 25% of SI or Rs 40,000, whichever is lower")
for cost in (35_000, 65_000):
    adm = min(cost, 40_000)
    pay = adm * 0.95
    print(f"  surgery Rs {cost:,}: insurer pays Rs {pay:,.0f}, you pay Rs {cost - pay:,.0f}")
