import { Request, Response } from "express";

import { scheduleRepository } from "../repositories/schedule.repository.js";

import { historyRepository } from "../repositories/history.repository.js";

import { getAuthUser } from "../utils/get-auth-user.js";

interface CreateScheduleBody {
  title: string;
  content: string;
  scheduledFor: string;
}

export const scheduleController = {
  getAll: async (req: Request, res: Response) => {
    const user = getAuthUser(req);

    const schedules = await scheduleRepository.findByUserId(user.sub);

    return res.json(schedules);
  },

  create: async (req: Request, res: Response) => {
    const user = getAuthUser(req);

    const body = req.body as CreateScheduleBody;

    const schedule = await scheduleRepository.create(
      user.sub,
      body.title,
      body.content,
      body.scheduledFor,
    );

    await historyRepository.create(user.sub, "SCHEDULED", body.title);

    return res.status(201).json(schedule);
  },

  delete: async (req: Request, res: Response) => {
    await scheduleRepository.delete(req.params.id);

    return res.status(204).send();
  },
};
