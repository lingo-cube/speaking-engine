## ADDED Requirements

### Requirement: CRUD for topics
The system SHALL provide REST endpoints to create, read, update, and delete speaking topics.

#### Scenario: Teacher creates a new topic
- **WHEN** a teacher sends a POST request to `/api/v1/topics` with valid topic data
- **THEN** the system creates the topic and returns it with a generated ID

#### Scenario: Teacher lists all topics
- **WHEN** a teacher sends a GET request to `/api/v1/topics`
- **THEN** the system returns all topics ordered by name

### Requirement: CRUD for questions
The system SHALL provide REST endpoints to create, read, update, and delete questions associated with a topic.

#### Scenario: Teacher creates a question for a topic
- **WHEN** a teacher sends a POST request to `/api/v1/questions` with topic code, question text, type, and framework
- **THEN** the system creates the question and returns it with a generated ID

### Requirement: CRUD for answers
The system SHALL provide REST endpoints to create, read, update, and delete sample answers. On creation, the system SHALL auto-split the answer text into sentence chunks.

#### Scenario: Teacher creates an answer for a question
- **WHEN** a teacher sends a POST request to `/api/v1/answers` with question ID and answer text
- **THEN** the system creates the answer, splits the text into sentence chunks, and returns the answer with its chunks

### Requirement: CRUD for chunks
The system SHALL provide REST endpoints to read, update, and delete individual sentence chunks. Chunk creation is handled automatically via answer creation.

#### Scenario: Teacher updates a chunk's text or audio URL
- **WHEN** a teacher sends a PUT request to `/api/v1/chunks/:id` with updated text or audio URL
- **THEN** the system updates the chunk and returns the updated entity

### Requirement: Audio upload and storage
The system SHALL provide an endpoint to upload an audio file for a specific sentence chunk and store it via the abstracted storage provider.

#### Scenario: Teacher uploads audio for a chunk
- **WHEN** a teacher sends a POST request to `/api/v1/chunks/:id/audio` with an audio file
- **THEN** the system uploads the file to the configured storage provider and updates the chunk's audio URL

### Requirement: Get audio URL for a chunk
The system SHALL return a signed or public URL for a chunk's audio file.

#### Scenario: User requests audio for playback
- **WHEN** the frontend requests `GET /api/v1/chunks/:id/audio-url`
- **THEN** the system returns a URL pointing to the audio file in object storage
