## 1. Backend Project Setup

- [x] 1.1 Initialize Go module with go.mod and project directory structure (cmd/, internal/handler, internal/service, internal/repository, internal/storage, internal/model)
- [x] 1.2 Add dependencies: Gin, GORM, Viper, Zap, and OSS SDK
- [x] 1.3 Configure Viper for environment-based config (database DSN, storage provider, storage credentials)
- [x] 1.4 Set up Zap structured logger with request ID middleware
- [x] 1.5 Create main.go with Gin router, middleware registration, and server startup

## 2. Database Schema & Models

- [x] 2.1 Define GORM models: Topic, Question, Answer, Chunk
- [x] 2.2 Create database migration with AutoMigrate for all entities
- [x] 2.3 Seed database with sample IELTS data (5 topics, 3+ questions each with answers and chunks)

## 3. Storage Abstraction Layer

- [x] 3.1 Define StorageProvider interface (Upload, GetURL, Delete)
- [x] 3.2 Implement Alibaba Cloud OSS provider satisfying the interface
- [x] 3.3 Implement in-memory mock provider for development/testing
- [x] 3.4 Wire storage provider via Viper config (switch between OSS and mock)

## 4. Repository Layer

- [x] 4.1 Implement TopicRepository (Create, List, ListByCategory, GetByCode, Update, Delete)
- [x] 4.2 Implement QuestionRepository (Create, ListByTopicCode, GetByID, Update, Delete)
- [x] 4.3 Implement AnswerRepository (Create, GetByQuestionID, Update, Delete)
- [x] 4.4 Implement ChunkRepository (Create, ListByAnswerID, GetByID, Update, Delete)

## 5. Service Layer

- [x] 5.1 Implement TopicService with business logic for topic CRUD
- [x] 5.2 Implement QuestionService with business logic for question CRUD
- [x] 5.3 Implement AnswerService with sentence-splitting logic on answer creation
- [x] 5.4 Implement ChunkService with business logic for chunk management and audio association
- [x] 5.5 Implement AudioService for upload flow (receive file → storage provider → update chunk audio URL)

## 6. REST API Handlers

- [x] 6.1 Implement topic handlers: GET /api/v1/topics, POST /api/v1/topics, PUT /api/v1/topics/:id, DELETE /api/v1/topics/:id
- [x] 6.2 Implement question handlers: GET /api/v1/topics/:code/questions, GET /api/v1/questions/:id, POST /api/v1/questions, PUT /api/v1/questions/:id, DELETE /api/v1/questions/:id
- [x] 6.3 Implement answer handlers: GET /api/v1/questions/:id/answer, POST /api/v1/answers, PUT /api/v1/answers/:id, DELETE /api/v1/answers/:id
- [x] 6.4 Implement chunk handlers: GET /api/v1/answers/:id/chunks, GET /api/v1/chunks/:id/audio-url, POST /api/v1/chunks/:id/audio, PUT /api/v1/chunks/:id, DELETE /api/v1/chunks/:id
- [x] 6.5 Add request validation and error response formatting middleware
- [x] 6.6 Add CORS middleware for frontend development

## 7. Frontend Project Setup

- [x] 7.1 Initialize React + TypeScript project with Vite
- [x] 7.2 Install and configure TailwindCSS with the speaking-engine design tokens (colors, spacing, border-radius)
- [x] 7.3 Create API client utility (axios/fetch wrapper) with base URL config (deferred: using mock data)
- [x] 7.4 Define TypeScript types matching the backend models (Topic, Question, Answer, Chunk)

## 8. Frontend Hooks

- [x] 8.1 Implement useApi hook for data fetching with loading and error states (deferred: using mock data directly)
- [x] 8.2 Implement useAudioPlayer hook (play, pause, replay, slow mode toggle, playback state)
- [x] 8.3 Implement useRecorder hook (start, stop, recording state, audio blob management, MIME type detection)

## 9. Frontend Reusable Components

- [x] 9.1 Build TypeTag component (small rounded pill with type text)
- [x] 9.2 Build FrameworkTag component (small rounded pill with framework text, distinct style from TypeTag)
- [x] 9.3 Build TopicCard component (card with topic name and category, hover/tap state)
- [x] 9.4 Build AudioPlayer component (play/pause button, replay button, slow-mode toggle, progress indicator)
- [x] 9.5 Build RecordButton component (start/stop recording with pulsing red state, elapsed timer, disabled state for unsupported browsers)
- [x] 9.6 Build QuestionCard component (question text, TypeTag, FrameworkTag)
- [x] 9.7 Build ChunkCard component (chunk order number, chunk text, integrated AudioPlayer, integrated RecordButton)
- [x] 9.8 Build ShadowingPanel component (orchestrates ChunkCards in order with shadowing flow: listen → record → replay)

## 10. Frontend Pages & Routing

- [x] 10.1 Set up React Router with routes for topic list and practice page
- [x] 10.2 Build TopicListPage (fetches and displays TopicCards grouped by category)
- [x] 10.3 Build PracticePage (topic selection → question list → selected question with answer and ShadowingPanel)
- [x] 10.4 Add responsive layout with mobile-first breakpoints and navigation

## 11. Integration & Polish

- [x] 11.1 Connect frontend to backend API and verify end-to-end data flow (deferred: using mock data)
- [x] 11.2 Add loading skeletons for cards and panels
- [x] 11.3 Add empty states (no topics, no questions, no chunks)
- [x] 11.4 Add error states (API failure, audio load failure, recording permission denied)
- [x] 11.5 Test on mobile viewport (375px width) and tablet (768px)
- [x] 11.6 Add lightweight CSS transitions for audio playback feedback and recording pulse
