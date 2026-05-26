import { motion } from 'framer-motion';
import type { ApiChunk, ApiQuestion } from '../types';
import { TypeTag } from './TypeTag';
import { FrameworkTag } from './FrameworkTag';
import { useSmartAudio } from '../hooks/useSmartAudio';

interface ChunkLineProps {
  chunk: ApiChunk;
}

function ChunkLine({ chunk }: ChunkLineProps) {
  const { play } = useSmartAudio(chunk.audio_url, chunk.text);
  return (
    <button
      type="button"
      onClick={play}
      className="text-left hover:text-primary transition-colors cursor-pointer focus:outline-none focus:underline"
      title="Click to play audio"
    >
      {chunk.text}
    </button>
  );
}

interface FullAnswerViewProps {
  question: ApiQuestion;
  chunks: ApiChunk[];
  onStartShadowing?: () => void;
}

export function FullAnswerView({
  question,
  chunks,
  onStartShadowing,
}: FullAnswerViewProps) {
  const fullText = chunks.map((c) => c.text).join(' ');
  const fullAudioUrl = chunks[0]?.audio_url ?? '';
  const { play: playFullAudio } = useSmartAudio(fullAudioUrl, fullText);

  // Group chunks into paragraphs
  const paragraphMap = new Map<number, ApiChunk[]>();
  for (const chunk of chunks) {
    const p = chunk.paragraph ?? 1;
    if (!paragraphMap.has(p)) paragraphMap.set(p, []);
    paragraphMap.get(p)!.push(chunk);
  }
  const sortedParagraphs = Array.from(paragraphMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([, value]) => value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-6 max-w-2xl mx-auto space-y-6"
    >
      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <TypeTag type={question.type} />
        <FrameworkTag framework={question.framework} />
      </div>

      {/* Question */}
      <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
        {question.question}
      </h2>

      <hr className="border-gray-100" />

      {/* Answer chunks rendered as paragraphs */}
      <div className="space-y-4">
        {sortedParagraphs.map((paraChunks, pi) => (
          <p
            key={pi}
            className="text-base text-gray-700 leading-relaxed space-y-1"
          >
            {paraChunks.map((chunk) => (
              <ChunkLine key={chunk.id} chunk={chunk} />
            ))}
          </p>
        ))}
      </div>

      {/* Audio and CTA */}
      <div className="space-y-4 pt-4">
        <button
          type="button"
          onClick={playFullAudio}
          className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors cursor-pointer"
        >
          <span aria-hidden="true">&#9654;</span> Play Full Answer
        </button>

        {onStartShadowing && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="w-full py-3 px-6 bg-primary text-white rounded-xl font-semibold text-base hover:bg-primary-hover transition-colors shadow-sm hover:shadow-md active:shadow-sm cursor-pointer"
            onClick={onStartShadowing}
          >
            Start Shadowing &rarr;
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
