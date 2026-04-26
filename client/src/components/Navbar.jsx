import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { favoriteIds } = useFavorites();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // User avatar initials
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] glass border-t-0 border-x-0">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 11h.01"/><path d="M11 15h.01"/><path d="M16 16h.01"/>
            <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16"/>
            <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4"/>
          </svg>
          <span className="font-display text-2xl font-bold text-gradient">Flavora</span>
        </NavLink>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${isActive && location.pathname === '/'
                ? 'text-accent-light bg-accent/15'
                : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'}`
            }
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            Home
          </NavLink>

          {user && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${isActive ? 'text-accent-light bg-accent/15' : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'}`
              }
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Favorites
              {favoriteIds.size > 0 && (
                <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                  {favoriteIds.size}
                </span>
              )}
            </NavLink>
          )}

          {user ? (
            <div className="flex items-center gap-2 ml-2">
              {/* Avatar */}
              <div className="flex items-center gap-2.5 glass border-white/10 rounded-full pl-1 pr-4 py-1">
                <div className="w-8 h-8 rounded-full bg-accent-gradient flex items-center justify-center text-white text-xs font-bold">
                  {initials}
                </div>
                <span className="text-sm text-gray-200 font-medium hidden sm:block">{user.name.split(' ')[0]}</span>
              </div>
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
                           text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                title="Logout"
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/auth"
              className="flex items-center gap-1.5 bg-accent-gradient text-white px-5 py-2 rounded-full
                         text-sm font-semibold hover:shadow-glow hover:-translate-y-px transition-all duration-200"
            >
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
