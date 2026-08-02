# Required Post Covers Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为所有博客文章补齐封面，并在代码和文档层面强制 `cover` 必填。

**Architecture:** 封面复用现有 `next/og` `ImageResponse` 动态 PNG 路由，文章通过 frontmatter 引用。内容解析 schema 和 TypeScript 类型提供代码级约束，测试扫描全部文章防止回归。

**Tech Stack:** MDX, Zod, TypeScript, Vitest, Next.js ImageResponse

---

### Task 1: 生成并接入缺失封面

**Files:**
- Modify: `lib/covers.ts`
- Modify: `app/images/posts/[name]/route.ts`
- Modify: `tests/covers.test.ts`
- Modify: `content/posts/2026-ai-full-stack-frontend-interview-questions.mdx`
- Modify: `content/posts/javascript-throttle.mdx`

1. 添加失败测试，要求两张新封面已注册且动态路由返回有效 PNG。
2. 在封面注册表和动态路由中新增两个 16:9、无文字、主题明确的视觉主题。
3. 在两篇文章 frontmatter 中配置站内封面路径。
4. 渲染并检查图片主体、构图、尺寸和文件格式。

### Task 2: 用测试驱动 cover 必填约束

**Files:**
- Modify: `tests/posts.test.ts`
- Modify: `lib/posts.ts`
- Modify: `types/post.ts`

1. 添加缺少 `cover` 时解析失败的测试，并运行确认失败。
2. 添加全部文章均配置封面的测试。
3. 将 schema 和文章类型中的 `cover` 改为必填非空字符串。
4. 运行定向测试确认通过，并修复受影响的测试 fixture。

### Task 3: 更新全局规范与当前文章计划

**Files:**
- Create: `docs/plans/article-publishing-standards.md`
- Modify: `README.md`
- Modify: `content/post-template.mdx`
- Modify: `docs/plans/2026-08-01-ai-full-stack-interview-questions-design.md`
- Modify: `docs/plans/2026-08-01-ai-full-stack-interview-questions.md`

1. 明确每篇文章必须有 16:9 主题封面，且 `cover` 不可省略。
2. 记录静态封面和动态封面的可用方式及验收清单。
3. 将当前文章的封面生成、接入和验证补入原设计与实施计划。

### Task 4: 完整验证

1. 验证两张动态 PNG 图片尺寸、格式和可读性。
2. 运行 `npm run lint`。
3. 运行 `npm test`。
4. 运行 `npx tsc --noEmit`。
5. 运行 `npm run build`。
6. 检查 Git diff，确认所有文章均有封面且未包含无关修改。
