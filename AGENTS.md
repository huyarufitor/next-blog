# 栈间笔记项目指引

## 沟通与改动

- 默认使用中文沟通，先分析问题，再修改代码。
- 保持改动聚焦，不无理由新增生产依赖。
- 不自动提交、推送或修改外部仓库；只有用户明确要求时才执行。
- 涉及删除、覆盖、公开发布或其他难以恢复的操作时，先说明范围和风险。

## 项目结构

- `content/posts`：整理完整、适合公开传播的文章。
- `content/notes`：公开学习笔记，会进入搜索、Sitemap 和生产构建。
- `content/notes-local`：本机私密或待脱敏内容，被 Git 忽略且生产不读取。
- `scripts/migrate-vuepress-content.ts`：显式清单驱动的 VuePress 迁移器。
- `docs/plans`：已确认的设计和实施计划。

## Skill 路由

- 新建、编辑、审核或发布文章与笔记时，使用 `.agents/skills/publish-blog-content`。
- 盘点、分类或迁移旧 VuePress 内容时，使用 `.agents/skills/migrate-vuepress-content`。
- 修改 Skill 时，遵循系统 Skill 创建流程并运行 Skill 校验器。

## 内容安全

- 内容默认不公开。进入公开目录前必须检查隐私、内部信息、凭据、版权和来源。
- 疑似 Token、密码、私钥或连接凭据必须阻断，不得复制到报告、目标文件或提交中。
- 工作总结、客户信息、内部系统细节和未完成脱敏的材料默认进入 `content/notes-local`。
- 不依赖 frontmatter 隐藏敏感内容；敏感源文件不得放入公开内容目录。

## VuePress 迁移边界

- 源仓库只读，禁止在迁移过程中修改或清理源文件。
- 只处理 manifest 明确列出的单个 Markdown 文件；默认 dry-run，只有明确确认的 `ready` 条目才能使用 `--write`。
- 允许盘点 `javascript`、`vue`、`server`、`work_pro_summary`、`24study`、`25study` 和 `26study` 等个人维护目录。
- 默认排除路径中含 `InterviewQuestions-master`、`vue-main` 或 `管理后台项目模板vue2和vue3` 的内容。
- 不覆盖目标文件，不批量复制依赖、项目源码或未审核资源。

## 工程与验证

- 使用 TypeScript 和仓库现有 Next.js 模式，不无理由新增生产依赖。
- 当前项目使用 npm 和 Node.js 22。
- 功能或缺陷修改先补相关测试；不得在日志、快照或错误消息中回显完整敏感值。
- 按影响范围运行 `npm test`、`npm run lint`、`npx tsc --noEmit` 和 `npm run build`。
- 内容迁移还需运行 manifest dry-run；Skill 修改还需运行 `quick_validate.py`。
- 只有实际执行成功后才能声称验证通过。
