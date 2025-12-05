"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface OldPaperCardProps {
  children: ReactNode;
  className?: string;
}

export default function OldPaperCard({ children, className = "" }: OldPaperCardProps) {
  return (
    <motion.div
      className={`relative bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 rounded-lg p-6 shadow-2xl ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(90deg, rgba(139, 69, 19, 0.03) 1px, transparent 1px),
          linear-gradient(rgba(139, 69, 19, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
      initial={{ opacity: 0, rotateX: -10 }}
      animate={{ opacity: 1, rotateX: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 rounded-lg opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Aged edges */}
      <div className="absolute inset-0 rounded-lg border-2 border-amber-800/20 pointer-events-none" />
      
      {/* Blood stain effect (top right) */}
      <motion.div
        className="absolute top-2 right-2 w-8 h-8 bg-red-900/20 rounded-full blur-sm"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-gray-900">
        {children}
      </div>
    </motion.div>
  );
}
