"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SpookinessSlider from "./SpookinessSlider";
import HauntedOutputPanel from "./HauntedOutputPanel";
import TypewriterInput from "./TypewriterInput";
import { useSoundEffects } from "@/src/hooks/useSoundEffects";

interface DiaryEditorProps {
  onHaunt: (entry: string, intensity: number) => Promise<string>;
}

export default function DiaryEditor({ onHaunt }: DiaryEditorProps) {
  const [entry, setEntry] = useState("");
  const [intensity, setIntensity] = useState(5);
  const [hauntedText, setHauntedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { playHauntSound } = useSoundEffects();

  const handleHaunt = async () => {
    if (!entry.trim()) return;
    
    // Play haunt sound
    playHauntSound();
    
    setIsLoading(true);
    setHauntedText(""); // Clear previous result
    try {
      const result = await onHaunt(entry, intensity);
      setHauntedText(result);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to haunt entry:", error);
      }
      setHauntedText("💀 The spirits are restless... Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key to submit (Ctrl/Cmd + Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleHaunt();
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Textarea for entry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Write Your Diary Entry
        </label>
        <TypewriterInput
          value={entry}
          onChange={setEntry}
          onKeyDown={handleKeyDown}
          placeholder="Dear diary, today I... (Ctrl/Cmd + Enter to haunt)"
          disabled={isLoading}
        />
      </motion.div>

      {/* Spookiness Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <SpookinessSlider value={intensity} onChange={setIntensity} />
      </motion.div>

      {/* Haunt Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <button
          onClick={handleHaunt}
          disabled={!entry.trim() || isLoading}
          className="haunt-button w-full px-6 py-3 bg-black text-purple-400 rounded-xl shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        >
          <span className="relative z-10">
            {isLoading ? "👻 Summoning spirits..." : "👻 Haunt My Entry"}
          </span>
          
          {/* Animated glow effect */}
          {!isLoading && (
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
          )}
          
          {/* Loading pulse */}
          {isLoading && (
            <motion.div
              className="absolute inset-0 bg-purple-500/30"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          )}
        </button>
      </motion.div>

      {/* Haunted Output Panel */}
      {(hauntedText || isLoading) && (
        <HauntedOutputPanel hauntedText={hauntedText} isLoading={isLoading} />
      )}
    </div>
  );
}
