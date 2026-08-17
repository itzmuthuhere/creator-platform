# TechPulzo — Human Input Requests (First-Hand Experience)

**Date:** August 16, 2026
**Prepared by:** Editorial team, for Muthu (sole author)
**Scope:** Every one of the 110 articles still on a live editorial track after report 04's disposition pass — the 16 KEEP, 66 IMPROVE, 16 MAJOR REWRITE, 10 REBUILD, and 2 HOLD articles — screened for one specific question: **would this article get meaningfully better if it contained something only Muthu could provide, because he actually did it, used it, tested it, or lived it?**
**Inputs (ground truth, not re-derived):** [`01-forensic-audit.md`](01-forensic-audit.md) §2.2 (first-hand-experience scoring), [`05-editorial-strategy.md`](05-editorial-strategy.md) §2 Q8 (which topics benefit most), [`06-fact-checking.md`](06-fact-checking.md) (which claims are sourcing gaps vs. experience gaps — this report only asks about the latter), and [`04-content-survival-plan.md`](04-content-survival-plan.md) (per-article verdicts and reasons).
**Excluded from this form (with reason):** the 18 MERGE-away articles (any input belongs on their canonical survivor, already covered below), the 2 REMOVE articles (not being rewritten), and the 7 NOINDEX articles (report 04 §2.7 already decided these won't be positioned as competitive search content, so first-hand investment in them has the lowest ROI on the site — see the note at the very end if you want to revisit that call).

---

## How to use this document

This is a form, not a questionnaire you need to finish in one sitting. For each article:

- Answer only what you can answer **honestly and specifically**. A real "no, I've never used this" is more useful than a vague answer, and it tells us to route that article to sourcing/citation fixes instead of a first-hand rewrite.
- **Do not invent experience you don't have** — this is exactly the fabricated-anecdote pattern (the nameless "cousin," the unnamed "friend," "hundreds of people I've talked to") that report 01 flagged across the catalog and that got this site rejected by AdSense in the first place. If the honest answer is "I haven't done this," say so — we'll fix the article a different way.
- **Finance articles specifically:** do not manufacture personal financial experience (your salary, your savings, your investments, your debt). If you have a genuine, comfortable-to-share data point (e.g., "I do use a specific budgeting method," "I've actually gone through the EMI math for a real loan I looked into"), include it. Otherwise leave those blank — we will not fill finance articles with invented personal numbers.
- Screenshots, terminal output, and photos are gold — note in your answer if you have one and can send it, even if you don't attach it here.
- Skip anything that isn't your actual experience. "I don't have this" is a complete, useful answer.

Answer inline under each question (`→` marks where your answer goes) or reply in whatever format is easiest — a voice note transcript, a numbered list, whatever's fastest for you.

---

## RESOLVED — no first-hand input available (2026-08-18)

Muthu was interviewed conversationally instead of filling this form line by line, and confirmed he has no first-hand experience to contribute for any article in this document at this time.

Per this document's own rule ("a real 'no, I've never used this' is more useful than a vague answer"), this is treated as a complete, valid answer for **all 104 questions below** — not a gap to fill with invented anecdotes. Every article in this document routes to a sourcing/citation-based fix instead of a first-hand rewrite, per report 04's IMPROVE/MAJOR REWRITE/REBUILD dispositions.

**Binding instruction for anyone (human or Claude Code) processing this file downstream: do not invent, infer, or plausibly-guess an answer to any question below on Muthu's behalf.** If first-hand experience becomes genuinely available later, this file should be revisited and specific answers added then — not before.

---

## A. Tutorials / Developer Fundamentals

The one pillar backed by a real, verifiable credential (backend developer, Java, Bank of America). This is the highest-leverage cluster on the site — small amounts of real detail here go furthest because the audience can tell the difference between someone who's done it and someone who's paraphrasing docs.

### 1. Git and GitHub for Complete Beginners (KEEP, score 6 → could be an 8)
1. Walk me through one real merge conflict you've personally resolved — what were the two conflicting changes, and how did you decide which to keep?
   → 
2. Do you have a real `git log --oneline --graph` or terminal screenshot from an actual repo (redact anything sensitive) we could use as a genuine visual instead of a generic diagram?
   → 
3. What's the Git mistake you see junior developers make most often on your team, and how do you actually walk them back from it (bad rebase, accidental force-push, lost commits)?
   → 
4. Does your team use trunk-based development, GitFlow, or feature-branch-plus-PR? What's one thing about that workflow that surprised you when you first joined?
   → 

### 2. Docker for Complete Beginners (KEEP, score 6 → could be an 8)
1. Do you have a real `Dockerfile` from something you've actually built (even a personal project, even this site's tooling) you could share and walk through line by line?
   → 
2. What's the specific thing about Docker that confused you most when you first learned it, and what made it click?
   → 
3. Have you personally deployed a containerized app anywhere real (a server, a cloud platform)? What broke the first time, and how did you fix it?
   → 

### 3. How Database Indexes Actually Work (KEEP, score 6 → could be an 8)
1. Report 06 found an arithmetic slip in the worked example. Can you redo that calculation using a real query and real row counts from something you've actually indexed (even a side-project database)?
   → 
