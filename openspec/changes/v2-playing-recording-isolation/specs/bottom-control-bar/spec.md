## MODIFIED Requirements

### Requirement: Training mode has separate play and record zones
The system SHALL display playback and recording controls in two separate full-width cards stacked vertically when in training mode, without repeating the selected sentence text.

#### Scenario: Training mode shows two isolated zones
- **WHEN** a sentence is selected
- **THEN** the bottom bar shows a play zone card (primary color, ▶ icon centered) and a record zone card (danger color, 🎤 icon centered), stacked vertically

#### Scenario: Play zone contains only an icon
- **WHEN** training mode is active
- **THEN** the play zone shows only a play/pause icon with no text label or progress bar

### Requirement: Record zone has three distinct visual states
The system SHALL display the record zone in one of three states without horizontal cramming.

#### Scenario: Ready to record
- **WHEN** the record zone is in ready state
- **THEN** a 🎤 icon is centered in the card

#### Scenario: Recording in progress
- **WHEN** recording is active
- **THEN** the card shows a ⏹ stop icon with an elapsed time counter

#### Scenario: Recording complete
- **WHEN** recording has been stopped and audio is available
- **THEN** the card shows a playback button and a re-record button with adequate spacing
