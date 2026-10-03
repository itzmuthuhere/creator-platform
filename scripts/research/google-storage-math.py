"""How fast 15 GB fills, and Google One cost per GB (regular India prices per Digit, Dec 2025:
Lite 30 GB ₹708/yr, Basic 100 GB ₹1,560/yr, Premium 2 TB ₹7,800/yr).
Assumed sizes (illustrative): phone photo ~3 MB in Storage saver/original mix; 1 min 1080p video ~130 MB."""
photo_mb, video_min_mb = 3, 130
photos_per_month, video_min_per_month = 150, 20
monthly_gb = (photos_per_month*photo_mb + video_min_per_month*video_min_mb)/1024
print(f"Monthly Photos growth: {monthly_gb:.1f} GB -> 12 GB free space lasts {12/monthly_gb:.1f} months")
print(f"Videos share: {video_min_per_month*video_min_mb/(photos_per_month*photo_mb+video_min_per_month*video_min_mb):.0%}")
for name, gb, price in [("Lite 30 GB",30,708),("Basic 100 GB",100,1560),("Premium 2 TB",2048,7800)]:
    print(f"{name}: ₹{price}/yr = ₹{price/12:.0f}/month, ₹{price/gb:.1f} per GB per year")
