## Context

V6 已实现基础 OKLCH 颜色系统（成长绿 + 活力橙 + 专业青）和语义化间距系统，但界面仍显"功能可用"：背景纯色（surface-50）、卡片全白、无庆祝/鼓励反馈。目标是升级为"温暖鼓励、活力并存"的成人学习界面，为用户提供更强的情感支持。

当前前端运行在 `http://localhost:5175/speaking-engine/`（或 Vite 端口），使用 React + Tailwind CSS。

---

## Goals / Non-Goals

**Goals:**
- Committed 颜色策略（40-50% 主色覆盖表面）
- 网格图案背景 + 动态光晕创造故事性
- 卡片色彩化（TopicCard、问题列表）传递选中状态
- 进度光带（三色渐变）可视化成长过程
- 粒子爆炸庆祝动画（完成练习时）
- 微动画反馈（悬停 scale + shadow）

**Non-Goals:**
- 改变 V6 的颜色系统（主色、辅助色保持不变）
- 改变 V6 的间距系统
- 改变 BottomSheet / NextPreviewBar 组件结构
- 改变底部控件栏交互逻辑
- 不引入复杂的状态机或动画库

---

## Decisions

### 背景系统设计

**决策：网格图案 + 光晕组合**

| 元素 | 方案 | 理由 |
|------|------|------|
| 网格 | CSS linear-gradient | 轻量、无额外依赖 |
| 光晕 | fixed + radial-gradient | 不影响布局，可模式切换 |
| 模式切换 | CSS 变量控制 | 简单高效 |

**替代考虑**：SVG 背景图片 → 被否决（增加请求，可维护性差）

### 卡片色彩化策略

**决策：tint 混合系统而非硬编码类名**

```css
.topic-card {
  background: var(--color-white);
}
.topic-card:hover {
  background: color-mix(in srgb, var(--color-primary), var(--color-white) calc(100% * var(--card-tint-hover)));
}
.topic-card.selected {
  background: var(--color-primary);
}
```

**替代考虑**：预定义 `.bg-primary-tint-hover` 类 → 被否决（不灵活，难以调 tint 强度）

### 粒子动画

**决策：复用现有库（canvas-confetti）**

- 优势：轻量、已验证、支持三色自定义
- 集成点：在组件内引入，完成时触发

**替代考虑**：手写 Canvas 粒子系统 → 被否决（开发成本高，维护复杂）

### 动画曲线

**决策：CSS ease-out-quart**

```css
transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
```

**理由**：Impeccable 推荐曲线，符合自然物理感

---

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| 网格背景可感知（细线可见） | 降低 `--bg-grid-opacity` 至 0.2 |
| 粒子动画可能干扰操作 | 限制为 1.2 秒，可选禁用 |
| 光晕在某些屏幕上可能看不清 | 降低不透明度至 60-70% |
| OKLCH 在旧浏览器不渲染 | V6 已有 `@supports` 回退方案 |
|卡片大面积主色可能过于鲜艳 | 通过 tint 控制饱和度 |