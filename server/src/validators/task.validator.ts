import { z } from "zod";

export const taskStatusSchema = z.enum([
  "To Do",
  "In Progress",
  "Completed",
]);

export const taskPrioritySchema = z.enum([
  "Low",
  "Medium",
  "High",
]);

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().optional(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  dueDate: z.string().datetime().optional(),
});

export const updateTaskSchema = createTaskSchema;

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export const taskFilterSchema = z.object({
  search: z.string().trim().optional(),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
});

export type TaskFilterInput = z.infer<typeof taskFilterSchema>;