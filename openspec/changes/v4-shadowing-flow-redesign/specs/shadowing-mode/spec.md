## ADDED Requirements

### Requirement: Single chunk focus in shadowing mode
The system SHALL display only the current chunk in shadowing mode, centered and in large text, with all other chunks hidden.

#### Scenario: User is in shadowing mode on chunk 2
- **WHEN** the user is on the second chunk in shadowing mode
- **THEN** only chunk 2's text is displayed, centered on screen in large type

### Requirement: Native audio controls per chunk
The system SHALL provide play, replay, and slow-mode controls for the current chunk's native audio.

#### Scenario: User listens to native audio
- **WHEN** the user taps the play button in shadowing mode
- **THEN** the current chunk's audio plays

### Requirement: Recording controls per chunk
The system SHALL provide start recording, stop recording, and playback controls for the user's voice on the current chunk.

#### Scenario: User records their voice
- **WHEN** the user taps the record button in shadowing mode
- **THEN** the system starts recording from the microphone

### Requirement: Chunk timeline shows progress
The system SHALL display a timeline of dots representing all chunks with completed (●), current (◉), and pending (○) states.

#### Scenario: User is on chunk 2 of 5 with chunk 1 completed
- **WHEN** the shadowing session is active
- **THEN** the timeline shows ● ◉ ○ ○ ○

### Requirement: Next chunk advances only after completion
The system SHALL require a chunk to be marked as completed (listened + recorded) before advancing.

#### Scenario: Chunk not completed
- **WHEN** the user has not listened to and recorded the current chunk
- **THEN** the next-chunk advance action is disabled
