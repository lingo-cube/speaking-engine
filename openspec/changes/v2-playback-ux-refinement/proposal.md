## Why

V2 底部控件栏虽然将 Listen/Record 集中到底部，但存在三个问题：1) 全文播放和单句播放可同时发声，交互逻辑混乱；2) 句子点阵进度条 `●●●○` 无时间信息，用户不知道还要播多久；3) 练习模式和阅读模式没有清晰的切换机制。同时移动端问题列表与文章展示重复，Topic 选择占据过多视觉权重。需要在播放交互、学习流、视觉体验三个层面做一次闭环优化。

## What Changes

- **Modified**: 底部栏双模式 — 阅读模式（全文播放）↔ 练习模式（Listen + Record + [×]），模式切换清晰
- **Modified**: 播放互斥 — 启动全文 → 自动停止单句，启动单句 → 自动停止全文
- **Modified**: 进度条从句子点阵改为真实音频进度条 `████░░ 65% 0:08/0:15`
- **Modified**: 句子选中从实色背景改为半透明叠加 + 左侧竖条指示器
- **Modified**: 桌面端保持侧栏问题导航，移动端底部预览条 + bottom sheet
- **Modified**: Topic 从首页降级为顶栏标签下拉，PracticePage 作为主页面
- **New**: 下一题底部预览条（移动端）— 显示下一题标题 + [→ Next]

## Capabilities

### New Capabilities

- `playback-mode-switching`: 底部栏阅读/练习双模式，[×] 关闭回到阅读
- `next-question-flow`: 下一题底部预览条 + 桌面侧栏直接跳转

### Modified Capabilities

- `bottom-control-bar`: 双模式状态机、互斥播放、真实进度条
- `sentence-chunking`: 句子选中改为半透明叠加 + 左边条
- `question-display`: 问题融入文章卡片头部，移除独立 QuestionCard

## Impact

- **前端组件**: BottomControlBar 重构（双模式、互斥播放、进度条）；SentenceLine 视觉更新；ArticleCard 整合问题信息；新增 NextQuestionBar（移动端）；新增 TopicDropdown；移除 QuestionCard
- **页面**: PracticePage 简化布局；TopicListPage 保留为二级页面
- **无后端变更**
