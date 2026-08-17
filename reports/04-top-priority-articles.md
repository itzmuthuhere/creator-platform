# TechPulzo — Top Priority Articles

**Date:** August 17, 2026
**Scope:** The first 20 articles (of 137) that should receive editorial attention, ranked P1/P2/P3.
**Inputs:** [`01-forensic-audit.md`](01-forensic-audit.md), [`04-content-survival-plan.md`](04-content-survival-plan.md), [`content-decisions.csv`](../data/content-decisions.csv), and `fact-check.csv` (claim-level verification pass).
**This is a ranking, not new decisions.** Every article below already has a `recommended_action` from the survival plan; nothing here changes that. This report answers a narrower question: of 137 articles needing some action, which 20 should a human editor look at first, and why?

**Ranking logic.** P1 = act within days — a live factual/legal error on a page readers can see right now, or a SCHEDULED article whose auto-publish date is close enough that missing it means the error goes live. P2 = act soon — real, well-scoped work with no immediate deadline, usually because it blocks a MERGE that depends on it, or because a fact-check pass surfaced a concrete, dated correction. P3 = the best of the rest — near-KEEP articles where a single well-defined fix is the entire remaining gap, so they're worth doing next purely for the fast return.

Today's date for scheduling purposes: **2026-08-17.**

---

## P1 — Act within days (7 articles)

### 1. How to Set Up Parental Controls Without Making a Teenager Furious
`(not live) /how-to-set-up-parental-controls-without-making-a-teenager-furious` · SCHEDULED for **2026-08-21 — 4 days from today** · REBUILD · Score 4

**Why it's #1:** this is the single most time-pressured item in the entire catalog. It's scheduled to auto-publish in four days, and the forensic audit found it delivers relationship advice with **zero actual setup steps** — a "how to set up parental controls" article that never explains how to set up parental controls. Either pull it from the schedule now or rebuild it with real Family Link/Screen Time steps and screenshots before 2026-08-21.

### 2. Credit Score in India: How It Works and How to Fix a Bad One
`https://techpulzo.in/credit-score-in-india-how-it-works-and-how-to-fix-it` · **PUBLISHED — live now** · REBUILD · Score 4

**Why it matters:** this page is live and presents what appears to be the US FICO weighting model as if it were CIBIL's own scoring criteria — a factual error at the center of a financial-literacy article, visible to readers today. It's also the canonical target for the CIBIL-free-check MERGE (survival plan §2.5, Group 7), so this fix unblocks that merge too.

### 3. How HTTPS Actually Works — Behind the Padlock
`https://techpulzo.in/how-https-actually-works-behind-the-padlock` · **PUBLISHED — live now** · KEEP · Score 6

**Why it's here despite being a KEEP:** the fact-check pass found its certificate-validity claim is now stale — CA/Browser Forum's maximum certificate lifetime dropped, and the article states an outdated figure. This doesn't change the KEEP verdict (the article is otherwise sound), but it's a live, dated factual claim on a published page, and it's a five-minute fix — high value for near-zero effort.

### 4. SIP vs Lump Sum: How to Actually Decide Where to Put Your Money
`https://techpulzo.in/sip-vs-lump-sum-how-to-actually-decide-where-to-put-your-money` · **PUBLISHED — live now** · IMPROVE · Score 5

**Why it matters:** a live, published financial-decision article that omits the current LTCG rate/threshold (12.5% above ₹1.25L) — the single number a reader needs to actually run the comparison this article promises. It also asserts "lump sum historically outperforms" without a source. This is YMYL content currently missing its own load-bearing number.

### 5. How to Verify a Company Is Real Before Accepting a Job Offer
`(not live) /how-to-verify-a-company-is-real-before-accepting-a-job-offer` · SCHEDULED for **2026-09-18 — 32 days out** · REBUILD · Score 4

**Why it matters:** cites the wrong GST portal domain (`services.gst.in` instead of the real `services.gst.gov.in`) at the center of a fraud-prevention article — the exact kind of error that actively misleads a reader trying to protect themselves from a scam. It's also the canonical target for the WhatsApp/Telegram job-scam MERGE (§2.5, Group 12), so fixing it unblocks that merge.

