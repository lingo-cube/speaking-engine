import type { Chunk } from '../types';
import { ChunkCard } from './ChunkCard';

interface ShadowingPanelProps {
  chunks: Chunk[];
}

export function ShadowingPanel({ chunks }: ShadowingPanelProps) {
  if (!chunks || chunks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No sample answer available for this question.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Shadowing Practice
        </h3>
        <span className="text-xs text-gray-400">{chunks.length} {chunks.length === 1 ? 'chunk' : 'chunks'}</span>
      </div>
      {chunks
        .sort((a, b) => a.order - b.order)
        .map((chunk) => (
          <ChunkCard key={chunk.id} chunk={chunk} />
        ))}
    </div>
  );
}
