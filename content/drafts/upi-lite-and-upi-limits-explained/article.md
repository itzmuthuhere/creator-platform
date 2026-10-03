# UPI Lite and UPI limits explained: what changes in October 2026

UPI Lite is a small balance inside your UPI app that pays up to ₹1,000 at a time without your UPI PIN. It's meant for tea, auto fares and groceries: the payments that clutter your bank statement and occasionally fail at the worst moment. This guide covers how it works and when it's worth turning on, lists every UPI limit that applies in 2026, and explains the merchant charge that starts on 15 October 2026 and what it does and doesn't mean for you.

## What UPI Lite is

Normal UPI debits your bank account directly every time you pay, and asks for your PIN each time. Lite works differently:

1. You move some money, up to ₹5,000, from your bank account into a UPI Lite balance in your app. This top-up needs your PIN.
2. Small payments are then taken from that balance, with no PIN.
3. Your bank statement shows only the top-up, not each small payment. The individual payments appear in the app's Lite history.

The Reserve Bank of India treats UPI Lite under its [framework for small-value payments in offline mode](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12215&Mode=0). In RBI's words, a Lite payment is offline only in the sense that no extra authentication is needed and transaction alerts aren't sent in real time. It still uses the UPI network, so it doesn't need a different QR code; the shop's normal UPI QR works.

## UPI Lite limits and rules

| Rule | Limit or answer |
|---|---|
| Per payment | Up to ₹1,000 |
| Balance at any time | Up to ₹5,000 |
| PIN needed? | Not for payments; yes for adding money |
| Bank SMS for each payment? | No; history is in the app |
| Money back to bank | Yes, using the app's transfer-out option |

*Limits per RBI's framework as updated on 4 December 2024.*

