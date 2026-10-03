# How to back up a Windows 11 PC properly

Windows 11 has three built-in backup tools, and each one protects something different. **Windows Backup** saves your settings, apps list and main folders to OneDrive. **File History** keeps hourly copies of your files on an external drive, so you can recover an older version. A **system image** copies the entire drive so you can restore everything after a disk failure. Backing up "properly" means using more than one of them, and checking they actually work: in September 2026 a Windows update quietly stopped File History from saving anything.

This guide explains how to back up Windows 11 with each tool, what each one misses, and a simple setup that covers the common disasters.

## What "properly" means

A good backup survives the three things that actually happen:

- **You delete or overwrite a file** and need yesterday's version.
- **The drive fails or the laptop is stolen**, and you need everything back.
- **Ransomware or a bad update** damages files on the PC, and anything permanently connected may be damaged too.

The common rule of thumb is three copies of important files, on two different kinds of storage, with one kept away from the PC (for example, in the cloud or a drive kept elsewhere).

## The three Windows tools

| Tool | What it saves | Where | Good for | Misses |
|---|---|---|---|---|
| **Windows Backup** | Main folders, settings, saved Wi-Fi and credentials, list of apps | OneDrive / your Microsoft account | Moving to a new PC; getting settings back | Large file sets beyond your OneDrive space; many non-Store apps |
| **File History** | Documents, Pictures, Videos, Desktop (and other libraries), with past versions | External drive or network location | Recovering older or deleted files | Apps, settings and Windows itself |
| **System image** | The entire drive: Windows, apps, settings, files | External hard drive | Restoring everything after a drive failure | It's a snapshot; anything after it isn't included |

## Layer 1: Windows Backup and OneDrive

Search for **Windows Backup** in the Start menu. According to [Microsoft](https://support.microsoft.com/en-us/topic/kb5032038-overview-of-windows-backup-as-installed-in-windows-10-and-windows-11-bd264359-4180-4541-a09f-738420f9900d), it backs up certain folders (such as Documents and Desktop), settings, credentials and apps to the cloud, so you can carry on where you left off on a new device. It needs a personal Microsoft account and isn't available on work or school accounts.

Two limits to know:

- **Space.** A free Microsoft account includes **5 GB** of cloud storage, shared with Outlook attachments, according to [Microsoft's storage FAQ](https://support.microsoft.com/en-us/onedrive/microsoft-storage-faqs). Most photo and video folders need more, which means a paid plan or keeping large folders out of the OneDrive sync.
- **Apps.** [PCWorld found](https://www.pcworld.com/article/2086087/windows-11s-new-backup-and-restore-process-just-makes-everything-worse.html) that restoring on a new PC works best for Microsoft Store apps; many other programs have to be reinstalled by hand. It also only works with OneDrive.

If you're choosing a cloud service for files, our comparison of [Google Drive, OneDrive and iCloud](https://techpulzo.in/google-drive-vs-onedrive-vs-icloud-which-cloud-storage-to-use) covers the trade-offs.

## Layer 2: File History to an external drive

File History saves copies of your files to an external drive at regular intervals, so you can go back to an earlier version.

1. Connect an external drive.
2. Open **Control Panel > System and Security > File History** (Microsoft calls it "Save backup copies of your files with File History") and select **Turn on**, as [Microsoft's guide](https://support.microsoft.com/en-us/windows/experience/backup-recovery/backup-and-restore-with-file-history) describes.
3. It covers Documents, Pictures, Videos and Desktop by default; add other folders to a library to include them.
4. To recover a file, right-click its folder in File Explorer and choose **Restore previous versions**.

OnlineComputerTips' [comparison](https://www.youtube.com/watch?v=FJcPSUlxdlA) notes it runs hourly by default and can't save to an internal drive, which is deliberate: a backup on the same PC isn't much protection.

**Check it's actually working.** On 8 September 2026, update KB5124008 broke File History on Windows 11 versions 24H2 and 25H2, according to [Windows Latest](https://www.windowslatest.com/2026/09/23/microsoft-confirms-windows-11-quietly-stopped-backing-up-your-files-due-to-a-new-bug-in-september-2026-update/): backups stopped and Windows asked users to "reconnect" drives that were already connected. [PCWorld reported](https://www.pcworld.com/article/3241104/windows-september-update-breaks-file-history-the-fix-is-a-rollback.html) that Microsoft's fix (KB5124010, or KB5124006 for 26H1) came as an **optional** update on 23 September and would roll out automatically only with October's Patch Tuesday. If you rely on File History, install it from **Settings > Windows Update > Advanced options > Optional updates**, then confirm File History shows a recent "last copied" time.

<!-- AUTHOR: If you use File History or an external drive yourself, one line on your routine would make this personal. -->

## Layer 3: a full system image

A system image is a complete copy of the drive. Pureinfotech's [walkthrough](https://www.youtube.com/watch?v=lWuEIP2HShU) points out that the tool is deprecated but still works, and is best used for occasional full snapshots, for example before a big upgrade or replacing the drive.

1. Connect an external hard drive or SSD with enough space (a USB flash drive won't do).
2. Open **Control Panel > Backup and Restore (Windows 7) > Create a system image**.
3. Choose the external drive, confirm the drives to include, and start the backup.
4. To restore: **Settings > System > Recovery > Advanced startup > Restart now**, then **Troubleshoot > Advanced options > System Image Recovery**. Keep your BitLocker recovery key handy.

Pureinfotech also notes the image isn't encrypted, so store the drive somewhere safe. A portable SSD makes this much faster than a hard disk; see our [SSD vs HDD guide](https://techpulzo.in/ssd-vs-hdd-for-a-budget-laptop-where-the-money-should-actually-go) for the trade-offs.

## A simple setup for most people

1. **Turn on Windows Backup** for settings and your main folders.
2. **Plug in an external drive weekly** (or keep it connected) for File History, and unplug it afterwards so a ransomware attack can't reach it.
3. **Make a system image** every few months and before major changes.
4. **Keep one copy away from home** or in the cloud for your most important files.

## Test your backup

A backup you've never restored is a guess. Every few months:

- Restore one file from File History to a different folder and open it.
- Open your OneDrive in a browser and check recent files are there.
- Check the date of your latest system image.

## Frequently asked questions

### What is the best way to back up Windows 11?

Use more than one method: Windows Backup for settings and main folders, File History to an external drive for versions of your files, and an occasional system image for a full restore. Keep at least one copy away from the PC.

### Does Windows Backup back up everything?

No. It saves selected folders, settings, credentials and your app list to OneDrive, limited by your OneDrive space (5 GB on a free account). It doesn't create a full copy of your PC, and many non-Store apps need reinstalling.

### Why did File History stop working in September 2026?

A September 2026 Windows 11 update (KB5124008) broke File History on versions 24H2 and 25H2. Microsoft released an optional fix (KB5124010) on 23 September, with an automatic fix due in October's update. Install the optional update and check File History's last backup time.

### Is a system image still available in Windows 11?

Yes. It's labelled a legacy, deprecated feature but still works from Control Panel's Backup and Restore (Windows 7). It's best for occasional full snapshots rather than daily backups.

### Can I back up Windows 11 to a USB flash drive?

For File History and copying files, yes, if it's large enough. For a system image, you need an external hard drive or SSD rather than a flash drive.

## Do it this weekend

Turn on Windows Backup, connect an external drive for File History, and make one system image. Then restore a single file to prove it works.
