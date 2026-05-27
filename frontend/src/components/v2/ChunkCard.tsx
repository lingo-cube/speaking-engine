/**
 * Modern ChunkCard - Beautiful card with TTS and smooth animations
 */

import { useState } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import type { ApiChunk } from '../types';

interface ChunkCardProps {
  chunk: ApiChunk;
  index: number;
  isActive: boolean;
  isHighlighted: boolean;
  onClick: () => void;
}

export function ChunkCard({ chunk, index, isActive, isHighlighted, onClick }: ChunkCardProps) {
  const [showControls, setShowControls] = useState(false);

  const { play, pause, replay, toggleSlowMode, isPlaying, isSlowMode, state, error } =
    useAudioPlayer({
      type: 'tts',
      text: chunk.text,
    });

  const handleCardClick = () => {
    onClick();
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleReplayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    replay();
  };

  // Card style based on state
  const getCardStyle = () => {
    if (isHighlighted) {
      return 'bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-xl shadow-sky-500/30 ring-0 scale-[1.02]';
    }

    if (isActive) {
      return 'bg-white shadow-xl shadow-sky-500/10 ring-2 ring-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/15';
    }

    return 'bg-white/80 backdrop-blur-sm shadow-md ring-1 ring-gray-900/5 hover:shadow-xl hover:ring-sky-500/30';
  };

  return (
    <div
      className={`${getCardStyle()} rounded-2xl p-5 transition-all duration-300 cursor-pointer group`}
      onClick={handleCardClick}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Header with index and status */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          {/* Index badge */}
          <span
            className={`flex items-center justify-center w-8 h-8 rounded-xl text-sm font-bold transition-all
              ${isHighlighted
                ? 'bg-white/20 text-white'
                : isActive
                  ? 'bg-gradient-to-br from-sky-400 to-indigo-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 group-hover:bg-gradient-to-br group-hover:from-sky-100 group-hover:to-indigo-100 group-hover:text-sky-700'
              }`}
          >
            {index + 1}
          </span>

          {/* Status indicator */}
          {(isPlaying || state === 'loading') && (
            <span className={`text-xs font-medium flex items-center gap-1.5
              ${isHighlighted ? 'text-white/80' : 'text-sky-600'}`}
            >
              <span className={`relative flex h-2 w-2 ${isPlaying ? '' : 'animate-pulse'}`}>
                {isPlaying && (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </>
                )}
                {!isPlaying && <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>}
              </span>
              {state === 'loading' ? 'Loading...' : 'Playing'}
            </span>
          )}
        </div>

        {/* Controls - Show on hover or when active */}
        {(showControls || isActive) && (
          <div className="flex items-center gap-2">
            {/* Replay */}
            <button
              type="button"
              onClick={handleReplayClick}
              className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95
                ${isHighlighted
                  ? 'bg-white/20 text-white hover:bg-white/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-sky-100 hover:text-sky-600'
                }`}
              aria-label="Replay"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="1,4 1,10 7,10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>

            {/* Play/Pause */}
            <button
              type="button"
              onClick={handlePlayClick}
              className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95
                ${isHighlighted
                  ? 'bg-white/20 text-white'
                  : 'bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40'
                }`}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1.5" />
                  <rect x="14" y="4" width="4" height="16" rx="1.5" />
                </svg>
              ) : (
                <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,4 20,12 5,20" />
                </svg>
              )}
            </button>

            {/* Speed toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSlowMode();
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95
                ${isSlowMode
                  ? isHighlighted
                    ? 'bg-white/20 text-white'
                    : 'bg-sky-100 text-sky-700 ring-2 ring-sky-500/50'
                  : isHighlighted
                    ? 'bg-white/10 text-white/80'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              aria-label={isSlowMode ? 'Normal speed' : 'Slow mode'}
            >
              {isSlowMode ? '0.75x' : '1x'}
            </button>
          </div>
        )}
      </div>

      {/* Chunk text */}
      <p className={`text-base sm:text-lg leading-relaxed
        ${isHighlighted ? 'text-white/95' : 'text-gray-800'}`}
      >
        {chunk.text}
      </p>

      {/* Error display */}
      {error && !isHighlighted && (
        <div className="mt-3 text-xs flex items-center gap-2 text-red-500 bg-red-50 px-3 py-2 rounded-xl">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}

      {/* Progress bar for TTS */}
      {isPlaying && (
        <div className={`mt-4 h-1.5 rounded-full overflow-hidden ${isHighlighted ? 'bg-white/20' : 'bg-gray-100'}`}>
          <div className="h-full rounded-full animate-pulse" style={{
            width: '100%',
            background: isHighlighted
              ? 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.8))'
              : 'linear-gradient(90deg, #0ea5e9, #6366f1)'
          }} />
        </div>
      )}
    </div>
  );
}
