import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ApiChunk, ApiQuestion } from '../types';
import { TypeTag } from './TypeTag';
import { FrameworkTag } from './FrameworkTag';

const spring = { type: 'spring' as const, stiffness: 400, damping: 30 };

// ── Circular Player ────────────────────────────────────────

function CircularPlayer({ isPlaying, progress, isComplete, onToggle }: {
  isPlaying: boolean; progress: number; isComplete: boolean; onToggle: () => void;
}) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center gap-3">
      {!isPlaying && !isComplete && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-bold text-gray-400"
        >
          Tap to listen
        </motion.p>
      )}
      {isPlaying && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold text-primary uppercase tracking-wider"
        >
          Listening...
        </motion.p>
      )}
      {isComplete && (
        <motion.p
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={spring}
          className="text-sm font-extrabold text-green-500"
        >
          Ready to practice!
        </motion.p>
      )}

      <div className="relative w-28 h-28 flex items-center justify-center">
        {isPlaying && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="56" cy="56" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="3" />
            <circle cx="56" cy="56" r={radius} fill="none"
              stroke="var(--theme-primary, #58CC02)" strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - Math.min(progress, 1))}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-500 ease-out"
            />
          </svg>
        )}
        {isComplete && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="56" cy="56" r={radius} fill="none" stroke="#22c55e" strokeWidth="3"
              strokeDasharray={circumference} strokeDashoffset={0} strokeLinecap="round" />
          </svg>
        )}

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={onToggle}
          className={`w-24 h-24 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer z-10 border-[4px]
            ${isComplete
              ? 'bg-green-500 border-green-600 text-white shadow-xl shadow-green-500/30'
              : isPlaying
                ? 'bg-primary border-primary-hover text-white shadow-xl shadow-primary/30'
                : 'bg-white border-gray-200 text-primary hover:border-primary/30 hover:shadow-lg'
            }`}
          aria-label={isPlaying ? 'Pause' : isComplete ? 'Done' : 'Play'}
        >
          {isComplete ? (
            <motion.svg
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={spring}
              className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="20,6 9,17 4,12" />
            </motion.svg>
          ) : isPlaying ? (
            <svg className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1.5"/><rect x="14" y="4" width="4" height="16" rx="1.5"/></svg>
          ) : (
            <svg className="w-9 h-9 ml-1.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="7,4 22,12 7,20"/></svg>
          )}
        </motion.button>
      </div>
    </div>
  );
}

// ── Inline Sentence ────────────────────────────────────────

function InlineSentence({ chunk, active }: { chunk: ApiChunk; active: boolean }) {
  return (
    <span className={`inline transition-all duration-500 rounded-sm
      ${active ? 'bg-primary/10 shadow-[0_0_16px_rgba(88,204,2,0.15)] px-0.5' : ''}`}>
      {chunk.text}
    </span>
  );
}

// ── Full Answer View ───────────────────────────────────────

interface FullAnswerViewProps { question: ApiQuestion; chunks: ApiChunk[]; onStartShadowing?: () => void; }

export function FullAnswerView({ question, chunks, onStartShadowing }: FullAnswerViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const totalChunks = chunks.length;
  const progress = totalChunks > 0 ? currentChunk / totalChunks : 0;

  const playNextChunk = useCallback((index: number) => {
    if (index >= totalChunks) { setIsPlaying(false); setIsComplete(true); setCurrentChunk(totalChunks); return; }
    setCurrentChunk(index);
    const u = new SpeechSynthesisUtterance(chunks[index].text);
    u.rate = 1;
    u.onend = () => playNextChunk(index + 1);
    u.onerror = () => playNextChunk(index + 1);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }, [chunks, totalChunks]);

  const handleToggle = useCallback(() => {
    if (isPlaying) { window.speechSynthesis.cancel(); setIsPlaying(false); setIsComplete(false); }
    else { setIsPlaying(true); setIsComplete(false); setCurrentChunk(0); playNextChunk(0); }
  }, [isPlaying, playNextChunk]);

  useEffect(() => { return () => { window.speechSynthesis.cancel(); }; }, []);

  const paragraphMap = new Map<number, ApiChunk[]>();
  for (const c of chunks) { const p = c.paragraph ?? 1; if (!paragraphMap.has(p)) paragraphMap.set(p, []); paragraphMap.get(p)!.push(c); }
  const sorted = Array.from(paragraphMap.entries()).sort(([a], [b]) => a - b).map(([, v]) => v);
  let flatIdx = 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="px-6 sm:px-8 pb-56 pt-8"
    >
      <div className="max-w-[720px] mx-auto">
        {/* Tags + Question */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <TypeTag type={question.type} />
          <FrameworkTag framework={question.framework} />
        </div>
        <h1 className="text-[32px] sm:text-[48px] font-extrabold text-gray-900 leading-[1.15] mb-12 tracking-tight">
          {question.question}
        </h1>

        {/* Article */}
        <div className="space-y-[32px]">
          {sorted.map((para, pi) => (
            <p key={pi} className="text-[20px] sm:text-[28px] font-normal text-gray-800 leading-[1.9] tracking-normal">
              {para.map((chunk) => {
                const idx = flatIdx++;
                const active = isPlaying && idx === currentChunk;
                return <InlineSentence key={chunk.id} chunk={chunk} active={active} />;
              }).reduce((p, c, i) => (i === 0 ? <>{p}{c}</> : <>{p} {c}</>))}
            </p>
          ))}
        </div>
      </div>

      {/* Player — fixed bottom */}
      <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center pb-10" style={{ paddingBottom: 'env(safe-area-inset-bottom, 32px)' }}>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, ...spring }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200 px-8 py-6 flex flex-col items-center gap-2 border border-gray-100"
        >
          <CircularPlayer isPlaying={isPlaying} progress={progress} isComplete={isComplete} onToggle={handleToggle} />

          {isComplete && onStartShadowing && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...spring }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartShadowing}
              className="mt-2 px-8 py-3.5 rounded-2xl bg-primary text-white text-[16px] font-extrabold hover:bg-primary-hover transition-colors cursor-pointer shadow-lg shadow-primary/20 border-b-[3px] border-primary-hover active:border-b-0 active:mt-[5px]"
            >
              Start Shadowing
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
