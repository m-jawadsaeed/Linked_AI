import { createHash, randomUUID } from "node:crypto";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { HttpError } from "../errors/http-error.js";

interface StoredRefreshToken {
  hash: string;
  userId: string;
  familyId: string;
  revoked: boolean;
}

const tokenStore = new Map<string, StoredRefreshToken>();

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export const tokenService = {
  issueTokenPair: async (user: { id: string; email: string; role: "USER" | "ADMIN" }, familyId = randomUUID()) => {
    const accessToken = signAccessToken({ sub: user.id, email: user.email, role: user.role, familyId });
    const refreshToken = signRefreshToken({ sub: user.id, email: user.email, role: user.role, familyId });
    tokenStore.set(hashToken(refreshToken), { hash: hashToken(refreshToken), userId: user.id, familyId, revoked: false });
    return { accessToken, refreshToken, familyId };
  },

  rotateRefreshToken: async (token: string) => {
    const payload = verifyRefreshToken(token);
    const current = tokenStore.get(hashToken(token));

    if (!current || current.revoked) {
      for (const item of tokenStore.values()) {
        if (item.familyId === payload.familyId) {
          item.revoked = true;
        }
      }
      throw new HttpError(401, "Refresh token reuse detected");
    }

    current.revoked = true;
    return tokenService.issueTokenPair({ id: payload.sub, email: payload.email, role: payload.role }, payload.familyId);
  },

  revokeFamily: async (familyId: string) => {
    for (const item of tokenStore.values()) {
      if (item.familyId === familyId) {
        item.revoked = true;
      }
    }
  }
};