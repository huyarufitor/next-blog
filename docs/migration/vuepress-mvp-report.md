# VuePress 迁移 MVP 审核报告

审核日期：2026-08-12

源仓库在本次流程中保持只读。检查范围只包含以下五个明确样本，未递归迁移目录，也未读取或复制嵌入的完整仓库、项目模板与第三方题库。

| 源文件 | 状态 | 目标或处理 | 原因 |
| --- | --- | --- | --- |
| `javascript/es6/throttle.md` | `ready` | `content/notes/javascript/throttle.md` | 个人基础学习笔记，无迁移器检查问题；以公开笔记验证写入和幂等性 |
| `server/tree命令.md` | `exists` | `content/notes/server/tree-command.md` | 目标已存在，迁移器必须跳过且不得覆盖 |
| `vue/04 vue2的选项式API和vue3组合式API对比.md` | `needs-edit` | 暂不写入 | 存在术语拼写和表达问题，内容过于简略，公开前需事实核查与重写 |
| `work_pro_summary/2025.md` | `local-only` | 暂不写入 | 涉及内部管理平台和业务功能描述，默认不进入 Git 或生产构建 |
| `26study/AI/2、MCP/Figma-Context-MCP.md` | `blocked` | 不迁移 | 检测到疑似服务凭据；报告不记录其值，应在对应服务撤销并轮换 |

## 自动化验证

- 正常样本的版本化 manifest：`docs/migration/vuepress-mvp-manifest.json`。
- `server/tree命令.md` 使用临时 manifest dry-run，预期返回 `exists`。
- Figma MCP 样本使用临时 manifest dry-run，预期返回 `needs-review` 和 `suspected-secret`，且输出不包含凭据值。
- 只有 `throttle.md` 获准执行 `--write`；写入后再次 dry-run 应返回 `exists`。

## 剩余人工工作

- Vue 2/3 API 对比笔记需要编辑后重新审核，不能按当前正文公开。
- 工作总结只有在移除内部信息并明确公开价值后才能重新分类。
- 疑似凭据即使从当前源文件移除，也需要检查源仓库 Git 历史和远程副本。
