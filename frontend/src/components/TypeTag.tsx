import { Chip } from './primitives';

interface TypeTagProps {
  type: string;
}

export function TypeTag({ type }: TypeTagProps) {
  return (
    <Chip size="sm" variant="outline" className="bg-[var(--color-accent-light)] text-[var(--color-accent)]">
      {type}
    </Chip>
  );
}
