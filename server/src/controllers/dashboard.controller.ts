import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";
import { getDashboardStats } from "../services/dashboard.service";

export async function getStats(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const stats = await getDashboardStats(req.userId!);

    return res.status(200).json({
      success: true,
      stats,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}