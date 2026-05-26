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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Speaking Practice
          </h1>
          <p className="text-gray-500 text-base">
            Choose a topic to start
          </p>
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onClick={() => navigate(`/practice/${topic.code}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
