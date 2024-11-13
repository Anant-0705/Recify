import React from "react";
import { cn } from "@/lib/utils";

interface AceternityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AceternityCard: React.FC<AceternityCardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-[0.5px] dark:border-gray-800 dark:bg-gray-950 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
