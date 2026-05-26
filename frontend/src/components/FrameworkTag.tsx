interface FrameworkTagProps {
  framework: string;
}

export function FrameworkTag({ framework }: FrameworkTagProps) {
  return (
    <span className="inline-block bg-highlight-light text-highlight text-[11px] px-2.5 py-0.5 rounded-full font-medium leading-tight">
      {framework}
    </span>
  );
}
