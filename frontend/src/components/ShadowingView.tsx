import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { ApiChunk } from '../types';
import { useSmartAudio } from '../hooks/useSmartAudio';
import { useRecorder } from '../hooks/useRecorder';

const spring = { type: 'spring' as const, stiffness: 400, damping: 30 };
const bounce = { type: 'spring' as const, stiffness: 500, damping: 20 };

interface ShadowingViewProps {
  chunks: ApiChunk[]; currentIndex: number; completedChunks: Set<number>;
  onComplete: (index: number) => void; onAdvance: () => void;
}

export function ShadowingView({ chunks, currentIndex, completedChunks, onComplete, onAdvance }: ShadowingViewProps) {
  const navigate = useNavigate();
  const current = chunks[currentIndex];
  const { play, pause, isPlaying, isSlowMode, toggleSlowMode } = useSmartAudio(current?.audio_url ?? '', current?.text ?? '');
  const { startRecording, stopRecording, isRecording, playRecording, recordingTime, audioBlob } = useRecorder();
  const [celebrating, setCelebrating] = useState(false);

  const hasRecorded = audioBlob !== null;
  const canAdvance = hasRecorded;
  const isLast = currentIndex >= chunks.length - 1;
  const completed = completedChunks.size;

  const advance = () => {
    setCelebrating(true);
    setTimeout(() => { setCelebrating(false); onComplete(currentIndex); if (!isLast) onAdvance(); }, 900);
  };

  if (!current) return <div className="flex items-center justify-center py-20 text-gray-400" />;

  // Build dot indicators
  const dots = Array.from({ length: chunks.length }, (_, i) => {
    const done = completedChunks.has(i);
    const now = i === currentIndex;
    return { i, done, now };
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[var(--color-primary)]/5] via-white to-white">
      {/* Progress bar at top */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 px-2 py-1 -ml-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: `${(completed / chunks.length) * 100}%` }}
              animate={{ width: `${((completed + (hasRecorded ? 1 : 0)) / chunks.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <span className="text-sm font-extrabold text-primary tabular-nums">{completed}/{chunks.length}</span>
        </div>
        {/* Dot pills */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {dots.map(({ i, done, now }) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                done ? 'bg-primary scale-100' : now ? 'bg-primary scale-125 ring-2 ring-primary/30' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait">
          {celebrating ? (
            <motion.div key="celebrate" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={bounce}
              className="flex flex-col items-center gap-4"
            >
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.4, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
              </motion.div>
              <p className="text-2xl font-extrabold text-green-500">{isLast ? 'Amazing!' : completed + 1 >= chunks.length ? 'Perfect!' : 'Great!'}</p>
              <p className="text-sm text-gray-400 font-medium">
                {isLast ? 'Session complete!' : `${chunks.length - completed - 1} to go`}
              </p>
            </motion.div>
          ) : (
            <motion.div key={`chunk-${currentIndex}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={spring}
              className="w-full max-w-lg text-center space-y-5"
            >
              {/* Badge — outside card */}
              <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-extrabold"
              >
                Sentence {currentIndex + 1}
              </motion.div>

              {/* Chunk card — just the text */}
              <div className="bg-white rounded-3xl border-2 border-primary/15 shadow-lg shadow-primary/5 px-8 sm:px-12 py-10 sm:py-14">
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-[22px] sm:text-[28px] font-bold text-gray-900 leading-[1.6] tracking-normal"
                  style={{ textDecoration: 'underline', textDecorationColor: 'var(--color-primary)', textDecorationStyle: 'wavy', textUnderlineOffset: '8px', textDecorationThickness: '1.5px' }}
                >
                  {current.text}
                </motion.p>
              </div>

              {/* Hint — outside card */}
              {!hasRecorded && !isRecording && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-sm text-gray-400 font-semibold"
                >
                  Listen to the audio, then record yourself
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      {!celebrating && (
        <div className="px-6 pt-6 pb-8 max-w-sm mx-auto w-full space-y-5">
          {/* Two big buttons */}
          <div className="flex items-center justify-center gap-6">
            {/* Listen */}
            <motion.button whileTap={{ scale: 0.88 }} onClick={() => isPlaying ? pause() : play()}
              className={`w-[80px] h-[80px] flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer border-[3px]
                ${isPlaying
                  ? 'bg-primary border-primary-hover text-white shadow-xl shadow-primary/30'
                  : 'bg-white border-gray-200 text-primary hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10'}`}
            >
              {isPlaying ? (
                <svg className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1.5"/><rect x="14" y="4" width="4" height="16" rx="1.5"/></svg>
              ) : (
                <svg className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor"><polygon points="8,5 20,12 8,19"/></svg>
              )}
            </motion.button>

            {/* Record */}
            {!hasRecorded ? (
              <motion.button whileTap={{ scale: 0.88 }}
                onClick={() => isRecording ? stopRecording() : startRecording()}
                className={`w-[80px] h-[80px] flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer border-[3px]
                  ${isRecording
                    ? 'bg-danger border-red-700 text-white shadow-xl shadow-danger/30 animate-pulse-recording'
                    : 'bg-white border-danger/20 text-danger hover:border-danger/50 hover:shadow-lg hover:shadow-danger/10'}`}
              >
                {isRecording ? (
                  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
                ) : (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z"/><path d="M19 11a7 7 0 0 1-14 0" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                )}
              </motion.button>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <button onClick={playRecording}
                  className="px-5 py-2.5 rounded-2xl bg-green-50 text-green-600 hover:bg-green-100 transition-all cursor-pointer text-sm font-extrabold border-2 border-green-100 active:scale-95"
                >
                  Play my voice
                </button>
                <button onClick={() => startRecording()}
                  className="px-4 py-2 rounded-2xl text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer active:scale-95"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          {/* Sub-controls row */}
          <div className="flex items-center justify-center gap-6 h-7">
            {isRecording ? (
              <span className="text-sm font-mono font-extrabold text-danger tabular-nums">{recordingTime}s</span>
            ) : !hasRecorded ? (
              <>
                <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Listen</span>
                <div className="w-px h-4 bg-gray-200" />
                <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Record</span>
              </>
            ) : null}
            <button onClick={toggleSlowMode}
              className={`text-xs font-extrabold px-2.5 py-1 rounded-full transition-all cursor-pointer active:scale-95 ${isSlowMode ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {isSlowMode ? '0.75x' : '1x'}
            </button>
          </div>

          {/* Advance */}
          <motion.button whileTap={canAdvance ? { scale: 0.96 } : {}}
            onClick={advance} disabled={!canAdvance}
            className={`w-full py-4 rounded-2xl font-extrabold text-[16px] transition-all duration-200 cursor-pointer border-b-[4px]
              ${canAdvance
                ? isLast
                  ? 'bg-green-500 border-green-700 text-white active:border-b-0 active:mt-1 shadow-lg shadow-green-500/20'
                  : 'bg-primary border-primary-hover text-white active:border-b-0 active:mt-1 shadow-lg shadow-primary/20'
                : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'}`}
          >
            {!canAdvance ? 'Record to continue' : isLast ? 'Complete!' : 'Next'}
          </motion.button>
        </div>
      )}
    </div>
  );
}
