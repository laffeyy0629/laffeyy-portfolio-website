import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageWipe from './components/PageWipe';
import MainPage from './pages/MainPage';
import OJTPage from './pages/OJTPage';

function RouterContent() {
  return (
    <>
      <PageWipe />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/ojt" element={<OJTPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
}
