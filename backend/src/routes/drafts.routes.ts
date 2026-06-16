import { Router } from "express";

import { draftsController } from "../controllers/drafts.controller.js";

import { requireAuth } from "../middleware/require-auth.js";

export const draftsRouter = Router();

draftsRouter.get("/", requireAuth, draftsController.getAll);

draftsRouter.post("/", requireAuth, draftsController.create);

draftsRouter.delete("/:id", requireAuth, draftsController.delete);
