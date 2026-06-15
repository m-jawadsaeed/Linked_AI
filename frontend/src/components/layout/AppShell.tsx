import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";

const nav = ["dashboard", "generator", "drafts", "history", "analytics", "schedule", "profile", "settings"];

export const AppShell = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const isMarketing = ["/", "/login", "/register"].includes(location.pathname);

  if (isMarketing) return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <aside className="w-64 border-r border-slate-800 p-4">
          <div className="mb-6 text-2xl font-semibold">LinkedAI</div>
          <nav className="space-y-2 text-sm capitalize">
            {nav.map((item) => (
              <Link key={item} to={`/${item}`} className="block rounded px-3 py-2 hover:bg-slate-800">
                {item}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};