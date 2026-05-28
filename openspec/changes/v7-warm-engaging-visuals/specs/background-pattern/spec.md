## ADDED Requirements

### Requirement: 背景图案系统支持网格背景

The system SHALL provide CSS utilities for rendering a grid pattern background with configurable opacity and grid size.

#### Scenario: 基础网格背景

**WHEN** page loads or component mounts
**THEN** system SHALL render a 40x40px grid pattern using `surface-200` color
**AND** grid line opacity SHALL be 0.3
**AND** base background SHALL be `surface-50`

#### Scenario: 自定义网格大小

**WHEN** developer customizes `--bg-grid-size` token
**THEN** grid spacing SHALL scale accordingly (e.g., `32px` or `48px`)

---

## MODIFIED Requirements

无

---

## REMOVED Requirements

无