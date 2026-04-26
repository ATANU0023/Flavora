import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryPills from '../components/CategoryPills';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { useRecipes } from '../hooks/useRecipes';
import { getRandomMeal } from '../services/mealdbApi';

export default function Home() {
  const { recipes, loading, error, hasSearched, search, browseCategory, clearResults } = useRecipes();
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchLabel, setSearchLabel] = useState('');
  const navigate = useNavigate();

  const handleSearch = useCallback((query, mode) => {
    setActiveCategory(null);
    setSearchLabel(`"${query}"`);
    search(query, mode);
  }, [search]);

  const handleCategory = useCallback((cat) => {
    const next = activeCategory === cat ? null : cat;
    setActiveCategory(next);
    if (next) { setSearchLabel(next); browseCategory(next); }
    else clearResults();
  }, [activeCategory, browseCategory, clearResults]);

  const handleSurprise = async () => {
    const meal = await getRandomMeal();
    if (meal) navigate(`/recipe/${meal.idMeal}`);
  };

  return (
    <div className="pt-[70px] min-h-screen">
      {/* Hero */}
      <section className="relative pt-20 pb-14 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-hero-glow pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent-light
                          text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            ✨ Powered by TheMealDB
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            Find Your Perfect<br />
            <span className="text-gradient">Recipe</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">
            Search thousands of recipes by name or ingredient. Save your favourites to your personal collection.
          </p>
          <SearchBar onSearch={handleSearch} onSurprise={handleSurprise} loading={loading} />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <CategoryPills activeCategory={activeCategory} onSelect={handleCategory} />

        {loading ? (
          <Loader count={8} />
        ) : error ? (
          <EmptyState icon="⚠️" title="Oops!" message={error} />
        ) : hasSearched && recipes.length === 0 ? (
          <EmptyState icon="🔍" title="No recipes found" message="Try a different name or browse a category above." />
        ) : recipes.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl">Results for {searchLabel}</h2>
              <span className="text-sm text-gray-500">{recipes.length} recipe{recipes.length !== 1 ? 's' : ''} found</span>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
              {recipes.map((meal) => <RecipeCard key={meal.idMeal} meal={meal} />)}
            </div>
          </>
        ) : (
          <EmptyState
            icon="👨‍🍳"
            title="What are we cooking today?"
            message="Search for a dish above or pick a category to discover amazing recipes."
          />
        )}
      </div>
    </div>
  );
}
