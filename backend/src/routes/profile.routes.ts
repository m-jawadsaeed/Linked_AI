import { Router } from "express";

import { profileController } from "../controllers/profile.controller.js";

import { requireAuth } from "../middleware/require-auth.js";

export const profileRouter = Router();

profileRouter.get("/me", requireAuth, profileController.me);
