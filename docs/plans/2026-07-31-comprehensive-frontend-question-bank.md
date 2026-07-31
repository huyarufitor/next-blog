# Comprehensive Frontend Question Bank Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a searchable MDX interview handbook with more than 200 frontend questions and concise reference answers.

**Architecture:** Add one content-only MDX draft organized by technical domain and continuous question numbering. Every question uses the same four-field schema so interviewers can search, compare, and assemble role-specific interviews without introducing new application behavior.

**Tech Stack:** MDX, Markdown tables, existing Next.js content pipeline.

---

### Task 1: Create the question-bank skeleton

**Files:**
- Create: `content/posts/complete-frontend-interview-question-bank-2026.mdx`

1. Add valid frontmatter and a table of contents.
2. Add the agreed technical modules and numbering ranges.
3. Explain how interviewers should select questions by role.

### Task 2: Write more than 200 questions

**Files:**
- Modify: `content/posts/complete-frontend-interview-question-bank-2026.mdx`

1. Write questions across fundamentals, frameworks, engineering, architecture, full stack, AI, operations, and scenarios.
2. Give every question a reference answer, evaluation focus, and follow-up.
3. Avoid duplicate questions and framework-version claims that are too narrow or time-sensitive.

### Task 3: Audit structure and content

1. Count numbered question headings and require at least 200.
2. Confirm each heading is followed by all four required fields.
3. Search for raw MDX angle-bracket syntax and sensitive resume data.
4. Run `git diff --check`.

### Task 4: Verify the blog pipeline

Run:

```bash
npm run lint
npm test
npx tsc --noEmit
npm run build
```

Confirm the MDX compiles and the draft does not appear in production post routes.
