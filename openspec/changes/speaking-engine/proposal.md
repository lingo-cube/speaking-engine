## Why

IELTS learners need structured speaking practice but existing tools either offer generic audio playback or complex AI feedback systems. There is no lightweight, sentence-level shadowing tool that lets users practice speaking with teacher-crafted content. Building a structured speaking content foundation now — before adding AI generation — ensures a high-quality, reusable asset corpus that scales.

## What Changes

- **New**: Topic-based practice browsing (IELTS topics like Hometown, School, Work, Technology, Friends)
- **New**: Question display with metadata labels (type, framework)
- **New**: Teacher sample answer display with sentence-level chunking
- **New**: Per-sentence audio playback (play, replay, slow mode)
- **New**: Shadowing practice flow: play audio → user repeats → record voice → replay recording
- **New**: REST API backend in Golang (Gin + GORM + MySQL)
- **New**: React + TypeScript + TailwindCSS frontend with reusable speaking components
- **New**: Abstracted storage layer for audio assets (OSS-compatible, starting with Alibaba Cloud OSS)

## Capabilities

### New Capabilities

- `topic-browsing`: Browse and select IELTS speaking topics with category grouping
- `question-display`: Display questions with type and framework metadata labels
- `sentence-chunking`: Display teacher-sample answers split into sentence-level chunks with independent audio
- `audio-playback`: Play, replay, and slow-mode audio controls per sentence chunk
- `shadowing-practice`: Record user voice after listening to a chunk, then replay the recording for self-review
- `content-management`: CRUD API for topics, questions, answers, chunks, and audio assets

### Modified Capabilities

<!-- No existing specs to modify -- this is a greenfield project. -->

## Impact

- **New backend**: Golang project with Gin, GORM, Viper, Zap; MySQL database with topics, questions, answers, chunks tables
- **New frontend**: React + TypeScript + TailwindCSS app with component library (TopicCard, QuestionCard, ChunkCard, AudioPlayer, RecordButton, ShadowingPanel, FrameworkTag, TypeTag)
- **New infrastructure**: OSS-compatible object storage for audio files (Alibaba Cloud OSS initially)
- **No breaking changes**: Greenfield project, no existing systems affected
