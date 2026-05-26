import { useNavigate } from 'react-router-dom';

interface SessionHeaderProps {
  topicName: string;
  currentIndex: number;
  total: number;
}

export function SessionHeader({
  topicName,
  currentIndex,
  total,
}: SessionHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center gap-3 px-4 py-3 border-b border-gray-100/50 bg-white/80 backdrop-blur-xl text-sm sticky top-0 z-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
      >
        <span aria-hidden="true">&larr;</span>
        <span>Back</span>
      </button>
      <span className="text-gray-300" aria-hidden="true">
        &middot;
      </span>
      <span className="font-medium text-gray-700">{topicName}</span>
      <span className="text-gray-300" aria-hidden="true">
        &middot;
      </span>
      <span className="text-gray-500">
        Q {currentIndex + 1} / {total}
      </span>
    </div>
  );
}
