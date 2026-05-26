interface DotNavigationProps {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

export function DotNavigation({ count, activeIndex, onDotClick }: DotNavigationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onDotClick(i)}
          className={`rounded-full transition-all duration-200 cursor-pointer
            ${i === activeIndex
              ? 'w-2.5 h-2.5 bg-primary'
              : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
            }`}
          aria-label={`Sentence ${i + 1}`}
        />
      ))}
    </div>
  );
}
