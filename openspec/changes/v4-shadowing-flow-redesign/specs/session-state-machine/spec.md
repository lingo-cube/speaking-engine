## ADDED Requirements

### Requirement: Session has distinct modes
The system SHALL manage a learning session with distinct modes: full-answer and shadowing, with transitions controlled by user action.

#### Scenario: Session starts in full-answer mode
- **WHEN** the user starts a session from a question card
- **THEN** the session begins in full-answer mode

#### Scenario: Transition from full-answer to shadowing
- **WHEN** the user taps "Start Shadowing" CTA
- **THEN** the session transitions to shadowing mode with the first chunk active

### Requirement: Shadowing is strictly sequential
The system SHALL enforce sequential progression through chunks in shadowing mode.

#### Scenario: Current chunk not completed
- **WHEN** the user is on chunk 2 and has not listened and recorded it
- **THEN** the "Next Chunk" action is disabled

#### Scenario: Current chunk completed
- **WHEN** the user has both listened to and recorded chunk 2
- **THEN** the "Next Chunk" action becomes enabled and advances to chunk 3

### Requirement: Session tracks progress
The system SHALL track which chunks have been completed and the overall session completion rate.

#### Scenario: User completes all chunks
- **WHEN** the user completes (listens + records) all chunks in a session
- **THEN** the session transitions to completed mode and progress is saved
