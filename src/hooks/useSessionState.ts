"use client";

import { useState, useEffect } from "react";

interface UseSessionStateReturn<T> {
  value: T;
  setValue: (newValue: T) => void;
  isLoading: boolean;
}

export function useSessionState<T>(
  key: string,
  initialValue: T
): UseSessionStateReturn<T> {
  const [value, setValueState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // Read from sessionStorage on mount
  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    try {
      const storedValue = sessionStorage.getItem(key);
      
      if (storedValue !== null) {
        const parsed = JSON.parse(storedValue) as T;
        setValueState(parsed);
      }
    } catch (error) {
      // Handle storage errors gracefully
      console.warn(`Failed to read from sessionStorage for key "${key}":`, error);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  // Update both React state and sessionStorage
  const setValue = (newValue: T) => {
    setValueState(newValue);

    // Check if window is available (SSR safety)
    if (typeof window === "undefined") {
      return;
    }

    try {
      sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      // Handle storage errors (quota exceeded, disabled storage)
      console.warn(`Failed to write to sessionStorage for key "${key}":`, error);
    }
  };

  return { value, setValue, isLoading };
}
