# How to clean install Windows 11 from a USB drive

A Windows 11 clean install wipes the drive and puts a fresh copy of Windows on it: no leftover apps, no clutter from the manufacturer, no years of accumulated settings. It's the most thorough fix for a slow or misbehaving PC and the standard way to set up a new SSD. You need an 8 GB USB drive, an internet connection and about an hour. Everything on the drive you install to will be deleted, so the backup step isn't optional.

This guide covers whether you need a clean install at all, what to prepare, making the USB, installing, setting up, and what to do afterwards.

## Do you need a clean install?

Windows has a built-in alternative: **Settings > System > Recovery > Reset this PC**, which reinstalls Windows without a USB and can keep your files. Use that if you just want a fresh start on a working PC.

A clean install from USB makes more sense when:

- You've replaced or added the drive (for example, upgrading to an SSD).
- Windows won't start, or Reset fails.
- You want to remove the manufacturer's preinstalled software completely.
- You're giving or selling the PC and want a guaranteed fresh install.

## Before you start

- **Check the hardware.** [Microsoft's requirements](https://support.microsoft.com/en-us/windows/windows-11-system-requirements-86c11283-ea52-4782-9efd-7674389a7ba3) include a supported 64-bit processor, 4 GB of RAM, 64 GB of storage, UEFI firmware with Secure Boot capability, and TPM 2.0. Microsoft's [download page](https://www.microsoft.com/en-us/software-download/windows11) says installing on a PC that doesn't meet them isn't recommended.
- **Back up everything** you want to keep: documents, photos, browser bookmarks and saved passwords (export them, or make sure they're synced; a [password manager](https://techpulzo.in/how-to-set-up-a-password-manager-in-15-minutes) makes this painless).
- **Note your licence.** If the PC already ran an activated Windows 10 or 11, it will usually reactivate automatically once you're online, as long as you install the same edition (Home or Pro). Check which edition you have in Settings > System > About.
- **Save your BitLocker recovery key** if your drive is encrypted (you'll find it in your Microsoft account). You may need it if something goes wrong.
- **Get the Wi-Fi or network driver** from the manufacturer's support site onto the USB or another drive, in case Windows doesn't recognise your network adapter during setup.
- **Find your boot menu key.** Pureinfotech's [video](https://www.youtube.com/watch?v=JGSeN0cZqno) suggests searching your PC model's support page or user guide for the key (often F12, F11, F10, F9 or Esc).

## Step 1: make the USB

On any working Windows PC:

1. Go to Microsoft's **Download Windows 11** page and, under **Create Windows 11 Installation Media**, download the **Media Creation Tool**.
2. Plug in a USB drive of at least **8 GB**. Everything on it will be erased.
3. Run the tool, accept the terms, keep the recommended language and edition (or untick the box to change them), choose **USB flash drive**, and select your drive.
4. Wait while it downloads Windows and builds the installer.

At the time of writing, Microsoft's page offers the **Windows 11 2026 Update (version 26H2)**. If you prefer, you can download the ISO from the same page and write it to a USB with a tool such as Rufus, as Istoryahe TV's [walkthrough](https://www.youtube.com/watch?v=uNlQDUw2yYI) shows; the result is the same.

## Step 2: boot from the USB

1. Plug the USB into the PC you're installing on and restart it.
2. Press the **boot menu key** as it starts and choose the USB drive. If there's no boot menu, enter the BIOS/UEFI settings and move the USB to the top of the boot order.
3. When prompted, press any key to start Windows Setup.

## Step 3: install Windows

1. Choose your language and keyboard, then **Install Windows 11**, and confirm you understand everything will be deleted.
2. **Product key:** if the PC was activated before, choose **I don't have a product key**. It will activate online after installation.
3. **Choose the same edition** you had before (Home or Pro). Pureinfotech warns that picking the wrong edition means it won't activate, and you'd have to start again.
4. **Choose where to install.** You'll see the drive's partitions. Select each partition **on the drive you're installing to** and delete it, until that drive shows as one block of unallocated space. Don't touch partitions on other drives (such as a second data drive); [Pureinfotech's written guide](https://pureinfotech.com/clean-install-windows-11-26h2/) stresses deleting only the target drive's partitions.
5. Select the unallocated space and click **Install**. The PC will restart a few times.

<!-- AUTHOR: If you've clean-installed recently, one line on how long it took on your PC would help readers plan. -->

## Step 4: set up Windows

After installation, Windows walks you through setup:

- Region and keyboard layout.
- **Device name:** short, no spaces; it makes the PC easier to find on your network and in your Microsoft account.
- **User folder name:** a newer option under advanced settings on some versions lets you choose it, according to the Pureinfotech video.
- **Account:** Windows 11 Home needs an internet connection and a Microsoft account, per Microsoft's requirements. Then set a PIN.
- **Privacy settings:** read each one and turn off what you don't want.
- **Restore or set up new:** choose **Set up as a new PC** if you want a genuinely clean start.
- Skip the offers you don't need.

## After installing

1. **Run Windows Update** repeatedly until it finds nothing new, including optional driver updates.
2. **Install drivers** from your PC maker's support site if anything is missing (check Device Manager for warning icons), especially graphics, chipset and touchpad.
3. **Check activation:** Settings > System > Activation.
4. **Restore your files** from the backup and reinstall only the apps you use.
5. **Create a restore point or backup** now that you have a clean setup.

If you're doing this because the PC feels slow, check whether the hardware is the real limit; our guides to [how much RAM you need](https://techpulzo.in/how-much-ram-you-actually-need-in-a-laptop-in-2026) and [SSD vs HDD](https://techpulzo.in/ssd-vs-hdd-for-a-budget-laptop-where-the-money-should-actually-go) can help.

## Troubleshooting

- **The PC doesn't boot from the USB:** use the boot menu rather than restarting normally; make sure UEFI boot is enabled; try another USB port (a USB 2.0 port often works better on older PCs).
- **"No drives found" at the install step:** the storage controller driver isn't loaded. Download the storage (often Intel RST or VMD) driver for your model from the manufacturer, put it on the USB, and use **Load driver**. Some PCs let you switch the storage mode in the BIOS instead.
- **No internet during setup:** connect by Ethernet if you can, or load the network driver you saved earlier.
- **Windows isn't activated:** make sure you installed the right edition, connect to the internet and wait, then use the **Troubleshoot** option on the Activation page.

## Frequently asked questions

### Will a clean install delete all my files?

Yes, on the drive you install to. That's why you back up first. Partitions on other drives are left alone if you don't delete them during setup.

### Do I need a product key to clean install Windows 11?

Not if the PC was activated before. Choose "I don't have a product key" during setup and install the same edition (Home or Pro); it will activate automatically once online. A new PC or new build needs a valid key.

### How big does the USB drive need to be?

At least 8 GB, according to Microsoft. Everything on the USB is erased when the installer is created.

### Can I install Windows 11 on a PC without TPM 2.0?

Microsoft lists TPM 2.0 as a requirement and says installing on unsupported hardware isn't recommended. Check in your BIOS first: many PCs have TPM (sometimes called fTPM or PTT) that is simply switched off.

### Is Reset this PC the same as a clean install?

Not quite. Reset reinstalls Windows from within Windows and can keep your files, which is easier. A clean install from USB wipes the drive completely and is better for new drives, PCs that won't start, or removing all preinstalled software.

## The safest order

Back up, check your edition and licence, make the USB, delete only the target drive's partitions, then update and install drivers. Done in that order, a clean install is routine.
