---
title: "Sub2API 项目说明"
summary: "介绍 Sub2API 的项目定位、请求链路、协议与上游能力、账号调度、计费运营、技术架构及安全边界。"
section: "AI 工具"
tags:
  - "AI"
  - "Sub2API"
  - "API 网关"
  - "自托管"
updated: "2026-09-16"
---

Sub2API 是一套可私有化部署的 AI API 网关与配额运营平台。本文从项目能力和技术架构出发，说明它适合解决什么问题，以及部署和运营时需要注意哪些边界。

如果你准备在 Mac 上实际搭建，可以继续阅读[在 Mac 本地搭建 Sub2API：从 ChatGPT 授权到 API 转发](/posts/sub2api-local-chatgpt-guide)。

本文根据 2026 年 9 月时的项目结构整理。上游项目仍在持续更新，具体协议、平台支持、依赖版本和部署命令应以所使用版本的源码与文档为准。

## 1. 项目定位

Sub2API 将多个上游 AI 账号或 API Key 组成可调度的资源池，再通过平台统一签发的 API Key 向用户提供 OpenAI、Anthropic 和 Gemini 等兼容接口。

它的职责不只是请求转发，还包括：

- 用户、API Key、分组和模型权限管理；
- 上游账号池、代理、模型映射和负载调度；
- 用量记录、Token 计费、余额、订阅和支付；
- 并发限制、速率限制、粘性会话和故障切换；
- 渠道健康检查、运维监控、审计、风控和备份；
- 用户端与管理端 Web 控制台。

因此，该项目更接近“AI 模型资源接入层 + API 管理平台 + 计费运营后台”，而不是一个单一模型的聊天应用。

## 2. 主要使用者

| 角色 | 主要操作 |
| --- | --- |
| 平台管理员 | 管理上游账号、代理、分组、渠道、定价、订阅、支付、用户、风控和系统设置 |
| 平台用户 | 注册登录、创建 API Key、查看用量和余额、兑换或购买额度、管理订阅 |
| API 客户端 | 使用平台 API Key 调用兼容端点，例如 Claude Code、Codex、Gemini CLI、OpenAI SDK 或自建应用 |
| 运维人员 | 查看实时流量、并发、渠道状态、错误日志、告警、审计记录和备份 |

## 3. 核心请求链路

一次典型调用的处理流程如下：

1. 客户端携带平台签发的 API Key 请求兼容端点。
2. 网关校验 Key 状态、所属分组、模型白名单、订阅或余额。
3. 系统执行速率、并发和风控策略，并根据分组、优先级、可用性、配额和粘性会话选择上游账号。
4. 如有需要，进行模型名映射、协议转换、OAuth Token 刷新和代理路由。
5. 响应返回客户端，同时异步或同步记录用量、费用、请求状态和监控指标。

![Sub2API 请求链路示意：客户端通过本地网关访问上游，网关连接数据库与缓存](/images/posts/sub2api-local/request-flow.svg)

_图 1：以本地 OpenAI 分组为例的请求链路示意。实际支持的上游和路由取决于所使用的项目版本与配置。_

## 4. 协议与上游能力

### 对外协议

| 协议 | 主要端点 | 用途 |
| --- | --- | --- |
| Anthropic 兼容 | `/v1/messages`、`/v1/messages/count_tokens` | Claude 系客户端和协议兼容调用 |
| OpenAI 兼容 | `/v1/responses`、`/v1/chat/completions`、`/v1/embeddings` | Responses API、Chat Completions、Embedding 等 |
| Gemini 原生兼容 | `/v1beta/models/...` | Gemini SDK 和 Gemini CLI 直连 |
| Codex 兼容 | `/backend-api/codex/...`、`/models` | Codex 模型目录、Responses 和 Realtime 调用 |
| 多媒体 | `/v1/images/...`、`/v1/videos/...`、`/v1/tts`、`/v1/stt` | 图片、视频、语音与实时能力，具体取决于上游平台 |

项目还提供异步图片任务和批量图片任务，用于避免长时间生成占用单个 HTTP 连接。

### 上游平台

本文整理时，项目代码定义的账号平台包括：

