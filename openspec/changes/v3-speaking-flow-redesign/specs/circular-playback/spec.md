## ADDED Requirements

### Requirement: Circular play button with progress ring
The system SHALL display a single circular play button at the bottom center in reading mode. During full-answer playback, an SVG progress ring SHALL animate around the button showing playback progress.

#### Scenario: Reading mode shows circular button
- **WHEN** the user views an answer with no sentence selected
- **THEN** a circular ▶ button is centered at the bottom

#### Scenario: Full playback shows progress ring
- **WHEN** full-answer playback is active
- **THEN** a circular progress ring animates around the button and elapsed/total time appears below

### Requirement: Full playback auto-transitions to training mode
The system SHALL automatically enter training mode with the first sentence selected when full-answer playback completes.

#### Scenario: Full playback ends
- **WHEN** the last sentence audio finishes playing in full mode
- **THEN** the bottom bar transitions to training mode with the first sentence dot active and both ▶ and 🎤 buttons visible
