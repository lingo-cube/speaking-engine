## ADDED Requirements

### Requirement: 语义化间距 Token

系统 SHALL 定义语义化间距 Token，包括 section、group、item、tight 四个级别。

#### Scenario: 区域分离使用 section Token
- **WHEN** 页面需要分离不同区域（如 Header → Main）
- **THEN** 使用 `--space-section` Token（48-96px，使用 clamp 流式间距）

#### Scenario: 分组分离使用 group Token
- **WHEN** 卡片间或段落间需要分离
- **THEN** 使用 `--space-group` Token（24-48px，使用 clamp 流式间距）

#### Scenario: 元素间距使用 item Token
- **WHEN** 标题与内容、列表项间需要间距
- **THEN** 使用 `--space-item` Token（12-24px，使用 clamp 流式间距）

#### Scenario: 紧凑分组使用 tight Token
- **WHEN** 标签组、按钮组需要紧密排列
- **THEN** 使用 `--space-tight` Token（6-12px，使用 clamp 流式间距）

### Requirement: 紧/松节奏对比

系统 SHALL 应用紧/松节奏对比，避免所有间距相同。

#### Scenario: 节奏变化
- **WHEN** 页面存在不同分组级别的内容
- **THEN** 使用不同级别的间距 Token 创造视觉节奏