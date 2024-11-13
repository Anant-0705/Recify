import React from 'react'
import { cn } from "@/lib/utils"

interface AceternityButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export const AceternityButton: React.FC<AceternityButtonProps> = ({ 
  className, 
  variant = 'primary', 
  ...props 
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variant === 'primary' 
          ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow hover:from-pink-600 hover:to-yellow-600" 
          : "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}