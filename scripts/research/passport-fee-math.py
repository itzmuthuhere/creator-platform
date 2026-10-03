"""Passport fees from 1 July 2026 (Passports (Amendment) Rules, 2026): adult 36p ₹2,500 (was ₹1,500), 60p ₹3,500 (was ₹2,000);
minor 36p ₹1,750 (was ₹1,000); Tatkaal adult 36p ₹5,000; 10% off for children below 8 (fresh only)."""
fam_new = 2*2500 + round(1750*0.9) + 1750
fam_old = 2*1500 + round(1000*0.9) + 1000
print("Family of four (2 adults, child of 6, child of 12), normal 36p:")
print(f"  new ₹{fam_new:,} vs old ₹{fam_old:,} (+₹{fam_new-fam_old:,})")
print(f"Tatkaal premium for one adult: ₹{5000-2500:,}")
print(f"Adult 60p vs 36p: +₹{3500-2500:,}")