Two later additions made it more practical. **Auto top-up** lets the app refill the balance from your bank when it falls below a level you set. And since March 2025, NPCI has required apps to offer a **transfer-out** option, so you can move the balance back to your bank without switching the feature off, as [Angel One reported](https://www.angelone.in/news/market-updates/upi-lite-users-will-soon-be-able-to-withdraw-funds) at the time. The same NPCI instructions asked apps to require a phone or app lock (passcode, fingerprint or pattern), because anyone holding your unlocked phone could otherwise spend the balance without a PIN.

## When UPI Lite is worth using, and when it isn't

**Worth it if:**

- You make many small payments a day and want a cleaner bank statement. Aadi Singh's video makes this point well: one ₹2,000 top-up replaces dozens of ₹15 and ₹40 entries, which makes it easier to find the payments that matter.
- Your bank's UPI often times out at busy moments. Because Lite payments don't need your bank to approve each debit in real time, they tend to go through faster. That isn't a guarantee: the video's claim that there are "no server issues" goes too far, since Lite still depends on the UPI network and the app.

**Not worth it if:**

- You rarely pay small amounts. A balance sitting in Lite earns nothing.
- You share your phone or don't use a screen lock. Treat the Lite balance like cash in your pocket, and keep it small.
- You track spending from your bank statement or a budgeting app that reads bank SMS. Lite payments won't show up there; you'll need the app's history.

<!-- AUTHOR: If you use UPI Lite, one line on whether it changed how you pay day to day would add a real view here. -->

## How to turn it on, top up and take money out

The exact menus differ between Google Pay, PhonePe, Paytm and BHIM, but the steps are the same:

1. Open your UPI app and look for **UPI Lite** on the home screen or under your profile.
2. Choose the bank account to fund it from (your bank must support UPI Lite).
3. Enter an amount up to ₹5,000 and confirm with your UPI PIN.
4. Optionally, switch on auto top-up and set the level that triggers it.
5. To pay, scan a QR code as usual. For ₹1,000 or less, the app offers to pay from UPI Lite without a PIN.
6. To take money out, open UPI Lite and choose the option to transfer the balance to your bank.

If you change phones or uninstall the app, transfer the balance out first, or disable the feature, which also sends the balance back to your bank.

## All the UPI limits in one place

Outside UPI Lite, the limits depend on who you're paying.

| Payment type | Per transaction | Per day |
|---|---|---|
| UPI Lite | ₹1,000 | Balance up to ₹5,000 at a time |
| Person to person (sending money to someone) | Up to ₹1 lakh | ₹1 lakh |
| Capital markets, insurance, travel, Government e-Marketplace, collections (such as loan EMIs) | ₹5 lakh | ₹10 lakh |
| Credit card bill payment | ₹5 lakh | ₹6 lakh |
| Jewellery | ₹5 lakh | ₹6 lakh |
| Digital account opening, foreign exchange via Bharat Bill Pay | ₹5 lakh | ₹5 lakh |

*Higher merchant limits effective from 15 September 2025, as summarised by [CAalley](https://www.caalley.com/news-updates/indian-news/upi-transaction-limits-for-these-categories-set-to-change-from-september-15-2025-see-the-list).*

These are the maximums NPCI allows. Your bank can set lower limits, and some banks apply a lower cap for a while after you add a new payee or register a new phone. If a large payment fails, your bank's own UPI limit is the first thing to check.

## The UPI charge from 15 October 2026: what it means for you

On 15 September 2026, NPCI published FAQs on a **merchant discount rate (MDR)** for UPI: a fee charged to merchants, as with cards, which has not applied to UPI until now. [SCC Online's summary of the FAQs](https://www.scconline.com/blog/post/2026/09/16/npci-released-upi-mdr-faqs-explained/) sets out the rules, which start on 15 October 2026:

| Payment | Charge (paid by the merchant) |
|---|---|
| Sending money to a person | None, at any amount |
| Paying a merchant ₹2,000 or less | None |
| Paying a merchant more than ₹2,000 | 0.4%, capped at ₹300 (reached at ₹75,000) |
| Railways, telecom, insurance, fuel, utilities above ₹2,000 | Flat ₹5 per payment |
| Mutual funds, stockbrokers and other capital markets | 0.02%, capped at ₹300 |
| Small merchants receiving up to ₹1 lakh a month by UPI QR | None |
| UPI payments using a RuPay credit card or bank credit line | Outside this framework |

Some examples of what the merchant pays: ₹40 on a ₹10,000 purchase, ₹300 on a ₹1 lakh purchase, ₹5 on a ₹3,000 electricity bill, and ₹20 when you move ₹1 lakh to your broker.

**What it means for you:**

- **You don't pay it.** According to the FAQs, merchants aren't allowed to pass the MDR on to customers, and UPI apps can't charge platform fees. If a shop adds a "UPI charge" to your bill, that's against the rules.
- **Most of your payments are unaffected.** The FAQs say the ₹2,000 threshold keeps more than 95% of merchant payments by volume free, and Lite payments are all under ₹1,000.
- **You may notice side effects.** Asset Yogi's video points out that some shops may push for cash on larger bills or ask you to split a payment, and that online platforms could recover the cost through smaller discounts. Neither is allowed to show up as a direct surcharge, but prices and offers can change.

Cards already charge merchants this kind of fee; our comparison of [credit and debit cards for everyday spending](https://techpulzo.in/credit-card-vs-debit-card-for-everyday-spending-what-actually-saves-you-money) explains how those fees shape the offers you see. Payment apps have their own ways of earning, too, as we covered in [how cashback apps make money](https://techpulzo.in/how-cashback-apps-actually-make-money-off-you).

## Frequently asked questions

### What is the UPI Lite limit?

You can pay up to ₹1,000 per transaction from it, and the balance can be up to ₹5,000 at any time. Adding money needs your UPI PIN; payments don't. These limits come from RBI's offline payments framework as updated in December 2024.

### Can I move money from UPI Lite back to my bank account?

Yes. UPI apps offer a transfer-out option that moves the balance back to your linked bank account without switching the feature off. You can also disable it, which returns the balance to your bank.

### Will I be charged for UPI payments from October 2026?

No. The charge that starts on 15 October 2026 is paid by merchants, only on merchant payments above ₹2,000, and NPCI's FAQs say merchants can't pass it on to customers. Sending money to friends and family stays free at any amount.

### What is the UPI limit per day for sending money to someone?

₹1 lakh per day for person-to-person transfers under NPCI's limits. Your bank may set a lower limit, especially for a new payee or a newly registered phone. Higher limits of ₹5 lakh per transaction apply to some merchant categories, such as insurance premiums and investments.

### Is UPI Lite safe if I lose my phone?

Anyone who can unlock your phone can spend the Lite balance without a PIN, which is why apps now require a screen or app lock. Keep the balance small, use a strong lock, and if you lose the phone, contact your bank and the app to block UPI.

## The short version

Turn on Lite if you make lots of small payments and keep a screen lock on your phone; keep the balance modest. For larger payments, normal UPI's limits are generous, but your bank's own limits may be lower. And the new charge from 15 October 2026 is a merchant's cost, not yours: if a shop tries to add it to your bill, you can refuse.
