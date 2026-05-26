import { useEffect, useCallback } from 'react';
import { useFullAudioPlayer } from '../hooks/useFullAudioPlayer';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useRecorder } from '../hooks/useRecorder';
import type { ApiChunk } from '../types';

interface BottomControlBarProps {
  chunks: ApiChunk[];
  selectedChunk: ApiChunk | null;
  highlightedIndex: number;
  onHighlightedIndexChange: (index: number) => void;
  onCloseTraining: () => void;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function BottomControlBar({ chunks, selectedChunk, highlightedIndex: _highlightedIndex, onHighlightedIndexChange, onCloseTraining }: BottomControlBarProps) {
  // Full playback
  const audioUrls = chunks.map(c => c.audio_url);
  const { play: playFull, pause: pauseFull, isPlaying: isFullPlaying, currentIndex, totalCount, setOnIndexChange } = useFullAudioPlayer(audioUrls);

  // Sync highlighting
  useEffect(() => {
    setOnIndexChange((idx) => onHighlightedIndexChange(idx));
    return () => setOnIndexChange(null);
  }, [setOnIndexChange, onHighlightedIndexChange]);

  // Single sentence playback
  const selectedAudioUrl = selectedChunk?.audio_url ?? '';
  const { play: playListen, pause: pauseListen, isPlaying: isListenPlaying, currentTime: listenCurrentTime, duration: listenDuration } = useAudioPlayer(selectedAudioUrl);

  // Recording
  const { startRecording, stopRecording, isRecording, recordingTime, audioBlob, isSupported, playRecording } = useRecorder();

  // Mutual exclusion: stop full when Listen is pressed, stop Listen when Full is pressed
  const handleListenClick = useCallback(() => {
    if (isListenPlaying) {
      pauseListen();
    } else {
      if (isFullPlaying) {
        pauseFull();
      }
      playListen();
    }
  }, [isListenPlaying, pauseListen, isFullPlaying, pauseFull, playListen]);

  const handleFullClick = useCallback(() => {
    if (isFullPlaying) {
      pauseFull();
    } else {
      if (isListenPlaying) {
        pauseListen();
      }
      playFull();
    }
  }, [isFullPlaying, pauseFull, isListenPlaying, pauseListen, playFull]);

  // Reading mode: sentence-level bar progress
  const readingProgress = totalCount > 0 && currentIndex >= 0
    ? ((currentIndex + 1) / totalCount) * 100
    : 0;

  // Training mode: real-time audio progress
  const listenProgress = listenDuration > 0
    ? (listenCurrentTime / listenDuration) * 100
    : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-all duration-[250ms] ease-out"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}>
      <div className="max-w-2xl mx-auto px-4 py-3">
        {selectedChunk ? (
          /* ---- Training Mode ---- */
          <div className="space-y-3 animate-fade-in">
            {/* Top row: selected sentence preview + [×] close */}
            <div className="flex items-start gap-2">
              <p className="flex-1 text-sm text-gray-600 line-clamp-2 leading-snug">
                {selectedChunk.text}
              </p>
              <button
                type="button"
                onClick={onCloseTraining}
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label="Close training"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Middle row: Listen + Record */}
            <div className="flex gap-3">
              {/* Listen button */}
              <button
                type="button"
                onClick={handleListenClick}
                className="flex-1 h-14 flex items-center justify-center gap-2 rounded-xl bg-primary text-white hover:bg-primary-hover transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-base shadow-md hover:shadow-lg relative"
              >
                {isListenPlaying ? (
                  <>
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1"/>
                      <rect x="14" y="4" width="4" height="16" rx="1"/>
                    </svg>
                    <span className="tabular-nums">{formatTime(listenCurrentTime)} / {formatTime(listenDuration)}</span>
                    {/* Inline progress bar at bottom of button */}
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30 rounded-full overflow-hidden">
                      <span
                        className="block h-full bg-white rounded-full transition-all duration-300"
                        style={{ width: `${listenProgress}%` }}
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 ml-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6,4 20,12 6,20"/>
                    </svg>
                    Listen
                  </>
                )}
              </button>

              {/* Record area — morphing button */}
              {!isRecording && !audioBlob && (
                <button
                  type="button"
                  onClick={startRecording}
                  disabled={!isSupported}
                  className="flex-1 h-14 flex items-center justify-center gap-2 rounded-xl bg-danger text-white hover:bg-danger-hover transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-base shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z"/>
                    <path d="M19 11a7 7 0 0 1-14 0" stroke="#fff" strokeWidth="2" fill="none"/>
                  </svg>
                  Record
                </button>
              )}

              {isRecording && (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="flex-1 h-14 flex items-center justify-center gap-2 rounded-xl bg-danger text-white animate-pulse-recording cursor-pointer font-semibold text-base shadow-md"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="6" width="12" height="12" rx="2"/>
                  </svg>
                  {recordingTime}s
                </button>
              )}

              {audioBlob && !isRecording && (
                <div className="flex-1 flex gap-2">
                  <button
                    type="button"
                    onClick={playRecording}
                    className="flex-1 h-14 flex items-center justify-center gap-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-base shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6,4 20,12 6,20"/>
                    </svg>
                    Play
                  </button>
                  <button
                    type="button"
                    onClick={startRecording}
                    className="px-4 h-14 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 active:scale-95 cursor-pointer text-sm font-medium"
                  >
                    Re-record
                  </button>
                </div>
              )}
            </div>

            {/* Bottom row: compact full-playback link */}
            {totalCount > 0 && (
              <button
                type="button"
                onClick={handleFullClick}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors cursor-pointer"
              >
                {isFullPlaying ? (
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1"/>
                    <rect x="14" y="4" width="4" height="16" rx="1"/>
                  </svg>
                ) : (
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6,4 20,12 6,20"/>
                  </svg>
                )}
                <span>
                  {isFullPlaying ? 'Pause' : 'Play'} Full
                  {currentIndex >= 0 ? ` · ${currentIndex + 1}/${totalCount}` : ` · ${totalCount} sentences`}
                </span>
              </button>
            )}
          </div>
        ) : (
          /* ---- Reading Mode ---- */
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleFullClick}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover transition-all duration-200 active:scale-95 cursor-pointer flex-shrink-0 shadow-md hover:shadow-lg"
              aria-label={isFullPlaying ? 'Pause full' : 'Play full'}
            >
              {isFullPlaying ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6,4 20,12 6,20"/>
                </svg>
              )}
            </button>
            <div className="flex-1 min-w-0">
              {totalCount > 0 ? (
                <>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${readingProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1 tabular-nums">
                    {currentIndex >= 0
                      ? `${currentIndex + 1} / ${totalCount}`
                      : `0 / ${totalCount}`}
                  </p>
                </>
              ) : (
                <p className="text-xs text-gray-400">No audio</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
