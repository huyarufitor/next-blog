# 生效规格

这里记录当前代码和测试已经实现的项目约束。它们来自 `lib/`、`app/`、`scripts/`、`tests/`、README 以及已经完成的实施计划，不是待实现的愿望清单。

- [内容发布与可见性](./content-publishing.md)：文章、公开笔记、本地笔记、草稿、unlisted 和封面规则。
- [VuePress 内容迁移](./vuepress-migration.md)：显式清单、dry-run、安全边界和人工复核。
- [站点索引与生成](./site-indexing.md)：路由、搜索、RSS、Sitemap 对公开内容的收录边界。

如果实现新的跨模块行为，应先在 `openspec/changes/<change-id>/` 写变更规格，完成后再把仍然有效的规则补到这里。
