import { Router } from "express";
import {
  CreateTask,
  UpdateTask,
  DeleteTask
} from "../controllers/task.controller.js";
import { TASK_ROUTE } from "./router.map.js";

const router = Router();

router.post(TASK_ROUTE, CreateTask);
router.put(TASK_ROUTE + "/:id", UpdateTask);
router.delete(TASK_ROUTE + "/:id", DeleteTask);


export default router;