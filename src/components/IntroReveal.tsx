"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface IntroRevealProps {
  onComplete: () => void;
}

export default function IntroReveal({ onComplete }: IntroRevealProps) {
  const [stage, setStage] = useState<"waiting" | "black" | "smoke" | "complete">("waiting");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startIntro = () => {
    // Play ambient sound
    audioRef.current = new Audio("/sounds/Scary_Effect.mp3");
    audioRef.current.volume = 0.15;
    audioRef.current.play().catch((err) => {
      console.log("Audio play failed:", err);
    });

    setStage("black");

    // Black screen for 0.5 seconds
    setTimeout(() => {
      setStage("smoke");
    }, 500);

    // Smoke reveal for 2-3 seconds total
    setTimeout(() => {
      setStage("complete");
      if (audioRef.current) {
        audioRef.current.pause();
      }
      onComplete();
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  if (stage === "complete") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Waiting for user click */}
        {stage === "waiting" && (
          <motion.div
            className="absolute inset-0 bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
          >
            <motion.button
              onClick={startIntro}
              className="px-8 py-4 text-xl font-bold text-purple-400 bg-black border-2 border-purple-500 rounded-lg hover:bg-purple-900/30 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.3)",
                  "0 0 40px rgba(168, 85, 247, 0.6)",
                  "0 0 20px rgba(168, 85, 247, 0.3)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                },
              }}
            >
              👻 Click to Enter
            </motion.button>
          </motion.div>
        )}

        {/* Black screen */}
        {stage === "black" && (
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          />
        )}

        {/* Smoke reveal */}
        {stage === "smoke" && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Smoke layer 1 - from edges */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Smoke swirls */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: `${200 + i * 50}px`,
                  height: `${200 + i * 50}px`,
                  background: `radial-gradient(circle, rgba(168, 85, 247, ${0.3 - i * 0.03}) 0%, transparent 70%)`,
                  left: `${(i % 4) * 25}%`,
                  top: `${Math.floor(i / 4) * 50}%`,
                }}
                initial={{
                  scale: 0,
                  x: 0,
                  y: 0,
                  opacity: 0.8,
                }}
                animate={{
                  scale: [0, 2, 3],
                  x: [0, (i % 2 === 0 ? 100 : -100) * (i + 1)],
                  y: [0, (i % 3 === 0 ? 100 : -100) * (i + 1)],
                  opacity: [0.8, 0.4, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Center clearing effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                className="rounded-full bg-transparent"
                initial={{ scale: 0 }}
                animate={{ scale: 20 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                  width: "100px",
                  height: "100px",
                  boxShadow: "0 0 200px 200px rgba(0, 0, 0, 1)",
                }}
              />
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
