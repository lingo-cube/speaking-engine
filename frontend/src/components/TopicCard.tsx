/**
 * Modern TopicCard - Beautiful topic selection card
 */

import type { ApiTopic } from '../types';

interface TopicCardProps {
  topic: ApiTopic;
  onClick: () => void;
  isSelected?: boolean;
}

export function TopicCard({ topic, onClick, isSelected }: TopicCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 text-left transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 hover:scale-105 hover:-translate-y-1 shadow-lg ring-1 ring-gray-900/5"
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      <div className="relative flex items-center justify-center w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 group-hover:from-sky-500 group-hover:to-indigo-500 transition-all duration-300">
        <svg
          className="w-7 h-7 text-sky-600 group-hover:text-white transition-colors duration-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
      </div>

      {/* Topic name */}
      <h3 className="relative text-base font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300 mb-1">
        {topic.name}
      </h3>

      {/* Category */}
      <p className="relative text-xs text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
        {topic.category.toUpperCase()}
      </p>
    </button>
  );
}
