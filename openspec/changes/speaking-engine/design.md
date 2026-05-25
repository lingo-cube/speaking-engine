## Context

Speaking Engine V1 is a greenfield project — a structured IELTS speaking practice system. The backend is Golang + MySQL, the frontend is React + TypeScript + TailwindCSS, and audio assets are stored in OSS-compatible object storage. The system serves teacher-generated content: topics, questions, sample answers split into sentence-level chunks, each with an audio file for shadowing practice.

No existing codebase, no migration constraints.

## Goals / Non-Goals

**Goals:**
- REST API serving topics, questions, answers, and sentence chunks with audio URLs
- Abstracted storage layer for audio files (OSS first, swappable to S3/R2/MinIO later)
- Clean component-based frontend optimized for speaking practice flow
- Mobile-first UI with one-click audio playback and per-chunk shadowing
- Content management CRUD for teacher-generated speaking materials

**Non-Goals:**
- AI answer generation, semantic chunking, pronunciation scoring
- User authentication / accounts (future)
- Progress tracking or analytics dashboard
- Vector or graph databases
- Real-time collaboration

## Decisions

### Backend: Go with Gin + GORM + MySQL

**Why**: The PRD specifies this exact stack. Gin is the most widely-adopted Go HTTP framework. GORM provides productive ORM for the straightforward CRUD-heavy domain. MySQL is chosen over PostgreSQL per PRD requirements (simple relational data, no JSONB/vector needs).

**Alternatives considered**: PostgreSQL (rejected per PRD spec), sqlc (more boilerplate than GORM for simple CRUD), Echo/Chi (Gin has larger ecosystem and the PRD explicitly recommends it).

### Frontend: React + TypeScript + TailwindCSS

**Why**: PRD-specified stack. TailwindCSS enables rapid component styling without maintaining separate CSS files. TypeScript catches type errors early in a component-heavy UI.

**Alternatives considered**: Next.js (unnecessary SSR complexity for a SPA with no SEO needs), shadcn/ui (adds dependency weight; custom components per PRD's UI reference give more design control).

### Storage abstraction: Go interface with provider implementations

```go
type StorageProvider interface {
    Upload(ctx context.Context, key string, reader io.Reader) error
    GetURL(ctx context.Context, key string) (string, error)
    Delete(ctx context.Context, key string) error
}
```

**Why**: The PRD requires future-compatible storage (OSS → S3 → R2 → MinIO). An interface at the service layer decouples business logic from the concrete implementation. The initial implementation uses Alibaba Cloud OSS SDK.

**Alternatives considered**: Direct S3 SDK with MinIO compatibility layer (adds complexity for Alibaba Cloud OSS which has its own SDK), environment-variable-switched providers without interface (harder to test, harder to add new providers).

### Sentence splitting: server-side on answer creation

**Why**: Simpler than client-side splitting, ensures consistent chunking, and allows audio to be associated immediately. Splitting is by sentence boundary punctuation (`. ! ?`). This is deterministic and predictable.

**Alternatives considered**: Client-side splitting (inconsistent across devices), manual chunk creation by teachers (higher content production cost).

### Audio: per-chunk files, URL-based serving

**Why**: One sentence = one audio file = simple CDN caching, independent playback, easy TTS generation. Audio is served as URLs pointing to OSS/CDN, not streamed through the backend.

**Alternatives considered**: Single audio file with seek points (harder to update individual sentences, worse caching), backend-proxied streaming (unnecessary bandwidth cost).

### Frontend component architecture: flat component directory

```
src/components/
  TopicCard.tsx
  QuestionCard.tsx
  ChunkCard.tsx
  AudioPlayer.tsx
  RecordButton.tsx
  ShadowingPanel.tsx
  FrameworkTag.tsx
  TypeTag.tsx
src/pages/
  TopicListPage.tsx
  PracticePage.tsx
src/hooks/
  useAudioPlayer.ts
  useRecorder.ts
  useApi.ts
```

**Why**: All 8 components are page-level with no nesting beyond one level. A flat structure is sufficient. Custom hooks encapsulate audio and recording logic that spans multiple components.

**Alternatives considered**: Feature-based folders (overkill for 8 components), atomic design folders (unnecessary abstraction).

### API design: resource-oriented REST

```
GET    /api/v1/topics
GET    /api/v1/topics/:code/questions
GET    /api/v1/questions/:id
GET    /api/v1/questions/:id/answer
GET    /api/v1/answers/:id/chunks
GET    /api/v1/topics?category=ielts
GET    /api/v1/chunks/:id/audio-url
POST   /api/v1/topics
POST   /api/v1/questions
POST   /api/v1/answers
PUT    /api/v1/topics/:id
PUT    /api/v1/questions/:id
PUT    /api/v1/answers/:id
PUT    /api/v1/chunks/:id
DELETE /api/v1/topics/:id
DELETE /api/v1/questions/:id
DELETE /api/v1/answers/:id
DELETE /api/v1/chunks/:id
```

**Why**: Resource-oriented URLs match the domain model directly. Versioned under `/api/v1/` allows future API changes. Content management endpoints follow REST conventions for CRUD.

## Risks / Trade-offs

- **Sentence splitting accuracy**: Periods in abbreviations (e.g., "Mr.", "U.S.") may cause incorrect splits. → Mitigation: simple regex with common abbreviation allowlist; teachers can manually correct chunks via content management.
- **Audio storage costs**: Per-sentence audio files multiply storage and CDN costs linearly with content volume. → Mitigation: acceptable for V1; sentence-level granularity is the core product decision. Revisit in V2 if content scales beyond 10k sentences.
- **No authentication**: Content management endpoints are unprotected. → Mitigation: acceptable for V1 internal/teacher use; add auth middleware in V2 before exposing to end users.
- **Tight coupling to OSS SDK**: Even with the interface abstraction, initial development may inadvertently depend on OSS-specific behavior. → Mitigation: write at least one integration test against the StorageProvider interface using an in-memory mock.
- **Browser recording compatibility**: MediaRecorder API behaves differently across browsers and mobile OSes. → Mitigation: detect supported MIME types at runtime; fall back to a common format (audio/webm or audio/mp4).
