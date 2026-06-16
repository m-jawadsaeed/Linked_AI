import { Request, Response } from "express";

import { historyRepository } from "../repositories/history.repository.js";

import { getAuthUser } from "../utils/get-auth-user.js";

export const historyController = {
  getAll: async (req: Request, res: Response) => {
    const user = getAuthUser(req);

    const history = await historyRepository.findByUserId(user.sub);

    return res.json(history);
  },
};
