# Screenshots

A screenshot earns its place when a reader would otherwise have to guess what something looks like: where a setting lives, what a documentation table says, what an interface looks like after a step. Decoration doesn't count.

## Good candidates

- The official settings/configuration screen a step refers to (public pages only)
- An official documentation table or spec the article relies on (limits, pricing tiers, compatibility)
- A public dashboard, calculator, or tool the article tells readers to use
- An official chart from a primary source, cropped to the chart, with the source named in the caption
- Search results or a comparison page, when showing them makes a point

## Don't capture

- **Frames from the source video, or from any other video.** That is the creator's copyrighted work, and it makes the article look like a repackaging of the video.
- Pages behind a login, paywall, or bot check. Don't try to get past them.
- Anything with personal data: names, emails, account numbers, phone numbers, faces, other users' comments.
- Cookie banners, pop-ups, and ads. Dismiss a consent banner with its reject/"essential only" option if one exists; if it can't be dismissed, crop it out or skip the shot.
- Screens you'd have to fake or mock up. If you can't capture the real thing, don't invent one.
- Stock images or other sites' illustrations.

Typical count: 2–6 for a how-to, 0–3 for a conceptual explainer. The audit warns above about one per 250 words.

## How to capture

The built-in browser (`mcp__Claude_Browser__*`) is good for looking at a page and finding the right element, but its screenshots come back to you as images and aren't saved to disk. Use `capture-screenshot.mjs` (agent-browser + sharp) to save files:

```bash
# Crop to one element (preferred: focused and readable)
node .claude/skills/youtube-to-article/scripts/capture-screenshot.mjs <url> content/drafts/<slug> 02-upi-limits-table.png --selector "table.limits"

# A region of the viewport, in CSS pixels
node .claude/skills/youtube-to-article/scripts/capture-screenshot.mjs <url> content/drafts/<slug> 03-settings-panel.png --crop 0,120,1280,560

# Whole viewport (use sparingly)
node .claude/skills/youtube-to-article/scripts/capture-screenshot.mjs <url> content/drafts/<slug> 01-homepage.png
```

Other options: `--viewport 1440x900`, `--scale 2` (default, crisp), `--wait 3000` for slow pages, `--full` for a full-page capture, `--dark`.

To find a selector, open the page in the built-in browser and use `find` / `read_page`, or run `agent-browser --session yt2article snapshot` after the first capture. If a selector matches a zero-size element, pick its visible container.

## After every capture

1. **Look at the file** with the Read tool. Confirm it shows exactly what the caption will say, is legible, and has no banner, ad, or personal data. Recapture or delete it if not.
2. Filenames: `NN-kebab-description.png`, numbered in article order (`01-`, `02-` …). The script enforces this.
3. The script records the source URL, page title, and time in `screenshots/manifest.json`. The audit fills in alt text and caption from the article.
4. Add the source page to sources.md under "Screenshot pages".

## In the article

Put the image right after the paragraph or step it illustrates, followed by an italic caption line:

```markdown
![UPI transaction limits table on the NPCI website, showing the per-transaction cap for P2P payments](screenshots/02-upi-limits-table.png)
*NPCI's published limits. Individual banks can set lower caps. Source: npci.org.in*
```

- **Alt text** describes what the image shows, for someone who can't see it (4+ words, no "image of…").
- **Caption** tells the reader what to notice, and names the source site.

## When capture fails

Continue without it. Note in quality-audit.md under "Issues found" which screenshot was planned, why it failed (blocked, login, no stable selector), and what the article does instead (a clearer written description, a table).
