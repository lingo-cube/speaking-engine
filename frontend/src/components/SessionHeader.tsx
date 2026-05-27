import { useNavigate } from 'react-router-dom';

interface SessionHeaderProps {
  topicName: string;
  currentIndex: number;
  total: number;
}

export function SessionHeader({ topicName, currentIndex, total }: SessionHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center px-4 py-3 border-b border-orange-100/40 bg-white/70 backdrop-blur-md text-sm sticky top-0 z-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 px-3 py-1.5 -ml-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-orange-50 transition-all cursor-pointer hover:scale-105"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>
        <span className="font-medium">Back</span>
      </button>
      <div className="flex-1 flex items-center justify-center gap-2">
        <span className="font-semibold text-gray-700">{topicName}</span>
        <span className="text-orange-200">&middot;</span>
        <span className="font-bold text-orange-600">Q {currentIndex + 1} / {total}</span>
      </div>
      <div className="w-[72px]" />
    </div>
  );
}
