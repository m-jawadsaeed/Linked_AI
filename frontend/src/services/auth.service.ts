import { http } from "../api/http";

export interface AuthPayload {
  email: string;
  password: string;
  name?: string;
}

export const authService = {
  register: (payload: AuthPayload) => http<{ accessToken: string; refreshToken: string }>("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload: AuthPayload) => http<{ accessToken: string; refreshToken: string }>("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  me: (token: string) => http<{ user: { id: string; email: string; name: string } }>("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
};