# Frontend Interview Guide Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publish-ready MDX draft that gives interviewers a layered, evidence-driven frontend interview question set derived from anonymized resume signals.

**Architecture:** Add one content-only MDX article under `content/posts`. Keep all source resumes outside the repository, aggregate their technical signals, and verify the finished content through privacy review plus the existing lint, test, typecheck, and production build pipeline.

**Tech Stack:** MDX, Next.js content pipeline, gray-matter, existing blog taxonomy.

---

### Task 1: Write the interview guide draft

**Files:**
- Create: `content/posts/frontend-interview-questions-that-reveal-real-skill.mdx`

1. Add valid frontmatter with `draft: true` and the approved title.
2. Explain the evidence-driven five-layer questioning method.
3. Add 30 questions across foundational, project-depth, and lead-level sections.
4. Give each question a prompt, follow-up, strong signal, and risk signal.
5. Add a 60-minute interview flow and a five-dimensional scorecard.

### Task 2: Review content safety and structure

**Files:**
- Review: `content/posts/frontend-interview-questions-that-reveal-real-skill.mdx`

1. Search for names, phone numbers, email addresses, schools, and source company names.
2. Confirm the document contains exactly 30 numbered core questions.
3. Confirm the title and frontmatter match the approved design.
4. Confirm resume claims are framed as interview signals rather than verified facts.

### Task 3: Verify the article in the blog

Run:

```bash
npm run lint
npm test
npx tsc --noEmit
npm run build
```

Confirm the draft parses successfully but is absent from public production post routes.
