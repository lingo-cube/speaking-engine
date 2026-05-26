import { create } from 'zustand';

export type SessionMode = 'full-answer' | 'shadowing' | 'completed';

interface SessionState {
  mode: SessionMode;
  currentChunkIndex: number;
  completedChunks: Set<number>;
  questionId: number | null;

  setQuestion: (id: number) => void;
  transitionTo: (mode: SessionMode) => void;
  advanceChunk: () => void;
  markChunkComplete: (index: number) => void;
  isChunkComplete: (index: number) => boolean;
  resetSession: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  mode: 'full-answer',
  currentChunkIndex: 0,
  completedChunks: new Set<number>(),
  questionId: null,

  setQuestion: (id) => set({ questionId: id }),

  transitionTo: (mode) => set({ mode }),

  advanceChunk: () => {
    const { currentChunkIndex } = get();
    set({ currentChunkIndex: currentChunkIndex + 1 });
  },

  markChunkComplete: (index) => {
    const { completedChunks } = get();
    const updated = new Set(completedChunks);
    updated.add(index);
    set({ completedChunks: updated });
  },

  isChunkComplete: (index) => get().completedChunks.has(index),

  resetSession: () => set({
    mode: 'full-answer',
    currentChunkIndex: 0,
    completedChunks: new Set(),
    questionId: null,
  }),
}));
