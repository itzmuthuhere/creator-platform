# How to read an internet speed test: ping, jitter, upload and what matters

A speed test gives you five or six numbers, and most people look only at the biggest one, download speed in Mbps. For streaming and downloads that's fair. But video calls stutter and games lag because of the smaller numbers: ping, jitter and especially how much the ping rises when your connection is busy. A 40 Mbps connection with steady latency can feel better on a call than a 100 Mbps connection that falls apart under load.

This guide explains each number in an internet speed test, ping and jitter included, what "good" looks like for different uses, how to test properly, and what to do about each kind of problem.

## The numbers on a speed test

| Number | What it measures | Shown as |
|---|---|---|
| **Download** | How fast data reaches you: streaming, browsing, downloads | Mbps |
| **Upload** | How fast data leaves you: video calls, uploading photos, cloud backups | Mbps |
| **Ping (latency)** | Time for a tiny message to reach the test server and come back | milliseconds (ms) |
| **Jitter** | How much the ping varies from one moment to the next | ms |
| **Loaded latency** | Ping while the connection is busy downloading or uploading | ms |
| **Packet loss** (some tests) | Share of data that never arrives | % |

Cloudflare's explanation of [how its speed test works](https://blog.cloudflare.com/how-does-cloudflares-speed-test-really-work/) makes the key point: most everyday activities need little bandwidth and are far more sensitive to latency, jitter and packet loss. That's why its test reports idle and loaded latency separately and scores your line for streaming, gaming and video calls rather than giving one speed.

## Mbps vs MB/s

Speed tests report megabits per second (**Mbps**). File downloads in your browser show megabytes per second (**MB/s**). There are 8 bits in a byte, so divide by 8:

- 100 Mbps ≈ 12.5 MB/s at best.
- A 2 GB file takes about **2.7 minutes** at 100 Mbps and about **6.8 minutes** at 40 Mbps.

*Our calculation, ignoring overheads.*

PowerCert's [animated explainer](https://www.youtube.com/watch?v=DHa9gxRfAmM) covers this bits-versus-bytes confusion, which makes many connections look "slower than promised" when they aren't.

## Ping, jitter and the number that matters most

**Ping** depends heavily on distance. The test server is usually nearby, so a home fibre line often shows a low single- or double-digit ping, but a game server in another country will always be further away. A common rule of thumb, from Your internet speed expert's [video on latency](https://www.youtube.com/watch?v=HbhzrmdPz2s): about 20 ms feels instant, around 100 ms is noticeable, and above 200 ms is frustrating.

**Jitter** is how uneven that delay is. Calls and games cope with a steady delay better than one that jumps around, because audio and video packets arrive out of rhythm.

**Loaded latency** is the one most people miss. When someone in the house starts a big download, upload or 4K stream, your router's queues can fill and every other packet waits behind them. This is called **bufferbloat**. The [Bufferbloat project](https://www.bufferbloat.net/projects/bloat/wiki/Introduction/) describes the result: network-crippling latency spikes that make voice and video calls stutter, even on a fast line.

### A worked comparison

| | Connection A | Connection B |
|---|---|---|
| Download | 100 Mbps | 40 Mbps |
| Idle ping | 12 ms | 15 ms |
| Ping during download (loaded) | 250 ms | 30 ms |
| Jitter | 40 ms | 4 ms |

*Illustrative results.*

On paper, A is two and a half times faster. In practice, A will drop words on a video call whenever anyone else at home is streaming or backing up photos, while B stays smooth. For a household that works from home, B is the better connection. Our article on [why video calls lag even with fast internet](https://techpulzo.in/why-video-calls-lag-even-with-fast-internet) goes deeper into this.

## What's good enough for what

| Activity | What matters most | Look for |
|---|---|---|
| Streaming video | Download | Steady speed comfortably above the stream's needs; ping matters little |
| Downloads and updates | Download | Higher is better |
| Video calls | Upload, jitter, loaded latency | Low jitter; loaded ping that stays close to idle ping |
| Online gaming | Ping, jitter, loaded latency | Low and steady ping to the game's server |
| Cloud backup, uploading videos | Upload | Higher is better |

<!-- AUTHOR: If you've run tests at home, one line comparing your idle and loaded ping would make this concrete. -->

## How to test properly

Vibrant Broadband's [walkthrough](https://www.youtube.com/watch?v=l-j5jJy81js) gives sensible advice that applies anywhere:

1. **Test on a cable first** if you can, to measure the connection itself rather than your Wi-Fi.
2. **Pause other devices** and big downloads during the test.
3. **Repeat** a few times, at different times of day. Evening tests are often slower because more people share the network.
4. **Use a test that shows loaded latency.** Cloudflare's test reports it, and current versions of Ookla's Speedtest show ping during the download and upload phases too.
5. **Then test over Wi-Fi** in the rooms where you actually use the internet. A big drop compared with the cable test points to Wi-Fi, not your provider; our guide to [router placement](https://techpulzo.in/why-your-wifi-feels-slow-in-certain-rooms-router-placement) helps there.

In India, TRAI's own [MySpeed](https://myspeed.trai.gov.in/) app and website run speed, video and browsing tests. If you plan to complain to your provider, keep a record of several MySpeed and other test results over a few days, wired and at different times.

## Fixes by symptom

- **Download well below your plan on a cable:** restart the modem and router, check the plan, and raise it with your provider using your test records.
- **Fine on a cable, slow on Wi-Fi:** move the router, use the 5 GHz band nearby, or add a mesh point for far rooms.
- **Loaded ping jumps far above idle ping:** that's bufferbloat. Look for a router setting called smart queue management, QoS or similar; the Bufferbloat project recommends queue-management methods such as fq_codel and CAKE, which many modern routers include.
- **Upload too slow for calls:** check whether your plan's upload speed is much lower than download; some plans are asymmetric.
- **High jitter and occasional drops on Wi-Fi:** reduce distance and interference, or use a cable for the computer you work on.

## Frequently asked questions

### What is a good ping for internet?

For browsing and streaming, almost anything under 100 ms is fine. For video calls and gaming, lower and steadier is better: around 20–50 ms to a nearby server feels instant. What matters even more is that ping stays low when the connection is busy.

### What is jitter in a speed test?

Jitter is how much your ping varies from moment to moment. Low jitter means packets arrive in a steady rhythm, which video calls and games need. High jitter makes audio choppy and games feel inconsistent even when the average ping looks fine.

### Why is my download speed lower than my plan?

Common reasons are testing over Wi-Fi rather than a cable, other devices using the connection, an older device or router, or evening congestion. Test on a cable with other devices paused, repeat a few times, and then compare with your plan.

### Is 100 Mbps the same as 100 MB per second?

No. Speed tests use megabits; file downloads use megabytes. Divide Mbps by 8: 100 Mbps is about 12.5 MB per second at most.

### What is loaded latency or bufferbloat?

Loaded latency is your ping while the connection is busy. If it rises sharply compared with idle ping, data is queuing in your router or modem, a problem called bufferbloat. It causes laggy calls and games during downloads and can often be fixed with a router's smart queue management setting.

## Read the small numbers too

Next time you run a speed test, note the idle ping, the loaded ping and the jitter alongside download speed. If calls and games are your priority, those three tell you far more about how your connection will feel.
