"use client";

import { useState, useEffect } from "react";
import { Utensils, Plus, X, Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AceternityCard } from "@/components/ui/aceternity-card";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addIngredient = () => {
    if (inputValue.trim() !== "" && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addIngredient();
    }
  };

  const handleProceed = () => {
    // TODO: Implement API call with ingredients
    console.log("Proceeding with ingredients:", ingredients);
    router.push("./recipes/page.tsx");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <header className="border-b bg-white dark:bg-gray-950 shadow-sm transition-colors duration-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-pink-500" />
          </div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
              RECIFY
            </h1>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
              What&apos;s in your kitchen?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
              Enter your ingredients and we&apos;ll suggest delicious recipes
              you can make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <AceternityCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white transition-colors duration-200">
                Enter Ingredients
              </h3>
              <div className="space-y-4">
                <Select onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="meats">Meats</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter an ingredient"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <AceternityButton
                    onClick={addIngredient}
                    className="px-4 py-2"
                  >
                    <Plus className="w-5 h-5" />
                  </AceternityButton>
                </div>
              </div>
            </AceternityCard>

            <AceternityCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white transition-colors duration-200">
                Added Ingredients
              </h3>
              <div className="min-h-[100px] mb-4">
                {ingredients.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
                    No ingredients added yet.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 text-sm transition-colors duration-200"
                      >
                        {ingredient}
                        <button
                          onClick={() => removeIngredient(ingredient)}
                          className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <AceternityButton
                className="w-full py-2"
                onClick={handleProceed}
                disabled={ingredients.length === 0}
              >
                Proceed to Recipes
              </AceternityButton>
            </AceternityCard>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white dark:bg-gray-950 py-6 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
          <p>© 2024 Recify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
