# 栈间笔记

一个静态优先的中文技术博客，基于 Next.js 16、React 19、TypeScript、Tailwind CSS 4 和本地 MDX。项目包含标签、归档、中文搜索、RSS、Sitemap、文章封面、动态 OG 图、明暗主题、Giscus 评论和 Vercel Analytics。

当前站点名称“栈间笔记”和作者“林默”均为 AI Mock 信息，仅用于演示完整博客体验，并不代表真实人物或组织。上线前可在 `lib/site-config.ts` 中替换站点名称、描述和作者信息，并通过环境变量设置真实域名与外部服务。

## 本地开发

项目要求 Node.js 22，仓库中的 `.nvmrc` 固定了当前开发版本。

```bash
nvm use
npm install
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。常用质量检查命令：

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

## 编写文章

文章存放在 `content/posts`，文件名会成为文章 slug。每篇文章由 frontmatter 和 MDX 正文组成：

```mdx
---
title: "文章标题"
date: "2026-07-13"
summary: "用于列表和 SEO 的文章摘要。"
category: "技术实践"
tags:
  - "架构"
  - "前端"
cover: "/images/posts/blog-foundation.png"
draft: false
---

## 正文标题

这里开始写 MDX 正文。
```

推荐直接复制 [content/post-template.mdx](/Users/fitor/Documents/web-demo/content/post-template.mdx) 作为新文章起点。

`title`、`date`、`summary`、`category`、`tags` 和 `cover` 为必填字段；`draft` 可省略，默认为 `false`。`category` 目前使用固定集合：

- `技术实践`
- `工作手记`
- `音乐学习`
- `生活切片`
- `人生思考`

每篇文章都必须配置与主题相关的 16:9 封面。上例路径仅展示已注册封面的格式，新文章不得直接复用无关封面。当前封面由 `app/images/posts/[name]/route.ts` 动态生成，新增动态封面时还需在 `lib/covers.ts` 注册同名文件和视觉主题。完整要求见 [博客文章发布规范](./docs/plans/article-publishing-standards.md)。

## 知识库与本地笔记

内容按用途分为三类：

- `content/posts`：整理完整、适合公开传播的博客文章。
- `content/notes`：公开学习笔记，支持多层目录，会进入知识库、搜索和 Sitemap。
- `content/notes-local`：仅本机使用的笔记。该目录被 Git 忽略，生产构建也不会读取。

公开和本地笔记使用相同 frontmatter，可以复制
[content/note-template.md](/Users/fitor/Documents/web-demo/content/note-template.md) 后手动迁移。文件相对于内容目录的路径就是访问路径，例如
`content/notes/vue/reactivity.md` 对应 `/notes/vue/reactivity`。

本地笔记不要存放在 `content/notes` 后再依赖字段隐藏。敏感资料应直接放进
`content/notes-local`，并在提交前使用 `git status` 确认它没有被跟踪。生产环境完全不读取该目录，
但这不替代对源文件、部署配置和 Git 历史的隐私检查。

## 从 VuePress 选择性迁移

迁移工具只处理 JSON 清单中明确列出的单个 Markdown 文件，不会扫描或递归复制 VuePress
目录，因此不会误把嵌入的完整项目、依赖 README 或第三方题库当成博客内容。示例清单位于
`scripts/vuepress-migration.example.json`，每项的 `target` 可选：

- `post`：迁入 `content/posts`，默认生成草稿。
- `note`：迁入公开的 `content/notes`。
- `local-note`：迁入被忽略的 `content/notes-local`。

先运行 dry-run：

```bash
npm run migrate:vuepress -- --manifest scripts/vuepress-migration.example.json
```

确认报告中的源文件、目标文件和审核结果后，再显式写入：

```bash
npm run migrate:vuepress -- --manifest scripts/vuepress-migration.example.json --write
```

工具会拒绝越过清单中的 `sourceRoot`，也不会覆盖已有目标文件。发现 VuePress 容器、Vue
组件或相对图片时，该项会显示 `needs-review` 且不会写入；应先手动转换专属语法，将图片复制到
`public/images/notes` 等公开目录并重写 URL。迁移后仍需人工检查版权、内部信息、链接和排版。

## 环境变量

先以 `.env.example` 为模板创建本地 `.env.local`。示例文件可以提交，真实配置文件会被 Git 忽略。

```bash
cp .env.example .env.local
```

`NEXT_PUBLIC_SITE_URL` 必须是带 `http://` 或 `https://` 的完整公开地址，它用于 canonical、RSS、Sitemap 和分享图 URL。站点按以下顺序解析实际 URL：

1. `NEXT_PUBLIC_SITE_URL`
2. Vercel 自动提供的 `VERCEL_PROJECT_PRODUCTION_URL`
3. Vercel 自动提供的 `VERCEL_URL`
4. 本地回退 `http://localhost:3000`

因此首次部署即使尚未填写自定义域名也能使用 Vercel URL；绑定正式域名后，应在 Vercel 中把 `NEXT_PUBLIC_SITE_URL` 更新为最终地址并重新部署。

## Giscus 评论

Giscus 使用 GitHub Discussions 保存评论。配置步骤：

1. 准备一个公开 GitHub 仓库，并在仓库 Settings 中启用 Discussions。
2. 安装 [Giscus GitHub App](https://github.com/apps/giscus)，授权它访问该仓库。
3. 在 [giscus.app/zh-CN](https://giscus.app/zh-CN) 输入仓库并选择 Discussion 分类，推荐使用 Announcements。
4. 将页面生成的仓库名、仓库 ID、分类名和分类 ID 分别填入四个 `NEXT_PUBLIC_GISCUS_*` 变量。
5. 本地重启开发服务器，Vercel 上修改环境变量后重新部署。

四项配置必须全部存在才会动态导入并加载 Giscus。配置不完整时页面显示中文提示，不会下载 Giscus 客户端，也不会向错误仓库发起请求。评论界面使用中文，并随站点浅色、深色或系统主题同步。

## Analytics 与隐私

项目使用官方 Vercel Analytics。只有 `NODE_ENV=production` 且 `VERCEL_ENV=production` 的正式 Vercel Production 部署会注入统计组件；Vercel Preview、本地开发和测试环境都不会渲染它。

部署代码并不会自动开通统计。首次部署后，必须进入 Vercel Dashboard，打开对应项目的 **Analytics** 页面并点击 **Enable Web Analytics**。启用后，正式 Production 部署产生的访问数据才会出现在 Dashboard 中。

本站没有添加自定义用户 ID、广告追踪或额外个人信息采集。Vercel Analytics 的实际数据处理和保留策略以 [Vercel Analytics 文档](https://vercel.com/docs/analytics) 及部署账户设置为准。

## 部署到 Vercel

可以把仓库导入 Vercel 控制台，也可以使用 CLI：

```bash
npx vercel
npx vercel --prod
```

首次部署后还需要完成以下项目配置：

1. 在 Vercel Dashboard 打开对应项目的 **Analytics** 页面，点击 **Enable Web Analytics**。
2. 在项目 Settings 的 Environment Variables 中添加 `NEXT_PUBLIC_SITE_URL` 和四个 Giscus 环境变量。
3. 取得实际生产 URL 后，把 `NEXT_PUBLIC_SITE_URL` 设置为该地址或绑定后的正式域名。
4. 再执行一次 Production 部署，确保 metadata、RSS、Sitemap、OG 图和 Analytics 都使用正式生产配置。

部署前建议运行：

```bash
nvm use
npm install
npm test
npm run lint
npx tsc --noEmit
npm run build
```
