## Context

V2 引入了底部控件栏、主题系统和 API 类型契约。但播放交互仍有问题：两个播放源可同时发声、进度条信息量不足、练习模式无明确的退出路径。移动端问题选择与展示重复。需要在播放逻辑、学习流、视觉表现三个层面做闭环优化。

## Goals / Non-Goals

**Goals:**
- 底部栏双模式状态机（阅读 ↔ 练习），[×] 关闭练习
- 全文/单句播放互斥
- 真实音频进度条替代句子点阵
- 句子选中半透明背景 + 左边条，主题友好
- 桌面侧栏 + 移动底部预览双适配

**Non-Goals:**
- 不新增后端 API
- 不改变数据模型
- 不引入动画库依赖

## Decisions

### 双模式状态机

```
阅读模式（默认）                     练习模式
┌──────────────────────┐          ┌──────────────────────┐
│ ▶ Full · ████░░ 65% │          │ "选中的句子..." [×] │
│ 0:34/1:20           │          │ ┌────────┐┌────────┐ │
│                      │          │ │▶ Listen││● Record│ │
│                      │          │ └────────┘└────────┘ │
│                      │          │ ▶ Full · 2/3 · 1:20  │
└──────────────────────┘          └──────────────────────┘

触发: 点击句子 → 练习              触发: [×] → 阅读
     顶栏 ▶ → 阅读+下一题              另一句 → 练习(切换目标)
                                       顶栏 ▶ → 阅读+下一题
```

### 播放互斥

BottomControlBar 内部状态：`activePlayer: 'none' | 'full' | 'sentence'`。
- 按 Full → `activePlayer = 'full'`，停止当前 sentence
- 按 Listen → `activePlayer = 'sentence'`，停止当前 full
- 按 [×] → `activePlayer = 'none'`，停止所有

### 真实进度条

`useAudioPlayer` 已有 `currentTime` 和 `duration`。直接使用它们渲染 `<progress>` 或自定义进度条，配合时间显示 `0:08 / 0:15`。

### 句子选中：半透明 + 左边条

用内联样式或 tailwind 自定义类，不用 theme 变量（因为需要 rgba 透明度）。

```css
.sentence-active {
  background: rgba(79, 70, 229, 0.12); /* light mode */
  border-left: 3px solid #4F46E5;
}
[data-theme="dark"] .sentence-active {
  background: rgba(129, 140, 248, 0.15);
  border-left: 3px solid #818CF8;
}
```

### 桌面侧栏 + 移动底部预览

桌面端侧栏保持不变但简化：只显示 question 标题列表，当前项高亮，点击切换。移除独立的 QuestionCard。

移动端：顶栏 ● N/M 进度 + 底部练完后滑出预览条 "Q3: How has..." + [→ Next]。

### 问题融入 Article 卡片

```
┌── Article Card ────────────────┐
│ [Description] [Fact → Example] │  ← tags
│                                │
│ Please describe your hometown. │  ← 问题作为标题 (text-xl)
│ ───────────────────────────── │  ← divider
│ I come from Wuhan...           │  ← article text
└────────────────────────────────┘
```

QuestionCard 组件移除。

## Risks / Trade-offs

- **半透明在白色背景上对比度降低**: → 使用 12-15% 不透明度 + 实色左边条确保可辨识
- **移动端侧栏缺失**: → 底部预览条只显示 1 条即将到来的问题，完整列表通过顶栏 bottom sheet 访问
