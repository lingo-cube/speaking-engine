/**
 * V2 QuestionCard - Unified question card component
 */

import type { ApiQuestion } from '../../types';

interface QuestionCardProps {
  question: ApiQuestion;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

export function QuestionCard({ question, index, isSelected, onClick }: QuestionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left transition-all duration-200 active:scale-[0.98] px-5 py-4 rounded-xl
        ${isSelected
          ? 'bg-sky-500 text-white shadow-md'
          : 'bg-white text-gray-800 shadow-sm ring-1 ring-black/5 hover:shadow-md'
        }`}
    >
      {/* Question number badge */}
      <div className="flex items-start gap-3">
        <span
          className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium flex-shrink-0
            ${isSelected
              ? 'bg-white/20 text-white'
              : 'bg-sky-100 text-sky-700'
            }`}
        >
          {index + 1}
        </span>

        {/* Question text */}
        <span className="text-sm font-medium line-clamp-2 font-sans">
          {question.question}
        </span>
      </div>
    </button>
  );
}
