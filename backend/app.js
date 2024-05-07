import cors from "cors";
import express from "express";
import EmployeeRoutes from "./server/routers/employee.routes.js";
//import TaskRoute from "./server/routers/task.routes.js"

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
//app.use(TaskRoute)
app.use(EmployeeRoutes);

export default app;
