# Speaking Engine — UI Refactoring PRD (V8)

## 1. Background

We have a beautiful design system (DESIGN.md), clear product vision (PRODUCT.md), and visual enhancements defined (PRD-V7). But there's a critical gap: **the components don't use the design system**.

### Current Problem

Components like ShadowingView use:
- Hard-coded colors (`bg-orange-500`, `text-emerald-600`) instead of design tokens
- Magic numbers for spacing instead of spacing tokens
- Inline styles instead of component primitives
- Inconsistent states and animations

### Baseline Audit (Current State)

As of 2026-05-28, the codebase has:

| Metric | Current Count | Affected Files | Target |
|--------|----------------|----------------|--------|
| Hard-coded background colors | 13 occurrences | 6 files | 0 |
| Hard-coded text colors | 22 occurrences | 7 files | 0 |
| Hard-coded border colors | 12 occurrences | 4 files | 0 |
| Magic number spacing (arbitrary values) | 31+ occurrences | 6 files | 0 |
| Components with aria-label | 12/27 files | - | 27/27 |
| Reduced motion support | 0 files | - | All animated |
| Total component files | 27 .tsx files | - | - |

**Top offenders needing immediate attention:**
1. `ShadowingView.tsx` — 8+ hard-coded colors, magic spacing
2. `FullAnswerView.tsx` — 9 hard-coded text colors
3. `SessionHeader.tsx` — Mixed color usage
4. `CircularPlayButton.tsx` — Custom inline button styles

### Why This Matters

1. **Theme switching is impossible** — Hard-coded values break the two-theme system (Default / Animal Island)
2. **Maintenance debt accumulates** — Design system updates don't propagate to components
3. **Inconsistent user experience** — Different components behave differently
4. **V7 enhancements can't land properly** — Visual upgrades need components that respect tokens
5. **Accessibility is incomplete** — Only 44% of components have proper ARIA labels, zero have reduced motion support

### The Vision

**From Design System to Living Interface**

Make the design system actual, not theoretical. Every component should use tokens, making the interface coherent, themeable, maintainable, and fully accessible.

---

## 2. Design Context

### Physical Scene

A learner practices speaking in a quiet room, natural light, holding their phone with one hand while commuting or sitting at a desk. They need:
- Large, warm touch targets (44×44px minimum, 80px for signature controls)
- Clear state feedback (visual, haptic, and screen reader announcements)
- Gentle, encouraging transitions (200ms ease-out for states, spring physics for celebration)

### Color Strategy

**Restrained → Committed**: Practice surfaces use tinted neutrals with primary/tertiary accents for states (30-40% surface coverage during active practice).

### Motion Philosophy

- Spring physics for celebration moments (confetti, completion states)
- Ease-out (200ms) for all state transitions
- No CSS layout property animations
- **Respect `prefers-reduced-motion`** — All animations disable when user prefers reduced motion

---

## 3. Accessibility Standards

This PRD enforces WCAG AA minimum compliance with specific requirements for all primitives:

### Universal A11y Requirements

| Requirement | Specification | Implementation |
|-------------|---------------|-----------------|
| **Touch targets** | Minimum 44×44px | Enforced in all interactive primitives |
| **Focus indicators** | 3px offset, contrast ≥ 3:1 | `{accent-light}` ring, 3px offset |
| **Screen reader labels** | All interactive elements | `aria-label` required, `aria-live` for dynamic content |
| **Keyboard navigation** | Tab order logical | Natural DOM order, no tabindex trickery |
| **Color contrast** | 4.5:1 for text, 3:1 for UI | All token colors meet AA by design |
| **Reduced motion** | Respect user preference | `@media (prefers-reduced-motion: reduce)` in all animations |

### A11y in Primitive Interfaces

All primitive props include accessibility:

```typescript
// Example: All interactive primitives follow this pattern
interface ButtonProps {
  // ... visual props
  'aria-label'?: string;      // Required if icon-only
  'aria-pressed'?: boolean;   // For toggle buttons
  'aria-busy'?: boolean;      // For loading state
  'aria-describedby'?: string; // For additional context
}

interface AudioControlProps {
  label: string;              // Maps to aria-label
  'aria-pressed'?: boolean;   // Active state
  'aria-live'?: 'polite';     // For recording announcements
}
```

### Reduced Motion Strategy

