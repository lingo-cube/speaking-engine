import { motion } from 'framer-motion';

interface NextChunkButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export function NextChunkButton({ disabled, onClick }: NextChunkButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`w-full py-3 px-6 rounded-xl font-semibold text-base transition-all duration-200 cursor-pointer
        ${
          disabled
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md active:shadow-sm'
        }`}
    >
      {disabled ? 'Listen + Record first' : 'Next Chunk →'}
    </motion.button>
  );
}
