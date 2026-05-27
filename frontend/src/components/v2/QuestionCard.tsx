/**
 * V2 QuestionCard - Unified question card component
 */

import type { ApiQuestion } from '../../types';
import { colors, radius, shadow, spacing, typography } from '../../styles/tokens';

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
      className="text-left transition-all duration-200 active:scale-[0.98]"
      style={{
        backgroundColor: isSelected ? colors.primary[500] : colors.surface.default,
        borderRadius: radius.xl,
        boxShadow: isSelected ? shadow.md : shadow.sm,
        padding: spacing[4] + ' ' + spacing[5],
        border: isSelected ? 'none' : '1px solid ' + colors.border.default,
      }}
    >
      {/* Question number badge */}
      <div className="flex items-start gap-3">
        <span
          className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium flex-shrink-0"
          style={{
            backgroundColor: isSelected
              ? 'rgba(255, 255, 255, 0.2)'
              : colors.primary[100],
            color: isSelected ? colors.surface.default : colors.primary[700],
          }}
        >
          {index + 1}
        </span>

        {/* Question text */}
        <span
          className="text-sm font-medium line-clamp-2"
          style={{
            color: isSelected ? colors.surface.default : colors.neutral[800],
            fontFamily: typography.fontFamily.sans,
          }}
        >
          {question.question}
        </span>
      </div>
    </button>
  );
}