- Anthropic，包括 OAuth、Setup Token、API Key 及 AWS Bedrock 等账号形态；
- OpenAI / Codex；
- Google Gemini；
- Antigravity；
- xAI Grok；
- Kimi、智谱 GLM、DeepSeek、MiniMax；
- OpenCode Go；
- Composite 合成分组，可按模型将同一个 API Key 路由到不同平台。

不同平台的可用端点不完全一致。例如，Embeddings 仅在 OpenAI 平台分组开放；Grok 分组额外提供视频、语音、Web Search 和 X Search 相关路由。

## 5. 业务能力

### 账号池与调度

- 支持 OAuth、Setup Token、API Key 等凭据形态；
- 支持账号分组、优先级、可调度状态、模型映射和模型白名单；
- 支持账号级并发、用户级并发、RPM / Token 限制和排队；
- 支持粘性会话，尽量将同一会话路由到同一上游账号；
- 支持失败重试、临时禁用、配额探测和渠道健康检查；
- 支持为上游账号绑定 HTTP / SOCKS 代理与 TLS 指纹配置。

### 用户、权限与计费

- 用户注册、登录、邮箱验证、密码找回、TOTP 二次验证和 WebAuthn / Passkey；
- GitHub、Google、LinuxDo、微信、钉钉和通用 OIDC 等用户登录集成；
- API Key 创建、状态、IP 访问控制、分组与模型准入；
- Token 级用量和成本记录，支持分组倍率、渠道定价和盈利控制；
- 余额、兑换码、优惠码、订阅套餐、邀请或推广与用户订单；
- 内置 EasyPay、支付宝、微信支付、Stripe 和 Airwallex 的支付与回调处理。

### 管理与运维

- 管理员仪表盘、用户、账号、分组、代理、渠道、使用记录和订阅管理；
- 渠道监控、定时测试、实时 QPS / 并发、错误事件、告警规则和邮件通知；
- 审计日志、提示词安全审计、内容风控、管理员合规确认；
- PostgreSQL 备份及 S3 对象存储集成；
- 可选的签名本地进程插件机制及管理员插件 UI；
- 公告、自定义页面、模型广场和外部系统 iframe 集成。

## 6. 运行模式

| 模式 | 说明 |
| --- | --- |
| `standard` | 完整平台模式，启用用户、余额、计费、订阅和支付等 SaaS 能力 |
| `simple` | 面向个人或内部团队，隐藏 SaaS 相关界面并跳过计费流程；生产环境需额外显式确认 |

这两种模式共用同一套网关和账号调度核心。

## 7. 技术架构

| 层次 | 技术与职责 |
| --- | --- |
| 前端 | Vue 3、TypeScript、Composition API、Vite、Pinia、Vue Router、Tailwind CSS、Vue I18n |
| 后端 | Go 1.27、Gin HTTP 框架、Ent ORM、Google Wire 依赖注入 |
| 持久化 | PostgreSQL，保存用户、账号、密钥、订阅、订单、用量、审计与系统配置 |
| 缓存与协调 | Redis，承担鉴权缓存、调度状态、限流、并发、会话、任务和跨实例协调 |
| 构建 | pnpm 构建前端，Go 构建后端；前端产物可嵌入 Go 二进制 |
| 测试 | Go testing、testify、testcontainers；Vitest、Vue Test Utils、ESLint、vue-tsc |
| 部署 | Linux 二进制 + systemd、Docker Compose、Apple container、源码编译 |

生产构建可将前端静态资源嵌入后端，对外只需运行一个 Sub2API 应用服务，另外依赖 PostgreSQL 和 Redis。

## 8. 代码结构

```text
sub2api-main/
├── backend/
│   ├── cmd/server/              # Go 服务入口和 Wire 组装
│   ├── ent/schema/              # Ent 数据模型定义
│   ├── internal/handler/        # HTTP 处理器
│   ├── internal/server/routes/  # 管理端、用户端和网关路由
│   ├── internal/service/        # 调度、计费、OAuth、支付和运维业务
│   ├── internal/repository/     # PostgreSQL、Redis 和外部服务适配
│   └── internal/pkg/            # 各上游协议与通用底层能力
├── frontend/
│   └── src/
│       ├── views/admin/         # 管理员界面
│       ├── views/user/          # 用户中心
│       ├── views/auth/          # 登录注册与 OAuth 回调
│       ├── api/                 # 前端 API 封装
│       ├── stores/              # Pinia 状态
│       └── components/          # 通用和业务组件
├── deploy/                      # Compose、systemd、Caddy 和安装脚本
├── docs/                        # 支付、插件、批量图片等专题文档
├── openspec/                    # 功能变更的规格、设计和验证记录
└── skills/                      # Sub2API 管理技能说明
```

