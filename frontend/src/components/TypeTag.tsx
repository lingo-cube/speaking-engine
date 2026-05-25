interface TypeTagProps {
  type: string;
}

export function TypeTag({ type }: TypeTagProps) {
  return (
    <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
      {type}
    </span>
  );
}
