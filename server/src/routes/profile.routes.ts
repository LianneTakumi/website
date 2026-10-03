import { Router } from "express";
import { getProfile } from "../controllers/profile.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticateToken, getProfile);

export default router;