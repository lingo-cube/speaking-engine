import type { ApiQuestion } from '../types';
import { TypeTag } from './TypeTag';
import { FrameworkTag } from './FrameworkTag';

interface QuestionCardProps {
  question: ApiQuestion;
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 animate-fade-in">
      <p className="text-lg font-medium text-gray-900 mb-4 leading-relaxed">
        {question.question}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <TypeTag type={question.type} />
        <FrameworkTag framework={question.framework} />
      </div>
    </div>
  );
}
