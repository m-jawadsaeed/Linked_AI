import { useEffect, useState } from "react";

import {
  analyticsService,
  AnalyticsOverview,
} from "../../services/analytics.service";

import { useAuthStore } from "../../store/auth.store";

export const AnalyticsPage = () => {
  const token = useAuthStore((state) => state.accessToken);

  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await analyticsService.overview(token);

        setAnalytics(data);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [token]);

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  if (!analytics) {
    return <div>No analytics found.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Analytics</h1>

        <p className="mt-2 text-slate-400">Content performance overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">Generated</p>

          <h2 className="mt-2 text-3xl font-bold">
            {analytics.generatedPosts}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">Published</p>

          <h2 className="mt-2 text-3xl font-bold">
            {analytics.publishedPosts}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">Scheduled</p>

          <h2 className="mt-2 text-3xl font-bold">
            {analytics.scheduledPosts}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">Activities</p>

          <h2 className="mt-2 text-3xl font-bold">
            {analytics.totalActivities}
          </h2>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="mb-4 text-lg font-semibold">Analytics Summary</h3>

        <ul className="space-y-2">
          <li>Generated Posts: {analytics.generatedPosts}</li>

          <li>Published Posts: {analytics.publishedPosts}</li>

          <li>Scheduled Posts: {analytics.scheduledPosts}</li>

          <li>Total Activities: {analytics.totalActivities}</li>
        </ul>
      </div>
    </div>
  );
};
