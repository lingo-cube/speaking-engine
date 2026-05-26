import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionsByTopicCode, getAnswerByQuestionId, getTopicByCode } from '../mock/data';
import type { ApiQuestion } from '../types';
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

  const currentIndex = selectedQuestionId
    ? questions.findIndex((q) => q.id === selectedQuestionId)
    : -1;
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= questions.length - 1;
  const nextQuestion = !isLast && currentIndex >= 0 ? questions[currentIndex + 1] : null;
  const prevQuestion = !isFirst && currentIndex >= 0 ? questions[currentIndex - 1] : null;

  // Reset question selection when topic changes
  useEffect(() => {
    setSelectedQuestionId(null);
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, [topicCode]);

  // Auto-select first question when questions load
  useEffect(() => {
    if (selectedQuestionId === null && questions.length > 0) {
      setSelectedQuestionId(questions[0].id);
    }
  }, [selectedQuestionId, questions]);

  const handlePrev = useCallback(() => {
    if (prevQuestion) setSelectedQuestionId(prevQuestion.id);
  }, [prevQuestion]);

  const handleNext = useCallback(() => {
    if (nextQuestion) setSelectedQuestionId(nextQuestion.id);
  }, [nextQuestion]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Compact header with topic nav and question position */}
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6" />
              </svg>
              {topic?.name ?? topicCode ?? 'Practice'}
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </button>

            {currentIndex >= 0 && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={isFirst}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                  aria-label="Previous question"
                >
                  <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6" />
                  </svg>
                </button>
                <span className="text-sm font-medium text-gray-700 tabular-nums min-w-[3rem] text-center">
                  {currentIndex + 1} / {questions.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isLast}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                  aria-label="Next question"
                >
                  <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile question chips - compact horizontal scroll */}
          <div className="lg:hidden -mx-4 px-4">
            <nav className="flex flex-row gap-2 overflow-x-auto pb-2 scrollbar-none">
              {questions.map((question: ApiQuestion) => {
                const isSelected = selectedQuestionId === question.id;
                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => setSelectedQuestionId(question.id)}
                    className={`text-left px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex-shrink-0 cursor-pointer whitespace-nowrap active:scale-[0.97]
                      ${isSelected
                        ? 'bg-indigo-500 text-white shadow-sm'
                        : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm ring-1 ring-gray-900/5'
                      }`}
                  >
                    {question.question.length > 30
                      ? question.question.substring(0, 30) + '...'
                      : question.question}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <nav className="flex flex-col gap-2">
              {questions.map((question: ApiQuestion) => (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => setSelectedQuestionId(question.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 cursor-pointer active:scale-[0.98]
                    ${selectedQuestionId === question.id
                      ? 'bg-indigo-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm ring-1 ring-gray-900/5'
                    }`}
                >
                  <span className="block font-medium truncate">{question.question}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {selectedQuestion ? (
              <div className="space-y-6">
                <p className="text-xs text-gray-400">PracticePage: question #{selectedQuestion.id}, chunks: {answer?.chunks.length ?? 0}</p>
                <ArticleView
                  key={selectedQuestion.id}
                  question={selectedQuestion}
                  chunks={answer?.chunks ?? []}
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md ring-1 ring-gray-900/5 p-12 text-center">
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
