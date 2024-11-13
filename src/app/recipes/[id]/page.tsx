import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Navbar from '../components/Navbar'

async function getRecipe(id: string) {
  // This is a mock API call. Replace with your actual API call.
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API delay
  return {
    id: id,
    title: 'Pasta Carbonara',
    ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan cheese', 'Black pepper'],
    steps: [
      'Cook spaghetti according to package instructions.',
      'In a large pan, cook bacon until crispy.',
      'In a bowl, whisk eggs and grated Parmesan cheese.',
      'Drain pasta and add to the pan with bacon. Remove from heat.',
      'Quickly stir in the egg mixture, coating the pasta evenly.',
      'Season with black pepper and serve immediately.'
    ]
  }
}

export default async function RecipeStepsPage({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/recipes" className="flex items-center text-blue-600 hover:text-blue-800">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Recipes
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-6">{recipe.title}</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside mb-6">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-4">Steps</h2>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  )
}