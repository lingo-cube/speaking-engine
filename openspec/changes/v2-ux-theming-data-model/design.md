## Context

V1 的 TrainingDrawer 在移动端体验不佳——抽屉遮住文章、控件入口不可见。同时所有组件硬编码 Tailwind 颜色，前后端类型各自定义。本次变更重构底部交互层、引入主题 Token、建立类型契约。

## Goals / Non-Goals

**Goals:**
- 所有音频控件集中到页面底部固定栏
- 句子选中 → 底部展开 Listen + Rec 两个大按钮
- 品牌色语义 Token，`[data-theme]` 一键切换
- `api.ts` 定义类型契约，mock 数据引用契约类型

**Non-Goals:**
- 不改变文章阅读区布局
- 不改变句子高亮逻辑
- 不修改后端数据库 schema
- 不新增第三方依赖

## Decisions

### 底部控件栏：固定定位，三态切换

```
状态机:
  未选中 → [▶ Full]              (1 个控件)
  选中   → [▶ Full ···] [▶ Listen] [● Rec]  (3 个控件)
  录音中 → [▶ Full ···] [▶ Listen] [⏹ Stop] 00:12
  录完   → [▶ Full ···] [▶ Listen] [▶ Play] Re-record
```

**Why**: 固定底部不随滚动消失。三态切换保证控件始终在拇指热区。Listen 和 Rec 完全独立，不强制流程。

**Alternatives considered**: 顶部弹出控件栏（拇指够不到，不符合人体工学），内联展开（破坏文章连贯性）。

### 主题化：CSS 变量 + Tailwind @theme 映射

```css
@theme {
  --color-primary: var(--theme-primary);
  --color-primary-hover: var(--theme-primary-hover);
  /* ... */
}
:root { --theme-primary: #4F46E5; }
[data-theme="dark"] { --theme-primary: #818CF8; }
```

**Why**: 组件引用 `bg-primary`（语义类名），主题切换只改变量值。保留 Tailwind 原生灰色（`bg-white`、`text-gray-500` 等），避免过度抽象。

**Token 清单（6 个）**: `primary`, `primary-hover`, `primary-light`, `danger`, `danger-hover`, `highlight`, `highlight-light`

**Alternatives considered**: Tailwind `dark:` 前缀（只能明暗二选一，不支持多主题），CSS-in-JS 主题方案（额外依赖）。

### 类型契约：api.ts 与 Go json tag 一致

前端新增 `src/types/api.ts`，类型名加 `Api` 前缀以区分 UI 组合类型。字段名、类型与后端 Go 的 `json:"..."` tag 完全一致。

**Why**: 前后端通过 JSON 形状耦合。api.ts 是这份契约的 TypeScript 表达。Mock 数据引用 Api 类型 → 未来切到真实 API 时组件零改动。

**后端 Answer 接口改造**：新增 `GET /api/v1/questions/:id/answer-full`，返回 `{ answer: ApiAnswer, chunks: ApiChunk[] }`，避免前端两次请求。

### 段落结构：Chunk 新增 paragraph 字段

```go
// backend/internal/model/chunk.go
type Chunk struct {
    // ...existing fields...
    Paragraph int `gorm:"default:1" json:"paragraph"`
}
```

前端 ArticleContent 按 `paragraph` 值分组渲染：同值句子连续排列（`inline`），不同值之间插入 `mt-4` 间距。

**Why**: 教师创作内容时可手动划分段落。默认所有句子 `paragraph=1`，向后兼容。不强制使用，不用时所有句子归为一段。

## Risks / Trade-offs

- **底部固定栏遮挡**: 小屏手机可能遮挡最后一句。→ Mitigation: 文章区添加 `pb-28` 底部留白。
- **主题 Token 不足**: 6 个 Token 可能不够用。→ Mitigation: 按需增加，保持最小集。
- **类型契约维护**: Go 改字段名时前端不知情。→ Mitigation: 后端 CI 步骤中可加入 API 契约校验（V3）。
