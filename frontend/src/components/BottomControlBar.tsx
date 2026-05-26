import { useEffect } from 'react';
import { useFullAudioPlayer } from '../hooks/useFullAudioPlayer';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useRecorder } from '../hooks/useRecorder';
import type { ApiChunk } from '../types';

interface BottomControlBarProps {
  chunks: ApiChunk[];
  selectedChunk: ApiChunk | null;
  highlightedIndex: number;
  onHighlightedIndexChange: (index: number) => void;
}

export function BottomControlBar({ chunks, selectedChunk, highlightedIndex: _highlightedIndex, onHighlightedIndexChange }: BottomControlBarProps) {
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
  const { play: playListen, pause: pauseListen, isPlaying: isListenPlaying } = useAudioPlayer(selectedAudioUrl);

  // Recording
  const { startRecording, stopRecording, isRecording, recordingTime, audioBlob, isSupported, playRecording } = useRecorder();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}>
      <div className="max-w-2xl mx-auto px-4 py-3">
        {/* Full playback - always visible compact bar */}
        <div className="flex items-center gap-3 mb-3">
          <button
            type="button"
            onClick={isFullPlaying ? pauseFull : playFull}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover transition-colors cursor-pointer flex-shrink-0"
            aria-label={isFullPlaying ? 'Pause full' : 'Play full'}
          >
            {isFullPlaying ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            ) : (
              <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
            )}
          </button>
          <div className="flex-1">
            <div className="flex gap-1">
              {Array.from({ length: totalCount }).map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
                  isFullPlaying && i === currentIndex ? 'bg-primary' :
                  isFullPlaying && i < currentIndex ? 'bg-primary/40' : 'bg-gray-200'
                }`} />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {totalCount > 0 ? `Sentence ${currentIndex >= 0 ? currentIndex + 1 : '-'} / ${totalCount}` : 'No audio'}
            </p>
          </div>
        </div>

        {/* Listen + Record - visible when sentence selected */}
        {selectedChunk && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={isListenPlaying ? pauseListen : playListen}
              className="flex-1 h-14 flex items-center justify-center gap-2 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors cursor-pointer font-semibold text-base shadow-sm"
            >
              {isListenPlaying ? (
                <><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg> Pause</>
              ) : (
                <><svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg> Listen</>
              )}
            </button>

            {!isRecording && !audioBlob && (
              <button
                type="button"
                onClick={startRecording}
                disabled={!isSupported}
                className="flex-1 h-14 flex items-center justify-center gap-2 rounded-xl bg-danger text-white hover:bg-danger-hover transition-colors cursor-pointer font-semibold text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z"/><path d="M19 11a7 7 0 0 1-14 0" stroke="#fff" strokeWidth="2" fill="none"/></svg>
                Record
              </button>
            )}

            {isRecording && (
              <button
                type="button"
                onClick={stopRecording}
                className="flex-1 h-14 flex items-center justify-center gap-2 rounded-xl bg-danger text-white animate-pulse-recording cursor-pointer font-semibold text-base shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
                {recordingTime}s
              </button>
            )}

            {audioBlob && !isRecording && (
              <div className="flex-1 flex gap-2">
                <button
                  type="button"
                  onClick={playRecording}
                  className="flex-1 h-14 flex items-center justify-center gap-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors cursor-pointer font-semibold text-base shadow-sm"
                >
                  <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
                  Play
                </button>
                <button
                  type="button"
                  onClick={startRecording}
                  className="px-4 h-14 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer text-sm font-medium"
                >
                  Re-record
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
