# Medhat's Blog

Personal blog about DevOps, Linux, and infrastructure — built with [Astro](https://astro.build) and hosted on [Netlify](https://netlify.com).

**Live site:** https://medhat-blog.netlify.app

---

## Quick Start

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (localhost:4321)
npm run build      # Build for production → dist/
npm run deploy     # Deploy to Netlify
npm run build && npm run deploy  # Build + deploy
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

Then `npm run build && npm run deploy`.

## Project Structure

```
src/
├── components/     ← UI (Header, Footer, PostCard, SocialList, TagBadge)
├── content/blog/   ← Blog posts (.md)
├── layouts/        ← Page templates (BaseLayout, PostLayout)
├── pages/          ← Routes (home, about, tags, blog/[slug], admin)
└── styles/         ← global.css (all site styles)
public/images/      ← Static images
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
