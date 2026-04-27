import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getFavoriteIds, addFavorite, removeFavorite } from '../services/favoritesApi';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const fetchIds = useCallback(async () => {
    if (!token) {
      setFavoriteIds(new Set());
      return;
    }
    try {
      const ids = await getFavoriteIds(token);
      setFavoriteIds(new Set(ids.map(id => String(id))));
    } catch (err) {
      console.error('Could not load favorite IDs:', err);
    }
  }, [token]);

  useEffect(() => {
    fetchIds();
  }, [fetchIds, user]);

  const isFavorite = useCallback(
    (mealId) => favoriteIds.has(String(mealId)),
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    async (meal) => {
      if (!token) return false;
      const id = String(meal.idMeal);
      setLoading(true);
      try {
        if (favoriteIds.has(id)) {
          await removeFavorite(id, token);
          setFavoriteIds((prev) => {
            const n = new Set(prev);
            n.delete(id);
            return n;
          });
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

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite, loading, refetchIds: fetchIds }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};
