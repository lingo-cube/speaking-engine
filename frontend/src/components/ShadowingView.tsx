import { motion } from 'framer-motion';
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
  const { play, pause, isPlaying } = useSmartAudio(currentChunk?.audio_url ?? '', currentChunk?.text ?? '');
  const { startRecording, stopRecording, isRecording, playRecording, recordingTime, audioBlob } = useRecorder();

  const hasRecorded = audioBlob !== null;
  const canAdvance = hasRecorded;

  const handleNext = () => {
    if (!canAdvance) return;
    onComplete(currentIndex);
    if (currentIndex < chunks.length - 1) onAdvance();
  };

  if (!currentChunk) {
    return <div className="flex items-center justify-center py-20 text-gray-400">No chunks available.</div>;
  }

  const isLast = currentIndex >= chunks.length - 1;

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Header — matching SessionHeader style */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>
          <span>Back</span>
        </button>
        <ProgressTimeline total={chunks.length} current={currentIndex} completed={completedChunks} />
        <span className="text-sm text-gray-400 tabular-nums">{currentIndex + 1} / {chunks.length}</span>
      </div>

      {/* Chunk text — centered, large, matching FullAnswerView typography scale */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="text-[28px] sm:text-[36px] font-medium text-gray-900 text-center leading-[1.6] max-w-[640px] tracking-tight"
        >
          {currentChunk.text}
        </motion.p>
      </div>

      {/* Controls — two clearly separated zones */}
      <div className="px-6 pb-8 space-y-5 max-w-sm mx-auto w-full">
        {/* Listen zone */}
        <div className="bg-gray-50 rounded-2xl px-4 py-3 space-y-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider text-center">Listen</p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => isPlaying ? pause() : play()}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 cursor-pointer shadow-sm
                ${isPlaying ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              ) : (
                <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Record zone */}
        <div className="bg-gray-50 rounded-2xl px-4 py-3 space-y-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider text-center">Record</p>
          {!hasRecorded && (
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => isRecording ? stopRecording() : startRecording()}
                className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 cursor-pointer shadow-sm
                  ${isRecording ? 'bg-danger text-white animate-pulse-recording shadow-md' : 'bg-white text-danger hover:bg-red-50 border-2 border-danger/30'}`}
                aria-label={isRecording ? 'Stop recording' : 'Start recording'}
              >
                {isRecording ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
                ) : (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z"/><path d="M19 11a7 7 0 0 1-14 0" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                )}
              </button>
            </div>
          )}
          {isRecording && (
            <p className="text-center text-sm font-mono text-danger tabular-nums">{recordingTime}s</p>
          )}
          {hasRecorded && !isRecording && (
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={playRecording}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors cursor-pointer text-sm font-medium active:scale-95"
              >
                <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
                Play
              </button>
              <button
                type="button"
                onClick={() => startRecording()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer font-medium active:scale-95"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z"/><path d="M19 11a7 7 0 0 1-14 0" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                Retry
              </button>
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
              ? isLast ? 'bg-green-500 text-white hover:bg-green-600 shadow-sm' : 'bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          {!canAdvance ? 'Record to continue' : isLast ? 'Complete Session' : 'Next Chunk'}
        </button>
      </div>
    </div>
  );
}
