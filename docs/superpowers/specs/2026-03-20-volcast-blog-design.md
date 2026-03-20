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
- **Output mode:** `static` (Astro 5 default) — pages are prerendered at build time. SSR opt-in via `export const prerender = false` on individual pages (language redirect, API proxy)
- **Hosting:** Vercel (existing)
- **Content format:** Markdown (`.md`) — no MDX, no React components in content
- **Languages:** English + Polish (bilingual from launch)

### Why this approach

- Zero risk to existing landing pages — they remain untouched in `public/`
- Astro's content collections provide typed schemas, build-time validation, and static generation
- Astro 5's static output mode with per-route `prerender = false` enables SSR for the `/blog/` language redirect and `/api/forecast` proxy without making everything server-rendered
- Aligns with the volterlabs.com tech stack (Astro planned there too) — blog components/content could migrate later

---

## 3. Project structure

```
volcast-landing/
├── astro.config.mjs              # static output, Vercel adapter, sitemap
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
│   └── sitemap-landing.xml        # NEW — manual sitemap for static pages (update when locales change)
├── src/
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro              # SSR: Accept-Language → redirect to /blog/en/ or /blog/pl/
│   │   │   └── [lang]/
│   │   │       ├── index.astro          # Blog listing page
│   │   │       ├── [slug].astro         # Individual post page
│   │   │       ├── rss.xml.ts           # Per-language RSS feed
│   │   │       ├── tag/
│   │   │       │   └── [tag].astro      # Posts filtered by tag
│   │   │       └── series/
│   │   │           └── [series].astro   # Posts filtered by series
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
    seriesOrder: z.number().optional(),       // Required when series is set (enforced by refine below)
    lang: z.enum(['en', 'pl']),               // Must match parent directory (en/ or pl/); validated at build time
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
    seo: z.object({
      ogTitle: z.string().optional(),
      ogDescription: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
    relatedPosts: z.array(z.string()).optional(), // Same-language slugs; validated at build time
  }).refine(
    (data) => !data.series || data.seriesOrder !== undefined,
    { message: 'seriesOrder is required when series is set' }
  ),
});

export const collections = { blog };
```

### Build-time validations

During the build (in `getStaticPaths` or a shared utility), the following are validated:
- **`lang` matches directory:** a post at `src/content/blog/en/post.md` must have `lang: en` in frontmatter. Mismatch throws a build error. This prevents silent routing bugs.
- **`relatedPosts` resolve:** every slug in `relatedPosts` must correspond to an existing post in the same language. Missing slugs produce a build warning (not error, to allow work-in-progress references).
- **`seriesOrder` uniqueness:** within the same `series` + `lang`, no two posts may share the same `seriesOrder` value. Duplicates produce a build error (ambiguous series navigation).

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

### Route generation (`getStaticPaths`)

All blog pages are statically generated. The `[slug].astro` page uses this pattern:

```ts
export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map(post => {
    // post.id format: "en/panel-tilt" (path relative to collection root, no extension)
    const [lang, ...slugParts] = post.id.split('/');
    return {
      params: { lang, slug: slugParts.join('/') },
      props: { post },
    };
  });
}
```

The same pattern applies to:
- **Listing page** (`[lang]/index.astro`): `getStaticPaths` returns `['en', 'pl']`
- **Tag pages:** enumerate all `(lang, tag)` pairs from all published posts
- **Series pages:** enumerate all `(lang, series)` pairs from posts with a `series` field
- **RSS feeds:** enumerate `['en', 'pl']` as lang values, filter posts by `lang` in each endpoint

### Translation linking

Translations link by filename convention. `en/panel-tilt.md` corresponds to `pl/panel-tilt.md`. The LanguageSwitcher swaps the lang prefix in the URL and checks at build time whether the file exists in the other language's collection. No frontmatter field needed.

**Note for tag/series pages:** the LanguageSwitcher checks whether any posts in the target language share the same tag or series. If none exist, the switch link is hidden.

### Series

Posts with the same `series` value are grouped. `seriesOrder` determines sequence (required when `series` is set — enforced by schema). SeriesNav queries the collection for matching `series` + `lang`, sorted by `seriesOrder`, and renders prev/next links.

### Drafts

Posts with `draft: true` are excluded from production builds (filtered in all `getStaticPaths` and `getCollection` calls) but visible in `astro dev`.

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

`@astrojs/sitemap` generates `sitemap-index.xml` (auto-generated, not manual) which references:
- Its own blog sitemap(s) for Astro-rendered blog pages
- `public/sitemap-landing.xml` via the `customSitemaps` config option — manually maintained, lists all static HTML pages (`/en/`, `/pl/`, `/de/`, ..., `/privacy`, `/terms`)

There is no manual `public/sitemap-index.xml` — `@astrojs/sitemap` is the single source of truth for the sitemap index. This avoids file collisions between Astro-generated and manual sitemaps.

### robots.txt (`public/robots.txt`)

```
User-agent: *
Allow: /
Sitemap: https://volcast.app/sitemap-index.xml
```

**Note:** `@astrojs/sitemap` generates `sitemap-index.xml` in the build output. The manual `public/robots.txt` references it. No other integration generates a competing `robots.txt` since we don't use one.

### RSS feeds

