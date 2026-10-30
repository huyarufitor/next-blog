# Proposal

## Status

已实现并纳入当前项目。原始实施计划见 [`docs/plans/2026-07-21-knowledge-base-migration.md`](../../../docs/plans/2026-07-21-knowledge-base-migration.md)。

## Why

博客原本只有文章目录，无法同时管理公开学习笔记和本机私密资料；直接迁移旧 VuePress 目录还可能误复制项目源码、第三方题库、VuePress 专属语法或敏感信息。

## Goal

建立公开/本地知识库分层，并提供显式清单驱动、默认 dry-run、不会覆盖目标文件的 VuePress 内容迁移工具。

## Scope

- 新增 `content/notes` 和 `content/notes-local` 的读取与路由；
- 将公开笔记接入搜索和 Sitemap；
- 提供 `scripts/migrate-vuepress-content.ts` 及 manifest 示例；
- 保持源仓库只读，并在迁移前报告需要人工复核的语法、资源和凭据问题。

## Out of scope

- 自动递归迁移整个 VuePress 仓库；
- 自动判断文章隐私、版权或事实准确性；
- 将本地笔记发布到生产环境；
- 引入 CMS、远程迁移服务或新的生产依赖。

## Risks and decisions

- 迁移需要人工提供 manifest，降低批量误迁移风险，但增加准备成本。
- 本地笔记在开发环境可读，生产环境始终关闭，避免依赖 frontmatter 隐藏敏感内容。
- VuePress 专属语法只报告问题，不自动猜测转换结果。
