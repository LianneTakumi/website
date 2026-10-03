import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  type Task,
  type TaskInput,
} from "../services/tasks";

const emptyForm: TaskInput = {
  title: "",
  description: "",
  status: "To Do",
  priority: "Medium",
  dueDate: "",
};

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<TaskInput>(emptyForm);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const response = await getTasks({
        search: search || undefined,
        status: status || undefined,
        priority: priority || undefined,
      });

      setTasks(response.tasks);
    } catch {
      setError("Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [search, status, priority]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function startEdit(task: Task) {
    setEditingTask(task);

    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate
        ? task.dueDate.slice(0, 10)
        : "",
    });

    setSelectedTask(null);
    setSuccess("");
    setError("");
  }

  function cancelEdit() {
    setEditingTask(null);
    setForm(emptyForm);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setSaving(true);

      if (editingTask) {
        await updateTask(editingTask.id, form);
        setSuccess("Task updated successfully.");
      } else {
        await createTask(form);
        setSuccess("Task created successfully.");
      }

      setForm(emptyForm);
      setEditingTask(null);

      await loadTasks();
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Unable to save task."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );

      if (selectedTask?.id === id) {
        setSelectedTask(null);
      }

      setSuccess("Task deleted successfully.");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Unable to delete task."
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tasks
          </h1>

          <p className="mt-1 text-gray-500">
            Create, manage, and track your tasks.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
            {success}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingTask ? "Edit Task" : "Create Task"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-5 space-y-4"
            >
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                  placeholder="Task title"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                  placeholder="Task description"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">
                    In Progress
                  </option>
                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Priority
                </label>

                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Due Date
                </label>

                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingTask
                    ? "Update Task"
                    : "Create Task"}
              </button>

              {editingTask && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="grid gap-3 md:grid-cols-3">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tasks..."
                  className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                />

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="">All statuses</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">
                    In Progress
                  </option>
                  <option value="Completed">
                    Completed
                  </option>
                </select>

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="">All priorities</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {loading ? (
                <p className="mt-6 text-gray-500">
                  Loading tasks...
                </p>
              ) : tasks.length === 0 ? (
                <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-8 text-center">
                  <p className="text-gray-500">
                    No tasks found.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <button
                            onClick={() =>
                              setSelectedTask(task)
                            }
                            className="text-left text-lg font-semibold text-gray-900 hover:text-blue-600"
                          >
                            {task.title}
                          </button>

                          <p className="mt-1 text-sm text-gray-500">
                            {task.description ||
                              "No description"}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2 text-xs">
                            <span className="rounded-full bg-gray-100 px-3 py-1">
                              {task.status}
                            </span>

                            <span className="rounded-full bg-gray-100 px-3 py-1">
                              {task.priority}
                            </span>

                            {task.dueDate && (
                              <span className="rounded-full bg-gray-100 px-3 py-1">
                                Due{" "}
                                {new Date(
                                  task.dueDate
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(task)}
                            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(task.id)
                            }
                            className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedTask && (
                <div className="mt-6 rounded-lg bg-gray-50 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Task Details
                    </h3>

                    <button
                      onClick={() => setSelectedTask(null)}
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <p>
                      <strong>Title:</strong>{" "}
                      {selectedTask.title}
                    </p>

                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedTask.description ||
                        "No description"}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      {selectedTask.status}
                    </p>

                    <p>
                      <strong>Priority:</strong>{" "}
                      {selectedTask.priority}
                    </p>

                    <p>
                      <strong>Due Date:</strong>{" "}
                      {selectedTask.dueDate
                        ? new Date(
                            selectedTask.dueDate
                          ).toLocaleDateString()
                        : "No due date"}
                    </p>

                    <p>
                      <strong>Created:</strong>{" "}
                      {new Date(
                        selectedTask.createdAt
                      ).toLocaleString()}
                    </p>

                    <p>
                      <strong>Updated:</strong>{" "}
                      {new Date(
                        selectedTask.updatedAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;