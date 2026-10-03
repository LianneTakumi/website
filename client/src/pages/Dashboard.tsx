import { useEffect, useState } from "react";
import api from "../services/api";

interface DashboardStats {
  totalTasks: number;
  toDo: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await api.get("/dashboard");
        setStats(response.data.stats);
      } catch {
        setError("Unable to load dashboard.");
      }
    }

    loadDashboard();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl border border-red-900 bg-red-950/40 p-4 text-red-400">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const cards = [
    {
      label: "Total Tasks",
      value: stats.totalTasks,
    },
    {
      label: "To Do",
      value: stats.toDo,
    },
    {
      label: "In Progress",
      value: stats.inProgress,
    },
    {
      label: "Completed",
      value: stats.completed,
    },
    {
      label: "Overdue",
      value: stats.overdue,
    },
  ];

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Dashboard
          </h1>

          <p className="mt-1 text-gray-400">
            Here's an overview of your tasks.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-gray-800 bg-gray-950 p-5 shadow-xl"
            >
              <p className="text-sm text-gray-500">
                {card.label}
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;