### 6. How to Find a Lost Android Phone Even When It Is Offline
`(not live) /how-to-find-a-lost-android-phone-even-when-it-is-offline` · HOLD, scheduled **2026-09-27 — 41 days out** · Score 6

**Why it's a HOLD, not an IMPROVE:** genuinely one of the stronger scheduled pieces (real Sanchar Saathi/DoT IMEI-blocking detail), but government-portal requirements change, and this needs a currency check before it goes live rather than after. Cheapest possible fix — verify, don't rebuild — with real runway before the deadline.

### 7. How to Check If Your Phone Number Was Leaked in a Data Breach
`(not live) /how-to-check-if-your-phone-number-was-leaked-in-a-data-breach` · HOLD, scheduled **2026-09-30 — 44 days out** · Score 6

**Why it's here:** the most-sourced article in its batch, blocked only on confirming Have I Been Pwned's phone-search feature and the cited government portals are still current. Same logic as #6 — a cheap, well-scoped verification with time to do it properly before the scheduled date.

---

## P2 — Real work, no immediate deadline (7 articles)

### 8. How UPI Fraud Actually Happens: The Five Warning Signs
`(not live) /how-upi-fraud-actually-happens-the-five-warning-signs` · SCHEDULED for **2026-10-18** · IMPROVE · Score 5

**Why it matters:** the fact-check pass surfaced something the original audit couldn't have known — NPCI discontinued person-to-person UPI Collect Requests in October 2025, specifically to curb the exact collect-request scam pattern this article describes as a live threat. The underlying warning ("scanning a QR / entering a PIN is never how you receive money") still holds, but the scam mechanism needs updating before this publishes, or it will describe an attack vector that's already been closed off.

### 9. Best Budget Smartphones Under ₹15,000 in 2026 — Complete Buying Guide
`https://techpulzo.in/top-5-budget-smartphones-of-2026-full-buying-guide` · **PUBLISHED — live now** · MAJOR REWRITE · Score 4

**Why it matters:** a live "2026" buying guide recommending phones that launched in 2024, with no acknowledgment of newer models — a freshness problem visible to any reader comparing this against current listings.

### 10. How to Choose Budget Wireless Earbuds Under ₹2,000 — What Actually Matters
`https://techpulzo.in/how-to-choose-budget-wireless-earbuds-under-2000-what-actually-matters` · **PUBLISHED — live now** · MAJOR REWRITE · Score 5

**Why it matters:** live buying-guide content that never names a single real brand, model, or price in a segment (boAt, Noise, Realme) intensely dominated by a handful of names — the core promise of a buying guide is unmet. It's also the canonical target for the wired-vs-wireless MERGE (§2.5, Group 13), so this rebuild unblocks that merge.

### 11. How to Say No to Extra Work Without Damaging the Relationship
`(not live) /how-to-say-no-to-extra-work-without-damaging-the-relationship` · SCHEDULED for **2026-10-05** · MAJOR REWRITE · Score 4

**Why it matters:** no genuine India workplace-hierarchy context in an article about workplace boundaries — generic Western advice on a topic where that gap is exactly what would make it distinctive. It's the canonical target absorbing the after-hours-boundaries MERGE (§2.5, Group 9).

### 12. How to Actually Stick to a Morning Routine, Based on What Derails Most People
`(not live) /how-to-actually-stick-to-a-morning-routine-based-on-what-derails-most-people` · SCHEDULED for **2026-10-02** · REBUILD · Score 3

**Why it matters:** an unsourced cortisol/physiology claim stated with unwarranted confidence — a health-adjacent claim with no citation. It's the canonical target for the habit-resilience MERGE (§2.5, Group 10).

### 13. Best Free AI Tools in 2026 — Complete Guide
`(not live) /best-free-ai-tools-in-2026-complete-guide` · UNPUBLISHED · MAJOR REWRITE · Score 3

**Why it matters:** the fact-check pass found the article's "ChatGPT resets every three hours" claim is now stale — OpenAI removed that rolling-window structure as of the week of August 10, 2026. This is on top of the original audit's finding of zero actual testing and undated limits across all five tools. It's the canonical target absorbing the near-duplicate "10 Hours a Week" draft (§2.5, Group 1) — nothing in this cluster should publish until real, current testing replaces the guesswork.

### 14. How to Negotiate Your Salary in India — What Works
`https://techpulzo.in/how-to-negotiate-your-salary-in-india-what-actually-works` · **PUBLISHED — live now** · IMPROVE · Score 6

**Why it matters:** live and already one of the stronger articles on the site, but it states an unverified "several Indian states ban salary-history questions" claim as fact. It's the canonical target absorbing three other scheduled negotiation drafts (§2.5, Group 4) — fixing this one claim unblocks all three.

---

## P3 — Fast, well-scoped wins (6 articles)

### 15. How to Cancel a Subscription You Forgot You Had
`(not live) /how-to-actually-cancel-a-subscription-you-forgot-you-had` · SCHEDULED · IMPROVE · Score 6

Already the strongest article in its cluster (a genuinely specific three-place audit method); needs its NACH cancellation-timeline claim sourced. It's the canonical target for the earliest-scheduled MERGE pair on the calendar (§2.5, Group 3) — cheap fix, immediate payoff.

### 16. Google Sheets vs Excel — Which One Actually Fits How You Work
`https://techpulzo.in/google-sheets-vs-excel-which-one-actually-fits-how-you-work` · **PUBLISHED — live now** · IMPROVE · Score 5

The fact-check pass returned exact numbers to close this gap: Microsoft 365 Personal is ₹689/month (₹6,899/year), Family is ₹819/month (₹8,199/year, up to 6 people). This is a live comparison article missing the one figure its own argument depends on, and the fix is now a copy-paste away.

### 17. Notion vs Google Docs — What Each One Is Actually Built For
`https://techpulzo.in/notion-vs-google-docs-what-each-one-is-actually-built-for` · **PUBLISHED — live now** · IMPROVE · Score 5

Same pattern as #16: the fact-check pass supplied current Notion free-tier limits (block-count cap once a workspace has multiple members, 5MB file cap, 10 guests, 7-day page history) and paid-tier pricing. It's the canonical target for the Notion three-way MERGE (§2.5, Group 16).

### 18. How to Link Aadhaar and PAN Online — Step by Step
`(not live) /how-to-link-aadhaar-and-pan-online-step-by-step` · SCHEDULED · IMPROVE · Score 6

The most transactionally useful and concrete scheduled article (correct portal, fee, correction channels). Needs screenshots and a "last verified" date — the kind of detail that changes over time and should be marked, not a structural problem.

### 19. How to File a Consumer Complaint Online in India
`(not live) /how-to-file-a-consumer-complaint-online-in-india` · SCHEDULED · IMPROVE · Score 6

Has a genuinely useful, correct jurisdiction table (District/State/National complaint thresholds) that most competing content doesn't bother to include. The fact-check pass flagged one specific citation update: reference "RBI Integrated Ombudsman Scheme, 2021" instead of the older Banking Ombudsman framing.

### 20. How to Recognize a Fake Loan App Before It Drains Your Bank Account
`(not live) /how-to-recognize-a-fake-loan-app-before-it-drains-your-bank-account` · SCHEDULED · IMPROVE · Score 6

The most India-regulation-specific and actionable scam-prevention piece in its batch. It just needs one concrete example — a real fake-app name or an RBI-list screenshot — to move from generic synthesis to something a reader can actually act on.

---

## What's not on this list, and why

This list deliberately excludes REMOVE, NOINDEX, and most MERGE-away articles (the ones being absorbed into a canonical survivor) — none of those need urgent human attention, since the correct action for most of them is simply *don't publish this one separately*, not *fix it fast*. The full disposition for all 137 articles, including these, is in [`04-content-survival-plan.md`](04-content-survival-plan.md) and [`content-decisions.csv`](../data/content-decisions.csv).
