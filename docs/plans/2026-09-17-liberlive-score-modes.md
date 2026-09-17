# LiberLive Score Modes Article Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 新增一篇解释 LiberLive 和弦谱、多维曲谱与风格包选择方法的音乐学习文章草稿。

**Architecture:** 文章沿用现有 MDX 内容模型并保持 `draft: true`。封面复用动态 `ImageResponse` 路由，新增独立曲谱模式主题，不增加生产依赖或页面组件。

**Tech Stack:** MDX、TypeScript、React、Next.js 16、ImageResponse、Vitest

---

### Task 1: 为曲谱模式封面建立失败测试

**Files:**
- Modify: `tests/covers.test.ts`

1. 新增 `liberlive-score-modes.png` 映射断言，主题名为 `score-modes`。
2. 运行 `npm test -- tests/covers.test.ts`，确认测试因封面尚未注册而失败。

### Task 2: 注册并实现曲谱模式封面

**Files:**
- Modify: `lib/covers.ts`
- Modify: `app/images/posts/[name]/route.ts`

1. 在 `CoverTheme` 和封面注册表中加入 `score-modes`。
2. 实现 1200×675 的曲谱模式封面，画面区分和弦谱、多维曲谱与风格选择。
3. 运行 `npm test -- tests/covers.test.ts`，确认映射和 PNG 响应测试通过。

### Task 3: 写入文章草稿

**Files:**
- Create: `content/posts/chord-score-or-multidimensional-score.mdx`

1. 写入完整 frontmatter，分类使用“音乐学习”，并保持 `draft: true`。
2. 根据设计文档写正文，从演奏用途和数据结构两个层面说明两类曲谱，并解释风格包的横向关系。
3. 不添加未经用户确认的功能细节、效果承诺或第三方受版权保护内容。

### Task 4: 验证内容与构建

**Files:**
- Verify: `content/posts/chord-score-or-multidimensional-score.mdx`
- Verify: `lib/covers.ts`
- Verify: `app/images/posts/[name]/route.ts`

1. 运行 `npm test -- tests/posts.test.ts tests/mdx.test.tsx tests/covers.test.ts`。
2. 运行 `npm run lint`。
3. 运行 `npx tsc --noEmit`。
4. 运行 `npm run build`。
5. 运行 `git diff --check` 并复核文章事实边界。

按项目约定，本次不自动提交、推送或发布。
