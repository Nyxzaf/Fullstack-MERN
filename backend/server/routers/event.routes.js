import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/event.controllers.js";
import { EVENT_ROUTE } from "./router.map.js";

const router = Router();

router.get(EVENT_ROUTE, getTasks);
router.get(EVENT_ROUTE + "/:id", getTaskById);
router.post(EVENT_ROUTE, createTask);
router.put(EVENT_ROUTE+ "/:id", updateTask);
router.delete(EVENT_ROUTE+ "/:id", deleteTask);


export default router;