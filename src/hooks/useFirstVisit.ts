"use client";

import { useState, useEffect } from "react";

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hauntwrite_visited");
    
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem("hauntwrite_visited", "true");
    }
    
    setIsChecking(false);
  }, []);

  return { isFirstVisit, isChecking };
}
