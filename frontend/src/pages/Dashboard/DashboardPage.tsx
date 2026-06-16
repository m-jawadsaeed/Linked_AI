import { useEffect, useState } from "react";

import { dashboardService } from "../../services/dashboard.service";
import { useAuthStore } from "../../store/auth.store";
  import { DashboardStats, DashboardActivity } from "../../types/dashoard.types";
export const DashboardPage = () => {
  const token = useAuthStore((state) => state.accessToken);

  const [stats, setStats] = useState<DashboardStats| null >(null);

  const [activity, setActivity] = useState<DashboardActivity[]>([]);

  useEffect(() => {
    if (!token) return;

    const load = async () => {
      const statsData = await dashboardService.stats(token);

      const activityData = await dashboardService.activity(token);

      setStats(statsData);
      setActivity(activityData);
    };

    load();
  }, [token]);

  if (!token) {
    return <div>Please login first.</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      {stats && (
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-slate-900 p-5">
            <p>Generated</p>
            <h2>{stats.generatedPosts}</h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-5">
            <p>Published</p>
            <h2>{stats.publishedPosts}</h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-5">
            <p>Scheduled</p>
            <h2>{stats.scheduledPosts}</h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-5">
            <p>Credits</p>
            <h2>{stats.aiCredits}</h2>
          </div>
        </div>
      )}

      <div className="rounded-xl bg-slate-900 p-6">
        <h2 className="mb-4 text-xl">Recent Activity</h2>

        {activity.map((item) => (
          <div key={item.id} className="border-b border-slate-700 py-3">
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};
