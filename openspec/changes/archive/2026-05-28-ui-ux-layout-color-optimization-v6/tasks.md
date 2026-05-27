## 1. Setup

- [x] 1.1 创建 frontend/src/tokens.css
- [x] 1.2 在 frontend/src/index.css 引入 tokens.css（@import 或 @layer）

## 2. Color System

- [x] 2.1 定义 OKLCH 颜色 Token（primary/primary-hover/primary-light/primary-dark）
- [x] 2.2 定义辅助色 Token（tertiary/tertiary-light/tertiary-dark）
- [x] 2.3 定义强调色 Token（accent/accent-light）
- [x] 2.4 定义语义色 Token（success/danger/warning/info）
- [x] 2.5 定义暖调中性灰 Token（surface-50/100/200/500/900）
- [x] 2.6 定义 RGB 回退值
- [x] 2.7 实现 @supports not (color: oklch(0% 0 0)) 兼容性回退

## 3. Spacing System

- [x] 3.1 定义 --space-section Token（clamp(48px, 8vw, 96px)）
- [x] 3.2 定义 --space-group Token（clamp(24px, 4vw, 48px)）
- [x] 3.3 定义 --space-item Token（clamp(12px, 2vw, 24px)）
- [x] 3.4 定义 --space-tight Token（clamp(6px, 1vw, 12px)）

## 4. Visual Hierarchy

- [x] 4.1 更新 TopicListPage Header 使用 --space-section 上边距
- [x] 4.2 更新 PracticePage 侧栏问题列表项使用 --space-item gap
- [x] 4.3 更新 ArticleView 文章卡片使用 --space-group 内间距

## 5. TopicList Layout

- [x] 5.1 移除 TopicList grid 布局（删除 grid-cols-* classes）
- [x] 5.2 实现 flex-wrap 布局（添加 flex flex-wrap gap-4）
- [x] 5.3 实现 Section Break（每 6 个卡片插入分隔线）
- [x] 5.4 更新分隔线使用 --color-surface-200 或暖调灰类

## 6. Mobile Navigation

- [x] 6.1 创建 BottomSheet 组件
- [x] 6.2 实现 BottomSheet 打开/关闭逻辑
- [x] 6.3 创建底部预览条组件
- [x] 6.4 实现预览条点击展开 Bottom Sheet
- [x] 6.5 实现 Reading Mode 双层显示（预览条 + BottomControlBar）
- [x] 6.6 实现 Training Mode 单层显示（隐藏预览条，BottomControlBar 展开）
- [x] 6.7 实现 Bottom Sheet 覆盖 BottomControlBar

## 7. Integration & Testing

- [x] 7.1 更新现有组件使用新颜色 Token
- [x] 7.2 更新现有组件使用新间距 Token
- [x] 7.3 测试现代浏览器 OKLCH 渲染
- [x] 7.4 测试旧版浏览器 RGB 回退
- [x] 7.5 测试移动端预览条交互
- [x] 7.6 测试移动端 Bottom Sheet 交互
- [x] 7.7 验证预览条与 BottomControlBar 双层结构

## 8. Cleanup

- [x] 8.1 移除前端代码中遗留的硬编码颜色
- [x] 8.2 移除前端代码中遗留的硬编码间距
- [x] 8.3 删除未使用的临时样式文件