import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CompanyPage from './pages/CompanyPage.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <header className="topbar">
        <Link to="/" className="brand">
          דאשבורד ניתוח מניות
        </Link>
        <Link to="/">כל החברות</Link>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/company/:ticker" element={<CompanyPage />} />
        </Routes>
      </main>
    </div>
  );
}
