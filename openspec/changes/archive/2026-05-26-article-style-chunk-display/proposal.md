## Why

The current isolated ChunkCard layout forces users to view sentences out of context. Language learners need to first read and hear the complete answer as a coherent passage before drilling into individual sentences. An article-style display with full-answer playback followed by per-sentence training mirrors how people naturally engage with speaking content: understand the whole first, then practice the parts.

## What Changes

- **New**: Article-style answer display — all sentence chunks shown as a continuous, readable passage with proper typography
- **New**: Full-answer audio playback — play the entire sample answer from first sentence to last in one continuous flow
- **Modified**: Sentence-level training — clicking an individual sentence in the article transitions to shadowing mode for that sentence (play → record → replay)
- **Modified**: Visual distinction — the currently active sentence for training is highlighted; others remain in article view

## Capabilities

### New Capabilities

- `article-view`: Display answer chunks as a continuous, readable article with proper paragraph-level typography and spacing
- `full-audio-playback`: Play all sentence chunks sequentially as one continuous audio stream with unified playback controls

### Modified Capabilities

- `sentence-chunking`: Chunks now display inline as part of a continuous article instead of isolated cards
- `audio-playback`: Audio player supports both full-answer mode (all chunks) and single-sentence mode (per chunk)
- `shadowing-practice`: Shadowing is now activated by clicking a sentence in the article view, rather than being always visible per chunk

## Impact

- **Frontend components**: New `ArticleView` component; `ChunkCard` behavior changes to inline sentence display; `ShadowingPanel` workflow changes to click-to-activate
- **Audio playback**: `useAudioPlayer` hook needs full-answer sequential playback support
- **No backend changes**: All changes are frontend-only
- **No API changes**: Existing endpoints unchanged
