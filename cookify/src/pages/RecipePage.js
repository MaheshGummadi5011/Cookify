import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { fetchRecipeById } from '../api/theMealDb';
import Spinner from '../components/common/Spinner';
import Header from '../components/layout/Header';
import { useFavorites } from '../hooks/useFavorites';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isRecipeFavorite = recipe ? isFavorite(recipe.idMeal) : false;

  useEffect(() => {
    const getRecipeDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const details = await fetchRecipeById(id);
        setRecipe(details);
      } catch (err)
 {
        setError('Could not load recipe details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    getRecipeDetails();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!recipe) return;
    if (isRecipeFavorite) {
      removeFavorite(recipe.idMeal);
      toast.error('Removed from favorites!');
    } else {
      addFavorite(recipe);
      toast.success('Saved to favorites!');
    }
  };

  const ingredients = [];
  if (recipe) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
          &larr; Back to Search
        </Link>
        
        {/* Main content wrapper */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
          
          {/* Section 1: Title and Favorite Button */}
          <div className="flex justify-between items-start mb-6 text-center">
            <h1 className="text-4xl font-bold w-full">{recipe.strMeal}</h1>
            <button onClick={handleFavoriteClick} className="p-2 rounded-full hover:bg-gray-200 transition-colors flex-shrink-0">
              <span className={`text-3xl ${isRecipeFavorite ? 'text-red-500' : 'text-gray-400'}`}>
                ❤️
              </span>
            </button>
          </div>

          {/* Section 2: Centered and Resized Image */}
          <div className="flex justify-center mb-8">
            <img 
              src={recipe.strMealThumb} 
              alt={recipe.strMeal}
              // UPDATE THIS LINE with max-h-96 and object-cover
              className="w-full max-w-2xl max-h-96 object-cover rounded-lg shadow-md" 
            />
          </div>

          {/* Section 3: Two-Column Grid for Ingredients & Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Column 3a: Ingredients */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 border-b pb-2">Ingredients</h2>
              <ul className="list-disc list-inside space-y-2 mt-4 text-gray-700">
                {ingredients.map((ing, index) => <li key={index}>{ing}</li>)}
              </ul>
            </div>

            {/* Column 3b: Instructions */}
            <div>
              <h2 className="text-2xl font-semibold mb-3 border-b pb-2">Instructions</h2>
              <p className="whitespace-pre-wrap leading-relaxed mt-4 text-gray-700">
                {recipe.strInstructions}
              </p>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipePage;