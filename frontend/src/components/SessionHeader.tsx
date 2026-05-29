import { useNavigate } from 'react-router-dom';
import { Text, Label } from './primitives';

interface SessionHeaderProps {
  topicName: string;
  currentIndex: number;
  total: number;
}

export function SessionHeader({ topicName, currentIndex, total }: SessionHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center px-4 py-3 border-b border-[var(--color-tertiary-light)] bg-[var(--color-surface-50)]/70 backdrop-blur-md text-sm sticky top-0 z-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 px-3 py-1.5 -ml-2 rounded-full text-[var(--color-surface-500)] hover:text-[var(--color-surface-900)] hover:bg-[var(--color-tertiary-light)] transition-all cursor-pointer hover:scale-105"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>
        <Text variant="body" className="font-medium">Back</Text>
      </button>
      <div className="flex-1 flex items-center justify-center gap-2">
        <Text variant="body" className="font-semibold">{topicName}</Text>
        <span className="text-[var(--color-surface-200)]">&middot;</span>
        <Label variant="tertiary">Q {currentIndex + 1} / {total}</Label>
      </div>
      <div className="w-[72px]" />
    </div>
  );
}