2. Do you have a real `EXPLAIN ANALYZE` output — before and after adding an index — from a slow query you personally fixed, at work or on a personal project?
   → 
3. Is there a specific production incident you can describe (without violating any confidentiality) where a missing index caused a real, measurable problem?
   → 

### 4. How HTTPS Works (KEEP, score 6 → could be an 8)
1. Have you personally set up an SSL/TLS certificate for a real domain — including this site, techpulzo.in? Which tool (Let's Encrypt, Cloudflare, a hosting provider's built-in cert)?
   → 
2. Report 06 flagged the certificate-lifespan claim as outdated (industry trending toward 90-day certs). Has your own renewal cadence actually changed recently? What have you observed first-hand?
   → 
3. Have you ever debugged a real "your connection is not private" error — yours or someone else's? What caused it?
   → 

### 5. SQL Basics: The Queries Every Beginner Should Know (IMPROVE, score 6)
1. What's a real query you've personally written at work that started out slow, and what did you change to speed it up?
   → 
2. Do you have your own example schema/dataset you use when teaching or mentoring, distinct from the one already used in the Database Indexes article (report 06 flagged the two articles as currently overlapping)?
   → 

### 6. 10 Best Free Websites to Learn Coding in 2026 (MAJOR REWRITE, score 3 — currently zero hands-on opinion)
1. Which of the sites on this list have you personally used, and for roughly how long?
   → 
2. For each one you've used: what did you actually build or learn there, and what's one thing about it that reviews/marketing copy don't mention?
   → 
3. If you had to recommend exactly one to a complete beginner starting tomorrow, which one, and why — based on your own experience, not general reputation?
   → 
4. Is there a site you tried and specifically did *not* like? What went wrong?
   → 

### 7. Google Search Console — How to Add Your Website and Get Free Traffic (MAJOR REWRITE, score 4, unpublished)
1. Do you have real Search Console data from techpulzo.in itself — impressions, clicks, indexing errors, coverage issues? Can you screenshot the actual dashboard?
   → 
2. Has this site had a real indexing problem you personally diagnosed and fixed through GSC? What was it?
   → 
3. What's the single most useful GSC report you actually check regularly, and why — versus the ones a generic walkthrough would list?
   → 

### 8. JavaScript Basics: The Concepts Every Beginner Actually Needs (MAJOR REWRITE, score 4)
1. Is there a real bug you've personally hit — in this project's own scripts (`scripts/*.mjs`) or elsewhere — caused by one of the concepts this article covers (`this` binding, closures, async/await, type coercion)?
   → 
2. Could a real code snippet from this project's actual codebase replace one of the generic textbook examples?
   → 

### 9. How to Learn Python in 30 Days — Complete Beginner Roadmap (REBUILD, score 2 — currently has zero actual code)
1. Do you know Python yourself? If yes, what did you actually build in your own first 30 days (or first real Python project), and what would you do differently now?
   → 
2. If you don't have first-hand Python experience, would you rather this article be reframed around what *does* have your first-hand backing (e.g., "how I'd approach learning a new language as a working backend developer," using Java→Python as the actual lens), or shelved until someone with real Python experience can write it?
   →

---

## B. Tech — "How It Actually Works" Mechanism Explainers

These are already the site's five benchmark articles (report 01/04) — the bar here is going from 7 to genuinely exceptional, not fixing something broken.

### 10. Why Your Wi-Fi Feels Slow in Certain Rooms (KEEP, score 7 — the site's strongest article)
1. The measured Mbps figures already in this article — did you personally measure those in your own home, or a specific location? Which rooms, which router, what speed test tool?
   → 
2. Do you have a floor plan or photo of the actual layout you tested, or another real before/after test (e.g., after moving the router, after adding a mesh node) you haven't written up yet?
   → 

### 11. How Facial Recognition Unlock Actually Works on Your Phone (KEEP, score 7)
1. Have you personally tested face unlock failing or being spoofed (a photo, a twin, low light, wearing a mask) on your own device? What happened?
   → 
2. Which phone/OS version's `BiometricPrompt` behavior did you actually observe directly, versus what you sourced from documentation?
   → 

### 12. How Your Phone Knows Your Location Even With GPS Off (KEEP, score 7)
1. Have you personally tested this — turning GPS off and checking whether Google Maps/your phone still shows a location fix? What did you see?
   → 

### 13. How Autocorrect Actually Decides What You Meant to Type (KEEP, score 7)
1. The Hindi code-switching detail already in this article — is that from your own typing behavior? Do you have a specific, real example (an actual autocorrect mistake or save you can screenshot) to add?
   → 

### 14. How Streaming Quality Adjusts Automatically to Your Internet Speed (KEEP, score 6 → could be a 7)
1. Have you personally watched the resolution indicator change (Netflix/YouTube stats-for-nerds) while your connection changed — a real throttling or Wi-Fi-to-mobile-data switch you experienced? What did you observe?
   → 

