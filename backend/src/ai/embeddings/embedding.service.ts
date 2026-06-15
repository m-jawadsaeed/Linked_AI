export const embeddingService = {
  createVector: async (text: string) => text.split(" ").map((word) => word.length / 10)
};