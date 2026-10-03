import api from "./api";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskInput {
  title: string;
  description: string;
  status: Task["status"];
  priority: Task["priority"];
  dueDate: string;
}

export async function getTasks(params?: {
  search?: string;
  status?: string;
  priority?: string;
}) {
  const response = await api.get("/tasks", {
    params,
  });

  return response.data;
}

export async function createTask(data: TaskInput) {
  const response = await api.post("/tasks", data);

  return response.data;
}

export async function updateTask(
  id: string,
  data: TaskInput
) {
  const response = await api.put(`/tasks/${id}`, data);

  return response.data;
}

export async function deleteTask(id: string) {
  const response = await api.delete(`/tasks/${id}`);

  return response.data;
}