import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { ApiChunk } from '../types';
import { ProgressTimeline } from './ProgressTimeline';
import { NextChunkButton } from './NextChunkButton';
import { useSmartAudio } from '../hooks/useSmartAudio';
import { useRecorder } from '../hooks/useRecorder';

interface ShadowingViewProps {
  chunks: ApiChunk[];
  currentIndex: number;
  completedChunks: Set<number>;
  onComplete: (index: number) => void;
  onAdvance: () => void;
}

export function ShadowingView({
  chunks,
  currentIndex,
  completedChunks,
  onComplete,
  onAdvance,
}: ShadowingViewProps) {
  const navigate = useNavigate();
  const currentChunk = chunks[currentIndex];
  const { play, pause, isPlaying } = useSmartAudio(
    currentChunk?.audio_url ?? '',
    currentChunk?.text ?? '',
  );
  const {
    startRecording,
    stopRecording,
    isRecording,
    playRecording,
    audioBlob,
  } = useRecorder();

  const hasListened = audioBlob !== null || isPlaying;
  const hasRecorded = audioBlob !== null;
  const canAdvance = hasListened && hasRecorded;

  const handleNext = () => {
    if (!canAdvance) return;

    onComplete(currentIndex);

    if (currentIndex < chunks.length - 1) {
      onAdvance();
    }
  };

  const handleListen = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  if (!currentChunk) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        No chunks available.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Header: Back + ProgressTimeline + Chunk counter */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <span aria-hidden="true">&larr;</span>
          <span>Back</span>
        </button>
        <ProgressTimeline
          total={chunks.length}
          current={currentIndex}
          completed={completedChunks}
        />
        <span className="text-sm text-gray-500">
          Chunk {currentIndex + 1}/{chunks.length}
        </span>
      </div>

      {/* Chunk text - large, centered */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="text-2xl font-medium text-gray-900 text-center leading-relaxed max-w-lg"
        >
          {currentChunk.text}
        </motion.p>
      </div>

      {/* Controls */}
      <div className="px-6 pb-8 space-y-4">
        {/* Audio controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleListen}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer
              ${
                isPlaying
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm'
              }`}
            aria-label={isPlaying ? 'Stop audio' : 'Play audio'}
          >
            <span className="text-lg" aria-hidden="true">
              {isPlaying ? '⏹' : '▶'}
            </span>
          </button>

          <span className="text-sm text-gray-400">1x</span>
        </div>

        {/* Recording controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleRecord}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer
              ${
                isRecording
                  ? 'bg-danger text-white animate-pulse-recording shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm'
              }`}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
          >
            <span className="text-lg" aria-hidden="true">
              {isRecording ? '⏹' : '●'}
            </span>
          </button>

          <button
            type="button"
            onClick={playRecording}
            disabled={!audioBlob}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer
              ${
                audioBlob
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm'
                  : 'bg-gray-50 text-gray-300 cursor-not-allowed'
              }`}
            aria-label="Play recording"
          >
            <span className="text-lg" aria-hidden="true">
              {'▶️'}
            </span>
          </button>
        </div>

        {/* Next Chunk Button */}
        <div className="pt-2">
          <NextChunkButton disabled={!canAdvance} onClick={handleNext} />
        </div>
      </div>
    </div>
  );
}
