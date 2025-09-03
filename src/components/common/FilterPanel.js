import React, { useState, useEffect } from 'react';
import { fetchAllCategories } from '../../api/theMealDb';

const FilterPanel = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await fetchAllCategories();
      setCategories(categoryList);
    };
    getCategories();
  }, []);

  return (
    <div className="mt-4 flex justify-center gap-4">
      <select 
        onChange={(e) => onCategoryChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg"
      >
        <option value="">Filter by Category</option>
        {categories.map((cat) => (
          <option key={cat.strCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterPanel;