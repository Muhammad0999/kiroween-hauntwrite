"use client";

import { useEffect, useRef, useState } from "react";

export function useSoundEffects() {
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const [isAmbientEnabled, setIsAmbientEnabled] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize audio elements
    ambientRef.current = new Audio("/sounds/Scary_Effect.mp3");
    if (ambientRef.current) {
      ambientRef.current.loop = true;
      ambientRef.current.volume = 0.1; // Very low volume
    }

    setIsInitialized(true);

    return () => {
      if (ambientRef.current) {
        ambientRef.current.pause();
        ambientRef.current = null;
      }
    };
  }, []);

  const playAmbient = () => {
    if (ambientRef.current && isInitialized) {
      ambientRef.current.play().catch(() => {
        // Silently fail if autoplay is blocked
      });
      setIsAmbientEnabled(true);
    }
  };

  const stopAmbient = () => {
    if (ambientRef.current) {
      ambientRef.current.pause();
      setIsAmbientEnabled(false);
    }
  };

  const toggleAmbient = () => {
    if (isAmbientEnabled) {
      stopAmbient();
    } else {
      playAmbient();
    }
  };

  const playClickSound = () => {
    if (!isInitialized) {
      console.log("Sound not initialized yet");
      return;
    }
    console.log("Playing click sound: 810329__mokasza__smooth-whoosh.mp3");
    const audio = new Audio("/sounds/810329__mokasza__smooth-whoosh.mp3");
    audio.volume = 0.5;
    audio.play()
      .then(() => console.log("Click sound played successfully"))
      .catch((err) => console.error("Click sound failed:", err));
  };

  const playHauntSound = () => {
    if (!isInitialized) {
      console.log("Sound not initialized yet");
      return;
    }
    console.log("Playing haunt sound: 168177__speedenza__whoosh-woow-mk1.wav");
    const audio = new Audio("/sounds/168177__speedenza__whoosh-woow-mk1.wav");
    audio.volume = 0.5;
    audio.play()
      .then(() => console.log("Haunt sound played successfully"))
      .catch((err) => console.error("Haunt sound failed:", err));
  };

  return {
    isAmbientEnabled,
    toggleAmbient,
    playClickSound,
    playHauntSound,
    playAmbient,
    stopAmbient,
  };
}
