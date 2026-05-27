## Why

当前界面存在布局和颜色问题：间距节奏单调、层级区分不清、卡片布局重复、移动端交互不友好、颜色缺乏温暖感。目标是升级为温暖鼓励、呼吸感与节奏感并存的专业级学习界面。

---

## What Changes

- **颜色系统**：引入 OKLCH 色彩空间，建立成长绿 + 活力橙 + 专业青调色板，添加暖调中性灰，提供浏览器兼容性回退
- **Spacing System**：建立语义化间距 Token（section/group/item/tight），创建紧/松节奏对比
- **Visual Hierarchy**：强化问题列表与主内容的 2 层层级结构
- **TopicList 布局**：移除 grid 卡片，改用 flex-wrap + section breaks
- **移动端导航**：底部预览条 + Bottom Sheet，替代顶部水平滚动

---

## Capabilities

### New Capabilities

- **color-system**: OKLCH 颜色系统与浏览器回退方案
- **spacing-system**: 语义化间距 Token 系统
- **visual-hierarchy**: 层级强化布局结构
- **card-layout-alternative**: 灵活 TopicList 布局
- **mobile-navigation**: 移动端底部预览条与 Bottom Sheet

### Modified Capabilities

- **不涉及现有能力的需求变更**：此变更为纯 UI/UX 改进，不影响业务逻辑和 API

---

## Impact

- **代码范围**：`frontend/src/` 下的组件和样式文件
- **依赖变更**：无新增依赖（Tailwind 已支持 OKLCH 和 clamp）
- **向后兼容**：浏览器回退方案确保旧版浏览器可正常使用（颜色降级为 RGB）
- **性能影响**：无（CSS 变量替换现有硬编码）