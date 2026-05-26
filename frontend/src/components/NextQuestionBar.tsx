import type { ApiQuestion } from '../types';

interface NextQuestionBarProps {
  nextQuestion: ApiQuestion | null;
  onNext: () => void;
  onRestart: () => void;
  isLast: boolean;
  currentIndex: number;
  totalCount: number;
}

export function NextQuestionBar({ nextQuestion, onNext, onRestart, isLast, currentIndex, totalCount }: NextQuestionBarProps) {
  if (currentIndex < 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md ring-1 ring-gray-900/5 p-6 animate-fade-in">
      {isLast ? (
        <div className="text-center">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20,6 9,17 4,12" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-900 mb-1">
            All {totalCount} questions complete!
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Great job on completing this topic.
          </p>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-hover transition-all duration-200 active:scale-95 cursor-pointer font-semibold"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="1,4 1,10 7,10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Start Over
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0 mr-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Next Question
            </p>
            <p className="text-sm text-gray-700 truncate">
              {nextQuestion?.question ?? ''}
            </p>
          </div>
          <button
            type="button"
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-hover transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-sm flex-shrink-0"
          >
            Next Question
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
