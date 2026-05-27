## Context

**当前状态**：
- 颜色：`#58CC02` (功能绿) + `#FF4B4B` (错误红) + `#FFC800` (高亮黄)，纯灰背景 `#f8fafc`
- 布局：`space-y-4`、`gap-4` 重复使用，5 列 grid 卡片重复，移动端顶部水平滚动
- 问题列表与主内容层级不清，间距节奏单调

**约束**：
- 不改变业务逻辑和 API
- 不新增依赖
- Tailwind 已支持 OKLCH 和 clamp
- 移动端双指手势不影响 BottomControlBar

---

## Goals / Non-Goals

**Goals**：
- 建立 Committed 颜色策略（30-60% 表面由主导色承担）
- 创建 OKLCH 颜色系统 + 浏览器回退方案
- 建立语义化间距 Token 系统（section/group/item/tight）
- 强化问题列表与主内容的 2 层层级结构
- 移除 TopicList identical card grid，改用 flex-wrap + section breaks
- 实现移动端底部预览条 + Bottom Sheet 导航

**Non-Goals**：
- 不改变底部控件栏的交互逻辑
- 不改变 Audio-First 核心原则
- 不新增主题化以外的 Token

---

## Decisions

### 颜色策略选择

**决定**：使用 Committed 颜色策略，30-60% 表面由主导色承担

**理由**：
- Restrained（≤10% accent）过于冷淡，不符合"温暖鼓励"的定位
- 学习网站需要情感化色彩传递成长和鼓励
- 成熟学习网站（Duolingo、Coursera）都采用较高颜色饱和度

**替代考虑**：
- Restrained：被否决，过于功能化
- Full palette/Drenched：被否决，颜色过多会分散注意力

### OKLCH vs HSL 选择

**决定**：使用 OKLCH 色彩空间

**理由**：
- OKLCH 是感知均匀的，同等亮度的变化看起来相等
- 现代浏览器（Chrome 111+, Safari 15.4+, Firefox 113+）已支持
- 提供浏览器回退方案

**替代考虑**：
- HSL：被否决，感知不均匀，色相环不连续
- RGB：被否决，难以产生和谐的色板

### Spacing Token 命名

**决定**：使用语义化命名（section/group/item/tight）而非像素值

**理由**：
- 语义化命名更易理解和维护
- 支持响应式调整（使用 clamp）

### 移动端导航冲突解决

**决定**：双层结构 + 交互规则

**冲突**：预览条与 BottomControlBar 都位于底部

**方案**：
- Reading Mode：预览条在 BottomControlBar 上方
- Training Mode：预览条隐藏，BottomControlBar 展开
- Bottom Sheet 展开：覆盖 BottomControlBar

---

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| OKLCH 兼容性 | 提供 `@supports` 回退方案 |
| 颜色策略可能过于鲜艳 | 通过用户测试和迭代调整 |
| 移动端双层结构复杂度 | 明确交互规则，减少歧义 |
| Section Break 分割时机 | 每 6-8 个卡片插入，根据实际调整 |

**Trade-offs**：
- flex-wrap vs grid：flex 更灵活但响应式控制不如 grid 精细
- 移动端 Bottom Sheet vs Modal：Sheet 性能更好但实现较复杂

---

## Migration Plan

**步骤**：
1. 创建 `frontend/src/tokens.css`（颜色 + 间距 Token）
2. 更新 `frontend/src/index.css` 引入 tokens.css
3. 更新组件使用新 Token
4. 新增 `BottomSheet` 组件
5. 测试新旧浏览器兼容性

**回滚策略**：
- Git 恢复到变更前的 commit
- 回退方案确保旧版浏览器功能不受影响

---

## Open Questions

- Section Break 是否需要视觉图标分隔线？（纯 CSS 足够？）
- Bottom Sheet 是否需要阻尼效果？（使用原生 scroll 平滑即可？）