import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";
import { getUserProfile } from "../services/profile.service";

export async function getProfile(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const user = await getUserProfile(req.userId!);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}