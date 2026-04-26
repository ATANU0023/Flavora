import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMealById, parseIngredients } from '../services/mealdbApi';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    getMealById(id).then((data) => { setMeal(data); setLoading(false); });
  }, [id]);

  const handleFav = useCallback(async () => {
    if (!meal) return;
    if (!user) { navigate('/auth', { state: { from: `/recipe/${meal.idMeal}` } }); return; }
    const wasFav = isFavorite(meal.idMeal);
    await toggleFavorite(meal);
    setToast({
      message: wasFav ? `Removed "${meal.strMeal}" from favorites` : `Saved "${meal.strMeal}" to favorites`,
      type: 'success',
    });
  }, [meal, isFavorite, toggleFavorite, user, navigate]);

  if (loading) {
    return (
      <div className="pt-[70px] min-h-screen flex items-center justify-center">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" className="animate-spin">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="pt-[70px] min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-5xl">🍽️</div>
        <h2 className="font-display text-2xl">Recipe not found</h2>
        <button onClick={() => navigate('/')} className="text-accent-light hover:underline text-sm">← Back to Home</button>
      </div>
    );
  }

  const ingredients = parseIngredients(meal);
  const fav = isFavorite(meal.idMeal);
  const youtubeId = meal.strYoutube?.split('v=')[1];

  return (
    <div className="pt-[70px] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10 pb-20">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 text-sm mb-8 hover:text-accent-light transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="m19 12H5"/><path d="m12 5-7 7 7 7"/>
          </svg>
          Back
        </button>

        {/* Hero Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-card aspect-[4/3]">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5 justify-center">
            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              {meal.strCategory && (
                <span className="bg-accent/15 border border-accent/30 text-accent-light text-xs font-semibold px-4 py-1.5 rounded-full">
                  {meal.strCategory}
                </span>
              )}
              {meal.strArea && (
                <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full">
                  🌍 {meal.strArea}
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl font-bold text-gray-100">{meal.strMeal}</h1>

            {/* Tags */}
            {meal.strTags && (
              <div className="flex gap-2 flex-wrap">
                {meal.strTags.split(',').filter(Boolean).map((tag) => (
                  <span key={tag} className="glass border-white/10 text-gray-400 text-xs px-3 py-1 rounded-full">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Source */}
            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-light text-sm hover:underline inline-flex items-center gap-1.5"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                View Original Recipe
              </a>
            )}

            {/* Fav button */}
            <button
              onClick={handleFav}
              className={`inline-flex items-center gap-3 px-7 py-3.5 rounded-full border font-semibold text-sm
                          transition-all duration-200 w-fit
                          ${fav
                            ? 'bg-pink/20 border-pink text-pink hover:shadow-glow-pink'
                            : 'border-pink/40 text-pink hover:bg-pink/15 hover:border-pink'}`}
            >
              {fav ? '❤️ Saved to Favorites' : '🤍 Save to Favorites'}
            </button>
          </div>
        </div>

        {/* Ingredients */}
        <h2 className="font-display text-2xl mb-5 pb-3 border-b border-white/10">Ingredients</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3 mb-12">
          {ingredients.map((ing) => (
            <div
              key={ing.name}
              className="flex items-center gap-3 glass border-white/10 rounded-xl p-3
                         hover:border-accent/30 transition-all duration-200"
            >
              <img
                src={ing.thumb}
                alt={ing.name}
                className="w-9 h-9 rounded-lg object-cover shrink-0"
                onError={(e) => { e.target.src = 'https://www.themealdb.com/images/ingredients/Lime-Small.png'; }}
              />
              <div>
                <p className="text-xs font-semibold text-gray-200">{ing.name}</p>
                {ing.measure && <p className="text-xs text-gray-500">{ing.measure}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <h2 className="font-display text-2xl mb-5 pb-3 border-b border-white/10">Instructions</h2>
        <div className="glass border-white/10 rounded-2xl p-7 mb-12 text-gray-300 leading-loose whitespace-pre-line text-sm">
          {meal.strInstructions}
        </div>

        {/* YouTube */}
        {youtubeId && (
          <>
            <h2 className="font-display text-2xl mb-5 pb-3 border-b border-white/10">Watch & Cook</h2>
            <div className="rounded-2xl overflow-hidden aspect-video mb-12 shadow-card">
              <iframe
                title={meal.strMeal}
                src={`https://www.youtube.com/embed/${youtubeId}`}
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
