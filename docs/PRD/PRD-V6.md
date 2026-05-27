# Speaking Engine — UI/UX 布局与颜色优化 PRD (V6)

## 1. 背景

当前实现中存在以下布局与颜色问题：

### 布局问题
- 间距节奏单调，缺乏紧凑/慷慨的对比
- 问题列表与主内容层级区分不清
- TopicList 使用 identical card grid（5列重复）
- 移动端问题列表水平滚动过于紧凑

### 颜色问题
- 主色 `#58CC02` + 红色 `#FF4B4B` + 黄色 `#FFC800` 偏功能性，缺乏温暖感
- 纯灰背景 `#f8fafc` 显得冰冷，不像"成熟学习网站"
- 颜色应用分散，没有形成视觉语言
- 缺少层次感和鼓励性情绪传递

目标：将界面从"功能可用"升级为"温暖鼓励、呼吸感与节奏感并存的专业级学习界面"。

---

## 2. 核心设计原则

### 2.1 布局原则

基于 Impeccable Layout 规范：

- **Spacing 是一种设计材料**：有意图地使用，而非随意填充
- **Rhythm 通过对比创造**：紧凑分组 + 慷慨分离
- **Hierarchy 靠空间达成**：最少维度传达层级
- **避免卡片单调性**：非卡片形式创造分组
- **响应式是结构性的**：而非流体排版

---

### 2.2 颜色原则

基于 Impeccable Colorize 规范：

- **颜色策略：Committed**：30-60% 表面由主导色承担
- **物理场景**：雅思考生在 22°C 室温、自然光亮的房间，需要温暖、鼓励、成长的情绪
- **颜色比例**：Dominant (60%) 成长绿 + Secondary (30%) 活力橙 + Accent (10%) 专业青
- **OKLCH 色彩空间**：感知均匀，色相环连续，避免饱和度过高的极端值
- **暖调中性灰**：替代纯灰，传递温度

---

## 3. 具体改进方案

### 3.1 颜色系统（OKLCH）

#### 3.1.1 颜色 Token 定义

```css
:root {
  /* ========== 主色系：成长绿 ========== */
  --color-primary: oklch(70% 0.18 145);      /* 活力绿 */
  --color-primary-hover: oklch(65% 0.18 145); /* 悬停深绿 */
  --color-primary-light: oklch(96% 0.06 145); /* 浅绿背景 */
  --color-primary-dark: oklch(45% 0.15 145);  /* 深绿文字 */

  /* ========== 辅助色：活力橙 ========== */
  --color-tertiary: oklch(75% 0.20 50);       /* 温暖橙 */
  --color-tertiary-light: oklch(97% 0.08 50); /* 浅橙背景 */
  --color-tertiary-dark: oklch(50% 0.16 50);  /* 深橙文字 */

  /* ========== 强调色：专业青 ========== */
  --color-accent: oklch(60% 0.14 210);        /* 深青 */
  --color-accent-light: oklch(95% 0.05 210);  /* 浅青背景 */

  /* ========== 语义色 ========== */
  --color-success: oklch(70% 0.18 145);       /* 复用 primary */
  --color-danger: oklch(65% 0.22 25);        /* 温柔红 */
  --color-warning: oklch(80% 0.18 85);       /* 琥珀黄 */
  --color-info: oklch(65% 0.14 210);         /* 复用 accent */

  /* ========== 暖调中性灰 ========== */
  --color-surface-50: oklch(99% 0.008 50);    /* 极浅暖白 */
  --color-surface-100: oklch(97% 0.008 50);   /* 浅暖灰 */
  --color-surface-200: oklch(93% 0.006 50);   /* 中暖灰 */
  --color-surface-500: oklch(60% 0.004 50);   /* 暖灰文字 */
  --color-surface-900: oklch(15% 0.008 50);   /* 深暖灰 */
}

/* ========== 浏览器兼容性 ========== */
/* OKLCH 现代浏览器支持度：Chrome 111+, Safari 15.4+, Firefox 113+ */
/* 回退方案：使用 @supports，旧版浏览器使用 RGB 回退值 */
@supports not (color: oklch(0% 0 0)) {
  :root {
    --color-primary: #58CC02;
    --color-primary-hover: #46A302;
    --color-primary-light: #E8F8D5;
    --color-primary-dark: #2E6F00;
    --color-tertiary: #FF9500;
    --color-tertiary-light: #FFF0CC;
    --color-tertiary-dark: #CC7700;
    --color-accent: #4A90E2;
    --color-accent-light: #EBF3FF;
    --color-danger: #FF4B4B;
    --color-warning: #FFC800;
    --color-info: #4A90E2;
    --color-surface-50: #FFFAF5;
    --color-surface-100: #F5F0E8;
    --color-surface-200: #EAE0D0;
    --color-surface-500: #6B6050;
    --color-surface-900: #2A2015;
  }
}
```

