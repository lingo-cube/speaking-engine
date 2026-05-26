## Context

V4 FullAnswerView uses card-based layout with standard typography. The PRD demands a premium, typography-driven, audio-first experience like Spotify Podcast Transcript or Medium articles.

## Goals / Non-Goals

**Goals:**
- Typography-driven immersive article (48px question, 28px body, 1.9 line-height, 720px max-width)
- Centered circular audio player as the single core action
- Subtle inline chunk highlighting during playback (soft glow, auto-advance)
- Three player states: idle (▶), playing (⏸ + progress ring), completed (✓)
- Shadowing CTA appears after playback completion

**Non-Goals:**
- Shadowing mode redesign (separate change)
- Dashboard/TopicDetail changes

## Decisions

### Typography Scale

| Element | Size | Weight | Line-height |
|---------|------|--------|-------------|
| Question | 48px | 700 | 1.2 |
| Body | 28px | 400 | 1.9 |
| Framework tags | 14px | 500 | — |
| Time display | 12px | 400 | — |

### Chunk Rendering: Inline Text with Subtle States

```
Default:   I attended a public high school in my hometown.

Hover:     [light bg-primary/5]

Playing:   [soft glow: shadow-primary/20 + bg-primary/8]

Completed: back to default (no persistent marker needed for Full Answer mode)
```

Chunks are `<span>` elements flowing naturally in paragraphs. No cards, no borders.

### Audio Player States

```
Idle:           ▶ (circle, 64px)
Playing:        ⏸ + progress ring (SVG circle, thin stroke) + "00:32" below
Completed:      ✓ (green circle, 64px)
```

Position: fixed bottom-center, 80px from bottom. Above it: "Listen First" label (subtle gray).

### Playing Highlight Auto-Advance

As TTS plays each sentence, the current chunk gets a soft glow. When the sentence ends, the glow moves to the next chunk. Uses the TTS onEnd callback to trigger chunk index advance.

### Completion → CTA

After last chunk plays:
- Player shows ✓
- Below player: "Start Shadowing" text link (not a heavy button)
- Styled like a media action: `text-primary hover:underline`, medium weight

## Risks / Trade-offs

- **28px body on mobile**: May be too large for small screens. → Scale down to 20px on mobile (< 640px).
- **TTS timing for auto-advance**: SpeechSynthesis doesn't provide per-word timing. → Use per-sentence speak() with onEnd callback for chunk-level advance.
