## Why

The current UI is a "content reader" — Question List, Article, and Shadowing controls coexist on one screen. This mixes browsing with training, lacks immersive speaking flow, and doesn't enforce the sequential chunk-by-chunk discipline essential for shadowing practice. The product needs to shift from "reading with audio" to a focused, step-by-step speaking training engine.

## What Changes

- **New**: 4-mode state architecture — Browse → Full Answer → Shadowing → Speaking (V2)
- **New**: Dashboard page with Topic selection, recent practice, progress overview
- **New**: Full Answer Mode — immersive article view with full-audio playback, chunk preview, and explicit "Start Shadowing" CTA
- **New**: Shadowing Mode — single-chunk focus card with sequential flow enforcement, timeline dots, dedicated audio + recording controls
- **New**: Mode transition gating — Full Answer must complete before entering Shadowing; Shadowing is strictly sequential
- **Removed**: Mixed Question-List + Article + Training single-page layout
- **New**: zustand state management for session state
- **New**: framer-motion page transitions and micro-animations

## Capabilities

### New Capabilities

- `dashboard`: Topic/Question selection dashboard with progress cards
- `full-answer-mode`: Immersive article view with full playback, chunk preview, CTA
- `shadowing-mode`: Single-chunk training with sequential enforcement, timeline, dedicated controls
- `session-state-machine`: Zustand-based state machine managing Browse/FullAnswer/Shadowing modes
- `session-progress`: Track current chunk, completed chunks, completion rate per session

### Modified Capabilities

- `bottom-control-bar`: Split into FullAnswerBar and ShadowingBar per mode
- `sentence-chunking`: Single-chunk display (not full article) in Shadowing mode
- `audio-playback`: Full-audio and per-chunk playback clearly separated by mode

## Impact

- **Frontend**: Major architectural rework — new pages (Dashboard, Session), new components (FullAnswerView, ShadowingView, ProgressTimeline, ChunkCard-enhanced), new state management (zustand), new animations (framer-motion)
- **Dependencies**: zustand, framer-motion added to package.json
- **Backend**: No changes
- **Breaking**: Existing PracticePage, ArticleView, BottomControlBar will be restructured or replaced
