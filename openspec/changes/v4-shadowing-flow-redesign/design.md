## Context

Current UI is a single-page layout: Question List + Article + BottomControlBar. Users can jump between reading any sentence and recording at any time. The PRD demands a structured, sequential flow: Browse → Full Answer → Shadowing, with clear mode boundaries and gated transitions.

## Goals / Non-Goals

**Goals:**
- Four distinct pages/modes: Dashboard, Full Answer, Shadowing, Speaking (V2 stubbed)
- Full Answer: article + full playback, no recording
- Shadowing: single-chunk focus, sequential enforcement
- Zustand session state machine
- framer-motion page transitions

**Non-Goals:**
- Speaking Mode (V2 only — UI stubbed)
- AI scoring
- Backend changes

## Decisions

### State Management: zustand

Single store managing: `mode`, `currentChunkIndex`, `completedChunks`, `sessionQuestion`.

```typescript
interface SessionState {
  mode: 'browse' | 'full-answer' | 'shadowing' | 'speaking' | 'completed';
  currentChunkIndex: number;
  completedChunks: Set<number>;
  transitionTo: (mode: Mode) => void;
  advanceChunk: () => void;
  resetSession: () => void;
}
```

**Why zustand over React state**: Cross-component access (header, controls, timeline all read session state). No prop drilling through 4 levels.

### Page Architecture

```
/ (Dashboard)
  └── Topic Card → /topic/:code
      └── Question Card → /session/:questionId
          ├── FullAnswerView (mode=full-answer)
          └── ShadowingView (mode=shadowing)
```

Three route-level pages, not one page with conditional rendering.

### Full Answer Mode Layout

```
┌──────────────────────────────┐
│ ← Topic · Q 2/5           │  SessionHeader
├──────────────────────────────┤
│ [Description] [Fact→Example] │  Framework + Type
│                              │
│ Please describe your         │  Question
│ hometown.                    │
│ ─────────────────────────── │
│                              │
│ I come from Wuhan...         │  Full article
│ There are many tourist...    │  (all chunks visible)
│ Particularly East Lake...    │
│                              │
├──────────────────────────────┤
│       [▶ Play Full]         │  FullAudioControl
│       ████████░░ 1:20      │
│                              │
│  ┌──────────────────────┐   │
│  │  Start Shadowing  →  │   │  Primary CTA
│  └──────────────────────┘   │
└──────────────────────────────┘
```

### Shadowing Mode Layout

```
┌──────────────────────────────┐
│ ← Full Answer · ●●○○○ · 2/5│  ProgressHeader
├──────────────────────────────┤
│                              │
│                              │
│  "There are many tourist     │  CurrentChunkCard
│   attractions there."        │  (large, centered, only this chunk)
│                              │
│                              │
├──────────────────────────────┤
│  ┌──────┐  ┌──────┐         │
│  │  ▶   │  │ 1x   │         │  NativeAudioControls
│  └──────┘  └──────┘         │
│                              │
│  ┌──────┐  ┌──────┐         │
│  │  ●   │  │  ▶   │         │  RecordingControls
│  └──────┘  └──────┘         │
│                              │
│         [Next Chunk →]       │  (only when current completed)
└──────────────────────────────┘
```

### Shadowing Sequential Enforcement

- "Next Chunk →" button disabled until user has both listened to AND recorded the current chunk
- Timeline dots show completed (●), current (◉), pending (○)
- User cannot skip ahead — must complete current chunk to advance
- Completion = listened + recorded (blob exists)

### Animations: framer-motion

- Page transitions: slide-left between modes
- Chunk card entrance: scale + fade
- Timeline dot fill: spring animation
- CTA button pulse on Full Answer completion

### Local TTS Audio Generation

Use browser SpeechSynthesis API for realistic audio when OSS audio URLs are unavailable.

```
useSpeechSynthesis hook:
  speak(text, rate) → plays via SpeechSynthesisUtterance
  pause() / resume() / stop()
  onEnd callback

Audio player strategy:
  if chunk.audio_url → useAudioPlayer (HTML5 Audio from OSS)
  else → useSpeechSynthesis (browser TTS)
```

**Why**: Silent WAV mock doesn't validate the shadowing experience. Browser TTS provides real English speech for each chunk's text, making testing and development genuinely useful.

**Fallback**: If browser doesn't support SpeechSynthesis (rare), falls back to silent mock audio.

## Risks / Trade-offs

- **Sequential enforcement may frustrate power users**: Add a "Skip" option with confirmation dialog (V1.1)
- **zustand adds 2KB to bundle**: Acceptable tradeoff for clean state management
- **framer-motion adds ~30KB**: Could use CSS transitions instead; evaluate bundle impact
