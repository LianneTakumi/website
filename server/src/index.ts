import "dotenv/config";
import express from "express";
import { prisma } from "./lib/prisma";
import authRoutes from "./routes/auth.routes";

//import for testing the authentication middleware
/*import {
  authenticateToken,
  type AuthenticatedRequest,
} from "./middleware/auth.middleware";
*/

const app = express();

const PORT = 5000;

app.use(express.json());
app.use("/api/auth", authRoutes);

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

//This is only for testing the authentication middleware. 
// app.get(
//   "/api/auth/test",
//   authenticateToken,
//   (req: AuthenticatedRequest, res) => {
//     res.json({
//       success: true,
//       message: "Authentication successful",
//       userId: req.userId,
//     });
//   }
// );

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});