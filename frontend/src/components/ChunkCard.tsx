import type { Chunk } from '../types';
import { AudioPlayer } from './AudioPlayer';
import { RecordButton } from './RecordButton';

interface ChunkCardProps {
  chunk: Chunk;
}

export function ChunkCard({ chunk }: ChunkCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 transition-all duration-200 hover:shadow-md animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold flex items-center justify-center flex-shrink-0">
            {chunk.order}
          </span>
          <p className="text-sm text-gray-700 leading-relaxed sm:hidden">
            {chunk.text}
          </p>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed hidden sm:block flex-1">
          {chunk.text}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto sm:flex-shrink-0">
          <AudioPlayer audioUrl={chunk.audio_url} />
          <RecordButton />
        </div>
      </div>
    </div>
  );
}