```css
/* Base animation duration */
:root {
  --transition-duration: 200ms;
  --celebration-duration: 1200ms;
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 4. Core Primitives

These primitives form the foundation. All components will use them.

### 4.1 Button Primitive

**Interface:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'md' | 'lg';
  state?: 'default' | 'hover' | 'focus' | 'active' | 'disabled';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  'aria-label'?: string;
  'aria-pressed'?: boolean;
  'aria-describedby'?: string;
}
```

**State Matrix:**

| Variant | Default | Hover | Focus | Active | Disabled |
|---------|---------|-------|-------|--------|----------|
| **Primary** | `{primary}` bg, white text, pill shape, 16px 48px padding | `{primary-hover}` bg, lift shadow | `{accent-light}` focus ring (3px offset) | translateY(1px), press shadow | `{surface-200}` bg, muted text, aria-disabled |
| **Secondary** | `{surface-50}` bg, `{surface-500}` text, 8px rounded | Card tint hover (0.3), border fades | `{accent-light}` focus ring (3px offset) | translateY(1px) | `{surface-200}` bg, muted text, aria-disabled |
| **Tertiary** | `{tertiary}` bg, white text, pill shape | `{tertiary-dark}` bg, lift shadow | `{accent-light}` focus ring (3px offset) | translateY(1px), press shadow | `{surface-200}` bg, muted text, aria-disabled |

**Key Specifications:**
- Pill shape (50px border-radius) for primary/tertiary
- 8px rounded for secondary
- Touch targets minimum 44×44px (enforced via min-height/min-width)
- Focus ring: 3px offset, `{accent-light}` color, ensures 3:1 contrast
- Loading state: `aria-busy="true"` + skeleton spinner

**Responsive Behavior:**
- Mobile (≤ 640px): Full-width buttons for primary actions
- Desktop: Width adapts to content, max-width 400px

---

### 4.2 AudioControl Primitive

**Interface:**
```typescript
interface AudioControlProps {
  type: 'play' | 'pause' | 'record' | 'stop';
  state: 'idle' | 'active' | 'loading';
  onToggle: () => void;
  label: string;              // Maps to aria-label (required)
  'aria-pressed'?: boolean;   // Derived from state
  'aria-live'?: 'polite';     // For recording state changes
  showPulse?: boolean;        // Recording state
}
```

**Play Button States:**

| State | Background | Border | Icon | Animation |
|-------|------------|--------|------|-----------|
| Idle | `{surface-50}` | `{surface-200}` 3px | `{primary}` fill | None |
| Active | `{primary}` | `{primary-hover}` 3px | White fill | None |
| Loading | `{surface-100}` | `{surface-200}` 3px | `{surface-300}` fill | Spinner (respects reduced motion) |

**Record Button States:**

| State | Background | Border | Icon | Animation |
|-------|------------|--------|------|-----------|
| Idle | `{surface-50}` | `{danger-light}` 3px | `{danger}` fill | None |
| Recording | `{danger}` | `{danger-hover}` 3px | White fill | Pulse 1.5s (disabled with reduced motion) |
| Stop | `{surface-500}` | `{surface-900}` 3px | White fill | None |

**Key Specifications:**
- 80px circular buttons (signature element, exceeds 44×44 minimum)
- 3px border for visual weight
- Hover scale: 1.05 (disabled with reduced motion)
- Active scale: 0.95 (disabled with reduced motion)
- Pulse animation: `0 0 0 15px rgba(255, 75, 75, 0)` → respects `prefers-reduced-motion`

**Responsive Behavior:**
- Mobile: 80px fixed (thumb-friendly)
- Desktop: 80px fixed (maintains signature appearance)

**A11y Annotations:**
```tsx
<button
  className={`audio-control audio-control--${type} audio-control--${state}`}
  onClick={onToggle}
  aria-label={label}                    // Required: "Play audio", "Record"
  aria-pressed={state === 'active'}    // Toggle state
  aria-live={showPulse ? 'polite' : undefined}  // Announce recording state
>
```

---

### 4.3 ProgressIndicator Primitive

**Interface:**
```typescript
interface ProgressIndicatorProps {
  type: 'dots' | 'bar';
  total: number;
  current: number;
  completed: number[];
  'aria-valuenow': number;
  'aria-valuemin': number;
  'aria-valuemax': number;
  'aria-label'?: string;
}
```

