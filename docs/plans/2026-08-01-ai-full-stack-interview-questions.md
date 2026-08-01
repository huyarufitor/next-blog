# 2026 AI 全栈前端面试题 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 创建一篇层次清晰、只整理现有题目的前端面试题博客草稿。

**Architecture:** 新增单篇 MDX 内容，不修改应用逻辑。使用既有 frontmatter 规范，并以领域、专题、题目三级结构组织原始题库。

**Tech Stack:** MDX, gray-matter, Next.js content pipeline

---

### Task 1: 创建文章草稿

**Files:**
- Create: `content/posts/2026-ai-full-stack-frontend-interview-questions.mdx`

1. 添加标题、日期、摘要、分类、标签和 `draft: true`。
2. 按设计文档建立领域与专题目录。
3. 将附件题目完整整理到对应专题，不新增答案。

### Task 2: 检查内容结构

**Files:**
- Review: `content/posts/2026-ai-full-stack-frontend-interview-questions.mdx`

1. 检查 frontmatter 是否可解析。
2. 检查一级领域、二级专题和题目列表是否完整。
3. 对照原附件检查题目数量，确认无意外遗漏。

### Task 3: 运行项目验证

1. 运行 `npm run lint`。
2. 运行 `npm test`。
3. 运行 `npx tsc --noEmit`。
4. 运行 `npm run build`，确认草稿可解析且不会生成公开文章路由。
