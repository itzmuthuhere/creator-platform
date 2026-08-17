# TechPulzo — Fact-Checking & Research Report

**Date:** August 16, 2026
**Prepared by:** Fact-Checking and Research Editor
**Scope:** All 108 articles carried forward by [`04-content-survival-plan.md`](04-content-survival-plan.md) under a KEEP, IMPROVE, MAJOR REWRITE, or REBUILD verdict — the articles the site is actually going to keep publishing. The 29 articles routed to MERGE, REMOVE, NOINDEX, or HOLD were out of scope (a claim in an article about to be deleted or merged away isn't worth researching).
**Inputs (ground truth, not re-derived):** [`content-decisions.csv`](../data/content-decisions.csv) for the article list and verdicts, and the live article body text pulled directly from the production Postgres database (the `Post.content` field) — not the audit's summary notes — so every claim below was checked against what a reader actually sees on the page.
**Output:** This report, plus [`fact-check.csv`](../data/fact-check.csv) — one row per claim, 715 rows across all 108 articles, with Claim / Classification / Source / Source URL / Verification Status / Required Correction.

---

## 1. Method

For every article, the full HTML body was pulled from the database, converted to plain text, and read in full. Every claim that reads as a checkable statement of fact — a statistic, a price, a date, a named law/portal/regulation, a technical mechanism, a named company's policy — was pulled out and classified:

| Classification | Meaning |
|---|---|
| **VERIFIABLE** | A specific factual assertion checkable against an authoritative source. |
| **OPINION** | A subjective judgment, not independently checkable. |
| **EXPERIENCE** | A first-hand anecdote presented as personal experience — not independently checkable, but flagged if it reads as fabricated or generic. |
| **UNSUPPORTED** | Presented as fact, no source given, and a genuine search turned up no source. |
| **OUTDATED** | Was true at some point but reflects stale data (an old price, an old app policy, a superseded product). |
| **POTENTIALLY MISLEADING** | Technically true but framed in a way likely to leave the reader with a wrong impression, or an oversimplification of a nuanced rule. |

Every VERIFIABLE claim was researched against a real source, prioritized in this order: official documentation → government sources (RBI, Income Tax Dept, GSTN, TRAI, EPFO, UIDAI, CEIR, etc.) → academic/primary research → official company sources → reputable institutions. SEO blogs were used only when no primary source existed. No source, quote, or statistic in this report or the CSV was invented — where a genuine search found nothing, the row is marked **Could Not Verify**, not filled in with a plausible-sounding citation.

Coverage was scaled to stakes: YMYL content (finance, tax, government portals, legal claims) got the deepest treatment; low-stakes technical explainers got the claims that actually carry the article's argument. Every article received at least 3 claim rows; most received 5–9.

---

## 2. Headline numbers

**715 claims recorded across 108 articles.**

| Classification | Count |
|---|---|
| VERIFIABLE | 445 |
| UNSUPPORTED | 109 |
| OPINION | 66 |
| POTENTIALLY MISLEADING | 37 |
| EXPERIENCE | 36 |
| OUTDATED | 22 |

| Verification status (VERIFIABLE claims only) | Count |
|---|---|
| Confirmed | 325 |
| Partially Confirmed | 104 |
| Could Not Verify | 87 |
| Contradicted | 23 |
| Outdated | 8 |
| N/A (non-verifiable classifications) | 168 |

**524 of the 715 rows (73%) carry a concrete required correction** — cite it, soften it, update it, or remove it. That number should not be read as "73% of the site is wrong": most of these are sourcing gaps (a real, true statement stated with no citation) rather than factual errors. The count that matters more is below.

**23 claims were directly Contradicted by an authoritative source** — i.e., not just unsourced, but actually wrong as written — spread across **22 of the 108 articles (20%)**. Those are the load-bearing findings in this report; the full detail for every one is in the CSV, and the highest-stakes ones are below.

By editorial tier: IMPROVE carried 442 of the 715 rows (this tier is 66 of the 108 articles, so roughly in proportion), KEEP 104, MAJOR REWRITE 101, REBUILD 68.

---

## 3. Confirmed factual errors (Contradicted) — fix before anything else

These 23 claims aren't sourcing gaps — they were checked against an authoritative source and found to be actually wrong. Four are severe enough to single out:

### 3.1 Credit Score in India — presents the US FICO model as if it were CIBIL's (REBUILD)
The article's core factor-weighting table (Payment history 35%, Utilization 30%, History length 15%, Credit mix 10%, New inquiries 10%) is **myFICO's published U.S. model**, not CIBIL's. TransUnion CIBIL has publicly stated its exact scoring weights are proprietary and undisclosed — it confirms payment history and utilization matter most but does not publish percentages. This is exactly the error the survival plan flagged going in, now confirmed against CIBIL's own public position (myfico.com/credit-education/whats-in-your-credit-score vs. CIBIL's own site). *Correction: replace the exact percentages with CIBIL's actual documented factors (no numbers), or explicitly label any illustrative percentages as "FICO's U.S. model, for comparison."*

The article's other headline claim — a bill paid **5 days** late costing 50–70 points — is also contradicted: lenders generally don't report a missed payment to the bureau until ~30 days past due, so a 5-day-late payment (which may cost a late fee) would not plausibly trigger that point loss. *Correction: tie the point-loss figure to ~30-day delinquency, not 5 days.*

### 3.2 How to Verify a Company Is Real Before Accepting a Job Offer — sends fraud victims to a dead domain (REBUILD)
The article tells readers checking a potential scam employer's GSTIN to go to `services.gst.in`. That domain **does not resolve** — it isn't a live, registered site. The real portal is `services.gst.gov.in/services/searchtp`. This is the single worst finding in the whole audit: an anti-fraud article pointing readers at a non-existent government-lookalike URL. *Correction: fix the domain immediately; also worth adding a line warning readers that look-alike GST domains are themselves a known phishing pattern.*

### 3.3 Best Budget Smartphones Under ₹15,000 in 2026 — all three recommendations are wrong on every axis (MAJOR REWRITE)
Checked against GSMArena and retailer launch coverage:
- **Redmi Note 13**: launched Jan 2024 (not 2026), at ₹17,999 (not ₹13,999 as stated).
- **Realme Narzo 70**: the real Narzo 70 ships with a 120Hz **AMOLED** display at ₹15,999 — the article's "90Hz LCD, ₹12,499, lacking AMOLED" description actually matches the cheaper Narzo 70x, a different phone entirely being described under the wrong name.
- All three phones (plus the Galaxy A15) are two product generations behind current (August 2026) under-₹15,000 lists, which now feature phones like the Tecno Pova 7 5G and Redmi Note 14 SE 5G.

This confirms the survival plan's MAJOR REWRITE call was, if anything, generous — one of the three recommendations isn't just outdated, it's misdescribed.

### 3.4 Best Free AI Tools in 2026 — every tool's free-tier limit is stated wrong (MAJOR REWRITE)
- **ChatGPT**: OpenAI removed the free-tier text rate limit the week of Aug 10, 2026 (free text chat is now effectively unlimited). The article's "~40 messages every 3 hours" reflects the pre-removal limit, which itself was reported as closer to 10 messages/5-hour window — the number was already wrong before it went stale.
- **Gemini**: the article claims no message cap; Gemini's free web app does have a daily prompt cap (commonly reported ~30/day).
- **GitHub Copilot**: the article says it's student-exclusive/paid-only otherwise; GitHub has offered a free individual tier (2,000 completions + 50 chat requests/month) since Dec 2024/2025.

**Full list of all 23 Contradicted rows, with sources and exact required corrections, is in `fact-check.csv`.** The remaining 19 span: a WiFi "more devices = automatically slower" oversimplification, a database-indexes worked example with an arithmetic slip, an HTTPS certificate-lifespan claim, a salary-history-disclosure claim about "several Indian states" that doesn't hold up for India, a car-lease mileage-penalty figure, a Voice Access language-support claim, WhatsApp migration and Android screen-recording claims, a TRAI ombudsman-escalation claim, and a PAN duplicate-card fee that's stated with a range wider than what NSDL/UTIITSL currently publish.

---

## 4. Where the site is systemically weakest

**Unsourced-but-plausible claims (UNSUPPORTED, 109 rows) are the single biggest category of problem**, concentrated in the career/productivity cluster: *How Cashback Apps Actually Make Money Off You* and *How to Organize Your Email Inbox* (5 each), *How to Negotiate Your Broadband or DTH Bill Down*, *10 Best Free Websites to Learn Coding*, *Why "Just Learn to Code" Doesn't Get Freshers Hired*, and three of the MAJOR REWRITE-tier career articles (4 each). 63 of the 108 articles carry at least one UNSUPPORTED claim. This is the "borrowed-credibility" pattern the survival plan named — a specific-sounding number or named authority with nothing behind it — and it's the fastest fix in the whole set: either find the real source or soften to opinion/remove.

**OUTDATED (22 rows)** clusters in fast-moving pricing/policy content: AI tool pricing, Microsoft 365/Notion tier limits, UPI request-type mechanics, HTTPS certificate lifespans (now trending toward 90 days industry-wide, not the "up to a year" some CAs still offer), and RBI/Insurance ombudsman procedural detail.

**Could Not Verify (87 rows)** is dominated by first-person "I checked X and saw Y" anecdotes and vague "studies show" framings with no findable study — these aren't necessarily false, but they can't be defended if challenged, and several read as generic/templated across sibling articles (a pattern the original forensic audit also flagged).

---

## 5. What checked out cleanly

Worth stating plainly: the KEEP-tier technical explainers mostly held up. Docker, Git/GitHub, HTTPS certificate-trust mechanics, database index tree-depth reasoning (aside from one arithmetic slip), facial-recognition BiometricPrompt/Face ID claims, and the fast-charging CC/CV curve explanation were all Confirmed against vendor documentation with no contradictions. This matches the survival plan's original judgment that these were the site's strongest content — the fact-check adds citations rather than corrections for most of them.

---

## 6. How to use `fact-check.csv`

Filter on:
- **`Verification Status = Contradicted`** → 23 rows, fix-before-republish list.
- **`Classification = UNSUPPORTED`** → 109 rows, cite-or-cut list.
- **`Editorial Decision = REBUILD`** → cross-reference against the survival plan's REBUILD reasons; every REBUILD article's confirmed core error is now backed by a real source in this file.
- **`Verification Status = Outdated`** → time-sensitive figures to refresh before scheduled articles go live.

Every VERIFIABLE row that was checked carries the actual source name and the actual URL that was opened — not a generic "government website" placeholder. Rows marked `Could Not Verify` were left that way deliberately rather than filled with an invented citation.
