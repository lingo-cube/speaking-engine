interface SentenceLineProps {
  text: string;
  isActive: boolean;
  isHighlighted: boolean;
  onClick: () => void;
}

export function SentenceLine({ text, isActive, isHighlighted, onClick }: SentenceLineProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full text-left px-3 py-2 -mx-3 rounded-lg transition-all duration-200 cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-1
        ${isActive
          ? 'bg-indigo-100 ring-1 ring-indigo-300'
          : isHighlighted
            ? 'bg-indigo-50'
            : 'hover:bg-gray-100'
        }`}
    >
      <span className="text-gray-800 leading-relaxed">{text}</span>
    </button>
  );
}
