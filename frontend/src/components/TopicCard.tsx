import type { ApiTopic } from '../types';
import { Card, Text, Label } from './primitives';

interface TopicCardProps {
  topic: ApiTopic;
  onClick: () => void;
  isSelected?: boolean;
}

export function TopicCard({ topic, onClick, isSelected }: TopicCardProps) {
  return (
    <Card
      variant="default"
      padding="normal"
      isClickable
      isSelected={isSelected}
      onClick={onClick}
      className="hover:scale-102"
    >
      <Text variant="body" className="font-semibold">{topic.name}</Text>
      <Label>{topic.category}</Label>
    </Card>
  );
}
