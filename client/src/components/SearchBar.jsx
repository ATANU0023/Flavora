import { useState } from 'react';

export default function SearchBar({ onSearch, onSurprise, loading }) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('name');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim(), mode);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Toggle */}
      <div className="flex justify-center mb-4">
        <div className="flex gap-1 p-1 glass rounded-full">
          {['name', 'ingredient'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize
                ${mode === m
                  ? 'bg-accent text-white shadow-glow'
                  : 'text-gray-400 hover:text-gray-100'}`}
            >
              By {m}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3 glass rounded-2xl px-5 py-2.5 focus-within:border-accent focus-within:shadow-glow transition-all duration-200">
          <svg width="18" height="18" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={mode === 'name' ? 'Search recipes… e.g. Chicken Tikka' : 'Search by ingredient… e.g. tomato'}
            className="flex-1 bg-transparent outline-none text-gray-100 placeholder-gray-500 text-base"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-accent-gradient px-6 py-2.5 rounded-xl text-white text-sm font-semibold
                       hover:shadow-glow hover:-translate-y-px transition-all duration-200 disabled:opacity-60"
          >
            {loading ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
            ) : (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            )}
            Search
          </button>
        </div>
      </form>

      {/* Surprise */}
      <div className="text-center mt-4">
        <button
          onClick={onSurprise}
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10
                     text-gray-400 text-sm hover:border-accent hover:text-accent-light hover:bg-accent/8
                     transition-all duration-200 disabled:opacity-50"
        >
          🎲 Surprise Me!
        </button>
      </div>
    </div>
  );
}
