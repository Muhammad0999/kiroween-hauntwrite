// Data models for HauntWrite

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiaryEntry {
  id: string;
  userId: string;
  content: string;
  hauntedContent: string;
  intensity: number;
  createdAt: string;
  updatedAt: string;
}
