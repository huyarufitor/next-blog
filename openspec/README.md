# OpenSpec 工作流

OpenSpec 是本项目用于复杂变更的规格驱动开发流程：先写清楚为什么改、改成什么、怎么实现、如何验收，再开始编码。规格是团队和 AI 的共同上下文，最终结果应能回看需求边界、取舍和验证证据。

## 什么时候使用

下面的变更应先创建 `changes/<change-id>/`：

- 新增页面、路由、交互或内容模型；
- 修改搜索、迁移、构建、发布和隐私规则；
- 跨多个模块或文件，存在兼容、回滚或数据风险；
- 会公开新内容、接入外部服务或改变安全边界。

单篇文章润色、错别字修正、非常明确的一行样式修复可以直接修改。若不确定，优先创建一个小规格，后续可以在评审时缩小范围。

## 目录约定

```text
openspec/
├── specs/                         # 当前已经生效的领域规格
└── changes/
    └── <change-id>/
        ├── proposal.md            # 背景、目标、范围、风险
        ├── spec.md                # 可验证的行为要求
        ├── design.md              # 技术方案、数据流和取舍
        └── tasks.md               # 实施、测试、文档和验收任务
```

`change-id` 使用小写字母、数字和连字符，例如 `add-note-filter`。当前仓库的真实变更记录见
[`changes/knowledge-base-and-migration`](./changes/knowledge-base-and-migration)；新需求可以参考它的四份文件结构。

## 生命周期

1. 创建变更目录，填写 proposal、spec、design 和 tasks。
2. 评审范围、行为、风险和验收标准。
3. 按 tasks 实现，每个任务补充实际验证结果。
4. 将最终生效的规则整理到 `specs/`，保留变更记录供回溯。
5. 运行 `npm run openspec:check`，再按影响范围运行测试、lint、类型检查和构建。

现有 `docs/plans` 继续用于长期设计和实施计划；OpenSpec 负责一次具体变更的提议和验收，两者可以互相链接。

## 安全规则

规格默认会进入 Git。不要写入真实 Token、密码、私钥、客户资料或未脱敏的内部信息。敏感材料放在 `content/notes-local` 或本机安全存储中，只在规格里描述处理方式和验证结果。

校验器只读取 Markdown，不修改文件，也不连接网络：

```bash
npm run openspec:check
```
