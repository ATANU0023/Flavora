const BASE_URL = '/api/favorites';

const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const getAllFavorites = async (token) => {
  const res = await fetch(BASE_URL, { headers: authHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch favorites');
  return (await res.json()).data || [];
};

export const getFavoriteIds = async (token) => {
  const res = await fetch(`${BASE_URL}/ids`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch IDs');
  return (await res.json()).data || [];
};

export const addFavorite = async (meal, token) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({
      mealId: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strCategory: meal.strCategory || '',
      strArea: meal.strArea || '',
      strTags: meal.strTags || '',
    }),
  });
  if (!res.ok && res.status !== 409) throw new Error('Failed to add favorite');
  return res.json();
};

export const removeFavorite = async (mealId, token) => {
  const res = await fetch(`${BASE_URL}/${mealId}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to remove favorite');
  return res.json();
};
