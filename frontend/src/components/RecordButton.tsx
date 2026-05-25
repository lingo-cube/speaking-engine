import { useRecorder } from '../hooks/useRecorder';

export function RecordButton() {
  const {
    startRecording,
    stopRecording,
    isRecording,
    recordingTime,
    audioBlob,
    isSupported,
    playRecording,
  } = useRecorder();

  const formatRecordingTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isSupported) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-not-allowed" title="Recording is not supported in this browser">
          <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z" />
            <path d="M19 11a7 7 0 0 1-14 0" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <span className="text-xs text-gray-400">Recording unavailable</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {!isRecording && !audioBlob && (
        <button
          type="button"
          onClick={startRecording}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-200 flex-shrink-0 cursor-pointer"
          aria-label="Start recording"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z" />
            <path d="M19 11a7 7 0 0 1-14 0" stroke="#fff" strokeWidth="2" fill="none" />
          </svg>
        </button>
      )}

      {isRecording && (
        <>
          <button
            type="button"
            onClick={stopRecording}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white animate-pulse-recording flex-shrink-0 cursor-pointer"
            aria-label="Stop recording"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          </button>
          <span className="text-sm font-mono text-red-500 tabular-nums">
            {formatRecordingTime(recordingTime)}
          </span>
        </>
      )}

      {audioBlob && !isRecording && (
        <>
          <button
            type="button"
            onClick={playRecording}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-all duration-200 flex-shrink-0 cursor-pointer"
            aria-label="Play recording"
          >
            <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6,4 20,12 6,20" />
            </svg>
          </button>
          <button
            type="button"
            onClick={startRecording}
            className="text-xs text-indigo-500 hover:text-indigo-700 font-medium transition-colors duration-200 cursor-pointer"
          >
            Re-record
          </button>
        </>
      )}
    </div>
  );
}
