/**
 * Modern TopicCard - Clean, consistent design
 */

import type { ApiTopic } from '../types';

interface TopicCardProps {
  topic: ApiTopic;
  onClick: () => void;
  isSelected?: boolean;
}

export function TopicCard({ topic, onClick }: TopicCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:scale-105 shadow-md ring-1 ring-gray-900/5 hover:ring-sky-500/30"
    >
      {/* Topic name */}
      <h3 className="text-base font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300 mb-2">
        {topic.name}
      </h3>

      {/* Question count badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 group-hover:bg-sky-100 transition-colors duration-300">
        <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span className="text-xs font-semibold text-gray-600 group-hover:text-sky-700">
          3 questions
        </span>
      </div>
    </button>
  );
}
