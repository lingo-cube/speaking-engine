/**
 * ProgressIndicator Primitive - Progress Visualization
 *
 * Two types of progress indicators:
 * 1. Dot Navigation - 8px dots with state-based styling
 * 2. Progress Bar - 8px height bar with gradient fill
 *
 * Dot Navigation:
 * - Completed: {primary} background, scale 1.0
 * - Current: {tertiary} background, scale 1.25, glow ring
 * - Incomplete: {surface-200} background
 * - 300ms ease-out transitions (respects reduced motion)
 *
 * Progress Bar:
 * - 8px height, 4px border-radius
 * - {surface-100} track background
 * - Gradient fill: {primary} → {tertiary} (90deg)
 * - 500ms ease-out width transition (respects reduced motion)
 */

import React from 'react';

export type ProgressIndicatorType = 'dots' | 'bar';

interface ProgressIndicatorProps {
  type: ProgressIndicatorType;
  total: number;
  current: number;
  completed?: number[];
  className?: string;
  'aria-label'?: string;
  'aria-valuenow': number;
  'aria-valuemin': number;
  'aria-valuemax': number;
}

export function ProgressIndicator({
  type,
  total,
  current,
  completed = [],
  className = '',
  'aria-label': ariaLabel,
  'aria-valuenow': ariaValuenow,
  'aria-valuemin': ariaValuemin = 0,
  'aria-valuemax': ariaValuemax,
}: ProgressIndicatorProps) {
  if (type === 'dots') {
    return <DotIndicator total={total} current={current} completed={completed} className={className} aria-label={ariaLabel} />;
  }

  return <ProgressBar current={current} total={total} className={className} aria-label={ariaLabel} aria-valuenow={ariaValuenow} aria-valuemin={ariaValuemin} aria-valuemax={ariaValuemax} />;
}

// Dot Navigation Component
interface DotIndicatorProps {
  total: number;
  current: number;
  completed: number[];
  className?: string;
  'aria-label'?: string;
}

function DotIndicator({ total, current, completed, className = '', 'aria-label': ariaLabel }: DotIndicatorProps) {
  const dots = Array.from({ length: total }, (_, i) => {
    const isCompleted = completed.includes(i);
    const isCurrent = i === current;

    let dotClasses = 'w-2 h-2 rounded-full transition-all duration-300';
    if (isCompleted) {
      dotClasses += ' bg-[var(--color-primary)] scale-100';
    } else if (isCurrent) {
      dotClasses += ' bg-[var(--color-tertiary)] scale-125 ring-2 ring-[var(--color-tertiary-light)]';
    } else {
      dotClasses += ' bg-[var(--color-surface-200)]';
    }

    return <div key={i} className={dotClasses} aria-hidden="true" />;
  });

  return (
    <div
      className={`flex items-center justify-center gap-1.5 ${className}`}
      role="progressbar"
      aria-label={ariaLabel || 'Progress'}
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total - 1}
    >
      {dots}
    </div>
  );
}

// Progress Bar Component
interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  'aria-label'?: string;
  'aria-valuenow'?: number;
  'aria-valuemin'?: number;
  'aria-valuemax'?: number;
}

function ProgressBar({
  current,
  total,
  className = '',
  'aria-label': ariaLabel,
  'aria-valuenow': ariaValuenow,
  'aria-valuemin': ariaValuemin = 0,
  'aria-valuemax': ariaValuemax,
}: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div
      className={`w-full h-2 bg-[var(--color-surface-100)] rounded-full overflow-hidden ${className}`}
      role="progressbar"
      aria-label={ariaLabel || 'Progress'}
      aria-valuenow={ariaValuenow ?? percentage}
      aria-valuemin={ariaValuemin}
      aria-valuemax={ariaValuemax ?? total}
    >
      <div
        className="h-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-tertiary)] to-[var(--color-accent)] rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
        aria-hidden="true"
      />
    </div>
  );
}
