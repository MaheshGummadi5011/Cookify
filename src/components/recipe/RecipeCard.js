import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.idMeal}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer">
        
        {/* This is the part that was likely missing */}
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h3 className="font-semibold text-lg text-center text-gray-800">
            {recipe.strMeal}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;