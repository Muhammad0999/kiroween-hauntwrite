"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import HauntedLayout from "@/src/components/HauntedLayout";
import GlitchTitle from "@/src/components/GlitchTitle";
import FloatingCandles from "@/src/components/FloatingCandles";
import TypewriterInput from "@/src/components/TypewriterInput";
import { useSoundEffects } from "@/src/hooks/useSoundEffects";

export default function EditDiaryPage() {
  const [entry, setEntry] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const { playClickSound } = useSoundEffects();

  useEffect(() => {
    fetchEntry();
  }, []);

  const fetchEntry = async () => {
    try {
      const response = await fetch("/api/diary/entries");
      if (response.ok) {
        const data = await response.json();
        const foundEntry = data.entries.find((e: any) => e.id === params.id);
        if (foundEntry) {
          setEntry(foundEntry.content);
        } else {
          setError("Entry not found...");
        }
      }
    } catch (error) {
      console.error("Error fetching entry:", error);
      setError("Failed to load entry...");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!entry.trim()) return;

    playClickSound();
    setIsSaving(true);

    try {
      const response = await fetch(`/api/diary/entries/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: entry,
          hauntedContent: entry,
          intensity: 5,
        }),
      });

      if (response.ok) {
        router.push("/dairy");
      } else {
        setError("Failed to save entry...");
      }
    } catch (error) {
      console.error("Error saving entry:", error);
      setError("Failed to save entry...");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <HauntedLayout>
        <FloatingCandles />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-400">Loading your dark secrets...</p>
        </div>
      </HauntedLayout>
    );
  }

  if (error) {
    return (
      <HauntedLayout>
        <FloatingCandles />
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
          <p className="text-red-400">{error}</p>
          <Link href="/dairy">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
              Back to Diaries
            </button>
          </Link>
        </div>
      </HauntedLayout>
    );
  }

  return (
    <HauntedLayout>
      <FloatingCandles />

      {/* Top Controls */}
      <div className="fixed top-4 left-4 z-20">
        <Link href="/dairy" onClick={() => playClickSound()}>
          <motion.button
            className="p-3 bg-purple-900/50 rounded-full border border-purple-500/30 hover:bg-purple-800/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-2xl">←</span>
          </motion.button>
        </Link>
      </div>

      <div className="pt-20 px-4 max-w-4xl mx-auto space-y-8 pb-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <GlitchTitle text="Edit Your Diary" size="md" />
          <motion.p
            className="mt-4 text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Revise your haunted thoughts...
          </motion.p>
        </motion.div>

        {/* Writing Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Diary Entry
          </label>
          <TypewriterInput
            value={entry}
            onChange={setEntry}
            placeholder="Dear diary, today I..."
            disabled={isSaving}
          />
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={handleSave}
            disabled={!entry.trim() || isSaving}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-purple-600 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            whileHover={{ scale: isSaving ? 1 : 1.02 }}
            whileTap={{ scale: isSaving ? 1 : 0.98 }}
          >
            <span className="relative z-10">
              {isSaving ? "💾 Saving..." : "💾 Save Changes"}
            </span>

            {!isSaving && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-green-400 opacity-0 group-hover:opacity-30"
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

            {isSaving && (
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
          </motion.button>
        </motion.div>
      </div>
    </HauntedLayout>
  );
}
