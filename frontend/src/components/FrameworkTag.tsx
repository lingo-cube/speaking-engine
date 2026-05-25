interface FrameworkTagProps {
  framework: string;
}

export function FrameworkTag({ framework }: FrameworkTagProps) {
  return (
    <span className="inline-block bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full font-medium">
      {framework}
    </span>
  );
}
