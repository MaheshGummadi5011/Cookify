// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Import your new background image
import heroBg from '../assets/images/hero-background.jpg'; 

// Import all the necessary components and hooks
import Header from '../components/layout/Header';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';
import RecipeList from '../components/recipe/RecipeList';
import FilterPanel from '../components/common/FilterPanel';
import RecipeCardSkeleton from '../components/recipe/RecipeCardSkeleton';
import { useDebounce } from '../hooks/useDebounce';
import { 
  fetchRecipesByIngredient, 
  fetchRecipesByCategory, 
  fetchRandomRecipe 
} from '../api/theMealDb';

const HomePage = () => {
  // All the existing state and logic remain the same
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(fetchRecipesByIngredient, debouncedQuery);
    } else if (!isLoading) { // Prevent clearing results while a category search is loading
      setRecipes([]);
      setSearched(false);
    }
  }, [debouncedQuery]);

  const performSearch = async (searchFn, searchTerm) => {
    setIsLoading(true);
    setError(null);
    setSearched(true);
    try {
      const results = await searchFn(searchTerm);
      setRecipes(results);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCategorySelect = (category) => {
    if (!category) {
      setRecipes([]);
      setSearched(false);
      return;
    };
    setQuery('');
    performSearch(fetchRecipesByCategory, category);
  };

  const handleRandomSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const randomRecipe = await fetchRandomRecipe();
      if (randomRecipe) {
        navigate(`/recipe/${randomRecipe.idMeal}`);
      }
    } catch (err) {
      setError('Could not fetch a random recipe. Please try again.');
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      );
    }
    if (error) {
      return <p className="text-center text-red-500 mt-8">{error}</p>;
    }
    if (searched && recipes.length === 0) {
      return <p className="text-center text-gray-500 mt-8">No recipes found.</p>;
    }
    return <RecipeList recipes={recipes} />;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* 2. THE HERO SECTION */}
      <div 
        className="h-80 w-full bg-cover bg-center flex flex-col justify-center items-center text-white"
        // We use inline styles for the dynamic background image.
        // The linear-gradient creates a dark overlay so the white text is readable.
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroBg})` }}
      >
        <div className="max-w-2xl mx-auto text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            What's in your kitchen?
          </h1>
          <p className="text-lg text-gray-200 drop-shadow-md">
            Enter an ingredient, filter by category, or get a random suggestion.
          </p>
        </div>
      </div>

      {/* 3. THE SEARCH AND RESULTS SECTION */}
      {/* The main container now starts here, with a negative margin to pull the search card up */}
      <main className="container mx-auto p-4 md:p-8 -mt-24">
        {/* The search elements are wrapped in a white card with a shadow for a "floating" effect */}
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-12">
          <div className="flex gap-2">
            <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <FilterPanel onCategoryChange={handleCategorySelect} />
          <div className="mt-4 text-center">
            <Button onClick={handleRandomSearch}>Surprise Me!</Button>
          </div>
        </div>

        {/* The results will appear below the search card */}
        <div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default HomePage;