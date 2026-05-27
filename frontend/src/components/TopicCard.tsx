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
      className={`w-full text-left rounded-2xl p-5 transition-all duration-200 ease-out-200 cursor-pointer hover:scale-102 hover-shadow-lg
        ${isSelected
          ? 'card-tint-selected shadow-md'
          : 'bg-white shadow-sm hover:card-tint-hover ring-1 ring-[var(--color-surface-200)]'
        }`}
    >
      <h3 className="text-base font-semibold text-gray-900 mb-1">{topic.name}</h3>
      <p className="text-xs text-gray-500 uppercase tracking-wider">{topic.category}</p>
    </button>
  );
}
