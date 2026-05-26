## 1. Project Setup

- [x] 1.1 Install zustand and framer-motion
- [x] 1.2 Create zustand session store (useSessionStore) with mode, currentChunk, completedChunks
- [x] 1.3 Set up framer-motion AnimatePresence at app level
- [x] 1.4 Build useSpeechSynthesis hook: speak(text, rate), pause, resume, stop, onEnd
- [x] 1.5 Build unified useSmartAudio hook: prefers OSS audio_url over SpeechSynthesis TTS fallback
- [x] 1.6 Remove mock/audio.ts (5s silent WAV), rely on TTS for chunk audio

## 2. Dashboard (Browse Mode)

- [x] 2.1 Redesign TopicListPage as Dashboard with header, topic cards grid
- [x] 2.2 Build enhanced TopicCard with question_count, progress, last_practice_time
- [x] 2.3 Build RecentPracticeCard component
- [x] 2.4 Add ProgressOverview section (placeholder for V1)
- [x] 2.5 Navigate to /topic/:code on topic card click

## 3. Topic Detail Page

- [x] 3.1 Build TopicDetailPage with topic header + question list
- [x] 3.2 Build QuestionCard with type, framework, duration, completion
- [x] 3.3 Add "Start Session" and "Continue Practice" actions per question
- [x] 3.4 Navigate to /session/:questionId on start

## 4. Full Answer Mode

- [x] 4.1 Build SessionPage container with useSessionStore
- [x] 4.2 Build FullAnswerView: article layout with all chunks visible
- [x] 4.3 Build FullAudioControl: play/pause/replay with wavesurfer waveform (or simple progress bar for V1)
- [x] 4.4 Chunk click = preview audio only (no recording in this mode)
- [x] 4.5 "Start Shadowing" CTA button → transitions to shadowing mode
- [x] 4.6 SessionHeader with back button, topic, position

## 5. Shadowing Mode

- [x] 5.1 Build ShadowingView with single-chunk focus card
- [x] 5.2 ChunkCard: large text, centered, current chunk only
- [x] 5.3 Build ProgressTimeline (●●○○○ dots) with completed/current/pending states
- [x] 5.4 Native audio controls (play, replay, slow mode) for current chunk
- [x] 5.5 Recording controls (start, stop, playback) for user voice
- [x] 5.6 Sequential enforcement: "Next Chunk" disabled until listened + recorded
- [x] 5.7 Advance to next chunk on completion, auto-transition to completed mode after last chunk

## 6. Animations & Polish

- [x] 6.1 Add framer-motion page transitions between modes
- [x] 6.2 Add chunk card entrance animation (scale + fade)
- [x] 6.3 Add timeline dot completion animation
- [x] 6.4 Polish typography, spacing, color for immersive feel
- [x] 6.5 Ensure dark theme compatibility with new components

## 7. Cleanup

- [x] 7.1 Remove or archive deprecated components (old BottomControlBar, old PracticePage, old ArticleView)
- [x] 7.2 Build + type-check pass with zero errors
