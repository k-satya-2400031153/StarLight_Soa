import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'login') {
        await login(formData.username, formData.password);
        onClose();
      } else {
        await register(formData);
        setSuccess('Registration successful! You can now sign in.');
        setMode('login');
        setFormData({ ...formData, password: '' });
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setSuccess('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass-dark rounded-3xl shadow-modal overflow-hidden">
          {/* Header Decoration */}
          <div className="h-2 bg-gradient-gold" />

          <div style={{ padding: '2rem 2.5rem 2rem 2.5rem' }}>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Logo */}
            <div className="text-center" style={{ marginBottom: '1.5rem' }}>
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-3 shadow-gold">
                <span className="text-navy-950 font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>S</span>
              </div>
              <h2
                className="text-xl font-semibold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {mode === 'login' ? 'Welcome Back' : 'Join Starlight'}
              </h2>
              <p className="text-white/50 text-sm mt-1">
                {mode === 'login'
                  ? 'Sign in to manage your reservations'
                  : 'Create your account for exclusive access'}
              </p>
            </div>

            {/* Messages */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-slide-down">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm animate-slide-down">
                {success}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2 font-medium">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-gold-400 focus:bg-white/8 transition-all duration-300"
                />
              </div>

              {/* Email (register only) */}
              {mode === 'register' && (
                <div className="animate-fade-in-up">
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-gold-400 focus:bg-white/8 transition-all duration-300"
                  />
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-gold-400 focus:bg-white/8 transition-all duration-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full !py-3 text-sm flex items-center justify-center gap-2 mt-1"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin-slow" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  mode === 'login' ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="text-center mt-6">
              <p className="text-white/40 text-sm">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  onClick={toggleMode}
                  className="text-gold-400 hover:text-gold-300 font-medium transition-colors"
                >
                  {mode === 'login' ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-4 p-3 rounded-xl bg-white/3 border border-white/5">
              <p className="text-white/30 text-xs text-center">
                Demo: <span className="text-gold-400/60">deepak</span> / <span className="text-gold-400/60">pass123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
