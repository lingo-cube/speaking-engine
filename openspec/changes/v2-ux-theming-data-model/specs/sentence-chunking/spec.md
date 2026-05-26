## MODIFIED Requirements

### Requirement: Display sentence chunks in order
The system SHALL display all sentence chunks as a continuous, readable article. When a sentence is selected by tapping, it SHALL be highlighted and the bottom control bar SHALL expand to show Listen and Record buttons for that sentence.

#### Scenario: User taps a sentence
- **WHEN** the user taps sentence 2 in the article
- **THEN** sentence 2 is highlighted and the bottom control bar shows Listen and Record buttons for sentence 2

### Requirement: Each sentence is independently clickable
The system SHALL make each sentence in the article independently clickable to select it for training. Tapping a selected sentence SHALL deselect it and collapse the bottom bar controls.

#### Scenario: User taps active sentence to deselect
- **WHEN** the user taps the currently selected sentence
- **THEN** the sentence deselects, highlighting is removed, and Listen/Record buttons disappear

### Requirement: Paragraph grouping via paragraph field
The system SHALL group consecutive chunks with the same `paragraph` value into visual paragraphs with clear spacing between groups.

#### Scenario: Chunks in same paragraph flow continuously
- **WHEN** chunks 1, 2, and 3 all have `paragraph: 1`
- **THEN** they are displayed as a continuous text block with no extra spacing between them

#### Scenario: Chunks in different paragraphs have visual separation
- **WHEN** chunk 3 has `paragraph: 1` and chunk 4 has `paragraph: 2`
- **THEN** there is a visible paragraph-level spacing gap (16px) between chunk 3 and chunk 4
