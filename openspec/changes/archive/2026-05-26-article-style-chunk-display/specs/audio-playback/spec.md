## MODIFIED Requirements

### Requirement: Play audio for a sentence chunk
The system SHALL play the audio associated with a sentence chunk when the user activates the play control, either from the full-answer playback bar (sequential playback of all chunks) or from the training drawer (single chunk playback).

#### Scenario: User plays full-answer audio
- **WHEN** the user taps the full-playback play button
- **THEN** the system plays all chunk audio files sequentially from chunk 1 through the last chunk

#### Scenario: User plays single chunk audio from training drawer
- **WHEN** the user taps the play button in the training drawer for a specific sentence
- **THEN** the system plays only that chunk's audio

## ADDED Requirements

### Requirement: Full-answer playback controls
The system SHALL provide a dedicated playback bar above the article for full-answer audio with play/pause and progress display (current sentence / total sentences).

#### Scenario: User controls full playback
- **WHEN** the answer page loads
- **THEN** a playback bar appears above the article with a play button and progress indicator
