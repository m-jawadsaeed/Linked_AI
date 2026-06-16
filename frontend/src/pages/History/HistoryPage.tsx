import { useEffect, useState } from "react";

import { historyService, HistoryItem } from "../../services/history.service";

import { useAuthStore } from "../../store/auth.store";

export const HistoryPage = () => {
  const token = useAuthStore((state) => state.accessToken);

  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!token) {
        return;
      }

      const data = await historyService.getAll(token);

      setHistory(data);
    };

    load();
  }, [token]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">History</h1>

      {history.length === 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          No activity found.
        </div>
      )}

      {history.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-slate-800 bg-slate-900 p-5"
        >
          <div className="flex items-center justify-between">
            <span>{item.title}</span>

            <span className="text-sm text-slate-400">{item.action}</span>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {new Date(item.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};