Per-language feeds (not a combined feed — avoids mixing languages in readers):
- `/blog/en/rss.xml` — English posts only, `<language>en</language>`
- `/blog/pl/rss.xml` — Polish posts only, `<language>pl</language>`
- Both generated from a single `src/pages/blog/[lang]/rss.xml.ts` endpoint using `Astro.params.lang` to filter posts. `getStaticPaths` returns `['en', 'pl']`.
- Autodiscovery `<link>` in BaseLayout points to the feed matching the current page's language
- Generated by `@astrojs/rss`
- Draft posts (`draft: true`) are filtered out of feeds

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
  // Astro 5: 'static' is the default. SSR pages opt in via `export const prerender = false`.
  adapter: vercel(),
  site: 'https://volcast.app',
  integrations: [
    sitemap({
      customSitemaps: [
        'https://volcast.app/sitemap-landing.xml',
      ],
    }),
  ],
});
```

Pages that need SSR (`src/pages/blog/index.astro` and `src/pages/api/forecast.ts`) must export:
```ts
export const prerender = false;
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
    "build": "astro check && astro build && npx pagefind --site .vercel/output/static --glob \"blog/**/*.html\"",
    "preview": "astro preview"
  }
}
```

1. `astro check` — catches type errors and schema mismatches before build
2. `astro build` — generates static HTML to `.vercel/output/static/` (Vercel Build Output API format), SSR functions to `.vercel/output/functions/`
3. `npx pagefind` — indexes blog HTML in `.vercel/output/static/`, outputs search assets (`_pagefind/` directory) into the same location so Vercel serves them as static assets

**Important:** With the `@astrojs/vercel` adapter, `astro build` does NOT output to `dist/`. It produces the Vercel Build Output API structure under `.vercel/output/`. Pagefind must target `.vercel/output/static`, not `dist`.

**Known limitation:** `astro preview` may not serve Pagefind assets correctly. Test search functionality on Vercel preview deployments.

### Deploy flow

- Blog posts committed as `.md` files in `src/content/blog/en|pl/`
- Push to `main` triggers Vercel rebuild
- Vercel runs build script, deploys static assets + serverless functions
- Existing HTML in `public/` served directly by Vercel CDN

---

## 10. Migration steps

The current repo has all files at the repository root. The migration to an Astro project requires relocating them.

### File relocation plan

**Move to `public/`** (served as static assets by Astro):
- `index.html` (root language redirect)
- `en/`, `pl/`, `de/`, `nl/`, `es/`, `fr/`, `uk/`, `pt/`, `pt-br/`, `ro/`, `cs/`, `sk/` (all locale directories)
- `privacy.html`, `terms.html`, `delete-account.html`, `redirect.html`
- `auth/`
- `img/`

**Move to `public/` (reference only, not part of build)**:
- `build.js`, `template.html`, `translations.json`, `translations-en.txt` — the landing page generator. These are kept for reference; their output (the locale `index.html` files) is already committed. If locale pages need regeneration, run `build.js` manually and commit the results into `public/`.

**Stay at root** (Astro project files):
- `vercel.json` (updated with `"framework": "astro"`)
- New: `astro.config.mjs`, `package.json`, `tsconfig.json`
- New: `src/` directory (all Astro source)

**Removed from `vercel.json`**:
- The `/api/forecast` rewrite — replaced by `src/pages/api/forecast.ts`

### Migration order

1. Initialize Astro project (`package.json`, `astro.config.mjs`, `tsconfig.json`). Add `.gitignore` with `node_modules/`, `.vercel/`, `_pagefind/`.
2. Create `public/` directory and move all existing files into it
3. Update `vercel.json` (add `"framework": "astro"`, remove `/api/forecast` rewrite)
4. Create `src/` structure (pages, content, layouts, components, styles)
5. Deploy to Vercel preview and verify: all existing landing pages still load, language redirect works, `/api/forecast` still functions
6. Only after verification: merge to `main`

---

## 11. Scope boundaries & deferred items

### Pagination

Out of scope for Phase 1. A single listing page is sufficient for < 20 posts. When post count exceeds ~15-20, add Astro's built-in pagination (`paginate()` in `getStaticPaths`). The current listing page structure (hero card + grid) is compatible with adding pagination later without architectural changes.

### Language fallback

Blog content exists only in EN and PL. The `/blog/` SSR redirect handles `Accept-Language` headers: Polish-speaking users get `/blog/pl/`, all others (including DE, NL, etc.) fall back to `/blog/en/`. This is documented in the redirect page's code.

### 404 handling

Requests to non-existent blog routes (e.g., `/blog/fr/some-post`) naturally fall through to Vercel's default 404 page since `getStaticPaths` only generates `en` and `pl` routes. A custom 404 page for blog routes (suggesting EN/PL versions) is a Phase 2 enhancement.

### Landing page hreflang

The existing static landing pages already have hreflang tags in their HTML. These are not modified by this project. Consistency verification is a future task.

### OG image generation

Deferred to Phase 2 (see Section 6). Static default OG image for launch.

---

## 12. Initial content plan

From the volterlabs.com spec, adapted for volcast.app blog:

1. "How Panel Tilt Angle Affects Forecast Accuracy" — technical, with charts (series: fundamentals)
2. "Why We Don't Need Your Inverter Password" — privacy-first architecture explained
3. "Kalman Filter: How Volcast Learns Your Installation" — the ML calibration story (series: fundamentals)
4. "Net-billing 2.0 in Practice: How Much Does Autoconsumption Really Save?" — PL market focus
5. "Dynamic Tariffs in Poland: Pstryk and TGE Energy Prices Explained" — educational, drives Volter interest

Posts 1, 3 form the "fundamentals" series. Posts 4, 5 are Polish-market content (publish in PL first, translate to EN later).
