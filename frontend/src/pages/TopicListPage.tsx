import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopicsByCategory } from '../mock/data';
import { TopicCard } from '../components/TopicCard';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'ielts', label: 'IELTS' },
];

export function TopicListPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const topics = getTopicsByCategory(activeCategory);

  return (
    <div className="min-h-screen bg-grid-pattern">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <header className="mb-8" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-item)' }}>
          <div className="bg-gradient-to-b from-[var(--color-primary-light)] to-transparent pb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Speaking Practice
            </h1>
            <p className="text-gray-500 text-base">
              Choose a topic to start
            </p>
          </div>
        </header>

        <div className="flex gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                ${activeCategory === cat.key
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          {topics.map((topic, index) => (
            <>
              <TopicCard
                key={topic.id}
                topic={topic}
                onClick={() => navigate(`/practice/${topic.code}`)}
              />
              {index > 0 && (index + 1) % 6 === 0 && (
                <div key={`break-${index}`} className="w-full h-px bg-[var(--color-surface-200)] my-6" />
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
