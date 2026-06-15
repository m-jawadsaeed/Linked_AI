import { Link } from "react-router-dom";

export const LandingPage = () => (
  <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.35),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.35),transparent_40%)]" />
    <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6">
      <p className="text-lg tracking-[0.2em] text-cyan-300">LINKEDAI</p>
      <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight">AI-native LinkedIn growth engine for founders and teams.</h1>
      <p className="mt-5 max-w-2xl text-lg text-slate-300">Generate, personalize, stream, schedule, and publish high-performing LinkedIn content from one enterprise SaaS platform.</p>
      <div className="mt-8 flex gap-3">
        <Link to="/register" className="rounded bg-cyan-400 px-5 py-3 font-semibold text-slate-950">Start Free</Link>
        <Link to="/login" className="rounded border border-slate-500 px-5 py-3">Sign In</Link>
      </div>
    </div>
  </div>
);