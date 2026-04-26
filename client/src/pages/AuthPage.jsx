import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';
    const body = mode === 'login'
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Something went wrong.'); return; }
      login(data.user, data.token);
      navigate(from, { replace: true });
    } catch {
      setError('Network error. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode((m) => (m === 'login' ? 'signup' : 'login'));
    setError('');
    setForm({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4 pt-[70px]">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-hero-glow pointer-events-none" />

      <div className="w-full max-w-md relative animate-fade-up">
        {/* Card */}
        <div className="glass rounded-3xl p-8 border border-white/10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 11h.01"/><path d="M11 15h.01"/><path d="M16 16h.01"/>
                <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16"/>
                <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4"/>
              </svg>
              <span className="font-display text-2xl font-bold text-gradient">Flavora</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-gray-100 mb-1">
              {mode === 'login' ? 'Welcome back!' : 'Create account'}
            </h1>
            <p className="text-gray-500 text-sm">
              {mode === 'login'
                ? 'Sign in to access your personal recipe collection.'
                : 'Join to start saving your favourite recipes.'}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex gap-1 p-1 bg-dark-800 rounded-2xl mb-6">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); setForm({ name:'', email:'', password:'' }); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 capitalize
                  ${mode === m ? 'bg-accent-gradient text-white shadow-glow' : 'text-gray-400 hover:text-gray-200'}`}
              >
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Swagata Das"
                  required
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-100
                             placeholder-gray-600 outline-none focus:border-accent focus:shadow-glow transition-all duration-200"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-100
                           placeholder-gray-600 outline-none focus:border-accent focus:shadow-glow transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
                required
                minLength={6}
                className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-100
                           placeholder-gray-600 outline-none focus:border-accent focus:shadow-glow transition-all duration-200"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-gradient text-white font-semibold py-3.5 rounded-xl
                         hover:shadow-glow hover:-translate-y-0.5 transition-all duration-200
                         disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
            >
              {loading ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
              ) : null}
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Switch */}
          <p className="text-center text-gray-500 text-sm mt-6">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={switchMode} className="text-accent-light hover:underline font-medium">
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
