# Speaking Engine — Audio-First Shadowing Session UI PRD（V1）

## 1. 产品目标

将 Full Answer Mode 从"阅读式学习页面"升级为"Audio-First Speaking Experience"。

## 2. 设计原则

- **Audio First**: 核心入口是播放，不是阅读/操作
- **Content First**: 答案像真正文章，不是句子卡片堆叠
- **Chunk Hidden but Existing**: Chunk 支撑训练但不破坏阅读体验
- **Immersive State**: 用户感觉进入口语训练，不是后台管理系统
- **Typography Driven**: 高级感来自字体、留白、节奏

## 3. 页面结构

Header → Question (48px/700) → Framework Tags → Article (28px/400, line-height 1.9, max-width 720px) → Centered Audio Player → Shadowing CTA

## 4. 排版规格

- Question: 48px, font-weight 700, line-height 1.2
- Body: 28px, font-weight 400, line-height 1.9, max-width 720px
- Paragraph spacing: margin-bottom 32px
- Framework tags: 14px, pill style, low priority

## 5. Audio Player（核心）

- 底部居中圆形播放按钮 ▶
- 播放中：环形进度条 + ⏸ + 时间 00:32/00:32
- 完成：✓
- 播放时当前 chunk 出现 subtle glow 高亮，自动推进
- 播完后出现 "Start Shadowing" CTA

## 6. Chunk 表现

- Inline chunk，默认近似普通文本
- Hover 轻背景
- Playing 时 subtle glow
- 禁止大面积色块和重边框

## 7. 状态机

Idle → Playing → Completed → ShadowingMode

## 8. 视觉参考

Spotify Podcast Transcript、Medium、Apple Podcast、Notion Reading Layout
