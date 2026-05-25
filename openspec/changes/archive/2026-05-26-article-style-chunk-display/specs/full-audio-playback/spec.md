## ADDED Requirements

### Requirement: Play full answer audio sequentially
The system SHALL provide a control to play all sentence chunk audio files in sequential order as one continuous playback experience.

#### Scenario: User initiates full playback
- **WHEN** the user taps the full-playback play button
- **THEN** the system plays chunk 1 audio, then automatically plays chunk 2, continuing through all chunks in order

#### Scenario: Full playback completes
- **WHEN** the last chunk's audio finishes playing
- **THEN** the full-playback button returns to its stopped state

### Requirement: Pause and resume full playback
The system SHALL allow the user to pause and resume the full-answer playback.

#### Scenario: User pauses during full playback
- **WHEN** the user taps pause during full playback while chunk 2 is playing
- **THEN** playback pauses and resumes from the same position in chunk 2 when play is tapped again

### Requirement: Highlight currently playing sentence
The system SHALL visually highlight the sentence whose audio is currently playing during full-answer playback.

#### Scenario: Full playback is in progress
- **WHEN** full playback is playing chunk 2 of 5
- **THEN** sentence 2 in the article has a subtle animated highlight indicating it is the currently playing sentence

### Requirement: Full playback control bar
The system SHALL display a persistent full-playback control bar above the article with play/pause button and progress indication.

#### Scenario: User views an answer with audio
- **WHEN** the answer page is displayed
- **THEN** a playback bar is visible at the top of the article area with a play button and progress text (e.g., "Sentence 2 / 5")

### Requirement: Skip chunks without audio
The system SHALL skip sentence chunks that have no audio URL during full playback and continue to the next chunk with audio.

#### Scenario: A chunk has no audio
- **WHEN** full playback reaches a chunk with an empty audio URL
- **THEN** the system skips that chunk and immediately starts playing the next chunk with audio
