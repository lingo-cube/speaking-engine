# Speaking Engine — 类 Duolingo 温暖成人版 PRD (V7)

## 1. 背景

V6 实现了基础的颜色和间距系统，但界面仍显"功能可用"：
- 背景纯色无故事性
- 卡片全白，缺乏视觉节奏
- 没有庆祝/鼓励反馈

目标：在 V6 基础上，升级为"温暖鼓励、活力并存"的成人学习界面。

---

## 2. 核心设计原则

### 2.1 颜色策略

基于 Impeccable Colorize 规范：

- **颜色策略：Committed**：30-60% 表面由主导色承担
- **物理场景**：雅思考生在 22°C 室温、自然光亮的房间，需要温暖、鼓励、成长的情绪
- **OKLCH 色彩空间**：延续 V6 的颜色系统，增强应用

### 2.2 布局原则

基于 Impeccable Layout 规范：

- **节奏通过对比创造**：紧凑/慷慨对比
- **层级靠空间达成**：3 层视觉结构
- **卡片不是懒惰的答案**：色彩区分状态

### 2.3 动画原则

- 不动画 CSS 布局属性
- Ease out 指数曲线（ease-out-quart / quint / expo）
- 微交互：scale-102 + shadow 变化

---

## 3. 具体改进方案

### 3.1 背景升级

#### 3.1.1 网格图案背景

```css
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, var(--color-surface-200) 1px, transparent 1px),
    linear-gradient(to bottom, var(--color-surface-200) 1px, transparent 1px);
  background-size: var(--bg-grid-size) var(--bg-grid-size);
  background-color: var(--color-surface-50);
}
```

- 网格大小：40px（`--bg-grid-size`）
- 线条透明度：`var(--bg-grid-opacity: 0.3)`
- 基底色：`surface-50` 暖白

#### 3.1.2 动态光晕

```css
.bg-glow {
  position: fixed;
  top: var(--bg-glow-offset-y);
  right: var(--bg-glow-offset-x);
  width: var(--bg-glow-size);
  height: var(--bg-glow-size);
  border-radius: 50%;
  background: radial-gradient(circle, var(--decoration-glow) 0%, transparent 70%);
  pointer-events: none;
  z-index: -1;
}
```

- 位置：右上角偏移
- 颜色：`oklch(90% 0.12 145)`（淡绿光晕）
- 模式切换：Reading / Training 不同色调（通过 CSS 变量控制）

---

### 3.2 卡片色彩化

#### 3.2.1 TopicCard

| 状态 | 背景 | 文字 | 边框 |
|------|------|------|------|
| 默认 | 白色 | `surface-500` | `surface-200` |
| 悬停 | `primary-light` tint | 深灰 | 无 |
| 选中 | `primary` | 白 | 无 |

**Tint 强度定义**：
- Hover: `--card-tint-hover: 0.3`（混合 30% 主色）
- Selected: `--card-tint-selected: 1.0`（纯主色）

#### 3.2.2 问题列表（PracticePage 侧栏）

| 状态 | 背景 | 文字 |
|------|------|------|
| 默认 | 白色 | `surface-500` |
| 选中 | `primary` | 白 |

**视觉权重**：选中问题成为第二强吸引点（仅次于当前卡片）

#### 3.2.3 ArticleView 卡片

**新增：进度光带**（卡片顶部）

```css
.progress-band {
  background: linear-gradient(90deg,
    var(--color-primary) 0%,
    var(--color-tertiary) 50%,
    var(--color-accent) 100%
  );
  height: 4px;
  border-radius: 2px;
}
```

- 位置：卡片顶部
- 与进度条联动（0% → 100%）
- 三色过渡：绿 → 橙 → 青（成长过程）

---

### 3.3 庆祝动画

**触发时机**：完成一个完整的 Shadowing 练习（所有句子完成）

**效果**：
- 粒子爆炸（confetti）
- 三色分布：绿（60%）、橙（30%）、青（10%）
- 持续 1.2 秒，不阻塞操作

**技术**：使用 `canvas-confetti` 或类似库

---

### 3.4 动画反馈

#### 3.4.1 悬停反馈

- TopicCard: `scale-102` + `shadow-lg`
- 按钮: `scale-105` + `primary-hover-light` glow

#### 3.4.2 状态过渡

- 颜色过渡：`transition-colors duration-200`
- 阴影过渡：`transition-shadow duration-200`
- 变换过渡：`transition-transform duration-200`

---

## 4. 新增 Token

```css
:root {
  /* 背景图案 */
  --bg-grid-size: 40px;
  --bg-grid-opacity: 0.3;
  --bg-glow-size: 600px;
  --bg-glow-offset-x: 20%;
  --bg-glow-offset-y: -10%;

  /* 模式光晕色 */
  --glow-reading: oklch(90% 0.12 145);  /* 绿 */
  --glow-training: oklch(90% 0.12 50);    /* 橙 */

  /* 装饰色 */
  --decoration-glow: oklch(90% 0.12 145);

  /* 卡片 tint 强度 */
  --card-tint-hover: 0.3;
  --card-tint-selected: 1.0;
}
```

---

## 5. 页面级应用

### 5.1 TopicListPage

| 元素 | 新设计 |
|------|--------|
| 背景 | `bg-grid-pattern` + 右上角光晕（绿色） |
| Header | 保留 V6 的 `primary-light` 渐变 |
| Category Pills | 选中：`primary` 全背景 + 白字 |
| TopicCards | 见 3.2.1 |
| Section Break | 保留 V6 的 `surface-200` 分隔线 |

### 5.2 PracticePage

| 元素 | 新设计 |
|------|--------|
| 背景 | `bg-grid-pattern` + 右上角光晕（训练模式橙） |
| 问题列表侧栏 | 半透绿背景（`surface-50` + `primary-light/20`） |
| 问题列表项 | 见 3.2.2 |
| ArticleView | 新增进度光带（卡片顶部） |
| 完成时 | 粒子庆祝动画 |

---

## 6. 实施计划

| 阶段 | 内容 | 优先级 |
|------|------|-------|
| **V7.1** | Token 定义 + 背景图案 | 高 |
| **V7.2** | TopicCard 色彩化 | 高 |
| **V7.3** | 问题列表色彩化 | 高 |
| **V7.4** | 进度光带 | 中 |
| **V7.5** | 庆祝动画 | 中 |
| **V7.6** | 动画微交互 | 低 |

---

## 7. 不变项

- V6 的颜色系统（primary/tertiary/accent/surface）
- V6 的间距系统
- BottomSheet / NextPreviewBar 组件
- 底部控件栏交互逻辑
- Audio-First 核心原则