**Dot Navigation:**
- 8px dots, 50% border-radius (exceeds 44×44 when expanded)
- Completed: `{primary}` background, scale 1.0
- Current: `{tertiary}` background, scale 1.25, glow ring
- Incomplete: `{surface-200}` background
- 300ms ease-out transitions (respects reduced motion)
- `role="progressbar"` with proper ARIA values

**Progress Bar:**
- 8px height, 4px border-radius
- `{surface-100}` track background
- Gradient fill: `{primary}` → `{tertiary}` (90deg)
- 500ms ease-out width transition (respects reduced motion)

**A11y Implementation:**
```tsx
<div
  role="progressbar"
  aria-valuenow={current}
  aria-valuemin={0}
  aria-valuemax={total}
  aria-label={label || "Progress"}
>
  {/* dots or bar */}
</div>
```

---

### 4.4 Card Primitive

**Interface:**
```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'flat';
  state?: 'default' | 'hover' | 'selected' | 'disabled';
  isClickable?: boolean;
  isSelected?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  padding?: 'none' | 'tight' | 'normal' | 'loose';
  'aria-label'?: string;
  'aria-pressed'?: boolean;
  'aria-describedby'?: string;
}
```

**State Matrix:**

| Variant | Default | Hover | Selected | Disabled |
|---------|---------|-------|----------|----------|
| **Default** | `{surface-50}` bg, 1px `{surface-200}` border, 16px rounded | Tint hover (0.3), border fades, lift shadow | `{primary}` bg, white text | `{surface-200}` bg, muted |
| **Elevated** | White bg, shadow-lg, 16px rounded | Lift shadow (scale), border appears | `{primary}` bg, white text | Gray bg, no shadow |
| **Flat** | Transparent bg, no border, no shadow | `{surface-100}` bg appears | `{primary-light}` bg | No change |

**Key Specifications:**
- 16px border-radius (2xl) for most cards
- Padding variants:
  - `none`: 0 (for nested content)
  - `tight`: `clamp(12px, 2vw, 24px)` (spacing.tight)
  - `normal`: `clamp(24px, 4vw, 48px)` (spacing.group) — default
  - `loose`: `clamp(48px, 8vw, 96px)` (spacing.section)
- Shadow vocabulary: flat by default, lift on hover
- Tint hover: 30% color mix

**Responsive Behavior:**
- Mobile: `normal` padding = 24px (tighter for small screens)
- Desktop: `normal` padding = 48px (generous breathing room)

---

### 4.5 Primitive Composition Rules

To prevent magic spacing from re-entering through primitive nesting:

| Parent Primitive | Child Primitive Margin Policy | Example |
|-----------------|-------------------------------|---------|
| **Card** | Text, Button, Chip have 0 default margin | Use padding variants on Card |
| **Card (tight padding)** | Text, Button, Chip have 0 default margin | Use gap in flex containers |
| **Button (with icon)** | Icon has 8px gap from text | Built into Button primitive |
| **ProgressIndicator** | No margin, controlled by parent | Use parent's gap/flex |

**Layout Container Pattern:**
```tsx
{/* ✅ Correct: Parent controls spacing via gap */}
<Card padding="normal">
  <div className="flex flex-col gap-item">  {/* Uses spacing.item token */}
    <Text variant="title">Title</Text>
    <Text variant="body">Body</Text>
    <Button variant="primary">Action</Button>
  </div>
</Card>

{/* ❌ Incorrect: Magic margins on children */}
<Card padding="normal">
  <Text variant="title" className="mb-4">Title</Text>  {/* Don't do this */}
  <Text variant="body" className="mb-8">Body</Text>
</Card>
```

---

## 5. Token Strategy for Theme Switching

### Forward-Looking CSS Variable Architecture

Phase 5 requires a token system that maps cleanly to CSS variables. We establish this in Phase 1.

