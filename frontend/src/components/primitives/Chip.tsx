/**
 * Chip Primitive - Tags and Pills
 *
 * Small labels for categories, type tags, and filter pills.
 * Follows DESIGN.md chip specifications.
 *
 * States:
 * - Default: {surface-100} background, {surface-500} text
 * - Selected: {primary} background, white text
 * - Hover: Subtle background tint
 */

import React from 'react';

type ChipVariant = 'default' | 'primary' | 'outline';
type ChipSize = 'sm' | 'md' | 'lg';

interface ChipProps {
  variant?: ChipVariant;
  size?: ChipSize;
  selected?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  'aria-label'?: string;
  'aria-pressed'?: boolean;
}

const variantClasses: Record<ChipVariant, Record<'default' | 'selected', string>> = {
  default: {
    default: 'bg-[var(--color-surface-100)] text-[var(--color-surface-500)] border border-[var(--color-surface-200)]',
    selected: 'bg-[var(--color-primary)] text-white border-transparent',
  },
  primary: {
    default: 'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] border border-[var(--color-primary)]',
    selected: 'bg-[var(--color-primary)] text-white border-transparent',
  },
  outline: {
    default: 'bg-transparent text-[var(--color-surface-500)] border border-[var(--color-surface-300)]',
    selected: 'bg-[var(--color-primary)] text-white border-transparent',
  },
};

const sizeClasses: Record<ChipSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 cursor-pointer select-none min-h-[32px]';

export function Chip({
  variant = 'default',
  size = 'md',
  selected = false,
  className = '',
  children,
  onClick,
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
}: ChipProps) {
  const classes = `${baseClasses} ${variantClasses[variant][selected ? 'selected' : 'default']} ${sizeClasses[size]} ${className}`;

  if (onClick) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed ?? selected}
        aria-selected={selected}
      >
        {children}
      </button>
    );
  }

  return (
    <span className={classes} aria-label={ariaLabel}>
      {children}
    </span>
  );
}
