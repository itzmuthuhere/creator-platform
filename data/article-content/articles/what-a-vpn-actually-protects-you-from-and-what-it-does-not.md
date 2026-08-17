# What a VPN Actually Protects You From, and What It Does Not

URL: (not live) /what-a-vpn-actually-protects-you-from-and-what-it-does-not
Category: Tech | Status: Scheduled | Quality Score: 6 | Editorial Decision: IMPROVE
Editorial Reason: One of the more factually grounded scheduled pieces thanks to a correctly-dated CERT-In VPN-logging citation; still unsourced beyond that one detail.
Subtitle: The encrypted tunnel explained honestly, including the part where you're just trusting a different company instead of your ISP
Keywords: what does a vpn actually protect, is vpn safe india, free vpn risk, vpn no logs policy, vpn cert-in rules

---

VPN marketing tends to blur "encrypts your traffic" into "makes you invisible online," and those are two very different claims. Strip away the branding and a VPN does exactly one technical thing — everything it protects, and everything it doesn't, follows from that single mechanism.

[IMAGE: Key points: How the tunnel works, What it protects against, What it does not protect against, The part VPN ads don't emphasize: you're trusting the provider, VPNs and Indian law]

## How the tunnel works
A VPN app on your device creates an encrypted connection to a VPN server operated by the provider, and routes all your internet traffic through it. To anyone watching the network between your device and that server, like someone on the same public Wi-Fi, or your local ISP, the traffic is unreadable and its destination is hidden. Websites you visit see the VPN server's IP address and location instead of yours. That's the entire mechanism, everything else is a consequence of this one thing.

## What it protects against
On public Wi-Fi at a cafe or airport, unencrypted traffic can be intercepted by anyone else on that network using freely available tools, a VPN closes that off entirely. It also hides your browsing destinations and IP address from your ISP, which is relevant in India given that ISPs can and do log and sometimes throttle traffic by category, and it lets you appear to browse from a different country's IP, useful for accessing region-locked content or your home services while traveling.

## What it does not protect against
A VPN does not stop malware, it just encrypts the pipe malware can still travel through if you download an infected file. It does not protect you from phishing, a fake bank login page is exactly as convincing over a VPN as without one. It does not make websites unable to identify you if you're logged into an account, Google still knows it's you regardless of which IP address you're connecting from, because you handed over your login. And it does nothing to prevent apps installed on your device from harvesting data locally before it ever reaches the network.

## The part VPN ads don't emphasize: you're trusting the provider
Your ISP can no longer see your traffic once it's inside the VPN tunnel, but the VPN provider now can, since traffic is decrypted at their server before going to the destination site. A "no-logs" claim is only as good as the company's honesty and jurisdiction, and it isn't independently verifiable by an ordinary user in most cases, even audited ones rely on trusting the audit's scope. Free VPN apps are a particular risk here: running servers costs money, so a free VPN's business model is very often selling aggregated or even individual traffic data to advertisers, which defeats the entire point of using one.

## VPNs and Indian law
India's CERT-In rules (in effect since 2022) require VPN providers offering service in India to maintain certain customer logs (name, validated address, usage period, IP addresses assigned) for a defined retention period. Many major consumer VPN providers responded by removing their physical servers from India rather than complying, meaning your "India" server location may not exist, and traffic may be routed abroad. This doesn't affect the day-to-day encryption, but it's worth knowing when a provider markets an Indian server option.

## What Split Tunneling Actually Changes
Some VPN apps offer split tunneling, letting you choose which apps route through the VPN and which use your normal connection directly. Useful for keeping a banking app, which may flag VPN traffic as suspicious, on your regular network while still routing browsing traffic through the tunnel. Worth checking if a specific app misbehaves or logs you out unexpectedly while connected.

## Why VPN Speed Varies So Much Between Providers
Every VPN adds some latency simply from routing traffic through an extra server, but the actual slowdown varies enormously by provider, based on server capacity and physical distance to the server you connect to. Choosing a server geographically closer to your location, even if you don't need that specific country, usually improves speed noticeably compared to a distant server chosen at random.

## A VPN Doesn't Replace Checking a Site's Own Security
Connecting through a VPN to a site that itself doesn't use HTTPS still leaves that final leg of the connection, from the VPN server to the destination site, unencrypted and readable. The padlock icon in your browser confirming HTTPS is still worth checking regardless of whether a VPN is active, since the VPN protects the first leg of the journey, not the entire path.

## Picking a Provider Without Falling for Marketing Claims
Independent security audits, a clear jurisdiction stated upfront, and a transparent history of how the company has responded to past legal requests are better signals than a long feature list or an aggressive discount banner. Worth a quick search for a provider's actual audit history and any past controversies before committing to a subscription based on advertising alone.

## When a VPN is worth using
- Regularly connecting to public or unfamiliar Wi-Fi.
- Wanting to keep browsing categories private from your ISP.
- Accessing your home country's content while traveling abroad.

A VPN earns its cost in exactly those three situations — and it works best alongside a password manager and 2FA, not instead of them, since encrypting the pipe was never the same thing as securing what travels through it.