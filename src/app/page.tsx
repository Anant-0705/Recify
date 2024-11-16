"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { AceternityCard } from "@/components/ui/aceternity-card";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { MovingBorder } from "@/components/ui/moving-border";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  const description = "Don't Waste It, Recify It!";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < description.length) {
        setText(prev => description.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Smart Recipe Matching",
      description: "Find perfect recipes based on your available ingredients",
      icon: "🥘"
    },
    {
      title: "Step-by-Step Guide",
      description: "Follow easy cooking instructions with detailed steps",
      icon: "📝"
    },
    {
      title: "Save Favorites",
      description: "Keep track of your favorite recipes for quick access",
      icon: "⭐"
    }
  ];

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="h-screen w-full relative">
        <LampContainer>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 scale-125"
          >
            <Logo />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-4 text-center text-slate-400 md:text-xl"
          >
            {text}
            <span className="animate-blink">|</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 flex flex-row gap-9 justify-center items-center"
          >
            <MovingBorder borderClassName="bg-[linear-gradient(to_right,#334155,#1e293b,#334155)]">
              <AceternityButton
                onClick={() => router.push("/ingredients")}
                className="px-2 py-2 text-lg bg-slate-900 text-white hover:bg-slate-800"
              >
                Let's Get Messy!
              </AceternityButton>
            </MovingBorder>
            
            <MovingBorder borderClassName="bg-[linear-gradient(to_right,#334155,#1e293b,#334155)]">
              <AceternityButton
                variant="secondary"
                onClick={scrollToFeatures}
                className="px-2 py-2 text-lg hover:opacity-80"
              >
                Learn More
              </AceternityButton>
            </MovingBorder>
          </motion.div>
        </LampContainer>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToFeatures}
        >
          <div className="text-slate-400 text-sm">Scroll Down</div>
          <div className="mt-2 text-2xl text-slate-400">↓</div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div id="features" className="min-h-screen bg-slate-950 py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl text-center text-slate-300 mb-16"
          >
            Why Choose Recify?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <AceternityCard className="p-6 h-full">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-300 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">{feature.description}</p>
                </AceternityCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
