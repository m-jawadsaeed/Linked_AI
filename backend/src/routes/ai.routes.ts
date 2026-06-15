import { Router } from "express";
import { aiController } from "../controllers/ai.controller.js";
import { requireAuth } from "../middleware/require-auth.js";

export const aiRouter = Router();

aiRouter.post("/generate", requireAuth, aiController.generate);
aiRouter.post("/stream", requireAuth, aiController.stream);