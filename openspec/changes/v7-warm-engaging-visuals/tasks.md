## 1. Setup

- [x] 1.1 创建 `frontend/src/styles/` 目录
- [x] 1.2 更新 `tokens.css` 新增 V7 Token（grid/glow/tint）
- [x] 1.3 更新 `index.css` 引入新样式目录

## 2. 背景系统

- [x] 2.1 创建 `frontend/src/styles/background-pattern.css`（网格背景类）
- [x] 2.2 创建 `frontend/src/styles/dynamic-glow.css`（光晕组件样式）
- [x] 2.3 更新 `index.css` 引入背景样式

## 3. 卡片色彩化

- [x] 3.1 更新 `TopicCard.tsx` 添加 tint 混合（hover/selected）
- [x] 3.2 更新 `PracticePage.tsx` 问题列表色彩化
- [x] 3.3 更新 `index.css` 添加 `.bg-grid-pattern` 类

## 4. 进度光带

- [x] 4.1 创建 `frontend/src/components/ProgressBand.tsx` 组件
- [x] 4.2 更新 `ArticleView.tsx` 集成进度光带（传入 progress 参数）
- [x] 4.3 更新 ArticleView 传递 progress 到 ProgressBand

## 5. 庆祝动画

- [x] 5.1 引入 `canvas-confetti` 依赖
- [x] 5.2 创建 `frontend/src/components/CelebrationConfetti.tsx` 组件
- [x] 5.3 更新相关组件触发动画（完成时）

## 6. 动画微交互

- [x] 6.1 更新 `TopicCard.tsx` 悬停样式（scale + shadow）
- [x] 6.2 更新 `PracticePage.tsx` 侧栏悬停样式
- [x] 6.3 更新 `index.css` 添加 ease-out 过渡

## 7. 集成测试

- [x] 7.1 验证网格背景（浏览器中查看）
- [x] 7.2 验证光晕效果（Reading/Training 模式切换）
- [x] 7.3 验证卡片 tint（TopicCard hover/selected）
- [x] 7.4 验证进度光带（三色渐变）
- [ 7.5 验证庆祝动画（完成练习后触发）

## 8. Cleanup

- [x] 8.1 移除临时调试代码
- [x] 8.2 验证无 console 错误