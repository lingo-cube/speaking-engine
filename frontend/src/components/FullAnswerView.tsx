import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ApiChunk, ApiQuestion } from '../types';
import { TypeTag } from './TypeTag';
import { FrameworkTag } from './FrameworkTag';

const spring = { type: 'spring' as const, stiffness: 400, damping: 30 };

// ── Animated Sentence ──────────────────────────────────────

function Sentence({ text, active, onClick }: { text: string; active: boolean; onClick: () => void }) {
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={onClick}
      onTouchEnd={(e) => { e.preventDefault(); onClick(); }}
      onKeyDown={(e) => { if (e.key === 'Enter') { onClick(); }}}
      className={`inline cursor-pointer transition-all duration-300 rounded-sm select-none
        ${active
          ? 'bg-primary/20 shadow-[0_0_16px_rgba(88,204,2,0.25)]'
          : 'hover:bg-primary/5'}`}
      style={{ touchAction: 'manipulation' }}
    >
      {text}
    </span>
  );
}

// ── Circular Player ────────────────────────────────────────

function CircularPlayer({ isPlaying, progress, isComplete, onToggle }: {
  isPlaying: boolean; progress: number; isComplete: boolean; onToggle: () => void;
}) {
  const radius = 46; const circumference = 2 * Math.PI * radius;
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.p
        key={isComplete ? 'done' : isPlaying ? 'playing' : 'idle'}
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`text-sm font-extrabold ${isComplete ? 'text-green-500' : isPlaying ? 'text-primary' : 'text-gray-400'}`}
      >
        {isComplete ? 'Ready!' : isPlaying ? 'Playing...' : 'Tap to listen'}
      </motion.p>
      <div className="relative w-28 h-28 flex items-center justify-center">
        {(isPlaying || isComplete) && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="56" cy="56" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="3" />
            <circle cx="56" cy="56" r={radius} fill="none"
              stroke={isComplete ? '#22c55e' : 'var(--theme-primary, #58CC02)'} strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={isComplete ? 0 : circumference * (1 - Math.min(progress, 1))}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-500 ease-out"
            />
          </svg>
        )}
        <motion.button whileTap={{ scale: 0.88 }} onClick={onToggle}
          className={`w-24 h-24 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer z-10 border-[4px]
            ${isComplete ? 'bg-green-500 border-green-600 text-white shadow-xl shadow-green-500/30'
              : isPlaying ? 'bg-primary border-primary-hover text-white shadow-xl shadow-primary/30'
                : 'bg-white border-gray-200 text-primary hover:border-primary/30 hover:shadow-lg'}`}
          aria-label={isPlaying ? 'Pause' : isComplete ? 'Done' : 'Play'}
        >
          {isComplete ? (
            <motion.svg initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={spring}
              className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></motion.svg>
          ) : isPlaying ? (
            <svg className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1.5"/><rect x="14" y="4" width="4" height="16" rx="1.5"/></svg>
          ) : (
            <svg className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor"><polygon points="8,5 20,12 8,19"/></svg>
          )}
        </motion.button>
      </div>
    </div>
  );
}

// ── Full Answer View ───────────────────────────────────────

interface FullAnswerViewProps { question: ApiQuestion; chunks: ApiChunk[]; onStartShadowing?: () => void; }

export function FullAnswerView({ question, chunks, onStartShadowing }: FullAnswerViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [soloHighlight, setSoloHighlight] = useState<number | null>(null);
  const totalChunks = chunks.length;
  const progress = totalChunks > 0 ? currentChunk / totalChunks : 0;

  const playNextChunk = useCallback((index: number) => {
    if (index >= totalChunks) { setIsPlaying(false); setIsComplete(true); setCurrentChunk(totalChunks); return; }
    setCurrentChunk(index);
    const u = new SpeechSynthesisUtterance(chunks[index].text); u.rate = 1;
    u.onend = () => playNextChunk(index + 1);
    u.onerror = () => playNextChunk(index + 1);
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
  }, [chunks, totalChunks]);

  const handleToggle = () => {
    if (isPlaying) { window.speechSynthesis.cancel(); setIsPlaying(false); setIsComplete(false); }
    else { setIsPlaying(true); setIsComplete(false); setCurrentChunk(0); setSoloHighlight(null); playNextChunk(0); }
  };

  useEffect(() => { return () => { window.speechSynthesis.cancel(); }; }, []);

  // Group into paragraphs
  const map = new Map<number, ApiChunk[]>();
  for (const c of chunks) { const p = c.paragraph ?? 1; if (!map.has(p)) map.set(p, []); map.get(p)!.push(c); }
  const paras = Array.from(map.entries()).sort(([a], [b]) => a - b).map(([, v]) => v);
  let idx = 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="px-6 sm:px-8 pb-60 pt-8"
    >
      <div className="max-w-[720px] mx-auto">
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <TypeTag type={question.type} />
          <FrameworkTag framework={question.framework} />
        </div>
        <h1 className="text-[28px] sm:text-[40px] font-extrabold text-gray-900 leading-[1.2] mb-12 tracking-tight text-center" style={{ textShadow: '0 2px 12px rgba(88,204,2,0.15)' }}>
          {question.question}
        </h1>
        {/* Sample answer card — matching chunk card style */}
        <div className="bg-white rounded-3xl border-2 border-primary/15 shadow-lg shadow-primary/5 px-6 sm:px-10 py-8 sm:py-10">
          <div className="space-y-[32px]">
            {paras.map((para, pi) => (
              <p key={pi} className="text-[20px] sm:text-[28px] font-normal text-gray-800 leading-[1.9] tracking-normal" style={{ textIndent: '2em' }}>
                {para.map((chunk) => {
                  const i = idx++; const active = (isPlaying && i === currentChunk) || soloHighlight === i;
                  return <Sentence key={chunk.id} text={chunk.text} active={active} onClick={() => {
                    window.speechSynthesis.cancel();
                    setIsPlaying(false);
                    setSoloHighlight(i);
                    const u = new SpeechSynthesisUtterance(chunk.text);
                    u.rate = 1;
                    u.onend = () => setSoloHighlight(null);
                    u.onerror = () => setSoloHighlight(null);
                    window.speechSynthesis.speak(u);
                  }} />;
                }).reduce((prev, curr, i) => (i === 0 ? <>{prev}{curr}</> : <>{prev} {curr}</>))}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Player */}
      <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center pb-10"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 32px)' }}>
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, ...spring }}
          className="flex flex-col items-center gap-2"
        >
          <CircularPlayer isPlaying={isPlaying} progress={progress} isComplete={isComplete} onToggle={handleToggle} />
          {isComplete && onStartShadowing && (
            <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ...spring }}
              whileTap={{ scale: 0.95 }} onClick={onStartShadowing}
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
