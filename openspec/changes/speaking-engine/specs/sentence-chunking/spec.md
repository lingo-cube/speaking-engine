## ADDED Requirements

### Requirement: Display sentence chunks in order
The system SHALL display the teacher sample answer split into sentence-level chunks in sequential order, with each chunk visually separated.

#### Scenario: User views an answer
- **WHEN** the user opens a question's sample answer
- **THEN** the system displays each sentence chunk as a separate ChunkCard in ascending order with clear visual separation between cards

### Requirement: Server-side sentence splitting on answer creation
The system SHALL automatically split a teacher sample answer into sentence chunks by detecting sentence boundary punctuation (`.`, `!`, `?`) when the answer is created.

#### Scenario: Teacher creates an answer with multiple sentences
- **WHEN** a teacher submits a sample answer containing "I come from Wuhan, which is a big city in central China. There are many tourist attractions there."
- **THEN** the system creates two sentence chunks with order 1 and order 2

### Requirement: Each chunk supports independent interaction
The system SHALL render each sentence chunk as an independently interactive unit with its own audio playback and shadowing controls.

#### Scenario: User interacts with a specific chunk
- **WHEN** the user taps the play button on chunk 2
- **THEN** only the audio for chunk 2 plays, and other chunks are unaffected
