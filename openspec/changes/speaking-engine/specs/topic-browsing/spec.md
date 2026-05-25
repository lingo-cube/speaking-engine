## ADDED Requirements

### Requirement: List all topics
The system SHALL return all available speaking topics grouped by category.

#### Scenario: User opens the topic list
- **WHEN** the user navigates to the practice page
- **THEN** the system displays all available topics with their names and categories

#### Scenario: No topics exist
- **WHEN** no topics have been created
- **THEN** the system displays an empty state message indicating no topics are available

### Requirement: Filter topics by category
The system SHALL allow filtering topics by their category.

#### Scenario: User selects a category filter
- **WHEN** the user selects the "IELTS" category filter
- **THEN** the system displays only topics belonging to the IELTS category
