"use client";

import React, { useState } from 'react';
import { commonIngredients } from '@/app/ingredients/ingredients';

interface IngredientSearchProps {
  onSelect: (ingredient: string) => void;
}

export const IngredientSearch: React.FC<IngredientSearchProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredIngredients = searchTerm
    ? commonIngredients.flatMap(category => 
        category.items.filter(item => 
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : selectedCategory
    ? commonIngredients.find(cat => cat.category === selectedCategory)?.items || []
    : [];

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-yellow-50 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {commonIngredients.map(category => (
          <button
            key={category.category}
            onClick={() => {
              setSelectedCategory(
                selectedCategory === category.category ? null : category.category
              );
              setSearchTerm('');
            }}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedCategory === category.category
                ? 'bg-cyan-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {category.category}
          </button>
        ))}
      </div>

      {/* Results */}
      {(searchTerm || selectedCategory) && (
        <div className="mt-4 max-h-60 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filteredIngredients.map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => onSelect(ingredient)}
                className="text-left px-3 py-2 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};