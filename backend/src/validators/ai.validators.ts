import { z } from "zod";

export const generationSchema = z.object({
  topic: z.string().min(3),
  industry: z.string().min(2),
  audience: z.string().min(2),
  cta: z.string().min(2),
  tone: z.string().min(2),
  experience: z.string().optional(),
  notes: z.string().optional(),
  people: z.array(z.string()).optional(),
  companies: z.array(z.string()).optional()
});