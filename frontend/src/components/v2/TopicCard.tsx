/**
 * V2 TopicCard - Unified topic card component
 */

import type { ApiTopic } from '../../types';
import { colors, radius, shadow, spacing, typography } from '../../styles/tokens';

interface TopicCardProps {
  topic: ApiTopic;
  questionCount: number;
  onClick: () => void;
}

export function TopicCard({ topic, questionCount, onClick }: TopicCardProps) {
  // Category icon mapping
  const getCategoryIcon = () => {
    return (
      <svg
        className="w-6 h-6"
        style={{ color: colors.primary[500] }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-6 text-left transition-all duration-200 hover:shadow-md active:scale-[0.98] cursor-pointer"
      style={{
        borderRadius: radius.xl,
        boxShadow: shadow.sm,
        padding: spacing[6],
      }}
    >
      {/* Icon and name */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-xl"
          style={{ backgroundColor: colors.primary[50] }}
        >
          {getCategoryIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-lg font-semibold truncate"
            style={{
              color: colors.neutral[900],
              fontFamily: typography.fontFamily.sans,
            }}
          >
            {topic.name}
          </h3>
          <p
            className="text-sm"
            style={{ color: colors.neutral[500] }}
          >
            {topic.category.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Question count */}
      <div
        className="flex items-center gap-2 text-sm"
        style={{ color: colors.neutral[500] }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span>{questionCount} questions</span>
      </div>
    </button>
  );
}
