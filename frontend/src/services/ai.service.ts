import { http } from "../api/http";

export interface GenerateContentRequest {
  topic: string;
  tone: string;
  platform: string;
}

export interface GenerateContentResponse {
  content: string;
}

export const aiService = {
  generate: (token: string, payload: GenerateContentRequest) =>
    http<GenerateContentResponse>("/ai/generate", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(payload),
    }),
};
