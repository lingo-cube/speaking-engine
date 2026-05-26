## ADDED Requirements

### Requirement: Browser TTS plays chunk text when no OSS audio available
The system SHALL use the browser's SpeechSynthesis API to speak chunk text when the chunk has no audio_url.

#### Scenario: Chunk has no audio_url
- **WHEN** a chunk has an empty audio_url and the user taps play
- **THEN** the browser speaks the chunk text using SpeechSynthesis at the current playback rate

#### Scenario: Chunk has audio_url
- **WHEN** a chunk has a valid audio_url
- **THEN** the system uses the OSS audio file via HTML5 Audio element

### Requirement: TTS supports play, pause, replay, and rate control
The system SHALL support standard audio controls for TTS playback.

#### Scenario: User pauses TTS playback
- **WHEN** TTS is speaking and the user taps pause
- **THEN** the speech synthesis pauses and resumes from the same position on next play

#### Scenario: User changes playback rate
- **WHEN** the user toggles slow mode while TTS is active
- **THEN** the speech rate changes to 0.75x or 1.0x

### Requirement: TTS falls back gracefully
The system SHALL detect SpeechSynthesis API availability and degrade gracefully.

#### Scenario: Browser does not support SpeechSynthesis
- **WHEN** the browser lacks SpeechSynthesis API support
- **THEN** the play button is disabled with a "TTS not supported" tooltip
