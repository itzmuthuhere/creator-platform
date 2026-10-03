# Private DNS on Android: what it does and whether you should change it

Private DNS is a setting on Android 9 and later that encrypts the "address lookups" your phone makes every time you open a website or app. Left on its default, Automatic, it already does that whenever your network supports it. Changing it to a named provider is worth doing for one reason: filtering. Some free DNS services block known malware sites, adult content or ads before your phone ever connects to them.

This guide explains what Private DNS does and doesn't protect, the three settings, which provider to pick for which need, and how to undo it if something breaks.

## What DNS and Private DNS are

Before your phone can open a website such as `wikipedia.org`, it has to ask a **DNS server** for that site's numeric address, much like looking up a number in a phone book. Traditionally that question travels unencrypted, so anyone on the network path (a public Wi-Fi operator, for instance) can see which sites you look up, and in some cases tamper with the answer.

**Private DNS** sends those lookups over an encrypted connection (DNS-over-TLS). [Google's Public DNS documentation](https://developers.google.com/speed/public-dns/docs/dns-over-tls) says this protects against eavesdropping and spoofing between your device and the DNS server.

## The three settings

[Android Help](https://support.google.com/android/answer/9654714?hl=en) lists three options under **Settings > Network & internet > Private DNS** (search "Private DNS" in Settings if your brand puts it elsewhere):

| Setting | What happens |
|---|---|
| **Off** | Lookups go unencrypted to whatever DNS server your network provides |
| **Automatic** (default) | Encrypts lookups when your network's DNS supports it; otherwise falls back to normal DNS |
| **Private DNS provider hostname** | Always uses the provider you name, encrypted; if it can't be reached, lookups fail rather than fall back |

Google's documentation calls these two encrypted approaches "opportunistic" and "strict" privacy. Automatic is the opportunistic one; naming a provider is strict.

## What it does and doesn't protect

Android Help is blunt about the limit: Private DNS **secures only DNS questions and answers. It can't protect anything else.**

- It hides your site lookups from the local network, and stops them being altered on the way.
- It doesn't hide which websites you visit from the sites themselves, and your internet provider can still see which servers your phone connects to.
- It isn't a VPN and doesn't change your location. Our guide to [what a VPN does and doesn't protect](https://techpulzo.in/what-a-vpn-actually-protects-you-from-and-what-it-does-not) covers that difference.
- It moves your lookups to a new company. When you name a provider, that provider sees every site your phone looks up instead of your mobile operator. Choose one whose privacy policy you're comfortable with.

## Should you change it?

| Your goal | Setting | Hostname to enter |
|---|---|---|
| Just encryption, no fuss | Leave on **Automatic** | — |
| Encryption with a fast, well-known resolver | Provider hostname | `one.one.one.one` (Cloudflare) or `dns.google` (Google) |
| Block known malware and phishing sites | Provider hostname | `security.cloudflare-dns.com` |
| Block malware and adult content (for a child's phone) | Provider hostname | `family.cloudflare-dns.com` or `family.adguard-dns.com` |
| Block many ads and trackers in browsers and apps | Provider hostname | `dns.adguard-dns.com` |

*Hostnames from [Cloudflare's setup guide](https://developers.cloudflare.com/1.1.1.1/setup/android/), Google's Public DNS documentation and [AdGuard's list of public servers](https://adguard-dns.io/kb/general/dns-providers/). On Android, enter the hostname alone, without "tls://" or "https://".*

For most adults, Automatic is fine. The filtering options are where Private DNS earns its place: the family hostnames are a simple layer of protection for a child's phone, alongside the approach in our guide to [parental controls](https://techpulzo.in/how-to-set-up-parental-controls-without-making-a-teenager-furious).

**What about speed?** Switching for speed rarely pays off. In our own test of six resolvers from a home fibre connection in India (1,800 lookups over two runs on 29 September 2026), the internet provider's default resolver was the fastest, with a median of about 5 milliseconds for popular sites. Cloudflare was the quickest public option at about 8 ms, Google was around 30 ms, and Quad9 took over 300 ms because its queries were answered from outside India. Your results depend on your provider's network, but differences of a few milliseconds per lookup aren't something you'll notice. That test measured ordinary DNS rather than the encrypted Private DNS connection, so treat it as a guide to each provider's distance from you, not an exact figure.

<!-- AUTHOR: Link this paragraph to the "fastest DNS in India" article once it's published (draft: content/drafts/fastest-dns-india). -->

**About ad-blocking.** DNS-based blocking stops ads that come from separate ad domains, such as banners on websites and in some apps. It can't block ads served from the same domain as the content; Mate Gamer's [test video](https://www.youtube.com/watch?v=iMsPvgzz0kY) shows it doing little against YouTube's ads, for example. Our guide to [turning off ads in free Android apps](https://techpulzo.in/how-to-turn-off-ads-in-free-android-apps-what-is-legal-and-what-is-not) covers the other options.

<!-- AUTHOR: If you use a filtering DNS on your own phone, one line on what it blocked or broke would help readers. -->

## How to set a provider

1. Open **Settings** and search for **Private DNS**.
2. Choose **Private DNS provider hostname**.
3. Type the hostname exactly, for example `one.one.one.one`, and tap **Save**.
4. Open a couple of websites to confirm everything loads.

Some phones (Samsung, for example) place it under Connections > More connection settings. Chrome also has its own **Use secure DNS** option in its privacy and security settings, which applies only inside Chrome.

## Problems, and how to undo

- **Wi-Fi with a sign-in page** (hotels, airports, trains) may not load its login page when a strict provider is set. Switch to Automatic, sign in, then switch back.
- **"Couldn't connect" or nothing loading:** the hostname may be mistyped, or the network blocks encrypted DNS. Check the spelling or switch to Automatic.
- **A site, payment page or app login stops working** with an ad-blocking DNS: some shopping links, coupon sites and app features rely on domains that get blocked. Switch to a non-filtering hostname or Automatic.
- **Work or college networks** may require their own DNS; use Automatic there.

To undo anything, set Private DNS back to **Automatic**.

## Frequently asked questions

### What is Private DNS on Android?

It's a setting that encrypts the lookups your phone makes to find websites' addresses, so people on the same network can't see or alter them. It's available on Android 9 and later under Network & internet settings.

### Should I turn Private DNS off?

No. Android's own help recommends keeping it on. Automatic encrypts lookups when the network supports it and falls back safely when it doesn't. Turn it off only briefly to troubleshoot a network that won't connect.

### What is the best Private DNS for Android?

It depends on what you want. For plain encryption, Cloudflare's one.one.one.one or Google's dns.google work well. For blocking malware, use security.cloudflare-dns.com; for a child's phone, family.cloudflare-dns.com or family.adguard-dns.com; to block many ads, dns.adguard-dns.com.

### Can Private DNS block ads?

Partly. An ad-blocking provider such as AdGuard DNS blocks ads that load from separate ad domains, which covers many banner ads in browsers and some apps. It can't block ads served from the same domain as the content, such as most YouTube ads.

### Does Private DNS work like a VPN?

No. It encrypts only DNS lookups. Your IP address, location and the sites you connect to are otherwise unchanged. A VPN encrypts all your traffic and routes it through another server.

## The short answer

Keep Private DNS on Automatic unless you want filtering. If you do, pick one hostname from the table, test a few sites, and remember that Automatic is always one tap away if something stops working.
