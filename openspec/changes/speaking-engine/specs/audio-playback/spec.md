## ADDED Requirements

### Requirement: Play audio for a sentence chunk
The system SHALL play the audio associated with a sentence chunk when the user activates the play control.

#### Scenario: User plays chunk audio
- **WHEN** the user taps the play button on a ChunkCard
- **THEN** the system fetches the audio URL for that chunk and begins playback

### Requirement: Replay audio
The system SHALL allow the user to replay audio from the beginning without additional loading.

#### Scenario: User replays audio
- **WHEN** the user taps the replay button after audio has finished playing
- **THEN** the system restarts playback from the beginning of the current chunk's audio

### Requirement: Slow playback mode
The system SHALL support a slow playback mode at a reduced speed.

#### Scenario: User enables slow mode
- **WHEN** the user toggles slow mode on the AudioPlayer
- **THEN** the system plays the audio at 0.75x speed

### Requirement: Audio player visual feedback
The system SHALL provide visual feedback indicating playback state (playing, paused, stopped).

#### Scenario: Audio is playing
- **WHEN** audio is actively playing
- **THEN** the play button transforms into a pause button with a progress indicator
