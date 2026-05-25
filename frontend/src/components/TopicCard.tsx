import type { Topic } from '../types';

interface TopicCardProps {
  topic: Topic;
  onClick: () => void;
  isSelected?: boolean;
}

export function TopicCard({ topic, onClick, isSelected }: TopicCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-2xl p-5 transition-all duration-200 cursor-pointer
        ${isSelected
          ? 'bg-white ring-2 ring-indigo-500 shadow-md'
          : 'bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5'
        }`}
    >
      <h3 className="text-base font-semibold text-gray-900 mb-1">{topic.name}</h3>
      <p className="text-xs text-gray-500 uppercase tracking-wider">{topic.category}</p>
    </button>
  );
}
