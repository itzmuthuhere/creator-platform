# How HTTPS Works — What's Really Happening Behind the Padlock

URL: https://techpulzo.in/how-https-actually-works-behind-the-padlock
Category: Tutorials | Status: Published | Quality Score: 6 | Editorial Decision: KEEP
Editorial Reason: Accurate certificate-trust walkthrough with a nice specific touch — uses techpulzo.in itself as the certificate example.
Subtitle: The genuinely clever trick that lets two strangers agree on a secret while being watched
Keywords: how does https work, ssl certificate explained, what does the padlock icon mean, key exchange explained, https vs http

---

This is the kind of thing that made me pause the first time a senior engineer explained it to me properly. Your device and a server that has never met before just agreed on a shared secret, out loud, in front of anyone listening, and did it safely anyway. That happens every single time you see the padlock icon in your browser. It's not a metaphor; it's a specific mathematical trick called a key exchange, and understanding it explains most of what "HTTPS" means.

[IMAGE: Key points: The Problem HTTPS Solves, The Clever Part: Agreeing on a Secret in Public, What Happens When You Load an HTTPS Site, Why the Certificate Step Matters as Much as the Encryption, What the Padlock Guarantees (and What It Doesn't)]

## The Problem HTTPS Solves
Plain HTTP sends data as readable text over the network — anyone positioned between you and the server (a shared Wi-Fi network, an ISP, a compromised router) can read it directly, including passwords typed into a login form. HTTPS wraps that same HTTP traffic in encryption so it looks like random noise to anyone intercepting it, while still being readable by the two ends that are supposed to read it.

## The Clever Part: Agreeing on a Secret in Public
Encrypting data requires a shared secret key that both sides know — but your browser and the server have never communicated before this exact moment, and everything between them can be watched. This looks impossible: how do two strangers agree on a secret while a third party listens to every word? The answer is a mathematical technique (commonly Diffie-Hellman key exchange or a modern variant) where both sides can independently compute the same final secret number using math that's easy to do forward but effectively impossible to reverse — an eavesdropper sees every piece of the exchange and still can't reconstruct the shared secret from it.

## What Happens When You Load an HTTPS Site
- Your browser says hello — it tells the server what encryption methods it supports
- The server responds with its certificate — a file proving "I am techpulzo.in," signed by a trusted third party (a Certificate Authority)
- Your browser checks the certificate — verifying the signature against a list of Certificate Authorities it already trusts, built into the browser or operating system
- Both sides perform the key exchange — arriving independently at the same shared secret without ever transmitting the secret itself
- All further traffic is encrypted using that shared secret, with a faster encryption method (this handshake only happens once per connection, not per request)

## Why the Certificate Step Matters as Much as the Encryption
Encryption alone stops eavesdropping, but it doesn't stop impersonation — without the certificate step, nothing would prevent a malicious network from pretending to be your bank's server and encrypting traffic with you directly, reading everything, while you see a padlock and assume you're safe. The certificate, signed by a Certificate Authority your browser already trusts, is what proves you're talking to the real server and not an impersonator sitting in the middle. This is why a browser shows a hard warning for an invalid or self-signed certificate — the encryption might work fine, but the identity proof is broken.

## What the Padlock Guarantees (and What It Doesn't)
The padlock DOES meanThe padlock does NOT meanYour connection to this specific server is encryptedThe website itself is trustworthy or legitimateYou're talking to the domain shown in the address barThe domain isn't a scam site — scam sites can get valid certificates tooData can't be read by someone eavesdropping on the networkThe data is safe once it reaches the server — a hacked server can still misuse itThis distinction matters. A phishing site with a URL one letter off from your bank's can have a perfectly valid padlock. HTTPS proves you're talking privately to whoever owns that exact domain; it says nothing about whether that domain deserves your trust.

## Why This Matters Beyond Just Browsing
Every API call your phone's apps make, every payment processed online, and every login form submission relies on this same handshake happening correctly. When a developer sees a "certificate error" or "SSL handshake failed" message, it's almost always one of two things: the certificate expired (Certificate Authorities issue them for a limited time, commonly 90 days to a year, to limit damage if one is ever compromised), or the server is presenting a certificate for the wrong domain — both are the certificate step failing, not the encryption math itself.

## Why the Handshake Only Happens Once, Not Every Request
The full key exchange and certificate check described above is computationally expensive, so it only happens once when a connection is first established, not on every single page load or API call. Once the shared secret is agreed upon, both sides switch to a much faster symmetric encryption method for the rest of the session, and modern browsers also reuse existing connections across multiple requests to the same site to avoid repeating the expensive handshake unnecessarily.

## What a Certificate Authority Actually Vouches For
Certificate Authorities issue different tiers of certificates with different levels of verification — domain-validated certificates (the most common, often free via services like Let's Encrypt) only confirm you control the domain, while organization-validated and extended-validation certificates involve actual business verification and cost more. This is worth knowing because a valid padlock on a domain-validated certificate proves almost nothing about who's running the site — it's easy and often free for anyone, including a scammer, to obtain one for a domain they control.

## Why Some HTTPS Sites Still Show "Not Secure"
Usually because the page is loading some resources, images or scripts, over plain HTTP even though the main page itself is HTTPS. This is called mixed content, and it undermines the security guarantee, since those specific unencrypted pieces can still be intercepted or tampered with even on an otherwise HTTPS page. As for whether HTTPS slows a site down, not anymore. Modern hardware and better implementations have made the encryption overhead negligible for almost every website. Sites had a brief real delay from this in HTTPS's early years, but that's not a factor on current infrastructure, and the security you get is worth far more than whatever tiny cost remains.

## Encrypted Isn't the Same as Trustworthy
I still catch junior developers on my team assuming the padlock alone means a site is safe. "HTTP but encrypted" undersells what's happening: two separate mechanisms working together, a clever piece of math that lets two strangers agree on a secret while being watched, plus a trust system of signed certificates that proves who you're talking to. The padlock only confirms the first part is working. Evaluating whether the domain itself deserves your trust is still entirely on you.