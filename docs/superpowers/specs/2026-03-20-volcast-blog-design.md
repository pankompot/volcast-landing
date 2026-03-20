# Volcast Blog — Design Specification

> Astro-powered blog overlay for volcast.app with bilingual content (EN + PL), SEO optimization, and client-side search.
> Author: Michal | Date: 2026-03-20

---

## 1. Context

volcast.app is a static HTML landing page for the Volcast solar forecasting app. It has 12 locale-specific landing pages, privacy/terms pages, and a language redirect system. Recently migrated from GitHub Pages to Vercel.

The site has no framework — each locale is a standalone `index.html` with inline CSS (Midnight Emerald dark theme) and inline JS. A `build.js` + `template.html` + `translations.json` system generates locale pages.

This spec adds an R&D blog to drive SEO, build technical authority, and explain the science behind Volcast's physics-based solar forecasting engine.

---

## 2. Architecture

### Approach: Astro blog overlay

Astro handles blog routes only. Existing HTML files move to `public/` and are served verbatim by Vercel. No changes to existing landing pages.

- **Framework:** Astro 5.x
- **Output mode:** `hybrid` — static by default, SSR opt-in for language redirect and API proxy
- **Hosting:** Vercel (existing)
- **Content format:** Markdown (`.md`) — no MDX, no React components in content
- **Languages:** English + Polish (bilingual from launch)

### Why this approach

- Zero risk to existing landing pages — they remain untouched in `public/`
- Astro's content collections provide typed schemas, build-time validation, and static generation
- `output: 'hybrid'` enables SSR for the `/blog/` language redirect and `/api/forecast` proxy without making everything server-rendered
- Aligns with the volterlabs.com tech stack (Astro planned there too) — blog components/content could migrate later

---

## 3. Project structure

```
volcast-landing/
├── astro.config.mjs              # output: 'hybrid', Vercel adapter, sitemap
├── package.json
├── tsconfig.json
├── vercel.json                    # framework: 'astro', cleanUrls: true
├── public/                        # Existing site — served as-is
│   ├── index.html                 # Root language redirect
│   ├── en/index.html              # English landing
│   ├── pl/index.html              # Polish landing
│   ├── de/index.html              # German landing
│   ├── nl/index.html ... etc      # All 12 locales
│   ├── privacy.html
│   ├── terms.html
│   ├── delete-account.html
│   ├── redirect.html
│   ├── auth/
│   ├── img/                       # Existing images
│   ├── build.js                   # Landing page generator (kept for reference)
│   ├── template.html
│   ├── translations.json
│   ├── translations-en.txt
│   ├── robots.txt                 # NEW
│   ├── sitemap-landing.xml        # NEW — manual sitemap for static pages
│   └── sitemap-index.xml          # NEW — references blog + landing sitemaps
├── src/
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro              # SSR: Accept-Language → redirect to /blog/en/ or /blog/pl/
│   │   │   ├── [lang]/
│   │   │   │   ├── index.astro          # Blog listing page
│   │   │   │   ├── [slug].astro         # Individual post page
│   │   │   │   ├── tag/
│   │   │   │   │   └── [tag].astro      # Posts filtered by tag
│   │   │   │   └── series/
│   │   │   │       └── [series].astro   # Posts filtered by series
│   │   │   ├── en/
│   │   │   │   └── rss.xml.ts           # English RSS feed
│   │   │   └── pl/
│   │   │       └── rss.xml.ts           # Polish RSS feed
│   │   └── api/
│   │       └── forecast.ts              # Supabase proxy (migrated from vercel.json rewrite)
│   ├── content/
│   │   ├── config.ts                    # Content collection schema
│   │   └── blog/
│   │       ├── en/                      # English posts
│   │       │   └── *.md
│   │       └── pl/                      # Polish posts
│   │           └── *.md
│   ├── layouts/
│   │   ├── BaseLayout.astro             # HTML shell, meta, OG, fonts
│   │   └── BlogPost.astro              # Article layout with ToC, series nav
│   ├── components/
│   │   ├── Header.astro                 # Shared navigation bar
│   │   ├── Footer.astro                 # Shared footer
│   │   ├── BlogCard.astro               # Post card for listing grid
│   │   ├── PostMeta.astro               # Date, tags, reading time, series badge
│   │   ├── ReadingTime.astro            # Estimated reading time
│   │   ├── TableOfContents.astro        # Auto-generated from headings
│   │   ├── SeriesNav.astro              # Prev/next within a series
│   │   ├── TagList.astro                # Tag display + links
│   │   ├── LanguageSwitcher.astro       # EN/PL toggle
│   │   └── SearchWidget.astro           # Pagefind search UI
│   └── styles/
│       └── global.css                   # Midnight Emerald tokens + blog prose styles
```

