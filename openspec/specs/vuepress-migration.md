# VuePress 内容迁移规格

## Requirement: migration is explicit-manifest driven

迁移工具 MUST 只处理 JSON manifest 中明确列出的单个 Markdown 文件，不得扫描或递归复制源目录。

### Scenario: source is not listed

- **WHEN** VuePress 源目录中存在未列入 manifest 的文件
- **THEN** 迁移工具不会读取或写入该文件

## Requirement: source and destination paths stay contained

每个源文件 MUST 位于 manifest 的 `sourceRoot` 内，目标文件 MUST 位于对应的 `content/posts`、`content/notes` 或 `content/notes-local` 目录内。目录、越界路径和非 Markdown 文件 MUST 被拒绝。

### Scenario: path traversal is supplied

- **WHEN** manifest 使用 `../` 越过配置根目录
- **THEN** 工具报错并停止处理该路径

## Requirement: dry-run is the default

没有 `--write` 时，迁移 MUST 只输出 `ready`、`needs-review` 或 `exists` 结果，不创建目标文件。只有显式 `--write` 才允许写入。

### Scenario: candidate needs review

- **WHEN** 源文件包含 VuePress 容器、Vue 组件、相对图片、MDX 标签或疑似凭据
- **THEN** 结果为 `needs-review`，不会写入目标目录

## Requirement: existing targets are never overwritten

目标文件已经存在时，工具 MUST 返回 `exists`，不得覆盖已有内容。

### Scenario: destination already exists

- **WHEN** manifest 指向已有目标路径
- **THEN** 源文件不被写入，已有目标内容保持不变

## Requirement: migration preserves visibility boundaries

迁移目标为 `post` 时生成草稿文章；目标为 `note` 时进入公开笔记；目标为 `local-note` 时进入本地笔记。任何疑似凭据都 MUST 阻断迁移并要求人工处理。

### Scenario: clean explicit entry is written

- **WHEN** manifest 项目通过检查且显式传入 `--write`
- **THEN** 工具只写入对应目标目录，并生成规范化 frontmatter

## Source evidence

- `scripts/migrate-vuepress-content.ts`
- `tests/migrate-vuepress-content.test.ts`
- `docs/plans/2026-07-21-knowledge-base-migration.md`
