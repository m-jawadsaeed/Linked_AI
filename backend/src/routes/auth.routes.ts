import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/require-auth.js";

export const authRouter = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: Jane Doe }
 *               email: { type: string, example: jane@linkedai.app }
 *               password: { type: string, example: SecurePass123 }
 *     responses:
 *       201:
 *         description: Created
 */
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/logout-all", requireAuth, authController.logoutAll);
authRouter.get("/me", requireAuth, authController.me);
authRouter.post("/forgot-password", (_req, res) => res.json({ success: true }));
authRouter.post("/reset-password", (_req, res) => res.json({ success: true }));
authRouter.post("/change-password", requireAuth, (_req, res) => res.json({ success: true }));
authRouter.get("/google", (_req, res) => res.json({ authUrl: "/oauth/google" }));
authRouter.get("/google/callback", (_req, res) => res.json({ success: true }));
authRouter.get("/verify-email", (_req, res) => res.json({ verified: true }));