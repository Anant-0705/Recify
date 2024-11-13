"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Timeline = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  return (
    <div className={cn("relative space-y-8", className)}>
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.2 }}
          className="relative flex items-center"
        >
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-cyan-300 to-transparent" />
          <div className="absolute left-[-8px] w-4 h-4 rounded-full bg-cyan-500" />
          <div className="ml-10">
            <h3 className="font-bold text-xl text-white mb-2">{item.title}</h3>
            <p className="text-gray-300">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};