import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import DocumentGeneratorPage from './pages/DocumentGeneratorPage';
import AIAssistantPage from './pages/AIAssistantPage';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate-document" element={<DocumentGeneratorPage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
