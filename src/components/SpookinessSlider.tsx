"use client";

import { motion } from "framer-motion";

interface SpookinessSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function SpookinessSlider({ value, onChange }: SpookinessSliderProps) {
  const labels = [
    "Whisper",
    "Eerie",
    "Creepy",
    "Haunted",
    "Possessed",
    "Nightmare",
  ];
  
  const getLabel = (val: number) => {
    if (val <= 2) return labels[0];
    if (val <= 4) return labels[1];
    if (val <= 6) return labels[2];
    if (val <= 8) return labels[3];
    if (val <= 9) return labels[4];
    return labels[5];
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">
          Spookiness Intensity
        </label>
        <motion.span
          key={value}
          initial={{ scale: 1.2, color: "#a855f7" }}
          animate={{ scale: 1, color: "#d1d5db" }}
          className="text-sm font-bold"
        >
          {value} - {getLabel(value)}
        </motion.span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="0"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, #a855f7 0%, #22c55e ${value * 10}%, #1f2937 ${value * 10}%, #1f2937 100%)`,
          }}
        />
        
        <motion.div
          className="absolute -top-1 w-4 h-4 bg-purple-500 rounded-full pointer-events-none shadow-lg"
          style={{
            left: `calc(${value * 10}% - 8px)`,
            boxShadow: "0 0 15px rgba(168, 85, 247, 0.8)",
          }}
          animate={{
            boxShadow: [
              "0 0 15px rgba(168, 85, 247, 0.8)",
              "0 0 25px rgba(168, 85, 247, 1)",
              "0 0 15px rgba(168, 85, 247, 0.8)",
            ],
            scale: value === 10 ? [1, 1.3, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #a855f7, #22c55e);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
          transition: transform 0.2s;
        }
        
        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        
        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #a855f7, #22c55e);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
          transition: transform 0.2s;
        }
        
        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
