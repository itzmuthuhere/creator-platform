# TechPulzo — Content Survival Plan

**Date:** August 16, 2026 (merge detail, KEEP/REBUILD/MAJOR REWRITE rationale, and companion CSV schema expanded August 17, 2026)
**Prepared by:** Editorial Director (final content disposition pass)
**Scope:** Every one of the 137 articles in the database — 45 PUBLISHED, 87 SCHEDULED, 5 UNPUBLISHED.
**Inputs (ground truth, not re-derived):** [`01-forensic-audit.md`](01-forensic-audit.md) + [`articles.csv`](../data/articles.csv) (full per-article rubric assessment, all 137 rows), [`02-scheduled-content-decision.md`](02-scheduled-content-decision.md) + [`scheduled-decisions.csv`](../data/scheduled-decisions.csv) (publication-timing disposition for the 87 scheduled articles), and `fact-check.csv` (claim-level verification pass, referenced where it changes a disposition).
**Output:** This report, plus [`content-decisions.csv`](../data/content-decisions.csv) — one row per article with id, url, title, status, category, current_author, current_word_count, recommended_action, quality_score, originality_score, factual_risk, information_gain_score, first_hand_experience_potential, duplicate_risk, cannibalization_risk, reason, required_human_input, target_article_if_merge, and priority — and [`04-top-priority-articles.md`](04-top-priority-articles.md), ranking the 20 articles needing attention first.

---

## 1. Who this is for, and the method

This is the final editorial verdict — not another audit pass. The two prior reports independently scored every article (average 5.01/10, zero articles at 8+) and, for the 87 scheduled articles, assigned a publication-timing disposition. Neither made a final, forced KEEP/MERGE/REMOVE-style call using a single taxonomy across the *entire* catalog. That is this report's job: every article gets **exactly one** of eight verdicts — KEEP, IMPROVE, MAJOR REWRITE, REBUILD, MERGE, REMOVE, NOINDEX, or HOLD — decided against the strict standard below, with no article left ambiguous.

**The standard applied, per article:** does it have a clear audience, satisfy a real user need, provide meaningful information, contain accurate (or correctable) claims, have sufficient depth, have useful differentiation from other content (on-site and generically available), have a realistic path to becoming genuinely valuable, and fit TechPulzo's actual editorial strength — India-grounded, concrete, practical content with a measurable detail, the register the forensic audit identified in the site's five benchmark 7/10 articles?

Being published, having traffic, having taken time to produce, or having been AI-generated are **not** reasons to keep something. Consolidation and deletion are treated as good outcomes, not failures — the forensic audit's own findings (near-universal padding, near-total absence of sourcing or first-hand experience, 69% cannibalization rate, a bulk-production signature) are used here as real evidence against survival, not background color. A "competent but generic" 5/10 article does **not** default to IMPROVE just because IMPROVE is the softest available verdict — it gets IMPROVE only when it has a genuine, currently-underdeveloped differentiating hook (a specific number, a real India-specific detail, working code, a fixable citation gap) *and* a well-scoped path to it. Where the gap is structural — no hook at all, or a topic this site's productivity vertical has never demonstrated a distinctive angle on — the honest verdict is MAJOR REWRITE, MERGE, REMOVE, or NOINDEX instead.

Every cluster identified in the two prior reports (best-free-AI-tools, salary-negotiation, Notion comparisons, forgotten-subscriptions, spam-calls, phone-storage-cleanup, credit-score, resume/ATS, 2FA, WiFi-range, battery-lifespan, job-offer-verification/WhatsApp-scam, earbuds, the Productivity cluster) is resolved below to a single named canonical survivor, with every other member of the cluster routed to MERGE against it (or REMOVE where absorption would be pointless).

**HOLD** is used for exactly 2 articles — both blocked on an external fact-check (government-portal/tool currency), not as a way to defer a judgment call. Every cluster-level ambiguity the prior reports flagged as HOLD (e.g., "which productivity articles survive") is resolved to a final verdict in this report, since that decision is this report's job to make.

---

## 2. Full per-article disposition

Organized by final decision. Every article appears exactly once. Full detail (Category, Status, Quality Score, Reason, Merge Target) is in [`content-decisions.csv`](../data/content-decisions.csv); the tables below are the same 137 rows, grouped for readability.

### 2.1 KEEP — 16 articles (meets the bar as-is)

Each of these already clears the bar: a real audience need, genuine (not generic) content, no active factual error, and no unresolved cannibalization. None require sourcing repairs or structural rework — what's listed under "Minor improvement" is optional polish, not a precondition for staying published.

| Title | Status | Score | Why it already has sufficient value | Minor improvement only |
|---|---|---|---|---|
| Git and GitHub for Complete Beginners | Published | 6 | Real, technically accurate command syntax and correct Git internals — more substantive than most of the catalog. | Add one screenshot of a real merge-conflict resolution. |
| How to Prepare for a Technical Interview (Freshers) | Published | 7 | Benchmark article — a specific, sustained interviewer-perspective insight, not generic advice. | None needed; optionally add one more concrete failure-mode example. |
| Voice Access: Control Your Android Phone With Just Your Voice | Published | 6 | Specific, plausible first-hand detail (one-handed use while cooking) on a narrow, non-cannibalized topic. | Cross-link to other accessibility-feature content once it exists. |
| Docker for Complete Beginners | Published | 6 | Real, correct Docker commands and a working Dockerfile — genuinely substantive. | Add a short Docker Compose note for multi-container setups. |
| Why Your Wi-Fi Feels Slow in Certain Rooms | Published | 7 | The site's strongest article — real physics, measured Mbps figures. Canonical merge target for router-range content. | None beyond absorbing the router-range merge (§2.5, Group 14). |
| How Database Indexes Actually Work | Published | 6 | Genuine composite-index/EXPLAIN ANALYZE walkthrough beyond the generic phone-book analogy. | Add one real before/after query-timing number. |
| How HTTPS Works | Published | 6 | Accurate certificate-trust walkthrough with a real site-specific touch. | Add one simple diagram of the handshake. |
| How Facial Recognition Unlock Actually Works | Published | 7 | Benchmark article — cites Android's BiometricPrompt classes and Apple's documented twin-spoofing caveat. | Periodic currency check on Android API version references. |
| How Your Phone Knows Your Location Even With GPS Off | Published | 7 | Benchmark article — correct India-specific 112 emergency-bypass detail. | Periodic currency check on carrier/regulatory specifics. |
| How Autocorrect Actually Decides What You Meant to Type | Published | 7 | Benchmark article — concrete examples and a genuine Hindi code-switching detail. | Add one more regional-language example. |
| How Streaming Quality Adjusts Automatically | Published | 6 | Specific, accurate adaptive-bitrate explanation; clean of duplication. | Cross-link to the Wi-Fi article for the network-side half of the story. |
| How Your Phone's Fast Charging Works | Published | 6 | Genuine mechanism-specific (CC/CV curve) explanation, distinct from the battery-degradation article. | Add a small table of common charger wattages by phone tier. |
| Inverter vs UPS for Home Power Backup | Scheduled | 6 | Genuinely clarifies a common India-relevant confusion with correct technical distinctions. | Add an approximate price-range table. |
| RO vs UV Water Purifier | Scheduled | 6 | Concrete decision framework tied to a measurable number (TDS). | Add approximate annual maintenance/filter-replacement cost. |
| Split AC vs Window AC for a Small Room | Scheduled | 6 | Genuinely India-specific structural detail (society rules, façade restrictions). | Add approximate installation cost figures. |
| How to Reduce Your Electricity Bill Without Changing Your Lifestyle Much | Scheduled | 6 | Best India-localization in its batch (slab billing, geysers, solar subsidy mentions). | Link to an appliance-specific consumption reference if/when one exists on-site. |

