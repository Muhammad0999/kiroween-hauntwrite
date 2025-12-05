"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HauntedLayout from "@/src/components/HauntedLayout";
import GlitchTitle from "@/src/components/GlitchTitle";
import IntroReveal from "@/src/components/IntroReveal";
import FloatingCandles from "@/src/components/FloatingCandles";
import AuthButtons from "@/src/components/auth/AuthButtons";
import { useSoundEffects } from "@/src/hooks/useSoundEffects";
import { useSessionState } from "@/src/hooks/useSessionState";

export default function Home() {
  const { value: introCompleted, setValue: setIntroCompleted, isLoading } = 
    useSessionState("hauntwrite_intro_completed", false);
  const { isAmbientEnabled, toggleAmbient, playClickSound, playAmbient } = useSoundEffects();

  const handleIntroComplete = () => {
    setIntroCompleted(true);
    playAmbient(); // Start ambient sound after intro
  };

  const handleButtonClick = () => {
    console.log("Button clicked - attempting to play sound");
    playClickSound();
  };

  // Don't render intro if already completed or still loading
  const shouldShowIntro = !isLoading && !introCompleted;

  return (
    <>
      {shouldShowIntro && <IntroReveal onComplete={handleIntroComplete} />}
      
      <HauntedLayout>
      {/* Parallax effects */}
      <FloatingCandles />

      {/* Top navigation */}
      <div className="fixed top-4 left-4 right-4 z-20 flex justify-between items-center">
        {/* Auth Buttons */}
        <div>
          <AuthButtons />
        </div>
        
        {/* Ambient sound toggle */}
        <motion.button
          onClick={toggleAmbient}
          className="p-3 bg-purple-900/50 rounded-full border border-purple-500/30 hover:bg-purple-800/50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-2xl">{isAmbientEnabled ? "🔊" : "🔇"}</span>
        </motion.button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
        {/* Animated title entrance */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <GlitchTitle text="HauntWrite" size="lg" />
        </motion.div>

        {/* Creepy subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-2xl px-4 font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Where your words are possessed by the spirits...
          <br />
          <span className="text-purple-400">Dare to write your darkest thoughts?</span>
        </motion.p>

        {/* Floating decorative elements - hidden on mobile */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-6xl opacity-20 hidden md:block"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          👻
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/4 text-5xl opacity-20 hidden md:block"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          🕯️
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/dairy" onClick={handleButtonClick}>
            <motion.button
              className="relative px-8 py-4 text-lg md:text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-green-600 rounded-lg overflow-hidden group"
              whileHover={{
                boxShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                  "0 0 40px rgba(168, 85, 247, 0.8)",
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 1.5,
                  repeat: Infinity,
                },
              }}
            >
              <span className="relative z-10">Enter the Diary</span>
              
              {/* Animated glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400 to-purple-400 opacity-0 group-hover:opacity-30"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Spell effect particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: "50%",
                  }}
                  animate={{
                    y: [-20, -40, -20],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.button>
          </Link>
        </motion.div>

        {/* Mysterious warning text */}
        <motion.p
          className="text-sm text-gray-500 italic mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{
            delay: 2,
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          The spirits are waiting...
        </motion.p>
      </div>
    </HauntedLayout>
    </>
  );
}
