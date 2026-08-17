# TechPulzo — Scheduled & Draft Content Publication Decision

**Date:** August 16, 2026
**Scope:** All content in the database not yet publicly live — the 87 `SCHEDULED` posts queued to auto-publish August 15 – November 9, 2026, and the 0 true `DRAFT` posts (none exist; see §0.1).
**Objective:** Determine, article by article, whether the current auto-publish queue should be allowed to go live as-is, and prevent low-value content from automatically becoming public.
**Input:** [`01-forensic-audit.md`](01-forensic-audit.md) and its full per-article dataset, [`/data/articles.csv`](../data/articles.csv) — the completed content inventory. This report does not re-read article bodies; it re-classifies the audit's existing per-article findings into a publication-decision framework.
**Output:** This report, plus [`/data/scheduled-decisions.csv`](../data/scheduled-decisions.csv) (one row per scheduled article: URL, title, category, scheduled date, quality score, original audit action, decision, reason).
**Action taken:** None. No article was edited, merged, published, or deleted in the course of producing this report. Classification only, per the brief.

---

## 0. Scope and method

### 0.1 "Scheduled and draft" — what's actually in scope

The forensic audit found **0 posts in a true `DRAFT` state** (created but never published or scheduled) — every non-live post in the database is either `SCHEDULED` (87, will auto-publish on a set date) or `UNPUBLISHED` (5, previously published or drafted, then pulled). This report covers the **87 `SCHEDULED` articles**, since those are the ones actually at risk of "automatically becoming public" — the objective stated in the brief. The 5 `UNPUBLISHED` posts are not on an auto-publish path and are out of scope here; they were already assessed individually in `articles.csv` (avg. quality 2.80, the weakest cohort on the site) and would need a separate, deliberate decision to ever schedule them.

### 0.2 From the audit's actions to a publication decision

The forensic audit scored every article 1–10 and assigned one of six *content-quality* actions (`KEEP`, `IMPROVE`, `MERGE`, `MAJOR REWRITE`, `HOLD FROM PUBLICATION`, `REMOVE`). Those actions describe what's wrong with the writing. This report answers a narrower, more operational question for the 87 scheduled articles specifically: **what happens to this article's scheduled publish date, and why**, using six dispositions:

1. **Keep scheduled** — meets the bar as-is; let the existing date stand.
2. **Hold** — do not publish or rewrite yet; a specific external fact needs verifying, or a cluster-wide decision needs making first.
3. **Rewrite before publication** — the topic and structure are sound; it needs real sourcing, specificity, evidence, or trimming before it goes live.
4. **Rebuild** — the topic is sound but the current draft's structure, premise, or core claim is broken in a way editing alone won't fix (a factual error at the article's premise, a title that promises content the body never delivers, an unattributed rehash of someone else's named framework, or a central claim asserted with zero supporting data).
5. **Merge with another article** — this article's content should not exist as a separate published page; fold it into a named counterpart (published or scheduled).
6. **Cancel publication** — not used for any scheduled article (see §0.3).

Every one of the 87 scheduled articles was individually mapped from its audit record to one of these six, using the audit's quality score, recommended action, duplication/cannibalization findings, sourcing findings, and notes — not re-derived from scratch. The full reasoning per article is in §3 and in `scheduled-decisions.csv`.

### 0.3 Why "Cancel publication" has zero scheduled articles

The audit's one `REMOVE`-flagged article (`what-is-artificial-intelligence-simple-explanation-for-beginners`, textbook-generic AI explainer with no unique value) is **not** in the scheduled queue — checking its status in `articles.csv` confirms it sits elsewhere (unpublished/other), so it isn't a scheduling decision this report needs to make. No scheduled article scored low enough, or was redundant enough on top of an already-planned merge, to justify outright cancellation rather than repair or consolidation — the queue's problems are overwhelmingly *fixable* (padding, missing sourcing, self-competition), not *worthless*. That is itself a finding: the 87-article queue does not need to be gutted, it needs to be slowed down and reworked.

---

## 1. Headline numbers

| Decision | Count | % of scheduled queue |
|---|---|---|
| Rewrite before publication | 54 | 62% |
| Merge with another article | 18 | 21% |
| Rebuild | 8 | 9% |
| Keep scheduled | 4 | 5% |
| Hold | 3 | 3% |
| Cancel publication | 0 | 0% |

