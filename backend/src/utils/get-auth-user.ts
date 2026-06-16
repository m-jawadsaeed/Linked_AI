import { Request } from "express";

interface AuthUser {
  sub: string;
  email: string;
}

export const getAuthUser = (req: Request): AuthUser => {
  if (!req.user) {
    throw new Error("User not authenticated");
  }

  return req.user;
};
