## MODIFIED Requirements

### Requirement: Record user voice after listening
The system SHALL allow the user to record their voice via a dedicated Record button in the fixed bottom control bar. The Record button SHALL appear alongside the Listen button when a sentence is selected in the article.

#### Scenario: User starts recording from bottom bar
- **WHEN** the user selects a sentence and taps the Record button in the bottom bar
- **THEN** the system requests microphone permission and begins recording

#### Scenario: User stops recording
- **WHEN** the user taps the Record button while recording
- **THEN** the system stops recording, saves audio locally, and the button switches to a playback state

## REMOVED Requirements

### Requirement: Training drawer display
**Reason**: Replaced by fixed bottom control bar for better mobile usability and continuous article visibility.
**Migration**: Bottom control bar now hosts Listen and Record buttons. The TrainingDrawer component is removed.

### Requirement: Training drawer display
**Reason**: Replaced by bottom control bar. Sentence selection now triggers bottom bar expansion instead of drawer.
**Migration**: Remove TrainingDrawer import and usage. Use BottomControlBar component instead.
