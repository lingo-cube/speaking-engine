## ADDED Requirements

### Requirement: Dashboard shows available topics with progress
The system SHALL display a dashboard with topic cards showing topic name, question count, and last practice time.

#### Scenario: User opens the app
- **WHEN** the user navigates to the root URL
- **THEN** a dashboard displays all available topics as cards with progress indicators

### Requirement: Dashboard shows recent practice
The system SHALL display recently practiced questions with completion rate.

#### Scenario: User has previous practice sessions
- **WHEN** the user has completed at least one practice session
- **THEN** a recent practice section shows the last practiced questions with completion rates

### Requirement: Navigate to topic detail
The system SHALL navigate to a topic detail page showing all questions when a topic card is selected.

#### Scenario: User taps a topic card
- **WHEN** the user taps the "Hometown" topic card
- **THEN** the app navigates to /topic/hometown showing all questions for that topic
