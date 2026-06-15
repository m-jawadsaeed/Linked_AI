import { Queue } from "bullmq";
import IORedis from "ioredis";
import { env } from "../config/env.js";

const connection = new IORedis(env.REDIS_URL, { maxRetriesPerRequest: null });

export const queues = {
  image: new Queue("image-generation", { connection }),
  embeddings: new Queue("embeddings", { connection }),
  publishing: new Queue("publishing", { connection }),
  analytics: new Queue("analytics", { connection }),
  scheduling: new Queue("scheduling", { connection })
};