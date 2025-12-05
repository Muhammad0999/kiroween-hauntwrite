"use client";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useSoundEffects } from "@/src/hooks/useSoundEffects";

export default function SignOutButton() {
  const { playClickSound } = useSoundEffects();

  const handleSignOut = () => {
    playClickSound();
    signOut({ callbackUrl: "/" });
  };

  return (
    <motion.button
      onClick={handleSignOut}
      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-lg relative overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">Sign Out</span>
      
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-400 to-purple-400 opacity-0 group-hover:opacity-30"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.button>
  );
}
