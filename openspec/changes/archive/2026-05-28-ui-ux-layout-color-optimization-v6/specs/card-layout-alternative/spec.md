## ADDED Requirements

### Requirement: TopicList 不使用 identical card grid

系统 SHALL 移除 TopicList 的 grid 卡片布局，改用 flex-wrap 布局。

#### Scenario: 卡片流式布局
- **WHEN** 用户浏览 TopicListPage
- **THEN** Topic 卡片使用 flex-wrap 布局，每行卡片数量自适应

#### Scenario: 卡片间距
- **WHEN** Topic 卡片流式排列
- **THEN** 卡片间使用 16px gap

### Requirement: Section Break 视觉变化

系统 SHALL 在每 6-8 个 Topic 卡片后插入 Section Break，提供视觉变化。

#### Scenario: Section Break 插入
- **WHEN** Topic 卡片数量达到 Section Break 阈值（6-8 个）
- **THEN** 系统插入一个分隔线（24px 间距 + 视觉分隔线）

#### Scenario: 分隔线颜色
- **WHEN** Section Break 分隔线显示
- **THEN** 使用暖调中性灰 Token `surface-200` 而非纯灰