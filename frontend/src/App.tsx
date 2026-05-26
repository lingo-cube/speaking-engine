import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Dashboard } from './pages/Dashboard';
import { TopicDetailPage } from './pages/TopicDetailPage';
import { SessionPage } from './pages/SessionPage';

function App() {
  return (
    <BrowserRouter basename="/speaking-engine">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/topic/:code" element={<TopicDetailPage />} />
          <Route path="/session/:questionId" element={<SessionPage />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
