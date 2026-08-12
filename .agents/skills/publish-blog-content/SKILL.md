---
name: publish-blog-content
description: Classify, create, edit, review, and publish content for the Stack Notes blog. Use when working with content/posts, content/notes, or content/notes-local; turning rough notes into public content; or checking frontmatter, covers, privacy, copyright, links, and publication readiness.
---

# Publish Blog Content

Read [references/content-policy.md](references/content-policy.md) before changing content.

## Workflow

1. Inspect the source and related repository content. Do not assume rough notes are public.
2. Classify it as `post`, `note`, `local-note`, or `blocked` using the policy.
3. Report privacy, credential, copyright, attribution, factual, and duplication risks before writing.
4. Ask only when the destination or publication boundary materially changes the outcome.
5. Use `content/post-template.mdx` or `content/note-template.md`. Preserve the author's meaning; do not invent experience or claims.
6. For posts, register a relevant cover in `lib/covers.ts` and follow `docs/plans/article-publishing-standards.md`.
7. Run focused tests, lint, and typecheck. Run the build when routes, metadata, MDX rendering, covers, or public content change.
8. Summarize changed files, actual verification results, and remaining editorial risks.

## Safety Gates

- Stop on a possible secret or private key. Do not reproduce its value. Recommend revocation if it may be real.
- Put internal work material or incomplete redactions in `content/notes-local`; `draft` is not a privacy boundary.
- Do not publish third-party or unclear-source material until ownership, license, and attribution are resolved.
- Do not overwrite existing content without reviewing it and confirming intent.

## Expected Output

State the selected content type and why, blockers, changed files, commands run, and anything still requiring human editorial review.
