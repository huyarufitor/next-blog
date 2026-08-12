# AI Content Workflow Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add repository-level AI guidance and two validated project Skills, then prove the workflow against representative VuePress content.

**Architecture:** Keep stable project rules in `AGENTS.md`, task procedures in repository-local Skills, and deterministic migration checks in the existing TypeScript CLI. Migration remains explicit-manifest, dry-run by default, source-read-only, and fail-closed for sensitive content.

**Tech Stack:** Markdown, Codex Skills, Node.js 22, TypeScript, Vitest.

---

### Task 1: Add sensitive-content migration checks

**Files:**
- Modify: `tests/migrate-vuepress-content.test.ts`
- Modify: `scripts/migrate-vuepress-content.ts`

1. Add failing tests for common secret assignments and for non-secret prose.
2. Run the focused test and confirm the new assertion fails.
3. Add a redacted `suspected-secret` inspection issue without emitting the matched value.
4. Run the focused test and confirm it passes.

### Task 2: Add repository AI guidance

**Files:**
- Create: `AGENTS.md`

1. Document project structure, content destinations, source-repository boundaries, Skill routing, safety rules, and verification commands.
2. Keep details in Skills rather than duplicating long procedures.

### Task 3: Create and validate the publishing Skill

**Files:**
- Create: `.agents/skills/publish-blog-content/SKILL.md`
- Create: `.agents/skills/publish-blog-content/agents/openai.yaml`
- Create: `.agents/skills/publish-blog-content/references/content-policy.md`

1. Initialize the Skill with the official `skill-creator` script.
2. Define triggers and a concise publication workflow.
3. Record content placement, metadata, cover, privacy, copyright, and verification policy.
4. Run `quick_validate.py` for the Skill.

### Task 4: Create and validate the migration Skill

**Files:**
- Create: `.agents/skills/migrate-vuepress-content/SKILL.md`
- Create: `.agents/skills/migrate-vuepress-content/agents/openai.yaml`
- Create: `.agents/skills/migrate-vuepress-content/references/migration-policy.md`

1. Initialize the Skill with the official `skill-creator` script.
2. Define allowed roots, exclusions, status mapping, dry-run, approval, and write workflow.
3. Document sensitive-content and third-party-content handling.
4. Run `quick_validate.py` for the Skill.

### Task 5: Validate representative VuePress content

**Files:**
- Create: `docs/migration/vuepress-mvp-manifest.json`
- Create: `docs/migration/vuepress-mvp-report.md`
- Create: `content/notes/javascript/throttle.md`

1. Inspect five representative source files without modifying the VuePress repository.
2. Record all five workflow decisions in the report without copying secret values.
3. Run dry-run manifests to prove `ready`, `exists`, and secret-blocked behavior.
4. Explicitly write only the approved throttle note.
5. Run the migration again and confirm it reports `exists`.

### Task 6: Verify the complete workflow

Run:

```bash
npm test -- tests/migrate-vuepress-content.test.ts
npm test
npm run lint
npx tsc --noEmit
npm run build
python3 /Users/fitor/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/publish-blog-content
python3 /Users/fitor/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/migrate-vuepress-content
npm run migrate:vuepress -- --manifest docs/migration/vuepress-mvp-manifest.json
git diff --check
```

Review the final diff, confirm no secret values were copied, and report remaining manual content-review risks.
