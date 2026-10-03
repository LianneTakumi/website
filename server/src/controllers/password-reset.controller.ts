import type { Request, Response } from "express";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/password-reset.validator";
import {
  createPasswordResetToken,
  resetPassword as resetPasswordService,
} from "../services/password-reset.service";

export async function forgotPassword(
  req: Request,
  res: Response
) {
  const result = forgotPasswordSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    await createPasswordResetToken(result.data);

    return res.status(200).json({
      success: true,
      message:
        "If an account exists with that email, password reset instructions have been sent.",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function resetPassword(
  req: Request,
  res: Response
) {
  const result = resetPasswordSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid password reset data",
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    await resetPasswordService(result.data);

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}