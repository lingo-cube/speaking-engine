/**
 * V2 ChunkCard - Unified card style with TTS support
 * Part of the V5 refactor with consistent design
 */

import { useState } from 'react';
import { useAudioPlayer, formatTime } from '../hooks/useAudioPlayer';
import type { ApiChunk } from '../types';
import { colors, radius, shadow, spacing, transition, typography } from '../styles/tokens';

interface ChunkCardProps {
  chunk: ApiChunk;
  index: number;
  isActive: boolean;
  isHighlighted: boolean;
  onClick: () => void;
}

export function ChunkCard({ chunk, index, isActive, isHighlighted, onClick }: ChunkCardProps) {
  const [showFullControls, setShowFullControls] = useState(false);

  // Use TTS as audio source
  const { play, pause, replay, toggleSlowMode, isPlaying, isSlowMode, state, error } =
    useAudioPlayer({
      type: 'tts',
      text: chunk.text,
    });

  const handleCardClick = () => {
    onClick();
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleReplayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    replay();
  };

  // Card styles based on state
  const getCardStyle = () => {
    const base = 'bg-white rounded-xl shadow-sm ring-1 transition-all duration-200 cursor-pointer';

    if (isHighlighted) {
      return `${base} ring-2 ring-primary-500 shadow-glow`;
    }

    if (isActive) {
      return `${base} ring-primary-500/50 shadow-md`;
    }

    return `${base} ring-black/5 hover:shadow-md hover:ring-black/10`;
  };

  return (
    <div
      className={`${getCardStyle()} p-4 sm:p-5`}
      onClick={handleCardClick}
      onMouseEnter={() => isActive && setShowFullControls(true)}
      onMouseLeave={() => setShowFullControls(false)}
    >
      {/* Header with index and controls */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium"
            style={{
              backgroundColor: isActive ? colors.primary[100] : colors.neutral[100],
              color: isActive ? colors.primary[700] : colors.neutral[600],
            }}
          >
            {index + 1}
          </span>
          {(isPlaying || state === 'loading') && (
            <span className="text-xs" style={{ color: colors.primary[500] }}>
              {state === 'loading' ? 'Loading...' : 'Playing...'}
            </span>
          )}
        </div>

        {/* Compact controls - always show on active */}
        {(isActive || showFullControls) && (
          <div className="flex items-center gap-1.5">
            {/* Replay button */}
            <button
              type="button"
              onClick={handleReplayClick}
              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 active:scale-95"
              aria-label="Replay"
            >
              <svg
                className="w-4 h-4"
                style={{ color: colors.neutral[500] }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="1,4 1,10 7,10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>

            {/* Play/Pause button */}
            <button
              type="button"
              onClick={handlePlayClick}
              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg
                  className="w-4 h-4"
                  style={{ color: colors.primary[500] }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 ml-0.5"
                  style={{ color: colors.primary[500] }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="5,4 19,12 5,20" />
                </svg>
              )}
            </button>

            {/* Speed toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSlowMode();
              }}
              className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                isSlowMode
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label={isSlowMode ? 'Normal speed' : 'Slow mode'}
            >
              {isSlowMode ? '0.75x' : '1x'}
            </button>
          </div>
        )}
      </div>

      {/* Chunk text */}
      <p
        className="text-base sm:text-lg leading-relaxed"
        style={{
          color: colors.neutral[800],
          lineHeight: typography.lineHeight.relaxed,
        }}
      >
        {chunk.text}
      </p>

      {/* Error display */}
      {error && (
        <div
          className="mt-2 text-xs flex items-center gap-1"
          style={{ color: colors.error }}
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}

      {/* Progress indicator for TTS */}
      {isPlaying && (
        <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full animate-pulse"
            style={{ width: '100%' }}
          />
        </div>
      )}
    </div>
  );
}