**Token Naming Convention:**
```css
/* Semantic naming (not color names) */
:root {
  /* Primary brand colors */
  --color-primary: oklch(70% 0.18 145);         /* Green */
  --color-primary-hover: oklch(60% 0.18 145);
  --color-primary-light: oklch(92% 0.08 145);

  /* Tertiary accent colors */
  --color-tertiary: oklch(75% 0.20 50);        /* Orange */
  --color-tertiary-hover: oklch(65% 0.20 50);
  --color-tertiary-dark: oklch(55% 0.20 50);

  /* Semantic colors */
  --color-success: var(--color-primary);
  --color-danger: oklch(55% 0.15 25);
  --color-warning: oklch(85% 0.15 85);

  /* Surface colors (warm neutrals) */
  --color-surface-50: oklch(98% 0.008 50);
  --color-surface-100: oklch(94% 0.008 50);
  --color-surface-500: oklch(45% 0.008 50);
  --color-surface-900: oklch(25% 0.008 50);

  /* Spacing tokens */
  --spacing-tight: clamp(12px, 2vw, 24px);
  --spacing-group: clamp(24px, 4vw, 48px);
  --spacing-section: clamp(48px, 8vw, 96px);

  /* Animation durations */
  --transition-duration: 200ms;
  --celebration-duration: 1200ms;
}

/* Animal Island theme overrides */
[data-theme="animal-island"] {
  --color-primary: oklch(70% 0.18 145);         /* Warmer green */
  --color-primary-light: oklch(92% 0.12 145);
  --color-tertiary: oklch(80% 0.25 45);         /* Brighter orange */
}
```

**Tailwind Integration:**
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-light': 'var(--color-primary-light)',
        tertiary: 'var(--color-tertiary)',
        // ... all semantic tokens
      },
      spacing: {
        'tight': 'var(--spacing-tight)',
        'group': 'var(--spacing-group)',
        'section': 'var(--spacing-section)',
      }
    }
  }
}
```

This ensures:
1. Phase 1 primitives use Tailwind classes that map to CSS variables
2. Phase 5 theme switching is just CSS variable overrides
3. No component rewrites needed when themes are added

---

## 6. Implementation Phases

### Phase 1: Primitives Foundation

**Priority: P0**
**Duration: 1 week**

Build the primitives library in `/frontend/src/components/primitives/`:

1. **Button** - Primary, Secondary, Tertiary variants with full states
2. **AudioControl** - Play/Pause, Record/Stop with pulse animations
3. **ProgressIndicator** - Dot navigation and progress bar
4. **Card** - Default, Elevated, Flat variants with padding system
5. **Text** - Typography hierarchy (title, body, label)
6. **Chip** - Tags and pills

**Exit Criteria:**
- All primitives use design tokens exclusively
- CSS variable architecture established for theme switching
- Storybook or visual test for each primitive
- Accessibility audit passes (including reduced motion)
- All states (default, hover, focus, active, disabled) documented

**Risk Mitigation:**
- If primitives take longer than 1 week, freeze scope at Button + Card + Text only
- Defer AudioControl and ProgressIndicator to Phase 2
- Use existing ad-hoc components as temporary stopgap

---

### Phase 2: ShadowingView Migration

**Priority: P0**
**Duration: 3 days**
**Depends on:** Phase 1 (at least Button, Card, Text primitives)

Migrate ShadowingView to use primitives:

**Before:**
```tsx
<div className="bg-white rounded-3xl border-2 border-orange-100 shadow-lg">
  <p className="text-[22px] sm:text-[28px] font-bold">
    {current.text}
  </p>
</div>
```

**After:**
```tsx
<Card variant="elevated" isSelected={isActive} padding="loose">
  <Text variant="title-lg">{current.text}</Text>
