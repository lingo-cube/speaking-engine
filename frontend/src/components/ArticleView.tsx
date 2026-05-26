import { useState, useCallback } from 'react';
import type { ApiChunk, ApiQuestion } from '../types';
import { ArticleContent } from './ArticleContent';
import { BottomControlBar } from './BottomControlBar';
import { TypeTag } from './TypeTag';
import { FrameworkTag } from './FrameworkTag';

interface ArticleViewProps {
  chunks: ApiChunk[];
  question: ApiQuestion;
}

export function ArticleView({ chunks, question }: ArticleViewProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleSentenceClick = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  const selectedChunk = activeIndex !== null ? chunks[activeIndex] : null;

  const handleCloseTraining = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return (
    <div className="space-y-4 pb-36">
      <div className="bg-white rounded-2xl shadow-md ring-1 ring-gray-900/5 p-6 sm:p-8 animate-fade-in">
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
        highlightedIndex={highlightedIndex}
        onHighlightedIndexChange={setHighlightedIndex}
        onCloseTraining={handleCloseTraining}
      />
    </div>
  );
}