#### 3.1.2 颜色应用策略

| 位置 | 颜色 | 用途 |
|------|------|------|
| **Header 背景** | `surface-50` + `primary-light` 渐变 | 温暖开场 |
| **Primary 按钮** | `primary` | 核心行动 |
| **Hover 状态** | `primary-hover` | 交互反馈 |
| **Tag/标签** | `tertiary-light` bg + `tertiary-dark` text | 分类标识 |
| **进度条** | `primary` → `accent` 渐变 | 成长视觉化 |
| **录音状态** | `danger` | 醒目提示 |
| **卡片背景** | `white` + `surface-100` tint | 温暖层次 |

#### 3.1.3 分页级颜色应用

**TopicListPage**：
- Header 渐变：`linear-gradient(180deg, var(--primary-light) 0%, transparent 100%)`
- 选中 Topic 卡片：`primary` 边框 + `primary-light` 背景
- 卡片悬停：`tertiary-light` tint 背景

**PracticePage**：
- 问题列表背景：`surface-50` tint
- 选中问题：`primary` 边框（全边框，非左侧条纹）
- 进度指示器：`primary` → `accent` 渐变

**BottomControlBar**：
- 背景：`surface-50` + blur
- Listen 按钮：`primary`
- Record 按钮：`danger`
- 录音完成：`success` 背景（绿色鼓励）

**ArticleView**：
- 播放中 Chunk：`primary-light` 背景
- 选中 Chunk：`surface-100` 背景 + `primary` 边框

---

### 3.2 Spacing System

**问题**：`space-y-4`、`gap-4` 重复使用，缺乏节奏

**方案**：建立语义化间距系统

```css
:root {
  --space-section: clamp(48px, 8vw, 96px);
  --space-group: clamp(24px, 4vw, 48px);
  --space-item: clamp(12px, 2vw, 24px);
  --space-tight: clamp(6px, 1vw, 12px);
}
```

| 场景 | 使用 Token | 用途 |
|------|-----------|------|
| 区域分离 | `--space-section` | Header → Main → Footer |
| 分组分离 | `--space-group` | 卡片间、段落间 |
| 元素间距 | `--space-item` | 标题与内容、列表项间 |
| 紧凑分组 | `--space-tight` | 标签组、按钮组 |

---

### 3.3 Visual Hierarchy 强化

**问题**：问题列表与主内容层级不清

**方案**：2 层清晰结构

```
┌─────────────────────────────────────────┐
│ Header（全局导航）                        │
├──────────────────┬──────────────────────┤
│                  │                      │
│ Question List    │ Main Content         │
│ （次要，48px宽）  │ （核心，自适应）       │
│ 16px item gap   │ 32px section gap     │
│                  │                      │
└──────────────────┴──────────────────────┘
```

| 层级 | 间距策略 | 视觉权重 |
|------|---------|---------|
| Header | `--space-section` 上 | 最大 |
| Main Content | `--space-group` 内 | 核心 |
| Question List | `--space-item` 间 | 次要 |

---

### 3.4 打破 Identical Card Grid

**问题**：TopicList 使用 5 列相同卡片重复

**方案**：混合布局 + 视觉变化

```
┌─────────────────────────────────────────────────────┐
│ Topic Cards（不使用 grid，使用 flex-wrap）            │
│                                                      │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐     │
│  │Hometown│  │ School │  │ Work   │  │Tech    │     │
│  │card    │  │card    │  │card    │  │card    │     │
│  └────────┘  └────────┘  └────────┘  └────────┘     │
│     ↓           ↓           ↓           ↓           │
│  ┌────────┐  ┌────────┐  ┌────────┐                 │
│  │Friends │  │...     │  │...     │                 │
│  │card    │  │card    │  │card    │                 │
│  └────────┘  └────────┘  └────────┘                 │
│                                                      │
│ 变化：卡片间 16px gap，每两行一个 [Section Break]   │
│ Section Break: 24px + 视觉分隔线                     │
└─────────────────────────────────────────────────────┘
```

实现：
```tsx
// 移除 grid，改用 flex-wrap
<div className="flex flex-wrap gap-4">
  {topics.map(...)}
</div>
```