---

## 4. Content schema

### Collection definition (`src/content/config.ts`)

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    author: z.string().default('Michal'),
    tags: z.array(z.string()),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    lang: z.enum(['en', 'pl']),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
    seo: z.object({
      ogTitle: z.string().optional(),
      ogDescription: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
    relatedPosts: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

### Frontmatter example

```yaml
---
title: "How Panel Tilt Angle Affects Forecast Accuracy"
description: "We tested 15 tilt angles against real production data. Here's what the physics of solar forecasting reveals about installation setup."
date: 2026-03-25
author: Michal
tags: ["pv-physics", "accuracy", "panel-setup"]
series: "fundamentals"
seriesOrder: 1
lang: en
draft: false
seo:
  ogTitle: "Panel Tilt vs Forecast Accuracy — Volcast R&D"
  keywords: ["solar panel tilt", "forecast accuracy", "PV physics"]
relatedPosts: ["kalman-filter", "why-no-inverter-password"]
---
```

### Translation linking

Translations link by filename convention. `en/panel-tilt.md` corresponds to `pl/panel-tilt.md`. The LanguageSwitcher swaps the lang prefix in the URL and checks at build time whether the translation file exists. No frontmatter field needed.

### Series

Posts with the same `series` value are grouped. `seriesOrder` determines sequence. SeriesNav queries the collection for matching `series` + `lang`, sorted by `seriesOrder`, and renders prev/next links.

### Drafts

Posts with `draft: true` are excluded from production builds but visible in `astro dev`.

---

## 5. Visual design

### Design system: Midnight Emerald (extended)

The blog inherits the landing page's existing design system and extends it with blog-specific tokens for readability.

**Base tokens (from landing page):**
```css
:root {
  --canvas: #05070A;
  --surface: #0F1218;
  --surface-border: #1a1f2e;
  --primary: #00FF9D;
  --primary-dim: rgba(0, 255, 157, 0.6);
  --primary-glow: rgba(0, 255, 157, 0.08);
  --primary-glow-strong: rgba(0, 255, 157, 0.15);
  --secondary: #818CF8;
  --text-primary: #FFFFFF;
  --text-secondary: #94A3B8;
  --text-muted: #64748b;
  --divider: #1e293b;
}
```

**Blog-specific tokens (new):**
```css
:root {
  --article-bg: #0F1218;           /* Lifted surface for article reading area */
  --prose-text: #CBD5E1;           /* Brighter than --text-secondary for sustained reading */
  --link-prose: #4ADE80;           /* Desaturated green for inline links */
  --link-hover: #00FF9D;           /* Full accent on hover */
  --code-bg: #0A0E14;             /* Darker inset for code blocks */
}
```

**Typography:**
- Headings: Syne 600/700 (loaded from Google Fonts, same as landing page)
- Body: DM Sans 400, 18px/1.75, color `--prose-text`
- `<h2>`: 28px Syne 700, `<h3>`: 22px Syne 700, both with `scroll-margin-top` for ToC anchors
- Heading color: `--text-primary` (#FFFFFF)

### Article reading area

The article content sits on `--article-bg` (#0F1218) — a subtle lift from the page canvas (#05070A). This reduces eye fatigue for long-form technical reading. Implemented as a centered container with the lifted background, rounded corners, and a faint `--surface-border` outline.

### Link treatment

- **Inline prose links:** `--link-prose` (#4ADE80) with subtle underline. Hover transitions to `--link-hover` (#00FF9D).
- **CTA links / navigation:** full `--primary` (#00FF9D). Reserved for action elements only.
- Rationale: full-brightness green in body text of a 2000-word article creates visual noise. Desaturated green keeps links discoverable without competing with content.

### Code blocks

- Background: `--code-bg` (#0A0E14) — darker than article surface, creating an inset feel
- Thin left border in `--primary-dim`
- Copy button top-right
- Syntax theme: Tokyo Night (proven readability, good token differentiation on dark backgrounds)
- Inline code: `--surface` background with `--surface-border` outline, slightly smaller font size

### Other prose elements

- **Blockquotes:** left border in `--primary`, italic, `--text-muted` color
- **Images:** rounded corners, subtle `--surface-border`, optional `<figcaption>` caption
- **Tables:** `--surface` background, header row with `--divider` separator, horizontal scroll on mobile

### Blog listing page

- SearchWidget (Pagefind) at top
- Tag filter pills below search (clickable links to `/blog/{lang}/tag/{tag}`)
- **Featured hero card:** latest post rendered full-width. Larger title (Syne 24px), full description, date, tags, reading time. `--surface` background with subtle top-border glow in `--primary-dim`. Creates an editorial entry point.
- **Post grid:** remaining posts in 2 columns (desktop) / 1 column (mobile). Each BlogCard has `--surface` background with `--surface-border`. Title (Syne 600), description (2-3 lines truncated), date, tags, reading time. Hover: border glow transition toward `--primary-dim`.
- **Atmospheric background:** faint radial gradient behind card grid — `--primary-glow` emanating from center-top. Reinforces "energy" theme without being heavy.

### Header (shared navigation)

- Left: Volcast logo (links to `/{lang}/` landing page)
- Center/right: "Home" (→ `/{lang}/`), "Blog" (→ `/blog/{lang}/`) with active state
- Right: LanguageSwitcher (EN | PL toggle)
- Sticky, `--surface` background with `--surface-border` bottom border
- Mobile: simplified inline layout or hamburger

### Footer (shared)

- Matches landing page footer style
- Links: Home, Blog, Privacy, Terms
- "A Volter Labs product" (future link to volterlabs.com)
- Store badges (Play Store / App Store)

---

## 6. SEO

### Sitemap strategy

Two sitemaps unified by an index:
- `@astrojs/sitemap` generates sitemap for Astro-rendered blog pages
- `public/sitemap-landing.xml` — manually maintained, lists all static HTML pages (`/en/`, `/pl/`, `/de/`, ..., `/privacy`, `/terms`)
- `public/sitemap-index.xml` — references both. Submitted to Google Search Console, referenced in `robots.txt`.

### robots.txt (`public/robots.txt`)

```
User-agent: *
Allow: /
Sitemap: https://volcast.app/sitemap-index.xml
```

### RSS feeds

Per-language feeds (not a combined feed — avoids mixing languages in readers):
- `/blog/en/rss.xml` — English posts only, `<language>en</language>`
- `/blog/pl/rss.xml` — Polish posts only, `<language>pl</language>`
- Autodiscovery `<link>` in BaseLayout points to the feed matching the current page's language
- Generated by `@astrojs/rss`

### Structured data (JSON-LD)

- **Blog listing page:** `CollectionPage` schema
- **Individual posts:** `BlogPosting` with `headline`, `datePublished`, `dateModified`, `author` (Person), `description`, `image` (OG image URL), `inLanguage` (`en` or `pl`)
- **All pages:** Organization schema (Volter Labs / Volcast)

### Canonical URLs & hreflang

- Each blog page has `<link rel="canonical">` pointing to itself
- Posts with a translation counterpart (same filename in other lang directory) get `<link rel="alternate" hreflang="en|pl">` pointing to each other
- Posts without a translation get only their own hreflang + `x-default`
- Landing page hreflang: already handled in existing static HTML. Noted as future improvement to verify consistency.

### OG images

**Phase 1 (launch):** Static default OG image with Volcast branding. `ogImage` frontmatter override for special cases.

**Phase 2 (future):** Build-time generation with `satori` + `sharp` when post count justifies the build complexity (15+ posts).

---

## 7. Search

### Pagefind (client-side)

- Indexes built HTML after `astro build` via post-build script
- Scoped to blog content: `data-pagefind-body` on article wrapper, `data-pagefind-ignore` on nav/footer
- Build command includes glob filter: `--glob "blog/**/*.html"` (belt-and-suspenders with `data-pagefind-body`)
- Language-aware: `data-pagefind-meta="lang:en|pl"` on article wrapper
- SearchWidget defaults to showing results in current page's language first, other-language results below
- SearchWidget styled to match Midnight Emerald: dark input, green focus ring, surface-colored results dropdown

---

## 8. API forecast proxy

The existing `vercel.json` rewrite for `/api/forecast` migrates into Astro's pipeline:

**`src/pages/api/forecast.ts`** — SSR endpoint:
- Proxies requests to `https://jzihchpmkhawegqcfbeo.supabase.co/functions/v1/get-forecast-api`
- Adds `Cache-Control` headers (60s) to reduce Supabase function invocations
- Returns meaningful error JSON if Supabase is unreachable (not a raw proxy failure)
- Rate limiting: documented reliance on Vercel's serverless function limits for the free tier

---

## 9. Build, deploy & dependencies

### Dependencies

```json
{
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/vercel": "^8.x",
    "@astrojs/sitemap": "^3.x",
    "@astrojs/rss": "^4.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "pagefind": "^1.x"
  }
}
```

Intentionally minimal. No React, no MDX, no Tailwind. Pure Astro + Markdown. CSS hand-written to match existing landing page inline styles.

### Astro config

```js
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  site: 'https://volcast.app',
  integrations: [sitemap()],
});
```

### Vercel config

```json
{
  "framework": "astro",
  "cleanUrls": true
}
```

Explicit `framework` prevents Vercel from misidentifying the project as static due to HTML files in `public/`.

### Build scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build && npx pagefind --site dist --glob \"blog/**/*.html\"",
    "preview": "astro preview"
  }
}
```

1. `astro check` — catches type errors and schema mismatches before build
2. `astro build` — generates static HTML for blog pages, SSR functions for redirect + API
3. `npx pagefind` — indexes blog HTML, outputs search assets to `dist/pagefind/`

**Known limitation:** `astro preview` may not serve Pagefind assets correctly. Test search functionality on Vercel preview deployments.

### Deploy flow

- Blog posts committed as `.md` files in `src/content/blog/en|pl/`
- Push to `main` triggers Vercel rebuild
- Vercel runs build script, deploys static assets + serverless functions
- Existing HTML in `public/` served directly by Vercel CDN

---

## 10. Initial content plan

From the volterlabs.com spec, adapted for volcast.app blog:

1. "How Panel Tilt Angle Affects Forecast Accuracy" — technical, with charts (series: fundamentals)
2. "Why We Don't Need Your Inverter Password" — privacy-first architecture explained
3. "Kalman Filter: How Volcast Learns Your Installation" — the ML calibration story (series: fundamentals)
4. "Net-billing 2.0 in Practice: How Much Does Autoconsumption Really Save?" — PL market focus
5. "Dynamic Tariffs in Poland: Pstryk and TGE Energy Prices Explained" — educational, drives Volter interest

Posts 1, 3 form the "fundamentals" series. Posts 4, 5 are Polish-market content (publish in PL first, translate to EN later).
