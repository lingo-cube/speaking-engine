/**
 * V2 ArticleView - Unified article view with TTS support
 * Clean, card-based layout with consistent design
 */

import { useState, useCallback } from 'react';
import type { ApiChunk, ApiQuestion } from '../../types';
import { ChunkCard } from './ChunkCard';
import { colors, spacing, typography } from '../../styles/tokens';

interface ArticleViewProps {
  chunks: ApiChunk[];
  question: ApiQuestion;
  onChunkSelect?: (index: number) => void;
}

export function ArticleView({ chunks, question, onChunkSelect }: ArticleViewProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleChunkClick = useCallback((index: number) => {
    setActiveIndex((prev) => {
      const newIndex = prev === index ? null : index;
      onChunkSelect?.(newIndex ?? -1);
      return newIndex;
    });
  }, [onChunkSelect]);

  return (
    <div className="space-y-6" style={{ paddingBottom: spacing[16] }}>
      {/* Question Card */}
      <div
        className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6 sm:p-8"
        style={{ marginBottom: spacing[6] }}
      >
        {/* Question tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: colors.primary[50],
              color: colors.primary[700],
            }}
          >
            {question.type}
          </span>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: colors.neutral[100],
              color: colors.neutral[600],
            }}
          >
            {question.framework}
          </span>
        </div>

        {/* Question text */}
        <h2
          className="text-xl sm:text-2xl font-semibold leading-relaxed"
          style={{
            color: colors.neutral[900],
            fontFamily: typography.fontFamily.sans,
          }}
        >
          {question.question}
        </h2>

        {/* Divider */}
        <div
          className="mt-6"
          style={{ borderBottom: `1px solid ${colors.border.subtle}` }}
        />
      </div>

      {/* Chunks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chunks.map((chunk, index) => (
          <ChunkCard
            key={chunk.id}
            chunk={chunk}
            index={index}
            isActive={activeIndex === index}
            isHighlighted={highlightedIndex === index}
            onClick={() => handleChunkClick(index)}
          />
        ))}
      </div>

      {/* Empty state */}
      {chunks.length === 0 && (
        <div
          className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-12 text-center"
          style={{ padding: spacing[12] }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: colors.primary[100] }}
          >
            <svg
              className="w-8 h-8"
              style={{ color: colors.primary[500] }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          <p style={{ color: colors.neutral[500] }}>
            No content available for this question.
          </p>
        </div>
      )}
    </div>
  );
}
