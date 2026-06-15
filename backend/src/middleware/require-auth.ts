import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http-error.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!token) {
    throw new HttpError(401, "Authentication required");
  }

  req.user = verifyAccessToken(token);
  next();
};