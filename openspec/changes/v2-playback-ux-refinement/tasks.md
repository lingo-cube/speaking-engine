## 1. Bottom Control Bar Refactor

- [x] 1.1 Refactor BottomControlBar to dual-mode: reading mode (full playback only) and training mode (Listen + Record + close button)
- [x] 1.2 Add [×] close button in training mode to return to reading mode
- [x] 1.3 Implement mutual-exclusion playback: starting full stops sentence, starting sentence stops full
- [x] 1.4 Replace sentence-dot progress with real audio progress bar + time display (currentTime / duration)
- [x] 1.5 Add smooth transition animation between reading/training modes (250ms)

## 2. Sentence Selection Visual

- [x] 2.1 Redesign SentenceLine active state: semi-transparent background + 3px left border indicator
- [x] 2.2 Add dark theme override for sentence active state
- [x] 2.3 Remove the old isHighlighted amber glow style (full-playback highlight uses subtle pulse instead)
- [x] 2.4 Add micro-interaction: subtle scale-down on sentence press (active:scale-[0.98])

## 3. Question Navigation

- [x] 3.1 Move question text + tags into Article card header, remove standalone QuestionCard
- [x] 3.2 Build compact question chip selector at top (replaces horizontal question scroll)
- [x] 3.3 Desktop: keep sidebar with question list, current item highlighted, click to switch
- [x] 3.4 Mobile: add bottom sheet for full question list, triggered from top bar ☰
- [x] 3.5 Add topic dropdown in top bar (compact label + ▾)

## 4. Next Question Flow

- [x] 4.1 Mobile: build NextQuestionBar — slides up from bottom after practice, shows next question preview + [→ Next] button
- [x] 4.2 Desktop: sidebar click directly switches question, no bottom preview needed
- [x] 4.3 Handle edge cases: first question (◀ disabled), last question (▶ shows "Complete! Start over?")
- [x] 4.4 Add fade-in transition when switching questions in Article card

## 5. UI Beautification

- [x] 5.1 Add card depth: layered shadows on Article card, bottom bar
- [x] 5.2 Add button micro-interactions: hover scale, active press state, focus ring
- [x] 5.3 Polish typography: question title text-xl font-semibold, article body text-lg leading-relaxed
- [x] 5.4 Add subtle page background pattern or gradient for visual warmth
- [x] 5.5 Polish bottom bar: rounded top corners, backdrop blur, shadow
- [x] 5.6 Ensure all transitions are smooth (200-300ms ease-out)
- [x] 5.7 Build + type-check pass with zero errors
