# How to check if a link is safe before you click it

Most scam links in India arrive by SMS or WhatsApp: a parcel that couldn't be delivered, a KYC update, an electricity disconnection, a traffic fine. Knowing how to check if a link is safe comes down to one skill: reading the link's real address. Once you can do that, most fakes are obvious within seconds, and two free online checkers handle the rest.

This guide gives you a 30-second routine, shows how to read a web address correctly, explains what free scanners can and can't tell you, and covers what to do if you've already clicked.

## The 30-second routine

1. **Don't tap yet.** On a phone, long-press the link and choose to copy it or preview it; on a computer, hover over it and read the address shown at the bottom of the browser.
2. **Find the real domain** (explained below). Is it exactly the official site's address?
3. **Read the message, not just the link.** Urgency, threats and requests for OTPs or card details are red flags on their own.
4. **If in doubt, check it** with Google's Safe Browsing status or VirusTotal.
5. **Better still, don't use the link at all.** Open the official app or type the official website yourself, and check there.

Step 5 is the most reliable. A real bank, courier or government notice will also show up when you go to the official site directly.

## How to read a link's real address

A web address has one part that matters: the **domain**, the name just before the first single slash (`/`). Read it from right to left, from the ending (`.com`, `.in`, `.gov.in`) back to the first dot.

Some fictional examples, for a bank whose real site is `yourbank.com`:

| Link | Real domain | Safe? |
|---|---|---|
| `https://yourbank.com/kyc` | yourbank.com | Yes, it's the bank |
| `https://netbanking.yourbank.com/login` | yourbank.com | Yes; "netbanking." is just a section of the bank's site |
| `https://yourbank.com.kyc-update.xyz/login` | kyc-update.xyz | **No.** The bank's name is only decoration in front of someone else's domain |
| `https://yourbank-secure.in/verify` | yourbank-secure.in | **No.** An extra word makes it a different site |
| `https://y0urbank.com` | y0urbank.com | **No.** A zero instead of an "o" |

1 Minute Tech's [video](https://www.youtube.com/watch?v=2UpiA-bPcPs) shows the same tricks with swapped letters and long hyphenated names. Two more things to know:

- **The padlock (HTTPS) doesn't mean safe.** It only means the connection is encrypted. Scam sites get certificates for free too.
- **Short links** (bit.ly and the like) hide the destination. Use a link expander or a scanner before opening one from a stranger.

Government websites in India end in **.gov.in** or **.nic.in**. A "traffic challan" or "electricity bill" link on any other ending deserves suspicion.

## Red flags in the message itself

- **Pressure:** "account blocked today", "power will be cut tonight", "final notice".
- **Asking for an OTP, PIN, card number or password.** No genuine organisation asks for these through a link in a message.
- **A small payment to "release" something:** a parcel fee, a KYC charge, a pending fine.
- **Sent from an ordinary mobile number** rather than the organisation's registered sender ID.
- **Spelling and grammar slips**, though good scams often have none.

Our guide to [how UPI fraud happens](https://techpulzo.in/how-upi-fraud-actually-happens-the-five-warning-signs) covers the patterns behind these messages.

## Two free checkers, and their limits

**Google Safe Browsing site status.** Paste a website into Google's [Transparency Report checker](https://transparencyreport.google.com/safe-browsing/search?hl=en) to see whether Google currently considers it dangerous. Google says it examines billions of web addresses a day and finds thousands of new unsafe sites daily, many of them legitimate sites that have been hacked. This is the same data behind Chrome's red warning pages.

**VirusTotal.** Paste the full link into VirusTotal's URL scanner. According to its [documentation](https://docs.virustotal.com/docs/how-it-works), it runs the link past more than 70 antivirus engines and blocklists and shows how many flag it. If several flag it, stay away.

The limits matter:

- **A clean result isn't proof of safety.** VirusTotal says so itself: brand-new scam sites often haven't been reported yet.
- **What you submit to VirusTotal is shared** with its security community. Don't paste links that contain personal details, such as a password-reset link or a document link meant only for you.

SYED FAYAJ's [analyst walkthrough](https://www.youtube.com/watch?v=PH7eXIrxPv4) shows more advanced tools such as urlscan.io, which shows where a link redirects and a screenshot of the page without you opening it, and makes the same point: no result doesn't mean safe.

**What not to rely on:** some videos, such as wizdom village's [tutorial](https://www.youtube.com/watch?v=Ey5wWreXXZQ), suggest pasting links into an AI chatbot and asking if they're safe. A chatbot can't reliably check a live website and may simply guess. Use the checkers above, or better, go to the official site yourself.

<!-- AUTHOR: If you've received a scam link recently, one line on what gave it away (with personal details removed) would make this practical. -->

## QR codes

A QR code is just a link you can't read. Scammers paste their own codes over genuine ones in shops and parking areas, or send codes claiming you'll "receive money".

- When your camera shows the link from a QR code, **read the domain** before opening it, exactly as above.
- **You never scan a QR code to receive money** through UPI. Scanning is for paying.
- For payments, check the name your UPI app shows before you enter your PIN.

## If you already clicked

- **If you only opened the page:** close it. Opening alone usually does little harm on an updated phone, but don't enter anything or download anything.
- **If you entered a password:** change it immediately on the real site, and anywhere you reused it. Turn on [two-factor authentication](https://techpulzo.in/how-two-factor-authentication-actually-stops-account-hacks).
- **If you entered card, bank or UPI details, or an OTP:** call your bank now to block the card or UPI, then report the fraud on **1930** or **cybercrime.gov.in** as quickly as possible.
- **If you installed an app or file from the link:** uninstall it, run a security scan, and change passwords from a different device.

## Report it

Reporting helps others and gets the number blocked:

- **Chakshu** on the government's [Sanchar Saathi portal](https://www.sancharsaathi.gov.in/) is for reporting suspected fraud calls, SMS and WhatsApp messages.
- **1930** or cybercrime.gov.in if you lost money.
- Report and block the sender in WhatsApp, and mark SMS as spam; our guide to [stopping spam calls and SMS](https://techpulzo.in/how-to-stop-spam-calls-and-sms-on-an-indian-sim-the-settings-that-actually-help) covers the settings.

## Frequently asked questions

### How can I check if a link is safe without clicking it?

On a phone, long-press the link and copy or preview it; on a computer, hover over it to see the real address. Check the domain (the part just before the first single slash) is exactly the official one. If unsure, paste it into Google's Safe Browsing status checker or VirusTotal.

### Does HTTPS mean a website is safe?

No. HTTPS and the padlock only mean the connection is encrypted. Scam sites can get HTTPS certificates for free, so always check the domain name itself.

### Is VirusTotal reliable for checking links?

It's a useful second opinion because it combines more than 70 security engines, but a clean result doesn't prove a link is safe, since new scam sites may not be flagged yet. Also avoid pasting links that contain personal information, because submissions are shared with the security community.

### What should I do if I clicked a phishing link?

If you only opened it, close the page. If you entered a password, change it on the real site and enable two-factor authentication. If you entered bank or card details or an OTP, call your bank immediately and report the fraud on 1930 or cybercrime.gov.in.

### How do I report a scam link in India?

Use Chakshu on the Sanchar Saathi portal to report suspected fraud SMS, calls and WhatsApp messages. If you've lost money, call 1930 or file a complaint at cybercrime.gov.in as soon as possible.

## The one habit

Read the domain before you tap, and when a message asks you to act, go to the official app or website yourself instead of using its link. That single habit stops most scams before they start.
