"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface HauntedOutputPanelProps {
  hauntedText: string;
  isLoading?: boolean;
}

export default function HauntedOutputPanel({ hauntedText, isLoading = false }: HauntedOutputPanelProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (!hauntedText || isLoading) {
      setDisplayedText("");
      return;
    }

    // Trigger shake when new text arrives
    setShouldShake(true);
    setTimeout(() => setShouldShake(false), 200);

    setIsTyping(true);
    setDisplayedText("");
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex < hauntedText.length) {
        setDisplayedText(hauntedText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 30); // 30ms per character for smooth typing

    return () => clearInterval(typeInterval);
  }, [hauntedText, isLoading]);

  if (!hauntedText && !isLoading) return null;

  // Parse glitch markers and render with glitch effect
  const renderText = (text: string) => {
    const parts = text.split(/(\[!glitch_start\].*?\[!glitch_end\])/g);
    
    return parts.map((part, index) => {
      if (part.startsWith("[!glitch_start]") && part.endsWith("[!glitch_end]")) {
        const glitchText = part.replace("[!glitch_start]", "").replace("[!glitch_end]", "");
        return (
          <motion.span
            key={index}
            className="inline-block text-purple-400 animate-glitch relative"
            animate={{
              x: [0, -1, 1, -1, 1, 0],
              opacity: [1, 0.8, 1, 0.9, 1],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            {glitchText}
          </motion.span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        x: shouldShake ? [0, -5, 5, -5, 5, -3, 3, 0] : 0,
      }}
      transition={{ 
        duration: shouldShake ? 0.2 : 0.5, 
        ease: shouldShake ? "easeInOut" : "easeOut" 
      }}
      className="relative"
    >
      <motion.div
        className="relative bg-gradient-to-br from-gray-900 via-purple-950/50 to-gray-900 rounded-lg p-6 border border-purple-500/30 shadow-2xl overflow-hidden"
        animate={
          isLoading
            ? {
                x: [0, -2, 2, -1, 1, 0],
                y: [0, 1, -1, 1, -1, 0],
              }
            : {}
        }
        transition={
          isLoading
            ? {
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 0.3,
              }
            : {}
        }
      >
        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-green-500/10 to-purple-500/10"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <motion.h3
            className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              className="text-2xl"
              animate={
                isLoading
                  ? {
                      rotate: [0, -10, 10, -10, 10, 0],
                    }
                  : {}
              }
              transition={
                isLoading
                  ? {
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }
                  : {}
              }
            >
              👻
            </motion.span>
            {isLoading ? "Summoning spirits..." : "Haunted Entry"}
          </motion.h3>
          
          {isLoading ? (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {/* Loading skeleton with glitch effect */}
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="h-4 bg-purple-500/20 rounded"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    width: ["60%", "80%", "70%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-gray-200 leading-relaxed whitespace-pre-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {renderText(displayedText)}
              {isTyping && (
                <motion.span
                  className="inline-block w-2 h-5 bg-purple-400 ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </motion.div>
          )}
        </div>

        {/* Corner decorations */}
        <motion.div
          className="absolute top-2 right-2 text-purple-500/20 text-4xl"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          ✦
        </motion.div>
        <motion.div
          className="absolute bottom-2 left-2 text-green-500/20 text-4xl"
          animate={{
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        >
          ✦
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
