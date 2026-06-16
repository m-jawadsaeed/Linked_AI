import { Router } from "express";

import { authRouter } from "./auth.routes.js";
import { aiRouter } from "./ai.routes.js";
import { linkedinRouter } from "./linkedin.routes.js";

import { draftsRouter } from "./drafts.routes.js";
import { historyRouter } from "./history.routes.js";
import { profileRouter } from "./profile.routes.js";
import { settingsRouter } from "./settings.routes.js";
import { analyticsRouter } from "./analytics.routes.js";
import { scheduleRouter } from "./schedule.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/ai", aiRouter);
apiRouter.use("/linkedin", linkedinRouter);

apiRouter.use("/drafts", draftsRouter);
apiRouter.use("/history", historyRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/settings", settingsRouter);
apiRouter.use("/analytics", analyticsRouter);
apiRouter.use("/schedule", scheduleRouter);
