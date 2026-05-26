import type { ApiChunk } from '../types';
import { AudioPlayer } from './AudioPlayer';
import { RecordButton } from './RecordButton';

interface TrainingDrawerProps {
  chunk: ApiChunk | null;
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
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-2xl shadow-xl
          transition-transform duration-200 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 20px)' }}
      >
        {chunk && (
          <div className="px-5 pt-5 pb-5">
            {/* Handle */}
            <div className="flex justify-center mb-4">
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-1.5 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"
                aria-label="Close training drawer"
              />
            </div>

            {/* Sentence text — full, readable */}
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed mb-5 px-1">
              {chunk.text}
            </p>

            {/* Controls — two clearly separated sections */}
            <div className="space-y-5">
              {/* Listen section */}
              <div className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Listen
                </p>
                <AudioPlayer audioUrl={chunk.audio_url} />
              </div>

              {/* Record section */}
              <div className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Shadow
                </p>
                <RecordButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
