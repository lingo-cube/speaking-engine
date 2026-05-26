import { motion } from 'framer-motion';

interface ProgressTimelineProps {
  total: number;
  current: number;
  completed: Set<number>;
}

export function ProgressTimeline({
  total,
  current,
  completed,
}: ProgressTimelineProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => {
        const isCompleted = completed.has(i);
        const isCurrent = i === current;
        const isPending = !isCompleted && !isCurrent;

        if (isCompleted) {
          return (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 15,
              }}
              className="w-2.5 h-2.5 rounded-full bg-primary"
            />
          );
        }

        if (isCurrent) {
          return (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-3 h-3 rounded-full bg-primary ring-2 ring-primary/30"
            />
          );
        }

        // Pending dot
        if (isPending) {
          return (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full border-2 border-gray-300 bg-transparent"
            />
          );
        }

        return null;
      })}
    </div>
  );
}
