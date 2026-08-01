# Local Interview Reader Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a development-only browser reader for local interview Markdown documents.

**Architecture:** A server-only loader reads ignored Markdown files at request time. Dynamic Next.js routes render the documents with the existing MDX renderer, while a shared layout supplies navigation and blocks every production request before filesystem access.

**Tech Stack:** Next.js App Router, React Server Components, TypeScript, next-mdx-remote, Vitest.

---

### Task 1: Test and implement the local document loader

**Files:**
- Create: `tests/interviews.test.tsx`
- Create: `tests/fixtures/interviews/README.md`
- Create: `tests/fixtures/interviews/candidates/example.md`
- Create: `lib/interviews.ts`

1. Test recursive discovery, README mapping, heading extraction, production disabling and path traversal rejection.
2. Run the focused test and verify it fails because the loader does not exist.
3. Implement the smallest server-only filesystem loader.
4. Run the focused test and verify it passes.

### Task 2: Test and implement the reader UI

**Files:**
- Modify: `tests/interviews.test.tsx`
- Create: `components/interview/interview-sidebar.tsx`
- Create: `app/interviews/layout.tsx`
- Create: `app/interviews/page.tsx`
- Create: `app/interviews/[...slug]/page.tsx`

1. Test sidebar links and document rendering behavior.
2. Implement shared navigation, Markdown body, table of contents and previous/next links.
3. Add development-only route guards and noindex metadata.
4. Run focused tests.

### Task 3: Verify end to end

1. Run `npm test`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
2. Confirm production build does not generate interview static paths.
3. Open `/interviews` locally at desktop and mobile widths and inspect screenshots.
