"use client";
import React from "react";
import { motion } from "framer-motion";

export const Cover = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "inline-block",
      }}
      className={className}
    >
      <motion.div
        initial={{ x: "0%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: "linear-gradient(to right, transparent, #0d9488, transparent)",
          zIndex: 1,
        }}
      />
      {children}
    </motion.div>
  );
};