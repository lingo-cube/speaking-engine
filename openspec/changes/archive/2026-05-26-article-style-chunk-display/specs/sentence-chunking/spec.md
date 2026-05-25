## MODIFIED Requirements

### Requirement: Display sentence chunks in order
The system SHALL display the teacher sample answer split into sentence-level chunks in sequential order as a continuous, readable article. Each sentence SHALL be visually separated with subtle spacing while maintaining the overall passage flow.

#### Scenario: User views an answer
- **WHEN** the user opens a question's sample answer
- **THEN** the system displays all sentence chunks as inline sentences forming a continuous article with paragraph-level typography, not as isolated cards

## ADDED Requirements

### Requirement: Each sentence is independently clickable
The system SHALL make each sentence in the article independently clickable to activate training mode for that sentence.

#### Scenario: User interacts with a specific sentence
- **WHEN** the user taps sentence 2 in the article
- **THEN** the training drawer opens with audio and recording controls for sentence 2, and sentence 2 is highlighted
