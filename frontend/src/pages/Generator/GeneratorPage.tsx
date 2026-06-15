import { useMemo, useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { generatorService } from "../../services/generator.service";

export const GeneratorPage = () => {
  const token = useAuthStore((state) => state.accessToken);
  const [form, setForm] = useState({ topic: "", industry: "SaaS", audience: "Founders", cta: "Comment AI", tone: "Professional" });
  const [streamText, setStreamText] = useState("");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [controller, setController] = useState<AbortController | null>(null);

  const canGenerate = useMemo(() => token && form.topic.trim().length > 3, [token, form.topic]);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Generator</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            className="rounded border border-slate-700 bg-slate-900 p-2"
            placeholder={key}
            value={value}
            onChange={(event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))}
          />
        ))}
      </div>
      <div className="flex gap-3">
        <button
          disabled={!canGenerate}
          className="rounded bg-cyan-400 px-4 py-2 font-medium text-slate-950 disabled:opacity-50"
          onClick={() => {
            setStreamText("");
            const streamController = generatorService.stream(
              form,
              token!,
              (tokenChunk) => setStreamText((prev) => prev + tokenChunk),
              (done) => setResult(done as Record<string, unknown>)
            );
            setController(streamController);
          }}
        >
          Stream Generate
        </button>
        <button className="rounded border border-slate-700 px-4 py-2" onClick={() => controller?.abort()}>
          Cancel
        </button>
      </div>
      <pre className="min-h-52 whitespace-pre-wrap rounded border border-slate-800 bg-slate-900 p-4 text-sm text-slate-200">{streamText}</pre>
      {result ? <pre className="whitespace-pre-wrap rounded border border-slate-800 bg-slate-900 p-4 text-xs">{JSON.stringify(result, null, 2)}</pre> : null}
    </div>
  );
};