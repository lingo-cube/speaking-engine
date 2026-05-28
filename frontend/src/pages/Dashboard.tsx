import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockTopics } from '../mock/data';
import { TopicCard } from '../components/TopicCard';

interface RecentPracticeData {
  topicName: string;
  question: string;
  completionRate: number;
  date: string;
}

const recentPractices: RecentPracticeData[] = [
  {
    topicName: 'Hometown',
    question: 'Please describe your hometown.',
    completionRate: 80,
    date: '2026-05-25',
  },
  {
    topicName: 'School',
    question: 'Describe the school you attended.',
    completionRate: 60,
    date: '2026-05-24',
  },
  {
    topicName: 'Technology',
    question: 'What is your favorite piece of technology?',
    completionRate: 100,
    date: '2026-05-23',
  },
];

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-grid-pattern">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-10">
        {/* Header */}
        <header className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Speaking Engine
          </h1>
          <p className="text-gray-500 text-base">Choose a topic to practice</p>
        </header>

        {/* Topic Grid */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.3 }}
              >
                <TopicCard
                  topic={topic}
                  onClick={() => navigate(`/topic/${topic.code}`)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent Practice Section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Practice
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentPractices.map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm p-5 space-y-3 border border-gray-50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {practice.topicName}
                  </span>
                  <span className="text-xs text-gray-400">{practice.date}</span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                  {practice.question}
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Completion</span>
                    <span
                      className={`font-semibold ${
                        practice.completionRate >= 80
                          ? 'text-green-600'
                          : practice.completionRate >= 50
                            ? 'text-highlight'
                            : 'text-gray-500'
                      }`}
                    >
                      {practice.completionRate}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${practice.completionRate}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Progress Overview Placeholder */}
        <section className="pb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Progress Overview
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-50 p-8 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-4xl mb-2 text-gray-300">
                {mockTopics.length * 3}
              </div>
              <p className="text-sm text-gray-400">
                Total questions available across {mockTopics.length} topics
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
