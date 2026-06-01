import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CompanyPage from './pages/CompanyPage.jsx';

export default function App() {
  return (
    <div className="app-shell">
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
