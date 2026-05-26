## ADDED Requirements

### Requirement: Full-answer playback button always visible
The system SHALL display a full-answer playback button at the bottom center of the screen at all times when a question is selected.

#### Scenario: User views an answer
- **WHEN** a question with an answer is displayed
- **THEN** a bottom bar with a full-playback button is visible

#### Scenario: Full playback is in progress
- **WHEN** the user taps the full-playback play button
- **THEN** the button switches to a pause state and a progress indicator shows current sentence position

### Requirement: Listen and Record buttons appear when a sentence is selected
The system SHALL display two large buttons — Listen and Record — in the bottom bar when the user selects a sentence by tapping it in the article.

#### Scenario: User taps a sentence
- **WHEN** the user taps sentence 2 in the article
- **THEN** the bottom bar expands to show the full-playback bar, a Listen button, and a Record button

#### Scenario: User taps the same sentence again
- **WHEN** the user taps the currently selected sentence
- **THEN** the Listen and Record buttons disappear, leaving only the full-playback button

#### Scenario: User taps a different sentence
- **WHEN** the user taps sentence 3 while sentence 2 is selected
- **THEN** the Listen and Record buttons switch to control sentence 3

### Requirement: Listen button plays the selected sentence audio
The system SHALL play the audio for the currently selected sentence when the user taps the Listen button.

#### Scenario: User taps Listen
- **WHEN** the user taps the Listen button while sentence 2 is selected
- **THEN** the audio for sentence 2 plays and the button shows a pause icon

#### Scenario: User taps Listen again while playing
- **WHEN** the user taps Listen while audio is playing
- **THEN** the audio pauses and the button shows a play icon

### Requirement: Record button controls recording independently
The system SHALL allow the user to start and stop voice recording via the Record button independently of the Listen button.

#### Scenario: User taps Record
- **WHEN** the user taps the Record button
- **THEN** the system starts recording and the button shows a stop icon with elapsed time

#### Scenario: User stops recording
- **WHEN** the user taps the Record button while recording
- **THEN** recording stops and the button switches to a playback state

### Requirement: Bottom bar is fixed and always accessible
The system SHALL keep the bottom control bar fixed to the viewport so controls remain accessible while scrolling.

#### Scenario: User scrolls through the article
- **WHEN** the user scrolls down to read the last sentences
- **THEN** the bottom control bar remains visible at the bottom of the screen
