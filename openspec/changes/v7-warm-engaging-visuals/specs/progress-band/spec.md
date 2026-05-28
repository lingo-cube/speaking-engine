## ADDED Requirements

### Requirement: 三色渐变进度条

The system SHALL provide a progress bar component that transitions through three colors (primary → tertiary → accent) as progress increases.

#### Scenario: 0% 进度

**WHEN** progress is 0%
**THEN** progress bar SHALL show 100% primary color (green)
**AND** gradient SHALL appear as single-color block

#### Scenario: 50% 进度

**WHEN** progress is 50%
**THEN** gradient SHALL be evenly split between primary and tertiary (50% green, 50% orange)

#### Scenario: 100% 进度

**WHEN** progress is 100%
**THEN** gradient SHALL transition completely to accent (teal)
**AND** primary color SHALL be completely replaced by accent

#### Scenario: 动态进度更新

**WHEN** progress updates (e.g., chunk playback)
**THEN** gradient gradient SHALL smoothly shift without jumping

#### Scenario: 视觉高度

**WHEN** progress bar is displayed
**THEN** height SHALL be 4px
**AND** border-radius SHALL be 2px

---

## MODIFIED Requirements

无

---

## REMOVED Requirements

无