# 内容发布与可见性规格

## Requirement: public posts use validated frontmatter

`content/posts` 中的 MDX 文件 MUST 通过 frontmatter 校验，包含非空 `title`、`date`、`summary`、固定分类、`tags` 和站内 PNG `cover`。`draft` 与 `unlisted` 默认为 `false`。

### Scenario: invalid post metadata

- **WHEN** 文章缺少必填字段、使用未知分类或填写了非法封面路径
- **THEN** 内容解析失败，文章不能被当作有效文章渲染

## Requirement: every public post has a registered cover

文章的 `cover` MUST 使用 `/images/posts/<name>.png` 格式，且 `<name>` 必须在 `lib/covers.ts` 注册。动态封面 MUST 返回 1200×675 的 PNG。

### Scenario: cover is ready for publication

- **WHEN** 文章进入发布验收
- **THEN** 封面注册、封面路由响应、16:9 布局和文章页面展示都通过检查

## Requirement: drafts stay out of public surfaces

`draft: true` 的文章 MUST 从默认文章列表、详情页、搜索、RSS 和 Sitemap 中排除。

### Scenario: draft is requested directly

- **WHEN** 请求草稿文章的 slug
- **THEN** 文章详情返回未找到结果

## Requirement: unlisted posts remain direct-link accessible

`unlisted: true` 的文章 MAY 通过直链访问，但 MUST 从首页、归档、分类、标签、搜索、RSS 和 Sitemap 中排除，并输出 `noindex`。unlisted 不得用于隐藏敏感内容。

### Scenario: unlisted post is indexed

- **WHEN** 生成站点公开入口
- **THEN** 该文章不出现在列表、搜索、RSS 或 Sitemap 中

## Requirement: local notes stay outside production

`content/notes-local` 用于私密或待脱敏笔记，目录 MUST 被 Git 忽略；生产环境读取公开笔记时 MUST 使用 `includeLocal: false`，本地资料不得进入生产构建、搜索或 Sitemap。

### Scenario: production loads notes

- **WHEN** 生产环境读取知识库
- **THEN** 只读取 `content/notes`，不会暴露 `content/notes-local`

## Source evidence

- `lib/posts.ts`、`lib/notes.ts`
- `tests/posts.test.ts`、`tests/notes.test.ts`、`tests/unlisted-posts.test.ts`
- `docs/plans/article-publishing-standards.md`
