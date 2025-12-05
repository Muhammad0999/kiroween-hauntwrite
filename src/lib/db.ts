import fs from "fs";
import path from "path";
import { User, DiaryEntry } from "./models";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const ENTRIES_FILE = path.join(DATA_DIR, "entries.json");

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Read JSON file
function readJSON<T>(filePath: string): T[] {
  ensureDataDir();
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// Write JSON file
function writeJSON<T>(filePath: string, data: T[]) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// User Repository
export const userRepository = {
  async create(email: string, passwordHash: string): Promise<User> {
    const users = readJSON<User>(USERS_FILE);
    const user: User = {
      id: crypto.randomUUID(),
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(user);
    writeJSON(USERS_FILE, users);
    return user;
  },

  async findByEmail(email: string): Promise<User | null> {
    const users = readJSON<User>(USERS_FILE);
    return users.find((u) => u.email === email) || null;
  },

  async findById(id: string): Promise<User | null> {
    const users = readJSON<User>(USERS_FILE);
    return users.find((u) => u.id === id) || null;
  },
};

// Diary Entry Repository
export const entryRepository = {
  async create(
    userId: string,
    content: string,
    hauntedContent: string,
    intensity: number
  ): Promise<DiaryEntry> {
    const entries = readJSON<DiaryEntry>(ENTRIES_FILE);
    const entry: DiaryEntry = {
      id: crypto.randomUUID(),
      userId,
      content,
      hauntedContent,
      intensity,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    entries.push(entry);
    writeJSON(ENTRIES_FILE, entries);
    return entry;
  },

  async findByUserId(userId: string): Promise<DiaryEntry[]> {
    const entries = readJSON<DiaryEntry>(ENTRIES_FILE);
    return entries.filter((e) => e.userId === userId);
  },

  async findById(id: string): Promise<DiaryEntry | null> {
    const entries = readJSON<DiaryEntry>(ENTRIES_FILE);
    return entries.find((e) => e.id === id) || null;
  },

  async update(
    id: string,
    content: string,
    hauntedContent: string,
    intensity: number
  ): Promise<DiaryEntry | null> {
    const entries = readJSON<DiaryEntry>(ENTRIES_FILE);
    const entryIndex = entries.findIndex((e) => e.id === id);
    
    if (entryIndex === -1) {
      return null; // Entry not found
    }
    
    entries[entryIndex] = {
      ...entries[entryIndex],
      content,
      hauntedContent,
      intensity,
      updatedAt: new Date().toISOString(),
    };
    
    writeJSON(ENTRIES_FILE, entries);
    return entries[entryIndex];
  },

  async delete(id: string): Promise<boolean> {
    const entries = readJSON<DiaryEntry>(ENTRIES_FILE);
    const filteredEntries = entries.filter((e) => e.id !== id);
    
    if (filteredEntries.length === entries.length) {
      return false; // Entry not found
    }
    
    writeJSON(ENTRIES_FILE, filteredEntries);
    return true;
  },
};
