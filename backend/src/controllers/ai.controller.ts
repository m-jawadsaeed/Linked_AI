import { Request, Response } from "express";
import { aiService } from "../services/ai.service.js";
import { generationSchema } from "../validators/ai.validators.js";

export const aiController = {
  generate: async (req: Request, res: Response) => {
    const payload = generationSchema.parse(req.body);
    const result = await aiService.generate({ ...payload, userId: req.user!.sub });
    res.json(result);
  },

  stream: async (req: Request, res: Response) => {
    const payload = generationSchema.parse(req.body);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const finalResult = await aiService.streamGenerate({ ...payload, userId: req.user!.sub }, (token) => {
      res.write(`data: ${JSON.stringify({ token })}\n\n`);
    });

    res.write(`event: complete\ndata: ${JSON.stringify(finalResult)}\n\n`);
    res.end();
  }
};