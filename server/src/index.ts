import "dotenv/config";
import express from "express";
import { prisma } from "./lib/prisma";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import passwordResetRoutes from "./routes/password-reset.routes";

const app = express();

const PORT = 5000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", passwordResetRoutes);

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: "Task Management API is running",
      database: "connected",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});