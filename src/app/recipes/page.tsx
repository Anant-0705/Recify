"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { AceternityCard } from "@/components/ui/aceternity-card";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useRouter } from "next/navigation";
import { calculateHealthScore } from "@/components/ui/utils";
import { mockRecipes } from "@/data/mokeRecipes";
import { Logo } from "@/components/ui/logo";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

interface Recipe {
  _id: string;
  title: string;
  image_url: string;
  ingredients: string[];
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

const RecipesPage = () => {
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      const ingredients = searchParams.get("ingredients");
      if (!ingredients) {
        setError("No ingredients selected");
        setLoading(false);
        return;
      }

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const selectedIngredients = ingredients.toLowerCase().split(',');
        const filteredRecipes = mockRecipes.filter(recipe => 
          selectedIngredients.some(ingredient =>
            recipe.ingredients.some(ri => 
              ri.toLowerCase().includes(ingredient)
            )
          )
        );

        if (filteredRecipes.length === 0) {
          setError("No recipes found with these ingredients");
        } else {
          setRecipes(filteredRecipes);
        }
      } catch (err) {
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center mb-20 scale-125"
          >
            <Logo />
            <h1 className="text-3xl md:text-4xl text-gray-800 mt-8">
              Found Recipes
            </h1>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center mt-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800" />
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-sm"
            >
              <p className="text-red-600 text-center">{error}</p>
            </motion.div>
          ) : (
            <BentoGrid>
              {recipes.map((recipe) => {
                const healthScore = calculateHealthScore(recipe.nutrition);
                return (
                  <BentoGridItem
                    key={recipe._id}
                    onClick={() => router.push(`/recipes/${recipe._id}`)}
                    header={
                      <div className="w-full h-48 overflow-hidden rounded-xl">
                        <img
                          src={recipe.image_url || "/placeholder-image.jpg"}
                          alt={`Image of ${recipe.title}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    }
                    title={recipe.title}
                    description={
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{recipe.cuisine}</span>
                          <span>{recipe.total_time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Health Score</span>
                          <div className={`px-3 py-1 rounded-full text-sm ${
                            healthScore.rating === 'green' ? 'bg-green-100 text-green-600' :
                            healthScore.rating === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {healthScore.score}%
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {healthScore.details[0]}
                        </div>
                      </div>
                    }
                  />
                );
              })}
            </BentoGrid>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecipesPage;