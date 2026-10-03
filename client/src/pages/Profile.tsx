import { useEffect, useState } from "react";
import api from "../services/api";

interface ProfileData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

function Profile() {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get("/profile");
        setProfile(response.data.user);
      } catch (error: any) {
        setError(
          error.response?.data?.message ||
            "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !profile.firstName.trim() ||
      !profile.lastName.trim() ||
      !profile.username.trim() ||
      !profile.email.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      setSaving(true);

      const response = await api.put("/profile", profile);

      setProfile(response.data.user);
      setMessage("Profile updated successfully.");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-white">
          Profile
        </h1>

        <p className="mt-1 text-gray-400">
          Manage your account information.
        </p>

        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-950 p-6">
          {message && (
            <div className="mb-5 rounded-lg border border-green-900 bg-green-950/40 px-4 py-3 text-sm text-green-400">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  First Name
                </label>

                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white outline-none focus:border-white focus:ring-1 focus:ring-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Last Name
                </label>

                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white outline-none focus:border-white focus:ring-1 focus:ring-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                Username
              </label>

              <input
                type="text"
                value={profile.username}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    username: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white outline-none focus:border-white focus:ring-1 focus:ring-white"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                Email
              </label>

              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white outline-none focus:border-white focus:ring-1 focus:ring-white"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-white px-4 py-2.5 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;