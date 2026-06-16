import { Worker } from "bullmq";
import {Redis} from "ioredis";
import { env } from "../config/env.js";

const connection = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

export const publishingWorker = new Worker(
  "publishing",
  async (job) => {
    console.log("Publishing post", job.data);
    return { ok: true };
  },
  { connection }
);