**Only 4 of the 87 scheduled articles (5%) are ready to publish on their current date as-is.** The other 83 (95%) need some form of intervention — from a light citation pass to a ground-up rebuild — before they should go live. This closely tracks the parent audit's finding that the scheduled cohort averages 5.01/10 with zero articles scoring above 7.

---

## 2. What to pay attention to — findings against the specific risk list

### 2.1 Generic AI explanations / no original information

This is the dominant pattern across the 54 **Rewrite** and 8 **Rebuild** articles, not an edge case. Recurring, independently-flagged signatures in the scheduled cohort specifically:
- **Extreme H2 padding**: `how-to-use-google-alerts-to-track-anything-automatically` (21 sections for a 5–6-section topic), `how-to-use-google-lens-for-more-than-just-translating-text` (21 sections), `how-to-back-up-your-phone-so-a-lost-device-does-not-cost-you-your-photos` and `how-to-verify-a-company-is-real-before-accepting-a-job-offer` (19 each), `how-to-turn-a-spreadsheet-into-a-simple-budget-tracker` and `how-to-transfer-whatsapp-chats-to-a-new-phone-without-losing-history` (20 each) — all for topics that need roughly a quarter as many sections.
- **Unattributed reuse of someone else's named framework as original advice** — a more serious variant of genericness, not just padding: `how-to-build-a-second-brain-with-just-notes-and-folders-no-app-needed` restates the PARA method without naming it; `the-two-minute-rule-for-getting-through-a-long-to-do-list` restates David Allen's GTD rule without crediting GTD. Both routed to **Rebuild** (§3.3) rather than a citation-only fix, because presenting borrowed intellectual property as original site advice is an originality problem, not a sourcing gap.
- **Zero-testing product/technical explanations presented with confident specificity**: `power-bank-buying-guide`, `ssd-vs-hdd-for-a-budget-laptop`, `smartwatch-buying-guide`, `how-much-ram-you-actually-need-in-a-laptop-in-2026` — all technically accurate, all entirely unverified by any actual product testing (see §2.7).

### 2.2 Repetitive topics / similar keywords (cannibalization)

**56 of the 87 scheduled articles (64%)** carry a cannibalization flag against another specific article — either another scheduled piece or an already-published one. The clearest clusters, each named to specific counterparts, are laid out in §3.2 (the 18-article Merge table). Beyond outright merge candidates, several **Rewrite** articles sit in looser but still real overlap that the audit didn't flag as duplication-grade but that this report surfaces as a spacing/differentiation risk:
- Three WhatsApp how-tos (transfer, second number, recover-deleted) scheduled within an 8-day window.
- Two laptop-component guides (SSD vs HDD, RAM) answering the same "what matters most in a budget laptop" query back-to-back.
- A growing scam/security-detection cluster (phishing links, fake loan apps, UPI fraud warning signs, VPN protections, password reuse) that individually pass but collectively risk the exact "many pages, same query" pattern Google's spam guidance describes.

### 2.3 Articles with unsupported claims

Flagged individually throughout §3, but the sharpest cases:
- `best-time-of-year-to-buy-electronics-in-india` asserts which sale window has "the deepest and widest discount window" with **zero** supporting price data anywhere in the piece → **Rebuild**.
- `prepaid-vs-postpaid-mobile-plans-which-actually-costs-less-over-a-year` is titled as a cost comparison and contains **not a single price or number**, including in its own decision table → **Rebuild**.
- `how-to-negotiate-your-broadband-or-dtv-bill-down` states a "10–20% discount authority ceiling" for retention staff as fact with no source.
- `how-to-actually-stick-to-a-morning-routine` states an unsourced cortisol/physiology claim with unwarranted confidence.
- `how-to-turn-off-ads-in-free-android-apps` makes confident legal claims (copyright infringement, ToS violation) with zero citation to actual Indian law, despite the article's entire premise being a legal distinction → **Rebuild**.

### 2.4 Little information gain

The majority of the 54 **Rewrite** articles are individually accurate but collectively interchangeable with any generic answer on the topic — the audit's own language recurs across this cohort: "entirely generic," "typical mid-tier AI-mill output," "interchangeable with any generic productivity blog post," "no unique data, screenshots, or India-specific angle to justify standalone existence over a good AI answer" (`what-end-to-end-encrypted-actually-means-for-an-app-you-use-daily`, itself one of the *better*-scored articles in the queue at 6/10). This is the queue's central problem: not factual errors, but a near-total absence of anything a search engine — or a reader — couldn't already get from a generic AI answer.

