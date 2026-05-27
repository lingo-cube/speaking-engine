/**
 * Modern Practice Page - Beautiful UI with TTS
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionsByTopicCode, getAnswerByQuestionId, getTopicByCode } from '../mock/data';
import type { ApiQuestion } from '../types';
import { features } from '../config/features';

// V2 components
import { ArticleView as ArticleViewV2 } from '../components/v2';

export function PracticePage() {
  const { topicCode } = useParams<{ topicCode: string }>();
  const navigate = useNavigate();
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

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
  }, [topicCode]);

  // Auto-select first question when questions load
  useEffect(() => {
    if (selectedQuestionId === null && questions.length > 0) {
      setSelectedQuestionId(questions[0].id);
    }
  }, [selectedQuestionId, questions]);

  const handlePrev = useCallback(() => {
    if (prevQuestion) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedQuestionId(prevQuestion.id);
        setIsAnimating(false);
      }, 150);
    }
  }, [prevQuestion]);

  const handleNext = useCallback(() => {
    if (nextQuestion) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedQuestionId(nextQuestion.id);
        setIsAnimating(false);
      }, 150);
    }
  }, [nextQuestion]);

  const handleQuestionSelect = useCallback((id: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedQuestionId(id);
      setIsAnimating(false);
    }, 150);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Modern Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 text-sm text-gray-600 hover:text-sky-600 transition-all duration-200"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15,18 9,12 15,6" />
              </svg>
              <span className="font-medium">{topic?.name ?? topicCode ?? 'Practice'}</span>
            </button>

            {currentIndex >= 0 && (
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm ring-1 ring-gray-900/5">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={isFirst}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-sky-50 hover:text-sky-600"
                  aria-label="Previous question"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15,18 9,12 15,6" />
                  </svg>
                </button>
                <span className="text-sm font-semibold text-gray-700 tabular-nums min-w-[3rem] text-center">
                  {currentIndex + 1}<span className="text-gray-400">/{questions.length}</span>
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isLast}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-sky-50 hover:text-sky-600"
                  aria-label="Next question"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile question chips */}
          <div className="lg:hidden -mx-4 px-4">
            <nav className="flex flex-row gap-2 overflow-x-auto pb-2 scrollbar-none">
              {questions.map((question: ApiQuestion) => {
                const isSelected = selectedQuestionId === question.id;
                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => handleQuestionSelect(question.id)}
                    className={`text-left px-4 py-2.5 rounded-2xl text-xs font-medium transition-all duration-300 flex-shrink-0 whitespace-nowrap
                      ${isSelected
                        ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/25 scale-105'
                        : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white shadow-sm ring-1 ring-gray-900/5'
                      }`}
                  >
                    {question.question.length > 25
                      ? question.question.substring(0, 25) + '...'
                      : question.question}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Desktop sidebar - Modern style */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <nav className="flex flex-col gap-3 sticky top-8">
              {questions.map((question: ApiQuestion, index: number) => {
                const isSelected = selectedQuestionId === question.id;
                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => handleQuestionSelect(question.id)}
                    className={`group text-left px-5 py-4 rounded-2xl text-sm transition-all duration-300
                      ${isSelected
                        ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-xl shadow-sky-500/25 scale-[1.02] ring-0'
                        : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg hover:scale-[1.01] shadow-sm ring-1 ring-gray-900/5'
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all
                        ${isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-gradient-to-br from-sky-100 to-indigo-100 text-sky-700 group-hover:scale-110'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className={`font-medium line-clamp-2 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                        {question.question}
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main className={`flex-1 min-w-0 transition-all duration-300 ${isAnimating ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'}`}>
            {selectedQuestion ? (
              <ArticleViewV2
                key={selectedQuestion.id}
                question={selectedQuestion}
                chunks={answer?.chunks ?? []}
              />
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl ring-1 ring-gray-900/5 p-16 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-sky-500/30">
                  <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to practice?</h3>
                <p className="text-gray-500">Select a question from the sidebar to begin your shadowing practice.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
