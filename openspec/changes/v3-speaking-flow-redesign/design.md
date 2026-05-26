## Context

V2 底部栏：Listen/Record 并排 + 录音后 Play/Re-record 挤在同一空间 + 句子文本预览重复。需要基于"模态互斥 + 自动流转"理念重构。

## Goals / Non-Goals

**Goals:**
- 阅读模式：一个圆形 ▶ 按钮 + 全文播放环形进度
- 练习模式：圆点导航 + ▶/🎤 模态互斥
- 全文播完自动进入练习模式
- 录音完成专用操作区

**Non-Goals:**
- 不改变文章渲染
- 不改变句子高亮
- 不改变录音功能逻辑

## Decisions

### 三模式状态机

```
阅读模式 → 全文播放中 → 文章/练习模式
                │                │
                ▼                ▼
          全文播完自动      [▶] 播放 / [🎤] 录音
                │          录音完成操作区
                ▼
          练习模式 ←──────────┘
```

### 圆形播放按钮 + 进度环

用 SVG circle 实现环形进度条，包裹圆形按钮。`stroke-dashoffset` 从 circumference 递减到 0。

```tsx
// 环形进度
const circumference = 2 * Math.PI * radius;
const offset = circumference * (1 - progress);
// <circle strokeDasharray={circumference} strokeDashoffset={offset} />
```

### 模态互斥

内部状态 `activeMode: 'idle' | 'playing' | 'recording' | 'recorded'`：
- `idle`: 两个按钮都显示
- `playing`: 录音按钮隐藏，听歌按钮变暂停
- `recording`: 播放按钮隐藏，录音按钮变停止
- `recorded`: 专用操作区

### 圆点导航

练习模式下显示：`● ○ ○ ○ ○`（可点击跳转）。当前句实心圆，其他空心圆。

### 段落缩进

ArticleContent 每个 `<p>` 添加 `text-indent: 2em`。

## Risks / Trade-offs

- **环形进度性能**: SVG stroke-dashoffset 动画流畅，无性能问题
- **模态隐藏按钮可能困惑用户**: 暂停/播完自动恢复双按钮，用户很快学会
