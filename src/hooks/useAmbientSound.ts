import { useEffect, useRef, useState } from "react";

interface UseAmbientSoundReturn {
  startSound: () => void;
  stopSound: () => void;
  isPlaying: boolean;
}

export function useAmbientSound(soundUrl?: string): UseAmbientSoundReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Create audio element
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(soundUrl || "/sounds/ambient.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.15; // Low volume (15%)
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundUrl]);

  const startSound = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn("Audio playback failed:", error);
          // Silently fail - user may need to interact first
        });
    }
  };

  const stopSound = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return {
    startSound,
    stopSound,
    isPlaying,
  };
}
