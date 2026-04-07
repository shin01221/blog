# Blog Guide

Quick reference for managing this Astro blog.

---

## Adding a New Blog Post

### 1. Create the file

Create a new `.md` file in `/src/content/blog/`:

```bash
touch src/content/blog/my-post.md
```

### 2. Use this template

```markdown
title: "Your Post Title"
description: "A brief description of your post"
pubDate: 2024-04-08
tags: ["tag1", "tag2"]
heroImage: "/images/hero.jpg"
author: "Your Name"
draft: false

```

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

| Field | Description |
|-------|-------------|
| `title` | Post title (displayed in browser tab and headings) |
| `description` | Brief summary (used for SEO and previews) |
| `pubDate` | Publication date (format: YYYY-MM-DD) |

### Optional Fields

| Field | Default | Description |
|-------|---------|-------------|
| `tags` | `[]` | Array of tags for categorization |
| `heroImage` | none | Featured image path (from `/public/`) |
| `author` | `"Medhat"` | Author name |
| `draft` | `false` | If `true`, post won't be published |
| `updatedDate` | none | Last updated date |

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

## Commands

### Development

```bash
# Start development server
npm run dev

# Preview production build locally
npm run preview
```

### Build & Deploy

```bash
# Build the site
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
title: "Work in Progress"
description: "Coming soon"
pubDate: 2024-04-08
draft: true  ← Won't be published
```

Set `draft: false` or remove the line when ready to publish.

---

## Editing Existing Posts

1. Find the post in `/src/content/blog/`
2. Edit the `.md` file
3. Update `updatedDate` in frontmatter (optional)
4. Build and deploy

---

## Troubleshooting

### Post not showing up?
- Check that `draft: false` (or remove the line)
- Verify `pubDate` is not in the future
- Ensure file is `.md` extension

### Images not loading?
- Verify image is in `/public/images/`
- Check path starts with `/images/`
- Confirm image file exists

### Build errors?
- Check frontmatter has all required fields
- Ensure dates are in `YYYY-MM-DD` format
- Run `npm install` if dependencies missing

---

## File Structure

```
/Media/blog/
├── src/
│   └── content/
│       └── blog/           ← Blog posts here
│           └── test.md
├── public/
│   └── images/             ← Images here
├── dist/                   ← Build output (auto-generated)
├── netlify.toml            ← Deployment config
└── package.json            ← Dependencies
```

---

## Need Help?

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Netlify CLI Docs](https://cli.netlify.com/)
