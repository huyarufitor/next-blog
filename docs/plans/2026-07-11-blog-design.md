# Blog System Design

Date: 2026-07-11

## Goal

Build a personal technical blog with strong SEO, fast page delivery, low initial complexity, and a clean upgrade path from local MDX content to a headless CMS later.

## Product Direction

- Blog type: personal technical blog
- Content model: local Markdown/MDX first, CMS optional later
- Initial scope: standard edition
- Deployment preference: prioritize development efficiency and maintainability

## Final Stack Decision

- Framework: `Next.js 15`
- Language: `TypeScript`
- Styling: `Tailwind CSS`
- Content source: local `MDX`
- Deployment: `Vercel`
- Comments: `Giscus`
- Search: build-time static index with client-side lookup
- Syntax highlighting: `rehype-pretty-code`
- Metadata source: frontmatter
- Future content upgrade path: `Sanity` or equivalent headless CMS

## Why This Stack

This stack optimizes for the current problem instead of solving a larger one too early:

- `Next.js` gives strong SEO, mature static generation, and an easy path for future interactive features.
- Local `MDX` avoids the overhead of databases and admin systems in the first release.
- `Vercel` keeps deployment simple and aligns well with a mostly static content site.
- The architecture can switch content sources later without rebuilding the page layer from scratch.

## Rejected Alternatives

### `Astro + MDX`

Good fit for a long-term static content site, but less aligned with the planned growth path if the site later adds richer interactions or a CMS-backed workflow.

### `Next.js + Headless CMS` from day one

This adds unnecessary complexity and setup cost for the first release. The current scope does not justify it.

## Architecture

### Layers

- Presentation layer: `Next.js App Router`
- Content layer: `content/posts/*.mdx`
- Rendering layer: MDX compilation, heading extraction, syntax highlighting
- Index layer: tags, archives, search index, RSS, sitemap
- Interaction layer: comments, table-of-contents state, search UI
- Deployment layer: `Vercel`, static-first

### Architectural Rules

- Most pages should be statically generated.
- Content access should be centralized behind `lib/posts.ts`.
- UI components should not depend directly on filesystem structure.
- Search, tags, and archives should be generated from the content set at build time.
- The comment system should remain isolated as a client component.

## Site Structure

### Core Pages

1. `/`
   - Hero section
   - Latest posts
   - Featured tags
   - Author introduction
2. `/posts/[slug]`
   - Title, summary, date, reading time, tags
   - MDX content
   - TOC from headings
   - Related posts
   - Previous/next navigation
   - `Giscus` comments
3. `/tags`
   - Tag list with article counts
4. `/tags/[tag]`
   - Articles for the selected tag
5. `/archives`
   - Time-based grouping
6. `/about`
   - Author profile and contact details

### SEO Outputs

- Per-page metadata
- Open Graph metadata
- Twitter Card metadata
- `sitemap`
- `rss.xml`

## Initial Feature Scope

### Included

- MDX article pipeline
- Post listing and detail pages
- Tags and archives
- Reading time
- Previous/next post links
- Related posts
- Table of contents
- Syntax highlighting
- Static full-text search
- `Giscus` comments
- SEO metadata
- RSS
- Sitemap

### Excluded

- User accounts
- Database
- Pageview tracking
- Likes
- Newsletter
- Visual CMS
- Draft collaboration workflow

## Content Model

Each article should support frontmatter similar to:

- `title`
- `date`
- `summary`
- `tags`
- `draft`
- `cover`

The slug should derive from the filename to keep URLs stable.

## Proposed Project Layout

```text
web-demo/
├─ app/
│  ├─ page.tsx
│  ├─ about/page.tsx
│  ├─ archives/page.tsx
│  ├─ tags/page.tsx
│  ├─ tags/[tag]/page.tsx
│  ├─ posts/[slug]/page.tsx
│  ├─ rss.xml/route.ts
│  └─ sitemap.ts
├─ components/
│  ├─ layout/
│  ├─ post/
│  ├─ search/
│  └─ comments/
├─ content/
│  └─ posts/
├─ lib/
│  ├─ posts.ts
│  ├─ mdx.ts
│  ├─ toc.ts
│  ├─ search.ts
│  ├─ related.ts
│  └─ seo.ts
├─ public/
│  └─ images/
├─ styles/
├─ types/
└─ package.json
```

## Dependency Recommendations

### Core

- `next`
- `react`
- `typescript`
- `tailwindcss`

### Content and Rendering

- `@next/mdx`
- `gray-matter`
- `remark-gfm`
- `rehype-slug`
- `rehype-autolink-headings`
- `rehype-pretty-code`

### Feature Support

- `giscus`
- `reading-time`
- `github-slugger`
- `fuse.js` or `minisearch`
- `zod` for frontmatter validation
- `date-fns` for date formatting

## Delivery Strategy

### Phase 1: Foundation

- Initialize project
- Configure App Router, TypeScript, Tailwind, MDX
- Add global layout, navigation, footer
- Add sample posts

### Phase 2: Content System

- Build post loading and parsing
- Implement post detail page
- Add tags, archives, related posts, previous/next

### Phase 3: Reading Experience and SEO

- Add metadata, RSS, sitemap
- Add TOC and syntax highlighting
- Add search index and search UI

### Phase 4: Release Hardening

- Add `Giscus`
- Add empty states, draft filtering, 404 handling
- Verify production build and deploy to `Vercel`

## Main Risks

1. MDX rendering can become fragile if too many custom components are introduced too early.
2. Search is easy to over-engineer; the first version should remain static and local.
3. `Giscus` requires repository-side discussion setup.
4. Future CMS migration stays manageable only if content access is abstracted from page components.

## Upgrade Path

If a visual editing workflow is needed later:

1. Introduce a CMS such as `Sanity`
2. Replace file-based content loading inside `lib/posts.ts`
3. Keep routes, components, and most page composition unchanged

This preserves the initial investment while allowing the content workflow to evolve.