### 15. How Your Phone's Fast Charging Works, and Why It Slows Down Near 80 Percent (KEEP, score 6 → could be a 7)
1. Have you actually timed your own phone's charge curve — e.g., minutes to reach 50%, 80%, 100% — with a real charger and cable you use? What numbers did you get?
   → 

### 16. Voice Access: How to Control Your Android Phone Using Just Your Voice (KEEP, score 6)
1. The one-handed-use-while-cooking detail already in this article — can you expand it with one more specific, real moment you used Voice Access, including what command you gave and what went wrong or worked well?
   → 

---

## C. Tech — Safety, Privacy & Everyday Utility How-Tos

Report 05 identifies this as Pillar 4 (Digital Safety & Scam Protection). These are procedural — the highest-value first-hand input is *doing the actual flow on a real device right now* and screenshotting it, since UI changes fast and this is exactly what a generic AI answer can't do.

### 17. How Two-Factor Authentication Actually Stops the Most Common Account Hacks (IMPROVE, score 5)
1. Which 2FA method do you personally use day to day — authenticator app, SMS, hardware key, passkey? Why that one?
   → 
2. Have you ever actually been locked out (lost your phone, lost your authenticator) or personally witnessed a credential-stuffing attempt on one of your own accounts? What happened?
   → 

### 18. How to Tell If a Link Is a Phishing Scam Before You Click It (IMPROVE, score 6)
1. Have you personally received a phishing message that specifically targeted you or someone you know (bank, delivery, job offer)? Can you describe the actual message and what tipped you off, without exposing anyone's real info?
   → 

### 19. How to Check What Personal Data Google Has on You (And Delete It) (IMPROVE, score 6)
1. Have you gone through your own Google Activity/Timeline dashboard recently? What did you actually find that surprised you?
   → 
2. Can you screenshot your own (redacted) dashboard walk-through instead of describing generic screens?
   → 

### 20. What a VPN Actually Protects You From, and What It Does Not (IMPROVE, score 6)
1. Do you personally use a VPN? Which one, for what, and has it ever actually failed to do what you expected?
   → 

### 21. Why You Should Not Reuse Passwords: What Happens When One Site Gets Breached (IMPROVE, score 6)
1. Have you personally checked your own email on haveibeenpwned.com? What did it show (you can share the count/site names without exposing the actual password)?
   → 

### 22. How to Set Up a Password Manager in 15 Minutes (IMPROVE, score 5)
1. Which password manager do you actually use? Walk me through your real setup — where did you get stuck, and how long did it actually take you?
   → 

### 23. How to Stop Spam Calls and SMS on an Indian SIM — The Settings That Actually Help (IMPROVE, score 5)
1. Which of these settings have you personally turned on, on your own phone/carrier? Did spam actually drop afterward?
   → 
2. Have you filed a DND/TRAI complaint yourself? What was the actual process and outcome?
   → 

### 24. How to Recover Deleted WhatsApp Messages and Photos — What Actually Works (IMPROVE, score 6)
1. Have you personally tried this recovery process on a real deleted chat or photo? Did it actually work, and how long did it take?
   → 

### 25. How to Transfer WhatsApp Chats to a New Phone Without Losing History (IMPROVE, score 5)
1. Have you personally done this transfer — Android to Android, or Android to iPhone? What went wrong that the "official" steps don't mention?
   → 

### 26. How to Set Up a Second WhatsApp Number on One Phone (IMPROVE, score 5)
1. Do you (or does someone you know) actually run two WhatsApp numbers on one device? Which method (WhatsApp Business, dual-app feature)? Any real problems with it?
   → 

### 27. How to Screen Record on Android Without a Third-Party App (IMPROVE, score 5)
1. Have you personally used your phone's built-in screen recorder recently? Which phone/Android version, and did you hit the DRM-blocked-content issue the article should mention?
   → 
2. Can you record and share a real screenshot of the feature on your own device (this article currently has zero screenshots)?
   → 

### 28. Digital Decluttering: How to Clean Up Years of Phone Photos and Files (IMPROVE, score 5)
1. Have you actually done a full photo/storage cleanup on your own phone? What did you find (duplicate screenshots, years-old WhatsApp downloads)? Roughly how much space did you free up?
   → 

### 29. How to Back Up Your Phone So a Lost Device Does Not Cost You Your Photos (IMPROVE, score 4)
1. Have you personally set up or tested a phone backup and then actually restored from it? Did it work as expected, or did something go missing?
   → 

### 30. How to Compress a Large File Without Losing Quality (IMPROVE, score 5)
1. What tool do you actually use for this, and do you have a real before/after file-size comparison (e.g., a video or PDF you compressed) with real numbers?
   → 

### 31. How to Use Google Alerts to Track Anything Automatically (IMPROVE, score 4)
1. Do you personally use Google Alerts for anything? What do you track, and is it actually useful, or has it degraded (a common complaint — fewer/lower-quality results than it used to give)?
   → 

