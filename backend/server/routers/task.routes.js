
const express = require("express")
const router = express.Router();
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers.js";
import { TASK_ROUTE } from "./router.map.js";

router.get(TASK_ROUTE, getTasks);
router.get(TASK_ROUTE + "/:id", getTaskById);
router.post(TASK_ROUTE, createTask);
router.put(TASK_ROUTE+ "/:id", updateTask);
router.delete(TASK_ROUTE+ "/:id", deleteTask);


export default router;