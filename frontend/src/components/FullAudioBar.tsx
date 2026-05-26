interface FullAudioBarProps {
  isPlaying: boolean;
  currentIndex: number;
  totalCount: number;
  onPlay: () => void;
  onPause: () => void;
}

export function FullAudioBar({ isPlaying, currentIndex, totalCount, onPlay, onPause }: FullAudioBarProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-primary-light rounded-xl">
      <button
        type="button"
        onClick={isPlaying ? onPause : onPlay}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover transition-colors duration-200 cursor-pointer flex-shrink-0"
        aria-label={isPlaying ? 'Pause full playback' : 'Play full answer'}
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

      <div className="flex-1">
        <p className="text-sm font-medium text-primary">
          {totalCount > 0
            ? currentIndex >= 0
              ? `Sentence ${currentIndex + 1} / ${totalCount}`
              : `${totalCount} sentences`
            : 'No audio available'}
        </p>
        {totalCount > 0 && (
          <div className="flex gap-1 mt-1">
            {Array.from({ length: totalCount }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                  isPlaying && i === currentIndex
                    ? 'bg-primary'
                    : isPlaying && i < currentIndex
                      ? 'bg-primary/60'
                      : 'bg-primary/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
