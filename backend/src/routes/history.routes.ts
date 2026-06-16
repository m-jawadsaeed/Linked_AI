import { Router } from "express";

import { historyController } from "../controllers/history.controller.js";

import { requireAuth } from "../middleware/require-auth.js";

export const historyRouter = Router();

historyRouter.get("/", requireAuth, historyController.getAll);
