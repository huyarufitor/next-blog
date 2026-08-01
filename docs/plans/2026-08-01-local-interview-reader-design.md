# 本地面试资料阅读器设计

## 目标

在开发环境提供 `/interviews` 阅读入口，以博客文章样式浏览 `content/notes-local/interviews/` 中的本地 Markdown，同时确保生产环境不可访问、候选人内容不进入构建产物。

## 方案

- 新增专用服务端加载器，递归读取本地面试资料并从 Markdown 一级标题提取标题。
- `/interviews` 显示入口文档；`/interviews/[...slug]` 显示其他文档。
- 共享布局提供左侧资料导航，正文复用现有 MDX 渲染器和 `post-content` 样式。
- 设置动态渲染，生产环境在读取文件前调用 `notFound()`，不生成任何候选人静态页面。
- 页面添加 `noindex, nofollow` 元数据，不加入主导航、搜索、站点地图或 RSS。

## 验证

- 单元测试覆盖递归发现、README slug、标题提取、路径安全和生产禁用。
- 路由测试覆盖导航与 Markdown 渲染。
- 运行全量测试、lint、TypeScript 和生产构建。
- 开发环境实际打开桌面与移动端页面检查布局。
