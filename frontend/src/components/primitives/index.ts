/**
 * Primitives Library - Speaking Engine V8
 *
 * Design token-aligned primitive components that follow
 * the "Natural, Elegant, Warm" principles.
 *
 * All primitives:
 * - Use design tokens exclusively
 * - Support accessibility (WCAG AA minimum)
 * - Respect prefers-reduced-motion
 * - Include proper ARIA attributes
 * - Have touch targets ≥ 44×44px
 */

// Text Primitive
export { Text, Title, Body, Label } from './Text';
export type { TextProps } from './Text';

// Card Primitive
export { Card } from './Card';
export type { CardProps } from './Card';

// Button Primitive
export { Button } from './Button';
export type { ButtonProps } from './Button';

// Chip Primitive
export { Chip } from './Chip';
export type { ChipProps } from './Chip';

// AudioControl Primitive
export { AudioControl } from './AudioControl';
export type { AudioControlProps, AudioControlType, AudioControlState } from './AudioControl';

// ProgressIndicator Primitive
export { ProgressIndicator } from './ProgressIndicator';
export type { ProgressIndicatorProps, ProgressIndicatorType } from './ProgressIndicator';
