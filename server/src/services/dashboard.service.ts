import { prisma } from "../lib/prisma";

export async function getDashboardStats(userId: string) {
  const totalTasks = await prisma.task.count({
    where: {
      userId,
    },
  });

  const toDo = await prisma.task.count({
    where: {
      userId,
      status: "To Do",
    },
  });

  const inProgress = await prisma.task.count({
    where: {
      userId,
      status: "In Progress",
    },
  });

  const completed = await prisma.task.count({
    where: {
      userId,
      status: "Completed",
    },
  });

  const overdue = await prisma.task.count({
    where: {
      userId,
      status: {
        not: "Completed",
      },
      dueDate: {
        lt: new Date(),
      },
    },
  });

  return {
    totalTasks,
    toDo,
    inProgress,
    completed,
    overdue,
  };
}