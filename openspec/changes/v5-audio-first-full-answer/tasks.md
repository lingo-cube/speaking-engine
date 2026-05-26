## 1. Typography Redesign

- [x] 1.1 Enlarge question text to 48px/700/1.2 with distinct spacing from body
- [x] 1.2 Set body text to 28px/400/1.9, max-width 720px centered
- [x] 1.3 Responsive: scale to 32px question / 20px body on mobile (< 640px)
- [x] 1.4 Paragraph spacing: 32px margin-bottom between paragraphs
- [x] 1.5 Framework tags: 14px pill style, low visual priority

## 2. Inline Chunk Rendering

- [x] 2.1 Rework chunks as inline `<span>` elements flowing in natural paragraphs — no cards, no borders
- [x] 2.2 Default state: identical to body text, invisible boundaries
- [x] 2.3 Hover state: subtle bg-primary/5 background
- [x] 2.4 Playing state: soft glow via shadow-primary/20 + bg-primary/8, smooth transition

## 3. Audio Player Redesign

- [x] 3.1 Build centered circular player: 64px ▶ button, fixed bottom-center
- [x] 3.2 Playing state: swap to ⏸ + SVG progress ring (thin stroke, smooth easing)
- [x] 3.3 Show time "00:32" below player, small/subtle
- [x] 3.4 Completed state: ✓ (green circle) after last chunk finishes
- [x] 3.5 "Listen First" label above player in idle state (subtle gray)

## 4. Playback Auto-Advance

- [x] 4.1 Use TTS onEnd to advance chunkIndex, moving glow to next sentence
- [x] 4.2 Smooth transition between chunk highlights (framer-motion)
- [x] 4.3 On completion: player → ✓, show "Start Shadowing" CTA below

## 5. Polish

- [x] 5.1 Remove all card borders, educational-system aesthetics
- [x] 5.2 Page background: pure white or very subtle warm tone
- [x] 5.3 Ensure dark theme compatibility
- [x] 5.4 Build + type-check pass with zero errors
