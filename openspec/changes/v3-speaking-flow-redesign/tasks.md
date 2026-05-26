## 1. Circular Play Button

- [x] 1.1 Build CircularPlayButton component: circular ▶ button with optional SVG progress ring
- [x] 1.2 Progress ring animation via stroke-dashoffset based on play progress
- [x] 1.3 Show elapsed/total time below the button during playback
- [x] 1.4 Tap during playback: pause (⏸) / resume (▶)

## 2. Bottom Control Bar Redesign

- [x] 2.1 Reading mode: show only CircularPlayButton centered, no dots
- [x] 2.2 Training mode: dot navigation (●○○○○) + ▶ + 🎤 buttons, no sentence text preview
- [x] 2.3 Modal mutual exclusion: playing hides 🎤, recording hides ▶
- [x] 2.4 Recorded state: dedicated area with ▶ playback + 🎤 re-record + ↻ replay original
- [x] 2.5 Auto-transition: full playback ends → training mode with first sentence selected
- [x] 2.6 Compact full-playback link at bottom of training mode

## 3. Dot Navigation

- [x] 3.1 Build DotNavigation component: ●○○○○ with total sentence count
- [x] 3.2 Active dot filled, others hollow, current sentence highlighted in article
- [x] 3.3 Tap a dot to jump to that sentence

## 4. Paragraph Indent + Cleanup

- [x] 4.1 Add text-indent: 2em to paragraphs in ArticleContent
- [x] 4.2 Remove NextQuestionBar component and its usage in PracticePage
- [x] 4.3 Remove button text labels (Listen/Record/Pause etc.) — icons only
- [x] 4.4 Build + type-check pass with zero errors
