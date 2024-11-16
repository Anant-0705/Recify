"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AceternityButton } from './aceternity-button';
import Image from 'next/image';

export const Navbar = () => {
  const router = useRouter();

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-slate-800"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
        
            src="/recifylogo.png"
            alt="Recify Logo"
            width={700}
            height={600}
            className="w-12 h-12"
          />
          
        </div>

        <div className="flex items-center gap-2">
          <AceternityButton
            variant="secondary"
            onClick={() => router.back()}
            className="px-4 py-2"
          >
            Let’s Retry This Witchcraft.
          </AceternityButton>
          
          <AceternityButton
            variant="secondary"
            onClick={() => router.push('/')}
            className="px-4 py-2"
          >
            Back To The Fridge
          </AceternityButton>
        </div>
      </div>
    </motion.nav>
  );
};