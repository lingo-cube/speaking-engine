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
      className={`cursor-pointer transition-all duration-200 active:scale-[0.97] px-0.5 -mx-0.5 rounded
        ${isActive
          ? 'text-primary'
          : isHighlighted
            ? ''
            : 'hover:text-primary'
        }`}
      style={isActive ? {
        background: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
        borderLeft: '3px solid var(--theme-primary)',
        paddingLeft: '0.5rem',
        marginLeft: '-0.5rem',
      } : isHighlighted ? {
        background: 'color-mix(in srgb, var(--theme-primary) 5%, transparent)',
      } : undefined}
    >
      {text}
    </span>
  );
}
