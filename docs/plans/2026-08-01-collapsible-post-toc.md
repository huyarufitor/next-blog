# Collapsible Post TOC Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为共享文章目录增加原生分组折叠和视口内独立滚动能力。

**Architecture:** 将扁平目录数据在 `PostToc` 内分组成二级标题及其三级子标题。使用原生 `details`/`summary` 完成交互，保持服务端渲染且不引入客户端状态。

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Vitest, Testing Library

---

### Task 1: 用测试描述目录分组与原生交互

**Files:**
- Create: `tests/post-toc.test.tsx`
- Modify: `components/post/post-toc.tsx`

1. 编写失败测试，要求整体目录和有子标题的章节渲染为原生 `details`。
2. 编写失败测试，要求滚动容器带有视口高度限制和纵向滚动样式。
3. 运行 `npm test -- tests/post-toc.test.tsx`，确认因功能尚未实现而失败。
4. 实现最小目录分组函数和语义化标记。
5. 再次运行定向测试，确认通过。

### Task 2: 完成回归验证

**Files:**
- Review: `components/post/post-toc.tsx`
- Review: `tests/post-toc.test.tsx`

1. 运行 `npm run lint`。
2. 运行 `npm test`。
3. 运行 `npx tsc --noEmit`。
4. 运行 `npm run build`。
5. 检查 Git diff，确认未修改页面和其他共享逻辑。
