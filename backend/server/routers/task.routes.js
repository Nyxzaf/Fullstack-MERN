import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getNameEmployee,
  getTaskByEmployee,
} from "../controllers/task.controllers.js";
import { TASK_ROUTE } from "./router.map.js";

const router = Router();

router.get(TASK_ROUTE, getTasks);
router.get(TASK_ROUTE + "/:id", getTaskById);
router.post(TASK_ROUTE, createTask);
router.put(TASK_ROUTE + "/:id", updateTask);
router.delete(TASK_ROUTE + "/:id", deleteTask);
router.get(TASK_ROUTE + "/employees", getNameEmployee);
router.get(TASK_ROUTE + "/employees/:employeeId", getTaskByEmployee);

export default router;
