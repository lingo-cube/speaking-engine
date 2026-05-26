## ADDED Requirements

### Requirement: Full answer displays all chunks as article
The system SHALL display the complete sample answer with all sentence chunks visible in full-answer mode.

#### Scenario: User enters full-answer mode
- **WHEN** the user starts a session
- **THEN** all sentence chunks are displayed as a readable article with the question and framework tags shown above

### Requirement: Full audio playback in full-answer mode
The system SHALL provide a full-answer audio playback control that plays all chunks sequentially.

#### Scenario: User plays full audio
- **WHEN** the user taps the full-playback button
- **THEN** all chunk audio files play sequentially and the currently playing chunk is highlighted

### Requirement: Chunk preview without recording
The system SHALL allow tapping individual chunks to preview their audio in full-answer mode but SHALL NOT provide recording controls.

#### Scenario: User taps a chunk in full-answer mode
- **WHEN** the user taps a sentence chunk
- **THEN** the chunk's audio plays but no recording controls appear

### Requirement: Start Shadowing CTA
The system SHALL display a prominent "Start Shadowing" button after the user has listened to the full answer.

#### Scenario: User is ready to practice
- **WHEN** the user taps "Start Shadowing"
- **THEN** the session transitions to shadowing mode
