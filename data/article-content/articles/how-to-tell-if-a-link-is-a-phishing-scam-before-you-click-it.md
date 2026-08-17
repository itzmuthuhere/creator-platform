# How to Tell If a Link Is a Phishing Scam Before You Click It

URL: (not live) /how-to-tell-if-a-link-is-a-phishing-scam-before-you-click-it
Category: Tech | Status: Scheduled | Quality Score: 6 | Editorial Decision: IMPROVE
Editorial Reason: Genuinely more specific than typical phishing content (correct padlock-doesn't-mean-ownership point, real India-relevant domain examples); needs sourcing beyond the one CERT-In citation.
Subtitle: The actual mechanics of checking a URL, not just looking for spelling mistakes
Keywords: how to spot phishing link, check if link is safe, phishing link india, fake bank sms link, url shortener scam

---

Most phishing links do not look obviously fake anymore. The logo is right, the grammar is fine, and the page loads with a padlock icon, which a lot of people still treat as a safety signal. It is not — the padlock only means the connection between you and whatever server is hosting the page is encrypted; it says nothing about who owns that server. A scammer can get a free HTTPS certificate for a phishing page in minutes, which is why that particular check has stopped meaning anything. What still works is reading the URL itself correctly, which most people never learned to do in the first place.

[IMAGE: Key points: Read the domain, not the whole URL, Hover before you tap, and know it fails on mobile, Expand shortened links before opening them, Watch for lookalike characters and extra words, Judge the context, not just the link]

## Read the domain, not the whole URL
The part that matters is the registered domain: the last two segments right before the first single slash after the protocol. Everything before that (subdomains) and after that (the path) can be written by whoever bought the domain, including scammers. So a link like accounts.google.com.verify-login.xyz/reset is not a Google domain at all. The real domain is verify-login.xyz; accounts.google.com is just a fake subdomain tacked on to fool a quick glance. Train your eye to isolate the domain and ignore everything around it.

## Hover before you tap, and know it fails on mobile
On a desktop, hovering over a link without clicking shows the real destination in the browser or email client's status bar. This catches the classic trick where the visible text says one bank's name but the underlying link points elsewhere. On a phone there is no hover state, which is exactly why phishing sent over SMS and WhatsApp works so well. A long-press on a link in most mobile browsers and messaging apps shows a preview of the actual URL before you open it. Use that preview every time a message asks you to log in, verify, or claim something urgently.

## Expand shortened links before opening them
Links from bit.ly, tinyurl, or India-specific shorteners hide the real destination entirely. Instead of tapping directly, paste the shortened link into a URL-expander website, or add a plus sign after a bit.ly link in the address bar, which shows a preview page before redirecting. If a message uses a shortener for something that claims to be from your bank or a government service, treat that as a warning sign by itself — real institutions almost never need to shorten their own links.

## Watch for lookalike characters and extra words
Typosquatting relies on domains that are one character off — a swapped letter, an extra hyphen, or a different top-level domain like .info or .xyz instead of .com or .in. A more advanced version uses characters from other alphabets that render identically to Latin letters (homoglyph attacks), though this is rarer in everyday scams. More commonly in India, you will see domains that just add a plausible word: sbi-kyc-update.com, or hdfcbank-rewards.in. No bank owns a domain that isn't their exact registered name plus their exact top-level domain.

## Judge the context, not just the link
Phishing succeeds by pairing a link with urgency: your KYC will expire today, your account is suspended, you have won a prize, a parcel is stuck in customs and needs a small payment. Legitimate organizations do send time-bound notices, but they don't combine urgency with a demand to click a link and enter credentials or OTPs immediately. If the message creates panic and offers a single link as the fix, slow down on purpose — that reaction is the actual attack, the link is just the delivery mechanism.

## A Habit Worth Building for Every Unexpected Message
Before evaluating a link at all, pausing to ask whether you were expecting this specific message from this specific sender is a faster first filter than checking domain spelling, an unexpected message claiming urgency is itself informative regardless of how the link looks, since legitimate time-sensitive notices rarely arrive completely out of the blue with no prior context.

## If you already clicked
Clicking a link alone rarely compromises you; entering information on the page that opens is what matters. If you entered a password, change it immediately on the real site (typed directly, not via the link) and change it anywhere else you reused it. If you entered an OTP or card details, contact your bank's official number immediately and ask them to block the card or freeze the account. If the page tried to get you to install an app or profile, uninstall it and consider a factory reset for anything that asked for accessibility permissions, since those can be used to read your screen.

## QR Code Phishing Is Its Own Growing Problem in India
Given how much everyday payment in India runs through scanning a UPI QR code, scammers have adapted the same tricks to QR codes specifically, sometimes called quishing. A pasted-over QR sticker on a genuine payment counter, or a QR code sent over WhatsApp claiming to be for a refund, can redirect a scan to a fake payment collection request instead of a normal payment. Before scanning any QR code that arrived through a message rather than a physical, trusted counter, check the payee name that appears after scanning but before confirming, most UPI apps show this clearly, and cancel if it doesn't match who you expect.

## Checking Email Headers When Something Feels Off
Beyond the visible sender name, the actual reply-to or from address in an email's full headers often reveals a mismatch a quick glance misses, a sender labeled as your bank but with a reply address on a completely unrelated domain. Most email clients let you view full headers or expand the sender details with one extra tap or click, and it's worth doing this when an email creates urgency around money or credentials, rather than trusting the display name alone.

## Turning On Your Browser's Built-In Phishing Protection
Chrome, Firefox, and Edge all include a built-in safe browsing or phishing protection feature that checks visited sites against a known-bad list and warns before loading them, and this is generally switched on by default but worth confirming under the browser's security settings. It won't catch a brand-new phishing domain that hasn't been reported yet, but it reliably catches the large number of known, previously reported ones, which is still a meaningful chunk of what circulates at any given time.

## Reporting a Phishing Link Instead of Just Ignoring It
India's CERT-In accepts phishing report submissions through its website, and most banks have a dedicated email address or in-app option for reporting a suspicious message impersonating them. Reporting takes a couple of minutes and doesn't undo whatever already happened, but it does help get the domain flagged and blocked faster for the next person who receives the same message, particularly useful since phishing campaigns are typically sent to thousands of numbers or addresses at once from the same source.

## Why Some Phishing Sites Only Work Once
A growing number of phishing pages are built to detect whether they're being viewed by a real target or a security scanner, and serve a harmless blank page to anything that looks like automated inspection while showing the actual fake login form only to real visitors clicking from the original message. This is part of why a link that looked clean when a colleague or a security tool checked it earlier can still be actively dangerous when you click it yourself later, and it's a reason to apply the same caution regardless of what anyone else reported about the link.

## Two-Factor Authentication Reduces the Damage, Even If You're Fooled
Even a careful reader occasionally gets caught by a well-made fake page. Having two-factor authentication enabled on email, banking, and other important accounts means a stolen password alone usually isn't enough for an attacker to get in, since they'd also need the second factor, which a basic phishing page typically doesn't capture unless it mimics an OTP prompt too. It's not a substitute for catching the phishing attempt in the first place, but it's a meaningful backstop when the first line of defense fails.

## Sharing What You Learn With Less Tech-Savvy Family
The domain-reading habit described here takes most people a few tries to build, and it's teachable in five minutes to a parent or relative who's less comfortable with this kind of check. Walking someone through isolating the real domain on one or two real examples together tends to stick better than just telling them to "be careful with links," which is advice too vague to act on in the moment.

## One Habit That Covers Most of This at Once
If you remember nothing else from this, remember to type a bank or service's URL directly into the browser yourself rather than clicking through a message link whenever money or login credentials are involved. It sidesteps nearly every trick covered above in one move.
Most of this comes down to a few seconds of friction: isolating the real domain before you trust a link, previewing it instead of tapping blind, and treating a message that pairs urgency with a login page as the actual attack rather than the inconvenience. Scammers are counting on you moving faster than that.