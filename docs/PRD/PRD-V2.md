# Speaking Engine V2 — PRD

## 1. 变更概述

V2 聚焦三个方向：

1. **移动端交互重构** —— 底部控件栏替代抽屉，优化单手操作
2. **主题化架构** —— 语义色板 Token，支持明暗主题切换，不改布局
3. **数据模型契约** —— 严格定义 API 响应类型，前后端类型互通

---

## 2. 移动端交互重构

### 2.1 问题

当前底部抽屉（TrainingDrawer）方案在移动端存在：

- 抽屉遮住文章内容，打断阅读
- 控件在下方，拇指需要离开阅读区
- 缺乏可见的操作入口

### 2.2 方案：底部控件中枢

所有音频操作集中在底部中央，阅读区纯净不被打扰。

```
未选中句子（阅读模式）              选中句子后（训练模式）

┌────────────────────┐            ┌────────────────────┐
│ ← Hometown        │            │ ← Hometown        │
├────────────────────┤            ├────────────────────┤
│                    │            │                    │
│     [文章]         │            │     [文章]         │
│     纯净阅读       │            │     选中句高亮     │
│                    │            │                    │
│                    │            │                    │
├────────────────────┤            ├────────────────────┤
│                    │            │ ▶ Full  ···  2 / 5 │  ← 全文播放条（窄）
│  [▶ Play Full]    │            │                    │
│                    │            │  [▶ Listen] [● Rec]│  ← 两个大按钮
└────────────────────┘            └────────────────────┘
```

### 2.3 交互规则

| 状态 | 底部显示 | 行为 |
|------|---------|------|
| 未选中句子 | 全文播放按钮（1 个） | 播放/暂停全文 |
| 选中句子 | 全文播放条 + Listen + Rec（3 个控件） | 全文播放 + 句子听/录 |
| 录音中 | 全文播放条 + Listen + 停止录音 + 计时 | 计时器显示 |
| 录完 | 全文播放条 + Listen + 回放录音 + 重录 | 可对比原音 |

- 点击句子 → 选中高亮，底部出现 Listen + Rec
- 点击同一句子 → 取消选中，底部恢复仅全文
- 点击另一句子 → 切换选中，底部控件更新
- **Listen 和 Rec 完全独立，用户自由选择顺序和次数**

### 2.4 按钮规格

```
全文播放条:   [▶] ●●●●●●●  2 / 5    高度 44px
Listen 按钮:  ┌──────────────────┐
              │     ▶ Listen     │   56×48px, 主色填充, 圆角 12px
              └──────────────────┘
Record 按钮:  ┌──────────────────┐
              │     ● Record     │   56×48px, 红色填充, 圆角 12px
              └──────────────────┘
```

### 2.5 文章段落结构

#### 问题

当前所有句子挤在一个 `<p>` 标签内，段落结构不清晰，影响阅读节奏。

#### 方案

Chunk 新增 `paragraph` 字段，同一段落内的句子连续排列，段落间增加视觉间距。

```
数据层:                         展示层:
┌──────────────────────┐      ┌──────────────────────┐
│ Chunk 1, paragraph 1 │      │                      │
│ Chunk 2, paragraph 1 │ ───▶ │ 句子1 句子2          │ ← 段落1，连续排列
│ Chunk 3, paragraph 2 │      │                      │
│ Chunk 4, paragraph 2 │      │ 句子3 句子4          │ ← 段落2，间距分开
│ Chunk 5, paragraph 3 │      │                      │
│                      │      │ 句子5               │ ← 段落3
└──────────────────────┘      └──────────────────────┘
```

```json
// Chunk 数据模型增加 paragraph 字段
{
  "id": 1,
  "answer_id": 1,
  "order": 1,
  "paragraph": 1,
  "text": "I come from Wuhan...",
  "audio_url": "https://..."
}
```

#### 排版规格

| 属性 | 值 | 目的 |
|------|-----|------|
| 字体 | system-ui, sans-serif | 平台原生最佳渲染 |
| 正文字号 | 18px（`text-lg`） | 舒适阅读 |
| 行高 | 1.75（`leading-relaxed`） | 宽松不拥挤 |
| 段落间距 | 16px（段落间 `mt-4`） | 清晰分隔 |
| 文字颜色 | `text-gray-800`（正文）/ `text-gray-500`（辅助） | 高对比度 |
| 字间距 | `tracking-normal` | 不额外拉伸 |

---

## 3. 主题化架构

### 3.1 问题

所有组件硬编码 Tailwind 颜色类（`bg-indigo-500`、`text-gray-500` 等），无法切换主题。

### 3.2 方案：品牌色 Token + 保留 Tailwind 灰色

只对**品牌色**做语义化，灰色阶梯保持 Tailwind 原生。

```css
@theme {
  --color-primary: #4F46E5;
  --color-primary-hover: #4338CA;
  --color-primary-light: #EEF2FF;
  --color-danger: #EF4444;
  --color-danger-hover: #DC2626;
  --color-highlight: #F59E0B;
  --color-highlight-light: #FFFBEB;
}

[data-theme="dark"] {
  --color-primary: #818CF8;
  --color-primary-hover: #6366F1;
  --color-primary-light: #1E1B4B;
  --color-danger: #F87171;
  --color-danger-hover: #EF4444;
  --color-highlight: #FBBF24;
  --color-highlight-light: #451A03;
}
```

### 3.3 影响范围

| 当前写法 → | 改为 |
|-----------|------|
| `bg-indigo-500` | `bg-primary` |
| `text-indigo-600` | `text-primary` |
| `bg-indigo-50` | `bg-primary-light` |
| `hover:bg-indigo-600` | `hover:bg-primary-hover` |
| `bg-red-500` | `bg-danger` |
| `text-red-500` | `text-danger` |
| `hover:bg-red-600` | `hover:bg-danger-hover` |
| `bg-amber-50` | `bg-highlight-light` |
| `text-amber-900` | `text-highlight` |

不变项：`bg-white`、`bg-gray-*`、`text-white`、`text-gray-*`、所有布局/间距/圆角/动画。

### 3.4 切换方式

```typescript
// 一行代码切换主题
document.documentElement.dataset.theme = 'dark';  // 深色
document.documentElement.dataset.theme = 'light'; // 浅色（默认）
```

---

## 4. 数据模型契约

### 4.1 问题

前后端各自定义类型，没有共享契约：
- 前端 `Answer` 嵌套 `chunks: Chunk[]`，后端 `Answer` 是扁平 `{id, question_id}`
- 前端缺少 `created_at`、`updated_at`
- mock 数据结构与 API 响应不匹配

### 4.2 方案：三层模型

```
┌─────────────────────────────────────────────┐
│  DB Model (GORM)     — 后端内部，与表对应    │
│  API DTO (JSON)      — 前后端契约 ← 这里是关键│
│  UI State (TS)       — 前端组合/派生        │
└─────────────────────────────────────────────┘
```

### 4.3 API 响应类型（契约）

```typescript
// frontend/src/types/api.ts — 与 Go json tag 严格一致

interface ApiTopic {
  id: number;
  code: string;
  category: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface ApiQuestion {
  id: number;
  topic_code: string;
  question: string;
  type: string;
  framework: string;
  created_at: string;
  updated_at: string;
}

interface ApiAnswer {
  id: number;
  question_id: number;
  created_at: string;
  updated_at: string;
}

interface ApiChunk {
  id: number;
  answer_id: number;
  order: number;
  text: string;
  audio_url: string;
  created_at: string;
  updated_at: string;
}
```

### 4.4 后端配套改动

- Answer 的 `GET /api/v1/questions/:id/answer` 返回 answer + chunks 的组合响应（避免前端两次请求）
- 或者新增 `GET /api/v1/questions/:id/answer-full` 返回嵌套结构

### 4.5 Mock 数据改造

mock/data.ts 中的类型引用改为 `ApiTopic`、`ApiQuestion` 等，数据结构与 API 响应完全一致。

---

## 5. 迭代计划

| 迭代 | 内容 |
|------|------|
| **V2.1** | 底部控件栏 + 移除抽屉 |
| **V2.2** | 主题化 Token 替换 + ThemeSwitcher |
| **V2.3** | API 类型契约 + Mock 数据对齐 |
| **V2.4** | Answer 全量接口（嵌套 chunks） |

---

## 6. 不变项

- 文章阅读区整体布局不变（文章 + 底部控件栏）
- 句子点击高亮交互不变
- 全文播放逻辑不变
- 录音功能不变
- 后端数据库 schema 不变（chunk 仅新增 optional `paragraph` 字段）
