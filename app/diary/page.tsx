"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HauntedLayout from "@/src/components/HauntedLayout";
import GlitchTitle from "@/src/components/GlitchTitle";
import DiaryEditor from "@/src/components/DiaryEditor";

export default function DiaryPage() {
  const handleHaunt = async (entry: string, intensity: number): Promise<string> => {
    try {
      const response = await fetch("/api/haunt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ entry, intensity }),
      });

      if (!response.ok) {
        throw new Error("Failed to haunt entry");
      }

      const data = await response.json();
      return data.hauntedEntry;
    } catch (error) {
      console.error("Error haunting entry:", error);
      throw error;
    }
  };

  return (
    <HauntedLayout>
      <div className="space-y-8 py-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>←</span>
            <span>Back to entrance</span>
          </Link>
        </motion.div>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <GlitchTitle text="Your Haunted Diary" size="md" />
          <motion.p
            className="mt-4 text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Let the spirits transform your words...
          </motion.p>
        </motion.div>

        {/* Diary Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <DiaryEditor onHaunt={handleHaunt} />
        </motion.div>
      </div>
    </HauntedLayout>
  );
}
