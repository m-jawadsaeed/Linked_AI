import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { aiRouter } from "./ai.routes.js";
import { linkedinRouter } from "./linkedin.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/ai", aiRouter);
apiRouter.use("/linkedin", linkedinRouter);