## 9. 开发与部署

### 本地开发依赖

- Go 1.27.0，以 `backend/go.mod` 和 CI 校验为准；
- Node.js 20 建议版本，pnpm 9；
- PostgreSQL 15+，本文整理时 Compose 默认使用 PostgreSQL 18；
- Redis 7+。

### 常用命令

```bash
# 前端开发
cd frontend
pnpm install
pnpm run dev

# 后端开发
cd backend
go run ./cmd/server

# 项目根目录构建与测试
make build
make test
```

修改 `backend/ent/schema/` 后需重新生成 Ent 代码；修改依赖注入组装后需重新生成 Wire 代码。详细开发约定见 [DEV_GUIDE.md](https://github.com/Wei-Shaw/sub2api/blob/main/DEV_GUIDE.md)。

### 部署方式

1. Linux 一键安装：下载预编译二进制并注册 systemd 服务。
2. Docker Compose：同时启动 Sub2API、PostgreSQL 和 Redis，适合标准部署。
3. Apple container：用于 Apple 芯片 Mac 上的本地开发和人工运维。
4. 源码编译：适合二次开发和定制构建。

首次启动可通过 Setup 向导配置数据库、Redis 和管理员。Docker Compose 方式支持使用环境变量自动初始化。详细步骤见 [README_CN.md](https://github.com/Wei-Shaw/sub2api/blob/main/README_CN.md) 和 [deploy/README.md](https://github.com/Wei-Shaw/sub2api/blob/main/deploy/README.md)。

## 10. 安全与运营边界

- 这是一个会处理上游凭据、用户 API Key、支付回调和请求内容的高敏感系统。生产环境必须固定配置 JWT 密钥和 TOTP 加密密钥，限制数据库、Redis 和管理端的网络访问。
- 应启用 HTTPS，正确配置反向代理信任边界、CORS、上游 URL 白名单、响应头过滤和出站网络策略。
- 使用 OAuth 订阅账号或转售上游能力可能与服务商条款冲突；公开运营、收费、处理用户内容或面向特定地区提供服务时，需要由部署和运营主体独立审查上游授权、数据保护、内容安全、支付、税务和当地监管要求。
- 开源许可证为 LGPL-3.0，二次开发和分发时应根据 [LICENSE](https://github.com/Wei-Shaw/sub2api/blob/main/LICENSE) 审查对应义务。

更完整的运营合规说明见 [docs/legal/admin-compliance.zh.md](https://github.com/Wei-Shaw/sub2api/blob/main/docs/legal/admin-compliance.zh.md)，边缘代理安全配置见 [deploy/EDGE_SECURITY.md](https://github.com/Wei-Shaw/sub2api/blob/main/deploy/EDGE_SECURITY.md)。

## 11. 适用与不适用场景

### 适用场景

- 个人或内部团队统一管理多个 AI 账号和 API 凭据；
- 为多个开发工具提供统一 Base URL 和 API Key；
- 需要按用户、分组、模型或渠道控制用量和成本；
- 需要在多账号之间进行负载均衡、故障切换和配额利用；
- 有明确上游授权与合规基础的私有 AI API 平台。

### 不适用场景

- 只需调用单个官方 API、不需要用户和计费管理的简单应用；
- 缺少 PostgreSQL、Redis、反向代理、备份和监控维护能力的无人值守环境；
- 未确认上游账号共享、配额分发或商业使用是否被允许的公开服务。

## 12. 一句话总结

Sub2API 是一个把多平台 AI 账号池封装成统一兼容 API，并同时提供用户、权限、调度、计费、支付和运维管理的自托管 AI API 平台。

## 相关资料

- [在 Mac 本地搭建 Sub2API：从 ChatGPT 授权到 API 转发](/posts/sub2api-local-chatgpt-guide)
- [Sub2API 开源仓库](https://github.com/Wei-Shaw/sub2api)
- [Sub2API 中文说明](https://github.com/Wei-Shaw/sub2api/blob/main/README_CN.md)
