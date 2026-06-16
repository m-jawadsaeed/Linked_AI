import { randomUUID } from "node:crypto";

export interface HistoryRecord {
  id: string;
  userId: string;
  action: "GENERATED" | "PUBLISHED" | "SCHEDULED";

  title: string;

  createdAt: string;
}

const history = new Map<string, HistoryRecord>();

export const historyRepository = {
  findByUserId: async (userId: string) =>
    [...history.values()]
      .filter((item) => item.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),

  create: async (
    userId: string,
    action: "GENERATED" | "PUBLISHED" | "SCHEDULED",
    title: string,
  ) => {
    const item: HistoryRecord = {
      id: randomUUID(),
      userId,
      action,
      title,
      createdAt: new Date().toISOString(),
    };

    history.set(item.id, item);

    return item;
  },
};
