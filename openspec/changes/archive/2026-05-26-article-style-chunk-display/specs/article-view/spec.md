## ADDED Requirements

### Requirement: Display chunks as continuous article
The system SHALL display all sentence chunks as a continuous, readable passage with natural paragraph-level spacing between sentences.

#### Scenario: User views an answer
- **WHEN** the user opens a question's sample answer
- **THEN** all sentence chunks are displayed as inline text forming a coherent article with standard paragraph spacing

#### Scenario: Answer has multiple chunks
- **WHEN** an answer has 5 sentence chunks
- **THEN** the 5 sentences appear as a continuous passage, not as separate cards

### Requirement: Visual sentence separation
The system SHALL visually separate sentences with subtle spacing so users can distinguish individual sentences while reading the passage as a whole.

#### Scenario: User reads the article
- **WHEN** the article is displayed
- **THEN** each sentence has slight bottom padding (0.5em) to visually delineate sentences without breaking the reading flow

### Requirement: Active sentence highlighting during training
The system SHALL highlight the currently selected sentence for training with a distinct visual indicator while keeping surrounding sentences readable.

#### Scenario: User selects a sentence for training
- **WHEN** the user taps a sentence in the article
- **THEN** that sentence receives a highlighted background (light primary color) and surrounding sentences remain in normal article style

### Requirement: Click sentence to activate training
The system SHALL allow users to click any sentence in the article to activate shadowing training for that sentence.

#### Scenario: User clicks a sentence
- **WHEN** the user clicks sentence 3 in the article
- **THEN** the training drawer opens with audio and recording controls for sentence 3

#### Scenario: User clicks a different sentence
- **WHEN** the training drawer is open for sentence 3 and the user clicks sentence 2
- **THEN** the drawer switches to show controls for sentence 2 and sentence 2 becomes highlighted

#### Scenario: User clicks the active sentence again
- **WHEN** the user clicks the currently active sentence
- **THEN** the training drawer closes and no sentence is highlighted
