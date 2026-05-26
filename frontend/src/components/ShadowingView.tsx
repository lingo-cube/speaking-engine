import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { ApiChunk } from '../types';
import { ProgressTimeline } from './ProgressTimeline';
import { useSmartAudio } from '../hooks/useSmartAudio';
import { useRecorder } from '../hooks/useRecorder';

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

  const hasRecorded = audioBlob !== null;
  const canAdvance = hasRecorded;
  const isLast = currentIndex >= chunks.length - 1;

  const handleNext = () => {
    if (!canAdvance) return;
    onComplete(currentIndex);
    if (!isLast) onAdvance();
  };

  if (!currentChunk) {
    return <div className="flex items-center justify-center py-20 text-gray-400">No chunks available.</div>;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50/50">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>
          <span>Back</span>
        </button>
        <ProgressTimeline total={chunks.length} current={currentIndex} completed={completedChunks} />
        <span className="text-sm text-gray-400 tabular-nums">{currentIndex + 1}/{chunks.length}</span>
      </div>

      {/* Chunk card — premium treatment */}
      <div className="flex-1 flex items-center justify-center px-6 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-[640px] bg-white rounded-2xl shadow-sm border border-gray-100/80 px-8 py-12 sm:px-12 sm:py-16 text-center"
          >
            {/* Chunk number badge */}
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
              {currentIndex + 1}
            </div>

            {/* Chunk text */}
            <p className="text-[28px] sm:text-[36px] font-medium text-gray-900 leading-[1.6] tracking-tight">
              {currentChunk.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls panel — unified card */}
      <div className="px-6 pb-8 max-w-sm mx-auto w-full space-y-4">
        {/* Action buttons row */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4">
          <div className="flex items-center justify-center gap-6">
            {/* Play */}
            <button
              type="button"
              onClick={() => isPlaying ? pause() : play()}
              className={`group relative w-14 h-14 flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 cursor-pointer
                ${isPlaying
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-gray-50 text-gray-600 hover:bg-primary/5 hover:text-primary border-2 border-gray-200 hover:border-primary/30'
                }`}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              ) : (
                <svg className="w-6 h-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
              )}
            </button>

            {/* Speed toggle */}
            <button
              type="button"
              onClick={toggleSlowMode}
              className={`text-sm font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer active:scale-95
                ${isSlowMode ? 'bg-primary/10 text-primary border-primary/20' : 'text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'}`}
            >
              {isSlowMode ? '0.75x' : '1x'}
            </button>

            {/* Record */}
            {!hasRecorded ? (
              <button
                type="button"
                onClick={() => isRecording ? stopRecording() : startRecording()}
                className={`group relative w-14 h-14 flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 cursor-pointer
                  ${isRecording
                    ? 'bg-danger text-white shadow-lg shadow-danger/25 animate-pulse-recording'
                    : 'bg-gray-50 text-danger hover:bg-red-50 border-2 border-danger/20 hover:border-danger/40'
                  }`}
                aria-label={isRecording ? 'Stop recording' : 'Record'}
              >
                {isRecording ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z"/><path d="M19 11a7 7 0 0 1-14 0" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={playRecording}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-all duration-200 cursor-pointer text-sm font-medium active:scale-95"
                >
                  <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
                  Play
                </button>
                <button
                  type="button"
                  onClick={() => startRecording()}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer font-medium active:scale-95"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z"/><path d="M19 11a7 7 0 0 1-14 0" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                  Retry
                </button>
              </div>
            )}
          </div>

          {/* Recording timer */}
          {isRecording && (
            <p className="text-center text-sm font-mono text-danger tabular-nums mt-2">{recordingTime}s</p>
          )}

          {/* Button labels */}
          {!hasRecorded && !isRecording && (
            <div className="flex items-center justify-center gap-14 mt-2">
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Listen</span>
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Record</span>
            </div>
          )}
        </div>

        {/* Next / Complete */}
        <button
          type="button"
          onClick={handleNext}
          disabled={!canAdvance}
          className={`w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 active:scale-[0.98] cursor-pointer
            ${canAdvance
              ? isLast ? 'bg-green-500 text-white hover:bg-green-600 shadow-sm hover:shadow-md' : 'bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          {!canAdvance ? 'Record to continue' : isLast ? 'Complete Session' : 'Next Chunk'}
        </button>
      </div>
    </div>
  );
}
