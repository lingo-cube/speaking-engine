## MODIFIED Requirements

### Requirement: Full answer displays all chunks as article
The system SHALL display the complete sample answer as a typography-driven immersive article with question at 48px/700, body at 28px/400/line-height 1.9, and max-width 720px. Chunks SHALL flow as inline text without card borders.

#### Scenario: User enters full-answer mode
- **WHEN** the user starts a session
- **THEN** the question is displayed at 48px bold, body text at 28px with 1.9 line-height, paragraphs separated by 32px

### Requirement: Centered circular audio player
The system SHALL provide a single centered circular play button as the core page action, with three states: idle (▶), playing (⏸ + progress ring), completed (✓).

#### Scenario: User taps play
- **WHEN** the user taps the ▶ button
- **THEN** full playback begins, the button shows ⏸ with an animated progress ring and current time below

#### Scenario: Playback completes
- **WHEN** the last chunk finishes playing
- **THEN** the button shows ✓ and a "Start Shadowing" CTA appears below

### Requirement: Subtle chunk highlight during playback
The system SHALL highlight the currently playing chunk with a soft glow and automatically advance the highlight as playback progresses.

#### Scenario: Chunk is playing
- **WHEN** a chunk's audio or TTS is active
- **THEN** that chunk shows a subtle glow (shadow + light background) with smooth transition, and the highlight moves to the next chunk automatically
