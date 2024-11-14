'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Clock, Star, Heart, Share2, Printer, Utensils } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface RecipeDetails {
  id: number
  name: string
  region: string
  image: string
  rating: number
  cookingTime: string
  servings: string
  calories: string
  description: string
  ingredients: string[]
  instructions: string[]
  healthRating: number
}

export default function RecipeDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    const fetchRecipe = () => {
      setRecipe({
        id: parseInt(params.id),
        name: "Sushi Roll",
        region: "Japan",
        image: "/placeholder.svg?height=400&width=600",
        rating: 4.5,
        cookingTime: "45 minutes",
        servings: "4 servings",
        calories: "320 cal/serving",
        description: "Fresh fish and vegetables wrapped in seasoned rice and nori seaweed.",
        ingredients: [
          "2 cups sushi rice",
          "4 sheets nori seaweed",
          "1 cucumber, julienned",
          "1 avocado, sliced",
          "200g fresh salmon",
          "Soy sauce for serving"
        ],
        instructions: [
          "Cook sushi rice according to package instructions",
          "Place nori sheet on bamboo mat",
          "Spread rice evenly on nori",
          "Add fish and vegetables",
          "Roll tightly using bamboo mat",
          "Slice into 8 pieces"
        ],
        healthRating: 4
      })
      setLoading(false)
    }
    fetchRecipe()
  }, [params.id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!recipe) {
    return <div>Recipe not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/recipes" className="flex items-center text-gray-600 hover:text-gray-900">
                <ChevronLeft className="h-5 w-5" />
                <span>Back to Recipes</span>
              </Link>
              <Utensils className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
                RECIFY
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Recipe Header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="relative h-[400px]">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
                  <p className="text-gray-600 mb-4">{recipe.description}</p>
                </div>
                <div className="flex space-x-4">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Heart className="h-6 w-6 text-gray-500" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Share2 className="h-6 w-6 text-gray-500" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Printer className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Recipe Meta */}
              <div className="flex flex-wrap gap-6 mt-6 pb-6 border-b">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{recipe.cookingTime}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>{recipe.rating} Rating</span>
                </div>
                <div>{recipe.servings}</div>
                <div>{recipe.calories}</div>
              </div>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="font-bold mr-4">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p>© 2024 Recify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 