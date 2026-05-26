import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTopicByCode, getQuestionsByTopicCode } from '../mock/data';
import { TypeTag } from '../components/TypeTag';
import { FrameworkTag } from '../components/FrameworkTag';

export function TopicDetailPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const topic = code ? getTopicByCode(code) : undefined;
  const questions = code ? getQuestionsByTopicCode(code) : [];

  if (!topic) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-400">Topic not found</p>
          <button onClick={() => navigate('/')} className="text-sm font-medium text-primary hover:text-primary-hover cursor-pointer">&larr; Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[720px] mx-auto px-6 sm:px-8 py-8">
        {/* Header — minimal, matching SessionHeader */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>
            <span>Back</span>
          </button>
          <span className="text-gray-200">&middot;</span>
          <h1 className="text-lg font-semibold text-gray-900">{topic.name}</h1>
          <span className="text-sm text-gray-400">{questions.length} question{questions.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Question list — clean cards with proper CTA */}
        <div className="space-y-3">
          {questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.2 }}
              className="group bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
            >
              <p className="text-[18px] font-medium text-gray-900 leading-relaxed mb-3">{question.question}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TypeTag type={question.type} />
                  <FrameworkTag framework={question.framework} />
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/session/${question.id}`)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-all duration-200 active:scale-95 cursor-pointer shadow-sm hover:shadow-md opacity-0 group-hover:opacity-100 sm:opacity-100"
                >
                  Start
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9,18 15,12 9,6"/></svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {questions.length === 0 && (
          <div className="text-center py-12"><p className="text-gray-400">No questions available.</p></div>
        )}
      </div>
    </div>
  );
}
