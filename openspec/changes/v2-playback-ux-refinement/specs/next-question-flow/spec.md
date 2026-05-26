## ADDED Requirements

### Requirement: Desktop sidebar for question navigation
The system SHALL display a sidebar with the full question list on desktop viewports, with the current question highlighted and clickable to switch.

#### Scenario: User clicks a question in the sidebar
- **WHEN** the user clicks question 3 in the desktop sidebar
- **THEN** the article updates to show question 3's answer and the sidebar highlights question 3

### Requirement: Mobile next-question preview bar
The system SHALL display a compact preview bar at the bottom of the screen on mobile after the user finishes practicing, showing the next question title and a Next button.

#### Scenario: Next-question bar appears
- **WHEN** the user is on question 2 of 5 and scrolls near the bottom of the article
- **THEN** a preview bar slides up showing "Q3: How has education changed..." with a [→ Next] button

#### Scenario: User taps Next
- **WHEN** the user taps [→ Next] on the mobile preview bar
- **THEN** the article transitions to question 3 with a fade-in animation and the bottom bar resets to reading mode

### Requirement: Last question behavior
The system SHALL indicate completion when the user reaches the last question.

#### Scenario: User is on the last question
- **WHEN** the user is on question 15 of 15
- **THEN** the next-question preview bar shows "All questions complete! Start over?" with a restart button
