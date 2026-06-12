# Medhat's Blog

Personal blog about DevOps, Linux, and infrastructure — built with [Astro](https://astro.build) and hosted on [GitHub Pages](https://pages.github.com).

**Live site:** https://shin01221.github.io/blog

> Previously hosted on Netlify — migrated to GitHub Pages for unlimited free builds.

---

## Quick Start

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (localhost:4321)
npm run build      # Build for production → dist/
```

To deploy, push to `main` — GitHub Actions auto-builds and deploys:

```bash
git push origin main
```

## Adding a Post

Create a `.md` file in `src/content/blog/`:

```markdown
---
title: "My Post"
description: "Brief description"
pubDate: 2025-01-01
tags: ["linux", "docker"]
draft: false
---

Content here in **Markdown**.
```

Then commit and push — the RSS feed and site update automatically.

## RSS Feed

Available at `https://shin01221.github.io/blog/rss.xml`. Auto-updates on every build — no manual steps needed.

## Project Structure

```
src/
├── components/     ← UI (Header, Footer, PostCard, SocialList, TagBadge)
├── content/blog/   ← Blog posts (.md)
├── layouts/        ← Page templates (BaseLayout, PostLayout)
├── pages/          ← Routes (home, about, tags, [slug], rss.xml)
└── styles/         ← global.css (all site styles)
public/images/      ← Static images
.github/workflows/  ← GitHub Actions deploy workflow
```

## Customizing

- **Colors** — edit CSS variables in `src/styles/global.css` (`--color-accent`, `--color-bg`, etc.)
- **Components** — edit files in `src/components/`
- **Layouts** — edit files in `src/layouts/`

## Comments

Blog posts use [Giscus](https://giscus.app) for comments.

**To enable:**
1. Go to your repo **Settings → General → Discussions** and enable it
2. Visit [giscus.app](https://giscus.app), enter `shin01221/blog`
3. Copy the `data-repo-id`, `data-category`, and `data-category-id` values
4. Paste them into `src/components/Comments.astro`

## License

MIT
