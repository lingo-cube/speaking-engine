import type { Chunk } from '../types';
import { SentenceLine } from './SentenceLine';

interface ArticleContentProps {
  chunks: Chunk[];
  activeIndex: number | null;
  highlightedIndex: number;
  onSentenceClick: (index: number) => void;
}

export function ArticleContent({ chunks, activeIndex, highlightedIndex, onSentenceClick }: ArticleContentProps) {
  if (chunks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
        <p className="text-gray-400">No answer content available.</p>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
      <p className="text-lg text-gray-800 leading-relaxed tracking-normal">
        {chunks.map((chunk, index) => [
          <SentenceLine
            key={chunk.id}
            text={chunk.text}
            isActive={activeIndex === index}
            isHighlighted={highlightedIndex === index}
            onClick={() => onSentenceClick(index)}
          />,
          index < chunks.length - 1 ? ' ' : null,
        ])}
      </p>
    </article>
  );
}
