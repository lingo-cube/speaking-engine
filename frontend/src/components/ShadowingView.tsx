import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { ApiChunk } from '../types';
import { ProgressTimeline } from './ProgressTimeline';
import { useSmartAudio } from '../hooks/useSmartAudio';
import { useRecorder } from '../hooks/useRecorder';

const spring = { type: 'spring' as const, stiffness: 400, damping: 30 };
const bounce = { type: 'spring' as const, stiffness: 500, damping: 20 };

interface ShadowingViewProps {
  chunks: ApiChunk[];
  currentIndex: number;
  completedChunks: Set<number>;
  onComplete: (index: number) => void;
  onAdvance: () => void;
}

export function ShadowingView({ chunks, currentIndex, completedChunks, onComplete, onAdvance }: ShadowingViewProps) {
  const navigate = useNavigate();
  const currentChunk = chunks[currentIndex];
  const { play, pause, isPlaying, isSlowMode, toggleSlowMode } = useSmartAudio(currentChunk?.audio_url ?? '', currentChunk?.text ?? '');
  const { startRecording, stopRecording, isRecording, playRecording, recordingTime, audioBlob } = useRecorder();
  const [showCelebration, setShowCelebration] = useState(false);

  const hasRecorded = audioBlob !== null;
  const canAdvance = hasRecorded;
  const isLast = currentIndex >= chunks.length - 1;

  const handleAdvance = () => {
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      onComplete(currentIndex);
      if (!isLast) onAdvance();
    }, 800);
  };

  if (!currentChunk) {
    return <div className="flex items-center justify-center py-20 text-gray-400">No chunks available.</div>;
  }

  const completed = completedChunks.size;

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-white">
      {/* Header — clean, minimal */}
      <div className="flex items-center justify-between px-5 py-3">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>
        </button>
        <ProgressTimeline total={chunks.length} current={currentIndex} completed={completedChunks} />
        <span className="text-sm font-bold text-primary tabular-nums">{completed}/{chunks.length}</span>
      </div>

      {/* Chunk display area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <AnimatePresence mode="wait">
          {showCelebration ? (
            /* Celebration screen between chunks */
            <motion.div
              key="celebration"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={bounce}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
              </motion.div>
              <p className="text-2xl font-extrabold text-green-500">
                {completed + 1 >= chunks.length ? 'Amazing!' : 'Great!'}
              </p>
            </motion.div>
          ) : (
            /* Chunk card */
            <motion.div
              key={`chunk-${currentIndex}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={spring}
              className="w-full max-w-[600px] text-center space-y-8"
            >
              {/* Level badge */}
              <motion.div
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10"
              >
                <span className="text-sm font-bold text-primary">Sentence {currentIndex + 1}</span>
                <span className="text-xs text-primary/50">of {chunks.length}</span>
              </motion.div>

              {/* Large reading text */}
              <motion.p
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-[32px] sm:text-[40px] font-bold text-gray-900 leading-[1.5] tracking-tight"
              >
                {currentChunk.text}
              </motion.p>

              {/* Encourager */}
              {!hasRecorded && !isRecording && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-gray-400 font-medium"
                >
                  Listen, then record yourself
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="px-6 pb-8 max-w-sm mx-auto w-full space-y-4">
        {/* Two action buttons */}
        {!showCelebration && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-5"
          >
            {/* Listen button — large, prominent */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => isPlaying ? pause() : play()}
              className={`w-[72px] h-[72px] flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer border-[3px]
                ${isPlaying
                  ? 'bg-primary border-primary text-white shadow-xl shadow-primary/30 scale-105'
                  : 'bg-white border-gray-200 text-primary hover:border-primary/40 hover:shadow-lg'
                }`}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1.5"/><rect x="14" y="4" width="4" height="16" rx="1.5"/></svg>
              ) : (
                <svg className="w-8 h-8 ml-1" viewBox="0 0 24 24" fill="currentColor"><polygon points="7,4 22,12 7,20"/></svg>
              )}
            </motion.button>

            {/* Spacer divider */}
            <div className="w-px h-8 bg-gray-200" />

            {/* Record button — large, prominent */}
            {!hasRecorded ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => isRecording ? stopRecording() : startRecording()}
                className={`w-[72px] h-[72px] flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer border-[3px]
                  ${isRecording
                    ? 'bg-danger border-danger text-white shadow-xl shadow-danger/30 animate-pulse-recording'
                    : 'bg-white border-danger/20 text-danger hover:border-danger/50 hover:shadow-lg hover:shadow-danger/10'
                  }`}
                aria-label={isRecording ? 'Stop' : 'Record'}
              >
                {isRecording ? (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
                ) : (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z"/><path d="M19 11a7 7 0 0 1-14 0" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                )}
              </motion.button>
            ) : (
              <div className="flex items-center gap-3">
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={playRecording}
                  className="flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-green-50 text-green-600 hover:bg-green-100 transition-all cursor-pointer text-sm font-bold active:scale-95 border-2 border-green-100"
                >
                  <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
                  Play
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => startRecording()}
                  className="flex items-center gap-1.5 px-5 py-3 rounded-2xl border-2 border-gray-100 text-sm text-gray-500 hover:text-gray-700 hover:border-gray-200 transition-all cursor-pointer font-bold active:scale-95"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z"/><path d="M19 11a7 7 0 0 1-14 0" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                  Retry
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {/* Speed + recording timer row */}
        {!showCelebration && (
          <div className="flex items-center justify-center gap-4 h-6">
            {isRecording ? (
              <span className="text-sm font-mono font-bold text-danger tabular-nums">{recordingTime}s</span>
            ) : (
              <button
                type="button"
                onClick={toggleSlowMode}
                className={`text-xs font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer active:scale-95
                  ${isSlowMode ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {isSlowMode ? '0.75x speed' : '1x speed'}
              </button>
            )}
          </div>
        )}

        {/* Advance button */}
        <motion.button
          whileTap={canAdvance ? { scale: 0.96 } : {}}
          onClick={handleAdvance}
          disabled={!canAdvance}
          className={`w-full py-4 rounded-2xl font-extrabold text-[16px] transition-all duration-200 cursor-pointer border-b-[4px]
            ${canAdvance
              ? isLast
                ? 'bg-green-500 border-green-700 text-white hover:bg-green-600 active:border-b-0 active:mt-1 shadow-lg shadow-green-500/20'
                : 'bg-primary border-primary-hover text-white hover:bg-primary-hover active:border-b-0 active:mt-1 shadow-lg shadow-primary/20'
              : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
            }`}
        >
          {!canAdvance ? 'Record to continue' : isLast ? 'Complete!' : 'Continue'}
        </motion.button>
      </div>
    </div>
  );
}