### 2.2 IMPROVE — 66 articles (sound core, needs sourcing/specificity/trimming)

| Title | Status | Score | Reason |
|---|---|---|---|
| Top 5 Free Online Courses That Can Get You a Job in 2026 | Published | 5 | Genuinely India-specific angle (NPTEL, AWS salary framing) undercut by an unattributed Coursera completion-rate statistic that needs sourcing or removal. |
| Complete Guide to Getting a Software Job in India Without a Degree | Published | 6 | One of the more India-specific and concrete pieces on the site; the salary tables and 'I've sat in on interviews' claims need real sourcing to hold up. |
| How to Save ₹1 Lakh in One Year on a ₹30,000 Salary | Published | 4 | Concrete milestone math is sound and distinct from the site's other budgeting pieces; remove the fabricated-sounding 'hundreds of people' statistic and the generic chai anecdote. |
| Zero-Based Budgeting: A Practical Guide to Giving Every Rupee a Job | Published | 5 | Coherent India-context budgeting method article; canonical survivor for the site's budgeting-tracker cluster, absorbing the redundant salary-tracking article — needs real named app examples and heavy H2 trimming. |
| Time Blocking: A Step-by-Step Guide to Scheduling Your Day Around Real Priorities | Published | 4 | Miscategorized under Tech; needs recategorizing to Productivity and trimming since its own subsections currently pre-empt two other productivity articles' entire topics. |
| How to Build an Emergency Fund From Scratch, Whatever Your Income | Published | 5 | Reasonable milestone framing; interest-rate and return figures are stated with unearned authority and need sourcing. |
| How to Write a Resume That Gets Shortlisted | Published | 5 | Canonical survivor for the resume/ATS merge pair; the before/after bullet table is a genuine asset, but the unsourced 'six second scan' statistic needs a citation or removal. |
| SQL Basics: The Queries Every Beginner Should Know | Published | 6 | Real, runnable, correct SQL code — genuinely more concrete than most of the catalog — but its own indexing section pre-empts the dedicated database-indexes article and needs trimming/cross-linking. |
| How to Speed Up a Slow Android Phone in 2026 — Without Buying a New One | Published | 5 | No actual measured before/after speed data despite being a performance article; its own storage-cleanup section should be trimmed and cross-linked to the canonical decluttering article rather than duplicated. |
| Google Drive vs OneDrive vs iCloud in 2026 — Which Cloud Storage Fits You | Published | 5 | Reasonable ecosystem-fit comparison undermined by unverified, undated storage-tier and pricing figures that are exactly the kind of detail a comparison article needs to get right. |
| How to Negotiate Your Salary in India — What Works | Published | 6 | Canonical survivor for the four-article salary-negotiation cluster (absorbing the counteroffer, non-salary-levers, and ask-for-a-raise articles); needs the unverified 'several Indian states' salary-history-ban claim fact-checked. |
| Is an MBA Worth It in India in 2026 — The Real Math | Published | 5 | Worked break-even math is a genuinely useful framework, but every rupee figure is an unsourced estimate that needs grounding in real 2026 placement data. |
| How Much Home Loan You Can Afford — The Math Banks Don't Show You | Published | 5 | Useful FOIR-vs-real-affordability framework undercut by unsourced rate figures reused verbatim from another article in the same batch, a templating signature that needs fixing with real sourcing. |
| Why Your Phone Battery Degrades Over Time — The Real Chemistry Behind It | Published | 5 | Canonical survivor for the battery-degradation cluster (absorbing the scheduled 'extend battery lifespan' article); the first-hand battery-check anecdote conspicuously omits the one number it claims to have checked — fix that and source the degradation figures. |
| Buying vs Leasing a Car in India — The Math Most People Get Wrong | Published | 5 | Genuine attempt at worked numbers, but reuses the same vague-relative-anecdote template and interest-rate figure as sibling articles; needs real lender/leasing-company sourcing. |
| How Your Bank Sends an OTP in Under Two Seconds | Published | 6 | The most India-specific piece in its cluster (DLT/TRAI/SMPP regulatory detail); needs the regulatory claims cited to a specific circular. |
| Google Sheets vs Excel — Which One Fits How You Work | Published | 5 | Reasonable comparison missing real INR Microsoft 365 pricing despite discussing cost as a deciding factor for an Indian audience — a concrete, fixable gap. |
| Notion vs Google Docs — What Each One Is Actually Built For | Published | 5 | Canonical survivor of the two on-site 'Notion vs X' comparisons; needs real INR pricing and an actual migration test rather than generic feature description. |
| How to Use Google Alerts to Track Anything Automatically | Scheduled | 4 | 21 H2 sections (roughly 4x what the topic needs) and zero screenshots of the actual setup screen; mechanically accurate and fixable with a trim and real UI images. |
| Free vs Paid Antivirus in 2026 — Do You Need to Pay | Scheduled | 5 | Names AV-Test/AV-Comparatives but cites no actual score, date, or link — a borrowed-credibility pattern fixable with one real citation. |
| How to Back Up Your Phone So a Lost Device Does Not Cost You Your Photos | Scheduled | 4 | 19 H2 sections for a topic needing about 6; the core 4-step backup process is accurate and just needs trimming and an India-specific detail. |
| How to Compress a Large File Without Losing Quality | Scheduled | 5 | Structurally sound and factually reasonable but generic; needs named tools and real test numbers to justify its own 40-70% size-reduction claim. |
| Chrome vs Firefox vs Edge — Does the Browser You Pick Actually Matter | Scheduled | 5 | Reasonable four-axis framing needs actual measured comparisons (RAM under N tabs, real extension gaps) instead of generic assertion. |
| How to Cancel a Subscription You Forgot You Had | Scheduled | 6 | Canonical survivor of the forgotten-subscriptions pair; the three-place audit method (bank statement, UPI Autopay, app-store subscriptions) is genuinely more specific than a generic answer. |
| The Real Cost of Buy Now Pay Later — What the Fine Print Does Not Say | Scheduled | 6 | Genuinely useful insight on bureau-reporting risk from small BNPL purchases; one real, named late-fee figure would move this from generic to authoritative. |
| Credit Card vs Debit Card for Everyday Spending — What Actually Saves You Money | Scheduled | 5 | Conceptually correct float-period framing; every numeric range needs a named card or issuer example to be more than generic advice. |
| How Cashback Apps Actually Make Money Off You | Scheduled | 6 | The breakage/float business-model explanation is genuinely insightful; naming zero actual Indian cashback apps in a piece specifically about them is the one real gap. |
| How to Negotiate Your Broadband or DTH Bill Down | Scheduled | 6 | Tactically the most specific how-to in its batch; needs a named provider (Jio, Airtel, ACT, Tata Play) since the whole piece is about negotiating with one. |
| The Real Difference Between a Fixed Deposit and a Recurring Deposit | Scheduled | 6 | Best math-based reasoning in its batch; needs the ₹1,20,000 worked example actually finished with real maturity numbers and the current TDS threshold stated. |
| How Much of Your Salary Should Actually Go to Rent | Scheduled | 6 | Genuinely India-grounded HRA/tax-regime framing; should cite the actual Income Tax Act provision rather than describing it generically. |
| How to Read a Loan APR Instead of Just the EMI | Scheduled | 5 | YMYL finance content with unsourced processing-fee and penalty ranges — needs an RBI circular or real lender comparison before publication. |
| Remote Work vs Hybrid vs Office: How Each Setup Shapes Your Career Growth | Scheduled | 5 | The least padded, most focused article in its batch; a real survey citation on remote/hybrid promotion rates would meaningfully strengthen it. |
| How to Build a LinkedIn Profile That Recruiters Actually Find | Scheduled | 5 | The keyword-search mechanical framing is a genuine differentiator; claims about current LinkedIn recruiter behavior need verification before publishing. |
| How to Handle Being Laid Off: The First Two Weeks | Scheduled | 6 | The most India-specific and practically dense article in its batch (EPF, gratuity, IRDAI portability); every regulatory claim is uncited, a real YMYL-adjacent risk that needs fixing before publication. |
| How to Link Aadhaar and PAN Online — Step by Step | Scheduled | 6 | The most transactionally useful and concrete article in its batch (correct portal, fee, and correction channels); needs screenshots and a 'last verified' date for details that change. |
| How to Check Your EPF Balance Without Visiting an Office | Scheduled | 5 | Accurate core 4-method process; roughly 15 of its 20 H2 sections are generic padding that should be cut. |
| How to Download Your Digital Driving Licence on DigiLocker | Scheduled | 5 | Legally load-bearing claims (IT Act equivalence, police acceptance) are stated with no citation — needs a real legal source before publication. |
| How to File a Consumer Complaint Online in India | Scheduled | 6 | The jurisdiction table (District/State/National thresholds) is a genuinely useful, correct, specific data point; needs the surrounding generic padding cut. |
| How to Report a Fraudulent UPI Transaction and Actually Get Your Money Back | Scheduled | 5 | Omits the actual RBI liability tiers/timeframes despite that being the single most useful data point a reader trying to recover money would want. |
| How to Check If Your Vehicle Challan Is Real or a Scam | Scheduled | 5 | Practically useful core advice padded with invented-scenario filler that should be cut. |
| How to Recover Deleted WhatsApp Messages and Photos — What Actually Works | Scheduled | 6 | The most technically specific WhatsApp article in the queue; needs padding trimmed and its duplicated closing sentence (a generation artifact) fixed. |
| How to Stop Spam Calls and SMS on an Indian SIM — The Settings That Actually Help | Scheduled | 5 | Canonical survivor of the spam-calls pair (adds carrier/phone-level filtering on top of DND); absorbs the TRAI-complaint article and needs its own H2 padding trimmed. |
| How to Transfer WhatsApp Chats to a New Phone Without Losing History | Scheduled | 5 | 20 H2 headers escalate into speculative edge cases beyond the 5 core steps; core menu paths need verification against a current WhatsApp build. |
| How to Set Up a Second WhatsApp Number on One Phone | Scheduled | 5 | Manufacturer-specific dual-app naming is a genuinely useful detail; needs spacing/differentiation from the two other WhatsApp how-tos scheduled in the same window. |
| How to Screen Record on Android Without a Third-Party App | Scheduled | 5 | DRM/ADB technical details are accurate, but the call-recording-consent legal claim needs a citation or removal, and this highly visual topic has zero screenshots. |
| Digital Decluttering: How to Clean Up Years of Phone Photos and Files | Scheduled | 5 | Canonical survivor of the phone-storage-cleanup pair (better sequencing than its competitor); absorbs the 'free up storage' article. |
| How to Tell If a Link Is a Phishing Scam Before You Click It | Scheduled | 6 | Genuinely more specific than typical phishing content (correct padlock-doesn't-mean-ownership point, real India-relevant domain examples); needs sourcing beyond the one CERT-In citation. |
| How to Check What Personal Data Google Has on You (And Delete It) | Scheduled | 6 | Genuinely useful and currently accurate step-by-step content (correct URLs, correct 2024 Timeline on-device shift); weakened mainly by excessive keyword-driven padding, not factual problems. |
| What a VPN Actually Protects You From, and What It Does Not | Scheduled | 6 | One of the more factually grounded scheduled pieces thanks to a correctly-dated CERT-In VPN-logging citation; still unsourced beyond that one detail. |
| Why You Should Not Reuse Passwords: What Happens When One Site Gets Breached | Scheduled | 6 | Clear, technically accurate credential-stuffing mechanism explanation naming real tools (haveibeenpwned.com); would benefit from one actual current breach statistic. |
| How to Set Up a Password Manager in 15 Minutes | Scheduled | 5 | Useful step-by-step content undermined by the most extreme H2 fragmentation in its batch — nearly half the article is padding after the real seven-step tutorial ends. |
| How UPI Fraud Actually Happens: The Five Warning Signs | Scheduled | 5 | Factually sound and India-appropriate prevention-focused piece kept distinct from the recovery-focused fraud-reporting article; needs deeper, less generic per-section content. |
| How to Recognize a Fake Loan App Before It Drains Your Bank Account | Scheduled | 6 | The most India-regulation-specific and actionable scheduled article; lacks a concrete example (a real app name, an RBI list screenshot) to move past generic synthesis. |
| Power Bank Buying Guide: What the mAh Number Does Not Tell You | Scheduled | 5 | The voltage-conversion-loss explanation is a genuinely less-common useful detail; needs a real named power bank model or brand to move past generic synthesis. |
| How to Tell If a Deal Price Online Is Actually a Discount | Scheduled | 5 | Longest article in its batch by word count but not substance — never names a single actual tool, product, or price despite that being its entire premise. |
| SSD vs HDD for a Budget Laptop: Where the Money Should Actually Go | Scheduled | 5 | Technically sound storage-speed explanation; needs real benchmark numbers and should be clearly cross-linked (not merged) with the RAM article since both answer distinct budget-laptop-priority questions. |
| How to Spot a Refurbished Phone Listed as New | Scheduled | 6 | The most concretely actionable and India-specific scheduled piece (CEIR + IMEI + battery health combo); needs a real device example or first-hand demonstration. |
| How Much RAM You Actually Need in a Laptop in 2026 | Scheduled | 5 | Reasonably current Electron-bloat framing; needs real measured memory data and should be clearly cross-linked (not merged) with the SSD/HDD article covering a distinct budget-laptop question. |
| Smartwatch Buying Guide: Which Features Are Worth Paying Extra For | Scheduled | 5 | Technically correct feature breakdown entirely price-and-product-free despite being framed as a spend-your-money-wisely guide; needs real models and prices. |
| How to Check a Product's Real Reviews Instead of Fake Ones | Scheduled | 5 | Practically sound checklist that never names an actual platform despite an Indian audience shopping mostly on Amazon/Flipkart; needs at least one named example. |
| How to Tell If Your Internet Plan Is Actually Giving You the Speed You Pay For | Scheduled | 5 | Solid procedural bones need named speed-test tools and a real documented example to move past generic advice. |
| How to Set Up a Smart Plug and What It Is Actually Useful For | Scheduled | 5 | Correctly diagnoses a real common setup failure (2.4GHz/5GHz band mismatch); otherwise generic and needs named products/brands to feel substantive. |
| How to Set Up a Home Wi-Fi Guest Network, and Why You Should | Scheduled | 5 | The isolation-setting-vs-second-SSID point is genuinely useful and specific; the rest is generic padding that should be trimmed. |
| How Two-Factor Authentication Actually Stops the Most Common Account Hacks | Published | 5 | Canonical survivor for the 2FA merge pair, correctly explaining the actual credential-stuffing attack 2FA defends against; absorb the scheduled duplicate's stronger technical detail as an update. |
| Freelancing vs a Full-Time Job in India — What You're Actually Trading Off | Published | 5 | Reasonable 'adjusted total value' reframe undercut by never stating the actual GST threshold or advance-tax deadlines it references — the one section where specificity matters most. |
| SIP vs Lump Sum: How to Actually Decide Where to Put Your Money | Published | 5 | The per-installment LTCG-clock point is a genuine bright spot; needs the actual current LTCG rate/threshold (12.5% above ₹1.25L) stated and the 'lump sum historically outperforms' claim sourced. |

### 2.3 MAJOR REWRITE — 16 articles (sound topic, execution too weak to fix incrementally)

| Title | Status | Score | Why not IMPROVE | What's missing / what would make it genuinely valuable |
|---|---|---|---|---|
| Best Budget Smartphones Under ₹15,000 in 2026 | Published | 4 | Recommends 2024-launched phones with no refresh — needs new research, not a trim. | Current-generation phone models actually available at this price point in 2026, plus any hands-on or benchmark data (even a single owned-unit test) — not another spec-sheet reconstruction. |
| Best Free AI Tools in 2026 (canonical) | Unpublished | 3 | Zero testing, undated free-tier limits; needs real testing before it can ever publish. | Actual testing of each tool's free tier with dated limits, plus one genuinely differentiating observation from real use — not a restatement of each product's marketing page. |
| 10 Best Free Websites to Learn Coding in 2026 | Published | 3 | Generic aggregator with an uncorrected "2024" artifact; needs real hands-on opinions. | A real opinion on which platform to start with and why, based on actually using them, plus the "2024" excerpt artifact fixed. |
| Google Search Console Setup | Unpublished | 4 | Restates Google's docs; needs the site's own real GSC screenshots/data — a defined but substantial rebuild. | The site's own actual GSC screenshots and real indexing/query data — the one thing a generic restatement of Google's documentation can never provide. |
| Why "Just Learn to Code" Doesn't Get Freshers Hired | Published | 4 | Entire thesis rests on an unsubstantiated hiring-authority claim with zero example. | A real, named or verifiably-anonymized hiring example or data point supporting the thesis — without one, the article's central claim is unsupported. |
| How to Automate a Repetitive Task Without Learning to Code | Published | 4 | Most extreme H2-padding case on the site; needs real screenshots of an actual built automation. | Screenshots and steps from one actually-built automation (e.g. a real Zapier/Make workflow), plus removal of the padding sections. |
| How to Turn a Spreadsheet Into a Simple Budget Tracker | Scheduled | 4 | Never shows a real formula, screenshot, or template — fails its own core promise. | An actual spreadsheet formula, screenshot, or downloadable template — the article's title promises exactly this and the body never delivers it. |
| How to Find Freelance Work in India Without Bidding to the Bottom | Scheduled | 4 | Generic marketplace advice, no case study, no real fee numbers. | A real case study or worked fee example (platform commission, GST, actual rate achieved) grounding the advice in something concrete. |
| How to Write a Portfolio That Gets Replies | Scheduled | 4 | Built entirely on scripted hypothetical dialogue, no real example. | A real (or realistically anonymized) portfolio example or before/after outreach message, replacing the invented dialogue. |
| How to Answer "Why Are You Leaving Your Current Job" | Scheduled | 4 | Template scripts plus an unsupported cultural generalization. | Removal or sourcing of the cultural generalization, plus one real interviewer-perspective insight rather than another generic script. |
| How to Get a Duplicate PAN Card Online | Scheduled | 4 | Self-admits its own fee data may be outdated — undercuts its entire purpose. | Current, verified NSDL/UTIITSL fee figures and a "last verified" date — a transactional how-to is worthless if its own numbers might be wrong. |
| How to Say No to Extra Work Without Damaging the Relationship | Scheduled | 4 | No India workplace context; canonical target absorbing the boundaries article, needs a real rebuild. | A genuinely India-specific workplace-hierarchy angle (not generic Western workplace-boundaries advice), since this is the canonical target for the boundaries-merge (§2.5, Group 9). |
| How to Organize Your Email Inbox in Under 30 Minutes | Scheduled | 5 | 20 H2s of programmatic expansion, zero sourcing, zero concrete example. | Cut to the ~6 sections the topic actually needs, plus one concrete before/after inbox example. |
| How to Batch Small Tasks So They Stop Interrupting Deep Work | Scheduled | 5 | Invented-sounding "measured" numbers presented as fact; no real example anywhere. | Either real measured data (a genuine time-tracking result) or the "measured" framing removed and replaced with honestly-labeled general advice. |
| JavaScript Basics | Published | 4 | Textbook JS-101, interchangeable with any other tutorial beyond character names. | A genuinely distinct angle — e.g. common beginner mistakes seen in real code review, not another generic syntax walkthrough. |
| How to Choose Budget Wireless Earbuds Under ₹2,000 (canonical) | Published | 5 | Never names a single real brand/model/price in a segment intensely dominated by a handful of names. | Real, current brand/model/price data for this price band — the single biggest gap, since this is the canonical target absorbing the wired-vs-wireless merge (§2.5, Group 13). |

### 2.4 REBUILD — 10 articles (core premise, structure, or central claim is broken)

| Title | Status | Score | The broken premise | What's missing / what would make it genuinely valuable |
|---|---|---|---|---|
| How to Learn Python in 30 Days | Unpublished | 2 | A programming roadmap with zero actual code — promise/delivery mismatch. | Actual runnable code examples for each stage of the roadmap — a "learn Python" article with no Python is not a defensible starting point. |
| Credit Score in India: How It Works (canonical) | Published | 4 | Presents what appears to be the US FICO weighting model as if it were CIBIL-specific — a factual error at the article's center. | CIBIL's actual published weighting factors (not FICO's), sourced to TransUnion CIBIL's own documentation — this is the canonical target for the CIBIL-check merge (§2.5, Group 7) and must be fixed before that merge lands. |
| How to Set Up Parental Controls Without Making a Teenager Furious | Scheduled | 4 | Delivers relationship advice with zero actual setup steps for a title that promises a how-to. | The actual setup steps (Google Family Link / Screen Time / device-level controls) — the article currently doesn't do what its title says. |
| How to Verify a Company Is Real Before Accepting a Job Offer | Scheduled | 4 | Cites the wrong GST portal domain (services.gst.in vs. the real services.gst.gov.in) at the center of a fraud-prevention article. | The correct GST portal URL and MCA verification steps, since a fraud-prevention article that itself points to the wrong URL is actively harmful — canonical target for the WhatsApp-scam merge (§2.5, Group 12). |
| How to Turn Off Ads in Free Android Apps — Legal or Not | Scheduled | 4 | Confident legal claims (copyright infringement, ToS violation) with zero citation to actual Indian law. | A real citation to the relevant Indian IT Act provision or app-store ToS clause, or the legal-certainty framing dropped in favor of honestly-hedged practical advice. |
| How to Build a Second Brain With Just Notes and Folders | Scheduled | 3 | Presents the well-known PARA method as original, uncredited advice. | Explicit attribution to Tiago Forte's PARA method, plus a genuinely India/site-specific application of it rather than a restatement. |
| How to Actually Stick to a Morning Routine (canonical) | Scheduled | 3 | Unsourced cortisol/physiology claim stated with unwarranted confidence. | The cortisol claim either sourced to real research or removed — canonical target for the habit-resilience merge (§2.5, Group 10), needs this fixed first. |
| The Two-Minute Rule for Getting Through a Long To-Do List | Scheduled | 3 | Reproduces David Allen's GTD rule without any attribution. | Explicit attribution to David Allen's Getting Things Done, plus a genuinely distinct application or example beyond restating the rule. |
| Best Time of Year to Buy Electronics in India | Scheduled | 4 | Asserts which sale window is "deepest" with zero supporting price data anywhere. | Actual price-drop data across sale windows (Republic Day, Independence Day, Diwali/Big Billion Days) — the entire premise requires numbers it never provides. |
| Prepaid vs Postpaid Mobile Plans | Scheduled | 4 | Titled as a cost comparison; contains not a single price or number, including its own decision table. | Real current plan prices from at least Jio/Airtel/Vi — a cost-comparison article with zero numbers, including in its own decision table, cannot do its job. |

### 2.5 MERGE — 18 articles into 16 canonical survivors

**Quick reference**

| Title | Status | Score | Merge target |
|---|---|---|---|
| Best Free AI Tools That Will Save You 10 Hours Every Week | Unpublished | 3 | Best Free AI Tools in 2026 — Complete Guide |
| Notion vs Google Keep vs Obsidian | Published | 4 | Notion vs Google Docs |
| Five Recurring Charges Most People Forget to Cancel | Scheduled | 5 | How to Cancel a Subscription You Forgot You Had |
| How to Track Where Your Salary Actually Goes Every Month | Scheduled | 5 | Zero-Based Budgeting |
| How to Handle a Counteroffer From Your Current Employer | Scheduled | 4 | How to Negotiate Your Salary in India |
| Beyond Salary: Other Parts of a Job Offer Worth Negotiating | Scheduled | 5 | How to Negotiate Your Salary in India |
| How to Ask for a Raise Without a New Offer in Hand | Scheduled | 5 | How to Negotiate Your Salary in India |
| What Applicant Tracking Systems Really Do With Your Resume | Scheduled | 6 | How to Write a Resume That Gets Shortlisted |
| How to Register a Complaint Against Spam Calls With TRAI | Scheduled | 5 | How to Stop Spam Calls and SMS on an Indian SIM |
| How to Check Your CIBIL Score for Free, Legally | Scheduled | 5 | Credit Score in India |
| How to Free Up Storage on Your Phone | Scheduled | 4 | Digital Decluttering |
| Two-Factor Authentication Explained | Scheduled | 6 | How Two-Factor Authentication Actually Stops Account Hacks |
| How to Spot a Fake Job Offer Sent Over WhatsApp or Telegram | Scheduled | 6 | How to Verify a Company Is Real Before Accepting a Job Offer |
| Wired vs Wireless Earbuds | Scheduled | 5 | How to Choose Budget Wireless Earbuds Under ₹2,000 |
| How to Extend Your Wi-Fi Router Range | Scheduled | 4 | Why Your Wi-Fi Feels Slow in Certain Rooms |
| How to Set Boundaries With Work Messages After Hours | Scheduled | 5 | How to Say No to Extra Work Without Damaging the Relationship |
| How to Build a Habit That Survives a Bad Week | Scheduled | 5 | How to Actually Stick to a Morning Routine |
| How to Extend a Phone Battery Lifespan Over Years | Scheduled | 5 | Why Your Phone Battery Degrades Over Time |

**Full disposition per merge group.** A note on redirects: 17 of the 18 articles being merged away were never PUBLISHED (SCHEDULED or UNPUBLISHED), so no URL was ever live or indexed — there is nothing to 301-redirect, they simply never get published as standalone pages. The one exception is the Notion three-way comparison, which is currently live and indexed, so it genuinely needs a redirect.

**Group 1 — AI tools roundup**
- Primary article: *Best Free AI Tools in 2026 — Complete Guide* (unpublished, MAJOR REWRITE, `/best-free-ai-tools-in-2026-complete-guide`)
- Merge into it: *Best Free AI Tools That Will Save You 10 Hours Every Week* (unpublished)
- Recommended final title: "Best Free AI Tools in 2026 — What They Actually Do and Where the Limits Kick In"
- Retain: the primary's five-tool structure (ChatGPT, Gemini, Canva, GitHub Copilot, Perplexity) as the base; the "10 Hours" draft's headline framing is not worth keeping since it's an unsubstantiated productivity claim
- Remove: the unsourced "saves 10 hours a week" claim entirely; both drafts' undated free-tier limit numbers must be re-verified and dated at time of actual testing, not merged in as-is
- Recommended URL: `/best-free-ai-tools-in-2026-complete-guide` (unchanged)
- Redirect candidates: none — the "10 Hours" draft was never published

**Group 2 — Budgeting/tracking**
- Primary article: *Zero-Based Budgeting: A Practical Guide to Giving Every Rupee a Job* (published, IMPROVE, `/zero-based-budgeting-how-to-build-a-budget-that-actually-works`)
- Merge into it: *How to Track Where Your Salary Actually Goes Every Month* (scheduled)
- Recommended final title: unchanged — "Zero-Based Budgeting: A Practical Guide to Giving Every Rupee a Job"
- Retain: the zero-based-budgeting method as the primary framework; add a short "tracking your spend first" section using any genuinely distinct app-based tracking tips from the scheduled draft
- Remove: the scheduled draft's generic "track where money goes" framing that duplicates the primary's own opening; any unsourced statistics
- Recommended URL: unchanged
- Redirect candidates: none — the tracking article was never published

**Group 3 — Subscription cancellation**
- Primary article: *How to Cancel a Subscription You Forgot You Had* (scheduled, IMPROVE, `/how-to-actually-cancel-a-subscription-you-forgot-you-had`)
- Merge into it: *Five Recurring Charges Most People Forget to Cancel* (scheduled)
- Recommended final title: unchanged — "How to Cancel a Subscription You Forgot You Had"
- Retain: the primary's three-place audit method (bank statement, UPI Autopay, app-store subscriptions); fold in only the "five recurring charges" draft's specific named examples (streaming, cloud storage tiers) as illustrative bullets, not a separate methodology
- Remove: the "five recurring charges" draft's duplicate statement-scan walkthrough entirely — it repeats the primary's own steps
- Recommended URL: unchanged
- Redirect candidates: none — the "five recurring charges" draft was never published

**Group 4 — Salary negotiation (three-into-one)**
- Primary article: *How to Negotiate Your Salary in India — What Works* (published, IMPROVE, `/how-to-negotiate-your-salary-in-india-what-actually-works`)
- Merge into it: *How to Handle a Counteroffer From Your Current Employer*, *Beyond Salary: The Other Parts of a Job Offer Worth Negotiating*, *How to Ask for a Raise Without a New Offer in Hand* (all scheduled)
- Recommended final title: "How to Negotiate Your Salary in India — What Works, Including Counteroffers and Raises"
- Retain: the primary's core negotiation framework and its Levels.fyi/AmbitionBox/Glassdoor sourcing (the strongest sourcing across all four drafts, from the "Ask for a Raise" draft); the "Beyond Salary" draft's ESOP-mechanics section, which the audit flagged as its one genuinely distinct contribution; a short counteroffer-handling section from the counteroffer draft once its "leaves within a year" statistic is either sourced or dropped
- Remove: the "several Indian states ban salary-history questions" claim across all drafts unless it can be sourced to an actual state law; all three redundant restatements of the primary's own negotiation-script advice
- Recommended URL: unchanged
- Redirect candidates: none — none of the three absorbed drafts were ever published

**Group 5 — Resume / ATS**
- Primary article: *How to Write a Resume That Gets Shortlisted* (published, IMPROVE, `/how-to-write-a-resume-that-actually-gets-shortlisted`)
- Merge into it: *What Applicant Tracking Systems Really Do With Your Resume* (scheduled)
- Recommended final title: "How to Write a Resume That Gets Shortlisted — Including How ATS Software Actually Filters It"
- Retain: the primary's before/after bullet-rewrite table (the audit's identified genuine asset); the ATS draft's real comparison table and named ATS platforms as a new "how the filtering software works" section
- Remove: the unsourced "six second scan" statistic in the primary unless a citation is found; any duplicate general resume-formatting advice in the ATS draft
- Recommended URL: unchanged
- Redirect candidates: none — the ATS draft was never published

**Group 6 — Spam calls / TRAI**
- Primary article: *How to Stop Spam Calls and SMS on an Indian SIM — The Settings That Actually Help* (scheduled, IMPROVE, `/how-to-stop-spam-calls-and-sms-on-an-indian-sim-the-settings-that-actually-help`)
- Merge into it: *How to Register a Complaint Against Spam Calls With TRAI* (scheduled)
- Recommended final title: unchanged
- Retain: the primary's carrier/phone-level filtering steps (its differentiator over the TRAI draft) plus the TRAI draft's DND/1909-registration process as a dedicated "how to formally complain" section
- Remove: the primary's own excess H2 padding flagged in the audit; any duplicate DND explanation once the TRAI draft's version is folded in
- Recommended URL: unchanged
- Redirect candidates: none — the TRAI draft was never published

**Group 7 — Credit / CIBIL score**
- Primary article: *Credit Score in India: How It Works and How to Fix a Bad One* (published, REBUILD, `/credit-score-in-india-how-it-works-and-how-to-fix-it`)
- Merge into it: *How to Check Your CIBIL Score for Free, Legally* (scheduled)
- Recommended final title: unchanged
- Retain: nothing from the primary's current scoring-model explanation as-is (it must be rebuilt first — see §2.4); once rebuilt with real CIBIL-specific weighting, fold in the CIBIL draft's free-check walkthrough (official CIBIL/Experian/Equifax annual free-check process) as a practical "how to check yours" section
- Remove: the primary's current FICO-model-presented-as-CIBIL error entirely; do not merge until that fix lands, since merging into a factually broken article would just double the surface area of the error
- Recommended URL: unchanged
- Redirect candidates: none — the CIBIL-check draft was never published
- **Sequencing note:** this merge is blocked on the REBUILD landing first (see Priority list, §4)

**Group 8 — Phone storage / decluttering**
- Primary article: *Digital Decluttering: How to Clean Up Years of Phone Photos and Files* (scheduled, IMPROVE, `/digital-decluttering-how-to-clean-up-years-of-phone-photos-and-files`)
- Merge into it: *How to Free Up Storage on Your Phone Without Deleting Photos You Want* (scheduled)
- Recommended final title: unchanged
- Retain: the primary's sequencing (identified in the audit as the stronger of the two); any non-duplicate specific app names or steps from the "free up storage" draft
- Remove: the "free up storage" draft's duplicate bulk-cleanup methodology, which repeats the primary almost step for step
- Recommended URL: unchanged
- Redirect candidates: none — the "free up storage" draft was never published

**Group 9 — Boundaries / extra work**
- Primary article: *How to Say No to Extra Work Without Damaging the Relationship* (scheduled, MAJOR REWRITE, `/how-to-say-no-to-extra-work-without-damaging-the-relationship`)
- Merge into it: *How to Set Boundaries With Work Messages After Hours* (scheduled)
- Recommended final title: "How to Say No to Extra Work and Set After-Hours Boundaries, Without Damaging the Relationship"
- Retain: whatever concrete scripts/scenarios survive the primary's rewrite (see §2.3 — needs a real India workplace context first); the after-hours-messages draft's specific "when to mute vs. reply" framing if it can be grounded in something other than the unattributed "research shows" burnout claim
- Remove: the after-hours draft's unsourced burnout research citation entirely unless a real source is found
- Recommended URL: unchanged
- Redirect candidates: none — the after-hours draft was never published
- **Sequencing note:** this merge is blocked on the MAJOR REWRITE landing first

**Group 10 — Morning routine / habits**
- Primary article: *How to Actually Stick to a Morning Routine, Based on What Derails Most People* (scheduled, REBUILD, `/how-to-actually-stick-to-a-morning-routine-based-on-what-derails-most-people`)
- Merge into it: *How to Build a Habit That Survives a Bad Week* (scheduled)
- Recommended final title: unchanged
- Retain: the "based on what derails most people" framing angle once the primary's unsourced cortisol claim is fixed or removed (see §2.4); the habit-resilience draft's "surviving a bad week" concept as a section within the rebuilt article, not a standalone page
- Remove: the unsourced cortisol/physiology claim in the primary entirely; the habit draft's own generic habit-formation filler
- Recommended URL: unchanged
- Redirect candidates: none — the habit draft was never published
- **Sequencing note:** this merge is blocked on the REBUILD landing first

**Group 11 — Two-factor authentication**
- Primary article: *How Two-Factor Authentication Actually Stops the Most Common Account Hacks* (published, IMPROVE, `/how-two-factor-authentication-actually-stops-account-hacks`)
- Merge into it: *Two-Factor Authentication Explained: Which Method Is Actually Safest* (scheduled)
- Recommended final title: "How Two-Factor Authentication Actually Stops the Most Common Account Hacks — And Which Method Is Safest"
- Retain: the primary's credential-stuffing attack explanation (its genuine strength per the audit); the scheduled draft's stronger technical method-comparison detail (SMS vs. authenticator app vs. hardware key) as an added section
- Remove: any duplicate "what is 2FA" scene-setting once the two are combined
- Recommended URL: unchanged
- Redirect candidates: none — the method-comparison draft was never published

**Group 12 — Job-offer verification / WhatsApp scams**
- Primary article: *How to Verify a Company Is Real Before Accepting a Job Offer* (scheduled, REBUILD, `/how-to-verify-a-company-is-real-before-accepting-a-job-offer`)
- Merge into it: *How to Spot a Fake Job Offer Sent Over WhatsApp or Telegram* (scheduled)
- Recommended final title: "How to Verify a Company Is Real Before Accepting a Job Offer, Including WhatsApp and Telegram Scams"
- Retain: once the primary's wrong GST portal URL is fixed (see §2.4), its company-verification checklist as the base, with the WhatsApp/Telegram draft's channel-specific red flags folded in as a dedicated section
- Remove: nothing evaluable until the GST URL is corrected — do not merge into an article with a live wrong-URL error
- Recommended URL: unchanged
- Redirect candidates: none — the WhatsApp-scam draft was never published
- **Sequencing note:** this merge is blocked on the REBUILD landing first

**Group 13 — Wireless earbuds**
- Primary article: *How to Choose Budget Wireless Earbuds Under ₹2,000 — What Actually Matters* (published, MAJOR REWRITE, `/how-to-choose-budget-wireless-earbuds-under-2000-what-actually-matters`)
- Merge into it: *Wired vs Wireless Earbuds: What You Actually Give Up Either Way* (scheduled)
- Recommended final title: unchanged
- Retain: nothing from the primary's current no-brand-named version as-is — it needs the MAJOR REWRITE (real brand/model/price data) before anything is folded in; once rebuilt, the wired-vs-wireless trade-off content (latency, battery, audio-quality) becomes a comparison section
- Remove: the primary's current complete absence of any named brand or price, which is its core defect
- Recommended URL: unchanged
- Redirect candidates: none — the wired-vs-wireless draft was never published
- **Sequencing note:** this merge is blocked on the MAJOR REWRITE landing first

**Group 14 — Wi-Fi range**
- Primary article: *Why Your Wi-Fi Feels Slow in Certain Rooms — The Real Physics Behind Router Placement* (published, KEEP, `/why-your-wifi-feels-slow-in-certain-rooms-router-placement`)
- Merge into it: *How to Extend Your Wi-Fi Router Range Without Buying a New One* (scheduled)
- Recommended final title: "Why Your Wi-Fi Feels Slow in Certain Rooms — The Real Physics Behind Router Placement (and How to Extend Its Range)"
- Retain: the primary's measured-Mbps physics content entirely unchanged (it is the site's strongest article — do not dilute it); fold in only the router-range draft's genuinely new extender/mesh-node guidance as an added practical section
- Remove: the router-range draft's placement advice that duplicates the primary's own physics section
- Recommended URL: unchanged
- Redirect candidates: none — the router-range draft was never published

