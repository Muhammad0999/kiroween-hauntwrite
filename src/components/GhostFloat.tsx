"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface GhostFloatProps {
  emoji?: string;
  size?: number;
  color?: "purple" | "green";
}

export default function GhostFloat({
  emoji = "👻",
  size = 60,
  color = "purple",
}: GhostFloatProps) {
  // Generate random animation values
  const animation = useMemo(() => {
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const endX = Math.random() * 100;
    const endY = Math.random() * 100;
    const duration = 20 + Math.random() * 30; // 20-50 seconds
    const delay = Math.random() * 10; // 0-10 seconds delay
    const rotateAmount = -20 + Math.random() * 40; // -20 to 20 degrees

    return {
      startX,
      startY,
      endX,
      endY,
      duration,
      delay,
      rotateAmount,
    };
  }, []);

  const colorClass = color === "purple" ? "text-purple-500" : "text-green-500";

  return (
    <motion.div
      className={`absolute ${colorClass} pointer-events-none select-none`}
      style={{
        fontSize: `${size}px`,
        left: `${animation.startX}%`,
        top: `${animation.startY}%`,
        filter: "blur(2px)",
        opacity: 0.05,
      }}
      animate={{
        x: [`0%`, `${(animation.endX - animation.startX) * 10}px`],
        y: [`0%`, `${(animation.endY - animation.startY) * 10}px`],
        rotate: [0, animation.rotateAmount, -animation.rotateAmount, 0],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{
        duration: animation.duration,
        delay: animation.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.div>
  );
}
