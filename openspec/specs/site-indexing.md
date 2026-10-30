# 站点索引与生成规格

## Requirement: public content has stable routes

公开文章通过 `/posts/<slug>` 访问，公开笔记通过 `/notes/<nested-slug>` 访问；笔记支持多层目录，`README.md` 映射为所在目录的 `index` slug。

### Scenario: nested public note is loaded

- **WHEN** 请求 `content/notes/ai/sub2api-project-overview.md`
- **THEN** 页面地址为 `/notes/ai/sub2api-project-overview`

## Requirement: search indexes public content only

搜索 MUST 收录已发布文章和公开笔记，并保存稳定的 `url` 与内容类型；草稿、unlisted 文章和本地笔记 MUST 不进入索引。

### Scenario: search returns a public note

- **WHEN** 用户搜索公开笔记中的词语
- **THEN** 结果指向 `/notes/...`，并标记为笔记类型

## Requirement: Sitemap lists public routes only

Sitemap MUST 包含公开文章、公开笔记、分类和标签路由；草稿、unlisted 文章和本地笔记 MUST 被排除。

### Scenario: unlisted content is generated

- **WHEN** 生成 Sitemap
- **THEN** unlisted 文章没有对应 URL，本地笔记也没有对应 URL

## Requirement: local content is development-only

开发环境可以按显式选项读取本地笔记用于本地阅读；生产生成路由、搜索、RSS 和 Sitemap 时 MUST 关闭本地内容。

### Scenario: production build runs

- **WHEN** 执行生产构建
- **THEN** 输出只依赖公开内容目录，不包含本地笔记

## Source evidence

- `lib/notes.ts`、`lib/posts.ts`、`lib/search.ts`
- `app/notes/[...slug]/page.tsx`、`app/sitemap.ts`
- `tests/notes.test.ts`、`tests/search.test.ts`、`tests/routes-metadata.test.tsx`、`tests/unlisted-posts.test.ts`
