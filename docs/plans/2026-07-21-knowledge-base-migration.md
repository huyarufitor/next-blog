# Knowledge Base Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a public/local knowledge base and a manifest-driven VuePress migration tool without importing embedded projects by accident.

**Architecture:** Keep curated blog posts in `content/posts`, public notes in `content/notes`, and untracked local-only notes in `content/notes-local`. A shared Markdown content layer recursively reads notes, while a standalone TypeScript CLI migrates only source files explicitly listed in a JSON manifest and defaults to a no-write dry run.

**Tech Stack:** Next.js 16, React 19, TypeScript, gray-matter, Zod, next-mdx-remote, Vitest.

---

### Task 1: Add the note content model

**Files:**
- Create: `types/note.ts`
- Create: `lib/notes.ts`
- Create: `tests/notes.test.ts`
- Create: `content/notes/getting-started.md`
- Modify: `.gitignore`

1. Write tests proving recursive slugs, public/local separation, frontmatter parsing, and production exclusion of local notes.
2. Run `npm test -- tests/notes.test.ts` and confirm the missing module failure.
3. Implement the smallest recursive reader that satisfies the tests.
4. Run the focused test again and confirm it passes.

### Task 2: Add knowledge-base routes and navigation

**Files:**
- Create: `app/notes/page.tsx`
- Create: `app/notes/[...slug]/page.tsx`
- Create: `components/note/note-tree.tsx`
- Modify: `components/layout/site-header.tsx`
- Modify: `app/sitemap.ts`
- Modify: `tests/routes-metadata.test.tsx`

1. Write route metadata and rendering tests first.
2. Confirm the tests fail because routes do not exist.
3. Implement the notes index, nested detail route, navigation link, and public-note Sitemap entries.
4. Run the focused route tests.

### Task 3: Include public notes in local browser search

**Files:**
- Modify: `types/post.ts`
- Modify: `lib/posts.ts`
- Modify: `lib/search.ts`
- Modify: `app/search/page.tsx`
- Modify: `components/search/search-panel.tsx`
- Modify: `tests/search.test.ts`

1. Add a failing test that finds a public note and uses its `/notes/...` URL.
2. Extend search documents with a stable URL and content kind.
3. Render article and note results through the stored URL.
4. Run search tests.

### Task 4: Build the explicit-manifest migration CLI

**Files:**
- Create: `scripts/migrate-vuepress-content.ts`
- Create: `scripts/vuepress-migration.example.json`
- Create: `tests/migrate-vuepress-content.test.ts`
- Modify: `package.json`

1. Write failing tests for manifest validation, path containment, title extraction, VuePress syntax reporting, generated frontmatter, and dry-run behavior.
2. Implement pure conversion functions and a CLI entry point using Node built-ins and existing dependencies only.
3. Require an explicit source file for every entry, reject directories and paths outside the configured VuePress `docs` root, and write only with `--write`.
4. Run focused migration tests and an example dry run.

### Task 5: Document manual and batch migration

**Files:**
- Create: `content/note-template.md`
- Modify: `README.md`

Document public versus local storage, frontmatter, image handling, manual migration, manifest fields, dry-run/write commands, and the rule that migration candidates require human review.

### Task 6: Verify the complete change

Run, in order:

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
npm run migrate:vuepress -- --manifest scripts/vuepress-migration.example.json
```

Review `git diff --check`, confirm the CLI dry run wrote no content, and report any remaining content-review risks.
