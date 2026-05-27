import type { ApiChunk } from '../types';
import { SentenceLine } from './SentenceLine';

interface ArticleContentProps {
  chunks: ApiChunk[];
  activeIndex: number | null;
  highlightedIndex: number;
  onSentenceClick: (index: number) => void;
}

function groupByParagraph(chunks: ApiChunk[]): ApiChunk[][] {
  const groups: ApiChunk[][] = [];
  let currentGroup: ApiChunk[] = [];
  let currentPara: number | null = null;

  for (const chunk of chunks) {
    if (currentPara !== null && chunk.paragraph !== currentPara) {
      groups.push(currentGroup);
      currentGroup = [];
    }
    currentGroup.push(chunk);
    currentPara = chunk.paragraph;
  }
  if (currentGroup.length > 0) groups.push(currentGroup);
  return groups;
}

export function ArticleContent({ chunks, activeIndex, highlightedIndex, onSentenceClick }: ArticleContentProps) {
  if (chunks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No answer content available.</p>
      </div>
    );
  }

  const paragraphs = groupByParagraph(chunks);
  let chunkIndex = 0;

  return (
    <>
      {paragraphs.map((group, groupIdx) => {
        const startIndex = chunkIndex;
        chunkIndex += group.length;
        return (
          <p key={groupIdx} className={groupIdx > 0 ? 'mt-[var(--space-group)]' : ''} style={{ textIndent: '2em' }}>
            <span className="text-lg text-gray-800 leading-relaxed tracking-normal">
              {group.map((chunk, idx) => {
                const flatIdx = startIndex + idx;
                return [
                  <SentenceLine
                    key={chunk.id}
                    text={chunk.text}
                    isActive={activeIndex === flatIdx}
                    isHighlighted={highlightedIndex === flatIdx}
                    onClick={() => onSentenceClick(flatIdx)}
                  />,
                  idx < group.length - 1 ? ' ' : null,
                ];
              })}
            </span>
          </p>
        );
      })}
    </>
  );
}
