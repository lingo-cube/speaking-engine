/**
 * Modern ArticleView - Beautiful layout with smooth animations
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
      setHighlightedIndex(newIndex ?? -1);
      onChunkSelect?.(newIndex ?? -1);
      return newIndex;
    });
  }, [onChunkSelect]);

  return (
    <div className="space-y-8 pb-20">
      {/* Question Card - Modern style */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl ring-1 ring-gray-900/5 p-8 sm:p-10 overflow-hidden relative">
        {/* Decorative gradient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-400/10 to-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        {/* Question tags */}
        <div className="flex flex-wrap gap-2 mb-6 relative">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-sky-400 to-indigo-500 text-white shadow-md shadow-sky-500/20">
            {question.type}
          </span>
          <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            {question.framework}
          </span>
        </div>

        {/* Question text */}
        <h2 className="text-2xl sm:text-3xl font-bold leading-relaxed text-gray-900 relative">
          {question.question}
        </h2>

        {/* Decorative line */}
        <div className="mt-8 h-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full max-w-32" />
      </div>

      {/* Chunks Grid - Modern layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl ring-1 ring-gray-900/5 p-16 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-sky-500/30">
            <svg
              className="w-10 h-10 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No content available</h3>
          <p className="text-gray-500">This question doesn't have any practice content yet.</p>
        </div>
      )}
    </div>
  );
}