</Card>
```

**Scope:**
- Progress indicators → ProgressIndicator
- Audio controls → AudioControl
- Action buttons → Button
- Chunk display → Card + Text
- Badge → Chip

**Exit Criteria:**
- Zero hard-coded colors or spacing values
- All states (default, hover, active, disabled) work correctly
- Mobile responsive behavior preserved
- Reduced motion respected
- All ARIA labels present

**Risk Mitigation:**
- If AudioControl primitive is unavailable, keep existing CircularPlayButton as-is
- If ProgressIndicator primitive is unavailable, keep existing dot navigation
- Focus on Card + Text + Button migration first (core visual)

---

### Phase 3: Component Migration

**Priority: P1**
**Duration: 1 week**
**Depends on:** Phase 1

Migrate remaining components:

| Component | Primitives Needed | Priority |
|-----------|-------------------|----------|
| TopicCard | Card, Text, Chip | High |
| QuestionCard | Card, Text, ProgressIndicator | High |
| ArticleView | Card, Text, ProgressIndicator | High |
| TrainingDrawer | Card, Button, Text | Medium |
| SessionHeader | Text, Chip | Medium |
| NextPreviewBar | Card, Text, Button | Low |
| CircularPlayButton | AudioControl (when available) | Medium |

**Exit Criteria:**
- All components use primitives where available
- No inline styles or hard-coded values
- Consistent behavior across surfaces
- A11y audit passes (all components have proper labels)

**Risk Mitigation:**
- If Phase 1 primitives are incomplete, migrate high-priority components first
- Lower-priority components can defer to Phase 5
- Accept temporary hybrid state (some primitives, some legacy)

---

### Phase 4: V7 Visual Enhancements

**Priority: P2**
**Duration: 1 week**
**Depends on:** Phase 2, Phase 3

Integrate PRD-V7 enhancements on top of the token-based foundation:

1. **Background patterns** - Grid pattern + glow effects (using CSS variables)
2. **Progress band** - Three-color gradient on card tops (primary → tertiary → accent)
3. **Celebration animation** - Confetti on session completion (respects reduced motion)
4. **Hover feedback** - Scale + shadow micro-interactions (respects reduced motion)

**Why this order:** V7 enhancements require components that respect tokens to work properly. Adding them on top of primitives ensures consistency.

**Exit Criteria:**
- V7 enhancements work on both Default and Animal Island themes (when available)
- Reduced motion mode disables all decorative animations
- Performance budget met (60fps on all animations)

---

### Phase 5: Theme Switching Infrastructure

**Priority: P3**
**Duration: 3 days**
**Depends on:** Phase 1-4

Enable the two-theme system using the CSS variable architecture from Phase 1:

1. **Theme provider** - React context for theme switching
2. **Default theme** - Current green/teal/orange palette (already defined)
3. **Animal Island theme** - Warmer, rounded, game-like tokens
4. **Persistence** - User preference saved to localStorage

**Exit Criteria:**
- Theme switcher component works
- Both themes apply without component changes (just CSS variable swaps)
- Theme preference persists across sessions
- Reduced motion preference persists independently

---

## 7. Named Rules (With Exceptions)

These primitives embody the following design rules:

1. **The Flat-By-Default Rule**: Cards are flat at rest; shadows appear only on hover/selection.
2. **The Warm-First Neutral Rule**: All neutrals tint toward amber (chroma 0.005–0.01 @ hue 50).
3. **The Celebration Green Rule (with exceptions)**: Success states use `{primary}` (green), `{tertiary}` (orange), or `{accent}` (teal) by default.
   - **Exception**: Special achievements (100% streak, milestone completions) may use gold accent (`oklch(85% 0.15 85)`) for badge/medal visual only. Never for gradients or UI elements.
4. **The Spring-Physics-Celebration Rule**: Confetti/success use spring physics; state transitions use ease-out 200ms. Both respect `prefers-reduced-motion`.
5. **The Touch-Target Rule**: Minimum 44×44px, with 80px for signature audio controls.
6. **The Reading-First Rule**: Body text max-width 65–75ch, optimized for at-a-glance reading during shadowing.
7. **The Accessibility-First Rule**: All primitives include ARIA attributes, keyboard navigation, and reduced motion support by default.

---

## 8. Success Criteria

### Technical

- [ ] Zero hard-coded colors in component files (except primitives)
- [ ] All spacing uses design tokens (clamp-based for responsiveness)
- [ ] All typography follows the Text component hierarchy
- [ ] All primitives map to CSS variables for theme switching
- [ ] Accessibility audit passes (WCAG AA minimum, including reduced motion)
- [ ] Theme switching works without component changes

### User Experience

- [ ] Practice friction < 1 second (smooth state transitions)
- [ ] Touch targets ≥ 44×44px on mobile (verified by audit)
- [ ] Clear visual feedback for all states (including keyboard focus)
- [ ] Celebrations feel encouraging, not gimmicky
- [ ] One-handed mobile operation works (80px audio controls)
- [ ] Reduced motion mode disables all decorative animations

### Design System

- [ ] DESIGN.md tokens are the single source of truth
- [ ] Updating DESIGN.md propagates to all components via Tailwind rebuild
- [ ] Primitives library is reusable and documented
- [ ] Visual consistency across all surfaces

### Baseline Comparison

| Metric | Before (Current) | After (Target) |
|--------|------------------|----------------|
| Hard-coded colors | 47 occurrences | 0 |
| Magic number spacing | 31+ occurrences | 0 |
| Components with ARIA labels | 12/27 (44%) | 27/27 (100%) |
| Reduced motion support | 0 files | All animated |
| Theme switchable | No | Yes (2 themes) |

---

## 9. Risk Management & Rollback Plan

### Identified Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Phase 1 primitives incomplete | Medium | High | Freeze scope at Button + Card + Text; defer others |
| Component behavior breaks during migration | Medium | High | Keep legacy components in parallel; gradual migration |
| Performance regression from animations | Low | Medium | Profile before/after; use `will-change` sparingly |
| Theme switching exposes color bugs | Medium | Medium | Comprehensive visual test for both themes |
| Timeline exceeds 4 weeks | Medium | Low | See degraded delivery plan below |

### Degraded Delivery Plan (If Timeline Slips)

**If Phase 1 exceeds 1 week:**
- Deliver Button, Card, Text primitives only (AudioControl, ProgressIndicator deferred)
- Proceed with Phase 2 using partial primitives
- Target: 80% of visual consistency in 2 weeks instead of 100% in 4 weeks

**If Phase 2-3 migration exceeds 2 weeks:**
- Prioritize ShadowingView + TopicCard + QuestionCard (high-value surfaces)
- Defer NextPreviewBar, lower-priority components
- Target: Core practice flow token-aligned, admin surfaces legacy

**If Phase 4 (V7 enhancements) exceeds 1 week:**
- Ship background patterns + progress band only
- Defer celebration animation, hover feedback
- Target: Visual improvements without motion polish

**Rollback Strategy:**
- Each phase commits to feature branch (not main)
- If phase fails, revert to previous phase's branch
- Main branch never receives incomplete work
- Component migration is additive (new primitives don't break old components)

---

## 10. Migration Example

### ShadowingView Before

```tsx
// Hard-coded colors, inline styles, magic numbers
<button
  className={`w-[80px] h-[80px] flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer border-[3px]
    ${isPlaying
      ? 'bg-orange-500 border-orange-600 text-white shadow-xl shadow-orange-200'
      : 'bg-white border-orange-200 text-orange-600 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-100'}`}
