# Router security settings to change on day one

Your Wi-Fi router is the front door to every phone, laptop, TV and camera in your home, and most routers ship with settings chosen for easy setup, not security. Changing six router security settings takes about 15 minutes and closes the gaps attackers rely on most: default passwords, weak Wi-Fi encryption, and features that let software or strangers change your router without you knowing.

This guide gives you that checklist in order of impact, explains why each setting matters, adds a few worthwhile extras, and covers what to do if your internet provider supplied the router.

## Getting into your router

Open a browser on a device connected to your Wi-Fi and go to the router's admin address. It's usually printed on a sticker on the router along with the default login, and is often something like `192.168.1.1` or `192.168.0.1`, as ThioJoe's [video](https://www.youtube.com/watch?v=mJnIgjyjEtc) explains. Many newer routers, and most provider-supplied ones in India, can also be managed from the manufacturer's or provider's app.

Settings names differ by brand, so use your router's manual or support page alongside this list.

## The day-one checklist

**1. Change the admin password.** This is the password for the router's settings, not your Wi-Fi password. The US cybersecurity agency [CISA warns](https://www.cisa.gov/news-events/news/home-network-security) that default usernames and passwords may be readily available on the internet. Anyone who gets in, or malware on a device at home, can undo every other change on this list. Use a long, unique password and save it in a [password manager](https://techpulzo.in/how-to-set-up-a-password-manager-in-15-minutes).

**2. Use WPA3 (or WPA2-AES) with a strong Wi-Fi password.** In the wireless settings, choose **WPA3-Personal** if all your devices support it, or **WPA2/WPA3 mixed**, or at least **WPA2-AES**. CISA calls WPA3 the strongest option for home networks. Never use WEP or plain WPA. Set a Wi-Fi password of at least 12 characters that isn't your phone number or name.

**3. Turn off WPS.** Wi-Fi Protected Setup lets devices join with a button press or an 8-digit PIN. CISA says design flaws allow attackers to brute-force the PIN, getting onto your network regardless of your Wi-Fi password. Ask Leo's [8-step guide](https://www.youtube.com/watch?v=HLoWEsFAEzA) notes that WPS is often on by default.

**4. Turn off remote management.** Remote management (sometimes called WAN access or remote administration) lets the router's settings be changed from the internet. Unless you specifically need it, switch it off so changes can only be made from inside your home. CISA lists this among the settings to disable.

**5. Turn off UPnP if you don't need it.** Universal Plug and Play lets apps on your devices open ports on the router automatically. CISA warns that malware can use UPnP to get around the router's firewall and allow remote control. Some games consoles and video-calling setups use it; if something stops working after you turn it off, you can forward just the ports that device needs.

**6. Update the firmware, and turn on automatic updates.** Routers are small computers, and security holes are found in them regularly. Check for a firmware update in the admin page or app, and enable automatic updates if offered. According to [BleepingComputer's summary](https://www.bleepingcomputer.com/news/security/nsa-shares-guidance-on-how-to-secure-your-home-network/) of the NSA's 2023 guidance, you should also replace a router once the manufacturer stops issuing updates for it.

<!-- AUTHOR: If you've gone through these settings on your own router, one line on which one was switched on by default would make this personal. -->

## Worth doing next

- **Set up a guest network** for visitors and smart devices such as plugs, bulbs and cameras, so a weak gadget can't reach your laptop. Our guide to [setting up a guest network](https://techpulzo.in/how-to-set-up-a-home-wi-fi-guest-network-and-why-you-should) covers it.
- **Check the list of connected devices** every so often, and remove anything you don't recognise; CISA recommends monitoring for unauthorised devices.
- **Keep the router's firewall on**, and avoid "DMZ" settings, which expose a device fully to the internet. [ASUS's security checklist](https://www.asus.com/support/faq/1039292/) also suggests turning off Telnet and SSH access and enabling DNS rebind protection where available.
- **Reboot the router regularly.** The NSA suggests at least weekly reboots of routers, phones and computers.
- **Place the router sensibly.** Centrally for coverage, and somewhere visitors can't press the reset button; see our guide to [router placement](https://techpulzo.in/why-your-wifi-feels-slow-in-certain-rooms-router-placement).

## Two settings that don't help much

- **Hiding the network name (SSID).** The network can still be found with common tools, and hidden networks can cause connection trouble for your own devices.
- **MAC address filtering.** Some manufacturers, ASUS included, suggest allowing only known devices by their hardware address. Ask Leo's view is that it only keeps out honest people, because addresses are easy to copy, and it adds hassle every time a new device joins. A strong WPA2 or WPA3 password does the real work.

## If your ISP supplied the router

Many Indian fibre connections come with a router managed by the provider. Often you can still change the Wi-Fi name, password and security mode in the provider's app, but some settings (remote management, firmware) may be controlled by the provider.

- Change the Wi-Fi password and security mode in the app on day one.
- Ask the provider whether firmware updates are automatic.
- The NSA recommends using your own router where possible; if you want full control, you can put your own router behind the provider's equipment. Check with your provider first, since setups differ.

## Frequently asked questions

### What router settings should I change for security?

Change the admin password, use WPA3 or WPA2-AES with a strong Wi-Fi password, turn off WPS, turn off remote management, turn off UPnP if you don't need it, and update the firmware with automatic updates on. Those six cover the most common attacks.

### Should I use WPA3 or WPA2?

Use WPA3-Personal if all your devices support it. If some older devices can't connect, use the WPA2/WPA3 mixed mode, or WPA2-AES. Avoid WEP and plain WPA, which are easy to break.

### Is it safe to turn off UPnP?

Yes, for most homes. A few games consoles or apps use it to open ports automatically; if one stops working, forward only the ports that device needs instead of turning UPnP back on for everything.

### Does hiding my Wi-Fi network make it more secure?

Not really. Hidden networks can still be detected with common tools, and hiding can cause connection problems for your own devices. A strong WPA2 or WPA3 password protects you far more.

### How often should I update my router's firmware?

Turn on automatic updates if your router offers them, and check manually every few months otherwise. When the manufacturer stops releasing updates for your model, plan to replace it.

## Fifteen minutes, once

Log in, work through the six settings in order, and set a reminder to check for firmware updates and unknown devices every few months. That's most of home network security handled.
