import nodemailer from "nodemailer";

export const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
) {
  await emailTransporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Use this link to reset your password: ${resetUrl}`,
  });
}