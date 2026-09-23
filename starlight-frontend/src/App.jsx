import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Dashboard from './pages/Dashboard';
import Offers from './pages/Offers';
import Architecture from './pages/Architecture';
import AboutProject from './pages/AboutProject';

function AppContent() {
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });

  const handleLoginClick = (mode = 'login') => {
    setAuthModal({ open: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal({ open: false, mode: 'login' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onLoginClick={handleLoginClick} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onLoginClick={handleLoginClick} />} />
          <Route path="/search" element={<SearchResults onLoginClick={handleLoginClick} />} />
          <Route path="/offers" element={<Offers onLoginClick={handleLoginClick} />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/about-project" element={<AboutProject />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      <Footer />

      <AuthModal
        isOpen={authModal.open}
        onClose={handleCloseAuth}
        initialMode={authModal.mode}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
