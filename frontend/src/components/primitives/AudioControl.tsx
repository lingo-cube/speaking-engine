/**
 * AudioControl Primitive - Signature Circular Buttons
 *
 * The 80px circular buttons that define the practice experience.
 * Follows DESIGN.md audio control specifications:
 *
 * Play Button States:
 * - Idle: {surface-50} bg, {surface-200} 3px border, {primary} icon
 * - Active: {primary} bg, {primary-hover} 3px border, white icon
 * - Loading: {surface-100} bg, spinner
 *
 * Record Button States:
 * - Idle: {surface-50} bg, {danger-light} 3px border, {danger} icon
 * - Recording: {danger} bg, {danger-hover} 3px border, white icon, pulse 1.5s
 * - Stop: {surface-500} bg, {surface-900} 3px border, white icon
 *
 * All animations respect prefers-reduced-motion
 */

import React from 'react';

export type AudioControlType = 'play' | 'pause' | 'record' | 'stop';
export type AudioControlState = 'idle' | 'active' | 'loading';

interface AudioControlProps {
  type: AudioControlType;
  state: AudioControlState;
  onToggle: () => void;
  label: string; // Maps to aria-label (required)
  className?: string;
  showPulse?: boolean; // Recording state
  'aria-pressed'?: boolean;
  'aria-live'?: 'polite';
}

// Icon components
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <polygon points="8,5 20,12 8,19" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <rect x="6" y="4" width="4" height="16" rx="1.5" />
    <rect x="14" y="4" width="4" height="16" rx="1.5" />
  </svg>
);

const RecordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z" />
    <path d="M19 11a7 7 0 0 1-14 0" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const StopIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
);

const LoadingSpinner = () => (
  <div className="w-8 h-8 border-3 border-current border-t-transparent rounded-full animate-spin" />
);

export function AudioControl({
  type,
  state,
  onToggle,
  label,
  className = '',
  showPulse = false,
  'aria-pressed': ariaPressed,
  'aria-live': ariaLive,
}: AudioControlProps) {
  // Determine if this is a play/pause or record/stop control
  const isPlayControl = type === 'play' || type === 'pause';
  const isRecordControl = type === 'record' || type === 'stop';

  // Play/Pause styling
  const playIdleClasses = 'bg-[var(--color-surface-50)] border-[var(--color-surface-200)] text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:shadow-lg';
  const playActiveClasses = 'bg-[var(--color-primary)] border-[var(--color-primary-hover)] text-white shadow-xl';

  // Record/Stop styling
  const recordIdleClasses = 'bg-[var(--color-surface-50)] border-[var(--color-danger-light)] text-[var(--color-danger)] hover:border-[var(--color-danger)] hover:shadow-lg';
  const recordActiveClasses = 'bg-[var(--color-danger)] border-[var(--color-danger-hover)] text-white shadow-xl';
  const stopClasses = 'bg-[var(--color-surface-500)] border-[var(--color-surface-900)] text-white';

  // Loading state
  const loadingClasses = 'bg-[var(--color-surface-100)] border-[var(--color-surface-200)] text-[var(--color-surface-300)]';

  // Pulse animation for recording
  const pulseAnimation = showPulse ? 'animate-pulse-recording' : '';

  // Base classes
  const baseClasses = 'w-20 h-20 rounded-full border-[3px] flex items-center justify-center cursor-pointer transition-all duration-200 min-w-[80px] min-h-[80px]';

  // Hover and active states (respects reduced motion via CSS)
  const hoverClasses = 'hover:scale-105 active:scale-95';

  // Focus ring
  const focusClasses = 'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-accent-light)] focus-visible:ring-offset-4';

  // Combine classes based on control type and state
  let stateClasses = '';
  if (state === 'loading') {
    stateClasses = loadingClasses;
  } else if (isPlayControl) {
    stateClasses = state === 'active' ? playActiveClasses : playIdleClasses;
  } else if (isRecordControl && type === 'stop') {
    stateClasses = stopClasses;
  } else if (isRecordControl) {
    stateClasses = state === 'active' ? `${recordActiveClasses} ${pulseAnimation}` : recordIdleClasses;
  }

  const classes = `${baseClasses} ${stateClasses} ${hoverClasses} ${focusClasses} ${className}`.trim();

  // Render icon based on type and state
  const renderIcon = () => {
    if (state === 'loading') {
      return <LoadingSpinner />;
    }

    if (isPlayControl) {
      return type === 'play' ? <PlayIcon /> : <PauseIcon />;
    }

    if (type === 'record') {
      return <RecordIcon />;
    }

    return <StopIcon />;
  };

  return (
    <button
      type="button"
      className={classes}
      onClick={onToggle}
      aria-label={label}
      aria-pressed={ariaPressed ?? state === 'active'}
      aria-live={ariaLive}
      aria-busy={state === 'loading'}
    >
      {renderIcon()}
    </button>
  );
}
