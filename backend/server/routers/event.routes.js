import { Router } from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getNameEmployee,
  getEventsByEmployee,
  getEventsByType,
} from "../controllers/event.controllers.js";
import { EVENT_ROUTE } from "./router.map.js";

const router = Router();

router.get(EVENT_ROUTE, getEvents);
router.get(EVENT_ROUTE + "/:id", getEventById);
router.post(EVENT_ROUTE, createEvent);
router.put(EVENT_ROUTE + "/:id", updateEvent);
router.delete(EVENT_ROUTE + "/:id", deleteEvent);
router.get(EVENT_ROUTE + "/type/:type", getEventsByType);
router.get(EVENT_ROUTE + "/employees", getNameEmployee);
router.get(EVENT_ROUTE + "/employees/:employeeId", getEventsByEmployee);

export default router;
