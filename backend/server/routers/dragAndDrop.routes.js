import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getNameEmployee,
  getTaskByEmployee,
} from "../controllers/dragAndDrop.controllers.js";
import { DRAGDROP_ROUTE } from "./router.map.js";

const router = Router();

router.get(DRAGDROP_ROUTE, getTasks);
router.get(DRAGDROP_ROUTE + "/:id", getTaskById);
router.post(DRAGDROP_ROUTE, createTask);
router.put(DRAGDROP_ROUTE + "/:id", updateTask);
router.delete(DRAGDROP_ROUTE + "/:id", deleteTask);
router.get(DRAGDROP_ROUTE + "/employees", getNameEmployee);
router.get(DRAGDROP_ROUTE + "/employees/:employeeId", getTaskByEmployee);

export default router;
