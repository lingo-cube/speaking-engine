## ADDED Requirements

### Requirement: Play and record buttons are mutually exclusive
The system SHALL hide the record button when sentence playback is active, and hide the play button when recording is active.

#### Scenario: User starts sentence playback
- **WHEN** the user taps ▶ in training mode
- **THEN** the 🎤 button is hidden and ▶ becomes ⏸

#### Scenario: User pauses or sentence finishes
- **WHEN** the user pauses playback or the sentence audio ends
- **THEN** the 🎤 button reappears alongside ▶

#### Scenario: User starts recording
- **WHEN** the user taps 🎤 in training mode
- **THEN** the ▶ button is hidden and 🎤 becomes ⏹ with an elapsed timer

### Requirement: Recorded state with dedicated actions
The system SHALL display a dedicated recorded state area when recording is complete, separate from the play button.

#### Scenario: Recording is complete
- **WHEN** the user stops recording and audio is available
- **THEN** the bottom bar shows a playback button for the recording, a re-record button, and a replay-original button

### Requirement: Dot navigation in training mode
The system SHALL display a row of dots (●○○○○) in training mode representing each sentence, with the active sentence filled and others hollow. Tapping a dot SHALL jump to that sentence.

#### Scenario: User taps a dot
- **WHEN** the user taps the third dot in training mode
- **THEN** the third sentence becomes the active training target and the article highlights it
