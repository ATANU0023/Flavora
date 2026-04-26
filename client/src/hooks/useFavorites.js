import { useState, useEffect, useCallback } from 'react';
import { getFavoriteIds, addFavorite, removeFavorite } from '../services/favoritesApi';
import { useAuth } from '../context/AuthContext';

export const useFavorites = () => {
  const { token, user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const fetchIds = useCallback(async () => {
    if (!token) { setFavoriteIds(new Set()); return; }
    try {
      const ids = await getFavoriteIds(token);
      setFavoriteIds(new Set(ids));
    } catch (err) {
      console.error('Could not load favorite IDs:', err);
    }
  }, [token]);

  // Re-fetch whenever user changes (login/logout)
  useEffect(() => { fetchIds(); }, [fetchIds, user]);

  const isFavorite = useCallback(
    (mealId) => favoriteIds.has(String(mealId)),
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    async (meal) => {
      if (!token) return false; // signal: not logged in
      const id = String(meal.idMeal);
      setLoading(true);
      try {
        if (favoriteIds.has(id)) {
          await removeFavorite(id, token);
          setFavoriteIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
        } else {
          await addFavorite(meal, token);
          setFavoriteIds((prev) => new Set(prev).add(id));
        }
        return true;
      } catch (err) {
        console.error('Toggle error:', err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [favoriteIds, token]
  );

  return { favoriteIds, isFavorite, toggleFavorite, loading, refetchIds: fetchIds };
};
