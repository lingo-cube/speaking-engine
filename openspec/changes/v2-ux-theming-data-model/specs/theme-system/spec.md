## ADDED Requirements

### Requirement: Components use semantic color tokens
The system SHALL reference brand colors via semantic utility classes (`bg-primary`, `text-primary`, `bg-danger`) instead of hardcoded palette colors (`bg-indigo-500`, `text-red-500`).

#### Scenario: Button uses primary color
- **WHEN** a primary action button is rendered
- **THEN** it uses `bg-primary` class, not `bg-indigo-500`

### Requirement: Theme switching via data attribute
The system SHALL support theme switching by changing the `data-theme` attribute on the document root element.

#### Scenario: Switch to dark theme
- **WHEN** `document.documentElement.dataset.theme` is set to `"dark"`
- **THEN** all components using semantic tokens update their colors accordingly without layout changes

#### Scenario: Switch back to light theme
- **WHEN** the `data-theme` attribute is removed or set to `"light"`
- **THEN** all components revert to the default light color scheme

### Requirement: Tailwind native grays remain unchanged
The system SHALL continue using Tailwind's native gray palette (`gray-50` through `gray-900`) for neutral colors rather than semantic tokens.

#### Scenario: Text uses secondary color
- **WHEN** secondary text is rendered
- **THEN** it uses `text-gray-500` class, unchanged from before

### Requirement: Layout and spacing are unaffected by theme
The system SHALL NOT change any layout, spacing, sizing, or positioning when switching themes.

#### Scenario: Theme is toggled
- **WHEN** the theme switches from light to dark
- **THEN** component positions, sizes, padding, and margins remain identical
