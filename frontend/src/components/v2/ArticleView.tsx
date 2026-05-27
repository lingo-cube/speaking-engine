/**
 * V2 ArticleView - Unified article view with TTS support
 * Clean, card-based layout with consistent design
 */

import { useState, useCallback } from 'react';
import type { ApiChunk, ApiQuestion } from '../../types';
import { ChunkCard } from './ChunkCard';

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
    <div className="space-y-6 pb-16">
      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6 sm:p-8 mb-6">
        {/* Question tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700">
            {question.type}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            {question.framework}
          </span>
        </div>

        {/* Question text */}
        <h2 className="text-xl sm:text-2xl font-semibold leading-relaxed text-gray-900 font-sans">
          {question.question}
        </h2>

        {/* Divider */}
        <div className="mt-6 border-b border-gray-100" />
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
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-12 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-sky-100">
            <svg
              className="w-8 h-8 text-sky-500"
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
          <p className="text-gray-500">
            No content available for this question.
          </p>
        </div>
      )}
    </div>
  );
}
