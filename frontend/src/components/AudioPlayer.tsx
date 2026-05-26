import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface AudioPlayerProps {
  audioUrl: string;
}

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const { play, pause, replay, toggleSlowMode, isPlaying, isSlowMode, currentTime, duration } =
    useAudioPlayer(audioUrl);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col gap-2">
      {/* Main controls row */}
      <div className="flex items-center gap-3">
        {/* Play/Pause */}
        <button
          type="button"
          onClick={isPlaying ? pause : play}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover transition-all duration-200 active:scale-95 flex-shrink-0 cursor-pointer shadow-md hover:shadow-lg"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6,4 20,12 6,20" />
            </svg>
          )}
        </button>

        {/* Replay */}
        <button
          type="button"
          onClick={replay}
          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 active:scale-95 flex-shrink-0 cursor-pointer"
          aria-label="Replay"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1,4 1,10 7,10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>

        {/* Speed toggle */}
        <button
          type="button"
          onClick={toggleSlowMode}
          className={`text-sm font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 active:scale-95 flex-shrink-0 cursor-pointer
            ${isSlowMode
              ? 'bg-primary-light text-primary border-primary'
              : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700'
            }`}
          aria-label={isSlowMode ? 'Normal speed' : 'Slow mode'}
        >
          {isSlowMode ? '0.75x' : '1x'}
        </button>

        {/* Time */}
        <span className="text-sm text-gray-400 tabular-nums ml-auto">
          {formatTime(currentTime)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-150"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}
