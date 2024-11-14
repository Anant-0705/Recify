'use client'

import { Search, Utensils, Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/app/recipes/components/scroll-areaa"

// Sample recipe data
const recipes = [
  {
    id: 1,
    name: "Sushi Roll",
    region: "Japan",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    description: "Fresh fish and vegetables wrapped in seasoned rice and nori seaweed.",
  },
  {
    id: 2,
    name: "Pizza Margherita",
    region: "Italy",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    description: "Classic pizza with tomato sauce, fresh mozzarella, basil, and olive oil.",
  },
  {
    id: 3,
    name: "Pad Thai",
    region: "Thailand",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
    description: "Stir-fried rice noodles with eggs, tofu, peanuts, and tangy sauce.",
  },
  {
    id: 4,
    name: "Tacos al Pastor",
    region: "Mexico",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    description: "Marinated pork tacos with pineapple, onions, and cilantro.",
  },
  {
    id: 5,
    name: "Butter Chicken",
    region: "India",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    description: "Tender chicken in a rich, creamy tomato-based curry sauce.",
  },
  {
    id: 6,
    name: "Paella",
    region: "Spain",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.4,
    description: "Saffron-flavored rice dish with various meats, seafood, and vegetables.",
  },
]

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRecipes, setSelectedRecipes] = useState<typeof recipes>([])
  const router = useRouter()

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.region.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRecipeClick = (recipeId: number) => {
    router.push(`/recipe/${recipeId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Utensils className="h-6 w-6" />
          <h1 className="text-xl font-bold">Recipe Finder</h1>
        </div>
      </header>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <Input
            className="max-w-xl"
            placeholder="Search recipes by name or region..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
                onClick={() => handleRecipeClick(recipe.id)}
              >
                <CardContent className="p-0">
                  <Image
                    alt={recipe.name}
                    className="aspect-[4/3] object-cover transition-all duration-300 group-hover:blur-sm"
                    height={200}
                    src={recipe.image}
                    width={300}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="text-lg font-semibold text-white">{recipe.name}</h3>
                    <p className="text-sm text-gray-200">{recipe.region}</p>
                    <p className="mt-2 text-sm text-white">{recipe.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{recipe.rating.toFixed(1)}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Selected Ingredients</h2>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="grid gap-4">
                {selectedRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="flex items-center justify-between gap-2 rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{recipe.name}</p>
                      <p className="text-sm text-gray-500">{recipe.region}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Button className="mt-4 w-full">Proceed</Button>
          </div>
        </div>
      </div>
    </div>
  )
}