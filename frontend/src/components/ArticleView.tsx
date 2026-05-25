import { useState, useEffect, useCallback } from 'react';
import type { Chunk } from '../types';
import { useFullAudioPlayer } from '../hooks/useFullAudioPlayer';
import { FullAudioBar } from './FullAudioBar';
import { ArticleContent } from './ArticleContent';
import { TrainingDrawer } from './TrainingDrawer';

interface ArticleViewProps {
  chunks: Chunk[];
}

export function ArticleView({ chunks }: ArticleViewProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const audioUrls = chunks.map((c) => c.audio_url);
  const { play, pause, isPlaying, currentIndex, totalCount, setOnIndexChange } = useFullAudioPlayer(audioUrls);

  // Sync full-playback highlighting
  useEffect(() => {
    setOnIndexChange((index: number) => setHighlightedIndex(index));
    return () => setOnIndexChange(null);
  }, [setOnIndexChange]);

  const handleSentenceClick = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleDrawerClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const selectedChunk = activeIndex !== null ? chunks[activeIndex] : null;

  return (
    <div className="space-y-4">
      <FullAudioBar
        isPlaying={isPlaying}
        currentIndex={currentIndex}
        totalCount={totalCount}
        onPlay={play}
        onPause={pause}
      />

      <ArticleContent
        chunks={chunks}
        activeIndex={activeIndex}
        highlightedIndex={highlightedIndex}
        onSentenceClick={handleSentenceClick}
      />

      <TrainingDrawer
        chunk={selectedChunk}
        isOpen={activeIndex !== null}
        onClose={handleDrawerClose}
      />
    </div>
  );
}
