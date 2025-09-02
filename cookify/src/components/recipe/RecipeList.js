// src/components/recipe/RecipeList.js
import React from 'react';
import RecipeCard from './RecipeCard';
import { motion } from 'framer-motion'; // 1. Import motion

const RecipeList = ({ recipes }) => {
  // 2. Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // This will make cards appear one by one
      }
    }
  };

  return (
    // 3. Use motion.div and apply the variants
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
    >
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </motion.div>
  );
};

export default RecipeList;