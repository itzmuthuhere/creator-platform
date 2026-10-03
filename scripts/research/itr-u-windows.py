"""Open ITR-U years and additional-tax band as of a given date (old-Act years).
Window: 48 months from end of the assessment year; bands 25/50/60/70% by 12-month steps."""
from datetime import date
today = date(2026, 10, 3)
for fy in range(2020, 2026):
    ay_end = date(fy + 2, 3, 31)          # FY fy-(fy+1) -> AY ends 31 Mar fy+2
    months = (today.year - ay_end.year) * 12 + (today.month - ay_end.month)
    deadline = date(ay_end.year + 4, 3, 31)
    if today <= ay_end:
        band = "AY not over (belated/revised till 31 Dec 2026)"
    elif months > 48:
        band = "closed"
    else:
        band = {0: "25%", 1: "50%", 2: "60%", 3: "70%"}[(months - 1) // 12]
        next_step = date(ay_end.year + ((months - 1) // 12) + 1, 3, 31)
        band += f" until {next_step}"
    print(f"FY {fy}-{str(fy+1)[2:]} (AY {fy+1}-{str(fy+2)[2:]}): deadline {deadline}, now {band}")
# Example: extra tax + interest of 20,000
for r in (25, 50, 60, 70):
    print(r, 20000 * r // 100, 20000 + 20000 * r // 100)
