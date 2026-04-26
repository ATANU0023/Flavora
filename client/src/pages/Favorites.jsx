import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllFavorites, removeFavorite } from '../services/favoritesApi';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import EmptyState from '../components/EmptyState';
import Toast from '../components/Toast';

export default function Favorites() {
  const { user, token } = useAuth();
  const { refetchIds } = useFavorites();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    getAllFavorites(token)
      .then(setFavorites)
      .catch(() => setToast({ message: 'Failed to load favorites', type: 'error' }))
      .finally(() => setLoading(false));
  }, [user, token]);

  if (!user) {
    return (
      <div className="pt-[70px] min-h-screen flex items-center justify-center">
        <EmptyState
          icon="🔒"
          title="Sign in required"
          message="Please sign in to view and manage your personal favorites collection."
          action={{ to: '/auth', label: '🔑 Sign In' }}
        />
      </div>
    );
  }

  const handleRemove = async (fav) => {
    try {
      await removeFavorite(fav.mealId, token);
      setFavorites((prev) => prev.filter((f) => f.mealId !== fav.mealId));
      await refetchIds();
      setToast({ message: `Removed "${fav.strMeal}"`, type: 'success' });
    } catch {
      setToast({ message: 'Could not remove. Try again.', type: 'error' });
    }
  };

  return (
    <div className="pt-[70px] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12 pb-20">
        <div className="mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
            {user.name.split(' ')[0]}'s <span className="text-gradient">Favorites</span>
          </h1>
          <p className="text-gray-400">Your personally curated recipe collection.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" className="animate-spin">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
          </div>
        ) : favorites.length === 0 ? (
          <EmptyState
            icon="💔"
            title="No favorites yet"
            message="Start exploring recipes and save the ones you love!"
            action={{ to: '/', label: '🍽️ Explore Recipes' }}
          />
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">{favorites.length} saved recipe{favorites.length !== 1 ? 's' : ''}</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
              {favorites.map((fav) => (
                <div key={fav.mealId} className="group glass rounded-2xl overflow-hidden border border-white/10
                                                  hover:border-accent/40 hover:-translate-y-1.5 hover:shadow-card transition-all duration-300">
                  <Link to={`/recipe/${fav.mealId}`} className="block">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img src={fav.strMealThumb} alt={fav.strMeal}
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-card-gradient" />
                      {fav.strCategory && (
                        <span className="absolute top-3 left-3 bg-dark-900/70 backdrop-blur-sm border border-white/10
                                         text-accent-light text-xs font-semibold px-3 py-1 rounded-full">
                          {fav.strCategory}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-lg leading-snug line-clamp-2 text-gray-100 mb-2 group-hover:text-accent-light transition-colors">
                        {fav.strMeal}
                      </h3>
                      <div className="flex gap-3 text-xs text-gray-500">
                        {fav.strArea && <span>🌍 {fav.strArea}</span>}
                        {fav.strTags && <span>🏷️ {fav.strTags.split(',')[0]}</span>}
                      </div>
                    </div>
                  </Link>
                  <div className="px-4 pb-4">
                    <button onClick={() => handleRemove(fav)}
                            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl
                                       border border-pink/30 text-pink text-sm font-medium
                                       hover:bg-pink/15 transition-all duration-200">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/>
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
