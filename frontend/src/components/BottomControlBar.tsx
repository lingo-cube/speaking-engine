import { useEffect, useCallback, useState } from 'react';
import { useFullAudioPlayer } from '../hooks/useFullAudioPlayer';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useRecorder } from '../hooks/useRecorder';
import type { ApiChunk } from '../types';
import { CircularPlayButton } from './CircularPlayButton';
import { DotNavigation } from './DotNavigation';

interface BottomControlBarProps {
  chunks: ApiChunk[];
  selectedChunk: ApiChunk | null;
  activeIndex: number | null;
  onHighlightedIndexChange: (index: number) => void;
  onCloseTraining: () => void;
  onSelectSentence: (index: number) => void;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function BottomControlBar({ chunks, selectedChunk, activeIndex, onHighlightedIndexChange, onCloseTraining, onSelectSentence }: BottomControlBarProps) {
  const audioUrls = chunks.map(c => c.audio_url);
  const fullAudio = useFullAudioPlayer(audioUrls);

  useEffect(() => {
    fullAudio.setOnIndexChange((idx) => onHighlightedIndexChange(idx));
    return () => fullAudio.setOnIndexChange(null);
  }, [fullAudio.setOnIndexChange, onHighlightedIndexChange]);

  const selectedAudioUrl = selectedChunk?.audio_url ?? '';
  const sentenceAudio = useAudioPlayer(selectedAudioUrl);
  const recorder = useRecorder();

  // Debug: log mode on mount and mode changes
  useEffect(() => {
    console.log('[BottomControlBar] mode:', selectedChunk === null ? 'READING' : 'TRAINING',
      'selectedChunk:', selectedChunk, 'chunks:', chunks.length,
      'activeIndex:', activeIndex);
  }, [selectedChunk, chunks.length, activeIndex]);

  // Auto-transition: after user plays full, when it ends → enter training
  const [hasStartedFull, setHasStartedFull] = useState(false);

  useEffect(() => {
    if (selectedChunk !== null) {
      setHasStartedFull(false);
    }
  }, [selectedChunk]);

  useEffect(() => {
    if (hasStartedFull && !fullAudio.isPlaying && fullAudio.currentIndex === -1 && selectedChunk === null && fullAudio.totalCount > 0) {
      console.log('[BottomControlBar] auto-transition: full playback ended → selecting sentence 0');
      onSelectSentence(0);
      setHasStartedFull(false);
    }
  }, [hasStartedFull, fullAudio.isPlaying, fullAudio.currentIndex, selectedChunk, fullAudio.totalCount, onSelectSentence]);

  const handleFullToggle = useCallback(() => {
    if (fullAudio.isPlaying) {
      fullAudio.pause();
    } else {
      if (sentenceAudio.isPlaying) sentenceAudio.pause();
      setHasStartedFull(true);
      fullAudio.play();
    }
  }, [fullAudio, sentenceAudio]);

  const handleSentenceToggle = useCallback(() => {
    if (sentenceAudio.isPlaying) {
      sentenceAudio.pause();
    } else {
      if (fullAudio.isPlaying) fullAudio.pause();
      sentenceAudio.play();
    }
  }, [sentenceAudio, fullAudio]);

  const handleStartRecording = useCallback(() => {
    if (fullAudio.isPlaying) fullAudio.pause();
    if (sentenceAudio.isPlaying) sentenceAudio.pause();
    recorder.startRecording();
  }, [recorder, fullAudio, sentenceAudio]);

  const isReading = selectedChunk === null;
  const isRecMode = recorder.isRecording;
  const hasRecording = recorder.audioBlob !== null && !recorder.isRecording;
  const isSentencePlaying = sentenceAudio.isPlaying;
  const isFullPlaying = fullAudio.isPlaying;

  const fullProgress = fullAudio.totalCount > 0 && fullAudio.currentIndex >= 0
    ? (fullAudio.currentIndex + 1) / fullAudio.totalCount
    : fullAudio.isPlaying ? 0.01 : 0;
  const fullCurrentTime = formatTime(fullAudio.elapsedSeconds);
  const fullDuration = formatTime(fullAudio.totalCount * 5);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
    >
      <div className="max-w-2xl mx-auto px-4 py-3">
        {/* READING MODE */}
        {isReading && (
          <div className="flex flex-col items-center">
            <CircularPlayButton
              isPlaying={isFullPlaying}
              progress={fullProgress}
              currentTime={fullCurrentTime}
              duration={fullDuration}
              onToggle={handleFullToggle}
            />
          </div>
        )}

        {/* TRAINING MODE */}
        {!isReading && selectedChunk && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onCloseTraining}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label="Close training"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <DotNavigation
              count={chunks.length}
              activeIndex={activeIndex ?? 0}
              onDotClick={onSelectSentence}
            />

            {/* Recorded state */}
            {hasRecording && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    console.log('[BottomControlBar] playing recording, blob size:', recorder.audioBlob?.size);
                    recorder.playRecording();
                  }}
                  className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all duration-200 active:scale-95 cursor-pointer font-medium shadow-md"
                >
                  <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                  Play my recording
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="flex-1 h-10 flex items-center justify-center gap-1.5 rounded-xl bg-danger text-white hover:bg-danger-hover transition-all duration-200 active:scale-95 cursor-pointer text-sm font-medium shadow-md"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z" />
                      <path d="M19 11a7 7 0 0 1-14 0" stroke="#fff" strokeWidth="2" fill="none" />
                    </svg>
                    Re-record
                  </button>
                  <button
                    type="button"
                    onClick={handleSentenceToggle}
                    className="flex-1 h-10 flex items-center justify-center gap-1.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 active:scale-95 cursor-pointer text-sm font-medium"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="1,4 1,10 7,10" />
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </svg>
                    Replay original
                  </button>
                </div>
              </div>
            )}

            {/* Not recorded */}
            {!hasRecording && (
              <div className="flex items-center justify-center gap-4">
                {!isRecMode && (
                  <button
                    type="button"
                    onClick={handleSentenceToggle}
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover transition-all duration-200 active:scale-95 cursor-pointer shadow-lg hover:shadow-xl"
                    aria-label={isSentencePlaying ? 'Pause' : 'Play sentence'}
                  >
                    {isSentencePlaying ? (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="6,4 20,12 6,20" />
                      </svg>
                    )}
                  </button>
                )}

                {!isSentencePlaying && !isRecMode && (
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    disabled={!recorder.isSupported}
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-danger text-white hover:bg-danger-hover transition-all duration-200 active:scale-95 cursor-pointer shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Record"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z" />
                      <path d="M19 11a7 7 0 0 1-14 0" stroke="#fff" strokeWidth="2" fill="none" />
                    </svg>
                  </button>
                )}

                {isRecMode && (
                  <>
                    <button
                      type="button"
                      onClick={recorder.stopRecording}
                      className="w-14 h-14 flex items-center justify-center rounded-full bg-danger text-white animate-pulse-recording cursor-pointer shadow-lg"
                      aria-label="Stop recording"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="6" width="12" height="12" rx="2" />
                      </svg>
                    </button>
                    <span className="text-base font-mono text-danger tabular-nums font-medium">
                      {formatTime(recorder.recordingTime)}
                    </span>
                  </>
                )}
              </div>
            )}

            {fullAudio.totalCount > 0 && (
              <button
                type="button"
                onClick={handleFullToggle}
                className="flex items-center justify-center gap-1.5 mx-auto text-xs text-gray-400 hover:text-primary transition-colors cursor-pointer"
              >
                {isFullPlaying ? (
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                )}
                <span>
                  {isFullPlaying ? 'Pause' : 'Play'} Full · {fullAudio.currentIndex >= 0 ? fullAudio.currentIndex + 1 : '-'} / {fullAudio.totalCount}
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
