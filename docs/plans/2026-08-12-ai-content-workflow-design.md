# AI 内容工作流设计

## 目标

为“栈间笔记”建立最小可用的项目级 AI 工作流：用仓库级 `AGENTS.md` 统一约束，用两个可复用 Skill 分别管理内容发布与 VuePress 迁移，并用真实旧仓库内容验证流程。

## 方案

采用“仓库规范 + Skill 编排 + TypeScript 确定性脚本”。不新增 MCP Server；当前数据源和目标都是本地 Git 仓库，MCP 会增加协议、权限和维护成本，但不会改善当前迁移质量。

`AGENTS.md` 是统一入口，Skill 保存任务流程和领域判断，`scripts/migrate-vuepress-content.ts` 负责路径限制、内容检查、报告和显式写入。AI 不直接递归复制旧仓库，也不修改源 VuePress 仓库。

## 内容边界

允许盘点个人维护的顶层目录，例如 `javascript`、`vue`、`server`、`work_pro_summary`、`24study`、`25study` 和 `26study`。默认排除嵌入的完整仓库、项目模板和第三方题库，包括 `InterviewQuestions-master`、`vue-main` 和管理后台模板。

所有迁移默认 dry-run。内容只有经过人工维护的显式 manifest 才能写入。疑似密钥直接阻断；工作内部信息默认只允许进入未跟踪的 `content/notes-local`；版权或来源不清晰的内容不迁移。

## 组件

### 仓库级 AGENTS.md

记录项目架构、内容分层、安全边界、Skill 路由和质量门禁。它只包含稳定规则，详细内容政策放入 Skill references，避免重复。

### publish-blog-content

处理新文章、公开笔记、本地笔记及已有内容发布前检查。它负责选择内容类型、读取对应模板和政策、检查 frontmatter、封面、敏感信息、版权风险，并运行与变更范围匹配的验证命令。

### migrate-vuepress-content

处理旧 VuePress 内容的盘点、分类、清单生成、dry-run、人工确认和写入。状态使用 `ready`、`needs-edit`、`local-only`、`blocked` 和 `exists`；脚本的底层检查结果会映射到这些工作流状态。

### 迁移器

在现有显式 manifest 与路径包含检查基础上增加疑似密钥检测。检测结果不包含完整密钥值，避免报告和终端再次泄露。写入仍只允许无问题的条目，且不覆盖现有文件。

## MVP 验证

使用五个真实样本覆盖关键分支：

| 源文件 | 预期 |
| --- | --- |
| `javascript/es6/throttle.md` | `ready`，可写入公开笔记 |
| `server/tree命令.md` | `exists`，不得覆盖 |
| `vue/04 vue2的选项式API和vue3组合式API对比.md` | `needs-edit`，先修订内容 |
| `work_pro_summary/2025.md` | `local-only`，不得提交 |
| `26study/AI/2、MCP/Figma-Context-MCP.md` | `blocked`，疑似密钥 |

MVP 只实际写入节流笔记。其余样本用于验证决策、阻断和幂等行为。

## 验证

Skill 使用官方初始化器生成并用 `quick_validate.py` 校验。代码变更运行迁移器专项测试、完整测试、ESLint、TypeScript 类型检查和生产构建。最后运行真实 manifest dry-run，并确认只允许明确批准的条目写入。
