import { hashtagTool } from "../tools/hashtag.tool.js";
import { mentionTool } from "../tools/mention.tool.js";
import { buildLinkedInPrompt } from "../prompts/post.prompt.js";
import { ragService } from "../rag/rag.service.js";
import { memoryStore } from "../memory/memory.store.js";

export interface GenerationInput {
  userId: string;
  topic: string;
  industry: string;
  audience: string;
  cta: string;
  tone: string;
  experience?: string;
  notes?: string;
  people?: string[];
  companies?: string[];
}

export const contentAgent = {
  run: async (input: GenerationInput) => {
    const context = await ragService.retrieveContext(input.userId, input.topic);
    const memory = memoryStore.get(input.userId);
    const hashtags = hashtagTool(input.topic);
    const mentions = mentionTool(input.people, input.companies);
    const prompt = buildLinkedInPrompt(input);

    const hook = `Most ${input.audience} are missing this ${input.industry} edge.`;
    const title = `${input.topic} for ${input.audience}`;
    const post = [
      hook,
      "",
      `I used this framework to turn ${input.topic} into repeatable outcomes.`,
      `Context: ${context}`,
      "",
      "1) Start with one measurable workflow.",
      "2) Automate the repeated 20%.",
      "3) Review outcomes weekly and refine.",
      "",
      input.cta,
      mentions.join(" "),
      [...hashtags.trending, ...hashtags.niche.slice(0, 2)].join(" ")
    ].join("\n");

    memoryStore.upsert({
      ...memory,
      successfulHooks: [...memory.successfulHooks.slice(-4), hook],
      favoriteHashtags: hashtags.trending
    });

    return {
      title,
      hook,
      post,
      cta: input.cta,
      hashtags,
      mentions,
      imagePrompt: `Professional LinkedIn artwork about ${input.topic} in ${input.industry}`,
      aiImage: null,
      engagementScore: 84,
      readabilityScore: 76,
      bestPostingTime: "Tue 9:00 AM",
      prompt
    };
  }
};