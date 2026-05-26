## 1. API Contract Types (Data Model)

- [x] 1.1 Create `src/types/api.ts` with `ApiTopic`, `ApiQuestion`, `ApiAnswer`, `ApiChunk` types matching Go json tags
- [x] 1.2 Add `paragraph` optional field to `ApiChunk` for paragraph grouping
- [x] 1.3 Add `AnswerWithChunks` UI composition type to `src/types/api.ts`
- [x] 1.4 Update `mock/data.ts` to import and use API contract types
- [x] 1.5 Add `created_at`/`updated_at` fields to all mock data objects
- [x] 1.6 Group mock chunks into paragraphs (assign `paragraph` field)
- [x] 1.7 Replace old types in `src/types/index.ts` to re-export from `api.ts`

## 2. Theme System (CSS Token Architecture)

- [x] 2.1 Define `--color-primary`, `--color-primary-hover`, `--color-primary-light` CSS variables in `index.css`
- [x] 2.2 Define `--color-danger`, `--color-danger-hover` CSS variables
- [x] 2.3 Define `--color-highlight`, `--color-highlight-light` CSS variables
- [x] 2.4 Map CSS variables to Tailwind `@theme` directives
- [x] 2.5 Add `[data-theme="dark"]` overrides for all 7 tokens
- [x] 2.6 Replace `bg-indigo-*` → `bg-primary*` in all components (AudioPlayer, FullAudioBar, SentenceLine, TopicCard, QuestionCard, ArticleContent)
- [x] 2.7 Replace `text-indigo-*` → `text-primary*` in all components
- [x] 2.8 Replace `bg-red-*`/`text-red-*` → `bg-danger`/`text-danger` in RecordButton
- [x] 2.9 Replace `bg-amber-*`/`text-amber-*` → `bg-highlight*`/`text-highlight` in SentenceLine
- [x] 2.10 Build minimal `ThemeSwitcher` component (toggle button, sets `data-theme`)

## 3. Bottom Control Bar (UX Refactor)

- [x] 3.1 Build `BottomControlBar` component with state machine: idle / selected / recording / recorded
- [x] 3.2 Implement full-playback button (always visible, compact bar with progress dots)
- [x] 3.3 Implement Listen button (large, primary color, Play→Pause toggle)
- [x] 3.4 Implement Record button (large, danger color, Record→Stop→Playback cycle)
- [x] 3.5 Add `pb-28` bottom padding to ArticleView to prevent control bar overlap
- [x] 3.6 Wire sentence selection from ArticleContent → BottomControlBar via ArticleView state
- [x] 3.7 Deselect sentence when tapping active sentence again (collapse controls)

## 4. Article Paragraph Structure & Typography

- [x] 4.1 Render paragraph breaks in ArticleContent: group consecutive chunks with same `paragraph` value, add `mt-4` between groups
- [x] 4.2 Apply reading-optimized typography: `text-lg` (18px), `leading-relaxed` (1.75), `text-gray-800`
- [x] 4.3 Ensure paragraph spacing does not affect sentence click/highlight behavior

## 5. Integration & Cleanup

- [x] 5.1 Update ArticleView to compose BottomControlBar instead of TrainingDrawer
- [x] 5.2 Remove TrainingDrawer component and its imports
- [x] 5.3 Verify full-playback highlighting still synced with BottomControlBar
- [x] 5.4 Build + type-check pass with zero errors
- [x] 5.5 Visual QA: article readable, paragraph breaks clear, bottom bar fixed, buttons large and tappable on 375px viewport
