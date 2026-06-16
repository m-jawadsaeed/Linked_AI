import { randomUUID } from "node:crypto";

export interface DraftRecord {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const drafts = new Map<string, DraftRecord>();

export const draftRepository = {
  findByUserId: async (userId: string) =>
    [...drafts.values()]
      .filter((draft) => draft.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),

  findById: async (id: string) => drafts.get(id) ?? null,

  create: async (userId: string, title: string, content: string) => {
    const now = new Date().toISOString();

    const draft: DraftRecord = {
      id: randomUUID(),
      userId,
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };

    drafts.set(draft.id, draft);

    return draft;
  },

  delete: async (id: string) => {
    drafts.delete(id);
  },

  update: async (id: string, title: string, content: string) => {
    const draft = drafts.get(id);

    if (!draft) {
      return null;
    }

    draft.title = title;
    draft.content = content;
    draft.updatedAt = new Date().toISOString();

    drafts.set(id, draft);

    return draft;
  },
};
