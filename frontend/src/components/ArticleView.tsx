import { useState, useCallback } from 'react';
import type { ApiChunk, ApiQuestion } from '../types';
import { ArticleContent } from './ArticleContent';
import { BottomControlBar } from './BottomControlBar';
import { TypeTag } from './TypeTag';
import { FrameworkTag } from './FrameworkTag';

interface ArticleViewProps {
  chunks: ApiChunk[];
  question: ApiQuestion;
  activeIndex: number | null;
  onActiveIndexChange: (index: number | null) => void;
}

export function ArticleView({ chunks, question, activeIndex, onActiveIndexChange }: ArticleViewProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleSentenceClick = useCallback((index: number) => {
    onActiveIndexChange(index);
  }, [onActiveIndexChange]);

  const selectedChunk = activeIndex !== null ? chunks[activeIndex] : null;

  const handleCloseTraining = useCallback(() => {
    onActiveIndexChange(null);
  }, [onActiveIndexChange]);

  return (
    <div className="pb-36" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-item)' }}>
      <div className="bg-white rounded-2xl shadow-md ring-1 ring-gray-900/5 sm:p-8 animate-fade-in" style={{ padding: 'var(--space-group)' }}>
        {/* Question header inside the article card */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <TypeTag type={question.type} />
            <FrameworkTag framework={question.framework} />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-relaxed">
            {question.question}
          </h2>
          <div className="mt-4 border-b border-gray-100" />
        </div>
        <ArticleContent
          chunks={chunks}
          activeIndex={activeIndex}
          highlightedIndex={highlightedIndex}
          onSentenceClick={handleSentenceClick}
        />
      </div>
      <BottomControlBar
        chunks={chunks}
        selectedChunk={selectedChunk}
        activeIndex={activeIndex}
        onHighlightedIndexChange={setHighlightedIndex}
        onCloseTraining={handleCloseTraining}
        onSelectSentence={handleSentenceClick}
      />
    </div>
  );
}
