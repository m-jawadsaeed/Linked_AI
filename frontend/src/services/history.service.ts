import { http } from "../api/http";

export interface HistoryItem {
  id: string;

  action: "GENERATED" | "PUBLISHED" | "SCHEDULED";

  title: string;

  createdAt: string;
}

export const historyService = {
  getAll: (token: string) =>
    http<HistoryItem[]>("/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
