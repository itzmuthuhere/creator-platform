# How to Set or Reset Your UPI PIN with Aadhaar (No Debit Card Needed)

Most people who get stuck setting a UPI PIN with Aadhaar aren't stuck on the app. They're stuck on a phone number. In the Aadhaar flow the apps use, one one-time password goes to the mobile number linked to your **Aadhaar**, and a second goes to the number registered with your **bank**. If either of those is an old SIM, or a parent's phone, the process stalls at "OTP not received" no matter how many times you retry.

So this guide starts with four checks, then the steps, then the newer face-authentication option, and a table for when it still doesn't work.

## Before you start: four checks

1. **Your bank account has your Aadhaar linked to it.** Apps show the Aadhaar option only for accounts where Aadhaar is linked, and not every bank offers it. If you don't see "Aadhaar" as an option for your account, ask your bank.
2. **You have the phone for the Aadhaar-linked mobile number.** This is the number you gave when enrolling or updating Aadhaar, not necessarily the one you use today. The Official Sonu TC video describes a common case: the Aadhaar was linked to a family member's number years ago, so the OTP goes to their phone.
3. **You have the phone for the bank-registered mobile number.** Usually this is the phone you're setting up UPI on. If it's different from the Aadhaar number, keep both phones with you.
4. **Both SIMs can receive SMS right now:** active, with signal, and not on a plan with SMS blocked.

If the two numbers are different and you want future resets to be simpler, update one to match the other: your Aadhaar mobile through UIDAI, or your bank mobile through your bank.

## Steps to set or reset the PIN

The menu names differ slightly between PhonePe, Google Pay, Paytm, BHIM and bank apps, but the flow is the same everywhere:

| Step | What you do | What to watch for |
|---|---|---|
| 1 | Open your UPI app → your bank account → **Set UPI PIN** / **Reset UPI PIN** / **Forgot UPI PIN** | In PhonePe it's under Profile → Bank accounts → the account → UPI PIN → Reset |
| 2 | Choose **Aadhaar** (sometimes labelled "Aadhaar number linked with bank") instead of Debit card | If there's no Aadhaar option, your bank or account doesn't support it yet |
| 3 | Enter the **first 6 digits** of your Aadhaar and continue | Check them twice; a mistake here ends the attempt |
| 4 | Enter the **Aadhaar OTP** (sent to your Aadhaar-linked mobile) | Two SMS may arrive around the same time; use the one that mentions Aadhaar/UIDAI |
| 5 | Enter the **bank OTP** (sent to your bank-registered mobile) | This one comes from your bank's sender ID |
| 6 | Set your new UPI PIN and confirm it | 4 or 6 digits, depending on your bank |

The SUBARAJ TECH walkthrough points out the easiest mix-up: both OTPs can arrive within seconds of each other, and the app asks for the Aadhaar OTP first. Open each SMS and check the sender before typing.

Your Aadhaar number isn't stored by the bank in this process. ICICI Bank's UPI FAQ, for example, says the Aadhaar details are [used only for authentication](https://www.icici.bank.in/personal-banking/payments/payer-upi-faqs).

## The newer option: face authentication

In October 2025, at the Global Fintech Fest, NPCI announced that UPI PINs can be set or reset using **Aadhaar-based face authentication**. It uses UIDAI's face-matching app instead of OTPs or card details. [The Week's report](https://www.theweek.in/news/biz-tech/2025/10/07/upi-unleashes-next-gen-features-biometric-payments-aadhaar-pi-ns-and-more-for-faster-transactions.html) describes it as meant for first-time users, senior citizens, and people without easy access to cards.

This is the route to try if the OTP problem is the Aadhaar-linked number: face authentication doesn't need that phone. Availability depends on your UPI app and bank adding it, so look for a face or "Aadhaar Face" option on the same Set/Reset PIN screen.

The same announcement also allowed approving payments with a fingerprint or face instead of the PIN. It's **opt-in**, and [initially capped at ₹5,000 per transaction](https://www.businesstoday.in/personal-finance/news/story/no-more-pins-upi-to-get-face-and-fingerprint-authentication-for-faster-safer-online-payments-497815-2025-10-11). You still need a UPI PIN for everything else.

## When it still doesn't work

| What happens | Most likely reason | What to do |
|---|---|---|
| No Aadhaar OTP arrives | It's going to the mobile linked to your Aadhaar, which isn't the phone in your hand | Find which number is linked (the Official Sonu TC video shows UIDAI's verify service, which reveals the last digits), and use that phone. Or try face authentication |
| Aadhaar OTP arrives, bank OTP doesn't | Your bank has a different or old number on record | Update your mobile number with the bank, then retry |
| No Aadhaar option at all | Your bank hasn't enabled it, or Aadhaar isn't linked to that account | Ask the bank to link Aadhaar to the account, or use your debit card |
| OTPs don't arrive for anyone at your bank | A bank-side outage | The Yah Kaise video describes this happening to Bank of India customers. Use a debit card if you have one, or wait and retry later |
| "Incorrect Aadhaar details" | A typo in the first six digits | Re-enter carefully |
| SMS arrives late or not at all | Poor signal, SMS blocked, or full inbox | Check signal and SMS settings; wait a minute before requesting again |

Clearing the app's cache or reinstalling rarely fixes an OTP problem, because the OTPs come from UIDAI and your bank, not from the app.

<!-- AUTHOR: If you've set a UPI PIN for a parent or relative whose Aadhaar was linked to a different phone, a line on how you sorted it out would be the most useful real-world example here. -->

## After setting it

- **Test it straight away** with a balance check in the app. It asks for the new PIN, so if the balance shows, the PIN works.
- **You usually don't need to set it again in another app.** The PIN belongs to your bank account, not the app, so linking the same account in another UPI app typically uses the same PIN (as the Yashpal Yadav video shows).
- **Three wrong attempts lock UPI payments for a day.** ICICI's FAQ says entering a wrong UPI PIN three times in a row blocks UPI debits for the next 24 hours, though you can reset the PIN right away. Many banks have a similar rule, so check yours.
- **You never need your PIN to receive money.** Anyone who asks you to enter your UPI PIN to "receive" a payment, refund or prize is trying to take money from you. Our guide to [how UPI fraud happens](https://techpulzo.in/how-upi-fraud-actually-happens-the-five-warning-signs) covers the other common tricks.

## Frequently asked questions

### Can I reset my UPI PIN with Aadhaar even if I have a debit card?

Yes. Aadhaar is an alternative, not a replacement, so you can pick either option on the reset screen. If you have the card and the Aadhaar OTP isn't arriving, the card route is usually quicker.

### Why does it ask for only the first six digits of my Aadhaar?

That's how the app flow is designed. The six digits identify you for the OTP request, and the OTPs do the actual verification. Only enter them inside your UPI or bank app, never in a link or on a call.

### My Aadhaar is linked to an old number I no longer have. What now?

Update the mobile number on your Aadhaar through UIDAI (the Aadhaar app or an Aadhaar Seva Kendra), then retry. Or use your debit card, or face authentication where your app offers it.

### Is the UPI PIN 4 or 6 digits?

It depends on your bank. The app shows how many digits to enter when you set it.

### I forgot my PIN and entered it wrong three times. Can I still reset it?

Yes. The 24-hour block is on payments, not on resetting. Reset the PIN with Aadhaar or your debit card and carry on.

## Fix the phone number, and the rest takes two minutes

When the Aadhaar route fails, it's almost always because the two OTPs are going to phones you don't have. Sort out which numbers are linked where, keep both phones handy (or use face authentication if your app has it), and the actual PIN change is just six steps.
