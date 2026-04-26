import { useState, useCallback } from 'react';
import { searchByName, searchByIngredient, filterByCategory } from '../services/mealdbApi';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(async (query, mode = 'name') => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      let results;
      if (mode === 'ingredient') {
        results = await searchByIngredient(query);
      } else {
        results = await searchByName(query);
      }
      setRecipes(results);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const browseCategory = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const results = await filterByCategory(category);
      setRecipes(results);
    } catch (err) {
      setError('Failed to load category. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setRecipes([]);
    setHasSearched(false);
    setError(null);
  }, []);

  return { recipes, loading, error, hasSearched, search, browseCategory, clearResults };
};
