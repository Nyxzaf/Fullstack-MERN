import { Router } from "express";
import {
  CreateEmployee,
  DeleteEmployee,
  GetEmployee,
  GetEmployees,
  UpdateEmployee,
  GetBirthdayEmployees,
} from "../controllers/employee.cotrollers.js";
import { EMPLOYEE_ROUTE } from "./router.map.js";
const router = Router();

router.get(EMPLOYEE_ROUTE, GetEmployees);
router.get(EMPLOYEE_ROUTE + "/birthday", GetBirthdayEmployees);

router.post(EMPLOYEE_ROUTE, CreateEmployee);

router.put(EMPLOYEE_ROUTE + "/:id", UpdateEmployee);

router.delete(EMPLOYEE_ROUTE + "/:id", DeleteEmployee);

router.get(EMPLOYEE_ROUTE + "/:id", GetEmployee);

export default router;
