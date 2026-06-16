import { FormEvent, useEffect, useState } from "react";

import { scheduleService, ScheduleItem } from "../../services/schedule.service";

import { useAuthStore } from "../../store/auth.store";

export const SchedulePage = () => {
  const token = useAuthStore((state) => state.accessToken);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [scheduledFor, setScheduledFor] = useState("");

  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);

  const loadSchedules = async () => {
    if (!token) {
      return;
    }

    const data = await scheduleService.getAll(token);

    setSchedules(data);
  };

  useEffect(() => {
    void loadSchedules();
  }, [token]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (!token) {
      return;
    }

    await scheduleService.create(token, {
      title,
      content,
      scheduledFor,
    });

    setTitle("");
    setContent("");
    setScheduledFor("");

    await loadSchedules();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Schedule Posts</h1>

      <form
        onSubmit={submit}
        className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full rounded border border-slate-700 bg-slate-950 p-3"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={5}
          className="w-full rounded border border-slate-700 bg-slate-950 p-3"
        />

        <input
          type="datetime-local"
          value={scheduledFor}
          onChange={(e) => setScheduledFor(e.target.value)}
          className="w-full rounded border border-slate-700 bg-slate-950 p-3"
        />

        <button
          type="submit"
          className="rounded bg-cyan-500 px-4 py-2 text-slate-950"
        >
          Schedule Post
        </button>
      </form>

      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
            <h3 className="font-semibold">{schedule.title}</h3>

            <p className="mt-2 text-sm text-slate-400">{schedule.content}</p>

            <p className="mt-3 text-xs text-cyan-400">
              Scheduled: {new Date(schedule.scheduledFor).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
