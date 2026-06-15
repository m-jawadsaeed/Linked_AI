import { Request, Response } from "express";

export const linkedinController = {
  connect: async (_req: Request, res: Response) => {
    res.json({ connected: true, provider: "linkedin", accountId: "ln_123" });
  },
  publish: async (req: Request, res: Response) => {
    res.json({ status: "published", content: req.body.content, id: `post_${Date.now()}` });
  },
  schedule: async (req: Request, res: Response) => {
    res.status(201).json({ status: "scheduled", runAt: req.body.runAt, id: `schedule_${Date.now()}` });
  }
};