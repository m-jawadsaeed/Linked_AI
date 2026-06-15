import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { apiRouter } from "./routes/index.js";
import { swaggerDocument } from "./swagger.js";
import { errorHandler } from "./middleware/error-handler.js";

dotenv.config();

export const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "2mb" }));

app.use(
  "/api",
  rateLimit({
    windowMs: 60_000,
    max: 120,
    standardHeaders: true
  })
);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "linkedai-backend" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", apiRouter);
app.use(errorHandler);