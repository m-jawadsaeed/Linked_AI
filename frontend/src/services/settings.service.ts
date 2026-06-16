import { http } from "../api/http";

interface UpdateSettingsInput {
  name: string;
}

export const settingsService = {
  updateProfile: (token: string, input: UpdateSettingsInput) =>
    http<{
      message: string;
    }>("/settings/profile", {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(input),
    }),
};
