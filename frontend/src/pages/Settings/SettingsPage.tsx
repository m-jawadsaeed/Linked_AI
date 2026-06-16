import { FormEvent, useState } from "react";

import { settingsService } from "../../services/settings.service";

import { useAuthStore } from "../../store/auth.store";

export const SettingsPage = () => {
  const token = useAuthStore((state) => state.accessToken);

  const [name, setName] = useState("");

  const [message, setMessage] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (!token) {
      return;
    }

    const response = await settingsService.updateProfile(token, {
      name,
    });

    setMessage(response.message);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Settings</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Name"
          className="w-full rounded border border-slate-700 bg-slate-900 p-3"
        />

        <button
          type="submit"
          className="rounded bg-cyan-500 px-4 py-2 text-slate-950"
        >
          Save
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};
