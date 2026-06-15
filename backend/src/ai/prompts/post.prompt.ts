export const buildLinkedInPrompt = (input: {
  topic: string;
  industry: string;
  audience: string;
  tone: string;
  cta?: string;
  notes?: string;
}) => `Create a LinkedIn post with:\nTopic: ${input.topic}\nIndustry: ${input.industry}\nAudience: ${input.audience}\nTone: ${input.tone}\nCTA: ${input.cta ?? "Invite comments"}\nNotes: ${input.notes ?? "None"}`;