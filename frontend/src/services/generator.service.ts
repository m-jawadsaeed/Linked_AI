import { http } from "../api/http";

export interface GenerateInput {
  topic: string;
  industry: string;
  audience: string;
  cta: string;
  tone: string;
  notes?: string;
}

export const generatorService = {
  generate: (payload: GenerateInput, token: string) =>
    http<{ title: string; hook: string; post: string; bestPostingTime: string }>("/ai/generate", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    }),

  stream: (payload: GenerateInput, token: string, onToken: (tokenChunk: string) => void, onDone: (data: unknown) => void) => {
    const controller = new AbortController();
    fetch(`${import.meta.env.VITE_API_URL ?? "http://localhost:8080/api"}/ai/stream`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    }).then(async (response) => {
      const reader = response.body?.getReader();
      if (!reader) return;
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        chunk.split("\n\n").forEach((frame) => {
          if (frame.startsWith("data:")) {
            const raw = frame.replace("data:", "").trim();
            try {
              const parsed = JSON.parse(raw);
              if (parsed.token) onToken(parsed.token);
            } catch {
              onToken(raw);
            }
          }
          if (frame.startsWith("event: complete")) {
            const dataLine = frame.split("\n").find((line) => line.startsWith("data:"));
            if (dataLine) onDone(JSON.parse(dataLine.replace("data:", "").trim()));
          }
        });
      }
    });

    return controller;
  }
};