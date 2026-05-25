## ADDED Requirements

### Requirement: Record user voice after listening
The system SHALL allow the user to record their voice after listening to a sentence chunk audio.

#### Scenario: User starts recording
- **WHEN** the user taps the record button on a ChunkCard
- **THEN** the system requests microphone permission and begins recording

#### Scenario: User stops recording
- **WHEN** the user taps the stop button during recording
- **THEN** the system saves the recording locally and enables the replay button

### Requirement: Replay user recording
The system SHALL allow the user to replay their own recording for self-review.

#### Scenario: User replays their recording
- **WHEN** the user taps the replay-recording button after recording
- **THEN** the system plays back the user's recorded audio

### Requirement: Recording visual feedback
The system SHALL provide clear visual feedback during recording state.

#### Scenario: Recording is in progress
- **WHEN** the user is actively recording
- **THEN** the record button displays a pulsing red indicator and a timer showing elapsed recording duration

### Requirement: Browser recording capability detection
The system SHALL detect whether the browser supports audio recording and degrade gracefully.

#### Scenario: Browser does not support MediaRecorder
- **WHEN** the user's browser lacks MediaRecorder API support
- **THEN** the system disables the record button and displays a message indicating recording is not supported
