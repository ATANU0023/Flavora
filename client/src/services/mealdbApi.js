const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchByName = async (query) => {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.meals || [];
};

export const searchByIngredient = async (ingredient) => {
  const res = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
  const data = await res.json();
  return data.meals || [];
};

export const getMealById = async (id) => {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
};

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories.php`);
  const data = await res.json();
  return data.categories || [];
};

export const filterByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  const data = await res.json();
  return data.meals || [];
};

export const getRandomMeal = async () => {
  const res = await fetch(`${BASE_URL}/random.php`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
};

// Parse ingredients + measures from a meal object into a clean array
export const parseIngredients = (meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : '',
        thumb: `https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient.trim())}-Small.png`,
      });
    }
  }
  return ingredients;
};
