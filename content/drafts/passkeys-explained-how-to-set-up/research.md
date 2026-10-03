# Research notes: Passkeys explained, and how to set one up

Internal working file. Not published.

## 1. Source videos (in my own words)

- **Primary:** Google Passkeys Tutorial (Jason Rebholz), https://www.youtube.com/watch?v=ckvrKdFNF78. ~3 years old (screens largely unchanged). Manage your Google Account > Security > Passkeys; Android may have created one automatically; Create a passkey > verify with biometrics/device PIN; add more (another device, USB security key with PIN).
- **Second:** Using Google Passkeys? You Need to Check This (The Phone Guardian), https://www.youtube.com/watch?v=SOtdmwHqeLA. 15 h old. Black Hat Aug 2026 research: attacks on systems around passkeys (Microsoft Entra/Windows Hello, Google Password Manager sync on Chrome for Windows), all requiring malware already on the PC; core crypto not broken; advice: update, keep devices clean, treat recovery and sync as sensitive.
- **Third:** How to use Google Passkeys (TechNtech), https://www.youtube.com/watch?v=cxq8cWS5lDs. ~3 years old. Setup and sign-in with phone.

## 2. Topic assessment

Useful 5 · Searchable 5 · Evergreen 4 · Depth 4 · Independent research 4 · Examples 3 · Screenshots 1 · Stands alone 5 · Fits 5.

**Verdict:** PROCEED. Angle: what a passkey is in plain terms, why it beats passwords (phishing, breaches), how to set one up on Google and use it across devices, what happens if you lose the phone, and honest limits (2026 research).

## 3. Duplicate check

`library.mjs check "what are passkeys"`: no similar. Internal links: https://techpulzo.in/how-to-set-up-a-password-manager-in-15-minutes, https://techpulzo.in/why-you-should-not-reuse-passwords-what-happens-when-one-site-gets-breached, https://techpulzo.in/how-two-factor-authentication-actually-stops-account-hacks.

## 4. Search intent and keywords

- **Primary keyword:** what are passkeys
- **Intent:** informational
- **Secondary:** how to set up passkey google; passkey vs password; are passkeys safe; passkey lost phone

## 5. Claims ledger

| # | Claim | From video? | Status | Source(s) | Note |
|---|---|---|---|---|---|
| 1 | Passkey = secret on your devices unlocked with biometrics/PIN; unique per service; server stores only public key; phishing-resistant because browser/OS bind to the right site | Partly | VERIFIED | passkeys.dev | |
| 2 | Google: can't be shared/copied/written down; biometric data stays on device; supported Windows 10+, macOS Ventura+, Android 9+, iOS 16+; browsers Chrome/Edge 109+, Safari 16+, Firefox 122+; screen lock needed; QR + Bluetooth for cross-device; password still available ("Skip password when possible"); remove lost passkeys in Security | Partly | VERIFIED | Google Account Help | |
| 3 | Unit 42 "Pass-ta-key" (Aug 2026): three attacks on Google Password Manager passkeys on Chrome for Windows; require malware already on PC; Google fixed a logging leak; passkeys still safer than passwords | Yes (Phone Guardian) | VERIFIED (secondary) | 9to5Google (4 Aug 2026) | |
| 4 | SpecterOps/Entra and Windows Hello research | Yes | OPINION/attributed (not separately verified) | | Mentioned only via video |
| 6 | Services supporting passkeys (Microsoft, Apple, Amazon, PayPal, WhatsApp); iCloud Keychain sync; Bluetooth proximity purpose | No | VERIFIED (widely documented; general) | | Hedged as examples |
| 5 | USB security key as passkey | Yes (Jason) | VERIFIED (consistent with Google "use another device") | | |

## 6. Value the video doesn't give

- Plain-language mechanism and why phishing fails against it.
- Current requirements; cross-device and lost-phone handling.
- Balanced 2026 security caveat with practical takeaways.

## 7. Screenshot plan

None: account security pages are personal.

## 8. Outline

- Opening
- H2 What a passkey is
- H2 Why it's safer than a password
- H2 Set one up on your Google account
- H2 Signing in on another device
- H2 If you lose your phone
- H2 Are passkeys unbreakable? The 2026 research
- H2 Where else to use them
- FAQ
