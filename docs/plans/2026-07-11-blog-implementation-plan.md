# Blog System Implementation Plan

Date: 2026-07-11

## Objective

Implement the approved personal technical blog using `Next.js 15 + TypeScript + Tailwind + MDX`, with standard-edition functionality and a future CMS migration path.

## Milestones

### 1. Project Bootstrap

- Initialize `Next.js 15` app with `TypeScript`
- Configure `Tailwind CSS`
- Configure MDX support
- Create base directories:
  - `app`
  - `components`
  - `content/posts`
  - `lib`
  - `public/images`
  - `types`
- Add global layout, navigation, footer, and placeholder content

Exit criteria:

- Development server starts
- App routes render
- One sample MDX post can be loaded

### 2. Content Pipeline

- Implement frontmatter schema validation
- Implement post discovery and parsing in `lib/posts.ts`
- Derive slug from filename
- Compute reading time
- Generate tag and archive collections
- Add previous/next post lookup
- Add related-post selection logic

Exit criteria:

- Adding one `.mdx` file creates a routable post
- Tags and archives update automatically

### 3. Core Pages

- Build homepage
- Build post detail page
- Build tags index page
- Build tag detail page
- Build archives page
- Build about page

Exit criteria:

- All primary pages render from real content
- Empty states are handled where needed

### 4. MDX Rendering Enhancements

- Add GitHub Flavored Markdown support
- Add heading anchors
- Add syntax highlighting
- Extract headings for TOC
- Add basic prose styling

Exit criteria:

- Headings are linkable
- Code blocks render correctly
- TOC is generated from article headings

### 5. SEO and Discovery

- Implement shared metadata helpers
- Add Open Graph support
- Generate sitemap
- Generate RSS
- Add canonical URL support

Exit criteria:

- Primary routes expose metadata
- Sitemap and RSS are reachable

### 6. Search

- Build static search index at build time
- Index title, summary, tags, and body text
- Implement client-side search UI

Exit criteria:

- Search returns relevant results without a server dependency

### 7. Comments and Release Hardening

- Integrate `Giscus`
- Add draft filtering
- Add 404 handling
- Verify production build
- Prepare `Vercel` deployment config

Exit criteria:

- Production build passes
- Comment component is wired and configurable
- Site is ready to deploy

## Technical Constraints

- Prefer static generation by default
- Avoid a database in the first release
- Keep content access behind `lib/posts.ts`
- Keep client-only code isolated to search and comments

## Recommended Order of Work

1. Bootstrap project
2. Implement content loading
3. Implement post page
4. Implement homepage, tags, archives, about
5. Add MDX enhancements
6. Add SEO outputs
7. Add search
8. Add comments and release checks

## Verification Plan

- Run local development server after bootstrap
- Add at least two sample posts to validate tags, archives, previous/next, and related posts
- Run production build before considering the site ready
- Manually verify:
  - homepage
  - post page
  - tags page
  - archives page
  - search flow
  - RSS and sitemap routes

## Immediate Next Step

Initialize the project skeleton and install the base dependencies required for `Next.js`, `Tailwind`, and MDX.
