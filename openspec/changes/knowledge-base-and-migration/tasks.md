# Tasks

- [x] 建立公开笔记和本地笔记的目录边界
- [x] 为笔记实现递归读取、frontmatter 校验和嵌套路由
- [x] 将公开笔记接入搜索和 Sitemap
- [x] 实现显式 manifest 驱动的 VuePress 迁移器
- [x] 默认 dry-run，限制源/目标路径并拒绝覆盖已有文件
- [x] 对 VuePress 语法、相对资源和疑似凭据提供人工复核状态
- [x] 补充迁移、笔记、搜索、路由和本地内容隔离测试
- [x] 运行 `npm test`、`npm run lint`、`npx tsc --noEmit` 和 `npm run build`

## Verification evidence

- `tests/notes.test.ts`：公开/本地分离、递归 slug 和生产排除；
- `tests/migrate-vuepress-content.test.ts`：路径边界、dry-run、写入和语法检查；
- `tests/search.test.ts`、`tests/unlisted-posts.test.ts`：搜索与公开入口边界；
- `npm test`、`npm run lint`、`npx tsc --noEmit`、`npm run build` 均已在 Node.js 22 下执行。
