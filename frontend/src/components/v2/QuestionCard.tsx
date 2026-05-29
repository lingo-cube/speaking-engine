/**
 * V2 QuestionCard - Unified question card component
 */

import type { ApiQuestion } from '../../types';
import { Card, Text, Chip } from '../primitives';

interface QuestionCardProps {
  question: ApiQuestion;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

export function QuestionCard({ question, index, isSelected, onClick }: QuestionCardProps) {
  return (
    <Card
      variant="default"
      padding="tight"
      isClickable
      isSelected={isSelected}
      onClick={onClick}
      className="active:scale-[0.98]"
    >
      {/* Question number badge and text */}
      <div className="flex items-start gap-3">
        <Chip
          size="sm"
          variant={isSelected ? 'primary' : 'outline'}
          className={isSelected ? 'bg-white/20 text-white border-transparent' : ''}
        >
          {index + 1}
        </Chip>

        <Text variant="body" className="text-sm font-medium line-clamp-2">
          {question.question}
        </Text>
      </div>
    </Card>
  );
}
