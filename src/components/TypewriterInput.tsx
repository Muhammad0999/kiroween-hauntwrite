"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function TypewriterInput({
  value,
  onChange,
  placeholder = "Dear diary...",
  disabled = false,
  onKeyDown,
}: TypewriterInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const audioPoolRef = useRef<HTMLAudioElement[]>([]);
  const currentIndexRef = useRef(0);
  const lastLengthRef = useRef(value.length);

  useEffect(() => {
    // Create a pool of 3 audio elements for overlapping sounds
    if (typeof window !== "undefined") {
      // Try to create audio pool - using whoosh sound as typewriter sound
      try {
        audioPoolRef.current = Array.from({ length: 3 }, () => {
          const audio = new Audio("/sounds/810329__mokasza__smooth-whoosh.mp3");
          audio.volume = 0.3;
          audio.preload = "auto";
          return audio;
        });
        
        console.log("TypewriterInput: Audio pool created with", audioPoolRef.current.length, "elements");
      } catch (error) {
        console.error("TypewriterInput: Failed to create audio pool:", error);
      }
    }

    return () => {
      audioPoolRef.current.forEach((audio) => {
        audio.pause();
      });
      audioPoolRef.current = [];
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // Play typewriter sound only when typing (not deleting)
    if (newValue.length > lastLengthRef.current) {
      if (audioPoolRef.current.length > 0) {
        console.log("TypewriterInput: Attempting to play sound, pool size:", audioPoolRef.current.length);
        
        // Get the next audio element from the pool
        const sound = audioPoolRef.current[currentIndexRef.current];
        currentIndexRef.current = (currentIndexRef.current + 1) % audioPoolRef.current.length;
        
        // Reset to start
        try {
          sound.currentTime = 0;
        } catch (e) {
          console.error("Failed to reset currentTime:", e);
        }
        
        // Play the sound - short clip for keystroke
        sound.play()
          .then(() => {
            console.log("TypewriterInput: Sound played successfully");
            // Stop after 200ms for quick keystroke sound
            setTimeout(() => {
              try {
                sound.pause();
                sound.currentTime = 0;
              } catch (e) {
                // Ignore errors on pause
              }
            }, 200);
          })
          .catch((err) => {
            console.error("TypewriterInput: Audio play failed:", err);
          });
      } else {
        console.warn("TypewriterInput: Audio pool is empty");
      }
    }
    
    lastLengthRef.current = newValue.length;
    onChange(newValue);
  };

  return (
    <div className="relative">
      <motion.textarea
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full h-48 px-4 py-3 bg-gray-900/80 border border-purple-500/30 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all font-mono"
        style={{
          backgroundImage: `linear-gradient(transparent 95%, rgba(168, 85, 247, 0.1) 95%)`,
          backgroundSize: "100% 1.5em",
          lineHeight: "1.5em",
        }}
        animate={{
          boxShadow: isFocused
            ? [
                "0 0 20px rgba(168, 85, 247, 0.3)",
                "0 0 30px rgba(168, 85, 247, 0.5)",
                "0 0 20px rgba(168, 85, 247, 0.3)",
              ]
            : "0 0 0px rgba(168, 85, 247, 0)",
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
          },
        }}
      />
      
      {/* Typewriter cursor */}
      {isFocused && (
        <motion.div
          className="absolute bottom-4 right-4 text-purple-400 text-xs font-mono"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          ▊
        </motion.div>
      )}
    </div>
  );
}
