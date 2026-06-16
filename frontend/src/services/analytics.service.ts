import { http } from "../api/http";

export interface AnalyticsOverview {
  generatedPosts: number;
  publishedPosts: number;
  scheduledPosts: number;
  totalActivities: number;
}

export const analyticsService = {
  overview: (token: string) =>
    http<AnalyticsOverview>("/analytics/overview", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
