import { useEffect, useState } from "react";

import { Draft, draftsService } from "../../services/drafts.service";

import { useAuthStore } from "../../store/auth.store";

export const DraftsPage = () => {
  const token = useAuthStore((state) => state.accessToken);

  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!token) return;

      const data = await draftsService.getAll(token);

      setDrafts(data);
    };

    load();
  }, [token]);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">Drafts</h1>

      <div className="space-y-4">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
            <h3 className="font-semibold">{draft.title}</h3>

            <p className="mt-2 text-sm text-slate-400">{draft.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
