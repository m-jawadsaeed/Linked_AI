import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string().default("postgresql://postgres:postgres@localhost:5432/linkedai"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  JWT_ACCESS_SECRET: z.string().default("dev_access_secret"),
  JWT_REFRESH_SECRET: z.string().default("dev_refresh_secret"),
  ACCESS_TOKEN_TTL: z.string().default("15m"),
  REFRESH_TOKEN_TTL: z.string().default("7d")
});

export const env = envSchema.parse(process.env);