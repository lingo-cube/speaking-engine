import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TopicListPage } from './pages/TopicListPage';
import { PracticePage } from './pages/PracticePage';

function App() {
  return (
    <BrowserRouter basename="/speaking-engine">
      <Routes>
        <Route path="/" element={<TopicListPage />} />
        <Route path="/practice/:topicCode" element={<PracticePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
