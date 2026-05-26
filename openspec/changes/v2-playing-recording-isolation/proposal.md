## Why

V2.1 底部栏训练模式下 Listen 和 Record 按钮挤在同一行，录音完成后 Play + Re-record 在半个按钮宽度内无法正常展示。播放按钮附带进度条对短句无意义。底部栏重复显示已高亮的句子文本纯属冗余。段落无缩进影响阅读节奏。需要操作分区隔离、视觉去冗余、排版优化。

## What Changes

- **Modified**: 段落增加 `text-indent: 2em` 首行缩进
- **Modified**: 聆听区和录音区分离为两个独立全宽卡片，垂直堆叠
- **Modified**: 按钮改为纯图标（▶/⏸ 播放，🎤/⏹/▶ 录音），移除文字标签和进度条
- **Removed**: 底部栏训练模式下不再重复显示已选句子文本
- **Removed**: NextQuestionBar 组件（桌面侧栏 + 移动顶栏 ◀▶ 已覆盖）

## Capabilities

### Modified Capabilities

- `bottom-control-bar`: 训练模式重构为双卡片分区布局，纯图标按钮，移除句子文本预览
- `article-view`: 段落首行缩进

### Removed Capabilities

- `next-question-flow`: NextQuestionBar 移除，导航通过侧栏/顶栏 ◀▶ 完成

## Impact

- **前端组件**: BottomControlBar 训练模式重构；ArticleContent 加缩进；删除 NextQuestionBar
- **页面**: PracticePage 移除 NextQuestionBar 引用
- **无后端变更**
