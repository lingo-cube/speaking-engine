import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ApiChunk, ApiQuestion } from '../types';
import { TypeTag } from './TypeTag';
import { FrameworkTag } from './FrameworkTag';
import { useSmartAudio } from '../hooks/useSmartAudio';

// ── Circular Audio Player ──────────────────────────────────

function CircularPlayer({ isPlaying, progress, isComplete, onToggle }: {
  isPlaying: boolean;
  progress: number;
  isComplete: boolean;
  onToggle: () => void;
}) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(progress, 1));

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Listen First label */}
      {!isPlaying && !isComplete && (
        <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">Listen First</p>
      )}

      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Progress ring */}
        {(isPlaying || isComplete) && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="48" cy="48" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="2" />
            <circle
              cx="48" cy="48" r={radius} fill="none"
              stroke={isComplete ? '#22c55e' : 'var(--theme-primary, #4F46E5)'}
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={isComplete ? 0 : offset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-500 ease-out"
            />
          </svg>
        )}

        {/* Button */}
        <button
          type="button"
          onClick={onToggle}
          className="w-20 h-20 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover transition-all duration-200 active:scale-95 cursor-pointer shadow-lg hover:shadow-xl z-10"
          aria-label={isPlaying ? 'Pause' : isComplete ? 'Completed' : 'Play full answer'}
        >
          {isComplete ? (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20,6 9,17 4,12" />
            </svg>
          ) : isPlaying ? (
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-7 h-7 ml-1" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6,4 20,12 6,20" />
            </svg>
          )}
        </button>
      </div>

      {/* Time display */}
      {isPlaying && (
        <p className="text-xs text-gray-400 tabular-nums">00:00</p>
      )}
    </div>
  );
}

// ── Inline Sentence ────────────────────────────────────────

function InlineSentence({ chunk, isPlaying, onClick, onPlayEnd }: {
  chunk: ApiChunk;
  isPlaying: boolean;
  onClick: () => void;
  onPlayEnd: () => void;
}) {
  const { play } = useSmartAudio(chunk.audio_url, chunk.text);
  const prevPlaying = useRef(false);

  useEffect(() => {
    if (!isPlaying && prevPlaying.current) {
      onPlayEnd();
    }
    prevPlaying.current = isPlaying;
  }, [isPlaying]);

  const handleClick = useCallback(() => {
    play();
    onClick();
  }, [play, onClick]);

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter') { handleClick(); }}}
      className={`inline cursor-pointer transition-all duration-500 rounded-sm
        ${isPlaying
          ? 'bg-primary/8 shadow-[0_0_12px_rgba(79,70,229,0.15)] px-0.5'
          : 'hover:bg-primary/5 hover:shadow-[0_0_6px_rgba(79,70,229,0.08)]'
        }`}
    >
      {chunk.text}
    </span>
  );
}

// ── Full Answer View ───────────────────────────────────────

interface FullAnswerViewProps {
  question: ApiQuestion;
  chunks: ApiChunk[];
  onStartShadowing?: () => void;
}

export function FullAnswerView({ question, chunks, onStartShadowing }: FullAnswerViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const totalChunks = chunks.length;
  const progress = totalChunks > 0 ? (currentChunk) / totalChunks : 0;

  // TTS sequential playback
  const playNextChunk = useCallback((index: number) => {
    if (index >= totalChunks) {
      setIsPlaying(false);
      setIsComplete(true);
      setCurrentChunk(totalChunks);
      return;
    }
    setCurrentChunk(index);
    const chunk = chunks[index];
    const utterance = new SpeechSynthesisUtterance(chunk.text);
    utterance.rate = 1;
    utterance.onend = () => {
      playNextChunk(index + 1);
    };
    utterance.onerror = () => {
      playNextChunk(index + 1);
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [chunks, totalChunks]);

  const handleToggle = useCallback(() => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsComplete(false);
    } else {
      setIsPlaying(true);
      setIsComplete(false);
      setCurrentChunk(0);
      playNextChunk(0);
    }
  }, [isPlaying, playNextChunk]);

  // Stop TTS on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Group into paragraphs
  const paragraphMap = new Map<number, ApiChunk[]>();
  for (const chunk of chunks) {
    const p = chunk.paragraph ?? 1;
    if (!paragraphMap.has(p)) paragraphMap.set(p, []);
    paragraphMap.get(p)!.push(chunk);
  }
  const sortedParagraphs = Array.from(paragraphMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([, value]) => value);

  // Flatten chunk index tracking
  let flatIdx = 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="px-6 sm:px-8 pb-48 pt-8"
    >
      <div className="max-w-[720px] mx-auto">
        {/* Framework Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <TypeTag type={question.type} />
          <FrameworkTag framework={question.framework} />
        </div>

        {/* Question — large, bold */}
        <h1 className="text-[32px] sm:text-[48px] font-bold text-gray-900 leading-[1.2] mb-12 tracking-tight">
          {question.question}
        </h1>

        {/* Article */}
        <div className="space-y-[32px]">
          {sortedParagraphs.map((paraChunks, pi) => (
            <p key={pi}
              className="text-[20px] sm:text-[28px] font-normal text-gray-800 leading-[1.9] tracking-normal"
            >
              {paraChunks.map((chunk) => {
                const idx = flatIdx++;
                const playing = isPlaying && idx === currentChunk;
                return (
                  <InlineSentence
                    key={chunk.id}
                    chunk={chunk}
                    isPlaying={playing}
                    onClick={() => {
                      window.speechSynthesis.cancel();
                      setIsPlaying(false);
                      setCurrentChunk(idx);
                    }}
                    onPlayEnd={() => { }}
                  />
                );
              }).reduce((prev, curr, i) => (
                i === 0 ? <>{prev}{curr}</> : <>{prev} {curr}</>
              ))}
            </p>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Player */}
      <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center pb-8" style={{ paddingBottom: 'env(safe-area-inset-bottom, 32px)' }}>
        <CircularPlayer
          isPlaying={isPlaying}
          progress={progress}
          isComplete={isComplete}
          onToggle={handleToggle}
        />

        {/* Shadowing CTA */}
        {isComplete && onStartShadowing && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            type="button"
            onClick={onStartShadowing}
            className="mt-4 text-sm font-medium text-primary hover:text-primary-hover hover:underline transition-colors cursor-pointer"
          >
            Start Shadowing &rarr;
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
