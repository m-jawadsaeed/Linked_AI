import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http-error.js";

export const requireRole = (role: "USER" | "ADMIN") => (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== role) {
    throw new HttpError(403, "Forbidden");
  }

  next();
};