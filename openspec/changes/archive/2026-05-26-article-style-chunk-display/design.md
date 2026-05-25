## Context

The current UI displays each sentence chunk as an isolated card (ChunkCard) with its own audio controls and record button always visible. Users see a stack of cards rather than a coherent passage. This fragments the reading experience and doesn't match how learners naturally engage with content: understand the whole first, then practice the parts.

This change reworks the display layer without touching the backend or data model.

## Goals / Non-Goals

**Goals:**
- Display chunks as a continuous, readable article with natural paragraph flow
- Full-answer sequential audio playback (chunk 1 → chunk 2 → chunk 3 → ...)
- Click a sentence to activate shadowing mode for that specific sentence
- Highlight the active training sentence while keeping the article context visible
- Preserve all existing per-chunk functionality (play, replay, slow mode, record)

**Non-Goals:**
- Changing the data model or API
- Text-to-speech generation
- Progress tracking
- Keyboard shortcuts
- Offline support

## Decisions

### Component architecture: ArticleView replaces ShadowingPanel as top-level container

```
PracticePage
  └── ArticleView (new)
        ├── FullAudioBar (new) — play/pause entire answer
        ├── ArticleContent (new) — continuous text display
        │     └── SentenceLine[] (new) — clickable inline sentences
        └── TrainingDrawer (new) — slides up when a sentence is selected
              ├── AudioPlayer (existing, single-sentence mode)
              └── RecordButton (existing)
```

**Why**: The ArticleView becomes the single container. It shows the article, the full-playback bar, and the training drawer. This keeps the article always visible for context even during training.

**Alternatives considered**: Modal overlay for training (blocks article context), side-by-side split (too cramped on mobile).

### Full audio playback: sequential chaining, not a single merged file

The full-answer playback chains individual chunk audio URLs sequentially. When one chunk's audio ends, the next begins automatically.

**Why**: No backend changes needed. Each chunk already has its own audio file. Sequential playback works with the existing data model. Also allows per-chunk seeking and highlighting during full playback.

**Alternatives considered**: Server-side audio concatenation (requires backend work, storage), single merged audio file per answer (doubles storage, complicates content management).

### Sentence highlighting during full playback

During full-answer playback, the currently playing sentence highlights (subtle background color change). This gives users visual tracking of where they are in the passage.

### Training mode: click-to-activate, not always visible

Clicking a sentence in the article opens the TrainingDrawer at the bottom of the screen. The drawer contains the AudioPlayer and RecordButton for that specific sentence. Tapping another sentence switches the drawer content. Tapping the active sentence again closes the drawer.

**Why**: Reduces visual noise. Users see the clean article first. Training controls appear only when needed. On mobile, the bottom drawer is reachable with one hand.

**Alternatives considered**: Inline training controls on every sentence (current approach — too cluttered), separate training page (loses article context).

### Existing AudioPlayer and RecordButton components reused

The existing `AudioPlayer` and `RecordButton` components are reused without modification. They already handle single-sentence playback, slow mode, and recording. Only the orchestration changes.

## Risks / Trade-offs

- **Sequential playback timing**: Gaps between chunk audio files may be noticeable. → Mitigation: preload the next audio while current is playing; accept a small gap as acceptable for V1.
- **Mobile drawer UX**: Bottom drawer may conflict with mobile browser controls. → Mitigation: use a fixed-position drawer with safe-area padding.
- **No backend audio for full-answer**: If a chunk has no audio URL, full playback skips it. → Mitigation: display a visual indicator for chunks without audio during full playback.
