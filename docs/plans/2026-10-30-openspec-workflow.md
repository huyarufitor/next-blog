# OpenSpec 工作流 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为栈间笔记建立轻量、无生产依赖、可自动校验的 OpenSpec 规格工作流。

**Architecture:** 使用 `openspec/changes/<change-id>` 保存进行中的变更，使用 `openspec/specs` 保存生效规格。通过 `scripts/validate-openspec.ts` 提供纯 Node/TypeScript 校验，并在项目文档和 npm scripts 中暴露入口。

**Tech Stack:** TypeScript、Node.js 22、Vitest、Markdown、现有 Next.js 仓库脚本。

---

### Task 1: 定义校验器行为

**Files:**
- Create: `tests/validate-openspec.test.ts`
- Create: `scripts/validate-openspec.ts`

**Step 1: Write the failing test**

覆盖有效变更、缺少必需文件、非法 change-id、未完成任务和疑似凭据五种行为，并从脚本导入纯函数。

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/validate-openspec.test.ts`

Expected: FAIL because the validator module does not exist.

**Step 3: Write minimal implementation**

导出 `validateOpenSpec(rootDir)`，返回结构化错误；实现目录遍历、标题检查、任务检查和敏感模式检查。CLI 入口只在直接执行时运行。

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/validate-openspec.test.ts`

Expected: PASS.

### Task 2: 创建 OpenSpec 目录和真实项目规格

**Files:**
- Create: `openspec/README.md`
- Create: `openspec/specs/README.md`
- Create: `openspec/changes/README.md`
- Create: `openspec/changes/knowledge-base-and-migration/proposal.md`
- Create: `openspec/changes/knowledge-base-and-migration/spec.md`
- Create: `openspec/changes/knowledge-base-and-migration/design.md`
- Create: `openspec/changes/knowledge-base-and-migration/tasks.md`
- Create: `openspec/specs/content-publishing.md`
- Create: `openspec/specs/vuepress-migration.md`
- Create: `openspec/specs/site-indexing.md`

**Step 1:** 按设计文档写使用时机、目录约定、生命周期、安全规则，并从现有代码和测试整理真实生效规格。

**Step 2:** 运行 `npm run openspec:check`，确认模板被识别为有效。

**Step 3:** 检查示例不含真实凭据，任务清单体现“示例已完成”。

### Task 3: 接入项目命令和文档

**Files:**
- Modify: `package.json`
- Modify: `README.md`
- Modify: `AGENTS.md`

**Step 1:** 增加 `openspec:check` npm script。

**Step 2:** 在 README 增加何时使用、如何创建和如何验证的简短说明。

**Step 3:** 在 AGENTS.md 增加 OpenSpec 路由，说明小改动可跳过，涉及内容公开、迁移、路由、数据结构和安全边界时必须先写规格。

### Task 4: 执行完整验证

**Files:**
- Modify: none

**Step 1:** Run `npm test`。

**Step 2:** Run `npm run lint`。

**Step 3:** Run `npx tsc --noEmit`。

**Step 4:** Run `npm run build`。

**Step 5:** Run `npm run openspec:check`，记录所有命令的实际结果。
