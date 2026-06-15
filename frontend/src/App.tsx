import { Suspense } from "react";
import { AppRouter } from "./routes/AppRouter";
import { AppShell } from "./components/layout/AppShell";

export const App = () => (
  <AppShell>
    <Suspense fallback={<div className="p-6 text-slate-300">Loading LinkedAI...</div>}>
      <AppRouter />
    </Suspense>
  </AppShell>
);