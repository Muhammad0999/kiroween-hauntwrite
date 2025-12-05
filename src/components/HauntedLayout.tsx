"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HauntedLayoutProps {
  children: ReactNode;
}

export default function HauntedLayout({ children }: HauntedLayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-purple-950 to-black">
      {/* Floating ghostly shadows */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-400/5 rounded-full blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, 80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Fog overlay */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: "url('/fog.svg')",
          backgroundSize: "cover",
        }}
      />

      {/* Subtle floating ghost/smoke elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-48 bg-purple-600/5 rounded-full blur-2xl"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, -80, 0],
          opacity: [0.05, 0.15, 0.08, 0.05],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-40 h-56 bg-green-500/5 rounded-full blur-2xl"
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 50, 100, 0],
          opacity: [0.05, 0.12, 0.07, 0.05],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <motion.div
        className="absolute top-2/3 right-1/3 w-36 h-52 bg-purple-500/4 rounded-full blur-3xl"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -60, -30, 0],
          opacity: [0.04, 0.1, 0.06, 0.04],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/5 w-28 h-44 bg-green-400/6 rounded-full blur-2xl"
        animate={{
          x: [0, -25, 35, 0],
          y: [0, 70, 40, 0],
          opacity: [0.06, 0.14, 0.08, 0.06],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-2/3 w-44 h-60 bg-purple-700/4 rounded-full blur-3xl"
        animate={{
          x: [0, 40, -50, 0],
          y: [0, -50, 60, 0],
          opacity: [0.04, 0.09, 0.05, 0.04],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl">
          {children}
        </div>
      </div>
    </div>
  );
}
