## ADDED Requirements

### Requirement: 问题列表与主内容 2 层层级结构

系统 SHALL 建立问题列表（次要）与主内容（核心）的 2 层清晰层级结构。

#### Scenario: 问题列表视觉权重
- **WHEN** 用户在桌面端浏览 PracticePage
- **THEN** 问题列表使用较小间距（`--space-item`）和较小视觉权重

#### Scenario: 主内容视觉权重
- **WHEN** 用户浏览 PracticePage 主内容区域
- **THEN** 主内容使用较大间距（`--space-group`）和较大视觉权重

#### Scenario: Header 层级
- **WHEN** 用户查看页面 Header
- **THEN** Header 使用最大间距（`--space-section` 上）和最大视觉权重

### Requirement: 层级通过间距达成

系统 SHALL 使用间距而非额外装饰强化层级，保持简洁。

#### Scenario: 层级识别
- **WHEN** 用户眯眼查看页面
- **THEN** 能识别主要、次要内容和分组