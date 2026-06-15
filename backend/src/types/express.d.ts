import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface UserPayload extends JwtPayload {
      sub: string;
      role: "USER" | "ADMIN";
      email: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};