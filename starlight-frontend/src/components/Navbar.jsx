import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onLoginClick }) {
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Destinations' },
    { to: '/offers', label: 'Offers' },
    { to: '/architecture', label: 'Architecture' },
    { to: '/review2', label: 'Review-2 Demo', badge: '10/10' },
    { to: '/about-project', label: 'About Project' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-dark shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg group-hover:shadow-gold transition-shadow duration-300">
              <span className="text-navy-950 font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>S</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                Starlight
              </h1>
              <p className="text-[10px] text-gold-300 tracking-[0.25em] uppercase -mt-1">Stays & Resorts</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-all duration-300 relative ${
                  isActive(link.to)
                    ? 'text-gold-400'
                    : 'text-white/80 hover:text-gold-300'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {link.label}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-gradient-to-r from-gold-400 to-amber-500 text-navy-950 uppercase tracking-wider shadow-sm animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </span>
                {isActive(link.to) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-gold rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/15 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
                    <span className="text-navy-950 font-bold text-sm">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white text-sm font-medium">{user?.username}</span>
                  <svg className={`w-4 h-4 text-white/60 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 glass-dark rounded-xl shadow-modal overflow-hidden animate-slide-down">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm text-white font-medium">{user?.username}</p>
                      <p className="text-xs text-white/50">{user?.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-gold-400 hover:bg-white/5 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      My Bookings
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => onLoginClick('login')}
                  className="text-sm text-white/80 hover:text-gold-300 font-medium transition-colors duration-300 px-4 py-2"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onLoginClick('register')}
                  className="btn-gold text-sm !py-2.5 !px-6"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass-dark rounded-2xl p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.to)
                    ? 'text-gold-400 bg-white/10'
                    : 'text-white/80 hover:text-gold-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-3 mt-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-gold-300 hover:bg-white/5 transition-all"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-white/5 transition-all"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => { setMobileOpen(false); onLoginClick('login'); }}
                    className="flex-1 text-sm text-white/80 py-3 rounded-xl hover:bg-white/5 transition-all"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); onLoginClick('register'); }}
                    className="flex-1 btn-gold text-sm !py-3"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
