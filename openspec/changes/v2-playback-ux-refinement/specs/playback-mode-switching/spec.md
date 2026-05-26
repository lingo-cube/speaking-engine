## ADDED Requirements

### Requirement: Bottom bar has two modes — reading and training
The system SHALL display the bottom bar in reading mode when no sentence is selected, and in training mode when a sentence is selected.

#### Scenario: Default reading mode
- **WHEN** the user views an answer with no sentence selected
- **THEN** the bottom bar shows only the full-playback button and audio progress bar

#### Scenario: Training mode on sentence selection
- **WHEN** the user taps a sentence in the article
- **THEN** the bottom bar transitions to training mode showing Listen and Record buttons with the selected sentence text and a close button [×]

#### Scenario: Return to reading mode via close
- **WHEN** the user taps the [×] button in training mode
- **THEN** the bottom bar returns to reading mode and no sentence is selected

### Requirement: Full and sentence playback are mutually exclusive
The system SHALL stop full-answer playback when starting sentence playback, and stop sentence playback when starting full-answer playback.

#### Scenario: Start sentence while full is playing
- **WHEN** full-answer playback is active and the user taps the Listen button
- **THEN** full-answer playback stops and sentence playback begins

#### Scenario: Start full while sentence is playing
- **WHEN** sentence playback is active and the user taps the full-playback button
- **THEN** sentence playback stops and full-answer playback begins

### Requirement: Real audio progress bar with time display
The system SHALL display a real-time audio progress bar showing elapsed and total time instead of sentence-level dot indicators.

#### Scenario: Audio is playing
- **WHEN** audio is playing with 8 seconds elapsed and 15 seconds total
- **THEN** the progress bar shows approximately 53% fill and displays "0:08 / 0:15"
