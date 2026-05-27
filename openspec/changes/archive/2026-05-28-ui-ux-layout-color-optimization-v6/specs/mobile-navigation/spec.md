## ADDED Requirements

### Requirement: 移动端底部预览条

系统 SHALL 在移动端提供底部预览条，显示下一题信息。

#### Scenario: 预览条显示
- **WHEN** 用户在移动端 Reading Mode 浏览问题
- **THEN** 底部显示 "Next Question →" 预览条

### Requirement: 预览条点击交互

系统 SHALL 支持预览条点击展开 Bottom Sheet。

#### Scenario: 点击展开 Sheet
- **WHEN** 用户点击移动端底部预览条
- **THEN** 系统展开 Bottom Sheet 显示完整问题列表

### Requirement: Bottom Sheet 双层结构

系统 SHALL 实现预览条与 BottomControlBar 的双层结构，避免位置冲突。

#### Scenario: Reading Mode 双层显示
- **WHEN** 用户在移动端 Reading Mode
- **THEN** 预览条在 BottomControlBar 上方显示

#### Scenario: Training Mode 单层显示
- **WHEN** 用户在移动端 Training Mode
- **THEN** 预览条隐藏，BottomControlBar 占据底部

#### Scenario: Bottom Sheet 覆盖
- **WHEN** Bottom Sheet 展开
- **THEN** Sheet 覆盖 BottomControlBar

### Requirement: Bottom Sheet 关闭机制

系统 SHALL 支持 Bottom Sheet 关闭，可通过点击外部区域或下滑手势关闭。

#### Scenario: 外部点击关闭
- **WHEN** 用户点击 Bottom Sheet 外部区域
- **THEN** Sheet 关闭，预览条恢复显示

#### Scenario: 下滑关闭
- **WHEN** 用户在 Bottom Sheet 上执行下滑手势
- **THEN** Sheet 关闭