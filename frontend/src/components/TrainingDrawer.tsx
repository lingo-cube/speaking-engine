import type { Chunk } from '../types';
import { AudioPlayer } from './AudioPlayer';
import { RecordButton } from './RecordButton';

interface TrainingDrawerProps {
  chunk: Chunk | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TrainingDrawer({ chunk, isOpen, onClose }: TrainingDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 z-30 transition-opacity duration-200 md:hidden
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-2xl shadow-lg
          transition-transform duration-200 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}
      >
        {chunk && (
          <div className="px-4 pt-4 pb-2">
            {/* Handle */}
            <div className="flex justify-center mb-3">
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-1 bg-gray-300 rounded-full cursor-pointer"
                aria-label="Close training drawer"
              />
            </div>

            {/* Sentence preview */}
            <p className="text-sm text-gray-600 mb-3 px-1 line-clamp-2">
              {chunk.text}
            </p>

            {/* Controls */}
            <div className="flex items-center gap-4 justify-center">
              <AudioPlayer audioUrl={chunk.audio_url} />
              <RecordButton />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
