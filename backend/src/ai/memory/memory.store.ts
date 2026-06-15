interface MemoryEntry {
  userId: string;
  preferences: string[];
  favoriteHashtags: string[];
  successfulHooks: string[];
}

const memory = new Map<string, MemoryEntry>();

export const memoryStore = {
  get: (userId: string): MemoryEntry =>
    memory.get(userId) ?? {
      userId,
      preferences: [],
      favoriteHashtags: [],
      successfulHooks: []
    },
  upsert: (entry: MemoryEntry) => {
    memory.set(entry.userId, entry);
    return entry;
  }
};