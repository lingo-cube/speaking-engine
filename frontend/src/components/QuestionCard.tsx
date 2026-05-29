import type { ApiQuestion } from '../types';
import { TypeTag } from './TypeTag';
import { FrameworkTag } from './FrameworkTag';
import { Card, Text } from './primitives';

interface QuestionCardProps {
  question: ApiQuestion;
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Card variant="default" padding="normal" className="animate-fade-in">
      <Text variant="body-lg" className="mb-4 leading-relaxed">
        {question.question}
      </Text>
      <div className="flex flex-wrap items-center gap-2">
        <TypeTag type={question.type} />
        <FrameworkTag framework={question.framework} />
      </div>
    </Card>
  );
}
