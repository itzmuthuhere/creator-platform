---
name: write-blog-article
description: Draft and publish a genuinely high-value article to the TechPulse blog (creator-platform, techpulzo.in) — a Postgres-backed Next.js site. Use this skill whenever the user asks to write, add, draft, or publish a blog post/article for this project, asks for "new content" or "more articles" for the site, or wants an existing article rewritten to be less thin/generic/AI-sounding. This site was previously rejected by Google AdSense for "low value content," so treat every draft as something that needs to clear that bar — don't default to listicle/aggregator framing ("top 5 tools," "best N websites") without checking this skill's guidance first, even if the user's request sounds like it's asking for exactly that.
---

# Writing and publishing a TechPulse article

This skill exists because the site got rejected once already, and the fix that worked was specific: real depth over listicles, and a deliberately varied voice so the site doesn't read as one template repeated 24 times. Both matter — a well-researched article that reuses the same opening formula as the last five is still part of the problem.

## Before you draft anything

Read `references/voice-and-quality-guide.md` in full. It has the concrete examples (good and bad) behind every rule below, drawn from what actually got an article removed versus kept during the site's remediation. Do not skip this — the rules below are a checklist, that file is the reasoning, and the reasoning is what lets you apply this to a topic that isn't already covered by an example.

Then pick or confirm a topic. Reject (or reframe) anything that's fundamentally a "list N well-known things" piece with no original mechanism or math to explain — that framing is exactly what got three articles removed already. If the user asks for something like "top 5 budget phones," that's fine *if* it's a genuine comparison with real trade-offs (this exact topic exists on the site and survived review) — the test is whether it has a real point of view and specific reasoning, not whether it happens to use a numbered format.

## Drafting

- Target 600-900+ words of real content.
- Vary the opening structure and the closing section heading — check what the last few articles on the site actually did (query the `Post` table, or just look at a couple of live URLs) so you're not accidentally repeating a pattern from last time.
- Weave in one first-person moment near the start and one near the close (sometimes mid-article instead), matching whichever author persona fits — "Muthu" (Java developer, tech/career/finance) or "Nithiyaraj" (influencer, tech/lifestyle). Vary *how* per article; see the guide for examples.
- Use `<p>`, `<h2>`/`<h3>`, `<ul>`/`<ol>`/`<li>`, `<table>`, `<strong>`, `<code>`/`<pre><code>`, `<a>` — this is stored and rendered as raw HTML, not markdown.
- Write real FAQ content separately (see the JSON spec below) — never as an inline heading in the body with nothing under it.
- Keep facts/prices/product versions framed so they don't look dated in a year (no pinned outdated model names, no bare "in 2026" claims baked into prose you might reuse later).

## Verify before publishing

Save the draft as an HTML file, then run:

```
node .claude/skills/write-blog-article/scripts/check-content.js path/to/draft.html
```

This checks HTML tag balance, word count, orphan/empty sections, "actually"/"genuinely" overuse, the "X isn't Y — it's Z" contrastive crutch, em-dash density, and code blocks that look like they lost a meaningful space (a real bug this site hit once — a cleanup script ate the space in `COPY . .`, turning a Dockerfile example into broken syntax). Fix anything it flags before moving on. A clean run isn't a guarantee the writing is good — it only catches what's mechanically countable — so also do a quick read against the guide's judgment calls (aggregator framing, corpus-level repetition).

## Publishing

Write a JSON spec (see `references/post-spec-example.json` for a complete, real example) and run:

```
node .claude/skills/write-blog-article/scripts/insert-post.js path/to/spec.json
```

This needs `DATABASE_URL` set to the **public** Railway Postgres proxy URL, not the private `.railway.internal` one (that only resolves from inside Railway's own network, not from your machine). Get the right value with:

```
railway variables --service <postgres-service-name> --json
```

and use `DATABASE_PUBLIC_URL` from that output, e.g.:

```
DATABASE_URL="<public proxy url>" node .claude/skills/write-blog-article/scripts/insert-post.js spec.json
```

The script validates the category slug and author name exist, generates the id and reading time, links tags (reusing existing ones by name where they match, creating new ones otherwise), and refuses to overwrite an existing slug.

## After publishing

Check the live page (`https://techpulzo.in/<slug>`) actually renders with no console errors. The site uses Next.js ISR caching — the very first request right after publishing can 404 or show stale content because the page hasn't been generated yet. Request the URL twice, a few seconds apart, before concluding something's broken.

## A couple of environment gotchas worth knowing

- Run everything from inside the `creator-platform` project directory. Node resolves `require('pg')` relative to the script's own location on disk, not your shell's cwd at invocation — running these scripts from anywhere else throws `MODULE_NOT_FOUND` even though `pg` is installed in the project.
- If you write your own throwaway verification scripts with regex in them, put them in a real `.js` file and run that — an inline `node -e "..."` string passed through Bash mangles backslash escaping in regex patterns and silently produces wrong results (this has caused false "tag mismatch" reports more than once). `check-content.js` is already a real file for exactly this reason.
