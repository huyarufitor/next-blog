---
name: migrate-vuepress-content
description: Safely inventory, classify, review, and migrate selected Markdown from the legacy vuepress-starter repository into Stack Notes. Use when scanning old VuePress notes, preparing manifests, converting VuePress syntax, moving assets, choosing posts/public notes/local notes, or validating migration dry-runs and writes.
---

# Migrate VuePress Content

Read [references/migration-policy.md](references/migration-policy.md) before inspecting candidates or changing a manifest.

## Workflow

1. Confirm the source root and candidate scope. Treat the source repository as read-only.
2. Exclude embedded repositories, project templates, generated dependencies, and third-party collections.
3. Inspect selected files for ownership, duplication, internal information, credentials, VuePress syntax, relative assets, MDX conflicts, and quality.
4. Assign `ready`, `needs-edit`, `local-only`, `blocked`, or `exists`. Never reproduce secret values.
5. Create a JSON manifest containing only explicitly selected files. Never create a recursive catch-all manifest.
6. Run `npm run migrate:vuepress -- --manifest <path>` without `--write` and review every result.
7. Obtain explicit approval for the exact `ready` entries to write.
8. Use `--write` only for approved clean entries. Never overwrite existing targets.
9. Apply `$publish-blog-content` before making migrated content public.
10. Re-run the manifest to prove idempotence and execute relevant verification.

## Status Rules

- `ready`: clean, attributable, useful content that the CLI can convert.
- `needs-edit`: requires correction, syntax conversion, asset work, or fact checking.
- `local-only`: personal or work material that must not enter Git or production.
- `blocked`: credential, private key, unclear ownership, or another hard stop.
- `exists`: destination exists; compare manually and do not overwrite.

## Safety Gates

- Never print, quote, copy, or report a suspected credential; recommend revocation.
- Never modify the VuePress source repository.
- Never use `--write` while inspection issues remain unresolved.
- Never migrate a directory merely because its top-level path is allowed.
- Never bulk-copy application source, dependencies, or assets without review.

## Expected Output

Provide the scope, exclusions, status table with reasons, dry-run summary, exact approved writes, verification commands, and unresolved editorial risks.
