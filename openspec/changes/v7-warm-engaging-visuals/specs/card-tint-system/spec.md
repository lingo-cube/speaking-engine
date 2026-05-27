## ADDED Requirements

### Requirement: 卡片 tint 混合系统

The system SHALL provide a tinting mechanism for cards that blends the primary color with white at configurable intensities.

#### Scenario: Hover tint 混合

**WHEN** user hovers over a card
**THEN** system SHALL mix 30% primary color with 70% white
**AND** resulting color SHALL be applied as card background

#### Scenario: Selected 全背景主色

**WHEN** card is selected
**THEN** system SHALL apply 100% primary color as card background
**AND** text color SHALL be white for contrast

#### Scenario: Tint 强度配置

**WHEN** developer customizes `--card-tint-hover` token
**THEN** hover tint intensity SHALL scale accordingly (range: 0.0–1.0)

#### Scenario: 浏览器不支持 color-mix

**WHEN** browser doesn't support `color-mix()`
**THEN** system SHALL fallback to solid color (primary or white)

---

## MODIFIED Requirements

无

---

## REMOVED Requirements

无