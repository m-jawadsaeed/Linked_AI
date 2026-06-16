import { Router } from "express";

import { settingsController } from "../controllers/settings.controller.js";

import { requireAuth } from "../middleware/require-auth.js";

export const settingsRouter = Router();

settingsRouter.put("/profile", requireAuth, settingsController.updateProfile);
