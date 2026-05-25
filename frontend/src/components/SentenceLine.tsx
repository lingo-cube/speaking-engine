import { useRef, useEffect } from 'react';

interface SentenceLineProps {
  text: string;
  isActive: boolean;
  isHighlighted: boolean;
  onClick: () => void;
}

export function SentenceLine({ text, isActive, isHighlighted, onClick }: SentenceLineProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isHighlighted && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isHighlighted]);

  return (
    <span
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }}}
      className={`cursor-pointer transition-all duration-300
        ${isActive
          ? 'bg-indigo-100 text-indigo-900 rounded px-0.5 -mx-0.5'
          : isHighlighted
            ? 'bg-amber-50 text-amber-900 rounded px-0.5 -mx-0.5 shadow-[0_0_0_2px_rgba(251,191,36,0.2)]'
            : 'hover:text-indigo-600'
        }`}
    >
      {text}
    </span>
  );
}
