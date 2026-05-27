/**
 * Modern Session Page - Beautiful shadowing practice flow
 */

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
  }, [numericId, resetSession]);

  // Handle missing data
  if (!question || !answerWithChunks || !topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-sky-500/30">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <p className="text-gray-900 text-lg font-semibold mb-2">Session not found</p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15,18 9,12 15,6" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const chunks = answerWithChunks.chunks;

  // Find total questions for this topic
  const topicQuestions = mockQuestions.filter(
    (q) => q.topic_code === topic.code,
  );
  const questionIndex = topicQuestions.findIndex((q) => q.id === numericId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <SessionHeader
        topicName={topic.name}
        currentIndex={questionIndex >= 0 ? questionIndex : 0}
        total={topicQuestions.length}
      />

      <AnimatePresence mode="wait">
        {mode === 'full-answer' ? (
          <motion.div
            key="full-answer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
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
