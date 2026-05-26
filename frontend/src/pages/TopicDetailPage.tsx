import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  getTopicByCode,
  getQuestionsByTopicCode,
} from '../mock/data';
import { TypeTag } from '../components/TypeTag';
import { FrameworkTag } from '../components/FrameworkTag';

export function TopicDetailPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const topic = code ? getTopicByCode(code) : undefined;
  const questions = code ? getQuestionsByTopicCode(code) : [];

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-500 text-lg">Topic not found</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{topic.name}</h1>
            <p className="text-sm text-gray-500">
              {questions.length} question{questions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-3">
          {questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.25 }}
              className="bg-white rounded-2xl shadow-sm p-5 border border-gray-50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="space-y-3">
                <p className="text-base font-medium text-gray-900 leading-relaxed">
                  {question.question}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <TypeTag type={question.type} />
                  <FrameworkTag framework={question.framework} />
                </div>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => navigate(`/session/${question.id}`)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors cursor-pointer"
                  >
                    Start Session &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {questions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No questions available for this topic.</p>
          </div>
        )}
      </div>
    </div>
  );
}
