"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  ...props
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  [key: string]: any;
}) => {
  return (
    <div
      className={cn(
        "relative p-[1px] overflow-hidden rounded-full",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full",
          "bg-[linear-gradient(to_right,#14b8a6,#0d9488,#14b8a6)]",
          borderClassName
        )}
        style={{
          animation: `spin ${duration}ms linear infinite`,
        }}
      />
      <div className={cn("relative", className)}>{children}</div>
    </div>
  );
};