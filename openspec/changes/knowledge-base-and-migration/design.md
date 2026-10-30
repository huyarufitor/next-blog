# Design

## Architecture

内容按用途分为三个目录：`content/posts` 保存博客文章，`content/notes` 保存公开学习笔记，`content/notes-local` 保存 Git 忽略的本地资料。`lib/notes.ts` 递归读取 Markdown 并解析统一 frontmatter；文章和笔记分别通过现有 App Router 页面提供稳定 URL。

迁移器使用 Node.js 内置文件 API 和现有 Markdown 工具链，入口为 `scripts/migrate-vuepress-content.ts`。它先限制源路径和目标路径，再检查 Markdown 内容，最后根据 `--write` 决定是否写文件；目标已存在时使用 `exists` 状态，不覆盖。

## Data flow

```text
VuePress file + explicit manifest
        ↓
path containment → Markdown inspection → dry-run report
        ↓ --write and no issues
normalized frontmatter → content/posts | content/notes | content/notes-local
```

公开内容通过 `lib/posts.ts`、`lib/notes.ts` 和 `lib/search.ts` 进入页面、搜索、RSS 与 Sitemap；生产读取路径明确关闭本地笔记。

## Decisions

- 复用现有 Markdown、gray-matter、Zod 和 Vitest，不新增生产依赖。
- 迁移默认只读，只有用户显式传入 `--write` 才写文件。
- 敏感值只返回固定错误信息，不出现在报告中。
- 自动化检查负责结构和安全边界，语义、版权和隐私仍由人工审核。

## Related documentation

- `README.md` 的知识库和 VuePress 迁移章节；
- `openspec/specs/content-publishing.md`；
- `openspec/specs/vuepress-migration.md`；
- `openspec/specs/site-indexing.md`。
