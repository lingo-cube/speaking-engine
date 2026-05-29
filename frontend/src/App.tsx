import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { Dashboard } from './pages/Dashboard';
import { TopicDetailPage } from './pages/TopicDetailPage';
import { SessionPage } from './pages/SessionPage';

function App() {
  return (
    <ThemeProvider defaultTheme="default">
      <BrowserRouter basename="/speaking-engine">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/topic/:code" element={<TopicDetailPage />} />
            <Route path="/session/:questionId" element={<SessionPage />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
