import { http } from "../api/http";

import type { DashboardActivity, DashboardStats } from "../types/dashoard.types";

export const dashboardService = {
  stats: (token: string) =>
    http<DashboardStats>("/dashboard/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  activity: (token: string) =>
    http<DashboardActivity[]>("/dashboard/activity", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
