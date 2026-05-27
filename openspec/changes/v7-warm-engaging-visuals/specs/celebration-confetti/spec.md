## ADDED Requirements

### Requirement: 粒子爆炸庆祝动画

The system SHALL provide a confetti celebration effect triggered when user completes a Shadowing practice.

#### Scenario: 完成触发

**WHEN** user completes all sentences in a question
**THEN** system SHALL trigger confetti explosion animation
**AND** animation SHALL last for 1.2 seconds
**AND** animation SHALL NOT block user interactions

#### Scenario: 三色分布

**WHEN** confetti spawns
**THEN** colors SHALL be distributed as: 60% green, 30% orange, 10% teal
**AND** each confetti piece SHALL be randomly sized and rotated

#### Scenario: 可选禁用

**WHEN** developer sets `--celebration-enabled: false`
**THEN** celebration animation SHALL be disabled

#### Scenario: 性能优化

**WHEN** user device has reduced-motion preference
**THEN** animation SHALL be skipped

---

## MODIFIED Requirements

无

---

## REMOVED Requirements

无