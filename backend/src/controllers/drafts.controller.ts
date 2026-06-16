import { Request, Response } from "express";

import { draftRepository } from "../repositories/draft.repository.js";

import { historyRepository } from "../repositories/history.repository.js";

import { getAuthUser } from "../utils/get-auth-user.js";

interface CreateDraftBody {
  title: string;
  content: string;
}

export const draftsController = {
  getAll: async (req: Request, res: Response) => {
    const user = getAuthUser(req);

    const drafts = await draftRepository.findByUserId(user.sub);

    return res.json(drafts);
  },

  create: async (req: Request, res: Response) => {
    const user = getAuthUser(req);

    const body = req.body as CreateDraftBody;

    const draft = await draftRepository.create(
      user.sub,
      body.title,
      body.content,
    );

    await historyRepository.create(user.sub, "GENERATED", body.title);

    return res.status(201).json(draft);
  },

  delete: async (req: Request, res: Response) => {
    await draftRepository.delete(req.params.id);

    return res.status(204).send();
  },
};
