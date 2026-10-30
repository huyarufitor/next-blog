# Specification

## Requirements

### Requirement: notes have separate public and local sources

系统 MUST 从 `content/notes` 读取公开笔记，并将 `content/notes-local` 作为本地私密来源；生产环境 MUST 排除本地来源。

#### Scenario: public note is nested

- **WHEN** 公开笔记位于多层目录
- **THEN** 系统生成对应的嵌套路由、目录树和搜索 URL

#### Scenario: local note is loaded in development

- **WHEN** 本地开发环境未关闭 `includeLocal`
- **THEN** 可以读取本地笔记用于本机阅读，但其 visibility 为 `local`

### Requirement: migration requires an explicit file manifest

迁移 MUST 只处理 manifest 明确列出的 Markdown 文件，默认 dry-run，并拒绝越过 `sourceRoot` 的源路径。

#### Scenario: clean item is previewed

- **WHEN** 运行 `npm run migrate:vuepress -- --manifest <file>`
- **THEN** 工具报告 `ready`，且不会创建目标文件

#### Scenario: source contains unsupported syntax

- **WHEN** 源文件包含 VuePress 容器、Vue 组件、相对资源或疑似凭据
- **THEN** 工具报告 `needs-review` 并跳过写入

### Requirement: public notes participate in site discovery

公开笔记 MUST 出现在笔记路由、搜索和 Sitemap 中；本地笔记 MUST 不出现在这些生产入口中。

#### Scenario: production index is generated

- **WHEN** 生成搜索索引和 Sitemap
- **THEN** 只加入公开文章和公开笔记
