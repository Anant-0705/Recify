import { Suspense } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Navbar from './components/Navbar'
import RecipeCard from './components/RecipeCard'
import Sidebar from './components/SideBar'


async function getRecipes(items: string[]) {
  // This is a mock API call. Replace with your actual API call.
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API delay
  return [
    { id: 1, title: 'Pasta Carbonara', description: 'Creamy pasta dish with bacon and eggs' },
    { id: 2, title: 'Chicken Stir Fry', description: 'Quick and easy chicken stir fry with vegetables' },
    { id: 3, title: 'Vegetable Soup', description: 'Hearty soup with mixed vegetables' },
  ]
}

export default async function RecipesPage() {
  // In a real app, you'd get these items from a database or state management
  const addedItems = ['Pasta', 'Eggs', 'Bacon']
  const recipes = await getRecipes(addedItems)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Ingredients
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Possible Recipes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Suspense fallback={<div>Loading recipes...</div>}>
                {recipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </Suspense>
            </div>
          </div>
          <Sidebar items={addedItems} />
        </div>
      </main>
    </div>
  )
}