# Blog Localization and Enhancements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将现有博客完整中文化，并加入可投入生产使用的封面、OG 图、主题切换、Giscus 降级、Vercel Analytics 与 Vercel 部署。

**Architecture:** 保持现有静态优先的 App Router 与 MDX 数据层。站点身份和外部服务配置集中在 `lib/site-config.ts`，展示层通过语义 CSS 变量适配主题，分享图使用 Next.js 原生 `ImageResponse`，部署时通过公开环境变量注入生产 URL 和 Giscus 配置。

**Tech Stack:** Node.js 22、Next.js 16、React 19、TypeScript、Tailwind CSS 4、MDX、next-themes、Lucide React、Vercel Analytics、Vitest、Vercel CLI

---

### Task 1: 配置与测试基线

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `tests/site-config.test.ts`
- Modify: `lib/site-config.ts`
- Create: `.env.example`

**Steps:**
1. 安装最新版 `next-themes`、`lucide-react`、`@vercel/analytics` 和开发依赖 `vitest`。
2. 添加 `npm test` 脚本与 Vitest 路径别名配置。
3. 先编写站点 URL 回退与 Giscus 完整配置判定测试，运行并确认失败。
4. 在 `lib/site-config.ts` 实现 `getSiteUrl()` 和 `getGiscusConfig()`，站点使用 AI Mock 身份「栈间笔记 / 林默」。
5. 写入 `.env.example`，只包含公开配置名和说明性空值。
6. 运行 `npm test`，预期全部通过。

### Task 2: 全站与 MDX 中文化

**Files:**
- Modify: `content/posts/getting-started-with-this-blog.mdx`
- Modify: `content/posts/static-first-blogging.mdx`
- Modify: `lib/posts.ts`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/archives/page.tsx`
- Modify: `app/search/page.tsx`
- Modify: `app/tags/page.tsx`
- Modify: `app/tags/[tag]/page.tsx`
- Modify: `app/posts/[slug]/page.tsx`
- Modify: `app/not-found.tsx`
- Modify: `components/layout/site-header.tsx`
- Modify: `components/layout/site-footer.tsx`
- Modify: `components/post/post-toc.tsx`
- Modify: `components/search/search-panel.tsx`

**Steps:**
1. 将两篇 MDX 的 frontmatter、正文标题与段落改为自然中文，保留代码示例和 slug。
2. 将日期格式改为 `yyyy年M月d日`，将 `reading-time` 结果换算并输出 `约 N 分钟阅读`。
3. 将 HTML `lang` 改为 `zh-CN`，所有可见页面文案、metadata、导航、空状态与无障碍标签改为中文。
4. 使用 `rg` 检查残留英文展示文案，只保留技术名词、代码与环境变量。
5. 运行 `npm test` 与 `npm run lint`。

### Task 3: 文章封面

**Files:**
- Create: `public/images/posts/blog-foundation.webp`
- Create: `public/images/posts/static-first.webp`
- Modify: `content/posts/getting-started-with-this-blog.mdx`
- Modify: `content/posts/static-first-blogging.mdx`
- Modify: `components/post/post-card.tsx`
- Modify: `app/posts/[slug]/page.tsx`
- Modify: `app/page.tsx`

**Steps:**
1. 使用 `imagegen` 生成两张 16:9、无文字、主题明确的原创技术封面并保存为 WebP。
2. 在两篇 MDX 的 `cover` 字段写入对应绝对站内路径。
3. 在文章卡片和正文标题区使用 `next/image`，通过 `aspect-ratio` 与 `sizes` 固定响应式布局。
4. 为无封面的文章保留无跳动的纯色回退区域。
5. 运行 `npm run lint` 与 `npm run build`。

### Task 4: 动态 OG 图

**Files:**
- Create: `components/og/og-image.tsx`
- Create: `app/opengraph-image.tsx`
- Create: `app/posts/[slug]/opengraph-image.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/posts/[slug]/page.tsx`

**Steps:**
1. 创建可复用的 1200x630 OG 布局，使用内联样式和系统可用字体，避免远程字体导致构建失败。
2. 添加站点级 OG 路由，展示品牌、描述和作者身份。
3. 添加文章级 OG 路由，从 slug 加载标题、摘要和标签，不存在时返回 `notFound()`。
4. 在 metadata 中显式声明对应 OG 图片路径和尺寸。
5. 构建后请求两个 OG 路由，确认状态码与 `content-type: image/png`。

### Task 5: 暗色模式

**Files:**
- Create: `components/theme/theme-provider.tsx`
- Create: `components/theme/theme-toggle.tsx`
- Modify: `components/layout/site-header.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Steps:**
1. 用 `next-themes` 包装根布局，配置 `attribute="class"`、`defaultTheme="system"` 与系统主题支持。
2. 创建带太阳、月亮和显示器图标的三态切换控件，挂载前展示固定尺寸占位，避免 hydration mismatch。
3. 在导航中加入主题控件和中文 tooltip/aria-label。
4. 将硬编码 stone 色重映射为浅色/深色语义变量，并补齐正文、代码块、面板和边框状态。
5. 用桌面和移动端视口分别验证浅色与深色页面无重叠、无闪烁。

### Task 6: Giscus 与 Vercel Analytics

**Files:**
- Modify: `components/comments/giscus-comments.tsx`
- Modify: `app/layout.tsx`
- Modify: `README.md`

**Steps:**
1. 复用 `getGiscusConfig()` 判定配置是否完整，缺失时显示中文说明。
2. 将 Giscus 语言设为 `zh-CN`，监听当前主题并在主题变化时同步组件主题。
3. 在根布局接入 `@vercel/analytics/react` 的 `Analytics`。
4. 更新 README，写清 Node 22、本地启动、MDX frontmatter、公开环境变量和 Vercel 部署方式。
5. 运行 `npm test`、`npm run lint` 与 `npm run build`。

### Task 7: 视觉验收与生产部署

**Files:**
- Modify if deployment succeeds: `.vercel/project.json`（由 Vercel CLI 管理且通常被忽略）

**Steps:**
1. 使用 Node 22 启动开发服务器，检查首页、文章、搜索、归档、标签、关于和 404 页面。
2. 使用浏览器截图验证桌面 1440x900 与移动端 390x844 的浅色/深色布局。
3. 运行最终 `npm test`、`npm run lint` 和 `npm run build`，预期全部成功。
4. 运行 `npx vercel --prod` 创建或关联项目；如需登录，停在官方授权步骤等待账号授权。
5. 获得生产 URL 后，在 Vercel 设置 `NEXT_PUBLIC_SITE_URL` 并再次生产部署。
6. 请求生产首页、文章页、OG 图、RSS 与 sitemap，全部可访问后才报告部署完成。
