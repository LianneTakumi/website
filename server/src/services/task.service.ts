import { prisma } from "../lib/prisma";

import type {
  CreateTaskInput,
  TaskFilterInput,
  UpdateTaskInput,
} from "../validators/task.validator";

export async function createTask(
  userId: string,
  input: CreateTaskInput
) {
  return prisma.task.create({
    data: {
      userId,
      title: input.title,
      description: input.description || null,
      status: input.status,
      priority: input.priority,
      dueDate: input.dueDate
        ? new Date(input.dueDate)
        : null,
    },
  });
}

export async function getTasks(
  userId: string,
  filters: TaskFilterInput
) {
  return prisma.task.findMany({
    where: {
      userId,
      ...(filters.search
        ? {
            OR: [
              {
                title: {
                  contains: filters.search,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: filters.search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
      ...(filters.status
        ? {
            status: filters.status,
          }
        : {}),
      ...(filters.priority
        ? {
            priority: filters.priority,
          }
        : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getTaskById(
  userId: string,
  taskId: string
) {
  return prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });
}

export async function updateTask(
  userId: string,
  taskId: string,
  input: UpdateTaskInput
) {
  const existingTask = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  return prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title: input.title,
      description: input.description || null,
      status: input.status,
      priority: input.priority,
      dueDate: input.dueDate
        ? new Date(input.dueDate)
        : null,
    },
  });
}

export async function deleteTask(
  userId: string,
  taskId: string
) {
  const existingTask = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
}