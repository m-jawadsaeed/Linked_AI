import { useEffect, useState } from "react";

import { profileService, Profile } from "../../services/profile.service";

import { useAuthStore } from "../../store/auth.store";

export const ProfilePage = () => {
  const token = useAuthStore((state) => state.accessToken);

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!token) {
        return;
      }

      const data = await profileService.me(token);

      setProfile(data);
    };

    void load();
  }, [token]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Profile</h1>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p>
          <strong>Name:</strong> {profile.name}
        </p>

        <p>
          <strong>Email:</strong> {profile.email}
        </p>

        <p>
          <strong>Role:</strong> {profile.role}
        </p>

        <p>
          <strong>Verified:</strong> {profile.verified ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};
