# VuePress 迁移政策

## 默认范围

允许盘点 `javascript`、`vue`、`server`、`work_pro_summary`、`24study`、`25study` 和 `26study`。允许盘点不等于允许批量迁移，每个文件仍需显式选择。

默认排除路径含 `InterviewQuestions-master`、`vue-main`、`管理后台项目模板vue2和vue3` 的内容，以及依赖、构建产物、完整项目源码和来源不明的批量材料。

## 检查顺序

1. 确认路径位于 `sourceRoot` 内且为单个 Markdown 文件。
2. 检查是否属于排除目录或明显第三方内容。
3. 检查疑似凭据、内部 URL 和个人信息。
4. 检查 VuePress 容器、Vue 组件、相对图片和 MDX 冲突。
5. 检查标题、完整性、准确性、重复目标和读者价值。
6. 决定目标类型和工作流状态。

## Manifest 规则

- `sourceRoot` 使用明确的 VuePress `docs` 绝对路径。
- `entries` 只列出人工选择的文件，`destination` 使用稳定的英文 kebab-case 路径。
- `post` 默认 `draft: true`，公开前必须经过发布 Skill。
- 一个 manifest 中不要混入尚未决定如何处理的条目。

## CLI 状态

CLI 返回 `ready`、`needs-review`、`written` 或 `exists`。工作流在其上增加 `needs-edit`、`local-only` 和 `blocked`，这些决策记录在审核报告中，不能为让 CLI 通过而弱化检查。

## 凭据响应

发现疑似凭据时，不回显完整值，将条目标记为 `blocked`，并提醒用户撤销和轮换。移除当前文件中的值不代表 Git 历史或远程副本已经清理。
