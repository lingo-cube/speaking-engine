## MODIFIED Requirements

### Requirement: Record user voice after listening
The system SHALL allow the user to record their voice after listening to a sentence chunk audio. Recording controls SHALL be presented in a training drawer that opens when the user clicks a sentence in the article view.

#### Scenario: User starts recording from training drawer
- **WHEN** the user clicks a sentence in the article and taps the record button in the training drawer
- **THEN** the system requests microphone permission and begins recording

#### Scenario: User stops recording
- **WHEN** the user taps the stop button during recording in the training drawer
- **THEN** the system saves the recording locally and enables the replay button in the drawer

### Requirement: Replay user recording
The system SHALL allow the user to replay their own recording from within the training drawer.

#### Scenario: User replays their recording
- **WHEN** the user taps the replay-recording button in the training drawer after recording
- **THEN** the system plays back the user's recorded audio

## ADDED Requirements

### Requirement: Training drawer display
The system SHALL present shadowing controls (play chunk audio, record, replay recording) in a bottom training drawer that slides up when a sentence is selected and can be dismissed.

#### Scenario: Training drawer opens
- **WHEN** the user clicks a sentence in the article
- **THEN** a bottom drawer slides up containing the AudioPlayer and RecordButton for that sentence

#### Scenario: Training drawer closes
- **WHEN** the user clicks the active sentence again or taps a close button
- **THEN** the drawer slides down and no sentence is in training mode
