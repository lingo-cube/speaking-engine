interface FrameworkTagProps {
  framework: string;
}

export function FrameworkTag({ framework }: FrameworkTagProps) {
  return (
    <span className="inline-block bg-highlight-light text-highlight text-xs px-3 py-1 rounded-full font-medium">
      {framework}
    </span>
  );
}
