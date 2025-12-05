"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function FloatingCandles() {
  const candles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
      {candles.map((candle) => (
        <motion.div
          key={candle.id}
          className="absolute text-4xl"
          style={{
            left: `${candle.x}%`,
            top: `${candle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: candle.duration,
            delay: candle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🕯️
        </motion.div>
      ))}
    </div>
  );
}
