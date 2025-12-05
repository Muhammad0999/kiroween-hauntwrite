"use client";

import { motion } from "framer-motion";

interface GlitchTitleProps {
  text: string;
  size?: "sm" | "md" | "lg";
}

export default function GlitchTitle({ text, size = "md" }: GlitchTitleProps) {
  const sizeClasses = {
    sm: "text-3xl md:text-4xl",
    md: "text-5xl md:text-6xl",
    lg: "text-6xl md:text-8xl",
  };

  return (
    <motion.div
      className="relative inline-block"
      animate={{
        x: [0, -2, 2, 0],
        y: [0, 1, -1, 0],
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut",
      }}
    >
      <h1
        className={`${sizeClasses[size]} font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-green-400 to-purple-400 relative glitch-text`}
        data-text={text}
      >
        {text}
      </h1>
      
      <style jsx>{`
        .glitch-text {
          position: relative;
          text-shadow: 
            0 0 10px rgba(168, 85, 247, 0.8),
            0 0 20px rgba(168, 85, 247, 0.6),
            0 0 30px rgba(168, 85, 247, 0.4);
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: inherit;
          -webkit-background-clip: text;
          background-clip: text;
        }
        
        .glitch-text::before {
          animation: glitch-1 2.5s infinite;
          color: rgba(34, 197, 94, 0.8);
          z-index: -1;
        }
        
        .glitch-text::after {
          animation: glitch-2 3s infinite;
          color: rgba(168, 85, 247, 0.8);
          z-index: -2;
        }
        
        @keyframes glitch-1 {
          0%, 100% {
            transform: translate(0);
            opacity: 0;
          }
          20% {
            transform: translate(-2px, 2px);
            opacity: 0.8;
          }
          40% {
            transform: translate(-2px, -2px);
            opacity: 0;
          }
          60% {
            transform: translate(2px, 2px);
            opacity: 0.8;
          }
          80% {
            transform: translate(2px, -2px);
            opacity: 0;
          }
        }
        
        @keyframes glitch-2 {
          0%, 100% {
            transform: translate(0);
            opacity: 0;
          }
          25% {
            transform: translate(3px, -3px);
            opacity: 0.7;
          }
          50% {
            transform: translate(-3px, 3px);
            opacity: 0;
          }
          75% {
            transform: translate(3px, 3px);
            opacity: 0.7;
          }
        }
      `}</style>
    </motion.div>
  );
}
