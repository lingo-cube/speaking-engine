## ADDED Requirements

### Requirement: API response types match backend JSON tags
The system SHALL define TypeScript types in `src/types/api.ts` that exactly match the JSON serialization of the corresponding Go models.

#### Scenario: ApiTopic type matches Go Topic
- **WHEN** the Go `Topic` struct has `json:"code"` and `json:"category"`
- **THEN** the TypeScript `ApiTopic` type has `code: string` and `category: string`

### Requirement: Mock data conforms to API types
The system SHALL ensure all mock data objects satisfy the API contract types defined in `api.ts`.

#### Scenario: Mock topic conforms to ApiTopic
- **WHEN** a mock topic is defined
- **THEN** it includes all required fields of `ApiTopic` (`id`, `code`, `category`, `name`, `created_at`, `updated_at`)

### Requirement: UI types separate from API types
The system SHALL define UI-level types (e.g., `AnswerWithChunks`) separately from API-level types (`ApiAnswer`, `ApiChunk`) in their respective modules.

#### Scenario: Answer with chunks for rendering
- **WHEN** the frontend needs an answer with nested chunks for display
- **THEN** it uses a UI type that composes `ApiAnswer` and `ApiChunk[]`, not extending the API type

### Requirement: API response types use snake_case field names
The system SHALL use snake_case field names in API types to match Go's `json:"..."` tag convention.

#### Scenario: Field named topic_code
- **WHEN** the API returns a question's topic code
- **THEN** the TypeScript type uses `topic_code: string`, not `topicCode`

### Requirement: Chunk type includes paragraph field
The system SHALL include an optional `paragraph` field in `ApiChunk` to support paragraph-level grouping for article readability.

#### Scenario: Chunks grouped in paragraphs
- **WHEN** chunks 1 and 2 have `paragraph: 1` and chunk 3 has `paragraph: 2`
- **THEN** the article displays visible paragraph spacing between chunk 2 and chunk 3
