'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LampContainer } from "@/components/ui/lamp";
import { Timeline } from "@/components/ui/timeline";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { Utensils } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [text, setText] = useState('');
  const description = 'Transform your kitchen ingredients into delicious recipes...';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText((prev) => prev + description[index]);
      index++;
      if (index === description.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const timelineItems = [
    {
      title: "Smart Recipe Discovery",
      description: "Enter ingredients you have, and let Recify suggest delicious recipes. Our intelligent system matches your available ingredients with possible recipes, making meal planning effortless.",
      icon: "🔍"
    },
    {
      title: "Organized Ingredient Management",
      description: "Easily categorize and manage your ingredients with our intuitive interface. Sort by vegetables, fruits, meats, dairy, or grains to keep everything organized.",
      icon: "📝"
    },
    {
      title: "Instant Recipe Suggestions",
      description: "Get immediate recipe recommendations based on your ingredients. Each recipe comes with detailed instructions and a complete ingredient list.",
      icon: "⚡"
    },
    {
      title: "Interactive Recipe Experience",
      description: "Explore recipes with our interactive cards, view detailed steps, and follow along with clear instructions to create your perfect meal.",
      icon: "👨‍🍳"
    },
    {
      title: "Reduce Food Waste",
      description: "Make the most of what's in your kitchen. Recify helps you use ingredients you already have, reducing food waste and saving money.",
      icon: "🌱"
    }
  ];

  return (
    <div className="relative">
      <div className="h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        <LampContainer>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-3 mb-8">
              <Utensils className="h-12 w-12 text-white" />
              <h1 className="text-7xl font-bold text-center text-white relative z-20">
                Recify
              </h1>
            </div>
            
            <p className="mt-4 text-2xl font-light text-center text-white relative z-20">
              {text}
              <span className="animate-pulse">|</span>
            </p>

            <AceternityButton
              onClick={() => router.push('/ingredients')}
              className="mt-8 px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform"
            >
              Get Started
            </AceternityButton>
          </motion.div>
        </LampContainer>
      </div>
      
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4">
          <Timeline 
            items={timelineItems}
            className="max-w-2xl mx-auto"
          />
        </div>
      </div>
    </div>
  );
}