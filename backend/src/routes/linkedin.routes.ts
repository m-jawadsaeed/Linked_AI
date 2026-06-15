import { Router } from "express";
import { linkedinController } from "../controllers/linkedin.controller.js";
import { requireAuth } from "../middleware/require-auth.js";

export const linkedinRouter = Router();

linkedinRouter.post("/connect", requireAuth, linkedinController.connect);
linkedinRouter.post("/publish", requireAuth, linkedinController.publish);
linkedinRouter.post("/schedule", requireAuth, linkedinController.schedule);