>
  {/* No aria-label, no reduced motion support */}
</button>
```

### ShadowingView After

```tsx
// Clean, semantic, token-aligned, fully accessible
<AudioControl
  type={isPlaying ? 'pause' : 'play'}
  state={isPlaying ? 'active' : 'idle'}
  onToggle={() => isPlaying ? pause() : play()}
  label={isPlaying ? 'Pause audio' : 'Play audio'}
  aria-pressed={isPlaying}
/>
```

---

## 11. Timeline Summary

| Phase | Duration | Dependencies | Degraded Delivery |
|-------|----------|--------------|-------------------|
| Phase 1: Primitives | 1 week | None | Button + Card + Text only (3 days) |
| Phase 2: ShadowingView | 3 days | Phase 1 (partial OK) | Migrate Card + Text only |
| Phase 3: Component Migration | 1 week | Phase 1 | High-priority components only (1 week) |
| Phase 4: V7 Enhancements | 1 week | Phase 2, 3 | Patterns + progress band only (3 days) |
| Phase 5: Theme Switching | 3 days | Phase 1-4 | Can defer indefinitely |

**Best case: 4 weeks | Degraded: 2-3 weeks (core value delivered)**

---

## 12. Anti-Patterns

We explicitly reject:

- **SaaS clichés**: High-saturation gradients, flashy effects, hero-metric templates
- **Side-stripe borders**: `border-left` or `border-right` as colored accents
- **Gradient text**: `background-clip: text` for emphasis
- **Glassmorphism**: Blur effects used decoratively
- **Identical card grids**: Same-sized cards repeated endlessly
- **Decorative motion**: Animations that don't convey state
- **Magic spacing**: Arbitrary pixel values instead of design tokens
- **Accessibility afterthoughts**: ARIA attributes added as an afterthought

The design serves the practice flow, not impresses with visual tricks.

---

## 13. Next Steps

1. **Review and approve this PRD**
2. **Create implementation plan** with detailed task breakdown
3. **Start with Phase 1** — build the primitives library (Button, Card, Text first)
4. **Validate each phase** before proceeding to the next
5. **Run accessibility audit** after Phase 2 (first migrated component)

---

*"The design system should be actual, not theoretical. Every component should use tokens, making the interface coherent, themeable, maintainable, and fully accessible."*
