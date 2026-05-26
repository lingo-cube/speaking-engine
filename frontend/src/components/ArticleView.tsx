import { useState, useCallback } from 'react';
import type { ApiChunk } from '../types';
import { ArticleContent } from './ArticleContent';
import { BottomControlBar } from './BottomControlBar';

interface ArticleViewProps {
  chunks: ApiChunk[];
}

export function ArticleView({ chunks }: ArticleViewProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleSentenceClick = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  const selectedChunk = activeIndex !== null ? chunks[activeIndex] : null;

  return (
    <div className="space-y-4 pb-36">
      <ArticleContent
        chunks={chunks}
        activeIndex={activeIndex}
        highlightedIndex={highlightedIndex}
        onSentenceClick={handleSentenceClick}
      />
      <BottomControlBar
        chunks={chunks}
        selectedChunk={selectedChunk}
        highlightedIndex={highlightedIndex}
        onHighlightedIndexChange={setHighlightedIndex}
      />
    </div>
  );
}
