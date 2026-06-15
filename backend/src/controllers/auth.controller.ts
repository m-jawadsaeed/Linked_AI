import { Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import { tokenService } from "../services/token.service.js";
import { loginSchema, refreshSchema, registerSchema } from "../validators/auth.validators.js";
import { userRepository } from "../repositories/user.repository.js";
import { HttpError } from "../errors/http-error.js";

export const authController = {
  register: async (req: Request, res: Response) => {
    const payload = registerSchema.parse(req.body);
    const data = await authService.register(payload);
    res.status(201).json(data);
  },

  login: async (req: Request, res: Response) => {
    const payload = loginSchema.parse(req.body);
    const data = await authService.login(payload);
    res.json(data);
  },

  refresh: async (req: Request, res: Response) => {
    const payload = refreshSchema.parse(req.body);
    const data = await tokenService.rotateRefreshToken(payload.refreshToken);
    res.json(data);
  },

  logoutAll: async (req: Request, res: Response) => {
    if (!req.user?.familyId) {
      throw new HttpError(400, "No token family found");
    }

    await tokenService.revokeFamily(req.user.familyId);
    res.json({ success: true });
  },

  me: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Unauthorized");
    }

    const user = await userRepository.findById(req.user.sub);
    res.json({ user });
  }
};