### 2.5 Outside TechPulzo's strongest topical areas

The audit's own benchmark for "genuinely good" content (§2.7 of the parent audit) is concrete, India-grounded technical/consumer explainers with a measurable detail (Wi-Fi signal loss in Mbps, TDS numbers for water purifiers, the identical-twins Face ID caveat). Measured against that benchmark, the scheduled Productivity cluster (weekly reviews, task batching, inbox organization, morning routines, the two-minute rule) is the weakest topical area in the queue — generic self-help voice, no India-specific grounding, and the site's only unattributed-framework problems (§2.1) both live here. This isn't a topic TechPulzo has demonstrated it covers distinctively; the Productivity cluster accounts for 3 of the queue's 8 Rebuild decisions and its 3 lowest quality scores (all 3/10) despite being only 8 of 87 articles.

### 2.6 Written solely because the topic is trending

No article in the scheduled queue carries an explicit trend hook (no "in 2026" news-jacking, no reaction-to-an-event framing) — the two "2026"-dated titles (`free-vs-paid-antivirus-in-2026`, `how-much-ram-you-actually-need-in-a-laptop-in-2026`) are evergreen buying-guide framing, not trend-chasing. This risk factor did not surface as a distinct problem in the scheduled cohort.

### 2.7 Potentially sensitive financial claims

Beyond the Finance-category articles already routed to Rewrite for generic reasons, three articles carry a **specific YMYL (Your Money or Your Life) risk** the audit flagged explicitly — confident, uncited claims about tax/legal thresholds that a reader could act on financially:
- `how-to-read-a-loan-apr-instead-of-just-the-emi` — states processing-fee and prepayment-penalty ranges with no RBI circular or lender citation.
- `how-to-handle-being-laid-off-the-first-two-weeks` — every regulatory claim (EPF withdrawal taxability, gratuity eligibility, IRDAI portability) is uncited.
- `how-to-download-your-digital-driving-licence-on-digilocker` — states legal equivalence under the IT Act and Motor Vehicles Act with no citation.

All three are tagged `SENSITIVE FINANCIAL/LEGAL CLAIMS` in `scheduled-decisions.csv` and routed to **Rewrite before publication** with a specific citation requirement, not just a general polish pass. The GST-portal URL error in `how-to-verify-a-company-is-real-before-accepting-a-job-offer` (§2.6 of the parent audit) is the most severe instance of this pattern and is routed to **Rebuild**.

### 2.8 Product reviews without actual testing

Every Reviews-category and buying-guide-style article in the scheduled queue was checked for first-hand testing evidence; **none show any** — no article claims false hands-on testing, but none demonstrate it either. This is a "quiet" gap rather than a false claim: `power-bank-buying-guide`, `smartwatch-buying-guide`, `ssd-vs-hdd-for-a-budget-laptop`, `chrome-vs-firefox-vs-edge`, `free-vs-paid-antivirus-in-2026`, and `prepaid-vs-postpaid-mobile-plans` all present buying/comparison advice grounded in published specs rather than anything measured by the site. All are routed to Rewrite (or Rebuild for `prepaid-vs-postpaid`, where the gap is total — zero prices anywhere) with a requirement to add real product/price grounding, not a demand for retroactive testing claims.

### 2.9 "Best X" articles without a documented methodology

Only one scheduled title uses "Best" framing: `best-time-of-year-to-buy-electronics-in-india` — and it is the single weakest article in the entire scheduled queue by the audit's own assessment, making comparative claims with zero supporting data of any kind. Routed to **Rebuild**. No scheduled article is a "Best N products" list, so the more common version of this risk (an unranked or untested product list dressed as a ranked "best of") does not appear in this queue — worth confirming it doesn't reappear if new Reviews-category content is drafted later.

---

## 3. Full classification, by decision

### 3.1 Keep scheduled (4 articles)

All four are Reviews-category buying guides scored 6/10 — the top tier of the scheduled cohort — with no duplication or cannibalization flags and genuine India-specific grounding (TDS numbers, society/façade AC-installation rules, slab electricity billing). These match the site's own "genuinely good" benchmark from the parent audit (§2.7) and should not be delayed pending the rest of the queue's rework.

