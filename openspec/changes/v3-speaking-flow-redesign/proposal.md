## Why

V2 的底部控件栏方案存在根本性 UX 问题：聆听和录音按钮始终并排，播放时不想看到录音、录音时不想看到播放；底部重复显示已高亮的句子文本；全文播放与句子练习的过渡需要用户手动操作；按钮附带文字和进度条对短句无意义。需要一次从"功能罗列"到"流程驱动"的交互重构。

## What Changes

- **New**: 全文播放圆形按钮 + 圆形进度环 — 阅读模式下底部中央一个圆形 ▶ 按钮，播放时出现圆形进度环和时间
- **New**: 模态互斥播放/录音 — 点击 ▶ 播放时录音按钮隐藏，点击 🎤 录音时播放按钮隐藏
- **New**: 自动流程推进 — 全文播完自动进入句子练习模式，首句已就位
- **New**: 圆点进度导航 — 练习模式下 ●○○○○ 显示当前句位置，可点击跳转
- **New**: 录音完成后专用操作区 — ▶ 播放我的录音、🎤 重录、↻ 重听原音
- **Modified**: 底部栏精简 — 训练模式不重复句子文本，按钮纯图标
- **Removed**: NextQuestionBar、按钮文字标签、句子播放进度条

## Capabilities

### New Capabilities

- `circular-playback`: 圆形播放按钮 + 环形进度条 + 时间显示，全文播放专用
- `modal-training-mode`: 模态互斥的播放/录音训练模式，自动状态流转

### Modified Capabilities

- `bottom-control-bar`: 重构为三模式（阅读 / 练习 / 录音完成），纯图标，分区隔离
- `sentence-chunking`: 练习模式圆点导航，可点击跳转句子

### Removed Capabilities

- `next-question-flow`: NextQuestionBar 移除

## Impact

- **前端组件**: BottomControlBar 大幅重构；新建 CircularPlayButton；SentenceLine 不变；移除 NextQuestionBar
- **页面**: PracticePage 移除 NextQuestionBar
- **无后端变更**
