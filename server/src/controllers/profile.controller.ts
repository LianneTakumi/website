import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";
import {
  getUserProfile,
  updateUserProfile,
} from "../services/profile.service";
import { updateProfileSchema } from "../validators/profile.validator";



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

export async function updateProfile(
  req: AuthenticatedRequest,
  res: Response
) {
  const result = updateProfileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid profile data",
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    const user = await updateUserProfile(
      req.userId!,
      result.data
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Email is already registered" ||
        error.message === "Username is already taken"
      ) {
        return res.status(409).json({
          success: false,
          message: error.message,
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}