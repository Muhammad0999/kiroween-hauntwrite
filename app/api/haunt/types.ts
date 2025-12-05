// API Types for /api/haunt endpoint

export interface HauntRequest {
  entry: string;
  intensity: number;
}

export interface HauntResponse {
  hauntedEntry: string;
}

export interface HauntErrorResponse {
  error: string;
}

export type IntensityLevel = "low" | "medium" | "high";

export const INTENSITY_THRESHOLDS = {
  LOW_MAX: 3,
  MEDIUM_MAX: 7,
  HIGH_MAX: 10,
} as const;
