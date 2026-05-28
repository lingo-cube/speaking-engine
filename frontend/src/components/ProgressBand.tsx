import React from 'react';

interface ProgressBandProps {
  progress: number;
  max?: number;
  ariaLabel?: string;
}

export function ProgressBand({ progress, max = 100, ariaLabel = 'Progress' }: ProgressBandProps) {
  const percentage = Math.min(100, Math.max(0, (progress / (max || 100) * 100));

  return (
    <div
      className="progress-band"
      aria-label={ariaLabel}
      style={{
        width: '100%',
        height: '4px',
        borderRadius: '2px',
        background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-tertiary) 50%, var(--color-accent) 100%)',
      }}
    />
  );
}