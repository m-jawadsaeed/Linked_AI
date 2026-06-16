import { http } from "../api/http";

export interface Profile {
  id: string;
  email: string;
  name: string;
  role: string;
  verified: boolean;
}

export const profileService = {
  me: (token: string) =>
    http<Profile>("/profile/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
