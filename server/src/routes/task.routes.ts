import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  create,
  getById,
  list,
  remove,
  update,
} from "../controllers/task.controller";

const router = Router();

router.use(authenticateToken);

router.post("/", create);
router.get("/", list);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;