### 32. How to Speed Up a Slow Android Phone in 2026 — Without Buying a New One (IMPROVE, score 5)
1. Have you actually measured a before/after speed difference on a real phone (yours or someone else's) after applying these fixes? What were the numbers, and which fix mattered most?
   → 

### 33. How to Set Up a Smart Plug and What It Is Actually Useful For (IMPROVE, score 5)
1. Do you own a smart plug? Which brand, what do you actually use it for, and did you hit the 2.4GHz/5GHz pairing issue this article already flags?
   → 

### 34. How to Set Up a Home Wi-Fi Guest Network, and Why You Should (IMPROVE, score 5)
1. Have you set this up on your own router? Which router/app, and what was the actual menu path — different from the generic steps most guides give?
   → 

### 35. How to Tell If Your Internet Plan Is Actually Giving You the Speed You Pay For (IMPROVE, score 5)
1. Have you run a real speed test against your own ISP plan? What plan, what speed test tool, and did the result match what you're paying for?
   → 

### 36. How to Download Your Digital Driving Licence on DigiLocker (IMPROVE, score 5)
1. Have you personally done this on your own DigiLocker account? Can you screenshot the actual current flow (report 04 flags this article's legal claims as uncited — a real screenshot with a "last checked" date would help more than a citation)?
   → 

### 37. How to Set Up Parental Controls Without Making a Teenager Furious (REBUILD, score 4 — currently has zero actual setup steps)
1. Have you personally set up parental controls for a child, niece/nephew, or younger sibling? Which tool (Google Family Link, a router-level control, a carrier app)? What actually happened when the kid found a workaround?
   → 
2. If you don't have direct personal experience with this, is there someone in your circle (a sibling, a friend) who does and would be willing to share their real experience for this article?
   → 

### 38. How to Turn Off Ads in Free Android Apps — What Is Legal and What Is Not (REBUILD, score 4)
1. Have you personally tried disabling ads in a specific free app? What happened — did it break functionality, get flagged, or just work?
   →

---

## D. Tech — Buying Guides Needing Real Testing

Report 05 §2 Q7 is explicit: this cluster (and its Reviews-category counterpart in section G) competes against outlets that do real hands-on testing, and the audit found **zero** evidence of actual product testing anywhere in it. These two articles cannot be fixed with better sourcing alone — they need Muthu to have actually used the products, or to be honest that he hasn't.

### 39. Best Budget Smartphones Under ₹15,000 in 2026 — Complete Buying Guide (MAJOR REWRITE, score 4)
1. Have you personally used, or spent real time with, any budget phone in the ₹10,000–₹15,000 range in the last 12 months — yours, a family member's, a friend's?
   → 
2. Report 06 confirmed all three current recommendations are wrong or outdated (Redmi Note 13 launched 2024 at ₹17,999 not ₹13,999; the Realme Narzo 70 spec described is actually the cheaper Narzo 70x). If you don't have hands-on experience with current 2026 models, would you rather this be rewritten as an honest spec/price comparison with clear sourcing (no fabricated "I tested this" framing), or held until real hands-on testing is possible?
   → 
3. Is there a specific budget phone you'd actually recommend to someone based on something you've personally observed (a relative's battery life complaint, a friend's camera disappointment)?
   → 

### 40. Best Free AI Tools in 2026 — Complete Guide (MAJOR REWRITE, score 3, unpublished)
1. Which of these tools (ChatGPT, Gemini, Canva, GitHub Copilot, Perplexity) do you personally use, and for what, in your actual day-to-day (including using them to build this site)?
   → 
2. Report 06 found every stated free-tier limit is currently wrong (ChatGPT's free-tier rate limit was removed the week of Aug 10, 2026; Gemini does have a daily cap the article denies; GitHub Copilot has had a free tier since Dec 2024). Can you check your own account's current free-tier limits today and report exactly what you see?
   → 
3. Which one would you personally drop first if you had to cut down to two tools, and why?
   → 
4. What's a specific task you tried with one of these tools that it handled badly?
   →

---

## E. Finance — India Money & Paperwork

Government-portal walkthroughs are report 05's highest-ROI cluster: the author can go through the actual live flow today and screenshot it — no professional credential needed, just doing it. For budgeting/loan/investment articles, see the no-fabrication note at the top — only answer with real experience you're comfortable sharing.

### 41. How to Link Aadhaar and PAN Online — Step by Step (IMPROVE, score 6)
1. Have you personally linked your own Aadhaar and PAN (or helped a family member do it)? Can you screenshot the actual current flow on the live portal, and note today's date as "last verified"?
   → 
2. Did you hit any step that didn't match what most guides describe (an error message, an OTP delay, a status check that took longer than expected)?
   → 

### 42. How to Check Your EPF Balance Without Visiting an Office (IMPROVE, score 5)
1. Have you personally checked your own EPF balance using one of these methods (UMANG app, missed call, SMS, member portal)? Which one, and did it actually work smoothly?
   → 

### 43. How to File a Consumer Complaint Online in India (IMPROVE, score 6)
1. Have you (or has anyone you know) actually filed a complaint on the National Consumer Helpline / e-daakhil portal? What was the real experience — response time, outcome?
   → 

### 44. How to Report a Fraudulent UPI Transaction and Actually Get Your Money Back (IMPROVE, score 5)
1. Have you or someone you know personally gone through a UPI fraud dispute? What actually happened — how long did resolution take, did the bank follow the RBI liability tiers this article should cite, did the money come back?
   → 

### 45. How to Check If Your Vehicle Challan Is Real or a Scam (IMPROVE, score 5)
1. Have you personally received a suspicious challan SMS/link and checked it against the official portal? What did you find?
   → 

### 46. How to Get a Duplicate PAN Card Online (MAJOR REWRITE, score 4 — article self-admits its own fee data may be outdated)
1. Have you personally applied for a duplicate/reprint PAN card recently? What was the actual current fee and processing time you experienced?
   → 

### 47. How to Read a Loan APR Instead of Just the EMI (IMPROVE, score 5)
1. Have you personally compared the APR vs. advertised EMI on a real loan offer (even one you didn't take)? What was the actual gap between the headline rate and the true cost?
   → 

### 48. How to Negotiate Your Broadband or DTH Bill Down (IMPROVE, score 6)
1. Have you personally called your own broadband/DTH provider (Jio, Airtel, ACT, Tata Play — name the real one) to negotiate? What did you actually say, and what did they actually offer?
   → 

### 49. How to Cancel a Subscription You Forgot You Had (IMPROVE, score 6)
1. Have you personally found a forgotten subscription using the bank-statement/UPI-Autopay/app-store method this article describes? What was it, and how much had you actually lost to it?
   → 

### 50. The Real Cost of Buy Now Pay Later — What the Fine Print Does Not Say (IMPROVE, score 6)
1. Have you or someone close to you actually used a BNPL service (Simpl, LazyPay, ZestMoney-style, or a platform's own BNPL)? What was the real experience with a missed payment or a fee?
   → 

### 51. How Cashback Apps Actually Make Money Off You (IMPROVE, score 6)
1. Do you personally use any cashback app (CRED, Google Pay Rewards, a specific card's cashback program — name the real one)? Has cashback ever actually shown up late, been capped, or not shown up at all?
   → 

### 52. Credit Card vs Debit Card for Everyday Spending — What Actually Saves You Money (IMPROVE, score 5)
1. Do you personally use a specific credit card with real cashback/reward terms you could name (not a hypothetical example)?
   → 

### 53. The Real Difference Between a Fixed Deposit and a Recurring Deposit (IMPROVE, score 6)
1. Do you (or a family member) hold a real FD or RD? What bank, roughly what rate, and does the maturity math in the article's worked example match what you've actually seen on a real FD statement?
   → 

### 54. How Much of Your Salary Should Actually Go to Rent (IMPROVE, score 6)
1. Have you personally gone through the HRA exemption calculation on your own salary/rent? Did the numbers work out the way this article describes?
   → 

### 55. How to Save ₹1 Lakh in One Year on a ₹30,000 Salary (IMPROVE, score 4 — flagged for a fabricated-sounding "hundreds of people" stat and a generic chai anecdote)
1. Per the no-fabrication rule above: is there a real, specific saving habit you've personally used (not invented, not attributed to unnamed "hundreds of people") that you're comfortable sharing?
   → 
2. If not, are you comfortable with this article being rewritten as a straightforward milestone-math framework with no personal-experience framing at all, since the current anecdote needs to be removed either way?
   → 

### 56. Zero-Based Budgeting: A Practical Guide to Giving Every Rupee a Job (IMPROVE, score 5)
1. Do you personally use zero-based budgeting or a specific named app (YNAB, Walnut, a spreadsheet template)? If yes, one real detail about how you actually use it would fix the "needs real named app examples" gap report 04 flagged.
   → 

### 57. How to Build an Emergency Fund From Scratch, Whatever Your Income (IMPROVE, score 5)
1. Do you personally maintain an emergency fund? Without disclosing the amount, is there a real decision you made about it (which account type, how you built it up) you're comfortable sharing?
   → 

### 58. How Much Home Loan You Can Afford — The Math Banks Don't Show You (IMPROVE, score 5)
1. Have you personally gone through a home-loan affordability calculation (FOIR) for yourself or helped someone else do it? What real gap did you find between the bank's number and the realistic one?
   → 

### 59. Buying vs Leasing a Car in India — The Math Most People Get Wrong (IMPROVE, score 5)
1. Have you personally compared buying vs. leasing for a real vehicle decision (yours or someone you helped)? What did you actually decide, and why?
   → 

### 60. SIP vs Lump Sum: How to Actually Decide Where to Put Your Money (IMPROVE, score 5)
1. Do you personally invest via SIP, lump sum, or both? (No amounts needed — just the real mechanics of your own choice, if you're comfortable sharing.)
   → 

### 61. Is an MBA Worth It in India in 2026 — The Real Math (IMPROVE, score 5)
1. Have you personally considered an MBA, or do you know someone whose real numbers (fees vs. actual post-MBA salary) you could reference honestly, without inventing figures?
   → 

### 62. Credit Score in India: How It Works and How to Fix a Bad One (REBUILD, score 4 — confirmed to misstate FICO's US model as CIBIL's)
1. Have you personally checked your own CIBIL score (via CIBIL, or a bank/app that shows it for free)? What factors did the report actually show you, in CIBIL's own words — this is the fastest way to replace the wrong FICO percentages with something real.
   → 
2. Have you ever seen your own score actually move after a specific action (paying off a card, a hard inquiry)? What happened?
   → 

### 63. Best Time of Year to Buy Electronics in India: What the Sales Calendar Shows (REBUILD, score 4 — currently has zero supporting price data)
1. Have you personally tracked or bought electronics during a specific sale (Amazon Great Indian Festival, Flipkart Big Billion Days, a specific month)? Do you have real before/after prices for something you or someone you know bought?
   → 

### 64. How to Turn a Spreadsheet Into a Simple Budget Tracker (MAJOR REWRITE, score 4 — never shows a real formula or template)
1. Do you personally use a spreadsheet to track spending? Can you share an actual (sanitized) formula or screenshot of your real template, even with numbers blanked out?
   → 

---

## F. Career — Getting a Tech Job in India

### 65. How to Prepare for a Technical Interview: A Step-by-Step Guide for Freshers (KEEP, score 7 — the site's second-best article)
1. This is already the site's strongest interviewer-perspective piece. Is there one more real, specific moment from an actual interview you conducted or sat in on — a question that tripped up a good candidate, or a red flag you actually saw — that could be added?
   → 

### 66. Complete Guide to Getting a Software Job in India Without a Degree (IMPROVE, score 6)
1. Report 04 flags the "I've sat in on interviews" claim and the salary tables as needing real sourcing. Can you confirm this is genuinely your own experience — how many interviews, roughly what roles/companies — so we can make the claim specific instead of vague?
   → 
2. Do you personally know someone who got hired in tech without a degree? What was actually different about their path?
   → 

### 67. How to Write a Resume That Gets Shortlisted (IMPROVE, score 5)
1. The before/after bullet-rewrite table is flagged as a genuine asset. Do you have a real (anonymized) resume bullet you've personally rewritten for someone, with the actual before/after?
   → 
2. Report 06 flags the "six second scan" stat as needing a citation. Have you personally screened resumes yourself? If so, what's real about your own scanning process that could replace the unsourced stat?
   → 

### 68. How to Negotiate Your Salary in India — What Works (IMPROVE, score 6 — canonical for a 4-article merge)
1. Have you personally negotiated a salary, counteroffer, or raise? What actually happened — what did you ask for, what pushback did you get, what was the real outcome?
   → 
2. Report 06 flags the "several Indian states" salary-history-disclosure claim as not holding up for India — is that based on something you read, or genuinely a mix-up with US law? (This is a sourcing question, but if you have a real Indian negotiation story to replace the claim's role in the article, that's the fix.)
   → 

### 69. Freelancing vs a Full-Time Job in India — What You're Actually Trading Off (IMPROVE, score 5)
1. Have you personally freelanced, even briefly, alongside your full-time role? What was the real trade-off you experienced (income stability, benefits, taxes, finding clients)?
   → 
2. If not, do you know a freelancer well enough to get their honest, attributed (named, with permission) account instead of the article's current generic framing?
   → 

### 70. Remote Work vs Hybrid vs Office: How Each Setup Shapes Your Career Growth (IMPROVE, score 5)
1. Has your own work setup (remote/hybrid/office) actually changed over your career? What did you personally notice about visibility, promotions, or relationships when it changed?
   → 

### 71. How to Build a LinkedIn Profile That Recruiters Actually Find (IMPROVE, score 5)
1. Have you personally optimized your own LinkedIn profile and seen a real change in recruiter messages or profile views? What did you change, and what happened?
   → 

### 72. How to Handle Being Laid Off: The First Two Weeks (IMPROVE, score 6 — report 04 flags every regulatory claim as uncited, a real YMYL risk)
1. Have you, or has someone close to you, actually been laid off in India? What did they actually do in the first two weeks — EPF withdrawal, gratuity claim, health insurance gap — that the article should reflect accurately?
   → 

### 73. Why "Just Learn to Code" Doesn't Get Freshers Hired in 2026 (MAJOR REWRITE, score 4 — entire thesis rests on an unsubstantiated hiring-authority claim)
1. Have you personally been involved in hiring decisions for freshers? If yes, what's a real, specific example (a candidate who could code but didn't get hired, and why) that could replace the unsubstantiated claim at this article's center?
   → 
2. If you haven't been involved in hiring, is there a colleague who has and would talk to you about a real example?
   → 

### 74. How to Find Freelance Work in India Without Bidding to the Bottom (MAJOR REWRITE, score 4 — generic marketplace advice, no case study)
1. Do you have any personal freelance experience, or know someone who's actually priced and won freelance work in India? What real numbers or platforms did they use?
   → 

### 75. How to Write a Portfolio That Gets Replies When You Have No Client Work Yet (MAJOR REWRITE, score 4 — built entirely on scripted hypothetical dialogue)
1. Have you personally built a portfolio from scratch (for a job search, freelancing, or this project)? What actually got you a reply versus what didn't?
   → 

### 76. How to Answer "Why Are You Leaving Your Current Job" Honestly and Well (MAJOR REWRITE, score 4)
1. Have you personally been asked this in an interview? What did you actually say, and how did it land?
   → 
2. Have you asked this question of a candidate yourself? What answers actually worked or backfired?
   → 

### 77. How to Verify a Company Is Real Before Accepting a Job Offer (REBUILD, score 4 — currently sends readers to a dead GST domain)
1. Have you personally checked a company's GSTIN or registration before? Can you walk through the real current flow on `services.gst.gov.in/services/searchtp` today and screenshot it, so the fix is a verified real flow, not just a corrected URL?
   → 
2. Have you (or has someone you know) ever encountered a fake job offer or a company that turned out not to be real? What were the actual red flags?
   →

---

## G. Reviews — Buying Guides & Comparisons

Same issue as section D: report 05 found zero evidence of real hands-on product testing anywhere in this cluster. The three KEEP-tier home-infrastructure articles are the exception — they already contain real India-specific structural detail.

### 78. Inverter vs UPS for Home Power Backup — What Is the Real Difference (KEEP, score 6)
1. Do you personally have an inverter or UPS at home? Which type, roughly what capacity, and what real decision led you to choose it?
   → 
2. Have you experienced an actual power cut where you learned something about your setup's real limits (ran out of backup faster than expected, etc.)?
   → 

### 79. RO vs UV Water Purifier — Which One Your Water Actually Needs (KEEP, score 6)
1. Have you personally tested your own water's TDS level, or bought a purifier based on a real TDS reading? What number did you get, and what did you choose?
   → 

### 80. How to Choose Between a Split AC and a Window AC for a Small Room (KEEP, score 6)
1. Do you personally have a split or window AC? What society/building restriction (if any) actually factored into your choice?
   → 

### 81. Google Sheets vs Excel — Which One Fits How You Work (IMPROVE, score 5)
1. Which do you personally use day to day, and for what? Has anything about the other one (that you've also used) ever frustrated you or genuinely surprised you?
   → 
2. Report 04 flags the article as missing real INR Microsoft 365 pricing — do you or does your household actually pay for Microsoft 365? What's the real current price you're paying?
   → 

### 82. Notion vs Google Docs — What Each One Is Actually Built For (IMPROVE, score 5)
1. Do you personally use Notion, Google Docs, or both? Have you actually migrated content between them? What broke or worked well?
   → 

### 83. Free vs Paid Antivirus in 2026 — Do You Need to Pay (IMPROVE, score 5 — cites AV-Test/AV-Comparatives with no actual score)
1. Do you personally run antivirus software (free or paid) on your own devices? Which one, and has it ever actually caught something real, or given you a false positive?
   → 

### 84. Chrome vs Firefox vs Edge — Does the Browser You Pick Actually Matter (IMPROVE, score 5)
1. Which browser do you personally use, and have you actually compared RAM usage or extension behavior across two or more of these yourself? What did you see?
   → 

### 85. Power Bank Buying Guide: What the mAh Number Does Not Tell You (IMPROVE, score 5 — never names a real model)
1. Do you personally own a power bank? Which brand/model, what's its actual rated capacity, and roughly how much real-world charge (in phone percentage or charges) do you actually get from it versus the mAh number on the box?
   → 

### 86. SSD vs HDD for a Budget Laptop: Where the Money Should Actually Go (IMPROVE, score 5)
1. Have you personally upgraded a laptop from HDD to SSD, or compared boot/load times between two real machines? What were the actual before/after numbers?
   → 

### 87. How Much RAM You Actually Need in a Laptop in 2026 (IMPROVE, score 5)
1. Have you personally hit a real RAM ceiling on your own laptop (browser tabs, Electron apps like this project's tooling)? What did you observe, and how much RAM do you actually run with day to day?
   → 

### 88. Smartwatch Buying Guide: Which Features Are Worth Paying Extra For (IMPROVE, score 5 — entirely price-and-product-free)
1. Do you personally own a smartwatch? Which model, and which specific feature turned out to actually matter to you versus one that turned out to be a gimmick?
   → 

### 89. How to Check a Product's Real Reviews Instead of Fake Ones (IMPROVE, score 5 — never names an actual platform)
1. Have you personally caught a fake review on Amazon or Flipkart before buying something? What tipped you off?
   → 

### 90. How to Tell If a Deal Price Online Is Actually a Discount (IMPROVE, score 5 — never names a single actual tool, product, or price)
1. Have you personally used a price-history tool (like a Keepa-style extension, or a specific site) to check if a "deal" was real? Can you give one real example — the product, the claimed discount, and what the price history actually showed?
   → 

### 91. How to Choose Budget Wireless Earbuds Under ₹2,000 — What Actually Matters (MAJOR REWRITE, score 5 — never names a single real brand/model/price)
1. Do you personally own budget wireless earbuds? Which brand/model, what did you pay, and what's one real thing about them (battery life, call quality, a specific failure) that a spec sheet wouldn't tell you?
   → 

### 92. Prepaid vs Postpaid Mobile Plans: Which Actually Costs Less Over a Year (REBUILD, score 4 — titled as a cost comparison, contains not a single price)
1. Are you personally on a prepaid or postpaid plan? Which carrier, roughly what do you actually pay per month/year, and why did you choose that over the other?
   → 
2. Do you know someone on the other type of plan whose real cost you could compare against, honestly, without inventing numbers?
   → 

### 93. How to Spot a Refurbished Phone Listed as New (IMPROVE, score 6 — needs a real device example or first-hand demonstration)
1. Have you personally checked a phone's IMEI/CEIR status or battery health before buying (new or used)? Can you walk through the actual real steps and screenshot the result?
   → 
2. Have you or someone you know ever been sold a refurbished phone as new? What was the actual giveaway?
   → 

### 94. Wired vs Wireless Earbuds: What You Actually Give Up Either Way (MERGE target: earbuds article #91 above — no separate form needed, but if you have wired-earbud-specific experience not covered above, note it there)
   → 

---

## H. Productivity

Report 05 recommends retiring Productivity as a standalone category (pending sign-off) precisely because this is the cluster with the worst uncredited-source problem on the site (an unattributed GTD rule, an unattributed PARA method, an unsourced cortisol claim). First-hand experience is the most honest way to fix that — either replace the borrowed framework with your own real practice, or the article doesn't survive.

### 95. Time Blocking: A Step-by-Step Guide to Scheduling Your Day Around Real Priorities (IMPROVE, score 4)
1. Do you personally time-block your own day or work? What's your actual calendar/tool, and what's one real week where it broke down (a meeting that blew up the schedule, a task that always overruns)?
   → 

### 96. How to Automate a Repetitive Task Without Learning to Code (MAJOR REWRITE, score 4 — the most extreme H2-padding case on the site)
1. Have you personally built a no-code automation (Zapier, Google Apps Script, IFTTT, a Sheets macro)? Can you share a real screenshot of one you actually built and use?
   → 

### 97. How to Say No to Extra Work Without Damaging the Relationship (MAJOR REWRITE, score 4 — canonical target for the boundaries-merge; report 05 would route this to the Career pillar)
1. Have you personally turned down extra work from a manager or colleague? What did you actually say, and what was the real reaction?
   → 

### 98. How to Organize Your Email Inbox in Under 30 Minutes (MAJOR REWRITE, score 5 — 20 H2s of programmatic expansion, zero real example)
1. Do you personally use a specific inbox system (labels, filters, inbox-zero)? Can you describe your own actual setup instead of a generic method?
   → 

### 99. How to Batch Small Tasks So They Stop Interrupting Deep Work (MAJOR REWRITE, score 5 — invented-sounding "measured" numbers presented as fact)
1. Have you personally measured your own interruption cost (e.g., noticed how long it takes to refocus after a Slack ping)? What's a real, honest observation, even if it's not a formal measurement?
   → 

### 100. How to Build a Second Brain With Just Notes and Folders, No App Needed (REBUILD, score 3 — presents PARA as original, uncredited)
1. Do you personally use a note-taking/organization system? Is it actually your own method, or a version of PARA/Zettelkasten/something named you've adopted? Either is fine — we just need to credit it honestly and describe what you actually do.
   → 

### 101. How to Actually Stick to a Morning Routine, Based on What Derails Most People (REBUILD, score 3 — unsourced cortisol claim)
1. Do you personally have a morning routine? What's actually derailed it for you (a real week, a real reason), as opposed to the generic list currently in the article?
   → 

### 102. The Two-Minute Rule for Getting Through a Long To-Do List (REBUILD, score 3 — reproduces David Allen's GTD rule with no attribution)
1. Do you personally use this rule (correctly attributed to David Allen's *Getting Things Done*)? Can you give one real example of a task you actually knocked out in under two minutes because of it?
   →

---

## I. HOLD — blocked on a live portal/tool check, not content quality

These two don't need a rewrite — they need someone to actually go check the current state of a real government tool before the scheduled publish date. This is the cheapest, highest-confidence first-hand task in this whole document.

### 103. How to Find a Lost Android Phone Even When It Is Offline (Scheduled 2026-09-27)
1. Can you personally go through the Sanchar Saathi / DoT CEIR IMEI-blocking flow today and confirm the exact current steps, screenshotting as you go?
   → 
2. Have you (or anyone you know) actually used this to block or trace a lost phone? What was the real outcome?
   → 

### 104. How to Check If Your Phone Number Was Leaked in a Data Breach (Scheduled 2026-09-30)
1. Can you personally check haveibeenpwned.com's phone-search feature today and confirm it still works as described, with a screenshot?
   → 
2. Have you personally checked your own number and found a real result?
   →

---

## What this document does not do

No article was rewritten, and no answer was assumed or invented, in producing this form. Every question above is scoped to something Muthu could plausibly have actually done, used, or witnessed — not a generic "tell us about your experience" prompt. Once answers come back, the next step is routing each article's real input into its actual rewrite (report 04's IMPROVE/MAJOR REWRITE/REBUILD queue), not before.

**One open item for sign-off, not a question in this form:** the 7 NOINDEX articles were excluded because report 04 already decided they won't be positioned as competitive search content, so first-hand investment there has the lowest return on the site. If that call should be revisited for any specific one of them, say so and we'll add it to this form in a follow-up pass.
