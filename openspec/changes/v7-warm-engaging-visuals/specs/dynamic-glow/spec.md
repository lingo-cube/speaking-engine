## ADDED Requirements

### Requirement: 动态光晕组件

The system SHALL provide a fixed-position glow effect in the top-right corner of the viewport.

#### Scenario: 默认绿色光晕（Reading Mode）

**WHEN** user is in Reading mode
**THEN** system SHALL render a green glow in top-right corner
**AND** glow color SHALL be `oklch(90% 0.12 145)`
**AND** glow SHALL be positioned at right: 20px, top: -10% offset

#### Scenario: 橙色光晕（Training Mode）

**WHEN** user enters Training mode
**THEN** system SHALL switch glow color to orange (`oklch(90% 0.12 50)`)
**AND** glow position SHALL remain at top-right

#### Scenario: 光晕大小配置

**WHEN** developer customizes `--bg-glow-size` token
**THEN** glow radius SHALL scale accordingly (default 600px)

#### Scenario: 性能优化

**WHEN** user device has reduced-motion preference
**THEN** system SHALL disable glow animation (or use a static element)

---

## MODIFIED Requirements

无

---

## REMOVED Requirements

无