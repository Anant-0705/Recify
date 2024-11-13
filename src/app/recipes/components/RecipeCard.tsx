'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function RecipeCard({ recipe }:any) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
          <p className="text-gray-600">{recipe.description}</p>
        </div>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-white text-lg font-semibold">View Recipe</span>
          </motion.div>
        )}
      </motion.div>
    </Link>
  )
}