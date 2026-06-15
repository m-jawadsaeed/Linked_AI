export const imageGenerator = {
  generate: async (prompt: string) => ({
    prompt,
    url: `https://picsum.photos/seed/${encodeURIComponent(prompt)}/1024/576`
  })
};