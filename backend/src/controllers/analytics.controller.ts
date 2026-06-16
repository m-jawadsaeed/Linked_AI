import { Request, Response } from "express";

import { draftRepository } from "../repositories/draft.repository.js";
import { historyRepository } from "../repositories/history.repository.js";

import { getAuthUser } from "../utils/get-auth-user.js";

export interface AnalyticsOverview {
  generatedPosts: number;
  publishedPosts: number;
  scheduledPosts: number;
  totalActivities: number;
}

export const analyticsController = {
  overview: async (req: Request, res: Response) => {
    const authUser = getAuthUser(req);

    const drafts = await draftRepository.findByUserId(authUser.sub);

    const history = await historyRepository.findByUserId(authUser.sub);

    const generatedPosts = history.filter(
      (item) => item.action === "GENERATED",
    ).length;

    const publishedPosts = history.filter(
      (item) => item.action === "PUBLISHED",
    ).length;

    const scheduledPosts = history.filter(
      (item) => item.action === "SCHEDULED",
    ).length;

    const response: AnalyticsOverview = {
      generatedPosts: generatedPosts + drafts.length,

      publishedPosts,

      scheduledPosts,

      totalActivities: history.length,
    };

    return res.json(response);
  },
};
