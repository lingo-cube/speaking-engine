/**
 * V2 TopicCard - Unified topic card component
 */

import type { ApiTopic } from '../../types';

interface TopicCardProps {
  topic: ApiTopic;
  questionCount: number;
  onClick: () => void;
}

export function TopicCard({ topic, questionCount, onClick }: TopicCardProps) {
  // Category icon
  const CategoryIcon = () => (
    <svg
      className="w-6 h-6 text-sky-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );

  // Question icon
  const QuestionIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6 text-left transition-all duration-200 hover:shadow-md active:scale-[0.98] cursor-pointer"
    >
      {/* Icon and name */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-sky-50">
          <CategoryIcon />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate text-gray-900 font-sans">
            {topic.name}
          </h3>
          <p className="text-sm text-gray-500">
            {topic.category.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Question count */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <QuestionIcon />
        <span>{questionCount} questions</span>
      </div>
    </button>
  );
}
