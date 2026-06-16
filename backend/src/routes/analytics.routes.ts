import { Router } from "express";

import { analyticsController } from "../controllers/analytics.controller.js";

import { requireAuth } from "../middleware/require-auth.js";

export const analyticsRouter = Router();

analyticsRouter.get("/overview", requireAuth, analyticsController.overview);
