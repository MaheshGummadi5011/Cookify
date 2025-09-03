// src/api/theMealDb.js

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchRecipesByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Failed to fetch recipes by ingredient:", error);
    throw error;
  }
};

export const fetchRecipeById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Failed to fetch recipe details:", error);
    throw error;
  }
};

export const fetchAllCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/list.php?c=list`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

export const fetchRecipesByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Failed to fetch recipes by category:", error);
    throw error;
  }
};

export const fetchRandomRecipe = async () => {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Failed to fetch random recipe:", error);
    throw error;
  }
};