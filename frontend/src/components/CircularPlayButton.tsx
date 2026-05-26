interface CircularPlayButtonProps {
  isPlaying: boolean;
  progress: number;
  currentTime: string;
  duration: string;
  onToggle: () => void;
}

export function CircularPlayButton({ isPlaying, progress, currentTime, duration, onToggle }: CircularPlayButtonProps) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(progress, 1));

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {/* Progress ring */}
        {isPlaying && (
          <svg className="absolute inset-0 -m-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-gray-200"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="text-primary transition-all duration-300"
            />
          </svg>
        )}

        {/* Button */}
        <button
          type="button"
          onClick={onToggle}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover transition-all duration-200 active:scale-95 cursor-pointer shadow-lg hover:shadow-xl"
          aria-label={isPlaying ? 'Pause' : 'Play full answer'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6,4 20,12 6,20" />
            </svg>
          )}
        </button>
      </div>

      {/* Time */}
      {isPlaying && (
        <span className="text-sm text-gray-500 tabular-nums">
          {currentTime} / {duration}
        </span>
      )}
    </div>
  );
}
