import { Router } from "express";
import {
  CreateTask,
  UpdateTask,
  DeleteTask,
  GetAllTasks
} from "../controllers/task.controller.js";


const router = Router();


router.get("/task", GetAllTasks);
router.post("/task", CreateTask);
router.put("/task/:id", UpdateTask);
router.delete("/task/:id", DeleteTask);


export default router;