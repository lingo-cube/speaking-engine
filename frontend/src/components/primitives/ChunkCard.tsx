/**
 * ChunkCard - Refactored chunk card using primitives
 *
 * Following impeccable standards:
 * - Card pattern with proper states (default, hover, selected)
 * - Typography hierarchy using Text component
 * - Proper spacing and touch targets
 */

import React from 'react';
import type { ApiChunk } from '../../types';
import { Card } from './Card';
import { Text } from './Text';
import { Chip } from './Chip';

interface ChunkCardProps {
  chunk: ApiChunk;
  isActive?: boolean;
  isCompleted?: boolean;
  onClick?: () => void;
  showAudio?: boolean;
  showRecording?: boolean;
}

export function ChunkCard({
  chunk,
  isActive = false,
  isCompleted = false,
  onClick,
  showAudio = true,
  showRecording = true,
}: ChunkCardProps) {
  const state = isActive ? 'selected' : isCompleted ? 'default' : 'default';

  return (
    <Card
      variant={isActive ? 'default' : 'elevated'}
      state={state}
      isClickable={Boolean(onClick)}
      isSelected={isActive}
      onClick={onClick}
      className="p-4 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Order indicator */}
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-white text-primary'
                : isCompleted
                  ? 'bg-primary text-white'
                  : 'bg-primary-light text-primary'
            }`}
          >
            {chunk.order}
          </div>
          <Text
            variant="body"
            className="sm:hidden flex-1"
          >
            {chunk.text}
          </Text>
        </div>

        {/* Main text - desktop */}
        <Text
          variant="body"
          className="hidden sm:block flex-1"
        >
          {chunk.text}
        </Text>

        {/* Actions */}
        {(showAudio || showRecording) && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto sm:flex-shrink-0">
            {showAudio && (
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-surface-100 text-surface-700 hover:bg-primary-light hover:text-primary transition-all duration-200 flex items-center justify-center min-h-[44px] min-w-[44px]"
                aria-label="Play audio"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              </button>
            )}
            {showRecording && (
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-surface-100 text-danger hover:bg-danger-light/30 hover:text-danger transition-all duration-200 flex items-center justify-center min-h-[44px] min-w-[44px]"
                aria-label="Record"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * ChunkDisplay - Simplified display-only chunk for ShadowingView
 */
interface ChunkDisplayProps {
  text: string;
  index: number;
  isActive?: boolean;
}

export function ChunkDisplay({ text, index, isActive = true }: ChunkDisplayProps) {
  return (
    <div className="w-full">
      {/* Badge */}
      <div className="inline-flex items-center mb-4">
        <Chip variant="primary" size="sm">
          Sentence {index + 1}
        </Chip>
      </div>

      {/* Main text card */}
      <Card
        variant="elevated"
        className="px-8 sm:px-12 py-10 sm:py-14 border-2 border-primary/20"
      >
        <Text
          variant="title-lg"
          className="text-center"
          maxWidth="lg"
        >
          {text}
        </Text>
      </Card>
    </div>
  );
}
