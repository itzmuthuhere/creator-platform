# What are passkeys? A plain explanation, and how to set one up

A passkey is a login that replaces your password with something stored on your phone or computer and unlocked with your fingerprint, face or screen PIN. There's nothing to type, nothing to remember and, crucially, nothing a fake website can trick you into handing over. Google, Apple, Microsoft and a growing list of apps support them, and setting one up on your Google account takes about a minute.

This guide covers what passkeys are, why they're safer than passwords, how to set one up and use it on other devices, what happens if you lose your phone, and the limits security researchers found in 2026.

## What a passkey is

When you create a passkey for a website, your device makes a pair of matching keys:

- A **private key** that stays on your device (or in your password manager's encrypted sync).
- A **public key** that the website stores.

When you sign in, the website sends a challenge, your device signs it with the private key after you unlock it with your fingerprint, face or PIN, and the website checks the signature with the public key. As [passkeys.dev](https://passkeys.dev/docs/intro/what-are-passkeys/) puts it, a password is something you remember and type; a passkey is a secret stored on your devices.

Your fingerprint or face never leaves your phone. It only unlocks the passkey locally.

## Why it's safer than a password

Three of the most common ways accounts get taken over don't work against passkeys:

| Threat | Password | Passkey |
|---|---|---|
| A fake login page (phishing) | You can type your password into it | Won't work: your browser only uses a passkey on the real website it belongs to |
| A website's data breach | Stolen passwords can be cracked and reused | The site stores only the public key, which can't be used to sign in |
| Reusing one password everywhere | One leak opens many accounts | Each passkey is unique to one site |

Passkeys.dev describes them as **phishing-resistant** and **breach-resistant** for exactly these reasons. If you've ever reused a password, our explainer on [what happens when one site gets breached](https://techpulzo.in/why-you-should-not-reuse-passwords-what-happens-when-one-site-gets-breached) shows why that last row matters.

## Set one up on your Google account

[Google's help page](https://support.google.com/accounts/answer/13548313?hl=en) lists what you need: a device with a screen lock running Windows 10 or later, macOS Ventura or later, Android 9 or later, or iOS 16 or later, and an up-to-date browser (Chrome or Edge 109+, Safari 16+, Firefox 122+).

1. Go to **myaccount.google.com > Security > Passkeys and security keys**.
2. You may already see a passkey: Android phones signed in to Google often create one automatically, as Jason Rebholz's [tutorial](https://www.youtube.com/watch?v=ckvrKdFNF78) shows.
3. Tap **Create a passkey** and confirm with your fingerprint, face or device PIN.
4. Repeat on your other devices, such as your laptop. You can also add a USB **security key** as an extra passkey.

From then on, Google will offer the passkey at sign-in. Your password still works as a fallback; Google lets you choose whether to **skip the password when possible**.

<!-- AUTHOR: If you've switched your own accounts to passkeys, one line on what the day-to-day sign-in feels like would help readers. -->

## Signing in on another device

If you're signing in on a computer that doesn't have your passkey, choose to use a passkey from another device. The computer shows a **QR code**; scan it with your phone's camera, unlock the phone, and you're signed in. Google says **Bluetooth** must be on for this, because the phone and computer check they're physically close to each other. That proximity check is another reason remote attackers can't misuse it.

Passkeys saved in Google Password Manager (Android, Chrome) or iCloud Keychain (Apple devices) also sync across your own devices, so a new phone signed in to the same account usually has them already.

## If you lose your phone

- **Remove its passkey.** In your Google account's Security settings, remove the passkey for the lost device so it can't be used.
- **Your other devices still work.** That's why it's worth creating passkeys on more than one device, or keeping a security key.
- **Synced passkeys come back** when you sign in on a replacement phone with the same Google or Apple account.
- **Keep recovery options current:** a recovery phone number and email, so you can get back in if every device is lost.

## Are passkeys unbreakable? The 2026 research

No security tool is. At the Black Hat conference in August 2026, researchers showed attacks on the systems *around* passkeys. The most widely reported, by Palo Alto Networks' Unit 42 and covered by [9to5Google](https://9to5google.com/2026/08/04/google-password-manager-passkeys-could-be-at-risk/), targeted passkeys synced through Google Password Manager in Chrome on Windows. Every one of the attacks **required malware already running on the victim's computer**. Google fixed part of the problem, and 9to5Google's conclusion was that passkeys remain safer than passwords; a clean computer wasn't vulnerable.

The Phone Guardian's [video](https://www.youtube.com/watch?v=SOtdmwHqeLA) on the same research makes the useful point that the cryptography behind passkeys wasn't broken; the weak spots were the software around it. What that means for you:

- Keep your computer and browser updated, and avoid installing pirated software or unknown extensions.
- Treat the accounts that sync your passkeys (Google, Apple, Microsoft) as your most important accounts, with strong recovery settings.
- Passkeys still beat passwords against the attacks most people actually face: phishing and data breaches.

## Where else to use them

Look for "passkey" or "sign in without a password" in the security settings of services you use: Microsoft, Apple, Amazon, PayPal, WhatsApp and many others support them, and the list keeps growing. For sites that still need passwords, a [password manager](https://techpulzo.in/how-to-set-up-a-password-manager-in-15-minutes) stores both passwords and passkeys in one place, and [two-factor authentication](https://techpulzo.in/how-two-factor-authentication-actually-stops-account-hacks) remains the best protection where passkeys aren't offered.

## Frequently asked questions

### What is a passkey in simple terms?

It's a login stored on your phone or computer and unlocked with your fingerprint, face or screen PIN. You don't type anything; your device proves to the website that it's you using a key that never leaves your device or your encrypted sync.

### Are passkeys safer than passwords?

Yes, against the most common attacks. A fake website can't use your passkey because your browser only offers it on the real site, and a website breach doesn't expose anything usable because the site only stores a public key. Research in 2026 showed attacks that needed malware already on the computer, so keep your devices clean and updated.

### What happens to my passkey if I lose my phone?

Remove the lost phone's passkey from your account's security settings. If your passkeys are synced through Google Password Manager or iCloud Keychain, they'll be available again when you sign in on a new device. Keeping a passkey on a second device or a security key avoids being locked out.

### Can I still use my password after creating a passkey?

On Google, yes. Your password remains as a backup, and you can choose whether Google should skip the password when a passkey is available.

### Does a passkey send my fingerprint to Google?

No. Your fingerprint or face only unlocks the passkey on your device. Google says biometric data stays on your device and is never sent to it.

## Start with one account

Create a passkey for your Google account on your phone and your laptop today. Once you've seen how sign-in works, add passkeys to the other accounts that offer them, starting with your email and banking-related logins.
