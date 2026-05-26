## MODIFIED Requirements

### Requirement: Play audio for a sentence chunk
The system SHALL play the audio for the currently selected sentence when the user activates the Listen button in the bottom control bar, or play all chunks sequentially when the user activates the full-playback button.

#### Scenario: User plays selected sentence via Listen button
- **WHEN** the user selects sentence 2 and taps the Listen button in the bottom bar
- **THEN** the system plays sentence 2's audio and the Listen button shows a pause state

#### Scenario: User plays full answer via full-playback button
- **WHEN** the user taps the full-playback button in the bottom bar
- **THEN** the system plays all chunk audio files sequentially from chunk 1

### Requirement: Listen and Record operate independently
The system SHALL allow the Listen button and Record button to be used independently in any order and any number of times.

#### Scenario: User listens twice then records
- **WHEN** the user taps Listen twice then taps Record
- **THEN** the system plays the audio twice and then starts recording without any forced workflow
