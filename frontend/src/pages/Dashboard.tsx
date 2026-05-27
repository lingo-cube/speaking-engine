/**
 * Modern Dashboard - Beautiful landing page
 */

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

  const getQuestionCount = (topicCode: string) => {
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
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-12">
        {/* Modern Header */}
        <header className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-3xl shadow-xl shadow-sky-500/30 mb-6">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Speaking Engine
          </h1>
          <p className="text-gray-500 text-lg">Master English through shadowing practice</p>
        </header>

        {/* Topic Grid */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Choose a Topic</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {mockTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Practice</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {recentPractices.map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.08, duration: 0.3 }}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg ring-1 ring-gray-900/5 p-6 space-y-4 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-sky-400 to-indigo-500 text-white">
                    {practice.topicName}
                  </span>
                  <span className="text-xs text-gray-400">{practice.date}</span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                  {practice.question}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">Completion</span>
                    <span
                      className={`font-bold ${
                        practice.completionRate >= 80
                          ? 'text-green-600'
                          : practice.completionRate >= 50
                            ? 'text-sky-600'
                            : 'text-gray-500'
                      }`}
                    >
                      {practice.completionRate}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${practice.completionRate}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Progress Overview */}
        <section className="pb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Progress Overview</h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-3xl shadow-xl shadow-sky-500/30 p-10 text-white relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative text-center">
              <div className="text-6xl font-extrabold mb-3">
                {mockTopics.length * 3}
              </div>
              <p className="text-lg text-white/90">
                Total questions across {mockTopics.length} topics
              </p>
              <div className="mt-6 flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{mockTopics.length}</div>
                  <div className="text-sm text-white/70">Topics</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-sm text-white/70">Levels</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
