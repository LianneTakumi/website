import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { getStats } from "../controllers/dashboard.controller";

const router = Router();

router.use(authenticateToken);

router.get("/", getStats);

export default router;