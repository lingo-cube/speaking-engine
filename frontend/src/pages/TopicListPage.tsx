/**
 * Modern Topic List Page - Beautiful topic selection
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopicsByCategory } from '../mock/data';
import type { ApiTopic } from '../types';

const CATEGORIES = [
  { key: 'all', label: 'All Topics', icon: '🌐' },
  { key: 'ielts', label: 'IELTS', icon: '📚' },
];

export function TopicListPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredTopic, setHoveredTopic] = useState<number | null>(null);

  const topics = getTopicsByCategory(activeCategory);

  // Get question count for each topic
  const getQuestionCount = (topicCode: string) => {
    // This is a simplified count - in real app, fetch from data
    const counts: Record<string, number> = {
      hometown: 3,
      school: 3,
      work: 3,
      technology: 3,
      friends: 3,
    };
    return counts[topicCode] || 3;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Modern Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-2xl shadow-xl shadow-sky-500/30 mb-6">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Speaking Practice
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Master your English speaking skills with interactive shadowing practice
          </p>
        </header>

        {/* Category Pills */}
        <div className="flex justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`group px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300
                ${activeCategory === cat.key
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/25 scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:shadow-lg shadow-sm ring-1 ring-gray-900/5'
                }`}
            >
              <span className="flex items-center gap-2">
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {topics.map((topic, index) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => navigate(`/practice/${topic.code}`)}
              onMouseEnter={() => setHoveredTopic(index)}
              onMouseLeave={() => setHoveredTopic(null)}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 text-left transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 hover:scale-105 hover:-translate-y-1 shadow-lg ring-1 ring-gray-900/5"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="relative flex items-center justify-center w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 group-hover:from-sky-500 group-hover:to-indigo-500 transition-all duration-300">
                <svg
                  className="w-7 h-7 text-sky-600 group-hover:text-white transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              </div>

              {/* Topic name */}
              <h3 className="relative text-base font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300 mb-1">
                {topic.name}
              </h3>

              {/* Category */}
              <p className="relative text-xs text-gray-400 group-hover:text-gray-500 transition-colors duration-300 mb-3">
                {topic.category}
              </p>

              {/* Question count badge */}
              <div className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 group-hover:bg-sky-100 transition-colors duration-300">
                <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span className="text-xs font-semibold text-gray-600 group-hover:text-sky-700">
                  {getQuestionCount(topic.code)} questions
                </span>
              </div>

              {/* Arrow indicator on hover */}
              <div className={`absolute -right-2 -top-2 w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-full shadow-lg flex items-center justify-center transition-all duration-300
                ${hoveredTopic === index ? 'scale-100 opacity-100 translate-x-0 -translate-y-0' : 'scale-0 opacity-0 translate-x-2 translate-y-2'}`}
              >
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Empty state */}
        {topics.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No topics found</h3>
            <p className="text-gray-500">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
