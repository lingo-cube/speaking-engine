import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionsByTopicCode, getAnswerByQuestionId, getTopicByCode } from '../mock/data';
import type { ApiQuestion } from '../types';
import { QuestionCard } from '../components/QuestionCard';
import { ArticleView } from '../components/ArticleView';

export function PracticePage() {
  const { topicCode } = useParams<{ topicCode: string }>();
  const navigate = useNavigate();
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const topic = topicCode ? getTopicByCode(topicCode) : undefined;
  const questions = topicCode ? getQuestionsByTopicCode(topicCode) : [];
  const selectedQuestion = selectedQuestionId
    ? questions.find((q) => q.id === selectedQuestionId) ?? null
    : null;
  const answer = selectedQuestionId ? getAnswerByQuestionId(selectedQuestionId) : undefined;

  // Reset question selection when topic changes — derive via key on route instead
  useEffect(() => {
    setSelectedQuestionId(null);
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, [topicCode]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <header className="mb-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200 mb-4 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
            Back to topics
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {topic?.name ?? topicCode ?? 'Practice'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {questions.length} {questions.length === 1 ? 'question' : 'questions'} available
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-72 flex-shrink-0">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Questions
            </h2>
            <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {questions.map((question: ApiQuestion) => (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => setSelectedQuestionId(question.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 flex-shrink-0 lg:w-full cursor-pointer
                    ${selectedQuestionId === question.id
                      ? 'bg-indigo-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                    }`}
                >
                  <span className="block font-medium truncate">{question.question}</span>
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            {selectedQuestion ? (
              <div className="space-y-6">
                <QuestionCard question={selectedQuestion} />
                <ArticleView chunks={answer?.chunks ?? []} />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </div>
                <p className="text-gray-500">Select a question from the sidebar to begin your shadowing practice.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
