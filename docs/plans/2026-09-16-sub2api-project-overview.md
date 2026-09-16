# Sub2API Project Overview Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 Sub2API 项目说明发布为独立公开笔记，并从现有本地部署教程链接到该说明。

**Architecture:** 使用现有 `content/notes` 内容模型生成稳定的知识库路由，不新增页面组件或依赖。项目说明与部署教程通过站内链接互相连接，源码文档引用使用 GitHub 完整地址。

**Tech Stack:** Markdown、Next.js 16、next-mdx-remote、Vitest、TypeScript

---

### Task 1: 新增公开项目说明

**Files:**
- Create: `content/notes/ai/sub2api-project-overview.md`

1. 按 `content/note-template.md` 添加完整 frontmatter。
2. 整理用户提供的项目说明，保留项目定位、能力、架构、部署与安全边界。
3. 将仓库内相对链接改为指向上游仓库的完整链接。
4. 添加本地部署教程的站内链接。

### Task 2: 连接现有部署教程

**Files:**
- Modify: `content/posts/sub2api-local-chatgpt-guide.mdx`

1. 在文章导言加入项目说明链接。
2. 在参考资料中加入项目说明链接。

### Task 3: 验证与预览

**Files:**
- Verify: `content/notes/ai/sub2api-project-overview.md`
- Verify: `content/posts/sub2api-local-chatgpt-guide.mdx`

1. 运行 `npm test -- tests/notes.test.ts tests/mdx.test.tsx`。
2. 运行 `npm run lint`。
3. 运行 `npx tsc --noEmit`。
4. 运行 `npm run build`。
5. 启动本地开发服务器并检查项目说明与部署教程页面。

按项目约定，本次不自动提交或推送。