**Group 15 — Phone battery**
- Primary article: *Why Your Phone Battery Degrades Over Time — The Real Chemistry Behind It* (published, IMPROVE, `/why-your-phone-battery-degrades-over-time-the-real-chemistry`)
- Merge into it: *How to Extend a Phone Battery Lifespan Over Years, Not Just a Day* (scheduled)
- Recommended final title: "Why Your Phone Battery Degrades Over Time — The Real Chemistry, and How to Slow It Down"
- Retain: the primary's chemistry explanation once its first-hand battery-check anecdote is fixed to actually state the number it claims to have checked (see §2.2); the lifespan-extension draft's practical tips (charge-cycle habits, heat avoidance) as a "what you can actually do" section
- Remove: any duplicate degradation-mechanism explanation in the lifespan draft once merged
- Recommended URL: unchanged
- Redirect candidates: none — the lifespan-extension draft was never published

**Group 16 — Notion comparisons**
- Primary article: *Notion vs Google Docs — What Each One Is Actually Built For* (published, IMPROVE, `/notion-vs-google-docs-what-each-one-is-actually-built-for`)
- Merge into it: *Notion vs Google Keep vs Obsidian: Which Note-Taking App Should You Actually Use* (**published**)
- Recommended final title: "Notion vs Google Docs vs Obsidian — What Each One Is Actually Built For" (Google Keep dropped — it's a notes app, not a real Notion competitor for the workflows either article actually discusses)
- Retain: the primary's "built for" framing; the Obsidian-specific content from the second article (local-first/Markdown/linking-notes angle), since that's a genuinely distinct third option worth keeping
- Remove: the Google Keep comparison entirely — thin overlap, not a serious alternative to either Notion or Obsidian for the use cases either article discusses
- Recommended URL: unchanged (`/notion-vs-google-docs-what-each-one-is-actually-built-for`)
- Redirect candidates: **`/notion-vs-google-keep-vs-obsidian-which-note-taking-app-should-you-use` → 301 redirect to the primary URL.** This is the one merge pair where both articles are currently PUBLISHED and indexed, so an actual redirect is needed to avoid a 404 and consolidate any existing link equity/rankings.

### 2.6 REMOVE — 2 articles

| Title | Status | Score | Reason | Why removal beats improvement |
|---|---|---|---|---|
| What is Artificial Intelligence — Simple Explanation for Beginners | Unpublished | 2 | Textbook-generic explainer indistinguishable from a chatbot answer; unsourced claims about named Indian companies; no realistic differentiation path. | There is no version of "what is AI, simply explained" that this site could write which wouldn't also be reconstructable from any generic AI answer — the topic itself has no room for a differentiated angle, so investment here has no realistic payoff. It was never published, so removal costs nothing in traffic or link equity. |
| How to Run a Weekly Review That Actually Changes What You Do | Scheduled | 4 | Cluster-level call: the most redundant, least differentiated of six overlapping Productivity how-tos already being kept/improved; a seventh generic self-help page adds nothing. | Improving this article would mean competing for the same intent as five better, already-scoped Productivity articles on the site — the fix isn't a better version of this article, it's not publishing a seventh one. Cutting it reduces cannibalization risk across the whole cluster rather than adding one more page to maintain. |

### 2.7 NOINDEX — 7 articles (accurate, keep on-site, not competitive search content)

| Title | Status | Score | Why NOINDEX rather than IMPROVE or REMOVE |
|---|---|---|---|
| How Google Maps Knows There Is Traffic Ahead | Published | 5 | Correct synthesis of public knowledge with zero original data; will never out-rank Google's own docs for this query. |
| How Voice Assistants Actually Understand What You Are Saying | Published | 5 | Same templated "how it works" pattern, no unique data. |
| Why Video Calls Lag Even With Fast Internet | Published | 5 | Standard networking explainer, no measured data, overlaps the Wi-Fi article. |
| How Ad Targeting Follows You Between Apps | Published | 5 | Correct myth-debunking but widely covered elsewhere with no unique angle. |
| How to Use Google Lens for More Than Just Translating Text | Scheduled | 4 | Reads as restated Google marketing copy with zero India-specific angle. |
| What End-to-End Encrypted Actually Means | Scheduled | 6 | The clearest, most accurate piece in its batch, but still has no unique data or India angle to justify standing as competitive search content. |
| How Often You Should Actually Clean Your Laptop Fans | Scheduled | 4 | Real but very narrow topic (852 words honestly covers it); not worth positioning as competitive search content even done well. |

These are not harmful and are accurate — they stay on the site for depth/internal linking, but shouldn't be positioned as part of the site's search-facing value proposition. Applied to 5% of the catalog, deliberately sparingly.

### 2.8 HOLD — 2 articles (blocked on a genuine external fact-check)

| Title | Status | Score | Specific blocker |
|---|---|---|---|
| How to Find a Lost Android Phone Even When It Is Offline | Scheduled | 6 | Sanchar Saathi/DoT IMEI-blocking portal requirements need a currency check before the 2026-09-27 publish date. |
| How to Check If Your Phone Number Was Leaked in a Data Breach | Scheduled | 6 | Have I Been Pwned's phone-search feature and the cited government portals need a currency check before the 2026-09-30 publish date. |

---

## 3. Summary counts

| Decision | Count |
|---|---|
| **CURRENT TOTAL** | **137** |
| KEEP | 16 |
| IMPROVE | 66 |
| MAJOR REWRITE | 16 |
| REBUILD | 10 |
| MERGE | 18 |
| REMOVE | 2 |
| NOINDEX | 7 |
| HOLD | 2 |

16 + 66 + 16 + 10 + 18 + 2 + 7 + 2 = **137** ✓

Reading this distribution honestly: only 16 articles (12%) meet the bar today. Another 66 (48%) have a real, well-scoped path to meeting it. The remaining 40% either need to be rebuilt close to scratch (26 articles across MAJOR REWRITE and REBUILD), folded into a stronger article (18), removed (2), or kept off search entirely (7 NOINDEX) while 2 wait on an external fact-check. After the 18 merges and 2 removals execute, the surviving catalog is 117 articles — down from 137, which is the intended effect of applying real consolidation discipline rather than treating headcount as success.

---

## 4. The strongest 20 — where to focus first

**Methodology:** ranked by realistic ROI. Priority 1 is near-KEEP articles (mostly score 6) needing only a light, well-defined IMPROVE pass — the fastest way to grow the KEEP count. Priority 2 is REBUILD/HOLD items that carry real credibility or scheduling risk (a live factual error, an article scheduled to auto-publish with a wrong government URL, or a currency-sensitive claim with an approaching publish date) — fixing these first prevents damage and unblocks the MERGE actions that depend on them.

1. **Credit Score in India: How It Works** (REBUILD) — currently-published page states what appears to be the US FICO weighting model as CIBIL's; a live factual-accuracy risk, and the CIBIL-check merge is blocked on this fix.
2. **How to Verify a Company Is Real Before Accepting a Job Offer** (REBUILD) — wrong GST portal URL in a fraud-prevention article scheduled 2026-09-18; blocks the WhatsApp-scam merge.
3. **How to Set Up Parental Controls Without Making a Teenager Furious** (REBUILD) — earliest-dated Rebuild item in the queue (2026-08-21); title/content mismatch.
4. **How to Negotiate Your Salary in India** (IMPROVE) — canonical for a 4-article cluster; one citation fix unblocks 3 merges.
5. **How to Write a Resume That Gets Shortlisted** (IMPROVE) — canonical for the resume/ATS merge; one citation fix unblocks 1 merge.
6. **How to Cancel a Subscription You Forgot You Had** (IMPROVE) — canonical, earliest-scheduled merge pair (2026-08-22).
7. **Complete Guide to Getting a Software Job in India Without a Degree** (IMPROVE) — one of the strongest India-specific published pieces; just needs sourced salary figures.
8. **The Real Cost of Buy Now Pay Later** (IMPROVE) — one named late-fee figure from a genuinely strong piece.
9. **How Cashback Apps Actually Make Money Off You** (IMPROVE) — genuinely insightful breakage/float mechanism, just needs named apps.
10. **How to Negotiate Your Broadband or DTH Bill Down** (IMPROVE) — most tactically specific piece in its batch, needs named providers.
11. **The Real Difference Between a Fixed Deposit and a Recurring Deposit** (IMPROVE) — best math in the batch, just finish the worked example.
12. **How to Link Aadhaar and PAN Online** (IMPROVE) — most transactionally useful scheduled article, needs screenshots and a verify-date.
13. **How to File a Consumer Complaint Online in India** (IMPROVE) — genuinely useful jurisdiction table, just needs padding trimmed.
14. **How to Recover Deleted WhatsApp Messages and Photos** (IMPROVE) — most technically specific WhatsApp piece, quick fixes only.
15. **How to Tell If a Link Is a Phishing Scam Before You Click It** (IMPROVE) — concrete India-specific detail already present, quick sourcing fix.
16. **How to Check What Personal Data Google Has on You** (IMPROVE) — accurate and useful, just needs trimming.
17. **Why You Should Not Reuse Passwords** (IMPROVE) — technically solid, add one real breach statistic.
18. **How to Recognize a Fake Loan App Before It Drains Your Bank Account** (IMPROVE) — most India-regulation-specific scam piece, add one real example.
19. **How to Find a Lost Android Phone Even When It Is Offline** (HOLD) — strongest India-grounding in its batch; a cheap fact-check unblocks it before its 2026-09-27 date.
20. **How to Check If Your Phone Number Was Leaked in a Data Breach** (HOLD) — most-sourced piece in its batch; a cheap fact-check unblocks it before its 2026-09-30 date.

---

## 5. What this report does not do

No article content, code, or configuration was modified in producing this plan — this is a classification and synthesis exercise built entirely on the two prior reports' existing findings, not new research. No new facts about any article were invented. Executing the 18 MERGE actions, 2 REMOVE actions, 16 MAJOR REWRITEs, and 10 REBUILDs is separate work requiring explicit sign-off, as is deciding a rewrite/publication schedule for the 66 IMPROVE items and clearing the 2 HOLD blockers.
