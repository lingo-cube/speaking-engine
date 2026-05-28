# Speaking Engine — UI Refactoring PRD (V8)

## 1. Background

We have a beautiful design system (DESIGN.md), clear product vision (PRODUCT.md), and visual enhancements defined (PRD-V7). But there's a critical gap: **the components don't use the design system**.

### Current Problem

Components like ShadowingView use:
- Hard-coded colors (`bg-orange-500`, `text-emerald-600`) instead of design tokens
- Magic numbers for spacing instead of spacing tokens
- Inline styles instead of component primitives
- Inconsistent states and animations

### Why This Matters

1. **Theme switching is impossible** — Hard-coded values break the two-theme system (Default / Animal Island)
2. **Maintenance debt accumulates** — Design system updates don't propagate to components
3. **Inconsistent user experience** — Different components behave differently
4. **V7 enhancements can't land properly** — Visual upgrades need components that respect tokens

### The Vision

**From Design System to Living Interface**

Make the design system actual, not theoretical. Every component should use tokens, making the interface coherent, themeable, and maintainable.

---

## 2. Design Context

### Physical Scene

A learner practices speaking in a quiet room, natural light, holding their phone with one hand while commuting or sitting at a desk. They need:
- Large, warm touch targets
- Clear state feedback
- Gentle, encouraging transitions

### Color Strategy

**Restrained → Committed**: Practice surfaces use tinted neutrals with primary/tertiary accents for states (30-40% surface coverage during active practice).

### Motion Philosophy

- Spring physics for celebration moments
- Ease-out (200ms) for all state transitions
- No CSS layout property animations

---

## 3. Core Primitives

These primitives form the foundation. All components will use them.

### 3.1 Button Primitive

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
}
```

**State Matrix:**

| Variant | Default | Hover | Focus | Active | Disabled |
|---------|---------|-------|-------|--------|----------|
| **Primary** | `{primary}` bg, white text, pill shape, 16px 48px padding | `{primary-hover}` bg, lift shadow | `{accent-light}` focus ring | translateY(1px), press shadow | `{surface-200}` bg, muted text |
| **Secondary** | `{surface-50}` bg, `{surface-500}` text, 8px rounded | Card tint hover (0.3), border fades | `{accent-light}` focus ring | translateY(1px) | `{surface-200}` bg, muted text |
| **Tertiary** | `{tertiary}` bg, white text, pill shape | `{tertiary-dark}` bg, lift shadow | `{accent-light}` focus ring | translateY(1px), press shadow | `{surface-200}` bg, muted text |

**Key Specifications:**
- Pill shape (50px border-radius) for primary/tertiary
- 8px rounded for secondary
- Touch targets minimum 44×44px
- Focus ring uses `{accent-light}`, not default blue

---

### 3.2 AudioControl Primitive

**Interface:**
```typescript
interface AudioControlProps {
  type: 'play' | 'pause' | 'record' | 'stop';
  state: 'idle' | 'active' | 'loading';
  onToggle: () => void;
  label: string;
  showPulse?: boolean;  /* recording state */
}
```

**Play Button States:**

| State | Background | Border | Icon | Animation |
|-------|------------|--------|------|-----------|
| Idle | `{surface-50}` | `{surface-200}` 3px | `{primary}` fill | None |
| Active | `{primary}` | `{primary-hover}` 3px | White fill | None |
| Loading | `{surface-100}` | `{surface-200}` 3px | `{surface-300}` fill | Spinner |

**Record Button States:**

| State | Background | Border | Icon | Animation |
|-------|------------|--------|------|-----------|
| Idle | `{surface-50}` | `{danger-light}` 3px | `{danger}` fill | None |
| Recording | `{danger}` | `{danger-hover}` 3px | White fill | Pulse 1.5s |
| Stop | `{surface-500}` | `{surface-900}` 3px | White fill | None |

**Key Specifications:**
- 80px circular buttons (signature element)
- 3px border for visual weight
- Pulse animation during recording: `0 0 0 15px rgba(255, 75, 75, 0)`
- Hover scale: 1.05
- Active scale: 0.95

---

### 3.3 ProgressIndicator Primitive

**Interface:**
```typescript
interface ProgressIndicatorProps {
  type: 'dots' | 'bar';
  total: number;
  current: number;
  completed: number[];
}
```

**Dot Navigation:**
- 8px dots, 50% border-radius
- Completed: `{primary}` background, scale 1.0
- Current: `{tertiary}` background, scale 1.25, glow ring
- Incomplete: `{surface-200}` background
- 300ms ease-out transitions

**Progress Bar:**
- 8px height, 4px border-radius
- `{surface-100}` track background
- Gradient fill: `{primary}` → `{tertiary}` (90deg)
- 500ms ease-out width transition

---

### 3.4 Card Primitive

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
- Spacing: `clamp(24px, 4vw, 48px)` (spacing.group token)
- Shadow vocabulary: flat by default, lift on hover
- Tint hover: 30% color mix

---

## 4. Implementation Phases

### Phase 1: Primitives Foundation

**Priority: P0**

Build the primitives library in `/frontend/src/components/primitives/`:

1. **Button** - Primary, Secondary, Tertiary variants with full states
2. **AudioControl** - Play/Pause, Record/Stop with pulse animations
3. **ProgressIndicator** - Dot navigation and progress bar
4. **Card** - Default, Elevated, Flat variants
5. **Text** - Typography hierarchy (title, body, label)
6. **Chip** - Tags and pills

**Exit Criteria:**
- All primitives use design tokens exclusively
- Storybook or visual test for each primitive
- Accessibility audit passes

---

### Phase 2: ShadowingView Migration

**Priority: P0**

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
<Card variant="elevated" isSelected={isActive}>
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

---

### Phase 3: Component Migration

**Priority: P1**

Migrate remaining components:

| Component | Primitives Needed |
|-----------|-------------------|
| TopicCard | Card, Text, Chip |
| QuestionCard | Card, Text, ProgressIndicator |
| ArticleView | Card, Text, ProgressIndicator |
| TrainingDrawer | Card, Button, Text |
| SessionHeader | Text, Chip |
| NextPreviewBar | Card, Text, Button |

**Exit Criteria:**
- All components use primitives
- No inline styles or hard-coded values
- Consistent behavior across surfaces

---

### Phase 4: V7 Visual Enhancements

**Priority: P2**

Integrate PRD-V7 enhancements on top of the token-based foundation:

1. **Background patterns** - Grid pattern + glow effects
2. **Progress band** - Three-color gradient on card tops
3. **Celebration animation** - Confetti on session completion
4. **Hover feedback** - Scale + shadow micro-interactions

**Why this order:** V7 enhancements require components that respect tokens to work properly. Adding them on top of primitives ensures consistency.

---

### Phase 5: Theme Switching Infrastructure

**Priority: P3**

Enable the two-theme system:

1. **CSS variable abstraction** - Design tokens as CSS variables
2. **Theme provider** - Context for theme switching
3. **Default theme** - Current green/teal/orange palette
4. **Animal Island theme** - Warmer, rounded, game-like tokens

**Exit Criteria:**
- Theme switcher component works
- Both themes apply without component changes
- Theme preference persists

---

## 5. Named Rules

These primitives embody the following design rules:

1. **The Flat-By-Default Rule**: Cards are flat at rest; shadows appear only on hover/selection.
2. **The Warm-First Neutral Rule**: All neutrals tint toward amber (chroma 0.005–0.01 @ hue 50).
3. **The Celebration Green Rule**: Success states use only `{primary}` (green), `{tertiary}` (orange), or `{accent}` (teal). No rainbow.
4. **The Spring-Physics-Celebration Rule**: Confetti/success use spring physics; state transitions use ease-out 200ms.
5. **The Touch-Target Rule**: Minimum 44×44px, with 80px for signature audio controls.
6. **The Reading-First Rule**: Body text max-width 65–75ch, optimized for at-a-glance reading during shadowing.

---

## 6. Success Criteria

### Technical

- [ ] Zero hard-coded colors in component files (except primitives)
- [ ] All spacing uses design tokens
- [ ] All typography follows the Text component hierarchy
- [ ] Accessibility audit passes (WCAG AA minimum)
- [ ] Theme switching works without component changes

### User Experience

- [ ] Practice friction < 1 second (smooth state transitions)
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] Clear visual feedback for all states
- [ ] Celebrations feel encouraging, not gimmicky
- [ ] One-handed mobile operation works

### Design System

- [ ] DESIGN.md tokens are the single source of truth
- [ ] Updating DESIGN.md propagates to all components
- [ ] Primitives library is reusable and documented
- [ ] Visual consistency across all surfaces

---

## 7. Migration Example

### ShadowingView Before

```tsx
// Hard-coded colors, inline styles, magic numbers
<button
  className={`w-[80px] h-[80px] flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer border-[3px]
    ${isPlaying
      ? 'bg-orange-500 border-orange-600 text-white shadow-xl shadow-orange-200'
      : 'bg-white border-orange-200 text-orange-600 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-100'}`}
>
```

### ShadowingView After

```tsx
// Clean, semantic, token-aligned
<AudioControl
  type={isPlaying ? 'pause' : 'play'}
  state={isPlaying ? 'active' : 'idle'}
  onToggle={() => isPlaying ? pause() : play()}
  label={isPlaying ? 'Pause audio' : 'Play audio'}
/>
```

---

## 8. Timeline

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Primitives | 1 week | None |
| Phase 2: ShadowingView | 3 days | Phase 1 |
| Phase 3: Component Migration | 1 week | Phase 1 |
| Phase 4: V7 Enhancements | 1 week | Phase 2, 3 |
| Phase 5: Theme Switching | 3 days | Phase 1-4 |

**Total: ~4 weeks**

---

## 9. Anti-Patterns

We explicitly reject:

- **SaaS clichés**: High-saturation gradients, flashy effects, hero-metric templates
- **Side-stripe borders**: `border-left` or `border-right` as colored accents
- **Gradient text**: `background-clip: text` for emphasis
- **Glassmorphism**: Blur effects used decoratively
- **Identical card grids**: Same-sized cards repeated endlessly
- **Decorative motion**: Animations that don't convey state

The design serves the practice flow, not impresses with visual tricks.

---

## 10. Next Steps

1. **Review and approve this PRD**
2. **Create implementation plan** with OpenSpec (`/opsx:propose`)
3. **Start with Phase 1** — build the primitives library
4. **Validate each phase** before proceeding to the next

---

*"The design system should be actual, not theoretical. Every component should use tokens, making the interface coherent, themeable, and maintainable."*
