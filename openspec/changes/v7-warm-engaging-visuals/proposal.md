## Why

V6 实现了基础的 OKLCH 颜色系统和语义化间距，但界面仍显"功能可用"：背景纯色无故事性、卡片全白缺乏视觉节奏、没有庆祝/鼓励反馈。在 V6 基础上升级为"温暖鼓励、活力并存"的成人学习界面，为用户提供更强的情感支持。

---

## What Changes

- **背景系统升级**：网格图案背景 + 右上角动态光晕（Reading/Training 不同色调）
- **卡片色彩化**：TopicCard 选中全背景主色、问题列表选中全背景主色、卡片 tint 强度控制
- **进度光带**：ArticleView 卡片顶部三色渐变进度条（绿→橙→青）
- **庆祝动画**：完成 Shadowing 练习时粒子爆炸动画（三色分布）
- **动画微交互**：悬停 scale + shadow、状态过渡 ease-out

---

## Capabilities

### New Capabilities

- **background-pattern**: 网格图案背景类，支持透明度配置
- **dynamic-glow**: 固定定位光晕组件，支持模式切换色调
- **card-tint-system**: 卡片 tint 混合系统（hover/selected 不同强度）
- **progress-band**: 三色渐变进度条组件
- **celebration-confetti**: 粒子爆炸庆祝动画组件

### Modified Capabilities

- **topic-list**: TopicCard 色彩化、Category Pills 选中全背景
- **practice-layout**: 问题列表侧栏半透背景、ArticleView 新增进度光带
- **animation-interactions**: 悬停/状态过渡动画

---

## Impact

- **代码范围**：`frontend/src/` 下的组件、样式文件、tokens.css
- **依赖变更**：可能引入 `canvas-confetti` 或类似库（粒子动画）
- **向后兼容**：浏览器回退方案继续有效，无 API 变更
- **性能影响**：网格背景和光晕使用 CSS，性能影响极小