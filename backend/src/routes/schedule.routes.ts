import { Router } from "express";

import { scheduleController } from "../controllers/schedule.controller.js";

import { requireAuth } from "../middleware/require-auth.js";

export const scheduleRouter = Router();

scheduleRouter.get("/", requireAuth, scheduleController.getAll);

scheduleRouter.post("/", requireAuth, scheduleController.create);

scheduleRouter.delete("/:id", requireAuth, scheduleController.delete);
