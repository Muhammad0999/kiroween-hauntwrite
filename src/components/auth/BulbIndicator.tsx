"use client";

import { motion } from "framer-motion";

interface BulbIndicatorProps {
  isAuthenticated: boolean;
  size?: "sm" | "md" | "lg";
}

export default function BulbIndicator({
  isAuthenticated,
  size = "md",
}: BulbIndicatorProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const glowColor = isAuthenticated
    ? "rgba(34, 197, 94, 0.8)" // neon green
    : "rgba(239, 68, 68, 0.8)"; // red

  const shadowColor = isAuthenticated
    ? "0 0 20px rgba(34, 197, 94, 0.6)" // green glow
    : "0 0 20px rgba(239, 68, 68, 0.6)"; // red glow

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full`}
      style={{
        backgroundColor: glowColor,
      }}
      animate={{
        boxShadow: isAuthenticated
          ? [
              // Soft hum glow for authenticated
              "0 0 15px rgba(34, 197, 94, 0.4)",
              "0 0 25px rgba(34, 197, 94, 0.6)",
              "0 0 15px rgba(34, 197, 94, 0.4)",
            ]
          : [
              // Pulsing rhythm for unauthenticated
              shadowColor,
              "0 0 30px rgba(239, 68, 68, 0.8)",
              shadowColor,
            ],
      }}
      transition={{
        duration: isAuthenticated ? 2 : 0.5, // Slower for green, faster pulse for red
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
