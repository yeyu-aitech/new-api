# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

请始终使用简体中文与我对话，并在回答时保持专业、简洁。

@AGENTS.md

## 这个仓库是什么

这是 **api.tokenpowerhub.com** 网关站点的源码，是上游 [`yeyu-aitech/new-api`](https://github.com/yeyu-aitech/new-api)（New API，一个 Go + React 的多上游 AI 网关/代理）的 **fork**。它位于 SecondBrain 货架的 `tokenpowerhub-com` 包裹下，登记为 `api-tokenpowerhub-com` 槽位（见上级 `_index.md`）。

- 生产环境此前是从上游 `v1.0.0-rc.20` 完整构建的；现已改为跟随上游最新代码。
- 上游通用工程规范（分层架构、后端 JSON/DB/计费不变量、i18n、前端开发规范）全部沿用，已通过上面的 `@AGENTS.md` 导入——`AGENTS.md`（根）+ `web/AGENTS.md`（前端）是权威来源，本文件只补充 fork 专有信息。

## Fork 定制策略（核心约束）

**只改前端页面，后端跟随上游 release。** 维护本 fork 时严格分层：

- **前端（`web/`）** — 允许定制：品牌化、页面文案、落地页/定价/排行等展示层改动，都改在 `web/src/` 下（页面在 `web/src/routes/` 与 `web/src/features/`）。这是本 fork 唯一预期长期偏离上游的部分。
- **后端（`web/` 以外的所有 Go 代码：`controller/ service/ model/ relay/ middleware/ router/ common/ …`）** — **不做本地定制**，直接从上游最新 release 更新。改后端逻辑前先确认能否通过上游配置/环境变量实现，避免制造合并冲突面。

更新后端时的合并原则：以上游为准，冲突几乎只应出现在 `web/` 里；若非 `web/` 文件产生冲突，说明有不该存在的本地后端改动，应回退而非硬合。

## remote 与"跟随上游 release"流程

本仓配两个 remote：

- `origin` → `yeyu-aitech/new-api`（你的 fork，可写）——所有前端改动 push 到这里。
- `upstream` → `QuantumNous/new-api`（原始上游，只读，push 已禁用）——拉官方 release。

拉取上游最新后端（在本目录内执行）：

```bash
git fetch upstream --tags                 # 拉上游最新提交与 release tag
git tag -l 'v1.0.0-rc.*' | sort -V | tail # 查看可用 release（当前最新 v1.0.0-rc.21）
git merge v1.0.0-rc.NN                     # 合并目标 release；冲突应只落在 web/
```

合并后：非 `web/` 的冲突意味着有不该存在的本地后端改动，优先回退；解决完 `cd web && bun run lint && bun run build`、`go build` 验证，再 push 到 `origin`。

## 常用命令

前端命令以 `web/package.json` 为准（**注意：根 `makefile` 里的 vite/端口 5173 已过时，实际前端用 Rsbuild + Bun**）：

```bash
# 前端（在 web/ 下，包管理器用 Bun）
cd web
bun install
bun run dev          # Rsbuild 开发服务器
bun run build        # 生产构建
bun run build:check  # 先 tsgo 类型检查再构建
bun run lint         # oxlint（改前端后必跑）
bun run typecheck    # tsgo -b
bun run i18n:sync    # 同步 i18n key

# 后端（仓库根，Go 1.22+）
go run main.go       # 本地起 API（默认读 SQLite one-api.db）
go build             # 编译
go test ./...        # 全部后端测试

# 整体：构建前端并起后端
make all             # = build-all-web + start-api
make dev             # docker 起后端依赖 + 前端 dev server
```

后端产物会把 `web/` 构建结果嵌入 Go 二进制对外服务；只改前端预览时用 `cd web && bun run dev` 即可，不必编译 Go。

## 货架协作约定

- 本目录是独立 git 仓（`origin` 指向上游 fork），在**本目录内**提交，不要从上层 `tokenpowerhub-com/` 或 vault 根跑 `git add -A`。
- 部署配置、上游凭据、nginx/密钥引用不进本仓——归 `00-system/03-ops/05-平台运行时/tokenpowerhub/` 和独立的 `api-tokenpowerhub-com-configuration` 配置仓（见上级 `_index.md`）。本仓只放源码。
- 内容为简体中文；产品术语（如"算力聚合""Coding Plan"）保持既有中文，不要翻译。
