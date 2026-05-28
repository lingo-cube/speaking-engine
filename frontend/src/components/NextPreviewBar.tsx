import { useParams } from 'react-router-dom';
import { getQuestionsByTopicCode } from '../mock/data';

interface NextPreviewBarProps {
  currentQuestionId: number | null;
  onOpenBottomSheet: () => void;
}

export function NextPreviewBar({ currentQuestionId, onOpenBottomSheet }: NextPreviewBarProps) {
  const { topicCode } = useParams<{ topicCode: string }>();
  const questions = topicCode ? getQuestionsByTopicCode(topicCode) : [];

  const currentIndex = currentQuestionId
    ? questions.findIndex((q) => q.id === currentQuestionId)
    : -1;
  const nextQuestion = currentIndex >= 0 && currentIndex < questions.length - 1
    ? questions[currentIndex + 1]
    : null;

  if (!nextQuestion) return null;

  return (
    <button
      type="button"
      onClick={onOpenBottomSheet}
      className="lg:hidden fixed bottom-[68px] left-0 right-0 mx-4 max-w-2xl bg-[var(--color-surface-100)] text-gray-700 py-2 px-4 rounded-full shadow-md border border-[var(--color-surface-200)] flex items-center justify-center gap-2 hover:bg-[var(--color-surface-50)] transition-colors"
    >
      <span className="text-xs text-gray-500">Next:</span>
      <span className="text-sm font-medium truncate">{nextQuestion.question}</span>
      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9,18 15,12 15,6" />
      </svg>
    </button>
  );
}