import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";
import {
  createTaskSchema,
  taskFilterSchema,
  updateTaskSchema,
} from "../validators/task.validator";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../services/task.service";

export async function create(
  req: AuthenticatedRequest,
  res: Response
) {
  const result = createTaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid task data",
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    const task = await createTask(
      req.userId!,
      result.data
    );

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function list(
  req: AuthenticatedRequest,
  res: Response
) {
  const result = taskFilterSchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid task filters",
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {

    const tasks = await getTasks(
      req.userId!,
      result.data
    );

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function getById(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const task = await getTaskById(
      req.userId!,
      String(req.params.id)
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function update(
  req: AuthenticatedRequest,
  res: Response
) {
  const result = updateTaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid task data",
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    const task = await updateTask(
      req.userId!,
      String(req.params.id),
      result.data
    );

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Task not found"
    ) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function remove(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    await deleteTask(
      req.userId!,
      String(req.params.id)
    );

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Task not found"
    ) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}