# Unlisted Posts Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add shareable articles that are available by direct URL but omitted from every site discovery surface.

**Architecture:** Add an `unlisted` frontmatter flag to the existing post model. Public collection queries exclude unlisted posts by default, while direct slug lookup and static route generation can include them; unlisted pages emit `noindex` metadata and omit public comments. The Thailand honeymoon article is copied from the ignored local note into `content/posts` with privacy-sensitive incidental details removed and a registered 16:9 cover.

**Tech Stack:** Next.js 16 App Router, TypeScript, Zod, MDX, Vitest, `next/og`

---

### Task 1: Define and test the unlisted content contract

**Files:**
- Modify: `tests/posts.test.ts`
- Modify: `tests/search.test.ts`
- Modify: `tests/og-images.test.ts`
- Modify: `types/post.ts`
- Modify: `lib/posts.ts`
- Modify: `app/posts/[slug]/page.tsx`

1. Add tests proving `unlisted` defaults to `false`, an unlisted post is absent from `getAllPosts()` and search documents, and direct slug lookup still returns it.
2. Add a metadata test proving the direct page emits `robots: { index: false, follow: false }`.
3. Run the focused tests and confirm they fail for the missing behavior.
4. Add `unlisted` to the Zod schema and post types.
5. Extend `getAllPosts` with `includeUnlisted`; keep the default collection filtered, but allow static params to request all non-draft posts.
6. Add `noindex`/`nofollow` metadata and suppress Giscus comments on unlisted pages.
7. Run the focused tests and confirm they pass.

### Task 2: Add the shareable travel article and cover

**Files:**
- Create: `content/posts/2026-thailand-honeymoon.mdx`
- Modify: `lib/covers.ts`
- Modify: `app/images/posts/[name]/route.ts`
- Modify: `content/post-template.mdx`
- Modify: `docs/plans/article-publishing-standards.md`
- Test: `tests/covers.test.ts`

1. Add a failing cover registration test for `2026-thailand-honeymoon.png`.
2. Register a `tropical-journey` cover theme and add a 1200 x 675 renderer built from the existing `ImageResponse` cover system.
3. Create the MDX article with `category: "生活切片"`, `unlisted: true`, and the registered cover path. Remove the child's nickname and exact hotel room number from the shareable copy.
4. Document the `unlisted` frontmatter behavior in the template and publishing standard.
5. Run post, cover, MDX, search, route metadata, RSS, and Sitemap tests.

### Task 3: Verify the complete publication boundary

**Files:**
- Verify: `content/posts/2026-thailand-honeymoon.mdx`
- Verify: `content/notes-local/2026-thailand-honeymoon.md`

1. Confirm the local source remains ignored and unchanged.
2. Confirm the shareable article is returned by direct slug lookup.
3. Confirm the article is absent from default post lists, category/tag/archive results, search documents, RSS, and Sitemap.
4. Run `npm test`, `npm run lint`, `npx tsc --noEmit`, and `npm run build` under Node.js 22.
5. Start the local server and inspect the direct article URL and cover at desktop and mobile widths.

No commit or push is part of this plan, per repository instructions.