| Title | Scheduled Date | Category | Quality Score | Reason |
|---|---|---|---|---|
| Inverter vs UPS for Home Power Backup — What Is the Real Difference | 2026-11-02 | Reviews | 6 | One of the stronger pieces in the batch — genuinely clarifies a common India-relevant confusion with correct technical distinctions, even without named sources. No duplication or cannibalization flagged. |
| RO vs UV Water Purifier — Which One Your Water Actually Needs | 2026-11-05 | Reviews | 6 | Concrete decision framework tied to a measurable number (TDS) rather than vague generalities, appropriate for Indian groundwater/municipal-supply variation. |
| How to Choose Between a Split AC and a Window AC for a Small Room | 2026-11-07 | Reviews | 6 | Genuinely India-specific structural details (society rules, façade restrictions), though still lacks real pricing data a full buying guide should have. |
| How to Reduce Your Electricity Bill Without Changing Your Lifestyle Much | 2026-11-09 | Finance | 6 | Best India-localization in the batch (slab billing, geysers, rooftop solar subsidy mentions) even without a named board/tariff citation. |

### 3.2 Merge with another article (18 articles)

Publishing these as separate pages would put the site in direct competition with itself for the same queries. Eight distinct clusters; in three (subscriptions, spam calls, phone-storage cleanup) both sides are scheduled and one is named as the canonical survivor.

