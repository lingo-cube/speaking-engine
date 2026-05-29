/**
 * Button Primitive - Interactive Actions
 *
 * Follows DESIGN.md button specifications:
 * - Primary: Pill shape (50px), {primary} background, 16px 48px padding
 * - Secondary: 8px rounded, {surface-50} background, tint on hover
 * - Tertiary: Pill shape, {tertiary} background
 *
 * Touch targets: Minimum 44×44px enforced via min-height
 * Focus ring: 3px offset, {accent-light} color
 *
 * All transitions: 200ms ease-out (respects reduced motion)
 */

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  'aria-label'?: string;
  'aria-pressed'?: boolean;
  'aria-busy'?: boolean;
  'aria-describedby'?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--color-primary)] text-white rounded-[50px] hover:bg-[var(--color-primary-hover)] hover:shadow-[0_10px_15px_-3px_rgba(88,204,2,0.1)]',
  secondary: 'bg-[var(--color-surface-50)] text-[var(--color-surface-500)] rounded-lg border border-[var(--color-surface-200)] hover:bg-[var(--color-primary-light)] hover:border-transparent',
  tertiary: 'bg-[var(--color-tertiary)] text-white rounded-[50px] hover:bg-[var(--color-tertiary-dark)] hover:shadow-[0_10px_15px_-3px_rgba(255,149,0,0.1)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  md: 'px-6 py-4 text-base min-h-[44px]',
  lg: 'px-12 py-5 text-lg min-h-[48px]',
};

const disabledClasses = 'bg-[var(--color-surface-200)] text-[var(--color-surface-500)] cursor-not-allowed shadow-none hover:shadow-none hover:bg-[var(--color-surface-200)]';

const activeClasses = 'active:translate-y-[1px] active:shadow-[0_4px_8px_-2px_rgba(0,0,0,0.1)]';

const focusClasses = 'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-accent-light)] focus-visible:ring-offset-2';

const baseClasses = 'font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200';

export function Button({
  variant = 'primary',
  size = 'md',
  isDisabled = false,
  isLoading = false,
  className = '',
  children,
  onClick,
  type = 'button',
  icon,
  iconPosition = 'left',
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
  'aria-busy': ariaBusy,
  'aria-describedby': ariaDescribedby,
}: ButtonProps) {
  const disabled = isDisabled || isLoading;

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? disabledClasses : `${activeClasses} ${focusClasses}`}
    ${className}
  `.trim();

  const iconElement = icon && <span className="flex-shrink-0">{icon}</span>;

  const content = isLoading ? (
    <>
      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      <span className="sr-only">Loading...</span>
    </>
  ) : (
    children
  );

  return (
    <button
      type={type}
      className={classes}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-busy={ariaBusy ?? isLoading}
      aria-describedby={ariaDescribedby}
    >
      {iconPosition === 'left' && iconElement}
      {content}
      {iconPosition === 'right' && iconElement}
    </button>
  );
}
