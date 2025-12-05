"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import BulbIndicator from "./BulbIndicator";
import SignOutButton from "./SignOutButton";
import { useSoundEffects } from "@/src/hooks/useSoundEffects";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const { playHauntSound } = useSoundEffects();
  const isAuthenticated = status === "authenticated";

  const handleAuthClick = () => {
    playHauntSound();
  };

  if (status === "loading") {
    return (
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 rounded-full bg-gray-700 animate-pulse" />
        <div className="w-24 h-10 bg-gray-700 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <BulbIndicator isAuthenticated={true} size="md" />
        <span className="text-green-400 text-sm hidden sm:inline">
          {session?.user?.email}
        </span>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <BulbIndicator isAuthenticated={false} size="md" />
      
      {/* Sign Up Button */}
      <Link href="/signup" onClick={handleAuthClick}>
        <motion.button
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 15px rgba(239, 68, 68, 0.4)",
              "0 0 25px rgba(239, 68, 68, 0.6)",
              "0 0 15px rgba(239, 68, 68, 0.4)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 0.5,
              repeat: Infinity,
            },
          }}
        >
          <span className="relative z-10">Sign Up</span>
          
          {/* Golden glow on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-50"
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </Link>

      {/* Login Button */}
      <Link href="/login" onClick={handleAuthClick}>
        <motion.button
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 15px rgba(239, 68, 68, 0.4)",
              "0 0 25px rgba(239, 68, 68, 0.6)",
              "0 0 15px rgba(239, 68, 68, 0.4)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 0.5,
              repeat: Infinity,
            },
          }}
        >
          <span className="relative z-10">Login</span>
          
          {/* Golden glow on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-50"
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </Link>
    </div>
  );
}
