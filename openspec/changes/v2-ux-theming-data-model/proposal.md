## Why

V1 的 TrainingDrawer 底部抽屉方案在移动端遮住文章内容、控件入口不可见、拇指需要离开阅读区。同时所有组件硬编码 Tailwind 颜色无法切换主题，前后端类型各自定义缺乏共享契约导致未来对接困难。这些问题需要在连接真实 API 之前解决。

## What Changes

- **New**: 底部控件中枢 — 所有音频操作（全文播放、句子聆听、录音）集中在底部中央固定栏
- **New**: 主题化系统 — 品牌色语义 Token，`data-theme` 属性一键切换明暗，不改布局
- **New**: API 类型契约 — `frontend/src/types/api.ts` 定义与 Go json tag 严格一致的响应类型
- **Modified**: 句子选中 → 底部出现 Listen + Rec 两个大按钮，取代抽屉方案
- **Removed**: TrainingDrawer 组件（被底部控件栏取代）
- **Modified**: Mock 数据引用 API 契约类型，与后端 JSON 响应结构对齐

## Capabilities

### New Capabilities

- `bottom-control-bar`: 底部固定控件中枢，全文播放条 + 句子 Listen/Rec 按钮，选中句子时展开
- `theme-system`: 品牌色 CSS 变量 Token 体系，支持 `[data-theme]` 切换，组件引用语义类名
- `api-contract-types`: TypeScript 类型定义文件，严格匹配后端 Go 模型的 json tag

### Modified Capabilities

- `shadowing-practice`: 录音按钮从抽屉移至底部控件栏，与 Listen 按钮并排
- `audio-playback`: 句子播放按钮从抽屉移至底部控件栏
- `sentence-chunking`: 句子选中状态驱动底部控件栏的显示/切换

## Impact

- **前端组件**: 新增 `BottomControlBar`；移除 `TrainingDrawer`；`ArticleView` 简化
- **前端基础设施**: 新增 `src/types/api.ts`（契约类型）；`src/theme.css`（主题变量）
- **后端**: 可选新增 `GET /api/v1/questions/:id/answer-full` 嵌套接口（V2.4）
- **Mock 数据**: `mock/data.ts` 类型引用改为 API 契约类型
- **无破坏性变更**: 后端数据库、API 兼容；前端页面路由不变
