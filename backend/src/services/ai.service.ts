import { contentAgent, type GenerationInput } from "../ai/agents/content.agent.js";

export const aiService = {
  generate: async (input: GenerationInput) => contentAgent.run(input),

  streamGenerate: async (input: GenerationInput, onToken: (token: string) => void) => {
    const result = await contentAgent.run(input);
    const tokens = result.post.split(" ");

    for (const token of tokens) {
      onToken(`${token} `);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    return result;
  }
};