import { Chip } from './primitives';

interface FrameworkTagProps {
  framework: string;
}

export function FrameworkTag({ framework }: FrameworkTagProps) {
  return (
    <Chip size="sm" variant="outline" className="bg-[var(--color-warning-light)] text-[var(--color-warning)]">
      {framework}
    </Chip>
  );
}
