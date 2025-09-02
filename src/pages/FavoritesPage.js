import React from 'react';
import Header from '../components/layout/Header';
import RecipeList from '../components/recipe/RecipeList';
import { useFavorites } from '../hooks/useFavorites';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">My Favorite Recipes</h1>
        {favorites.length > 0 ? (
          <RecipeList recipes={favorites} />
        ) : (
          <div className="text-center text-gray-500">
            <p>You haven't saved any favorite recipes yet.</p>
            <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">
              Find some recipes!
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;