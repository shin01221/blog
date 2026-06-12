# Blog Guide

Quick reference for managing this Astro blog.

---

> **Live site:** https://medhats-blog.netlify.app

## Adding a New Blog Post

### 1. Create the file

Create a new `.md` file in `src/content/blog/`:

```bash
touch src/content/blog/my-post.md
```

### 2. Use this template

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
pubDate: 2024-04-08
tags: ["tag1", "tag2"]
heroImage: "/images/hero.jpg"
author: "Mohamed Medhat"
draft: false
---

# Your Post Title

Write your content here using **Markdown**.

## Features

- Lists
- **Bold** and *italic* text
- [Links](https://example.com)
- Code blocks

```javascript
const example = "Hello World";
```

## Images

![Alt text](/images/your-image.jpg)
```

### Required Fields

| Field       | Description                                  |
|-------------|----------------------------------------------|
| `title`     | Post title (displayed in browser tab/headings) |
| `description` | Brief summary (used for SEO and previews)    |
| `pubDate`   | Publication date (format: YYYY-MM-DD)        |

### Optional Fields

| Field         | Default             | Description                              |
|---------------|---------------------|------------------------------------------|
| `tags`        | `[]`                | Array of tags for categorization         |
| `heroImage`   | none                | Featured image path (from `/public/`)    |
| `author`      | `"Mohamed Medhat"`  | Author name                              |
| `draft`       | `false`             | If `true`, post won't be published       |
| `updatedDate` | none                | Last updated date                        |

---

## Adding Images

### Step 1: Place images in `public/`

```
public/
├── images/
│   ├── my-photo.jpg
│   └── diagram.png
└── favicon.svg
```

### Step 2: Reference in markdown

```markdown
![Alt text for accessibility](/images/my-photo.jpg)
```

### Step 3: Or use in frontmatter

```markdown
heroImage: "/images/my-photo.jpg"
```

### Image Tips

- **Supported formats:** JPG, PNG, GIF, SVG, WebP
- **Recommended size:** Keep images under 500KB for fast loading
- **Hero images:** Use 1200x600px for best results
- **Alt text:** Always describe images for accessibility

---

## Modifying Components

All UI components live in `src/components/`. Edit them to change the site's look.

### Where components are

```
src/components/
├── Header.astro       ← Navigation bar (logo, links, theme toggle, hamburger menu)
├── Footer.astro       ← Footer with links and copyright
├── SocialList.astro   ← Social icons (GitHub, X, LinkedIn)
├── PostCard.astro     ← Card layout used on tag pages (title, desc, date)
└── TagBadge.astro     ← Tag link pill (#tagname)
```

### How to edit

Each `.astro` file has three sections:

1. **Frontmatter** (`---` block) — JavaScript logic, imports, props
2. **HTML template** — The visual markup
3. **`<script>`** — Client-side JavaScript (if any)

**Example — adding a social link to `Footer.astro`:**

```astro
<ul class="footer-links">
  <li><a href="/">Home</a></li>
  <li><a href="/about">About</a></li>
  <li><a href="https://github.com/shin01221">GitHub</a></li>
  <li><a href="https://x.com/mohamed_med0090">X</a></li>
  <li><a href="https://your-site.com">New</a></li>
</ul>
```

### Layout files

```
src/layouts/
├── BaseLayout.astro   ← Wraps every page (head, header, main, footer)
└── PostLayout.astro   ← Wraps individual blog posts (meta, tags, content)
```

### Styles

```
src/styles/global.css  ← All site styles (colors, layout, typography)
```

**Key CSS variables** (change these to customize the theme):

```css
:root {
  --color-accent: #2bbc8a;       /* Primary green accent */
  --color-bg: #fafafa;            /* Light mode background */
  --color-text: #1a1a2e;          /* Light mode text */
  --max-width: 768px;             /* Content width */
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

[data-theme="dark"] {
  --color-bg: #1a1b1e;           /* Dark mode background */
  --color-text: #e0e0e0;          /* Dark mode text */
}
```

---

## Commands

### Development

```bash
# Start dev server with hot reload
npm run dev

# Preview production build locally
npm run preview
```

### Build & Deploy to Netlify

```bash
# Build the static site to dist/
npm run build

# Deploy to Netlify
npm run deploy
```

### Or combined

```bash
npm run build && npm run deploy
```

---

## Draft Posts

To work on a post without publishing it:

```markdown
---
title: "Work in Progress"
description: "Coming soon"
pubDate: 2024-04-08
draft: true   ← Won't be published
---
```

Set `draft: false` or remove the line when ready to publish.

---

## Editing Existing Posts

1. Find the post in `src/content/blog/`
2. Edit the `.md` file
3. Update `updatedDate` in frontmatter (optional)
4. Run `npm run build` to verify it compiles
5. Run `npm run deploy` to publish

---

## Troubleshooting

### Post not showing up?
- Check that `draft: false` (or remove the line)
- Verify `pubDate` is not in the future
- Ensure file has `.md` extension
- Run `npm run build` and check for errors

### Images not loading?
- Verify image is in `/public/images/`
- Check path starts with `/images/`
- Confirm image file exists

### Build errors?
- Check frontmatter has all required fields
- Ensure dates are in `YYYY-MM-DD` format
- Run `npm install` if dependencies are missing

### Theme not applying?
- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Check `localStorage.getItem('theme')` in browser devtools

---

## File Structure

```
/Media/blog/
├── src/
│   ├── components/        ← UI components (Header, Footer, PostCard, etc.)
│   ├── content/
│   │   └── blog/          ← Blog posts (.md files) go here
│   ├── layouts/           ← Page layout templates
│   ├── pages/             ← Route pages (home, about, tags, admin)
│   │   ├── index.astro    ← Homepage
│   │   ├── about.astro    ← About page
│   │   ├── blog/          ← Blog post routing
│   │   └── tags/          ← Tag pages
│   └── styles/            ← Global CSS
├── public/
│   └── images/            ← Static images
├── dist/                  ← Build output (auto-generated, don't edit)
├── netlify.toml           ← Deployment config
└── package.json           ← Dependencies
```

---

## Need Help?

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Netlify CLI Docs](https://cli.netlify.com/)
