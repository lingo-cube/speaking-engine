import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  getAnswerByQuestionId,
  mockQuestions,
  mockTopics,
} from '../mock/data';
import { useSessionStore } from '../store/session';
import { SessionHeader } from '../components/SessionHeader';
import { FullAnswerView } from '../components/FullAnswerView';
import { ShadowingView } from '../components/ShadowingView';

export function SessionPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();

  const numericId = Number(questionId);
  const question = mockQuestions.find((q) => q.id === numericId);
  const topic = question
    ? mockTopics.find((t) => t.code === question.topic_code)
    : undefined;
  const answerWithChunks = getAnswerByQuestionId(numericId);

  const {
    mode,
    currentChunkIndex,
    completedChunks,
    transitionTo,
    advanceChunk,
    markChunkComplete,
    resetSession,
  } = useSessionStore();

  // Reset state on mount/unmount or question change
  useEffect(() => {
    return () => {
      resetSession();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericId]);

  // Handle missing data
  if (!question || !answerWithChunks || !topic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-500 text-lg">Session not found</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-primary hover:text-primary-hover text-sm font-medium cursor-pointer"
          >
            &larr; Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const chunks = answerWithChunks.chunks;

  // Find total questions for this topic (for SessionHeader count)
  const topicQuestions = mockQuestions.filter(
    (q) => q.topic_code === topic.code,
  );
  const questionIndex = topicQuestions.findIndex((q) => q.id === numericId);

  return (
    <div className="min-h-screen bg-white">
      <SessionHeader
        topicName={topic.name}
        currentIndex={questionIndex >= 0 ? questionIndex : 0}
        total={topicQuestions.length}
      />

      <AnimatePresence mode="wait">
        {mode === 'full-answer' ? (
          <motion.div
            key="full-answer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FullAnswerView
              question={question}
              chunks={chunks}
              onStartShadowing={() => transitionTo('shadowing')}
            />
          </motion.div>
        ) : (
          <motion.div
            key="shadowing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ShadowingView
              chunks={chunks}
              currentIndex={currentChunkIndex}
              completedChunks={completedChunks}
              onComplete={markChunkComplete}
              onAdvance={advanceChunk}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
