## Why

The V4 FullAnswerView still feels like a "reading page with a play button" — chunks look like educational cards, the question is too small to command attention, and the audio player is just another component among many. The page needs to shift from "content + controls" to an audio-first immersive experience where the play button is the singular core action and the article feels like a premium reading experience.

## What Changes

- **Modified**: FullAnswerView redesigned as typography-driven immersive article
- **Modified**: Question text enlarged to 48px/700, body to 28px/400 with 1.9 line-height
- **Modified**: Chunks rendered as inline text with subtle hover + playing glow, not cards
- **Modified**: Audio player as centered circular button with progress ring, time, states (▶/⏸/✓)
- **Modified**: Playing chunk highlights with soft glow, auto-advances through article
- **New**: Completion state — ✓ checkmark + "Start Shadowing" CTA appears below player
- **Removed**: Card-based chunk display, heavy borders, educational-system aesthetics

## Capabilities

### Modified Capabilities

- `full-answer-mode`: Typography-driven redesign with audio-first focus

## Impact

- **Frontend**: FullAnswerView rewrite; new player component; chunk rendering change
- **No backend changes**
- **No new dependencies** (uses existing framer-motion + TTS)
