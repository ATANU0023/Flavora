import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../context/AuthContext';
import Toast from './Toast';
import { useState } from 'react';

export default function RecipeCard({ meal }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const fav = isFavorite(meal.idMeal);

  const handleFav = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/auth', { state: { from: window.location.pathname } });
      return;
    }
    const ok = await toggleFavorite(meal);
    if (ok) {
      setToast({
        message: fav ? 'Removed from favorites' : 'Saved to favorites!',
        type: 'success',
      });
    }
  };

  return (
    <>
      <Link
        to={`/recipe/${meal.idMeal}`}
        className="group block glass rounded-2xl overflow-hidden border border-white/10
                   hover:border-accent/40 hover:-translate-y-1.5 hover:shadow-card
                   transition-all duration-300 animate-fade-up"
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy"
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-card-gradient" />
          {meal.strCategory && (
            <span className="absolute top-3 left-3 bg-dark-900/70 backdrop-blur-sm border border-white/10
                             text-accent-light text-xs font-semibold px-3 py-1 rounded-full">
              {meal.strCategory}
            </span>
          )}
          <button
            onClick={handleFav}
            title={!user ? 'Sign in to save favorites' : fav ? 'Remove from favorites' : 'Save to favorites'}
            className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center
                        text-base backdrop-blur-sm border transition-all duration-200
                        ${fav ? 'bg-pink/25 border-pink' : 'bg-dark-900/70 border-white/10 hover:bg-pink/20 hover:border-pink hover:scale-110'}`}
          >
            {fav ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg leading-snug mb-2 line-clamp-2 text-gray-100 group-hover:text-accent-light transition-colors">
            {meal.strMeal}
          </h3>
          <div className="flex gap-3 text-xs text-gray-500">
            {meal.strArea && <span>🌍 {meal.strArea}</span>}
            {meal.strTags && <span>🏷️ {meal.strTags.split(',')[0]}</span>}
          </div>
        </div>
      </Link>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