| Title | Scheduled Date | Category | Quality Score | Reason |
|---|---|---|---|---|
| How to Cancel a Subscription You Forgot You Had | 2026-08-22 | Finance | 6 | Canonical survivor of this pair; absorb "Five Recurring Charges Most People Forget to Cancel" into it (near-identical statement-scan / Play Store–App Store / UPI Autopay methodology). |
| Five Recurring Charges Most People Forget to Cancel | 2026-08-26 | Finance | 5 | Merge into scheduled "How to Cancel a Subscription You Forgot You Had"; do not publish both. |
| How to Handle a Counteroffer From Your Current Employer | 2026-09-04 | Career | 4 | Fold into the already-published "How to Negotiate Your Salary in India: What Actually Works"; states an unsourced "leaves within a year" statistic and is one of three overlapping negotiation pieces scheduled together. |
| Beyond Salary: The Other Parts of a Job Offer Worth Negotiating | 2026-09-07 | Career | 5 | Fold into the published salary-negotiation article; only the ESOP-mechanics section is genuinely distinct. |
| How to Ask for a Raise Without a New Offer in Hand | 2026-09-08 | Career | 5 | Strongest of the three negotiation pieces (names Levels.fyi/AmbitionBox/Glassdoor); fold into the published article, or use as the scheduled survivor absorbing the other two. |
| What Applicant Tracking Systems Really Do With Your Resume | 2026-09-09 | Career | 6 | Mechanically the strongest article in its batch but substantially overlaps the published "How to Write a Resume That Actually Gets Shortlisted." Merge as an ATS-mechanics section. |
| How to Register a Complaint Against Spam Calls With TRAI | 2026-09-16 | Tech | 5 | Merge into scheduled "How to Stop Spam Calls and SMS on an Indian SIM" (the more comprehensive of the pair); both walk through the same DND/1909 process. |
| How to Check Your CIBIL Score for Free, Legally | 2026-09-17 | Finance | 5 | Fold into the published "Credit Score in India: How It Works and How to Fix It" as a section. |
| How to Free Up Storage on Your Phone Without Deleting Photos You Want | 2026-09-22 | Tech | 4 | Merge into scheduled "Digital Decluttering: How to Clean Up Years of Phone Photos and Files" (higher quality score, same methodology). |
| How to Stop Spam Calls and SMS on an Indian SIM — The Settings That Actually Help | 2026-09-23 | Tech | 5 | Canonical survivor of this pair (adds carrier/phone-level filtering on top of DND); absorbs the TRAI-complaint article. |
| Digital Decluttering: How to Clean Up Years of Phone Photos and Files | 2026-10-07 | Tech | 5 | Canonical survivor of this pair; absorbs the "Free Up Storage" article. |
| How to Set Boundaries With Work Messages After Hours | 2026-10-09 | Productivity | 5 | Shares the exact tag set and category with scheduled "How to Say No to Extra Work Without Damaging the Relationship"; fold into that article. |
| How to Build a Habit That Survives a Bad Week | 2026-10-10 | Productivity | 5 | Merge into scheduled "How to Actually Stick to a Morning Routine" — that article is itself flagged Rebuild and needs fixing before it can absorb this content. |
| Two-Factor Authentication Explained: Which Method Is Actually Safest | 2026-10-12 | Tech | 6 | Strongest technical piece in its batch, but directly overlaps the published "How Two-Factor Authentication Actually Stops the Most Common Account Hacks." Merge as an update, not a new page. |
| How to Spot a Fake Job Offer Sent Over WhatsApp or Telegram | 2026-10-15 | Career | 6 | Merge into scheduled "How to Verify a Company Is Real Before Accepting a Job Offer" — that article is flagged Rebuild (incorrect GST portal URL) and should be corrected first. |
| Wired vs Wireless Earbuds: What You Actually Give Up Either Way | 2026-10-21 | Reviews | 5 | Directly competes with the already-published earbuds buying guide; fold into "How to Choose Budget Wireless Earbuds Under ₹2000." |
| How to Extend Your Wi-Fi Router Range Without Buying a New One | 2026-10-31 | Tech | 4 | Substantially overlaps the published, higher-quality "Why Your Wi-Fi Feels Slow in Certain Rooms" (one of the site's five benchmark 7/10 articles). |
| How to Extend a Phone Battery Lifespan Over Years, Not Just a Day | 2026-11-06 | Tech | 5 | Competes directly with the published battery-chemistry explainer for the same search intent. Merge as a practical-tips section. |

### 3.3 Rebuild (8 articles)

These need more than editing — a factual error at the core premise, a promise the content never delivers on, an unattributed rehash of someone else's named framework, or a central claim asserted with zero data. Two (parental controls, GST verification) are the highest-priority items in this entire report: one has a live credibility risk, the other completely fails to deliver its promised how-to.

| Title | Scheduled Date | Category | Quality Score | Reason |
|---|---|---|---|---|
| How to Set Up Parental Controls Without Making a Teenager Furious | 2026-08-21 | Tech | 4 | Promise/delivery mismatch: a reader searching "how to set up parental controls" gets relationship advice with zero actual setup steps for Family Link/Screen Time. |
| How to Verify a Company Is Real Before Accepting a Job Offer | 2026-09-18 | Career | 4 | States the GST verification portal as services.gst.in — the real domain is services.gst.gov.in — a factual error at the center of a fraud-prevention article whose entire premise is helping readers avoid being misled by wrong domains. Also 19 H2 sections for a 4-point checklist with no worked example. |
| How to Turn Off Ads in Free Android Apps — What Is Legal and What Is Not | 2026-09-28 | Tech | 4 | Makes confident legal claims (copyright infringement, ToS violation) with zero citation to actual Indian copyright or IT law, despite the article's entire premise being a legal distinction. |
| How to Build a Second Brain With Just Notes and Folders, No App Needed | 2026-10-01 | Productivity | 3 | Presents the well-known PARA method as original, uncredited advice — an originality/attribution problem, not a polish problem. |
| How to Actually Stick to a Morning Routine, Based on What Derails Most People | 2026-10-02 | Productivity | 3 | States an unsourced cortisol/physiology claim with unwarranted confidence; lowest quality score in the scheduled queue. Also the designated merge target for "How to Build a Habit That Survives a Bad Week." |
| The Two-Minute Rule for Getting Through a Long To-Do List | 2026-10-03 | Productivity | 3 | Reproduces David Allen's well-known GTD "two-minute rule" without crediting GTD or Allen, presented as original site advice. |
| Best Time of Year to Buy Electronics in India: What the Sales Calendar Shows | 2026-10-25 | Finance | 4 | Weakest scheduled article overall: asserts which sale window has "the deepest and widest discount window" with zero supporting price data, named example, or past sale event anywhere. |
| Prepaid vs Postpaid Mobile Plans: Which Actually Costs Less Over a Year | 2026-10-27 | Reviews | 4 | Titled as a cost comparison and contains not a single price or number anywhere, including its own decision table. |

### 3.4 Hold (3 articles)

Not a quality verdict — these need a specific external input (a live fact-check against a government portal/tool, or a cluster-wide decision about which of several near-identical pieces survive) before anyone should invest in rewriting them.

| Title | Scheduled Date | Category | Quality Score | Reason |
|---|---|---|---|---|
| How to Find a Lost Android Phone Even When It Is Offline | 2026-09-27 | Tech | 6 | Strongest India-specific grounding in the batch (Sanchar Saathi, DoT, IMEI dial code), but the audit explicitly flags that these government-portal requirements need a currency check before publishing. |
| How to Check If Your Phone Number Was Leaked in a Data Breach | 2026-09-30 | Tech | 6 | Most specifically-sourced article in the batch (named tools and government portals), but HIBP's phone-search feature and the cited portals need a fact-check pass for currency before a September 2026 publish date. |
| How to Run a Weekly Review That Actually Changes What You Do | 2026-10-04 | Productivity | 4 | Part of a large cluster of near-identical generic productivity how-tos scheduled back-to-back; hold pending a cluster-level decision on which of these survive as standalone pages. |

### 3.5 Rewrite before publication (54 articles)

The bulk of the queue: sound topics and structurally reasonable pieces that are currently too generic, too padded, or too thinly sourced to clear the bar the site needs to clear. Sorted by current scheduled date. Entries tagged `SENSITIVE FINANCIAL/LEGAL CLAIMS` (see §2.7) carry an explicit citation requirement, not just a general polish note.

| Title | Scheduled Date | Category | Quality Score | Reason |
|---|---|---|---|---|
| How to Use Google Alerts to Track Anything Automatically | 2026-08-15 | Tech | 4 | Sound topic and accurate mechanics, but 21 H2 sections (roughly 4x what a Google Alerts walkthrough needs) and zero screenshots of the actual setup screen. |
| How to Turn a Spreadsheet Into a Simple Budget Tracker | 2026-08-16 | Finance | 4 | Never shows an actual SUMIF formula, screenshot, or downloadable template. Also cannibalizes `zero-based-budgeting-how-to-build-a-budget-that-actually-works`. |
| Free vs Paid Antivirus in 2026 — Do You Need to Pay | 2026-08-17 | Reviews | 5 | Names AV-Test/AV-Comparatives but cites no actual score, date, or link — a "borrowed credibility" pattern. |
| How to Back Up Your Phone So a Lost Device Does Not Cost You Your Photos | 2026-08-18 | Tech | 4 | 19 H2 sections for a topic that needs about 6; core 4-step backup process is accurate but generic. |
| How to Compress a Large File Without Losing Quality | 2026-08-19 | Tech | 5 | Structurally sound but entirely generic — needs named tools, real test numbers, or screenshots. |
| Chrome vs Firefox vs Edge — Does the Browser You Pick Actually Matter | 2026-08-20 | Reviews | 5 | Reasonable framing but needs actual measured comparisons (RAM under N tabs, extension gaps). |
| The Real Cost of Buy Now Pay Later — What the Fine Print Does Not Say | 2026-08-23 | Finance | 6 | Genuine insight on bureau-reporting risk; would benefit from one real, named late-fee figure. |
| Credit Card vs Debit Card for Everyday Spending — What Actually Saves You Money | 2026-08-24 | Finance | 5 | Correct conceptually, but every numeric range needs a named card or issuer example. |
| How to Track Where Your Salary Actually Goes Every Month | 2026-08-25 | Finance | 5 | Competes directly with two other site articles for the same budgeting-tracker search intent. |
| How Cashback Apps Actually Make Money Off You | 2026-08-27 | Finance | 6 | Genuinely insightful breakage/float explanation, but names zero actual cashback apps. |
| How to Negotiate Your Broadband or DTH Bill Down | 2026-08-28 | Finance | 6 | Tactically specific, but no named provider (Jio, Airtel, ACT, Tata Play, Dish TV) in a piece entirely about negotiating with one. |
| The Real Difference Between a Fixed Deposit and a Recurring Deposit | 2026-08-29 | Finance | 6 | Best math-based reasoning in the batch, but leaves the ₹1,20,000 worked example and the TDS threshold incomplete. |
| How Much of Your Salary Should Actually Go to Rent | 2026-08-30 | Finance | 6 | Genuinely India-grounded (HRA/old-vs-new regime), but should cite the actual tax provision. |
| How to Read a Loan APR Instead of Just the EMI | 2026-08-31 | Finance | 5 | **Sensitive financial claims.** YMYL content with unsourced numeric claims (processing fees, penalties) — needs RBI-circular or lender citation. |
| How to Find Freelance Work in India Without Bidding to the Bottom | 2026-09-01 | Career | 4 | Generic marketplace advice, no case study; Wise/Payoneer fees never given real numbers. Overlaps with companion portfolio article. |
| How to Write a Portfolio That Gets Replies When You Have No Client Work Yet | 2026-09-02 | Career | 4 | 18 H2 sections built on scripted dialogue rather than a real portfolio example or screenshot. |
| Remote Work vs Hybrid vs Office: How Each Setup Shapes Your Career Growth | 2026-09-03 | Career | 5 | Least padded, most focused article in the batch; a real survey citation would meaningfully strengthen it. |
| How to Build a LinkedIn Profile That Recruiters Actually Find | 2026-09-05 | Career | 5 | Genuine keyword-search framing, but claims about current LinkedIn behavior are unverified. |
| How to Answer "Why Are You Leaving Your Current Job" Honestly and Well | 2026-09-06 | Career | 4 | Template/script content plus an unsupported cultural claim about Indian interview norms. |
| How to Handle Being Laid Off: The First Two Weeks | 2026-09-10 | Career | 6 | **Sensitive financial claims.** Most India-specific article in the batch, but every regulatory claim (EPF, gratuity, IRDAI) is uncited — YMYL-adjacent risk. |
| How to Link Aadhaar and PAN Online — Step by Step | 2026-09-11 | Finance | 6 | Most transactionally useful article in the batch, but lacks screenshots and a "last verified" date for portal details that change. |
| How to Check Your EPF Balance Without Visiting an Office | 2026-09-12 | Finance | 5 | Accurate core 4-step process, but ~15 of 20 H2 sections are generic padding. |
| How to Download Your Digital Driving Licence on DigiLocker | 2026-09-13 | Tech | 5 | **Sensitive financial/legal claims.** Legally load-bearing claims (IT Act equivalence, police acceptance) stated with no citation. |
| How to File a Consumer Complaint Online in India | 2026-09-14 | Finance | 6 | Useful, correct jurisdiction table, but surrounded by heavy generic padding. |
| How to Get a Duplicate PAN Card Online | 2026-09-15 | Finance | 4 | Explicitly hedges its own fee numbers as possibly outdated — undercuts the article's main reason to exist. |
| How to Report a Fraudulent UPI Transaction and Actually Get Your Money Back | 2026-09-19 | Finance | 5 | Omits the actual RBI liability tiers/timeframes — the single most useful data point for this topic. |
| How to Check If Your Vehicle Challan Is Real or a Scam | 2026-09-20 | Finance | 5 | Practically useful core advice, padded with invented-scenario filler. |
| How to Recover Deleted WhatsApp Messages and Photos — What Actually Works | 2026-09-21 | Tech | 6 | Most technically specific article in its batch, but padded and ends with a duplicated closing sentence (a generation artifact). |
| How to Transfer WhatsApp Chats to a New Phone Without Losing History | 2026-09-24 | Tech | 5 | 20 H2 headers escalating into speculative edge cases; core menu-path steps need verification against a current WhatsApp build. |
| How to Use Google Lens for More Than Just Translating Text | 2026-09-25 | Tech | 4 | Reads like restated Google marketing copy; no personal testing or India-specific angle. |
| How to Set Up a Second WhatsApp Number on One Phone | 2026-09-26 | Tech | 5 | Manufacturer dual-app naming is the only substantive detail. One of three WhatsApp how-tos scheduled in the same window — space out or differentiate. |
| How to Screen Record on Android Without a Third-Party App | 2026-09-29 | Tech | 5 | Accurate DRM/ADB details, but an unsupported claim about call-recording consent law needs citing or cutting; zero screenshots for a highly visual topic. |
| How to Say No to Extra Work Without Damaging the Relationship | 2026-10-05 | Productivity | 4 | No India-specific workplace context. Also the merge target for "How to Set Boundaries With Work Messages After Hours." |
| How to Organize Your Email Inbox in Under 30 Minutes | 2026-10-06 | Productivity | 5 | 20 H2 sections over 1,532 words reads as programmatic long-tail expansion. |
| How to Batch Small Tasks So They Stop Interrupting Deep Work | 2026-10-08 | Productivity | 5 | Presents invented-sounding precise numbers as if measured; needs sourcing or reframing as illustrative. |
| How to Tell If a Link Is a Phishing Scam Before You Click It | 2026-10-11 | Tech | 6 | Strong India-specific technical detail, but unsourced beyond naming CERT-In, and sits in a growing scam-detection cluster. |
| How to Check What Personal Data Google Has on You (And Delete It) | 2026-10-13 | Tech | 6 | Genuinely useful and accurate, weakened mainly by excessive keyword-driven padding. |
| What a VPN Actually Protects You From, and What It Does Not | 2026-10-14 | Tech | 6 | Factually grounded (correctly-dated CERT-In regulation), but unsourced beyond that one citation. |
| Why You Should Not Reuse Passwords: What Happens When One Site Gets Breached | 2026-10-16 | Tech | 6 | Technically solid, but would benefit from an actual current breach statistic rather than just naming a checking tool. |
| How to Set Up a Password Manager in 15 Minutes | 2026-10-17 | Tech | 5 | Useful step-by-step content undermined by extreme H2 fragmentation — nearly half the article is padding after the real tutorial ends. |
| How UPI Fraud Actually Happens: The Five Warning Signs | 2026-10-18 | Finance | 5 | Factually sound and India-appropriate, but thin per-section depth; cannibalizes the fraud-recovery article (prevention vs. recovery angle). |
| What End-to-End Encrypted Actually Means for an App You Use Daily | 2026-10-19 | Tech | 6 | Clearest, most conceptually useful article in the batch, but still fully generic with no India-specific angle. |
| How to Recognize a Fake Loan App Before It Drains Your Bank Account | 2026-10-20 | Finance | 6 | Most India-regulation-specific and actionable article in the batch, but lacks a concrete example (a real app name, an RBI list screenshot). |
| Power Bank Buying Guide: What the mAh Number Does Not Tell You | 2026-10-22 | Reviews | 5 | Reasonably useful technical explanation, entirely generic and unverified by any actual product testing. |
| How to Tell If a Deal Price Online Is Actually a Discount | 2026-10-23 | Finance | 5 | Longest article in the batch by word count, but never names a single actual tool, product, or price. |
| SSD vs HDD for a Budget Laptop: Where the Money Should Actually Go | 2026-10-24 | Reviews | 5 | Technically sound but fully generic; forms an unplanned-looking competing pair with the RAM article. |
| How to Spot a Refurbished Phone Listed as New | 2026-10-26 | Tech | 6 | Most concretely actionable, India-specific piece in the batch (CEIR + IMEI + battery health), but no first-hand demonstration or real device example. |
| How Much RAM You Actually Need in a Laptop in 2026 | 2026-10-28 | Tech | 5 | Reasonably current framing, but no measured data; competing pair with the SSD/HDD article. |
| Smartwatch Buying Guide: Which Features Are Worth Paying Extra For | 2026-10-29 | Reviews | 5 | Technically correct feature breakdown, entirely price-and-product-free despite being a spend-your-money-wisely buying guide. |
| How to Check a Product's Real Reviews Instead of Fake Ones | 2026-10-30 | Reviews | 5 | Practically sound checklist, but entirely generic advice-farm content — needs at least one named platform/example. |
| How to Tell If Your Internet Plan Is Actually Giving You the Speed You Pay For | 2026-11-01 | Tech | 5 | Solid procedural bones, but needs named tools and a real documented example. |
| How Often You Should Actually Clean Your Laptop Fans | 2026-11-03 | Tech | 4 | Genuinely thin (852 words) dressed up as 10 H2 sections. |
| How to Set Up a Smart Plug and What It Is Actually Useful For | 2026-11-04 | Tech | 5 | Correctly diagnoses a real common setup failure (band mismatch), but otherwise generic — needs named products/brands. |
| How to Set Up a Home Wi-Fi Guest Network, and Why You Should | 2026-11-08 | Tech | 5 | The "isolation setting vs. just a second SSID" point is genuinely useful; the rest is generic padding. |

---

## 4. Recommended sequencing

This report classifies; it does not schedule remediation work. But three things are worth flagging for whoever does:

1. **The two Rebuild items with the earliest scheduled dates carry real risk if missed**: `how-to-set-up-parental-controls-without-making-a-teenager-furious` (2026-08-21) and `how-to-verify-a-company-is-real-before-accepting-a-job-offer` (2026-09-18, contains the incorrect GST portal URL flagged in the parent audit §2.6). Both should be pulled from the auto-publish path well before their dates regardless of when the rest of the queue is addressed.
2. **The three "Hold" articles are cheap to resolve** — they need a fact-check pass or a one-time cluster decision, not a rewrite — and could be cleared quickly relative to the 54-article Rewrite backlog.
3. **The 18 Merge decisions should be executed before their earliest scheduled date** (`how-to-cancel-a-subscription-you-forgot-you-had`, 2026-08-22) to avoid a period where both a scheduled article and its merge target are live simultaneously and directly competing.

No changes have been made to any article, schedule, or publication state. This report and `scheduled-decisions.csv` are inputs for a separate, explicit remediation decision.
