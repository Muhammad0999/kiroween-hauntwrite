"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import HauntedLayout from "@/src/components/HauntedLayout";
import GlitchTitle from "@/src/components/GlitchTitle";
import FloatingCandles from "@/src/components/FloatingCandles";
import { DiaryEntry } from "@/src/lib/models";
import { useSoundEffects } from "@/src/hooks/useSoundEffects";

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const { playClickSound, playHauntSound } = useSoundEffects();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/diary/entries");
      if (response.ok) {
        const data = await response.json();
        setEntries(data.entries);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    playHauntSound();
    try {
      const response = await fetch(`/api/diary/entries/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEntries(entries.filter((e) => e.id !== id));
        setShowDeleteConfirm(null);
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleLogout = () => {
    playClickSound();
    signOut({ callbackUrl: "/" });
  };

  return (
    <HauntedLayout>
      <FloatingCandles />

      {/* Top Controls */}
      <div className="fixed top-4 left-4 right-4 z-20 flex justify-between items-center">
        <Link href="/" onClick={() => playClickSound()}>
          <motion.button
            className="p-3 bg-purple-900/50 rounded-full border border-purple-500/30 hover:bg-purple-800/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-2xl">🏠</span>
          </motion.button>
        </Link>

        <motion.button
          onClick={handleLogout}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-green-600 text-white font-semibold rounded-lg relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Logout</span>
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
        </motion.button>
      </div>

      <div className="pt-20 px-4 space-y-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <GlitchTitle text="Your Haunted Diaries" size="md" />
          <motion.p
            className="mt-4 text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {session?.user?.email}
          </motion.p>
        </motion.div>

        {/* Main Content */}
        {isLoading ? (
          <div className="text-center text-gray-400">Loading your dark secrets...</div>
        ) : entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <p className="text-gray-400 text-lg">No entries yet... The pages await your darkness.</p>
            <Link href="/dairy/new" onClick={() => playHauntSound()}>
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white font-bold rounded-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">📝 New Diary</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-red-400 opacity-0 group-hover:opacity-30"
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
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(entry.id)}
                onMouseLeave={() => setHoveredId(null)}
                onDoubleClick={() => {
                  playClickSound();
                  router.push(`/dairy/edit/${entry.id}`);
                }}
                className="relative"
              >
                {/* Ghost hovering animation */}
                {hoveredId === entry.id && (
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl"
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: [-10, -20, -10], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    👻
                  </motion.div>
                )}

                {/* Diary Card */}
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-6 rounded-lg shadow-lg border-2 border-amber-800 relative overflow-hidden group cursor-pointer">
                  {/* Old paper texture */}
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]" />

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-red-900 mb-2 font-serif">
                      Diary Entry
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-gray-800 line-clamp-3 font-serif">
                      {entry.content}
                    </p>
                  </div>

                  {/* Three-dot menu */}
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => setShowDeleteConfirm(entry.id)}
                      className="text-red-900 hover:text-red-700 text-2xl"
                    >
                      ⋮
                    </button>
                  </div>
                </div>

                {/* Delete Confirmation */}
                {showDeleteConfirm === entry.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-black/80 rounded-lg flex flex-col items-center justify-center space-y-4 z-20"
                  >
                    <p className="text-white text-center px-4">
                      Banish this entry to the void?
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* New Entry Button (if entries exist) */}
        {entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center pb-8"
          >
            <Link href="/dairy/new" onClick={() => playHauntSound()}>
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white font-bold rounded-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">📝 New Diary</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-red-400 opacity-0 group-hover:opacity-30"
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
            </Link>
          </motion.div>
        )}
      </div>
    </HauntedLayout>
  );
}
