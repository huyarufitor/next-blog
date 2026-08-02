# 博客文章发布规范

## 必填 Frontmatter

`content/posts` 下的每篇文章必须配置以下字段：

- `title`：非空文章标题。
- `date`：`YYYY-MM-DD` 格式的发布日期。
- `summary`：用于列表、搜索与 SEO 的摘要。
- `category`：仓库支持的固定分类之一。
- `tags`：文章标签数组。
- `cover`：非空站内绝对路径，格式为 `/images/posts/<name>.png`。
- `draft`：是否为草稿；可省略，默认 `false`。

## 封面要求

- 每篇文章必须有与主题直接相关的独立封面，不使用无关占位图。
- 封面比例统一为 16:9；动态封面输出尺寸为 1200×675。
- 默认复用 `app/images/posts/[name]/route.ts` 的 `ImageResponse` 动态封面方案，并在 `lib/covers.ts` 注册名称、标题和视觉主题。
- `cover` 中的文件名必须存在于 `lib/covers.ts` 注册表，不能只填写一个格式正确但无法访问的路径。
- 封面不得依赖文章标题文字才能表达主题，缩略图尺寸下仍应有清晰主体。

## 发布验收

1. 确认 frontmatter 包含有效 `cover`，且文件名已在 `lib/covers.ts` 注册。
2. 请求封面路径，确认返回 `200`、`image/png` 且内容完整。
3. 检查首页卡片和文章页的 16:9 布局，无拉伸、裁切异常或文字遮挡。
4. 运行 lint、测试、类型检查和生产构建。
5. 草稿审核完成后才能将 `draft` 改为 `false`。
