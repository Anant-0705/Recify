"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useParams } from 'next/navigation';
import { AceternityCard } from "@/components/ui/aceternity-card";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { mockRecipes } from "@/data/mokeRecipes";

interface RecipeDetails {
  _id: string;
  title: string;
  image_url: string;
  ingredients: string[];
  instructions: string[];
  utensils: string[];
  cuisine: string;
  course: string;
  diet: string;
  prep_time: string;
  cook_time: string;
  total_time: string;
  nutrition: {
    calories: number;
    total_fat: number;
    saturated_fat: number;
    sugars: number;
    fiber: number;
    protein: number;
    sodium: number;
    vitamins?: {
      vitamin_a?: number;
      vitamin_c?: number;
      calcium?: number;
      iron?: number;
    };
  };
}

const NutrientBar: React.FC<{
  label: string;
  value: number;
  unit: string;
  thresholds: { green: number; yellow: number };
  reverseColors?: boolean;
}> = ({ label, value, unit, thresholds, reverseColors = false }) => {
  const getColor = () => {
    if (reverseColors) {
      if (value >= thresholds.green) return 'bg-green-500';
      if (value >= thresholds.yellow) return 'bg-yellow-500';
      return 'bg-red-500';
    } else {
      if (value <= thresholds.green) return 'bg-green-500';
      if (value <= thresholds.yellow) return 'bg-yellow-500';
      return 'bg-red-500';
    }
  };

  return (
    <div>
      <div className="flex justify-between text-slate-400 mb-1">
        <span>{label}</span>
        <span>{value}{unit}</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getColor()}`}
          style={{ width: `${Math.min((value / (thresholds.yellow * 2)) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
};

const RecipeDetailsPage = () => {
  const params = useParams();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const foundRecipe = mockRecipes.find(r => r._id === params.id);
        
        if (!foundRecipe) {
          throw new Error('Recipe not found');
        }

        setRecipe(foundRecipe as RecipeDetails);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        {loading ? (
          <div className="flex justify-center items-center mt-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-sm"
          >
            <p className="text-red-600 text-center">{error}</p>
          </motion.div>
        ) : recipe && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
                
                <div className="flex flex-wrap gap-4 mb-8 text-gray-600">
                  <span>🕒 Prep: {recipe.prep_time}</span>
                  <span>⏲️ Cook: {recipe.cook_time}</span>
                  <span>⌛ Total: {recipe.total_time}</span>
                  <span>🌍 {recipe.cuisine}</span>
                  <span>🍽️ {recipe.course}</span>
                  {recipe.diet && <span>🥗 {recipe.diet}</span>}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-8">
                    {/* Ingredients Section */}
                    <div className="bg-gray-50 p-6 rounded-2xl">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h2>
                      <ul className="space-y-2 text-gray-600">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="text-green-500">•</span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Utensils Section */}
                    {recipe.utensils && recipe.utensils.length > 0 && (
                      <div className="bg-gray-50 p-6 rounded-2xl">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Required Utensils</h2>
                        <ul className="space-y-2 text-gray-600">
                          {recipe.utensils.map((utensil, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="text-blue-500">🔧</span>
                              {utensil}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Steps Section */}
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Step by Step Instructions</h2>
                    <ol className="space-y-6">
                      {recipe.instructions.map((instruction, index) => (
                        <li key={index} className="relative pl-12 pb-6 border-l-2 border-gray-200 last:border-l-0">
                          <span className="absolute left-[-18px] flex items-center justify-center w-9 h-9 bg-white rounded-full border-2 border-gray-200">
                            <span className="text-gray-600 font-semibold">{index + 1}</span>
                          </span>
                          <div className="bg-white p-4 rounded-xl shadow-sm">
                            <p className="text-gray-600">{instruction}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Nutrition Section */}
                <div className="mt-8 border-t border-gray-100 pt-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Nutrition Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Keep existing NutrientBar components but update colors */}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RecipeDetailsPage;