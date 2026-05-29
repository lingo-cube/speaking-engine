/**
 * Card Primitive - Container Component
 *
 * Follows DESIGN.md card specifications:
 * - 16px border-radius (2xl) for most cards
 * - Padding variants: none, tight, normal, loose
 * - Shadow vocabulary: flat by default, lift on hover
 * - States: default, elevated, flat
 *
 * Responsive padding:
 * - Mobile: tighter spacing
 * - Desktop: generous breathing room
 */

import React from 'react';

type CardVariant = 'default' | 'elevated' | 'flat';
type CardPadding = 'none' | 'tight' | 'normal' | 'loose';
type CardState = 'default' | 'hover' | 'selected' | 'disabled';

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  isClickable?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  showProgressBand?: boolean;
  progressPercent?: number;
  'aria-label'?: string;
  'aria-pressed'?: boolean;
  'aria-describedby'?: string;
}

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  tight: 'p-[var(--spacing-tight)]',
  normal: 'p-[var(--spacing-group)]',
  loose: 'p-[var(--spacing-section)]',
};

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-[var(--color-surface-50)] border border-[var(--color-surface-200)] rounded-2xl',
  elevated: 'bg-white shadow-lg rounded-2xl border-0',
  flat: 'bg-transparent border-0 rounded-2xl',
};

const stateClasses: Partial<Record<CardState, string>> = {
  selected: 'bg-[var(--color-primary)] text-white border-transparent',
  disabled: 'bg-[var(--color-surface-200)] text-[var(--color-surface-500)] cursor-not-allowed',
};

const hoverClasses = 'hover:shadow-[0_10px_15px_-3px_rgba(88,204,2,0.1)] hover:border-transparent hover:bg-[var(--color-primary-light)] transition-all duration-200';

const focusClasses = 'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-accent-light)] focus-visible:ring-offset-2';

export function Card({
  variant = 'default',
  padding = 'normal',
  isClickable = false,
  isSelected = false,
  isDisabled = false,
  className = '',
  children,
  onClick,
  showProgressBand = false,
  progressPercent = 0,
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
  'aria-describedby': ariaDescribedby,
}: CardProps) {
  const baseClasses = `${paddingClasses[padding]} ${variantClasses[variant]}`;

  let stateClassesToAdd = '';
  if (isDisabled) {
    stateClassesToAdd = stateClasses.disabled || '';
  } else if (isSelected) {
    stateClassesToAdd = stateClasses.selected || '';
  }

  const interactiveClasses = isClickable && !isDisabled
    ? `${hoverClasses} ${focusClasses} cursor-pointer`
    : '';

  const classes = `${baseClasses} ${stateClassesToAdd} ${interactiveClasses} ${className}`.trim();

  const progressBand = showProgressBand ? (
    <div
      className="progress-band absolute top-0 left-0 rounded-t-2xl"
      style={{ width: `${progressPercent}%` }}
      aria-hidden="true"
    />
  ) : null;

  const cardContent = (
    <>
      {progressBand}
      {children}
    </>
  );

  if (isClickable && onClick) {
    return (
      <button
        type="button"
        className={`relative ${classes}`}
        onClick={onClick}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed ?? isSelected}
        aria-describedby={ariaDescribedby}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <div
      className={`relative ${classes}`}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
    >
      {cardContent}
    </div>
  );
}