Section Break 插入（每 6-8 个卡片）：
```tsx
{index % 6 === 0 && index > 0 && (
  <div className="w-full h-px bg-gray-200 my-6" />
)}
```

---

### 3.5 Rhythm 优化

**问题**：所有间距相同

**方案**：紧/松节奏对比

| 区域 | 间距 | 节奏 |
|------|------|------|
| 标签组 | 8px（gap-2） | 紧凑 |
| 问题列表项 | 16px（gap-4） | 中等 |
| 段落间 | 24px（gap-6） | 宽松 |
| 区域分离 | 48px（gap-12） | 慷慨 |

---

### 3.6 移动端问题列表

**问题**：顶部水平滚动过于紧凑

**方案**：底部预览条 + Bottom Sheet

```
移动端新布局：
┌────────────────────┐
│ ← Hometown ● 2/5   │
├────────────────────┤
│                    │
│   [文章内容]        │
│                    │
│                    │
├────────────────────┤
│ Next Question →    │ ← 底部预览条（可展开）
└────────────────────┘
```

点击底部预览条 → 展开 Bottom Sheet 显示完整问题列表

---

## 4. 实施计划

| 阶段 | 内容 | 优先级 |
|------|------|-------|
| **V6.1** | 颜色系统 Token 定义 + 主题化迁移 | 高 |
| **V6.2** | TopicList 颜色应用 | 高 |
| **V6.3** | PracticePage 颜色应用 | 高 |
| **V6.4** | Spacing System + 语义化 Token | 中 |
| **V6.5** | TopicList 打破 Card Grid | 中 |
| **V6.6** | 移动端 Bottom Sheet | 低 |

---

## 5. 需求完整性检查

| 需求来源 | 问题 | PRD 章节 | 状态 |
|---------|------|---------|------|
| Layout 分析 | 间距节奏单调 | 3.2 Spacing System | ✅ |
| Layout 分析 | 层级区分不清 | 3.3 Visual Hierarchy | ✅ |
| Layout 分析 | Identical Card Grid | 3.4 打破 Card Grid | ✅ |
| Layout 分析 | Rhythm 单调 | 3.5 Rhythm 优化 | ✅ |
| Layout 分析 | 移动端问题列表 | 3.6 移动端问题列表 | ✅ |
| Colorize 分析 | 颜色偏功能性 | 3.1 颜色系统 | ✅ |
| Colorize 分析 | 纯灰背景冰冷 | 3.1 暖调中性灰 | ✅ |
| Colorize 分析 | 颜色应用分散 | 3.1.3 分页级应用 | ✅ |
| Colorize 分析 | 缺少温暖鼓励 | 3.1.2 颜色应用策略 | ✅ |

---

## 6. 需求冲突检查

| 潜在冲突 | 涉及章节 | 冲突检查 | 结果 |
|---------|---------|---------|------|
| `flex-wrap` vs `gap-4` | 3.4 | flex 使用 gap，无冲突 | ✅ |
| OKLCH vs Tailwind Token | 3.1.1 | OKLCH 定义为 CSS var，Tailwind 引用 var | ✅ |
| Spacing Token vs Tailwind | 3.2 | Token 用 var，Tailwind 可封装 | ✅ |
| 移动端预览条 vs Bottom ControlBar | 3.6 | 预览条在内容底部，ControlBar 固定底部，位置重叠 | ⚠️ |

---

## 7. 冲突解决方案

**冲突 1：移动端预览条与 Bottom ControlBar 位置重叠**

**问题**：两者都位于页面底部固定

**方案**：预览条在 BottomControlBar 上方，形成双层结构

```
┌────────────────────┐
│   [文章内容]        │
├────────────────────┤
│ Next Question →    │ ← 预览条（可点击展开 Sheet）
├────────────────────┤
│ [▶ Listen] [● Rec] │ ← BottomControlBar（固定）
└────────────────────┘
```

**交互规则**：
- Reading Mode：预览条可见，点击展开 Sheet
- Training Mode：预览条隐藏，BottomControlBar 展开
- Bottom Sheet 展开：覆盖 BottomControlBar

---

## 8. 验证标准

- Squint test：眯眼能识别主要、次要内容和分组
- Rhythm：页面有令人愉悦的紧/松节奏
- Hierarchy：2 秒内识别最重要的内容
- Breathing room：布局舒适，不拥挤也不浪费
- Consistency：间距系统统一应用
- Responsiveness：跨屏幕优雅适应
- Color warmth：界面传递温暖鼓励情绪

---

## 9. 不变项

- 底部控件栏的交互逻辑
- Audio-First 核心原则
- 主题化 Token 系统
- 状态流转机制