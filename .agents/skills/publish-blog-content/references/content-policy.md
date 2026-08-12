# 内容政策

## 内容类型

| 类型 | 位置 | 适用内容 |
| --- | --- | --- |
| `post` | `content/posts` | 结构完整、适合长期公开传播的原创文章 |
| `note` | `content/notes` | 可公开的学习记录、命令备忘和知识片段 |
| `local-note` | `content/notes-local` | 内部信息、隐私、待脱敏材料和本地草稿 |
| `blocked` | 不写入 | 含凭据、来源不明或未经授权的第三方内容 |

不确定时选择更保守的类型。`draft: true` 不是隐私边界。

## 元数据

文章必填 `title`、`date`、`summary`、`category`、`tags` 和 `cover`，使用 `content/post-template.mdx`。分类必须来自 `lib/categories.ts`。

笔记必填 `title`、`summary`、`section`、`tags` 和 `updated`，使用 `content/note-template.md`。相对目录决定公开 URL。

摘要必须由正文支持。标签优先复用已有词汇，避免同义标签膨胀。

## 发布检查

1. 检查 Token、密码、私钥、内部 URL、客户或同事信息。
2. 检查原创性、引用来源、许可证及是否嵌入第三方仓库材料。
3. 检查标题层级、代码块语言、链接、图片和 MDX 尖括号冲突。
4. 检查事实、命令和 API 是否过时；不确定时标记待核实。
5. 文章必须有主题相关的 16:9 封面，并遵循 `docs/plans/article-publishing-standards.md`。

## 验证矩阵

| 改动 | 最低验证 |
| --- | --- |
| 单篇笔记 | 相关解析测试、lint、typecheck |
| 单篇文章 | 文章、MDX、封面测试、lint、typecheck、build |
| 内容模型或路由 | 相关专项测试、完整测试、lint、typecheck、build |
