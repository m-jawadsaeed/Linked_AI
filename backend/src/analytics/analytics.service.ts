export const analyticsService = {
  calculate: (content: string) => ({
    engagementScore: Math.min(99, 60 + Math.floor(content.length / 20)),
    readabilityScore: 75
  })
};