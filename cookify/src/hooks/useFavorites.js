import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'recipeFavorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Could not parse favorites from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Could not save favorites to localStorage", error);
    }
  }, [favorites]);

  const addFavorite = (recipe) => {
    setFavorites((prev) => [...prev, { idMeal: recipe.idMeal, strMeal: recipe.strMeal, strMealThumb: recipe.strMealThumb }]);
  };

  const removeFavorite = (recipeId) => {
    setFavorites((prev) => prev.filter((fav) => fav.idMeal !== recipeId));
  };

  const isFavorite = (recipeId) => {
    return favorites.some((fav) => fav.idMeal === recipeId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};