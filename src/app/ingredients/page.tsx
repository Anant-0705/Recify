"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { AceternityCard } from "@/components/ui/aceternity-card";
import { IngredientSearch } from "@/components/ingredient-search";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Logo } from "@/components/ui/logo";

const IngredientsPage: React.FC = () => {
  const router = useRouter();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleAddIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  const handleFindRecipes = () => {
    if (selectedIngredients.length > 0) {
      router.push(`/recipes?ingredients=${selectedIngredients.join(',')}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <main className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl  mx-auto mt-20 mb-40 bg-white rounded-3xl shadow-sm p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 scale-125"
          >
            <Logo size="large" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-4 text-center text-gray-600 md:text-xl max-w-2xl mx-auto"
          >
            Enter the loot you have, and we'll find the perfect recipes for you
          </motion.p>

          <div className="mt-12">
            <IngredientSearch onSelect={handleAddIngredient} />
            
            <div className="mt-8">
              {selectedIngredients.length > 0 ? (
                <>
                  <h3 className="text-xl text-gray-800 mb-4 flex items-center gap-2">
                  Here’s My Fridge Loot
                    <span className="text-sm text-gray-600">({selectedIngredients.length})</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedIngredients.map((ingredient) => (
                      <motion.div
                        key={ingredient}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors"
                      >
                        {ingredient}
                        <button
                          onClick={() => handleRemoveIngredient(ingredient)}
                          className="hover:text-red-500 transition-colors"
                          aria-label={`Remove ${ingredient}`}
                        >
                          ×
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-600 mt-4"
                >
                  Start by typing an ingredient above
                </motion.p>
              )}
            </div>

            <motion.div 
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AceternityButton
                onClick={() => setSelectedIngredients([])}
                variant="secondary"
                className="bg-gray-100 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors w-full sm:w-auto"
                disabled={selectedIngredients.length === 0}
              >
                Oops, Wrong Ingredients!
              </AceternityButton>
              
              <AceternityButton
                onClick={handleFindRecipes}
                className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition-colors w-full sm:w-auto"
                disabled={selectedIngredients.length === 0}
              >
                {selectedIngredients.length === 0 ? 'Add ingredients to continue' : 'Hit Me With Some Recipe Magic!'}
              </AceternityButton>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IngredientsPage;