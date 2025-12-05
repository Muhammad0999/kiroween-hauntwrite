"use client";

import { motion } from "framer-motion";

export default function FogOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Fog layer 1 */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: ["-10%", "10%", "-10%"],
          y: ["-5%", "5%", "-5%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Fog layer 2 */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse at 80% 30%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: ["10%", "-10%", "10%"],
          y: ["5%", "-5%", "5%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Fog layer 3 */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: ["-5%", "5%", "-5%"],
          y: ["10%", "-10%", "10%"],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Fog layer 4 - subtle mist */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          background:
            "radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.1) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
