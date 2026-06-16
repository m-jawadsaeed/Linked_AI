import { http } from "../api/http";

export interface Draft {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export const draftsService = {
  getAll: (token: string) =>
    http<Draft[]>("/drafts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  create: (token: string, title: string, content: string) =>
    http<Draft>("/drafts", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        title,
        content,
      }),
    }),

  delete: (token: string, id: string) =>
    http<void>(`/drafts/${id}`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
