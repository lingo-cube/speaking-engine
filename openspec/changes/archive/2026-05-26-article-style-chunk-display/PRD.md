# Article-Style Chunk Display — PRD

## Problem

Currently, sentence chunks are displayed as isolated cards (ChunkCard) stacked vertically. Each card has its own audio player and record button. This:

- Fragments the reading experience — users can't read the answer as a coherent passage
- Creates visual clutter — training controls are always visible for every sentence
- Doesn't match natural learning flow — people want to understand the whole before practicing the parts

## Solution

Three-phase interaction model:

```
1. READ the article
   → All sentences displayed as a continuous, readable passage

2. LISTEN to the full answer
   → One play button plays all chunks sequentially
   → Currently playing sentence is highlighted

3. PRACTICE individual sentences
   → Click any sentence to open a training drawer
   → Play audio, record voice, replay recording for that sentence
   → Click another sentence to switch, or click again to close
```

## UI Layout

```
┌─────────────────────────────────┐
│  Question Card                  │
│  "Please describe your hometown"│
│  [Description] [Fact → Example] │
├─────────────────────────────────┤
│  ▶ Full Playback  "3 / 5"      │  ← FullAudioBar
├─────────────────────────────────┤
│                                 │
│  I come from Wuhan, which is a  │
│  big city in central China.     │  ← ArticleContent
│                                 │    (clickable sentences)
│  There are many tourist         │
│  attractions there.             │
│                                 │
│  Particularly East Lake, it is  │
│  quiet and serene.              │
│                                 │
├─────────────────────────────────┤
│  ┌───────────────────────────┐  │
│  │ Sentence 3                │  │  ← TrainingDrawer
│  │ ▶ Play  ↻ Replay  🐢 Slow │  │    (slides up on click)
│  │ ● Record  ▶ Replay        │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

## Key Interactions

| Action | Result |
|--------|--------|
| Tap ▶ in FullAudioBar | Play all chunks sequentially, highlight current |
| Tap a sentence in article | Open training drawer for that sentence |
| Tap a different sentence | Switch drawer to new sentence |
| Tap active sentence again | Close training drawer |
| Tap pause during full play | Pause at current position in current chunk |

## Scope

**In scope:**
- Article-style continuous text display
- Full-answer sequential audio playback
- Click-to-train per-sentence interaction
- Training drawer with audio + recording controls
- Sentence highlighting (active training + during full playback)

**Out of scope:**
- Backend changes (no API or data model changes)
- Audio file concatenation
- Text-to-speech generation
- Keyboard shortcuts
