## ADDED Requirements

### Requirement: Display question text
The system SHALL display the full question text prominently on the question panel.

#### Scenario: User selects a question from a topic
- **WHEN** the user taps on a question from the topic question list
- **THEN** the system displays the question text, type label, and framework label

### Requirement: Display question type label
The system SHALL display the question type as a visual tag.

#### Scenario: Question has a type
- **WHEN** a question has type "Description"
- **THEN** the system renders a TypeTag component with the text "Description"

### Requirement: Display question framework label
The system SHALL display the question framework as a visual tag.

#### Scenario: Question has a framework
- **WHEN** a question has framework "Fact → Example → Highlight"
- **THEN** the system renders a FrameworkTag component with the framework text

### Requirement: List questions for a topic
The system SHALL return all questions belonging to a selected topic.

#### Scenario: User selects a topic
- **WHEN** the user selects the "Hometown" topic
- **THEN** the system displays all questions associated with that topic
