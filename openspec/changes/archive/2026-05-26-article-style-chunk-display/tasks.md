## 1. Full-Answer Audio Playback

- [x] 1.1 Extend useAudioPlayer hook with `playSequential(urls: string[])` method that chains audio playback (auto-advance to next URL on ended event)
- [x] 1.2 Add `currentIndex` and `totalCount` state for tracking which sentence is playing during sequential playback
- [x] 1.3 Handle chunks without audio URLs during sequential playback (skip to next)
- [x] 1.4 Build FullAudioBar component — play/pause button + "Sentence X / Y" progress text, positioned above the article

## 2. Article View Components

- [x] 2.1 Build SentenceLine component — inline clickable sentence with hover effect, highlighted state (light indigo background), and subtle bottom padding for visual separation
- [x] 2.2 Build ArticleContent component — wraps SentenceLine components in a single continuous text block with proper typography (leading-relaxed, text-lg)
- [x] 2.3 Build ArticleView component — composes FullAudioBar + ArticleContent, manages which sentence is selected for training

## 3. Training Drawer

- [x] 3.1 Build TrainingDrawer component — bottom slide-up panel containing AudioPlayer (single-sentence mode) and RecordButton for the selected sentence
- [x] 3.2 Add slide-up/down transition animation (transform + opacity, 200ms)
- [x] 3.3 Add close behavior: click active sentence again or tap overlay/close button dismisses the drawer
- [x] 3.4 Ensure drawer content switches smoothly when clicking a different sentence while drawer is open

## 4. Integration

- [x] 4.1 Update PracticePage to use ArticleView instead of QuestionCard + ShadowingPanel
- [x] 4.2 Keep QuestionCard at top of page (question text + tags), place ArticleView below with full-answer playback bar and article content
- [x] 4.3 Wire full-answer playback: collect all chunk audio URLs from answer, pass to useAudioPlayer sequential mode
- [x] 4.4 Sync full-playback highlighting: highlight the currently playing sentence in ArticleContent during sequential playback
- [x] 4.5 Remove the old ShadowingPanel component import (keep file for reference, mark deprecated)

## 5. Polish

- [x] 5.1 Add safe-area padding to TrainingDrawer for mobile devices with home indicator
- [x] 5.2 Add keyboard/mouse accessibility: sentences are focusable, Enter/Space activates training
- [x] 5.3 Test full playback with mock data (all chunks use same mock audio URL — verify sequential behavior)
- [x] 5.4 Verify mobile layout: article readable at 375px width, drawer reachable with thumb
