import cors from "cors";
import express from "express";
import EmployeeRoutes from "./server/routers/employee.routes.js";
import EventRoutes from "./server/routers/event.routes.js"
import TaskRoutes from "./server/routers/task.routes.js"
const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(EventRoutes)
app.use(EmployeeRoutes);
app.use(TaskRoutes)

export default app;
