import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { ApiChunk } from '../types';
import { useSmartAudio } from '../hooks/useSmartAudio';
import { useRecorder } from '../hooks/useRecorder';
import { Card, Text, Button, Chip, AudioControl, ProgressIndicator, Label } from './primitives';

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

  if (!current) return <div className="flex items-center justify-center py-20 text-[var(--color-surface-500)]">Loading...</div>;

  // Build completed array for ProgressIndicator
  const completedArray = Array.from(completedChunks);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[var(--color-primary)]/5 via-white to-white">
      {/* Progress bar at top */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 px-2 py-1 -ml-2 rounded-lg text-[var(--color-surface-500)] hover:text-[var(--color-surface-900)] hover:bg-[var(--color-surface-100)] transition-all cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex-1 h-2 bg-[var(--color-surface-100)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--color-primary)] rounded-full"
              initial={{ width: `${(completed / chunks.length) * 100}%` }}
              animate={{ width: `${((completed + (hasRecorded ? 1 : 0)) / chunks.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <Text variant="body" color="tertiary">{completed}/{chunks.length}</Text>
        </div>
        {/* Dot pills */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <ProgressIndicator
            type="dots"
            total={chunks.length}
            current={currentIndex}
            completed={completedArray}
          />
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
                <svg className="w-10 h-10 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
              </motion.div>
              <Text variant="title-lg" color="primary">{isLast ? 'Amazing!' : completed + 1 >= chunks.length ? 'Perfect!' : 'Great!'}</Text>
              <Text variant="body" color="secondary">
                {isLast ? 'Session complete!' : `${chunks.length - completed - 1} to go`}
              </Text>
            </motion.div>
          ) : (
            <motion.div key={`chunk-${currentIndex}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={spring}
              className="w-full max-w-lg text-center space-y-5"
            >
              {/* Badge — using Chip */}
              <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <Chip variant="primary" size="md">Sentence {currentIndex + 1}</Chip>
              </motion.div>

              {/* Chunk card — using Card + Text */}
              <Card variant="elevated" padding="loose">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <Text variant="title-lg" maxWidth="lg">{current.text}</Text>
                </motion.div>
              </Card>

              {/* Hint */}
              {!hasRecorded && !isRecording && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-sm text-[var(--color-surface-500)] font-semibold"
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
          {/* Two big buttons — using AudioControl */}
          <div className="flex items-center justify-center gap-6">
            {/* Listen */}
            <AudioControl
              type={isPlaying ? 'pause' : 'play'}
              state={isPlaying ? 'active' : 'idle'}
              onToggle={() => isPlaying ? pause() : play()}
              label={isPlaying ? 'Pause audio' : 'Play audio'}
              aria-pressed={isPlaying}
            />

            {/* Record */}
            {!hasRecorded ? (
              <AudioControl
                type="record"
                state={isRecording ? 'active' : 'idle'}
                showPulse={isRecording}
                onToggle={() => isRecording ? stopRecording() : startRecording()}
                label={isRecording ? 'Stop recording' : 'Start recording'}
                aria-live="polite"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Button variant="secondary" size="md" onClick={playRecording}>
                  Play my voice
                </Button>
                <button onClick={() => startRecording()}
                  className="px-4 py-2 rounded-2xl text-sm font-bold text-[var(--color-surface-500)] hover:text-[var(--color-surface-900)] transition-colors cursor-pointer active:scale-95"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          {/* Sub-controls row */}
          <div className="flex items-center justify-center gap-6 h-7">
            {isRecording ? (
              <Text variant="label" color="danger">{recordingTime}s</Text>
            ) : !hasRecorded ? (
              <>
                <Label>Listen</Label>
                <div className="w-px h-4 bg-[var(--color-surface-200)]" />
                <Label>Record</Label>
              </>
            ) : null}
            <button onClick={toggleSlowMode}
              className={`text-xs font-extrabold px-2.5 py-1 rounded-full transition-all cursor-pointer active:scale-95 ${isSlowMode ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]' : 'text-[var(--color-surface-500)] hover:text-[var(--color-surface-900)]'}`}
            >
              {isSlowMode ? '0.75x' : '1x'}
            </button>
          </div>

          {/* Advance button */}
          <Button
            variant="primary"
            size="lg"
            onClick={advance}
            isDisabled={!canAdvance}
            className="w-full"
          >
            {!canAdvance ? 'Record to continue' : isLast ? 'Complete!' : 'Next'}
          </Button>
        </div>
      )}
    </div>
  );
}
