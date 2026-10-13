# 吉他和弦指法文章 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 新增一篇结构清晰、可公开审核的吉他和弦指法入门文章，并配置有效的站内封面。

**Architecture:** 内容使用现有 `content/posts/*.mdx` 的 frontmatter 与 MDX 渲染链路。封面只新增一个注册定义，复用现有动态封面渲染器的音乐主题，避免引入新的生产依赖或图片资源。

**Tech Stack:** Next.js、MDX、TypeScript、Vitest、ESLint。

---

### Task 1: 新增文章正文

**Files:**
- Create: `content/posts/guitar-chord-fingering-basics.mdx`

**Step 1:** 写入完整 frontmatter，分类为“音乐学习”，标签为“吉他”“乐理”“和弦”“弹唱”，并设置 `draft: true`。

**Step 2:** 编写原创正文，包含指法图读法、开放和弦表、横按迁移、练习步骤和常见问题；统一使用“六弦到一弦”的指法顺序。

**Step 3:** 检查标题层级、表格、代码块和中文标点，确保没有依赖附件临时路径的图片链接。

### Task 2: 注册文章封面

**Files:**
- Modify: `lib/covers.ts`

**Step 1:** 添加 `guitar-chord-fingering.png` 封面定义，标题与文章标题一致，主题使用现有 `score-modes`。

**Step 2:** 将文章 frontmatter 的 `cover` 指向 `/images/posts/guitar-chord-fingering.png`。

### Task 3: 验证内容链路

**Files:**
- Test: `tests/posts.test.ts`
- Test: `tests/mdx.test.tsx`
- Test: `tests/covers.test.ts`

**Step 1:** 运行文章、MDX 和封面相关测试，确认新 frontmatter 可解析且封面路由有效。

**Step 2:** 运行 `npm run lint`、`npx tsc --noEmit` 和 `npm run build`，记录实际结果。

**Step 3:** 复核 git diff，确认只包含文章与封面注册改动以及本计划文档。
